/* =========================================================
   Les verden – Årsak og virkning (arsak.html)
   Sett leddene i riktig rekkefølge – fra årsak til følge.
   Flytt med pilene (eller dra kortene). Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  function bygg() {
    const valgt = LV.arsakskjeder.find(k => k.id === LV.param("id"));
    const fag = LV.param("fag") || (valgt ? valgt.fag : "");
    const kjeder = LV.arsakskjeder.filter(k => !fag || k.fag === fag);
    let rekke = bland(kjeder.map((_, i) => i)), n = 0, riktige = 0;
    // ?id=<kjede> (fra «Alt om temaet»): start med den valgte kjeden
    if (valgt) { const i = kjeder.indexOf(valgt); rekke = [i].concat(rekke.filter(x => x !== i)); }
    document.title = "Årsak og virkning – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › Årsak og virkning</nav>' +
      '<header class="sidehode"><p class="overlinje">Spill</p><h1>🔗 Årsak og virkning</h1><p class="ingress">Historien henger sammen: Én hendelse fører til en annen. Sett leddene i riktig rekkefølge – fra den første årsaken til den siste følgen. Flytt kortene med pilene, eller dra dem.</p>' +
      '<div class="kd-filter" role="group" aria-label="Fag"><a class="knapp liten" href="arsak.html"' + (!fag ? ' aria-current="true"' : "") + '>Alle</a><a class="knapp liten" href="arsak.html?fag=samfunnsfag"' + (fag === "samfunnsfag" ? ' aria-current="true"' : "") + '>Samfunnsfag</a><a class="knapp liten" href="arsak.html?fag=engelsk"' + (fag === "engelsk" ? ' aria-current="true"' : "") + ">Engelsk</a></div></header>" +
      '<section class="av-spill" id="av-spill"></section>';

    const vis = () => {
      const k = kjeder[rekke[n]];
      if (!k) return ferdig();
      const en = k.sprak === "en";
      let orden = bland(k.ledd.map((_, i) => i));
      while (orden.every((v, i) => v === i)) orden = bland(orden);
      const tegn = (sjekket) => {
        $("av-liste").innerHTML = orden.map((j, pos) => '<li class="av-ledd' + (sjekket ? (j === pos ? " rett" : " feil") : "") + '" draggable="' + !sjekket + '" data-pos="' + pos + '"><span class="av-nr" aria-hidden="true">' + (pos + 1) + '</span><span class="av-tekst">' + esc(k.ledd[j]) + "</span>" +
          (sjekket ? "" : '<span class="av-pil"><button type="button" data-opp="' + pos + '" aria-label="Flytt opp"' + (pos ? "" : " disabled") + '>↑</button><button type="button" data-ned="' + pos + '" aria-label="Flytt ned"' + (pos < orden.length - 1 ? "" : " disabled") + ">↓</button></span>") + "</li>").join("");
      };
      $("av-spill").innerHTML = '<p class="tr-nr">Kjede ' + (n + 1) + " av " + kjeder.length + " · " + riktige + " helt riktige</p><h2" + (en ? ' lang="en"' : "") + ">" + esc(k.tittel) + '</h2><p class="av-hjelp"' + (en ? ' lang="en"' : "") + ">" + (en ? "Cause ↓ … ↓ Effect" : "Årsak ↓ … ↓ Følge") + '</p><ol class="av-liste" id="av-liste"' + (en ? ' lang="en"' : "") + '></ol><div class="mu-knapper"><button class="knapp hoved" type="button" id="av-sjekk">Sjekk rekkefølgen</button></div><div id="av-svar" aria-live="polite"></div>';
      tegn(false);
      $("av-liste").addEventListener("click", e => {
        const b = e.target.closest("button"); if (!b) return;
        const i = +(b.dataset.opp || b.dataset.ned), j = b.dataset.opp !== undefined ? i - 1 : i + 1;
        [orden[i], orden[j]] = [orden[j], orden[i]]; tegn(false);
        const ny = $("av-liste").querySelector('[data-pos="' + j + '"] button[data-' + (b.dataset.opp !== undefined ? "opp" : "ned") + "]");
        (ny && !ny.disabled ? ny : $("av-liste").querySelector('[data-pos="' + j + '"] button:not([disabled])')).focus();
      });
      let fra = null;
      $("av-liste").addEventListener("dragstart", e => { const li = e.target.closest(".av-ledd"); if (li) { fra = +li.dataset.pos; e.dataTransfer.effectAllowed = "move"; } });
      $("av-liste").addEventListener("dragover", e => { if (fra !== null) e.preventDefault(); });
      $("av-liste").addEventListener("drop", e => { e.preventDefault(); const li = e.target.closest(".av-ledd"); if (li && fra !== null) { const til = +li.dataset.pos; const [x] = orden.splice(fra, 1); orden.splice(til, 0, x); fra = null; tegn(false); } });
      $("av-sjekk").addEventListener("click", () => {
        tegn(true);
        const ant = orden.filter((j, i) => j === i).length, alle = ant === orden.length;
        if (alle) riktige++;
        $("av-sjekk").hidden = true;
        $("av-svar").innerHTML = '<div class="kd-fasit ' + (alle ? "ok" : "ikke") + '"><p><strong>' + (alle ? "✔ Helt riktig!" : ant + " av " + orden.length + " på riktig plass.") + "</strong></p>" +
          (alle ? "" : '<p>Riktig rekkefølge:</p><ol' + (en ? ' lang="en"' : "") + ">" + k.ledd.map(x => "<li>" + esc(x) + "</li>").join("") + "</ol>") +
          "<p" + (en ? ' lang="en"' : "") + ">💡 " + esc(k.forklaring) + '</p><p><a href="tema.html?id=' + encodeURIComponent(k.tema) + '">Les mer i temaet →</a></p></div><button class="knapp hoved" type="button" id="av-neste">' + (n < kjeder.length - 1 ? "Neste kjede →" : "Se resultatet") + "</button>";
        $("av-neste").addEventListener("click", () => { n++; vis(); });
        $("av-neste").focus();
      });
    };
    const ferdig = () => {
      $("av-spill").innerHTML = '<div class="kd-slutt"><p class="kd-merke" aria-hidden="true">' + (riktige === kjeder.length ? "🏆" : riktige >= kjeder.length / 2 ? "🔗" : "🧩") + "</p><h2>" + riktige + " av " + kjeder.length + " kjeder helt riktige</h2><p>Å se sammenhenger mellom årsaker og følger er noe av det viktigste i samfunnsfag. Prøv å forklare én av kjedene med egne ord til en makker.</p><button class=\"knapp hoved\" type=\"button\" id=\"av-igjen\">↺ Spill igjen</button></div>";
      $("av-igjen").addEventListener("click", () => { rekke = bland(rekke); n = 0; riktige = 0; vis(); });
    };
    vis();
  }
  document.addEventListener("DOMContentLoaded", bygg);
})();
