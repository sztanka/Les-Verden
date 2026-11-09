/* =========================================================
   Les verden – Oppgaveord (oppgaveord.html)
   Hva krever «beskriv», «drøft», «compare» …? Oppgavetrapp,
   ordkort med eksempelsvar, koblespill, svardetektiv og
   «Plukk oppgaven fra hverandre». Data: data/oppgaveord.js
   oppgaveord.html (norsk) · oppgaveord.html?sp=en (engelsk)
   Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const NIVAFARGE = ["var(--samfunnsfag)", "var(--lilla)", "var(--aksent)"];

  const TX = {
    nb: {
      tittel: "Oppgaveord", over: "Les oppgaven", ingress: "Før du svarer på en oppgave, må du lese oppgaven. Oppgaveordet forteller deg hva du skal gjøre – og et godt svar på «drøft» ser helt annerledes ut enn et godt svar på «beskriv». Her lærer du hva ordene krever, og øver på å lese oppgaver nøye.",
      bytt: ["🇬🇧 English task words", "oppgaveord.html?sp=en"], trapp: "Oppgavetrappa", trappT: "Jo høyere opp i trappa, jo mer må du tenke selv. Trykk på et ord for å lese mer.",
      kortH: "Hva krever ordene?", betyr: "Hva betyr det?", svaret: "Dette må svaret ha", starter: "Slik kan du starte", felle: "Vanlig felle", eks: "Eksempel", oppg: "Oppgave", svak: "Svakt svar", god: "Godt svar", visEks: "Vis svake og gode svar", prov: "Prøv selv: Skriv et svar på oppgaven",
      ov: "Øvinger", kob: "1. Koble ord og betydning", kobT: "Trykk på et oppgaveord og deretter på betydningen som passer.", nyRunde: "Ny runde", riktig: "Riktig!", feil: "Ikke helt – prøv igjen.", alleK: "Alle er koblet. Bra!",
      det: "2. Svardetektiven", detT: "Les svaret. Hvilket oppgaveord tror du eleven svarte på?", neste: "Neste svar →", poeng: "Poeng", av: "av", ferdig: "Ferdig! Du fikk", startPaNytt: "Start på nytt",
      plukk: "3. Plukk oppgaven fra hverandre", plukkT: "Gode lesere deler oppgaven i biter. Velg en farge, og trykk på delene av oppgaven som hører til. Trykk «Sjekk» når du er ferdig.", merkSom: "Merk som", fjern: "Fjern merke", sjekk: "Sjekk", egneOrd: "Hva skal du gjøre? Skriv oppgaven med egne ord.", umerket: "umerket", fasit: "Fasit", treff: "riktig merket",
      merk: "Til læreren: Ta gjerne en ekte eksamens- eller prøveoppgave og plukk den fra hverandre sammen med klassen på tavla. Spør: Hva er oppgaveordet? Hva er temaet? Hva er avgrensningen? Hvem er mottakeren?"
    },
    en: {
      tittel: "Task words", over: "Read the task", ingress: "Before you answer a task, read the task. The task word tells you what to do – and a good answer to «discuss» looks very different from a good answer to «describe». Learn what the words ask for, and practise reading tasks carefully.",
      bytt: ["🇳🇴 Norske oppgaveord", "oppgaveord.html"], trapp: "The task staircase", trappT: "The higher up the staircase, the more you have to think for yourself. Tap a word to read more.",
      kortH: "What do the words ask for?", betyr: "What does it mean?", svaret: "Your answer needs", starter: "How to start", felle: "Common trap", eks: "Example", oppg: "Task", svak: "Weak answer", god: "Good answer", visEks: "Show weak and good answers", prov: "Try it: Write an answer to the task",
      ov: "Practice", kob: "1. Match words and meanings", kobT: "Tap a task word, then tap the meaning that fits.", nyRunde: "New round", riktig: "Correct!", feil: "Not quite – try again.", alleK: "All matched. Well done!",
      det: "2. The answer detective", detT: "Read the answer. Which task word do you think the student was answering?", neste: "Next answer →", poeng: "Score", av: "of", ferdig: "Finished! You got", startPaNytt: "Start again",
      plukk: "3. Take the task apart", plukkT: "Good readers split the task into parts. Choose a colour and tap the parts of the task that belong to it. Tap «Check» when you are done.", merkSom: "Mark as", fjern: "Remove mark", sjekk: "Check", egneOrd: "What should you do? Write the task in your own words.", umerket: "not marked", fasit: "Answer", treff: "marked correctly",
      merk: "For teachers: Take a real exam or test task and take it apart together on the board. Ask: What is the task word? What is the topic? What are the limits? Who is the reader?"
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    const D = LV.oppgaveord;
    const sp = LV.param("sp") === "en" ? "en" : "nb";
    const T = TX[sp], ORD = D.ord[sp], NIV = D.nivaer[sp], KAT = D.kategorier[sp];
    const pre = "ov-" + sp + "-";
    document.title = T.tittel + " – " + (LV.config ? LV.config.navn : "Les verden");
    const lang = sp === "en" ? ' lang="en"' : "";

    let h = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="lesestrategier.html">Lese og skrive</a> › Oppgaveord</nav><div' + lang + ">" +
      '<header class="sidehode"><p class="overlinje">' + T.over + "</p><h1>🎯 " + T.tittel + '</h1><p class="ingress">' + T.ingress + '</p><p><a class="knapp liten" href="' + T.bytt[1] + '"' + (sp === "en" ? ' lang="nb"' : ' lang="en"') + ">" + T.bytt[0] + "</a></p></header>";

    // Trappa
    h += '<section class="ov-trapp" aria-labelledby="ov-trapp-h"><h2 id="ov-trapp-h">' + T.trapp + '</h2><p class="mu-intro">' + T.trappT + '</p><ol class="ov-trinn">' +
      NIV.map((n, i) => '<li style="--ov:' + NIVAFARGE[i] + ";--ov-h:" + (i + 1) + '"><span class="ov-trinn-navn"><span class="ov-trinn-nr">' + (i + 1) + "</span> " + esc(n) + '</span><span class="ov-trinn-ord">' + ORD.filter(o => o.niva === i + 1).map(o => '<a href="#' + pre + o.id + '">' + esc(o.ord) + "</a>").join("") + "</span></li>").reverse().join("") + "</ol></section>";

    // Ordkort
    h += '<section aria-labelledby="ov-kort-h"><h2 id="ov-kort-h">' + T.kortH + '</h2><div class="ov-kortliste">' + ORD.map(o =>
      '<details class="ov-kort" id="' + pre + o.id + '" style="--ov:' + NIVAFARGE[o.niva - 1] + '"><summary><span class="ov-ord">' + esc(o.ord) + '</span><span class="ov-kort-kort">' + esc(o.kort) + '</span><span class="ov-merke">' + o.niva + " · " + esc(NIV[o.niva - 1]) + "</span></summary>" +
      '<div class="ov-kort-innhold"><div class="ov-to"><div><h3>' + T.svaret + "</h3><ul>" + o.svaret.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul></div><div><h3>" + T.starter + '</h3><ul class="ov-startere">' + o.starter.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul></div></div>" +
      '<p class="ov-felle"><strong>⚠️ ' + T.felle + ":</strong> " + esc(o.felle) + "</p>" +
      '<p class="ov-oppg"><strong>' + T.oppg + ":</strong> " + esc(o.oppgave) + "</p>" +
      '<button type="button" class="knapp liten ov-vis" aria-expanded="false" aria-controls="' + pre + o.id + '-eks">' + T.visEks + "</button>" +
      '<div class="ov-eks" id="' + pre + o.id + '-eks" hidden><div class="ov-svar ov-svar-svak"><p class="ov-svar-merke">✘ ' + T.svak + "</p><p>" + esc(o.svak) + '</p></div><div class="ov-svar ov-svar-god"><p class="ov-svar-merke">✔ ' + T.god + "</p><p>" + esc(o.god) + "</p></div></div>" +
      '<label class="mu-notat" for="' + pre + o.id + '-prov"><span>' + T.prov + '</span><textarea id="' + pre + o.id + '-prov" rows="4"></textarea></label></div></details>').join("") + "</div></section>";

    // Øvinger
    h += '<h2 class="ov-ovh">' + T.ov + "</h2>" +
      '<section class="ov-ovelse" aria-labelledby="ov-kob-h"><h3 id="ov-kob-h">' + T.kob + '</h3><p class="mu-intro">' + T.kobT + '</p><div class="ov-kob" id="ov-kob"></div><p class="ov-melding" id="ov-kob-m" role="status" aria-live="polite"></p><button type="button" class="knapp liten" id="ov-kob-ny">↻ ' + T.nyRunde + "</button></section>" +
      '<section class="ov-ovelse" aria-labelledby="ov-det-h"><h3 id="ov-det-h">' + T.det + '</h3><p class="mu-intro">' + T.detT + '</p><div id="ov-det"></div></section>' +
      '<section class="ov-ovelse" aria-labelledby="ov-plukk-h"><h3 id="ov-plukk-h">' + T.plukk + '</h3><p class="mu-intro">' + T.plukkT + "</p>" +
      '<div class="ov-pensel" role="radiogroup" aria-label="' + T.merkSom + '"><span>' + T.merkSom + ":</span>" + Object.entries(KAT).map(([k, [navn, sporsmal]], i) => '<label class="ov-pensel-valg ov-k-' + k + '"><input type="radio" name="ov-pensel" value="' + k + '"' + (i === 0 ? " checked" : "") + "> " + esc(navn) + ' <small>' + esc(sporsmal) + "</small></label>").join("") +
      '<label class="ov-pensel-valg ov-k-x"><input type="radio" name="ov-pensel" value=""> ' + T.fjern + "</label></div>" +
      '<ol class="ov-plukkliste">' + D.oppgaver[sp].map((o, i) => '<li class="ov-plukk" data-nr="' + i + '"><p class="ov-oppgtekst">' + o.map((d, j) => typeof d === "string" ? esc(d) : '<button type="button" class="ov-del" data-j="' + j + '" data-k="">' + esc(d[0]) + '<span class="skjult-visuelt"> (' + T.umerket + ")</span></button>").join("") + '</p><p class="ov-plukk-rad"><button type="button" class="knapp liten ov-sjekk">' + T.sjekk + '</button> <span class="ov-resultat" role="status" aria-live="polite"></span></p>' +
        '<label class="mu-notat" for="' + pre + "plukk" + i + '"><span>' + T.egneOrd + '</span><textarea id="' + pre + "plukk" + i + '" rows="2"></textarea></label></li>').join("") + "</ol></section>" +
      '<p class="fo-merk">' + T.merk + ' <a href="ordverksted.html' + (sp === "en" ? "?sp=en" : "") + '">' + (sp === "en" ? "See also the Word Workshop →" : "Se også Ordverkstedet →") + "</a></p></div>";

    $("innhold").innerHTML = h;

    // Vis eksempler
    document.querySelectorAll(".ov-vis").forEach(b => b.addEventListener("click", () => { const e = $(b.getAttribute("aria-controls")), apen = !e.hidden; e.hidden = apen; b.setAttribute("aria-expanded", String(!apen)); }));
    // Lenker i trappa åpner kortet
    document.querySelectorAll(".ov-trinn a").forEach(a => a.addEventListener("click", () => { const k = $(a.getAttribute("href").slice(1)); if (k) k.open = true; }));
    if (location.hash) { const k = document.querySelector(location.hash.replace(/[^#\w-]/g, "")); if (k && k.tagName === "DETAILS") k.open = true; }

    // ---------- 1. Koble ----------
    function kobleRunde() {
      const utvalg = bland(ORD).slice(0, 5), venstre = bland(utvalg), hoyre = bland(utvalg);
      let valgt = null, igjen = utvalg.length;
      $("ov-kob").innerHTML = '<ul class="ov-kob-kol" aria-label="' + (sp === "en" ? "Task words" : "Oppgaveord") + '">' + venstre.map(o => '<li><button type="button" class="ov-kob-knapp ov-kob-ord" data-id="' + o.id + '" aria-pressed="false">' + esc(o.ord) + "</button></li>").join("") + "</ul>" +
        '<ul class="ov-kob-kol" aria-label="' + (sp === "en" ? "Meanings" : "Betydninger") + '">' + hoyre.map(o => '<li><button type="button" class="ov-kob-knapp ov-kob-bet" data-id="' + o.id + '">' + esc(o.kort) + "</button></li>").join("") + "</ul>";
      $("ov-kob-m").textContent = "";
      $("ov-kob").querySelectorAll(".ov-kob-ord").forEach(b => b.addEventListener("click", () => {
        $("ov-kob").querySelectorAll(".ov-kob-ord").forEach(x => x.setAttribute("aria-pressed", "false"));
        b.setAttribute("aria-pressed", "true"); valgt = b;
      }));
      $("ov-kob").querySelectorAll(".ov-kob-bet").forEach(b => b.addEventListener("click", () => {
        if (!valgt) { $("ov-kob-m").textContent = T.kobT; return; }
        if (valgt.dataset.id === b.dataset.id) {
          [valgt, b].forEach(x => { x.disabled = true; x.classList.add("ok"); x.setAttribute("aria-pressed", "false"); });
          valgt = null; igjen--;
          $("ov-kob-m").textContent = igjen ? T.riktig : "🎉 " + T.alleK;
        } else { b.classList.add("feil"); setTimeout(() => b.classList.remove("feil"), 700); $("ov-kob-m").textContent = T.feil; }
      }));
    }
    $("ov-kob-ny").addEventListener("click", kobleRunde);
    kobleRunde();

    // ---------- 2. Svardetektiven ----------
    let rekke = [], nr = 0, poeng = 0;
    function detStart() { rekke = bland(ORD).slice(0, 6); nr = 0; poeng = 0; detVis(); }
    function detVis() {
      if (nr >= rekke.length) {
        $("ov-det").innerHTML = '<p class="ov-det-slutt">🏁 ' + T.ferdig + " " + poeng + " " + T.av + " " + rekke.length + '.</p><button type="button" class="knapp liten" id="ov-det-ny">↻ ' + T.startPaNytt + "</button>";
        $("ov-det-ny").addEventListener("click", detStart); return;
      }
      const o = rekke[nr], valg = bland([o].concat(bland(ORD.filter(x => x.id !== o.id)).slice(0, 3)));
      $("ov-det").innerHTML = '<p class="ov-det-teller">' + (nr + 1) + " " + T.av + " " + rekke.length + " · " + T.poeng + ": " + poeng + '</p><blockquote class="ov-det-svar">' + esc(o.god) + "</blockquote>" +
        '<div class="ov-det-valg" role="group" aria-label="' + T.det + '">' + valg.map(v => '<button type="button" class="knapp liten" data-id="' + v.id + '">' + esc(v.ord) + "</button>").join("") + '</div><p class="ov-melding" id="ov-det-m" role="status" aria-live="polite"></p>';
      let svart = false;
      $("ov-det").querySelectorAll(".ov-det-valg button").forEach(b => b.addEventListener("click", () => {
        if (svart) return; svart = true;
        const ok = b.dataset.id === o.id; if (ok) poeng++;
        $("ov-det").querySelectorAll(".ov-det-valg button").forEach(x => { x.disabled = true; if (x.dataset.id === o.id) x.classList.add("ok"); else if (x === b) x.classList.add("feil"); });
        $("ov-det-m").innerHTML = (ok ? "✔ " + T.riktig : "✘ " + esc(o.ord)) + " – " + T.oppg.toLowerCase() + ": <em>" + esc(o.oppgave) + '</em> <button type="button" class="knapp liten" id="ov-det-neste">' + T.neste + "</button>";
        $("ov-det-neste").addEventListener("click", () => { nr++; detVis(); const f = $("ov-det").querySelector(".ov-det-valg button, #ov-det-ny"); if (f) f.focus(); });
        $("ov-det-neste").focus();
      }));
    }
    detStart();

    // ---------- 3. Plukk oppgaven fra hverandre ----------
    const pensel = () => (document.querySelector('input[name="ov-pensel"]:checked') || {}).value || "";
    const merkTekst = k => k ? KAT[k][0] : T.umerket;
    document.querySelectorAll(".ov-del").forEach(b => b.addEventListener("click", () => {
      const k = pensel();
      b.dataset.k = k; b.className = "ov-del" + (k ? " ov-k-" + k : "");
      b.querySelector(".skjult-visuelt").textContent = " (" + merkTekst(k) + ")";
      b.closest(".ov-plukk").querySelector(".ov-resultat").textContent = "";
    }));
    document.querySelectorAll(".ov-sjekk").forEach(s => s.addEventListener("click", () => {
      const li = s.closest(".ov-plukk"), oppg = D.oppgaver[sp][+li.dataset.nr];
      let treff = 0, antall = 0;
      li.querySelectorAll(".ov-del").forEach(b => {
        const fasit = oppg[+b.dataset.j][1]; antall++;
        const ok = b.dataset.k === fasit; if (ok) treff++;
        b.classList.toggle("ov-feil", !ok); b.classList.toggle("ov-rett", ok);
        b.title = ok ? "" : T.fasit + ": " + KAT[fasit][0];
      });
      li.querySelector(".ov-resultat").innerHTML = treff + " " + T.av + " " + antall + " " + T.treff + (treff < antall ? ". " + T.fasit + ": " + [...li.querySelectorAll(".ov-del.ov-feil")].map(b => "«" + esc(b.firstChild.textContent) + "» = " + esc(KAT[oppg[+b.dataset.j][1]][0])).join(", ") : " 🎉");
    }));

    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
  });
})();
