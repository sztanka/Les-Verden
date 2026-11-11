/* =========================================================
   Les verden – Ord som har reist (ordreise.html)
   1) Utforsk: alle ordene, filter på kategori og språk + søk
   2) Ordquiz: Hvor kommer ordet fra? (10 spørsmål)
   3) Skriv: ordets reisebrev og ord fra ditt eget språk
   ?ord=<ord> åpner og markerer ett ord. ?k=<kategori> filtrerer.
   Data: data/ordreise.js. Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const K = () => LV.ordreiseKategorier;
  const sprakMerke = i => i.split(" ").map(s => '<span class="or-sp or-' + s + '">' + (s === "nb" ? "norsk" : "engelsk") + "</span>").join("");

  function kort(w, i) {
    const tema = w.tema && LV.temaer && LV.temaer.find(t => t.id === w.tema);
    return '<li class="or-kort" id="ord-' + i + '" data-k="' + w.k + '" data-i="' + w.i + '"><div class="or-topp"><h3 lang="' + (w.i === "en" ? "en" : "nb") + '">' + esc(w.o) + '</h3><span class="or-kat" title="' + esc(K()[w.k][1]) + '"><span aria-hidden="true">' + K()[w.k][0] + "</span> " + esc(K()[w.k][1]) + "</span></div>" +
      '<ol class="or-rute" aria-label="Ordets reise">' + w.rute.map(r => "<li>" + esc(r) + "</li>").join("") + "</ol>" +
      '<p class="or-meta">' + sprakMerke(w.i) + ' <span class="or-tid">🕰️ ' + esc(w.tid) + '</span> <span class="or-reg">🌍 ' + esc(w.r) + "</span></p>" +
      '<p class="or-h">' + esc(w.h) + "</p>" + (tema ? '<p class="or-tema"><a href="tema.html?id=' + encodeURIComponent(tema.id) + '">Temaet «' + esc(tema.tittel) + "» →</a></p>" : "") + "</li>";
  }

  function bygg() {
    document.title = "Ord som har reist – " + (LV.config ? LV.config.navn : "Les verden");
    const ord = LV.ordreise;
    const valgtK = LV.param("k") || "";
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › Ord som har reist</nav>' +
      '<header class="sidehode"><p class="overlinje">Språk og historie</p><h1>🧳 Ord som har reist</h1><p class="ingress">Ord reiser med vikinger, kjøpmenn, soldater og kolonister – og med mat, spill og teknologi. Når du vet hvor et ord kommer fra, får du et glimt av historien. Visste du at «sky» er et vikingord, at «sjakk» kommer fra persisk, og at «sjampo» kommer fra hindi?</p>' +
      '<nav class="dsp-innhold" aria-label="På denne siden"><ol><li><a href="#utforsk">Utforsk ordene</a></li><li><a href="#quiz">Ordquiz</a></li><li><a href="#skriv">Skriv</a></li><li><a href="#morsmal">Ord fra ditt språk</a></li></ol></nav></header>' +
      '<section id="utforsk" aria-labelledby="or-u"><h2 id="or-u">🔍 Utforsk ordene</h2>' +
      '<div class="or-filter"><div role="group" aria-label="Kategori" class="or-kats"><button type="button" class="knapp liten" data-k="" aria-pressed="' + (!valgtK) + '">Alle</button>' + Object.entries(K()).map(([k, v]) => '<button type="button" class="knapp liten" data-k="' + k + '" aria-pressed="' + (valgtK === k) + '"><span aria-hidden="true">' + v[0] + "</span> " + v[1] + "</button>").join("") + "</div>" +
      '<div class="or-rad"><label>Språk <select id="or-sprak"><option value="">Norsk og engelsk</option><option value="nb">Finnes i norsk</option><option value="en">Finnes i engelsk</option></select></label><label>Søk <input type="search" id="or-sok" placeholder="For eksempel kaffe"></label><span id="or-antall" role="status" aria-live="polite"></span></div></div>' +
      '<ul class="or-liste" id="or-liste">' + ord.map(kort).join("") + "</ul></section>" +
      '<section id="quiz" aria-labelledby="or-q"><h2 id="or-q">🧭 Ordquiz: Hvor kommer ordet fra?</h2><div id="or-quiz"><p>Ti ord. Gjett hvilken del av verden de kommer fra – og les historien bak hvert ord.</p><button type="button" class="knapp hoved" id="or-start">Start quizen</button></div></section>' +
      '<section id="skriv" aria-labelledby="or-s"><h2 id="or-s">✍️ Skriv: Ordets reisebrev</h2><p>Velg et ord fra lista. Skriv et reisebrev der ordet selv forteller om reisen sin: Hvor ble det født? Hvem tok det med seg? Hva opplevde det underveis? Bruk minst tre fakta fra kortet.</p>' +
      '<label for="or-valgtord">Ordet jeg skriver om</label><input type="text" id="or-valgtord"><label for="or-brev">Reisebrevet</label><textarea id="or-brev" rows="10"></textarea></section>' +
      '<section id="morsmal" aria-labelledby="or-m"><h2 id="or-m">🌐 Ord fra ditt språk</h2><p>Mange språk har lånt ord fra hverandre. Kanskje snakker du et språk hjemme som har gitt ord til norsk eller engelsk – eller som har lånt ord fra dem? Finn minst tre ord og fortell historien bak dem. Spør gjerne noen hjemme.</p>' +
      '<ul class="or-tips"><li><strong>Arabisk:</strong> sukker, kaffe, algebra, admiral og magasin kommer fra arabisk. Hvilke andre kjenner du?</li><li><strong>Tyrkisk:</strong> kiosk, yoghurt – og «horde» fra «ordu». Hvilke ord har tyrkisk lånt fra fransk eller engelsk?</li><li><strong>Polsk og ukrainsk:</strong> Hvilke ord har polsk og ukrainsk lånt fra tysk, russisk eller engelsk? Hvilke er like norske ord?</li><li><strong>Samisk:</strong> «tundra» er et samisk ord som har reist jorda rundt. Se også temaet om fornorskingen.</li></ul>' +
      '<label for="or-mine">Mine ord og historiene bak dem</label><textarea id="or-mine" rows="8"></textarea><p><a href="morsmal.html">🌐 Se også begrepene på morsmål →</a></p></section>' +
      '<p class="mu-intro">For læreren: Ordene passer som oppstart til temaer om vikingtid, handel, kolonialisme og globalisering – og til engelsktemaene om norsk og engelsk og engelsk i verden. La flerspråklige elever være eksperter. Etymologier kan være omdiskuterte; ord markert med «trolig» er usikre.</p>';

    let kat = valgtK;
    const filtrer = () => {
      const sp = $("or-sprak").value, q = $("or-sok").value.trim().toLowerCase();
      let n = 0;
      document.querySelectorAll(".or-kort").forEach((el, i) => {
        const w = ord[i];
        const vis = (!kat || w.k === kat) && (!sp || w.i.split(" ").includes(sp)) && (!q || (w.o + " " + w.h + " " + w.rute.join(" ")).toLowerCase().includes(q));
        el.hidden = !vis; if (vis) n++;
      });
      $("or-antall").textContent = n + " ord";
    };
    document.querySelectorAll(".or-kats button").forEach(b => b.addEventListener("click", () => { kat = b.dataset.k; document.querySelectorAll(".or-kats button").forEach(x => x.setAttribute("aria-pressed", String(x === b))); filtrer(); }));
    $("or-sprak").addEventListener("change", filtrer);
    $("or-sok").addEventListener("input", filtrer);
    filtrer();
    const valgtOrd = LV.param("ord");
    if (valgtOrd) { const i = ord.findIndex(w => w.o.toLowerCase() === valgtOrd.toLowerCase()); if (i >= 0) { const el = $("ord-" + i); el.classList.add("or-valgt"); setTimeout(() => el.scrollIntoView({ block: "center" }), 50); } }

    // Quiz
    $("or-start").addEventListener("click", () => quiz());
    function quiz() {
      const sp = bland(ord).slice(0, 10); let n = 0, p = 0;
      const vis = () => {
        const w = sp[n];
        const valg = bland([w.r].concat(bland(LV.ordreiseRegioner.filter(r => r !== w.r)).slice(0, 3)));
        $("or-quiz").innerHTML = '<p class="tr-nr">Ord ' + (n + 1) + " av " + sp.length + " · " + p + ' poeng</p><p class="or-quizord" lang="' + (w.i === "en" ? "en" : "nb") + '">' + esc(w.o) + "</p><p>Hvor i verden kommer ordet fra?</p>" +
          '<div class="fo-valg" role="group" aria-label="Velg region">' + valg.map(r => '<button type="button" class="fo-valgknapp or-q" data-r="' + esc(r) + '">' + esc(r) + "</button>").join("") + '</div><div id="or-qsvar" role="status" aria-live="polite"></div>';
        document.querySelectorAll(".or-q").forEach(b => b.addEventListener("click", () => {
          const ok = b.dataset.r === w.r; if (ok) p++;
          document.querySelectorAll(".or-q").forEach(x => { x.disabled = true; if (x.dataset.r === w.r) x.classList.add("riktig"); else if (x === b) x.classList.add("feil"); });
          $("or-qsvar").innerHTML = '<div class="tr-fasit"><p class="tr-stor">' + (ok ? "✔ Riktig!" : "✗ Det var " + esc(w.r) + ".") + '</p><ol class="or-rute">' + w.rute.map(r => "<li>" + esc(r) + "</li>").join("") + "</ol><p>" + esc(w.h) + '</p><button type="button" class="knapp hoved" id="or-neste">' + (n < sp.length - 1 ? "Neste ord →" : "Se resultatet") + "</button></div>";
          $("or-neste").addEventListener("click", () => { n++; n < sp.length ? vis() : slutt(); });
          $("or-neste").focus();
        }));
      };
      const slutt = () => {
        $("or-quiz").innerHTML = '<div class="kd-slutt"><p class="kd-merke" aria-hidden="true">' + (p >= 8 ? "🏆" : p >= 5 ? "🧳" : "🌍") + "</p><h3>" + p + ' av 10 riktige</h3><p>Hvilket ord overrasket deg mest? Skriv reisebrevet om det ordet nedenfor!</p><button type="button" class="knapp hoved" id="or-igjen">↺ Ti nye ord</button></div>';
        $("or-igjen").addEventListener("click", quiz);
      };
      vis();
    }

    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
  }
  document.addEventListener("DOMContentLoaded", bygg);
})();
