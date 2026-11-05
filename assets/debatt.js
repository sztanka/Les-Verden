/* =========================================================
   Les verden – Debattduell (debatt.html)
   1) Sorter argumentkortene: for, mot eller svakt argument.
   2) Velg det sterkeste argumentet på hver side.
   3) Skriv ditt eget innlegg med setningsstartere – og kopier det.
   Ingenting lagres. debatt.html?id=<påstand>
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const T = {
    nb: { for: "For", mot: "Mot", svak: "Svakt argument", steg1: "1. Sorter argumentene", steg1t: "Er argumentet for eller mot påstanden – eller er det et svakt argument (en argumentasjonsfeil)?", sjekk: "Sjekk", steg2: "2. Hvilke argumenter er sterkest?", steg2t: "Trykk på det argumentet du mener er sterkest for, og det sterkeste mot.", steg3: "3. Skriv ditt eget innlegg", steg3t: "Ta stilling og begrunn. Bruk minst to argumenter, og svar på ett motargument.", startere: ["Jeg mener at …", "Det viktigste argumentet er at …", "For det første … For det andre …", "Noen vil hevde at …, men …", "Derfor mener jeg at …"], kopier: "Kopier innlegget", kopiert: "Kopiert!", tom: "Skriv innlegget først.", riktig: "riktig", sterkest: "Sterkest", feiltyper: "Typiske argumentasjonsfeil", velg: "Velg en annen påstand", alle: "Alle påstander", ditt: "Ditt innlegg" },
    en: { for: "For", mot: "Against", svak: "Weak argument", steg1: "1. Sort the arguments", steg1t: "Is the argument for or against the statement – or is it a weak argument (a fallacy)?", sjekk: "Check", steg2: "2. Which arguments are strongest?", steg2t: "Click the argument you think is strongest for, and the strongest against.", steg3: "3. Write your own opinion", steg3t: "Take a stand and give reasons. Use at least two arguments, and answer one counter-argument.", startere: ["I believe that …", "The most important argument is that …", "Firstly, … Secondly, …", "Some people argue that …, but …", "That is why I think that …"], kopier: "Copy my text", kopiert: "Copied!", tom: "Write your text first.", riktig: "correct", sterkest: "Strongest", feiltyper: "Common fallacies", velg: "Choose another statement", alle: "All statements", ditt: "Your text" }
  };

  function oversikt() {
    document.title = "Debattduell – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = hode() + '<ul class="db-liste">' + LV.debatt.pastander.map(p => '<li><a class="db-kort" href="debatt.html?id=' + p.id + '"' + (p.sprak === "en" ? ' lang="en"' : "") + '><span aria-hidden="true">' + (p.sprak === "en" ? "🇬🇧" : "🇳🇴") + "</span> " + esc(p.pastand) + "</a></li>").join("") + "</ul>";
  }
  const hode = () => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › <a href="debatt.html">Debattduell</a></nav>' +
    '<header class="sidehode"><p class="overlinje">Spill</p><h1>⚖️ Debattduell</h1><p class="ingress">Hvilke argumenter er gode – og hvilke er bare triks? Sorter argumentene, finn de sterkeste og skriv ditt eget innlegg. God trening til diskusjoner, drøftende tekster og muntlig eksamen.</p></header>';

  function spill(p) {
    const sp = p.sprak === "en" ? "en" : "nb", tx = T[sp];
    document.title = p.pastand + " – Debattduell";
    const kort = bland(p.kort.map((k, i) => Object.assign({ i }, k)));
    const valgt = {};
    $("innhold").innerHTML = hode() + '<div class="db-pastand"' + (sp === "en" ? ' lang="en"' : "") + '><span class="db-merke">' + (sp === "en" ? "Statement" : "Påstand") + "</span><p>" + esc(p.pastand) + "</p></div>" +
      '<div class="kd-rad"><div' + (sp === "en" ? ' lang="en"' : "") + '><section class="db-steg"><h2>' + tx.steg1 + '</h2><p class="mu-intro">' + tx.steg1t + '</p><ol class="db-kortliste" id="db-kort">' +
      kort.map(k => '<li class="db-arg" data-i="' + k.i + '"><p>' + esc(k.t) + '</p><div class="db-valg" role="group">' + ["for", "mot", "svak"].map(s => '<button type="button" class="knapp liten" data-side="' + s + '" aria-pressed="false">' + (s === "for" ? "👍 " : s === "mot" ? "👎 " : "⚠️ ") + tx[s] + "</button>").join("") + '</div><p class="db-tilbake" aria-live="polite"></p></li>').join("") +
      '</ol><button class="knapp hoved" type="button" id="db-sjekk">' + tx.sjekk + '</button> <span id="db-poeng" class="kd-poeng"></span></section>' +
      '<section class="db-steg" id="db-steg2" hidden><h2>' + tx.steg2 + '</h2><p class="mu-intro">' + tx.steg2t + '</p><div class="db-sterk"><div><h3>👍 ' + tx.for + '</h3><ul id="db-for"></ul></div><div><h3>👎 ' + tx.mot + '</h3><ul id="db-mot"></ul></div></div></section>' +
      '<section class="db-steg" id="db-steg3" hidden><h2>' + tx.steg3 + '</h2><p class="mu-intro">' + tx.steg3t + '</p><div class="db-startere">' + tx.startere.map(s => '<button type="button" class="knapp liten db-start">' + esc(s) + "</button>").join("") + '</div><label class="mu-notat"><span>' + tx.ditt + '</span><textarea id="db-tekst" rows="9"></textarea></label><div class="mu-knapper"><button class="knapp hoved" type="button" id="db-kopier">' + tx.kopier + '</button><span class="status" id="db-status" role="status"></span></div></section></div>' +
      '<aside class="kd-sjekk"' + (sp === "en" ? ' lang="en"' : "") + "><h2>🚩 " + tx.feiltyper + '</h2><dl class="db-feil">' + LV.debatt.feil[sp].map(([n, f]) => "<dt>" + esc(n) + "</dt><dd>" + esc(f) + "</dd>").join("") + '</dl><p><a href="debatt.html">' + tx.velg + " →</a></p></aside></div>";

    $("db-kort").addEventListener("click", e => {
      const b = e.target.closest("[data-side]"); if (!b || b.disabled) return;
      const li = b.closest(".db-arg"); valgt[li.dataset.i] = b.dataset.side;
      li.querySelectorAll("[data-side]").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    });
    $("db-sjekk").addEventListener("click", () => {
      let r = 0;
      document.querySelectorAll(".db-arg").forEach(li => {
        const k = p.kort[+li.dataset.i], v = valgt[li.dataset.i], ok = v === k.side;
        if (ok) r++;
        li.classList.add(ok ? "rett" : "feil");
        li.querySelectorAll("[data-side]").forEach(x => { x.disabled = true; x.classList.toggle("db-fasit", x.dataset.side === k.side); });
        li.querySelector(".db-tilbake").innerHTML = (ok ? "✔ " : "✘ " + (sp === "en" ? "Answer: " : "Svar: ") + tx[k.side] + ". ") + (k.feil ? "<strong>" + esc(k.feil) + ":</strong> " + esc(k.hvorfor) : "");
      });
      $("db-poeng").textContent = r + " / " + p.kort.length + " " + tx.riktig;
      $("db-sjekk").hidden = true;
      const liste = side => p.kort.map((k, i) => [k, i]).filter(([k]) => k.side === side).map(([k, i]) => '<li><button type="button" class="db-velg" data-side="' + side + '" data-i="' + i + '">' + esc(k.t) + "</button></li>").join("");
      $("db-for").innerHTML = liste("for"); $("db-mot").innerHTML = liste("mot");
      $("db-steg2").hidden = false; $("db-steg3").hidden = false;
      $("db-steg2").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    $("db-steg2").addEventListener("click", e => {
      const b = e.target.closest(".db-velg"); if (!b) return;
      document.querySelectorAll('.db-velg[data-side="' + b.dataset.side + '"]').forEach(x => x.classList.toggle("valgt", x === b));
    });
    document.querySelectorAll(".db-start").forEach(b => b.addEventListener("click", () => { const t = $("db-tekst"); t.value = (t.value.trim() ? t.value.replace(/\s*$/, " ") : "") + b.textContent.replace(/ …$/, " "); t.focus(); }));
    $("db-kopier").addEventListener("click", () => {
      const v = $("db-tekst").value.trim(); if (!v) { $("db-status").textContent = tx.tom; return; }
      const sterk = [...document.querySelectorAll(".db-velg.valgt")].map(b => (b.dataset.side === "for" ? "+ " : "– ") + b.textContent);
      const tekst = p.pastand + "\n\n" + (sterk.length ? tx.sterkest + ":\n" + sterk.join("\n") + "\n\n" : "") + v + "\n";
      const ok = () => { $("db-status").textContent = tx.kopiert; };
      const reserve = () => { const x = document.createElement("textarea"); x.value = tekst; document.body.appendChild(x); x.select(); let l = false; try { l = document.execCommand("copy"); } catch (er) { l = false; } x.remove(); if (l) ok(); else window.prompt("Ctrl+C / Cmd+C", tekst); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(tekst).then(ok, reserve); else reserve();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const p = LV.debatt.pastander.find(x => x.id === LV.param("id"));
    if (p) spill(p); else oversikt();
  });
})();
