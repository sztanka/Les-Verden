/* =========================================================
   Les verden – Lag en lov (lov.html)
   Velg en sak → hvem foreslår → høring → komiteen (kompromisser)
   → debatt → votering → veien videre. Partiene er oppdiktet.
   Data: data/lov.js. Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const FLERTALL = 85;

  function bygg() {
    const L = LV.lov;
    document.title = "Lag en lov – " + (LV.config ? LV.config.navn : "Les verden");
    let sak, valgte, steg;
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › Lag en lov</nav>' +
      '<header class="sidehode"><p class="overlinje">Spill · demokrati</p><h1>⚖️ Lag en lov</h1><p class="ingress">Du har en idé til en ny lov. Men hvordan blir en idé til lov i Norge? Følg forslaget fra høring til votering – og prøv å få flertall i et Storting med oppdiktede partier.</p></header>' +
      '<ol class="lo-steg" id="lo-steg" aria-label="Steg"></ol><div id="lo-spill" class="ko-spill"></div>';

    const STEG = ["Velg sak", "Forslag", "Høring", "Komiteen", "Debatt", "Votering"];
    const visSteg = () => { $("lo-steg").innerHTML = STEG.map((s, i) => '<li class="' + (i < steg ? "ferdig" : i === steg ? "aktiv" : "") + '"' + (i === steg ? ' aria-current="step"' : "") + ">" + esc(s) + "</li>").join(""); };
    const vis = (html) => { visSteg(); $("lo-spill").innerHTML = html; const h = $("lo-spill").querySelector("h2"); if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); } $("lo-steg").scrollIntoView({ behavior: "smooth", block: "start" }); };

    const score = (p) => {
      let s = sak.score[p.id] || 0;
      valgte.forEach(i => { s += sak.kompromiss[i].d[p.id] || 0; });
      return s;
    };
    const telling = () => {
      let ja = 0, nei = 0, avst = 0;
      L.partier.forEach(p => { const s = score(p); if (s > 0) ja += p.plasser; else if (s < 0) nei += p.plasser; else avst += p.plasser; });
      return { ja, nei, avst };
    };
    const salen = () => {
      const seter = [];
      L.partier.forEach(p => { const s = score(p); for (let i = 0; i < p.plasser; i++) seter.push({ p, s }); });
      return '<div class="lo-sal" aria-hidden="true">' + seter.map(x => '<span class="lo-sete ' + (x.s > 0 ? "ja" : x.s < 0 ? "nei" : "avst") + '" style="--pf:' + x.p.farge + '"></span>').join("") + "</div>";
    };
    const tellingHtml = () => { const t = telling(); return '<p class="lo-telling" role="status"><span class="ja">Ja: <strong>' + t.ja + '</strong></span> <span class="nei">Nei: <strong>' + t.nei + '</strong></span> <span class="avst">Avstår: <strong>' + t.avst + "</strong></span> · Det trengs <strong>" + FLERTALL + "</strong> for flertall.</p>"; };

    function velgSak() {
      steg = 0; valgte = [];
      vis('<section class="ko-kort"><h2>Hvilken lov vil du lage?</h2><ul class="lo-saker">' + L.saker.map((s, i) => '<li><button type="button" class="fo-valgknapp lo-sak" data-i="' + i + '"><span aria-hidden="true">' + s.ikon + "</span> <strong>" + esc(s.tittel) + "</strong><br><small>" + esc(s.forslag) + "</small></button></li>").join("") + "</ul></section>");
      $("lo-spill").querySelectorAll(".lo-sak").forEach(b => b.addEventListener("click", () => { sak = L.saker[+b.dataset.i]; hvem(); }));
    }

    function hvem() {
      steg = 1;
      const q = L.hvem;
      vis('<section class="ko-kort"><h2>Hvem kan foreslå loven?</h2><p>' + esc(q.s) + '</p><div class="fo-valg">' + q.valg.map((v, i) => '<button type="button" class="fo-valgknapp" data-i="' + i + '">' + esc(v) + "</button>").join("") + '</div><div id="lo-svar" aria-live="polite"></div></section>');
      $("lo-spill").querySelectorAll(".fo-valgknapp").forEach(b => b.addEventListener("click", () => {
        const rett = +b.dataset.i === q.riktig;
        $("lo-spill").querySelectorAll(".fo-valgknapp").forEach(x => { x.disabled = true; if (+x.dataset.i === q.riktig) x.classList.add("lo-rett"); });
        $("lo-svar").innerHTML = '<div class="kd-fasit ' + (rett ? "ok" : "ikke") + '"><p><strong>' + (rett ? "✔ Riktig!" : "✘ Ikke helt.") + "</strong> " + esc(q.forklaring) + '</p></div><p>I dette spillet er du en stortingsrepresentant som legger fram et <strong>representantforslag</strong>:</p><blockquote class="lo-forslag">' + esc(sak.forslag) + '</blockquote><button type="button" class="knapp hoved" id="lo-neste">Send på høring →</button>';
        $("lo-neste").addEventListener("click", horing); $("lo-neste").focus();
      }));
    }

    function horing() {
      steg = 2;
      vis('<section class="ko-kort"><h2>Høring: Hva mener andre?</h2><p>Før en lov blir vedtatt, får organisasjoner, kommuner og enkeltpersoner si sin mening. Det kalles en <strong>høring</strong>. Les høringssvarene. Hva er de enige og uenige i?</p>' +
        '<div class="lo-horing">' + sak.horing.map(h => '<article class="lo-hsvar"><h3>✉️ ' + esc(h.fra) + "</h3><p>" + esc(h.tekst) + "</p></article>").join("") + "</div>" +
        '<label class="lo-notat" for="lo-h-notat">Notat: Hva er det viktigste du lærte av høringen?</label><textarea id="lo-h-notat" rows="3"></textarea>' +
        '<button type="button" class="knapp hoved" id="lo-neste">Til komiteen →</button></section>');
      $("lo-neste").addEventListener("click", komite);
    }

    function komite() {
      steg = 3;
      const tegn = () => {
        const t = telling();
        $("lo-komite").innerHTML = salen() + tellingHtml() +
          '<ul class="lo-partier">' + L.partier.map(p => { const s = score(p); return '<li style="--pf:' + p.farge + '"><span class="lo-pnavn"><strong>' + esc(p.navn) + "</strong> (" + p.plasser + ')</span><span class="lo-stemme ' + (s > 0 ? "ja" : s < 0 ? "nei" : "avst") + '">' + (s > 0 ? "Ja" : s < 0 ? "Nei" : "Avstår") + "</span><small>" + esc(sak.grunner[p.id]) + "</small></li>"; }).join("") + "</ul>" +
          '<p class="ko-igjen ' + (t.ja >= FLERTALL ? "ok" : "") + '">' + (t.ja >= FLERTALL ? "✔ Forslaget har flertall nå. Men har du gitt bort for mye?" : "Forslaget mangler " + (FLERTALL - t.ja) + " stemmer for å få flertall.") + "</p>";
      };
      vis('<section class="ko-kort"><h2>Komiteen: Forhandlinger</h2><p>Forslaget behandles i en fagkomité. Her forhandler partiene. Du kan endre forslaget med <strong>kompromisser</strong> for å få flere partier med – men noen partier liker dem kanskje ikke. Prøv deg fram!</p>' +
        '<fieldset class="lo-komp"><legend>Kompromisser du kan gå med på</legend>' + sak.kompromiss.map((k, i) => '<label><input type="checkbox" data-i="' + i + '"> ' + esc(k.t) + "</label>").join("") + "</fieldset>" +
        '<div id="lo-komite" aria-live="polite"></div><button type="button" class="knapp hoved" id="lo-neste">Til debatten i stortingssalen →</button></section>');
      $("lo-spill").querySelectorAll(".lo-komp input").forEach(c => c.addEventListener("change", () => { valgte = [...$("lo-spill").querySelectorAll(".lo-komp input:checked")].map(x => +x.dataset.i); tegn(); }));
      tegn();
      $("lo-neste").addEventListener("click", debatt);
    }

    function debatt() {
      steg = 4;
      const d = L.debatt[sak.id];
      const rek = d.valg.map((v, i) => ({ v, i })).sort(() => Math.random() - 0.5);
      vis('<section class="ko-kort"><h2>Debatten i stortingssalen</h2><p>Du skal holde innlegg for forslaget ditt. Hvilket argument er sterkest – og mest saklig?</p><div class="fo-valg">' +
        rek.map(x => '<button type="button" class="fo-valgknapp" data-i="' + x.i + '">«' + esc(x.v) + "»</button>").join("") + '</div><div id="lo-svar" aria-live="polite"></div></section>');
      $("lo-spill").querySelectorAll(".fo-valgknapp").forEach(b => b.addEventListener("click", () => {
        const rett = +b.dataset.i === d.riktig;
        $("lo-spill").querySelectorAll(".fo-valgknapp").forEach(x => { x.disabled = true; if (+x.dataset.i === d.riktig) x.classList.add("lo-rett"); });
        $("lo-svar").innerHTML = '<div class="kd-fasit ' + (rett ? "ok" : "ikke") + '"><p><strong>' + (rett ? "✔ Godt valgt!" : "✘ Det argumentet er svakt.") + "</strong> Et godt argument bygger på fakta og begrunnelser. De andre argumentene er argumentasjonsfeil: «alle gjør det» eller angrep på motstanderne. Les mer i <a href=\"debatt.html\">Debattduell</a>.</p></div>" +
          '<button type="button" class="knapp hoved" id="lo-neste">🗳️ Til votering →</button>';
        $("lo-neste").addEventListener("click", votering); $("lo-neste").focus();
      }));
    }

    function votering() {
      steg = 5;
      const t = telling(), vedtatt = t.ja >= FLERTALL;
      vis('<section class="ko-kort ko-valg"><h2>Votering: ' + (vedtatt ? "Forslaget er vedtatt! 🎉" : "Forslaget falt") + "</h2>" + salen() + tellingHtml() +
        "<p>" + (vedtatt ? "Gratulerer – du fikk flertall. " + (valgte.length ? "Du måtte inngå " + valgte.length + " kompromiss" + (valgte.length > 1 ? "er" : "") + ": " + valgte.map(i => "«" + esc(sak.kompromiss[i].t) + "»").join(", ") + "." : "Du fikk flertall uten kompromisser!") : "Det manglet " + (FLERTALL - t.ja) + " stemmer. Prøv andre kompromisser – eller finn ut om forslaget rett og slett ikke har støtte.") + "</p>" +
        '<h3>Veien videre for en lov</h3><ol class="lo-prosess">' + L.prosess.map(([a, b], i) => '<li class="' + (i < 4 ? "ferdig" : "") + '"><strong>' + esc(a) + ":</strong> " + esc(b) + "</li>").join("") + "</ol>" +
        '<p><button type="button" class="knapp hoved" id="lo-igjen">↺ Prøv igjen</button> <button type="button" class="knapp" id="lo-ny">Velg en annen sak</button> <a class="knapp" href="tema.html?id=sf8-demokratiet-i-norge">Les om Stortinget →</a></p></section>' +
        '<section class="fo-oppgaver"><h2>Snakk og skriv</h2><ol>' + [
          "Hvorfor må partiene ofte inngå kompromisser for å få flertall?",
          "Er et kompromiss en seier eller et nederlag? Begrunn svaret.",
          "Hvorfor tror du lover sendes på høring før de blir vedtatt?",
          "Hvordan kan du som ungdom påvirke en lov før den blir vedtatt?"
        ].map((s, i) => '<li><label for="lo-s-' + i + '">' + esc(s) + '</label><textarea id="lo-s-' + i + '" rows="3"></textarea></li>').join("") +
        '</ol><h3>✍️ Skriveoppgave</h3><label for="lo-skriv">Skriv et kort høringssvar (5–8 setninger) om forslaget «' + esc(sak.tittel) + '». Si hva du mener, og begrunn det.</label><textarea id="lo-skriv" rows="8"></textarea></section>');
      $("lo-igjen").addEventListener("click", () => { valgte = []; komite(); });
      $("lo-ny").addEventListener("click", velgSak);
    }

    velgSak();
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
  }
  document.addEventListener("DOMContentLoaded", bygg);
})();
