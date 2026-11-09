/* =========================================================
   Les verden – Repetisjonsstart (repetisjon.html)
   Fem minutter i starten av timen: blandede spørsmål fra temaer
   klassen har jobbet med før (spredt repetisjon og gjenhenting).
   Spørsmålene lages fra begreper, personer, tidslinje og
   «forstå»-oppgaver i temaene, og blandes på tvers av temaene.
   repetisjon.html?temaer=a,b,c&antall=6&tid=30
   Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const ren = s => String(s).replace(/\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g, "$1").replace(/\*\*/g, "");
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const tilf = a => a[Math.floor(Math.random() * a.length)];
  const aar = d => { const m = String(d).match(/\d{3,4}/); return m ? m[0] : null; };
  const hode = () => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › Repetisjonsstart</nav>';
  const T = {
    nb: { begrep: "Begrep", person: "Person", sant: "Sant eller usant?", forklar: "Forklar", hvaBetyr: b => "Hva betyr «" + b + "»?", hvemVar: n => "Hvem var " + n + "?", santQ: (t, d) => "«" + t + "» – skjedde dette i " + d + "?", ja: "Sant!", nei: (d) => "Usant. Det skjedde i " + d + ".", hvorfor: "Forklar for sidemannen: Hvorfor skjedde dette, og hva førte det til?", aapen: "Ingen fasit – snakk sammen to og to, og sjekk i temaet etterpå." },
    en: { begrep: "Key term", person: "Person", sant: "True or false?", forklar: "Explain", hvaBetyr: b => "What does «" + b + "» mean?", hvemVar: n => "Who was " + n + "?", santQ: (t, d) => "«" + t + "» – did this happen in " + d + "?", ja: "True!", nei: (d) => "False. It happened in " + d + ".", hvorfor: "Explain to your partner: Why did this happen, and what did it lead to?", aapen: "No answer key – talk in pairs and check in the topic afterwards." }
  };

  function lagSporsmal(info, t) {
    const sp = t.sprak === "en" ? "en" : "nb", L = T[sp], ut = [];
    const ord = Object.entries(t.ord || {});
    bland(ord).slice(0, 3).forEach(([b, f]) => ut.push({ type: "begrep", q: L.hvaBetyr(b), svar: f }));
    bland(t.personer || []).slice(0, 2).forEach(p => ut.push({ type: "person", q: L.hvemVar(p.navn), svar: p.rolle + (p.levde ? " (" + p.levde + ")" : "") + "." }));
    const tl = (t.tidslinje || []).filter(h => aar(h.dato) && !/\d{3,4}/.test(h.tekst));
    bland(tl).slice(0, 3).forEach(h => {
      const riktig = aar(h.dato), andre = tl.map(x => aar(x.dato)).filter(a => a && Math.abs(+a - +riktig) >= 3);
      const sann = !andre.length || Math.random() < 0.5, vist = sann ? riktig : tilf(andre);
      ut.push({ type: "sant", q: L.santQ(ren(h.tekst).replace(/\.$/, ""), vist), svar: (sann ? L.ja : L.nei(h.dato)) + " " + L.hvorfor });
    });
    const forsta = [].concat(...["1", "2"].map(n => (t.oppgaver && t.oppgaver[n] && t.oppgaver[n].forsta) || []));
    bland(forsta).slice(0, 2).forEach(q => ut.push({ type: "forklar", q: ren(q), svar: L.aapen }));
    return ut.map(x => Object.assign(x, { tema: info, sp }));
  }

  function oppsett() {
    document.title = "Repetisjonsstart – " + (LV.config ? LV.config.navn : "Les verden");
    const tema = LV.temaer.slice().sort((a, b) => a.fag.localeCompare(b.fag) || a.trinn - b.trinn || a.tittel.localeCompare(b.tittel));
    const grupper = [];
    tema.forEach(t => { const k = (t.fag === "engelsk" ? "Engelsk" : "Samfunnsfag") + ", " + t.trinn + ". trinn"; let g = grupper.find(x => x[0] === k); if (!g) grupper.push(g = [k, []]); g[1].push(t); });
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje">Spredt repetisjon</p><h1>🔁 Repetisjonsstart</h1><p class="ingress">Start timen med fem minutter repetisjon fra temaer dere har jobbet med før. Spørsmålene blandes på tvers av temaene: begreper, personer, sant eller usant og «forklar hvorfor». Å hente fram kunnskap fra hukommelsen – litt og ofte – er en av de mest effektive måtene å huske på.</p></header>' +
      '<form class="rp-oppsett" id="rp-form"><fieldset class="rp-temaer"><legend>Velg 2–4 temaer dere har jobbet med tidligere</legend>' +
      grupper.map(([navn, liste]) => '<details class="rp-gruppe"><summary>' + esc(navn) + ' <span class="rp-antall" data-gruppe="' + esc(navn) + '"></span></summary><div>' + liste.map(t => '<label><input type="checkbox" value="' + t.id + '"> ' + esc(t.tittel) + "</label>").join("") + "</div></details>").join("") + '</fieldset>' +
      '<div class="rp-valg"><label>Antall spørsmål <select id="rp-antall"><option>5</option><option selected>6</option><option>8</option><option>10</option></select></label><label>Tenketid <select id="rp-tid"><option value="0">Ingen klokke</option><option value="20">20 sekunder</option><option value="30" selected>30 sekunder</option><option value="60">1 minutt</option></select></label></div>' +
      '<p class="ll-hint" id="rp-hint" aria-live="polite">Ingen temaer valgt.</p><button type="submit" class="knapp hoved">Start repetisjonen →</button></form>' +
      '<div class="ka-metode"><h2>Slik bruker du den</h2><ol><li>Vis spørsmålet på storskjerm. Alle tenker selv først – ingen rekker opp hånda.</li><li>Snakk sammen to og to når klokka har gått.</li><li>Trekk ut noen til å svare, og vis svaret.</li><li>Gjør det samme med andre temaer neste uke: Det er gjentakelsen over tid som virker.</li></ol><p>Tips: Lagre lenken til økta som bokmerke, så kan du bruke den igjen med nye spørsmål fra de samme temaene.</p></div>';
    const oppdater = () => {
      const n = document.querySelectorAll(".rp-temaer input:checked").length;
      $("rp-hint").textContent = n ? n + (n === 1 ? " tema valgt. Velg gjerne ett til, så blir spørsmålene blandet." : " temaer valgt.") : "Ingen temaer valgt.";
      document.querySelectorAll(".rp-antall").forEach(s => { const k = s.closest("details").querySelectorAll("input:checked").length; s.textContent = k ? "(" + k + " valgt)" : ""; });
    };
    document.querySelectorAll(".rp-temaer input").forEach(i => i.addEventListener("change", oppdater));
    $("rp-form").addEventListener("submit", e => {
      e.preventDefault();
      const valgt = [...document.querySelectorAll(".rp-temaer input:checked")].map(i => i.value);
      if (!valgt.length) { $("rp-hint").textContent = "Velg minst ett tema."; return; }
      location.search = "?temaer=" + valgt.join(",") + "&antall=" + $("rp-antall").value + "&tid=" + $("rp-tid").value;
    });
  }

  async function okt(ider, antall, tid) {
    const temaer = [];
    for (const id of ider) {
      const info = LV.temaer.find(t => t.id === id); if (!info) continue;
      try { LV.tema = null; await LV.lastSkript("data/temaer/" + id + ".js"); if (LV.tema) temaer.push([info, LV.tema]); } catch (e) { /* hopp over */ }
    }
    if (!temaer.length) { oppsett(); return; }
    document.title = "Repetisjonsstart – " + (LV.config ? LV.config.navn : "Les verden");
    let rekke = [];
    function lag() {
      // Veksle mellom temaene og mellom typene
      const per = temaer.map(([info, t]) => bland(lagSporsmal(info, t)));
      const typer = ["begrep", "sant", "forklar", "person"];
      rekke = []; let r = 0;
      while (rekke.length < antall && per.some(p => p.length)) {
        const p = per[r % per.length], onsket = typer[r % typer.length];
        const i = p.findIndex(x => x.type === onsket);
        if (p.length) rekke.push(p.splice(i >= 0 ? i : 0, 1)[0]);
        r++;
      }
    }
    lag();
    let nr = 0, klokke = null;
    const ikon = { begrep: "🔤", person: "👤", sant: "⚖️", forklar: "💬" };
    $("innhold").innerHTML = hode() + '<div class="rp-okt" id="rp-okt"><div class="rp-topp"><span id="rp-teller"></span><span class="rp-temaliste">' + temaer.map(([i]) => esc(i.tittel)).join(" · ") + '</span><button type="button" class="knapp liten" id="rp-full">⛶ Fullskjerm</button></div><div id="rp-kort"></div></div>';
    $("rp-full").addEventListener("click", () => { const el = $("rp-okt"); if (document.fullscreenElement) document.exitFullscreen(); else if (el.requestFullscreen) el.requestFullscreen(); });

    function vis() {
      clearInterval(klokke);
      if (nr >= rekke.length) {
        $("rp-teller").textContent = "Ferdig!";
        $("rp-kort").innerHTML = '<div class="rp-slutt"><h2>Bra jobbet! 🎉</h2><p>Hvilket spørsmål var vanskeligst? Gå tilbake og les mer om det i temaet:</p><ul class="rp-lenker">' + temaer.map(([i]) => '<li><a href="tema.html?id=' + i.id + '">' + esc(i.tittel) + "</a></li>").join("") + '</ul><p><button type="button" class="knapp hoved" id="rp-igjen">↻ Nye spørsmål fra de samme temaene</button> <a class="knapp" href="repetisjon.html">Velg andre temaer</a></p></div>';
        $("rp-igjen").addEventListener("click", () => { lag(); nr = 0; vis(); });
        $("rp-igjen").focus();
        return;
      }
      const q = rekke[nr], L = T[q.sp];
      $("rp-teller").textContent = "Spørsmål " + (nr + 1) + " av " + rekke.length;
      $("rp-kort").innerHTML = '<article class="rp-sporsmal"' + (q.sp === "en" ? ' lang="en"' : "") + '><p class="rp-type"><span aria-hidden="true">' + ikon[q.type] + "</span> " + esc(L[q.type]) + ' <span class="rp-fra" lang="nb">· ' + esc(q.tema.tittel) + '</span></p><h2 class="rp-q" id="rp-q" tabindex="-1">' + esc(q.q) + "</h2>" +
        (tid ? '<div class="rp-klokke" role="timer" aria-label="Tenketid"><div class="rp-fyll" id="rp-fyll"></div></div><p class="rp-fase" id="rp-fase" lang="nb">🤔 Tenk selv …</p>' : "") +
        '<div class="rp-svar" id="rp-svar" hidden><p>' + esc(q.svar) + '</p></div><p class="rp-knapper" lang="nb"><button type="button" class="knapp hoved" id="rp-vis">Vis svar</button> <button type="button" class="knapp" id="rp-neste">' + (nr + 1 < rekke.length ? "Neste →" : "Avslutt") + "</button></p></article>";
      $("rp-q").focus();
      $("rp-vis").addEventListener("click", () => { $("rp-svar").hidden = false; $("rp-vis").disabled = true; clearInterval(klokke); if ($("rp-fase")) $("rp-fase").textContent = ""; });
      $("rp-neste").addEventListener("click", () => { nr++; vis(); });
      if (tid) {
        const start = Date.now();
        klokke = setInterval(() => {
          const s = (Date.now() - start) / 1000, del = Math.min(1, s / tid);
          $("rp-fyll").style.width = (del * 100) + "%";
          if (s >= tid / 2 && s < tid) $("rp-fase").textContent = "💬 Snakk med sidemannen …";
          if (s >= tid) { clearInterval(klokke); $("rp-fase").textContent = "✋ Tiden er ute – hvem vil svare?"; }
        }, 200);
      }
    }
    vis();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const ider = (LV.param("temaer") || "").split(",").filter(Boolean).slice(0, 6);
    const antall = Math.min(15, Math.max(3, parseInt(LV.param("antall"), 10) || 6)), tid = [0, 20, 30, 60].includes(+LV.param("tid")) ? +LV.param("tid") : 30;
    if (ider.length) okt(ider, antall, tid); else oppsett();
  });
})();
