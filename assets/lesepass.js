/* =========================================================
   Les verden – Lesepass (lesepass.html)
   Stempler for leseaktiviteter på nettstedet. Eleven krysser av
   og skriver hva hen leste. Ingenting lagres – passet lastes ned
   og hentes inn igjen med svarfil.js («Last ned» / «Fortsett fra fil»),
   eller skrives ut.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const GRUPPER = [
    ["📚", "Les", [
      ["sf", "Les et tema i samfunnsfag", "index.html?fag=samfunnsfag#temaer"],
      ["en", "Les et tema i engelsk", "index.html?fag=engelsk#temaer"],
      ["novelle", "Les en novelle i Reading Room", "lesing.html"],
      ["dikt", "Les et dikt", "lesing.html"],
      ["tale", "Les en tale eller en selvbiografi", "lesing.html"],
      ["kilde", "Analyser en ekte historisk kilde", "kilder.html"],
      ["par", "Sammenlign to tekster i et tekstpar", "tekstpar.html"],
      ["bok", "Les en bok du har valgt selv", "lesedagbok.html"]
    ]],
    ["🧠", "Les smart", [
      ["strategi", "Bruk en lesestrategi før, under og etter lesing", "lesestrategier.html"],
      ["oppgaveord", "Plukk fra hverandre en oppgavetekst", "oppgaveord.html"],
      ["kildedetektiv", "Avslør en falsk eller vinklet kilde", "kildedetektiv.html"],
      ["samtidig", "Finn ut hva som skjedde samtidig i verden", "samtidig.html"]
    ]],
    ["🗣️", "Lytt og les høyt", [
      ["leseflyt", "Les høyt tre runder i Leseflyt", "leseflyt.html"],
      ["lytt", "Gjennomfør en lytteøkt med stopp", "lytt.html"],
      ["intervju", "Gjennomfør et historisk intervju", "intervju.html"]
    ]],
    ["✍️", "Skap", [
      ["blackout", "Lag et blackout-dikt", "svartut.html"],
      ["tegneserie", "Lag en tegneserie", "tegneserie.html"],
      ["quiz", "Lag en quiz eller tidslinje til klassen", "lag.html"],
      ["perspektiv", "Skriv fra to perspektiver", "perspektiv.html"],
      ["skrivemal", "Skriv med en skrivemal", "skrivemal.html"]
    ]]
  ];
  const NIVAER = [[5, "🥉", "Bronse"], [10, "🥈", "Sølv"], [15, "🥇", "Gull"], [20, "💎", "Diamant"]];

  document.addEventListener("DOMContentLoaded", () => {
    const alle = GRUPPER.reduce((s, g) => s + g[2].length, 0);
    document.title = "Lesepass – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="lesestrategier.html">Lese og skrive</a> › Lesepass</nav>' +
      '<header class="sidehode"><p class="overlinje">Samle stempler</p><h1>🛂 Lesepass</h1><p class="ingress">Samle stempler for alt du leser og gjør på Les verden. Kryss av, skriv hva du leste – og se hvordan passet fylles opp. ' + alle + " stempler å samle, og fire nivåer å nå.</p></header>" +
      '<div class="lp-viktig"><p><strong>Husk å ta vare på passet!</strong> Nettstedet lagrer ingenting. Trykk «Last ned svarene» nederst når du er ferdig for i dag, og «Fortsett fra fil» neste gang. Du kan også skrive ut passet.</p></div>' +
      '<section class="lp-status" aria-labelledby="lp-status-h"><h2 id="lp-status-h" class="skjult-visuelt">Status</h2><div class="lp-teller"><span id="lp-antall">0</span><span> av ' + alle + ' stempler</span></div><div class="lp-mal" role="img" id="lp-mal" aria-label=""><div class="lp-fyll" id="lp-fyll"></div>' + NIVAER.map(([n, ikon, navn]) => '<span class="lp-merke" style="left:' + (n / alle * 100) + '%" data-n="' + n + '" title="' + navn + '"><span aria-hidden="true">' + ikon + "</span></span>").join("") + '</div><p class="lp-niva" id="lp-niva" aria-live="polite"></p></section>' +
      GRUPPER.map(([ikon, navn, liste]) => '<section class="lp-gruppe"><h2><span aria-hidden="true">' + ikon + "</span> " + navn + '</h2><ul class="lp-stempler">' + liste.map(([id, tekst, lenke]) =>
        '<li class="lp-stempel" id="lp-kort-' + id + '"><div class="lp-stempel-merke" aria-hidden="true"><span>' + ikon + '</span></div><div class="lp-stempel-innhold"><label class="lp-ok"><input type="checkbox" id="lp-' + id + '-ok"> <span>' + esc(tekst) + '</span></label><label class="skjult-visuelt" for="lp-' + id + '-hva">Hva leste eller gjorde du? (' + esc(tekst) + ')</label><input type="text" id="lp-' + id + '-hva" placeholder="Hva leste eller gjorde du?" autocomplete="off"><a class="lp-lenke" href="' + lenke + '">Gå dit →</a></div></li>').join("") + "</ul></section>").join("") +
      '<section class="le-del"><h2>Tenk over lesingen din</h2>' + [["lp-r1", "Hva var det beste du leste? Hvorfor?"], ["lp-r2", "Hva vil du lese neste gang?"]].map(([id, l]) => '<label class="mu-notat" for="' + id + '"><span>' + l + '</span><textarea id="' + id + '" rows="2"></textarea></label>').join("") +
      '<p><button type="button" class="knapp" id="lp-skriv">🖨️ Skriv ut lesepasset</button></p><p class="lp-signatur">Lærerens signatur: ____________________</p></section>' +
      '<p class="fo-merk">Til læreren: Lesepasset bygger på tillit – eleven krysser av selv. Be gjerne om å se det eleven har laget eller skrevet før du signerer. Nivåene kan knyttes til en felles feiring i klassen.</p>';

    function oppdater() {
      let n = 0;
      document.querySelectorAll(".lp-stempel").forEach(li => { const ok = li.querySelector('input[type="checkbox"]').checked; li.classList.toggle("stemplet", ok); if (ok) n++; });
      $("lp-antall").textContent = n;
      $("lp-fyll").style.width = (n / alle * 100) + "%";
      const naadd = NIVAER.filter(x => n >= x[0]).pop(), neste = NIVAER.find(x => n < x[0]);
      document.querySelectorAll(".lp-merke").forEach(m => m.classList.toggle("naadd", n >= +m.dataset.n));
      $("lp-niva").textContent = (naadd ? naadd[1] + " Du har nådd " + naadd[2].toLowerCase() + "! " : "") + (neste ? "Bare " + (neste[0] - n) + " stempler til " + neste[2].toLowerCase() + "." : "Du har samlet alle stemplene. Fantastisk!");
      $("lp-mal").setAttribute("aria-label", n + " av " + alle + " stempler samlet");
    }
    document.querySelectorAll('.lp-stempel input[type="checkbox"]').forEach(c => c.addEventListener("change", oppdater));
    // Skriver eleven noe, krysses stempelet av automatisk
    document.querySelectorAll('.lp-stempel input[type="text"]').forEach(t => t.addEventListener("input", () => { const c = t.closest(".lp-stempel").querySelector('input[type="checkbox"]'); if (t.value.trim() && !c.checked) { c.checked = true; oppdater(); } }));
    $("lp-skriv").addEventListener("click", () => window.print());
    oppdater();

    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
  });
})();
