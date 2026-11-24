/* =========================================================
   Les verden – Delegasjonsrom med romkode (LV.romDelegasjon)
   Brukes av FN-rollespillet (fn.html) og Fredskonferansen (fred.html).
   Elevene velger delegasjon på egen enhet og ser det hemmelige
   rollekortet der. Når læreren starter avstemningen, leverer hver
   delegasjon én felles stemmeseddel (den siste som sendes, gjelder).
   Ingenting lagres.

   const R = await LV.romDelegasjon.apne(el, {
     tittel, delegasjoner: [{ id, navn, ikon, farge, kanStemme }],
     rolle: id → { navn, ikon, farge, seksjoner: [{ tittel, tekst } | { tittel, liste: [] }] },
     sporsmal: [{ id, tekst, valg: [{ id, tekst }] }],
     onStemmer: map }) // Map(delegasjonId → { sporsmalId: valgId })
   R.startAvstemning()  R.stoppAvstemning(linjer)  R.stemmer  R.lukk()
   ========================================================= */
(function () {
  const LV = window.LV;
  const esc = s => LV.esc(String(s == null ? "" : s));

  // ---------- Visning for elevene ----------
  LV.romKlient = LV.romKlient || {};
  LV.romKlient.delegasjon = {
    start(el, send) {
      el.innerHTML = '<p class="rk-stor">✅ Du er med!</p><p>Vent litt …</p>';
      el.addEventListener("click", e => {
        const v = e.target.closest(".klr-velg"); if (v) { send({ t: "velg", id: v.dataset.id }); return; }
        if (e.target.closest(".klr-bytt")) send({ t: "velg", id: "" });
      });
      el.addEventListener("submit", e => {
        const f = e.target.closest(".rdl-seddel"); if (!f) return; e.preventDefault();
        const st = {}; f.querySelectorAll("input:checked").forEach(x => { st[x.name.replace(/^rdl-/, "")] = x.value; });
        send({ t: "stem", stemmer: st });
      });
    },
    melding(d, el) {
      if (d.t !== "del") return;
      if (!d.min) {
        LV.romTegn(el, '<p class="rkl-tekst">Hvilken delegasjon er du med i?</p><div class="klr-delegasjoner">' + d.delegasjoner.map(x => '<button type="button" class="klr-velg" data-id="' + esc(x.id) + '" style="--kl:' + esc(x.farge) + '"><span class="klr-ikon" aria-hidden="true">' + esc(x.ikon) + '</span><span><strong>' + esc(x.navn) + "</strong>" + (x.antall ? "<br><small>" + x.antall + " med</small>" : "") + "</span></button>").join("") + "</div>");
        return;
      }
      const r = d.rolle;
      let h = '<p class="klr-topp"><span>' + esc(r.ikon) + " <strong>" + esc(r.navn) + '</strong></span> <button type="button" class="knapp liten klr-bytt">Bytt delegasjon</button></p>';
      if (d.melding && d.melding.length) h += '<div class="klr-resultat">' + d.melding.map(x => "<p>" + esc(x) + "</p>").join("") + "</div>";
      if (d.fase === "stem") {
        if (!d.kanStemme) h += '<p class="rk-sendt">🚪 Dere har ikke stemme – men dere kan fortsatt påvirke de andre!</p>';
        else {
          const m = d.mine || {};
          h += '<form class="rdl-seddel"><h2>🗳️ Stemmeseddel</h2>' + d.sporsmal.map(s => '<fieldset class="rkl-skala rdl-sp"><legend>' + esc(s.tekst) + "</legend>" + s.valg.map(v => '<label><input type="radio" name="rdl-' + esc(s.id) + '" value="' + esc(v.id) + '"' + (m[s.id] === v.id ? " checked" : "") + "> " + esc(v.tekst) + "</label>").join("") + "</fieldset>").join("") +
            '<button type="submit" class="knapp hoved">' + (d.levert ? "Send nye stemmer" : "Send stemmene") + '</button><p class="klr-status" role="status">' + (d.levert ? "✔ Delegasjonen har stemt. Dere kan endre til læreren avslutter avstemningen." : "Bli enige først – det er én stemmeseddel per delegasjon.") + "</p></form>";
        }
      } else if (d.fase === "stengt") h += '<p class="rk-sendt">🔒 Avstemningen er avsluttet. Se resultatet på tavla.</p>';
      h += '<details class="klr-kort"' + (d.fase === "stem" ? "" : " open") + '><summary>📄 Rollekortet – hemmelig!</summary>' + r.seksjoner.map(s => "<h3>" + esc(s.tittel) + "</h3>" + (s.liste ? "<ul>" + s.liste.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul>" : "<p>" + esc(s.tekst) + "</p>")).join("") + "</details>";
      LV.romTegn(el, h);
    }
  };

  // ---------- Lærersiden ----------
  LV.romDelegasjon = {
    async apne(el, o) {
      el.innerHTML = '<p class="rv-status">📱 Åpner rommet …</p>';
      if (!LV.rom) await LV.lastSkript("assets/rom.js");
      const delt = new Map(), stemmer = new Map();
      let fase = "rolle", melding = [], rom = null, qr = "";
      const medlemmer = id => rom ? [...rom.spillere.values()].filter(x => x.tilkoblet && delt.get(x.id) === id) : [];
      const til = x => {
        const id = delt.get(x.id) || "", d = o.delegasjoner.find(y => y.id === id);
        return { t: "del", fase, melding, sporsmal: o.sporsmal, delegasjoner: o.delegasjoner.map(y => ({ id: y.id, navn: y.navn, ikon: y.ikon, farge: y.farge, antall: medlemmer(y.id).length })),
          min: d ? d.id : "", rolle: d ? o.rolle(d.id) : null, kanStemme: !!(d && d.kanStemme), mine: d ? stemmer.get(d.id) : null, levert: !!(d && stemmer.has(d.id)) };
      };
      const sendAlle = () => rom.spillere.forEach(x => { if (x.tilkoblet) rom.send(x.id, til(x)); });
      const sendDel = id => rom.spillere.forEach(x => { if (x.tilkoblet && delt.get(x.id) === id) rom.send(x.id, til(x)); });
      function tegn() {
        const uten = rom ? [...rom.spillere.values()].filter(x => x.tilkoblet && !delt.has(x.id)) : [];
        el.innerHTML = '<div class="rv-romkort"><div><p class="rv-ledetekst">Romkode</p><p class="rv-kode">' + rom.kode + '</p><p class="rv-lenke">Gå til <strong>' + esc(rom.lenke.replace(/^https?:\/\//, "").replace(/\?.*$/, "")) + '</strong> og skriv koden.</p></div><div class="rv-qr" aria-hidden="true">' + qr + "</div></div>" +
          '<ul class="klr-status-liste">' + o.delegasjoner.map(d => { const m = medlemmer(d.id); return '<li style="--kl:' + d.farge + '"><strong>' + d.ikon + " " + esc(d.navn) + "</strong><span>" + (m.length ? m.map(x => esc(x.navn)).join(", ") : "<em>ingen ennå</em>") + "</span><span>" + (fase === "stem" ? (!d.kanStemme ? "🚪 Uten stemme" : stemmer.has(d.id) ? "✔ Har stemt" : "⏳ Venter") : "") + "</span></li>"; }).join("") + "</ul>" +
          (uten.length ? '<p class="rv-merk">Har ikke valgt delegasjon: ' + uten.map(x => esc(x.navn)).join(", ") + "</p>" : "") +
          '<p class="mu-knapper">' + (fase === "stem" ? '<button type="button" class="knapp hoved" data-rdl="stopp">🔒 Avslutt avstemningen</button>' : '<button type="button" class="knapp hoved" data-rdl="start">🗳️ Start digital avstemning</button>') + ' <button type="button" class="knapp" data-rdl="steng">✕ Steng rommet</button></p>';
      }
      rom = await LV.rom.vert({ spill: "delegasjon",
        onBli: x => { rom.send(x.id, til(x)); tegn(); },
        onForlat: () => tegn(),
        onMelding: (x, m) => {
          if (m.t === "velg") { if (o.delegasjoner.some(d => d.id === m.id)) delt.set(x.id, m.id); else delt.delete(x.id); sendAlle(); tegn(); }
          else if (m.t === "stem" && fase === "stem") {
            const d = o.delegasjoner.find(y => y.id === delt.get(x.id)); if (!d || !d.kanStemme || typeof m.stemmer !== "object") return;
            const ren = {}; o.sporsmal.forEach(s => { const v = m.stemmer[s.id]; if (s.valg.some(c => c.id === v)) ren[s.id] = v; });
            stemmer.set(d.id, ren); sendDel(d.id); tegn(); o.onStemmer && o.onStemmer(stemmer);
          }
        } });
      qr = await LV.rom.qr(rom.lenke).catch(() => "");
      const R = {
        stemmer,
        startAvstemning() { fase = "stem"; stemmer.clear(); melding = []; sendAlle(); tegn(); o.onStemmer && o.onStemmer(stemmer); },
        stoppAvstemning(linjer) { fase = "stengt"; melding = linjer || []; sendAlle(); tegn(); },
        lukk() { rom.lukk(); el.innerHTML = ""; o.onLukket && o.onLukket(); }
      };
      el.addEventListener("click", e => {
        const b = e.target.closest("[data-rdl]"); if (!b) return;
        if (b.dataset.rdl === "start") R.startAvstemning();
        else if (b.dataset.rdl === "stopp") { const l = o.onStopp ? o.onStopp(stemmer) : []; R.stoppAvstemning(l); }
        else if (b.dataset.rdl === "steng" && confirm("Stenge rommet? Delegasjonene blir koblet fra.")) R.lukk();
      });
      tegn();
      return R;
    }
  };
})();
