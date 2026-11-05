/* =========================================================
   Les verden – How to learn English (laere-engelsk.html)
   Strategier, falske venner-quiz, «Explain the word»-kort og
   refleksjonsspørsmål som kan kopieres. Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const fmt = s => esc(s).replace(/~~(.+?)~~/g, "<s>$1</s>").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  function bygg() {
    const D = LV.laereEngelsk;
    document.title = "How to learn English – " + (LV.config ? LV.config.navn : "Les verden");
    let h = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="index.html?fag=engelsk">Engelsk</a> › How to learn English</nav>' +
      '<header class="sidehode"><p class="overlinje" lang="en">Learning strategies</p><h1>How to learn English</h1><p class="ingress">Slik lærer du ord raskere, skriver bedre tekster og klarer deg i samtaler – også når du mangler et ord. Prøv strategiene, og finn ut hva som virker for deg.</p></header>' +
      '<nav class="mu-hopp" aria-label="Snarveier">' + D.deler.map(d => '<a href="#' + d.id + '">' + d.ikon + " " + esc(d.tittel) + "</a>").join("") + '<a href="#ove">🎯 Øv</a></nav>';
    D.deler.forEach(d => {
      h += '<section class="le-del" id="' + d.id + '"><h2><span aria-hidden="true">' + d.ikon + "</span> " + esc(d.tittel) + ' <span class="ls-en" lang="en">' + esc(d.en) + '</span></h2><p class="mu-intro">' + esc(d.intro) + '</p><div class="le-rad">' +
        d.strategier.map(s => '<article class="le-kort"><h3>' + esc(s.navn) + "</h3><p>" + fmt(s.tekst) + "</p>" +
          (s.fraser ? '<ul class="le-fraser" lang="en">' + s.fraser.map(f => "<li>" + esc(f) + "</li>").join("") + "</ul>" : "") +
          (s.lenke ? '<p class="le-lenke"><a href="' + s.lenke[0] + '">' + esc(s.lenke[1]) + " →</a></p>" : "") + "</article>").join("") + "</div></section>";
    });
    h += '<section class="le-del" id="ove"><h2>🎯 Øv</h2>' +
      '<div class="le-ove-rad"><div class="le-ove"><h3>Explain the word <span class="ls-en">sirkumlokusjon</span></h3><p class="mu-intro">Jobb i par. Den ene ser ordet og forklarer det på engelsk <strong>uten å si ordet</strong>. Den andre gjetter. Bruk frasene «It’s a thing you use to …», «It’s a person who …».</p>' +
      '<div class="le-forklar" id="le-forklar" aria-live="polite"></div><div class="mu-kontroll"><button class="knapp" type="button" id="le-skjul">🙈 Skjul ordet</button><button class="knapp" type="button" id="le-hint">💡 Hint</button><button class="knapp hoved" type="button" id="le-neste">Nytt ord →</button></div></div>' +
      '<div class="le-ove"><h3>False friends <span class="ls-en">falske venner</span></h3><p class="mu-intro">Ord som ligner norske ord, men betyr noe annet. Velg riktig betydning.</p><ol class="lr-quiz-liste" id="le-quiz"></ol><p class="le-poeng" id="le-poeng" aria-live="polite"></p></div></div>' +
      '<div class="le-ove"><h3>Tenk over din egen læring</h3><p class="mu-intro">Skriv svarene dine og kopier dem til et dokument. Ingenting lagres.</p>' + D.refleksjon.map((r, i) => '<label class="mu-notat"><span>' + esc(r) + '</span><textarea rows="3" data-r="' + i + '"></textarea></label>').join("") +
      '<div class="mu-knapper"><button class="knapp hoved" id="le-kopier" type="button">Kopier svarene</button><span class="status" id="le-status" role="status"></span></div></div></section>' +
      '<p class="fo-merk">Se også: <a href="lesestrategier.html">Lesestrategier</a> · <a href="muntlig.html">Muntlig og lytting</a> · <a href="uttale.html">Pronunciation for Norwegians</a> · <a href="grammatikk.html#gruppe-sentences">Sentence workshop</a></p>';
    $("innhold").innerHTML = h;

    // Explain the word
    let kort = bland(D.forklar), i = 0;
    const vis = () => { const [ord, hint] = kort[i]; $("le-forklar").innerHTML = '<span class="mu-type">Explain this word:</span><p lang="en" class="le-ordet">' + esc(ord) + '</p><p class="le-hinttekst" lang="en" hidden>Hint: ' + esc(hint) + "</p>"; $("le-forklar").classList.remove("skjult"); $("le-skjul").textContent = "🙈 Skjul ordet"; };
    $("le-neste").addEventListener("click", () => { i = (i + 1) % kort.length; if (!i) kort = bland(D.forklar); vis(); });
    $("le-hint").addEventListener("click", () => { $("le-forklar").querySelector(".le-hinttekst").hidden = false; });
    $("le-skjul").addEventListener("click", () => { const s = $("le-forklar").classList.toggle("skjult"); $("le-skjul").textContent = s ? "👀 Vis ordet" : "🙈 Skjul ordet"; });
    vis();

    // Falske venner
    const q = bland(D.falske).map(x => Object.assign({}, x, { rekke: bland(x.valg.map((v, n) => n)) }));
    let poeng = 0, svart = 0;
    $("le-quiz").innerHTML = q.map((x, n) => '<li class="lr-qs" data-i="' + n + '"><fieldset><legend lang="en">' + fmt(x.s) + '</legend><div class="lr-qvalg">' + x.rekke.map((j, pos) => '<button type="button" class="lr-qknapp" data-j="' + j + '"><span class="lr-qbokstav" aria-hidden="true">' + "ABC"[pos] + "</span> " + esc(x.valg[j]) + "</button>").join("") + '</div><div class="lr-qsvar" role="status"></div></fieldset></li>').join("");
    $("le-quiz").addEventListener("click", e => {
      const b = e.target.closest(".lr-qknapp"); if (!b) return;
      const li = b.closest(".lr-qs"); if (li.classList.contains("ferdig")) return;
      const x = q[+li.dataset.i], rett = +b.dataset.j === 0;
      li.classList.add("ferdig", rett ? "rett" : "feil");
      li.querySelectorAll(".lr-qknapp").forEach(k => { k.disabled = true; if (+k.dataset.j === 0) k.classList.add("er-rett"); if (k === b && !rett) k.classList.add("er-feil"); });
      li.querySelector(".lr-qsvar").innerHTML = "<p><strong>" + (rett ? "✔ Riktig!" : "✘ Ikke helt.") + "</strong> " + fmt(x.forklaring) + "</p>";
      if (rett) poeng++; svart++;
      if (svart === q.length) $("le-poeng").textContent = "Du fikk " + poeng + " av " + q.length + " riktige.";
    });

    // Kopier refleksjon
    $("le-kopier").addEventListener("click", () => {
      const felt = [...document.querySelectorAll("[data-r]")].filter(t => t.value.trim());
      if (!felt.length) { $("le-status").textContent = "Du har ikke skrevet noe ennå."; return; }
      const tekst = "How to learn English – min læring\n\n" + felt.map(t => D.refleksjon[+t.dataset.r] + "\n" + t.value.trim()).join("\n\n");
      const ok = () => { $("le-status").textContent = "Kopiert!"; };
      const reserve = () => { const x = document.createElement("textarea"); x.value = tekst; document.body.appendChild(x); x.select(); let lyktes = false; try { lyktes = document.execCommand("copy"); } catch (er) { lyktes = false; } x.remove(); if (lyktes) ok(); else window.prompt("Ctrl+C / Cmd+C", tekst); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(tekst).then(ok, reserve); else reserve();
    });
  }
  document.addEventListener("DOMContentLoaded", bygg);
})();
