/* =========================================================
   Les verden – Klassesvar med romkode (LV.romKlasse)
   En liten romlinje som kan legges inn på en hvilken som helst
   lærerside (valg.html, hjorner.html, exit.html …). Læreren stiller
   et spørsmål, elevene svarer på mobilen i rom.html, og siden får
   svarene fortløpende. Elevene kan endre svaret til læreren stenger.
   Ingenting lagres.

   const K = await LV.romKlasse.apne(el, { tittel, onSvar, onEndret })
   K.spor({ id, type: "valg" | "skjema", tekst, valg: [{ id, tekst, farge, ikon, merk }],
            felt: [{ id, tekst, type: "tekst" | "skala" | "nivaa", rader }], en })
   K.svar      → Map(spillerId → svar)   K.navn(id) → kallenavn
   K.lukkSporsmal(tekst)   K.antall()   K.lukk()
   ========================================================= */
(function () {
  const LV = window.LV;
  const esc = s => LV.esc(String(s == null ? "" : s));

  // ---------- Visning for elevene ----------
  LV.romKlient = LV.romKlient || {};
  LV.romKlient.klasse = {
    start(el, send) {
      el.innerHTML = '<p class="rk-stor">✅ Du er med!</p><p>Vent på spørsmålet fra læreren.</p>';
      el.addEventListener("click", e => {
        const b = e.target.closest(".rkl-valg"); if (!b || b.disabled) return;
        send({ t: "svar", id: el._sporId, svar: b.dataset.v });
        el.querySelectorAll(".rkl-valg").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
        const st = el.querySelector(".rkl-status"); if (st) st.textContent = el._en ? "✔ Sent. You can change your answer until the teacher closes it." : "✔ Sendt. Du kan endre svaret til læreren stenger.";
      });
      el.addEventListener("submit", e => {
        const f = e.target.closest(".rkl-skjema"); if (!f) return; e.preventDefault();
        const svar = {};
        f.querySelectorAll("[data-felt]").forEach(x => { if (x.type === "radio") { if (x.checked) svar[x.dataset.felt] = x.value; } else svar[x.dataset.felt] = x.value.trim().slice(0, 1500); });
        send({ t: "svar", id: el._sporId, svar });
        const st = f.querySelector(".rkl-status"); if (st) st.textContent = el._en ? "✔ Sent. You can change and send again until the teacher closes it." : "✔ Sendt. Du kan endre og sende på nytt til læreren stenger.";
        f.querySelector("button[type=submit]").textContent = el._en ? "Send again" : "Send på nytt";
      });
    },
    melding(d, el) {
      const lang = d.en ? ' lang="en"' : "";
      if (d.t === "venter") { el.innerHTML = '<p class="rk-stor">✅ Du er med!</p><p>Vent på spørsmålet fra læreren' + (d.tittel ? " – «" + esc(d.tittel) + "»" : "") + ".</p>"; return; }
      if (d.t === "lukket") { el.innerHTML = '<p class="rk-stor">🙏 ' + (d.en ? "Thank you!" : "Takk!") + "</p>" + String(d.tekst || "").split("\n").map(x => "<p" + lang + ">" + esc(x) + "</p>").join(""); return; }
      if (d.t !== "spor") return;
      el._sporId = d.id; el._en = !!d.en;
      let h = '<p class="rkl-tekst"' + lang + ">" + esc(d.tekst) + "</p>";
      if (d.type === "valg") {
        h += '<div class="rkl-valgliste"' + lang + ">" + d.valg.map(v => '<button type="button" class="rkl-valg" data-v="' + esc(v.id) + '" aria-pressed="' + (d.mitt === v.id) + '" style="--rkl-f:' + (v.farge || "#1d4f9c") + '"><span class="rkl-valgtekst">' + (v.ikon ? '<span aria-hidden="true">' + v.ikon + "</span> " : "") + esc(v.tekst) + "</span>" + (v.merk ? '<span class="rkl-merk">' + esc(v.merk) + "</span>" : "") + "</button>").join("") + "</div>" +
          '<p class="rkl-status" role="status">' + (d.mitt ? (d.en ? "✔ Sent." : "✔ Sendt.") : "") + "</p>";
      } else {
        const m = d.mitt || {};
        h += '<form class="rkl-skjema"' + lang + ' autocomplete="off">' + d.felt.map((f, i) => {
          const id = "rkl-" + d.id + "-" + i;
          if (f.type === "skala") return '<fieldset class="rkl-skala"><legend>' + esc(f.tekst) + "</legend>" + [1, 2, 3, 4, 5].map(k => '<label><input type="radio" name="' + id + '" value="' + k + '" data-felt="' + esc(f.id) + '"' + (m[f.id] === String(k) ? " checked" : "") + "> " + k + "</label>").join("") + "</fieldset>";
          if (f.type === "nivaa") return '<fieldset class="rkl-skala"><legend>' + esc(f.tekst) + "</legend>" + (d.en ? ["Not yet", "Partly", "Yes"] : ["Ikke ennå", "Delvis", "Ja"]).map((x, k) => '<label><input type="radio" name="' + id + '" value="' + k + '" data-felt="' + esc(f.id) + '"' + (m[f.id] === String(k) ? " checked" : "") + "> " + ["🌱", "🌿", "🌳"][k] + " " + x + "</label>").join("") + "</fieldset>";
          if (f.type === "linje") return '<label class="rkl-felt" for="' + id + '"><span>' + esc(f.tekst) + '</span><input id="' + id + '" maxlength="80" spellcheck="false" autocapitalize="off" data-felt="' + esc(f.id) + '" value="' + esc(m[f.id] || "") + '"></label>';
          return '<label class="rkl-felt" for="' + id + '"><span>' + esc(f.tekst) + '</span><textarea id="' + id + '" rows="' + (f.rader || 2) + '" data-felt="' + esc(f.id) + '">' + esc(m[f.id] || "") + "</textarea></label>";
        }).join("") + '<button type="submit" class="knapp hoved">' + (d.mitt ? (d.en ? "Send again" : "Send på nytt") : (d.en ? "Send" : "Send")) + '</button><p class="rkl-status" role="status"></p>' + (d.anonym ? '<p class="rv-merk">' + (d.en ? "Your teacher sees the answers without your name." : "Læreren ser svarene uten navnet ditt.") + "</p>" : "") + "</form>";
      }
      el.innerHTML = h;
    }
  };

  // ---------- Lærersiden ----------
  LV.romKlasse = {
    async apne(el, o) {
      el.innerHTML = '<div class="rkl-linje"><p class="rv-status">📱 Åpner rommet …</p></div>';
      if (!LV.rom) await LV.lastSkript("assets/rom.js");
      let sporsmal = null, aapen = false;
      const svar = new Map();
      const rom = await LV.rom.vert({
        spill: "klasse",
        onBli: s => { if (sporsmal && aapen) rom.send(s.id, Object.assign({ t: "spor", mitt: svar.get(s.id) }, sporsmal)); else rom.send(s.id, { t: "venter", tittel: o.tittel }); tegn(); o.onEndret && o.onEndret(); },
        onForlat: () => { tegn(); o.onEndret && o.onEndret(); },
        onMelding: (s, m) => {
          if (m.t !== "svar" || !sporsmal || !aapen || m.id !== sporsmal.id) return;
          if (sporsmal.type === "valg" && !sporsmal.valg.some(v => v.id === m.svar)) return;
          if (sporsmal.type === "skjema" && (typeof m.svar !== "object" || !m.svar)) return;
          svar.set(s.id, m.svar); tegn(); o.onSvar && o.onSvar(s.id, m.svar);
        }
      });
      const qr = await LV.rom.qr(rom.lenke).catch(() => "");
      const antall = () => [...rom.spillere.values()].filter(s => s.tilkoblet).length;
      function tegn() {
        const t = el.querySelector(".rkl-tall");
        if (t) t.innerHTML = "<strong>" + antall() + "</strong> " + (antall() === 1 ? "elev" : "elever") + " i rommet" + (sporsmal ? " · <strong>" + svar.size + "</strong> har svart" : "");
      }
      el.innerHTML = '<div class="rkl-linje"><div class="rkl-kodedel"><span class="rkl-ledetekst">Romkode</span><span class="rkl-kode">' + rom.kode + '</span><span class="rkl-lenke">' + esc(rom.lenke.replace(/^https?:\/\//, "").replace(/\?.*$/, "")) + '</span></div><div class="rkl-qr" aria-hidden="true">' + qr + '</div><p class="rkl-tall" aria-live="polite"></p><button type="button" class="knapp liten rkl-steng">✕ Steng rommet</button></div>';
      tegn();
      const K = {
        kode: rom.kode, svar, antall,
        navn: id => { const s = rom.spillere.get(id); return s ? s.navn : "?"; },
        spor(def) {
          sporsmal = def; aapen = true; svar.clear();
          rom.spillere.forEach(s => { if (s.tilkoblet) rom.send(s.id, Object.assign({ t: "spor" }, def)); });
          tegn();
        },
        lukkSporsmal(tekst) {
          aapen = false;
          rom.spillere.forEach(s => { if (s.tilkoblet) rom.send(s.id, { t: "lukket", tekst: typeof tekst === "function" ? tekst(s.id) : tekst, en: sporsmal && sporsmal.en }); });
        },
        get aapen() { return aapen; },
        lukk() { rom.lukk(); el.innerHTML = ""; o.onLukket && o.onLukket(); }
      };
      el.querySelector(".rkl-steng").addEventListener("click", () => { if (confirm("Stenge rommet? Elevene blir koblet fra.")) K.lukk(); });
      return K;
    }
  };
})();
