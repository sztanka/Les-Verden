/* =========================================================
   Les verden – Fire hjørner (hjorner.html)
   Storskjerm: en påstand vises, elevene går til hjørnet som
   passer best. Påstandene hentes fra Debattduell (data/debatt.js)
   og fra lista under. Læreren kan også skrive sin egen påstand.
   ?sprak=nb|en. Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  const EKSTRA = {
    nb: ["Det er viktigere å være snill enn å være ærlig.", "Alle ungdommer bør ha sommerjobb.", "Kongehuset bør avskaffes.", "Det bør være gratis kollektivtransport for alle under 20 år.", "Lekser gjør mer skade enn nytte.", "Norge bør ta imot flere flyktninger.", "Det er greit å laste ned musikk og film uten å betale.", "Skolen bør begynne klokka ti.", "Det burde vært forbudt å selge energidrikk til folk under 18.", "Man lærer mer av å feile enn av å lykkes.", "Kjøtt burde vært dyrere av hensyn til klimaet.", "Det er greit å si en hvit løgn for å skåne noens følelser."],
    en: ["It is more important to be kind than to be honest.", "Everyone should learn a third language at school.", "Video games are a waste of time.", "Famous people should be good role models.", "School uniforms are a good idea.", "It is better to live in a big city than in the countryside.", "You learn more from failing than from succeeding.", "Teenagers should be allowed to vote.", "Books are better than films.", "Every student should do volunteer work."]
  };
  const HJ = {
    nb: [["Helt enig", "💚"], ["Litt enig", "💛"], ["Litt uenig", "🧡"], ["Helt uenig", "❤️"]],
    en: [["Strongly agree", "💚"], ["Agree", "💛"], ["Disagree", "🧡"], ["Strongly disagree", "❤️"]]
  };
  const GANG = {
    nb: ["Les påstanden. Gå til hjørnet som passer best for deg (30 sekunder).", "Snakk med de andre i hjørnet: Finn det beste argumentet for synet deres (2 minutter).", "Ett argument fra hvert hjørne – i full klasse.", "Har noen ombestemt seg? Bytt hjørne – og forklar hvorfor!"],
    en: ["Read the statement. Go to the corner that fits you best (30 seconds).", "Talk in your corner: find the best argument for your view (2 minutes).", "One argument from each corner – to the whole class.", "Has anyone changed their mind? Move – and explain why!"]
  };

  function bygg() {
    const sp = LV.param("sprak") === "en" ? "en" : "nb";
    const fra = (LV.debatt ? LV.debatt.pastander.filter(p => p.sprak === sp).map(p => p.pastand) : []);
    let liste = bland(fra.concat(EKSTRA[sp])), n = 0, fase = 0, tid = 0, tikk = null;
    document.title = "Fire hjørner – " + (LV.config ? LV.config.navn : "Les verden");

    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › Fire hjørner</nav>' +
      '<header class="sidehode"><p class="overlinje">Storskjerm · muntlig</p><h1>🧭 Fire hjørner</h1><p class="ingress">Vis en påstand på tavla. Elevene går til hjørnet som passer best, snakker sammen og begrunner synet sitt. Merk de fire hjørnene i klasserommet med fargene.</p>' +
      '<div class="kd-filter" role="group" aria-label="Språk"><a class="knapp liten" href="hjorner.html"' + (sp === "nb" ? ' aria-current="true"' : "") + '>Norsk</a><a class="knapp liten" href="hjorner.html?sprak=en"' + (sp === "en" ? ' aria-current="true"' : "") + ">English</a></div></header>" +
      '<section class="hj-scene" id="hj-scene"' + (sp === "en" ? ' lang="en"' : "") + '></section>' +
      '<form class="hj-egen" id="hj-egen"><label for="hj-tekst">Skriv din egen påstand</label><input id="hj-tekst" type="text" autocomplete="off" placeholder="' + (sp === "en" ? "Your statement …" : "Din påstand …") + '"><button class="knapp" type="submit">Vis</button></form>';

    const tegn = () => {
      const p = liste[n];
      $("hj-scene").innerHTML = '<div class="hj-hjorner" aria-hidden="true">' + HJ[sp].map(([t, f], i) => '<span class="hj-hjorne h' + i + '"><span>' + f + "</span>" + esc(t) + "</span>").join("") + "</div>" +
        '<p class="hj-nr">' + (n + 1) + " / " + liste.length + '</p><p class="hj-pastand">' + esc(p) + "</p>" +
        '<ol class="hj-gang">' + GANG[sp].map((g, i) => '<li class="' + (i === fase ? "aktiv" : i < fase ? "ferdig" : "") + '">' + esc(g) + "</li>").join("") + "</ol>" +
        '<div class="hj-knapper"><button type="button" class="knapp" id="hj-forrige"' + (n ? "" : " disabled") + '>← ' + (sp === "en" ? "Previous" : "Forrige") + '</button><button type="button" class="knapp hoved" id="hj-fase">' + (fase < 3 ? (sp === "en" ? "Next step" : "Neste trinn") + " ▸" : (sp === "en" ? "Next statement" : "Ny påstand") + " →") + '</button><button type="button" class="knapp" id="hj-tid">⏱ ' + (tikk ? fmtTid(tid) : "2:00") + '</button><button type="button" class="knapp" id="hj-full">⛶ ' + (sp === "en" ? "Full screen" : "Fullskjerm") + "</button></div>";
      $("hj-forrige").addEventListener("click", () => { n = Math.max(0, n - 1); fase = 0; tegn(); });
      $("hj-fase").addEventListener("click", () => { if (fase < 3) fase++; else { n = (n + 1) % liste.length; fase = 0; } tegn(); });
      $("hj-tid").addEventListener("click", startTid);
      $("hj-full").addEventListener("click", () => { const s = $("hj-scene"); if (document.fullscreenElement) document.exitFullscreen(); else if (s.requestFullscreen) s.requestFullscreen(); });
    };
    const fmtTid = s => Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
    const startTid = () => {
      if (tikk) { clearInterval(tikk); tikk = null; $("hj-tid").textContent = "⏱ 2:00"; return; }
      tid = 120; $("hj-tid").textContent = "⏱ " + fmtTid(tid);
      tikk = setInterval(() => { tid--; const b = $("hj-tid"); if (b) b.textContent = "⏱ " + fmtTid(Math.max(0, tid)); if (tid <= 0) { clearInterval(tikk); tikk = null; if (b) b.textContent = "⏰ " + (sp === "en" ? "Time!" : "Tiden er ute!"); } }, 1000);
    };
    document.addEventListener("keydown", e => {
      if (e.target.closest("input, textarea")) return;
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); $("hj-fase").click(); }
      if (e.key === "ArrowLeft") $("hj-forrige").click();
    });
    $("hj-egen").addEventListener("submit", e => { e.preventDefault(); const v = $("hj-tekst").value.trim(); if (!v) return; liste.splice(n + 1, 0, v); n++; fase = 0; $("hj-tekst").value = ""; tegn(); });
    tegn();
  }
  document.addEventListener("DOMContentLoaded", bygg);
})();
