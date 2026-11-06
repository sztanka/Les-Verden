/* =========================================================
   Les verden – Escape room (escape.html)
   escape.html → oversikt · escape.html?id=<rom>
   Svaret på hver lås står i teksten i rommet. Hint koster ett
   minutt ekstra. Tiden går oppover. Ingenting lagres.
   Data: data/escape.js
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const fmt = t => esc(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
  const avsnitt = t => t.startsWith("> ") ? '<blockquote class="es-dok">' + t.split("\n").map(l => fmt(l.replace(/^> ?/, ""))).join("<br>") + "</blockquote>" : "<p>" + fmt(t) + "</p>";
  const norm = s => String(s).toLowerCase().normalize("NFC").replace(/[.,!?«»"'’\s]+/g, " ").trim();
  const T = {
    nb: { rom: "Rom", las: "Lås", av: "av", tid: "Tid", hint: "💡 Hint (+1 min)", sjekk: "Prøv å åpne", feil: "Låst! Prøv igjen.", apen: "🔓 Åpen!", videre: "Gå videre →", ut: "Gå ut →", svar: "Ditt svar", fri: "Du er fri!", bruktTid: "Tid brukt", hintBrukt: "hint brukt", igjen: "↺ Spill igjen", andre: "Velg et annet rom", start: "Start", flytt: ["Flytt opp", "Flytt ned"], start2: "Start rømningen →", les: "Les mer i temaet", oppg: "Til læreren: La elevene jobbe i par eller små grupper. Tiden går oppover, og hvert hint koster ett minutt. Hvem kommer seg ut raskest?" },
    en: { rom: "Room", las: "Lock", av: "of", tid: "Time", hint: "💡 Hint (+1 min)", sjekk: "Try to open", feil: "Locked! Try again.", apen: "🔓 Open!", videre: "Go on →", ut: "Get out →", svar: "Your answer", fri: "You are free!", bruktTid: "Time", hintBrukt: "hints used", igjen: "↺ Play again", andre: "Choose another room", start: "Start", flytt: ["Move up", "Move down"], start2: "Start the escape →", les: "Read more in the topic", oppg: "" }
  };
  const mmss = s => Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");

  function oversikt() {
    document.title = "Escape room – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › Escape room</nav>' +
      '<header class="sidehode"><p class="overlinje">Spill · lesing</p><h1>🔐 Escape room</h1><p class="ingress">Du er låst inne. Hver dør har en lås, og svaret står i teksten du finner i rommet – men du må lese nøye! Bruk hint hvis du står fast, men det koster tid.</p></header>' +
      '<ul class="fo-liste">' + LV.escape.map(r => '<li><a class="fo-kort" href="escape.html?id=' + r.id + '" style="--fo-a:' + r.farger[0] + ';--fo-b:' + r.farger[1] + '"' + (r.sprak === "en" ? ' lang="en"' : "") + '><span class="fo-kort-topp"><span class="fo-ikon" aria-hidden="true">' + r.ikon + "</span><span>" + esc(r.sted) + "</span></span><strong>" + esc(r.tittel) + "</strong><span>" + esc(r.kort) + '</span><span class="fo-trinn">' + (r.sprak === "en" ? "🇬🇧 English · " : "🇳🇴 Norsk · ") + r.laser.length + (r.sprak === "en" ? " locks" : " låser") + "</span></a></li>").join("") + "</ul>" +
      '<p class="mu-intro">' + T.nb.oppg + "</p>";
  }

  function rom(r) {
    const sp = r.sprak === "en" ? "en" : "nb", tx = T[sp];
    document.title = r.tittel + " – Escape room";
    let n = 0, sek = 0, straff = 0, hint = 0, tikk = null;
    const tema = LV.temaer && LV.temaer.find(t => t.id === r.tema);
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › <a href="escape.html">Escape room</a> › ' + esc(r.tittel) + "</nav>" +
      '<div' + (sp === "en" ? ' lang="en"' : "") + '><header class="sidehode es-hode" style="--fo-a:' + r.farger[0] + ";--fo-b:" + r.farger[1] + '"><p class="overlinje">' + esc(r.sted) + '</p><h1><span aria-hidden="true">' + r.ikon + "</span> " + esc(r.tittel) + '</h1></header><div class="es-status" id="es-status"></div><div id="es-spill" class="es-spill"></div></div>';

    const status = () => {
      $("es-status").innerHTML = '<span>🔐 ' + tx.las + " " + Math.min(n + 1, r.laser.length) + " " + tx.av + " " + r.laser.length + '</span><span class="es-lasrekke" aria-hidden="true">' + r.laser.map((_, i) => i < n ? "🔓" : "🔒").join("") + '</span><span>⏱ ' + tx.tid + ': <strong id="es-tid">' + mmss(sek + straff) + "</strong></span>";
    };
    const start = () => { tikk = setInterval(() => { sek++; const t = $("es-tid"); if (t) t.textContent = mmss(sek + straff); }, 1000); };

    const intro = () => {
      status();
      $("es-spill").innerHTML = '<section class="ko-kort es-kort"><p class="es-intro">' + fmt(r.intro) + '</p><button type="button" class="knapp hoved" id="es-start">' + tx.start2 + "</button></section>";
      $("es-start").addEventListener("click", () => { start(); las(); });
    };

    const las = () => {
      const l = r.laser[n];
      let orden = l.type === "rekke" ? bland(l.rekke.map((_, i) => i)) : null;
      if (orden) while (orden.every((v, i) => v === i)) orden = bland(orden);
      const valgRek = l.type === "valg" ? bland(l.valg.map((_, i) => i)) : null;
      status();
      let h = '<section class="ko-kort es-kort"><h2 tabindex="-1">' + esc(l.tittel) + "</h2>" + l.tekst.map(avsnitt).join("") +
        '<div class="es-las"><p class="es-oppgave"><span aria-hidden="true">🔒</span> ' + fmt(l.oppgave) + "</p>";
      if (l.type === "kode") h += '<form id="es-form" class="es-kode"><label class="skjult-visuelt" for="es-svar">' + tx.svar + '</label><input id="es-svar" type="text" autocomplete="off" spellcheck="false" placeholder="' + tx.svar + '"><button class="knapp hoved" type="submit">' + tx.sjekk + "</button></form>";
      if (l.type === "valg") h += '<div class="fo-valg" role="group">' + valgRek.map(i => '<button type="button" class="fo-valgknapp es-valg" data-i="' + i + '">' + esc(l.valg[i]) + "</button>").join("") + "</div>";
      if (l.type === "rekke") h += '<ol class="av-liste" id="es-rekke"></ol><button class="knapp hoved" type="button" id="es-sjekk">' + tx.sjekk + "</button>";
      h += '<p class="es-melding" id="es-melding" role="status" aria-live="assertive"></p><button type="button" class="knapp liten" id="es-hint">' + tx.hint + '</button><p class="es-hinttekst" id="es-hinttekst" hidden></p></div></section>';
      $("es-spill").innerHTML = h;
      $("es-spill").querySelector("h2").focus({ preventScroll: true });
      $("es-status").scrollIntoView({ behavior: "smooth", block: "start" });

      const tegnRekke = () => {
        $("es-rekke").innerHTML = orden.map((j, pos) => '<li class="av-ledd" data-pos="' + pos + '"><span class="av-nr" aria-hidden="true">' + (pos + 1) + '</span><span class="av-tekst">' + esc(l.rekke[j]) + '</span><span class="av-pil"><button type="button" data-opp="' + pos + '" aria-label="' + tx.flytt[0] + '"' + (pos ? "" : " disabled") + '>↑</button><button type="button" data-ned="' + pos + '" aria-label="' + tx.flytt[1] + '"' + (pos < orden.length - 1 ? "" : " disabled") + ">↓</button></span></li>").join("");
      };
      if (orden) {
        tegnRekke();
        $("es-rekke").addEventListener("click", e => {
          const b = e.target.closest("button"); if (!b) return;
          const i = +(b.dataset.opp || b.dataset.ned), j = b.dataset.opp !== undefined ? i - 1 : i + 1;
          [orden[i], orden[j]] = [orden[j], orden[i]]; tegnRekke();
          const ny = $("es-rekke").querySelector('[data-pos="' + j + '"] button:not([disabled])'); if (ny) ny.focus();
        });
        $("es-sjekk").addEventListener("click", () => sjekk(orden.every((v, i) => v === i)));
      }
      if (l.type === "kode") $("es-form").addEventListener("submit", e => { e.preventDefault(); const v = norm($("es-svar").value); if (v) sjekk(l.svar.some(s => norm(s) === v)); });
      if (l.type === "valg") $("es-spill").querySelectorAll(".es-valg").forEach(b => b.addEventListener("click", () => { const ok = +b.dataset.i === l.riktig; if (!ok) b.disabled = true; sjekk(ok); }));
      $("es-hint").addEventListener("click", () => { $("es-hint").disabled = true; hint++; straff += 60; $("es-hinttekst").hidden = false; $("es-hinttekst").textContent = "💡 " + l.hint; const t = $("es-tid"); if (t) t.textContent = mmss(sek + straff); });
    };

    const sjekk = (ok) => {
      const l = r.laser[n], m = $("es-melding");
      if (!ok) { m.className = "es-melding feil"; m.textContent = tx.feil; const k = $("es-spill").querySelector(".es-las"); k.classList.remove("rist"); void k.offsetWidth; k.classList.add("rist"); return; }
      n++;
      status();
      $("es-spill").querySelectorAll(".es-las button, .es-las input").forEach(x => { x.disabled = true; });
      m.className = "es-melding ok";
      m.innerHTML = tx.apen + " " + fmt(l.forklaring);
      m.insertAdjacentHTML("afterend", '<button type="button" class="knapp hoved" id="es-videre">' + (n < r.laser.length ? tx.videre : tx.ut) + "</button>");
      $("es-videre").addEventListener("click", () => (n < r.laser.length ? las() : ferdig()));
      $("es-videre").focus();
    };

    const ferdig = () => {
      clearInterval(tikk);
      status();
      $("es-spill").innerHTML = '<section class="ko-kort es-kort es-ferdig"><p class="kd-merke" aria-hidden="true">🗝️</p><h2 tabindex="-1">' + tx.fri + "</h2><p>" + fmt(r.slutt) + '</p><p class="es-resultat">' + tx.bruktTid + ": <strong>" + mmss(sek + straff) + "</strong> · " + hint + " " + tx.hintBrukt + "</p>" +
        '<p><button type="button" class="knapp hoved" id="es-igjen">' + tx.igjen + '</button> <a class="knapp" href="escape.html">' + tx.andre + "</a>" + (tema ? ' <a class="knapp" href="tema.html?id=' + encodeURIComponent(tema.id) + '">' + tx.les + " «" + esc(tema.tittel) + "» →</a>" : "") + "</p></section>";
      $("es-spill").querySelector("h2").focus();
      $("es-igjen").addEventListener("click", () => { n = 0; sek = 0; straff = 0; hint = 0; intro(); });
    };
    intro();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const r = LV.escape.find(x => x.id === LV.param("id"));
    if (r) rom(r); else oversikt();
  });
})();
