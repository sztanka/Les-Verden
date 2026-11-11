/* =========================================================
   Les verden – Begreper på morsmål (morsmal.html)
   Sentrale fagbegreper på norsk med oversettelse til arabisk,
   ukrainsk, tyrkisk og polsk. Søk, velg språk, lytt (hvis
   nettleseren har stemme) og øv med ordkort.
   Data: data/morsmal.js · Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  document.addEventListener("DOMContentLoaded", () => {
    const M = LV.morsmal, S = M.sprak;
    let valgt = LV.param("mm") && S.some(s => s.kode === LV.param("mm")) ? LV.param("mm") : "", sok = "";
    const kanLese = "speechSynthesis" in window;
    const stemme = s => kanLese ? speechSynthesis.getVoices().find(v => v.lang && v.lang.toLowerCase().startsWith(s.tale.toLowerCase().slice(0, 2))) : null;
    document.title = "Begreper på morsmål – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="begreper.html">Begrepsbank</a> › Begreper på morsmål</nav>' +
      '<header class="sidehode"><p class="overlinje">Flerspråklig støtte</p><h1>🌐 Begreper på morsmål</h1><p class="ingress">Når du kjenner et begrep på ditt eget språk, er det lettere å forstå det på norsk. Her finner du sentrale begreper fra samfunnsfag på ' + S.map(s => s.navn.toLowerCase()).join(", ").replace(/, ([^,]*)$/, " og $1") + ".</p>" +
      '<p class="mm-sprakrad" lang="und">' + S.map(s => '<span lang="' + s.kode + '"' + (s.rtl ? ' dir="rtl"' : "") + ">" + esc(s.eget) + "</span>").join(" · ") + "</p></header>" +
      '<div class="lp-viktig"><p><strong>Til elever og foresatte:</strong> Oversettelsene er laget for å hjelpe, men er ikke sjekket av en morsmålslærer ennå. Ser du en feil? Si fra til læreren.</p><p>🧳 Visste du at mange norske og engelske ord kommer fra arabisk, persisk, tyrkisk og andre språk? Se <a href="ordreise.html">Ord som har reist</a>.</p></div>' +
      '<div class="mm-verktoy"><fieldset class="mm-velg"><legend>Vis språk</legend><label><input type="radio" name="mm-sprak" value=""' + (valgt ? "" : " checked") + "> Alle</label>" + S.map(s => '<label><input type="radio" name="mm-sprak" value="' + s.kode + '"' + (valgt === s.kode ? " checked" : "") + "> " + esc(s.navn) + "</label>").join("") + '</fieldset><label class="mm-sok" for="mm-sok"><span>Søk</span><input type="search" id="mm-sok" placeholder="For eksempel demokrati" autocomplete="off"></label></div>' +
      '<p class="mm-antall" id="mm-antall" role="status" aria-live="polite"></p><div id="mm-tabeller"></div>' +
      '<section class="le-del mm-ov" aria-labelledby="mm-ov-h"><h2 id="mm-ov-h">🃏 Øv med ordkort</h2><p class="mu-intro">Velg et språk og en gruppe. Du ser begrepet på ditt språk – kan du det på norsk?</p>' +
      '<div class="mm-ov-valg"><label>Språk <select id="mm-ov-sprak">' + S.map(s => '<option value="' + s.kode + '">' + esc(s.navn) + "</option>").join("") + '</select></label><label>Gruppe <select id="mm-ov-gruppe"><option value="">Alle begreper</option>' + M.grupper.map(([g], i) => '<option value="' + i + '">' + esc(g) + "</option>").join("") + '</select></label><button type="button" class="knapp hoved" id="mm-ov-start">Start</button></div><div id="mm-ov"></div></section>' +
      '<p class="fo-merk">Til læreren: Morsmålet kan også slås på i Aa-menyen (Lesestøtte) på temasidene og i begrepsbanken – da vises oversettelsen ved forklaringen av begrepet. Oversettelsene ligger i <code>data/morsmal.js</code> og kan rettes der, gjerne sammen med morsmålslærere. Nye språk kan legges til på samme måte.</p>';

    const kol = () => valgt ? S.filter(s => s.kode === valgt) : S;
    function tegn() {
      const q = sok.toLowerCase();
      let antall = 0;
      $("mm-tabeller").innerHTML = M.grupper.map(([gruppe, ord]) => {
        const rader = ord.filter(o => M.ord[o]).filter(o => !q || o.includes(q) || M.ord[o].some(t => t.toLowerCase().includes(q)));
        antall += rader.length;
        if (!rader.length) return "";
        return '<section class="mm-gruppe"><h2>' + esc(gruppe) + '</h2><div class="mm-tabell"><table><thead><tr><th scope="col">Norsk</th>' + kol().map(s => '<th scope="col">' + esc(s.navn) + ' <span lang="' + s.kode + '"' + (s.rtl ? ' dir="rtl"' : "") + ">(" + esc(s.eget) + ")</span></th>").join("") + "</tr></thead><tbody>" +
          rader.map(o => '<tr><th scope="row">' + esc(o) + "</th>" + kol().map(s => { const i = S.indexOf(s); return '<td><span lang="' + s.kode + '"' + (s.rtl ? ' dir="rtl" class="mm-rtl"' : "") + ">" + esc(M.ord[o][i]) + "</span>" + (kanLese ? ' <button type="button" class="mm-lytt" data-k="' + s.kode + '" data-t="' + esc(M.ord[o][i]) + '" aria-label="Lytt: ' + esc(o) + " på " + esc(s.navn.toLowerCase()) + '">🔊</button>' : "") + "</td>"; }).join("") + "</tr>").join("") + "</tbody></table></div></section>";
      }).join("");
      $("mm-antall").textContent = antall + " begreper" + (q ? " passer med søket" : "") + ".";
    }
    document.querySelectorAll('input[name="mm-sprak"]').forEach(r => r.addEventListener("change", () => { valgt = r.value; tegn(); if (valgt) $("mm-ov-sprak").value = valgt; }));
    let t; $("mm-sok").addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { sok = $("mm-sok").value.trim(); tegn(); }, 150); });
    $("mm-tabeller").addEventListener("click", e => {
      const b = e.target.closest(".mm-lytt"); if (!b) return;
      const s = S.find(x => x.kode === b.dataset.k), v = stemme(s);
      if (!v) { b.textContent = "–"; b.title = "Nettleseren din har ingen stemme for " + s.navn.toLowerCase() + "."; b.setAttribute("aria-label", b.title); return; }
      speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(b.dataset.t); u.voice = v; u.lang = v.lang; u.rate = 0.85; speechSynthesis.speak(u);
    });
    if (valgt) $("mm-ov-sprak").value = valgt;
    tegn();

    // Ordkort
    $("mm-ov-start").addEventListener("click", () => {
      const s = S.find(x => x.kode === $("mm-ov-sprak").value), i = S.indexOf(s), g = $("mm-ov-gruppe").value;
      const ord = (g === "" ? Object.keys(M.ord) : M.grupper[+g][1]).filter(o => M.ord[o]);
      let bunke = bland(ord), kan = 0;
      function steg() {
        if (!bunke.length) { $("mm-ov").innerHTML = '<div class="lg-slutt"><p class="lg-slutt-tall">🎉</p><p>Du kan alle ' + ord.length + ' begrepene!</p><button type="button" class="knapp" id="mm-igjen">↻ Øv igjen</button></div>'; $("mm-igjen").addEventListener("click", () => { bunke = bland(ord); kan = 0; steg(); }); $("mm-igjen").focus(); return; }
        const o = bunke[0];
        $("mm-ov").innerHTML = '<p class="lg-teller">Kort igjen: ' + bunke.length + " · Kan: " + kan + '</p><button type="button" class="lg-kort" id="mm-kort"><span class="lg-kort-for" lang="' + s.kode + '"' + (s.rtl ? ' dir="rtl"' : "") + ">" + esc(M.ord[o][i]) + '</span><span class="lg-kort-bak" hidden>' + esc(o) + '</span></button><p class="lg-hint">Si begrepet på norsk, og trykk på kortet for å snu det.</p><p class="lg-kort-knapper" id="mm-kk" hidden><button type="button" class="knapp" id="mm-ov-mer">🔁 Øv mer</button><button type="button" class="knapp hoved" id="mm-kan">✔ Jeg kunne det</button></p>';
        $("mm-kort").addEventListener("click", () => { const k = $("mm-kort"), sn = !k.classList.contains("snudd"); k.classList.toggle("snudd", sn); k.querySelector(".lg-kort-for").hidden = sn; k.querySelector(".lg-kort-bak").hidden = !sn; if (sn) $("mm-kk").hidden = false; });
        $("mm-kan").addEventListener("click", () => { bunke.shift(); kan++; steg(); const k = $("mm-kort"); if (k) k.focus(); });
        $("mm-ov-mer").addEventListener("click", () => { bunke.push(bunke.shift()); steg(); $("mm-kort").focus(); });
      }
      steg(); $("mm-kort") && $("mm-kort").focus();
    });
  });
})();
