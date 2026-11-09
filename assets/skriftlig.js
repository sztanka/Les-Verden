/* =========================================================
   Les verden – Skriftlig eksamen i engelsk (skriftlig.html)
   skriftlig.html                       → oversikt og strategier
   skriftlig.html?del=vf&id=<tema>      → videreformidling (lytt og formidle)
   skriftlig.html?del=sh&id=<tema>      → samhandling (svar i en chattråd)
   skriftlig.html?del=eksamen&id=<tema> → begge delene med tidtaker
   Data: data/skriftlig.js. Ingenting lagres – bruk «Last ned svarene».
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const ord = s => (String(s).trim().match(/\S+/g) || []).length;
  const avs = s => esc(s).split(/\n\s*\n/).map(p => "<p>" + p.replace(/\n/g, "<br>") + "</p>").join("");
  const hode = (t) => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="eksamen.html">Eksamen</a> › <a href="skriftlig.html">Skriftlig eksamen i engelsk</a>' + (t ? " › " + esc(t) : "") + "</nav>";
  const visKnapp = (id, tekst) => '<button type="button" class="knapp liten sx-vis" aria-expanded="false" aria-controls="' + id + '">' + tekst + '</button><div class="sx-skjult" id="' + id + '" hidden>';

  // ---------- Oversikt ----------
  function oversikt() {
    document.title = "Skriftlig eksamen i engelsk – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje">Eksamen · engelsk</p><h1>📝 Skriftlig eksamen i engelsk</h1><p class="ingress">Skriftlig eksamen i engelsk har ofte en del der du lytter til en muntlig tekst og formidler de viktigste poengene skriftlig (<strong>videreformidling</strong>), og en del der du svarer på andres innlegg i en diskusjon (<strong>samhandling</strong>). Her kan du øve på begge – hver for seg eller som en hel eksamensøkt.</p></header>' +
      '<div class="sx-strategi"><section><h2>🎧 Videreformidling</h2><ol><li><strong>Les oppgaven først.</strong> Hvem skal du skrive til, og hvorfor?</li><li><strong>Første lytting:</strong> Få oversikt. Hvem snakker, og hva handler det om?</li><li><strong>Andre lytting:</strong> Skriv stikkord – navn, tall, grunner, eksempler og meninger.</li><li><strong>Velg ut:</strong> Ta med det viktigste for <em>mottakeren</em>, ikke alt du hørte.</li><li><strong>Skriv med egne ord.</strong> Si hvem som mener hva: <em lang="en">«According to Sam, …», «Ruby explains that …»</em></li><li>Følg oppgaven: Skal du også si din egen mening eller komme med forslag?</li></ol></section>' +
      '<section><h2>💬 Samhandling</h2><ol><li><strong>Les hele tråden</strong> før du skriver. Hvem mener hva?</li><li><strong>Svar på det personen faktisk skrev</strong> – vis at du har forstått (<em lang="en">«I see your point, @Maya …»</em>).</li><li><strong>Bygg videre</strong>: Er du enig eller uenig? Begrunn, og gi et eksempel.</li><li><strong>Still gjerne et spørsmål</strong> som får diskusjonen videre.</li><li><strong>Tilpass tonen</strong>: vennlig og saklig – også når du er uenig, og også mot uhøflige innlegg.</li><li>Nytt innlegg? Kom med noe <em>nytt</em>, og vis til andre i tråden.</li></ol></section></div>' +
      '<h2 class="sx-tematittel">Velg et tema</h2><ul class="sx-temaer">' + LV.skriftlig.map(t =>
        '<li class="sx-tema" style="--sx:' + t.farge + '"><p class="sx-tema-ikon" aria-hidden="true">' + t.ikon + '</p><h3 lang="en">' + esc(t.tema) + '</h3><p lang="en" class="sx-tema-om">🎧 ' + esc(t.lyd.type) + " · 💬 " + esc(t.trad.forum.split("›").pop().trim()) + ' forum</p><div class="sx-tema-knapper"><a class="knapp" href="skriftlig.html?del=vf&amp;id=' + t.id + '">🎧 Videreformidling</a><a class="knapp" href="skriftlig.html?del=sh&amp;id=' + t.id + '">💬 Samhandling</a><a class="knapp hoved" href="skriftlig.html?del=eksamen&amp;id=' + t.id + '">⏱ Hel eksamensøkt</a></div></li>').join("") + "</ul>" +
      '<p class="mu-intro">Alle personer, podkaster, radioprogrammer og forum her er oppdiktet. Lydtekstene leses foreløpig opp av nettleserens talesyntese med ulike stemmer for hver person – der det finnes flere engelske stemmer. Sjekk alltid formatet mot Utdanningsdirektoratets eksempeloppgaver for årets eksamen.</p>';
  }

  // ---------- Videreformidling ----------
  function vfHtml(t, nr) {
    const L = t.lyd, p = "vf-" + t.id;
    return '<section class="sx-del" id="' + p + '"><p class="sx-delnr">' + (nr ? "Del " + nr + " · " : "") + 'Videreformidling</p><h2 lang="en">🎧 ' + esc(L.tittel) + '</h2><div lang="en"><p class="sx-om">' + esc(L.om) + '</p><ul class="sx-talere">' + Object.entries(L.talere).map(([n, [, r]]) => '<li><strong>' + esc(n) + "</strong> – " + esc(r) + "</li>").join("") + "</ul>" +
      '<div class="sx-oppgave"><h3>✍️ Your task – read it before you listen!</h3><p>' + esc(L.oppgave) + "</p></div>" +
      '<div class="sx-spiller" id="' + p + '-spiller">' + (L.fil ? '<audio controls preload="none" src="' + esc(L.fil) + '"></audio>' :
        '<div class="sx-kontroll"><button type="button" class="knapp hoved" id="' + p + '-spill">▶ Listen</button><button type="button" class="knapp liten" id="' + p + '-stopp" disabled>■ Stop</button><label class="ly-fart" for="' + p + '-fart">Speed <input type="range" id="' + p + '-fart" min="0.7" max="1.1" step="0.1" value="0.9"></label><span class="sx-teller" id="' + p + '-teller">Listening 0 of 2</span></div><p class="sx-taler" id="' + p + '-taler" aria-live="polite">' + Object.keys(L.talere).map(n => '<span data-n="' + esc(n) + '">' + esc(n) + "</span>").join("") + '</p><p class="sx-tips">In the exam, you can often listen twice. Here you can listen as many times as you like – but try to manage with two!</p>') + "</div>" +
      '<h3>📝 Notes while you listen</h3><div class="sx-notater">' + L.notater.map((n, i) => '<label class="mu-notat" for="' + p + "-n" + i + '"><span>' + esc(n) + '</span><textarea id="' + p + "-n" + i + '" rows="3"></textarea></label>').join("") + "</div>" +
      '<h3>✍️ Write your text</h3><p class="sx-oppg-kort">' + esc(L.oppgave) + '</p><label class="skjult-visuelt" for="' + p + '-tekst">Your text</label><textarea class="sx-tekst" id="' + p + '-tekst" rows="16"></textarea><p class="sx-ord" id="' + p + '-ord" aria-live="polite">0 words</p>' +
      '<h3>✅ Check your text</h3><div class="sx-sjekk">' +
      visKnapp(p + "-poeng", "Main points in the recording") + '<p>Tick the points you have included. Did you choose the ones that matter most for your reader?</p><ul class="sx-poeng">' + L.poeng.map((x, i) => '<li><label><input type="checkbox" id="' + p + "-p" + i + '"> ' + esc(x) + "</label></li>").join("") + "</ul></div>" +
      visKnapp(p + "-krit", "Checklist") + '<ul class="sx-krit">' + ["I have written for the reader and purpose in the task (e.g. email, article).", "I have passed on the most important points – not everything.", "I have made it clear who said what («According to …», «… explains that …»).", "I have used my own words and not copied long sentences.", "I have included my own opinion or suggestions if the task asks for it.", "My text has an introduction, a main part and an ending.", "I have checked spelling, verb forms and capital letters."].map((x, i) => '<li><label><input type="checkbox" id="' + p + "-k" + i + '"> ' + esc(x) + "</label></li>").join("") + "</ul></div>" +
      visKnapp(p + "-eks", "Example answer") + '<div class="sx-eksempel">' + avs(L.eksempel) + "</div></div>" +
      visKnapp(p + "-trans", "Transcript") + '<div class="sx-trans">' + L.replikker.map(([n, x]) => "<p><strong>" + esc(n) + ":</strong> " + esc(x) + "</p>").join("") + "</div></div>" +
      "</div></div></section>";
  }
  function vfBind(t) {
    const L = t.lyd, p = "vf-" + t.id;
    const tekst = $(p + "-tekst"); tekst.addEventListener("input", () => { $(p + "-ord").textContent = ord(tekst.value) + " words"; });
    if (L.fil || !$(p + "-spill")) return;
    if (!("speechSynthesis" in window)) { $(p + "-spiller").innerHTML = "<p>Your browser cannot read text aloud. Ask your teacher to read the transcript aloud, or use another browser.</p>"; return; }
    let kjorer = false, teller = 0, kø = [];
    const stemmer = () => {
      const alle = speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang)), brukt = new Set(), ut = {};
      Object.entries(L.talere).forEach(([n, [kode]], i) => {
        let v = alle.find(x => x.lang.toLowerCase().replace("_", "-") === kode.toLowerCase() && !brukt.has(x.name)) || alle.find(x => !brukt.has(x.name)) || alle[i % (alle.length || 1)];
        if (v) brukt.add(v.name); ut[n] = { v, pitch: [1, 0.85, 1.15, 0.95][i % 4] };
      });
      return ut;
    };
    const marker = n => $(p + "-taler").querySelectorAll("span").forEach(s => s.classList.toggle("aktiv", s.dataset.n === n));
    const stopp = () => { kjorer = false; kø = []; speechSynthesis.cancel(); marker(""); $(p + "-spill").textContent = "▶ Listen"; $(p + "-stopp").disabled = true; };
    $(p + "-stopp").addEventListener("click", stopp);
    $(p + "-spill").addEventListener("click", () => {
      if (kjorer) { if (speechSynthesis.paused) { speechSynthesis.resume(); $(p + "-spill").textContent = "⏸ Pause"; } else { speechSynthesis.pause(); $(p + "-spill").textContent = "▶ Continue"; } return; }
      speechSynthesis.cancel(); kjorer = true; teller++; $(p + "-teller").textContent = "Listening " + teller + " of 2" + (teller > 2 ? " (extra practice)" : "");
      $(p + "-spill").textContent = "⏸ Pause"; $(p + "-stopp").disabled = false;
      const s = stemmer(), fart = +$(p + "-fart").value;
      kø = L.replikker.slice();
      const neste = () => {
        if (!kjorer) return;
        const r = kø.shift(); if (!r) { stopp(); return; }
        const [n, x] = r, u = new SpeechSynthesisUtterance(x);
        u.lang = (L.talere[n] || ["en-GB"])[0]; u.rate = fart;
        if (s[n] && s[n].v) u.voice = s[n].v; if (s[n]) u.pitch = s[n].pitch;
        u.onstart = () => marker(n); u.onend = () => setTimeout(neste, 350); u.onerror = () => { if (kjorer) setTimeout(neste, 50); };
        speechSynthesis.speak(u);
      };
      neste();
    });
    window.addEventListener("pagehide", () => speechSynthesis.cancel());
  }

  // ---------- Samhandling ----------
  const initialer = n => n.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase() || "?";
  const farge = n => { let h = 0; for (const c of n) h = (h * 31 + c.charCodeAt(0)) % 360; return "hsl(" + h + " 50% 28%)"; };
  function shHtml(t, nr) {
    const T = t.trad, p = "sh-" + t.id, F = LV.skriftligFraser;
    const komponist = (id, til) => '<div class="sx-svarboks" data-boks="' + id + '"><label for="' + id + '">' + (til ? "Reply to @" + esc(til) : "Write a new post") + '</label><textarea id="' + id + '" rows="5"' + (til ? ' placeholder="@' + esc(til) + ' …"' : "") + '></textarea><div class="sx-svarlinje"><span class="sx-ord" aria-live="polite">0 words</span><button type="button" class="knapp liten sx-publiser">Post</button></div><div class="sx-publisert" hidden></div></div>';
    return '<section class="sx-del" id="' + p + '"><p class="sx-delnr">' + (nr ? "Del " + nr + " · " : "") + 'Samhandling</p><h2 lang="en">💬 ' + esc(T.tittel) + '</h2><div lang="en">' +
      '<div class="sx-oppgave"><h3>✍️ Your task</h3><p>Read the whole discussion thread. Then:</p><ol>' + T.oppgave.map(o => "<li>" + o + "</li>").join("") + "</ol><p>Write about 60–100 words in each reply.</p></div>" +
      '<div class="sx-trad-rad"><div class="sx-trad" role="feed" aria-label="Discussion thread"><p class="sx-forum">' + esc(T.forum) + '</p><p class="sx-tradtittel">' + esc(T.tittel) + "</p>" +
      T.innlegg.map((x, i) => '<article class="sx-post" aria-label="Post by ' + esc(x.navn) + '"><span class="sx-avatar" aria-hidden="true" style="background:' + farge(x.navn) + '">' + initialer(x.navn) + '</span><div class="sx-post-kropp"><p class="sx-post-hode"><strong>' + esc(x.navn) + "</strong> <span>" + esc(x.tid) + '</span></p><p class="sx-post-tekst">' + esc(x.tekst) + '</p><p class="sx-post-fot">👍 ' + x.likes + "</p>" + (T.svarPa.includes(i) ? komponist(p + "-svar" + i, x.navn) : "") + "</div></article>").join("") +
      '<article class="sx-post sx-ny"><span class="sx-avatar" aria-hidden="true">🙂</span><div class="sx-post-kropp">' + komponist(p + "-ny", null) + "</div></article></div>" +
      '<aside class="sx-fraser"><h3>Useful phrases</h3><p class="sx-fraser-tips">Click a phrase to add it to the box you are writing in.</p>' + [["enig", "Agreeing"], ["uenig", "Disagreeing politely"], ["sporre", "Asking"], ["eksempel", "Giving examples"], ["hoflig", "Being friendly"]].map(([k, n]) => "<h4>" + n + "</h4><ul>" + F[k].map(f => '<li><button type="button" class="sx-frase">' + esc(f) + "</button></li>").join("") + "</ul>").join("") + "</aside></div>" +
      '<h3>✅ Check your replies</h3><div class="sx-sjekk">' + visKnapp(p + "-krit", "Checklist") + '<ul class="sx-krit">' + ["My reply shows that I have understood what the person actually wrote.", "I say clearly whether I agree or disagree – and why.", "I give an example or an argument, not just an opinion.", "I take the discussion further (a new point, a question or a solution).", "My tone is friendly and respectful – also when I disagree or reply to a rude post.", "I use the person’s name (@…) and refer to others in the thread.", "My new post brings in something new and refers to at least one other post."].map((x, i) => '<li><label><input type="checkbox" id="' + p + "-k" + i + '"> ' + esc(x) + "</label></li>").join("") + "</ul></div>" +
      visKnapp(p + "-eks", "Example replies – good and weak") + T.eksempler.map(e => '<div class="sx-eksempel sx-niva-' + (e.niva === "Good" ? "god" : "svak") + '"><p class="sx-niva">' + (e.niva === "Good" ? "👍 Good reply" : "👎 Weak reply") + "</p><p>" + esc(e.tekst) + "</p></div>").join("") + '<p>Why is the first reply better? Look at the checklist above.</p></div></div></div></section>';
  }
  function shBind(t) {
    const sek = $("sh-" + t.id);
    let sist = null;
    sek.querySelectorAll(".sx-svarboks textarea").forEach(ta => {
      ta.addEventListener("focus", () => { sist = ta; });
      ta.addEventListener("input", () => { ta.closest(".sx-svarboks").querySelector(".sx-ord").textContent = ord(ta.value) + " words"; });
    });
    sek.querySelectorAll(".sx-publiser").forEach(b => b.addEventListener("click", () => {
      const boks = b.closest(".sx-svarboks"), ta = boks.querySelector("textarea"), ut = boks.querySelector(".sx-publisert");
      if (!ut.hidden) { ut.hidden = true; ta.hidden = false; boks.querySelector("label").hidden = false; b.textContent = "Post"; ta.focus(); return; }
      if (!ta.value.trim()) { ta.focus(); return; }
      ut.innerHTML = '<p class="sx-post-hode"><strong>You</strong> <span>just now</span></p><p class="sx-post-tekst">' + esc(ta.value).replace(/(@[\w.]+)/g, "<strong>$1</strong>").replace(/\n/g, "<br>") + "</p>";
      ut.hidden = false; ta.hidden = true; boks.querySelector("label").hidden = true; b.textContent = "✎ Edit";
    }));
    sek.querySelectorAll(".sx-frase").forEach(f => f.addEventListener("click", () => {
      const ta = sist || sek.querySelector(".sx-svarboks textarea"); if (!ta || ta.hidden) return;
      const til = ta.id.includes("-svar") ? ta.closest(".sx-post").querySelector(".sx-post-hode strong").textContent : "…";
      const s = ta.selectionStart || ta.value.length, frase = f.textContent.replace(/@…/g, "@" + til) + " ";
      ta.value = ta.value.slice(0, s) + (s && !/\s$/.test(ta.value.slice(0, s)) ? " " : "") + frase + ta.value.slice(s);
      ta.focus(); ta.dispatchEvent(new Event("input", { bubbles: true }));
    }));
  }

  // ---------- Felles ----------
  function bindVis() {
    document.querySelectorAll(".sx-vis").forEach(b => b.addEventListener("click", () => {
      const d = $(b.getAttribute("aria-controls")), apen = !d.hidden; d.hidden = apen; b.setAttribute("aria-expanded", String(!apen));
    }));
  }
  function visDel(t, del) {
    const navn = del === "vf" ? "Videreformidling" : del === "sh" ? "Samhandling" : "Eksamensøkt";
    document.title = t.tema + " – " + navn + " – Les verden";
    let h = hode(t.tema + " – " + navn) + '<header class="sidehode"><p class="overlinje">Skriftlig eksamen i engelsk · ' + navn + '</p><h1><span aria-hidden="true">' + t.ikon + '</span> <span lang="en">' + esc(t.tema) + "</span></h1>";
    if (del === "eksamen") h += '<p class="ingress">Her får du begge delene om samme tema, slik det kan være på eksamen. Sett tiden læreren har bestemt, og start klokka.</p><div class="sx-klokke" id="sx-klokke"><label for="sx-min">Minutter</label><input type="number" id="sx-min" min="10" max="300" value="90"><button type="button" class="knapp hoved" id="sx-start">⏱ Start</button><span class="sx-tid" id="sx-tid" role="timer" aria-live="off">90:00</span></div>';
    h += "</header>";
    if (del !== "sh") h += vfHtml(t, del === "eksamen" ? 1 : 0);
    if (del !== "vf") h += shHtml(t, del === "eksamen" ? 2 : 0);
    h += '<p class="sx-videre"><a class="knapp" href="skriftlig.html">← Velg et annet tema</a>' + (del !== "eksamen" ? ' <a class="knapp" href="skriftlig.html?del=' + (del === "vf" ? "sh" : "vf") + "&amp;id=" + t.id + '">' + (del === "vf" ? "💬 Til samhandling" : "🎧 Til videreformidling") + " →</a>" : "") + "</p>";
    $("innhold").innerHTML = h;
    if (del !== "sh") vfBind(t);
    if (del !== "vf") shBind(t);
    bindVis();
    if (del === "eksamen") {
      let igjen = 0, tikk = null;
      const vis = () => { const m = Math.floor(igjen / 60), s = igjen % 60; $("sx-tid").textContent = m + ":" + String(s).padStart(2, "0"); $("sx-tid").classList.toggle("lite", igjen <= 600 && igjen > 0); };
      $("sx-min").addEventListener("input", () => { if (!tikk) { igjen = Math.max(1, +$("sx-min").value || 90) * 60; vis(); } });
      $("sx-start").addEventListener("click", () => {
        if (tikk) { clearInterval(tikk); tikk = null; $("sx-start").textContent = "⏱ Fortsett"; return; }
        if (!igjen) igjen = Math.max(1, +$("sx-min").value || 90) * 60;
        $("sx-start").textContent = "⏸ Pause";
        tikk = setInterval(() => { igjen--; vis(); if (igjen <= 0) { clearInterval(tikk); tikk = null; $("sx-tid").textContent = "⏰ Tiden er ute!"; $("sx-start").disabled = true; } }, 1000);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const t = LV.skriftlig.find(x => x.id === LV.param("id")), del = LV.param("del");
    if (t && ["vf", "sh", "eksamen"].includes(del)) visDel(t, del); else oversikt();
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
  });
})();
