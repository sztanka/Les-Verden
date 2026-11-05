/* =========================================================
   Les verden – Lesedagbok for selvvalgte tekster (lesedagbok.html)
   Om boka, før lesing, leselogg, lesekort underveis, etter lesing og
   bokpresentasjon. Norsk eller engelsk (?sprak=en).
   Ingenting lagres: eleven kopierer, skriver ut eller laster ned en fil
   (svarfil.js) og fortsetter senere ved å lese den inn igjen.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const RADER = 30, SYNLIGE = 6;

  const T = {
    nb: {
      tittel: "Lesedagbok", ingress: "Til bøker og tekster du velger selv – romaner, tegneserier, sakprosa eller noe du leser på nett. Fyll ut litt hver gang du leser.",
      om: "Om boka", felt: [["bok-tittel", "Tittel"], ["bok-forfatter", "Forfatter"], ["bok-sjanger", "Sjanger", "krim, fantasy, biografi, sakprosa …"], ["bok-sider", "Antall sider"]],
      hvorfor: "Hvorfor valgte jeg denne boka?",
      for: "Før du leser", forSp: ["Se på forsiden, tittelen og teksten på baksiden. Hva tror du boka handler om?", "Hva vet du om temaet eller forfatteren fra før?"],
      logg: "Leselogg", loggIntro: "Skriv én linje hver gang du leser.", kol: ["Dato", "Sider", "Minutter", "Dette skjedde / dette lærte jeg"], flere: "+ Vis flere rader",
      kort: "Lesekort underveis", kortIntro: "Trykk på knappen for å få et lesekort. Svar på det i feltet under – ett nytt kort hver gang du leser.", trekk: "🎴 Gi meg et lesekort", kortFelt: "Svar på lesekortene",
      ord: "Ord jeg har lært", ordIntro: "Skriv nye ord og hva de betyr.",
      etter: "Etter at du har lest", etterSp: ["Skriv et kort sammendrag (bruk gjerne Noen – ville – men – så – til slutt).", "Hvem var den viktigste personen, og hvordan forandret hun eller han seg?", "Hva var det beste og det svakeste med boka?", "Hvem vil du anbefale boka til, og hvorfor?"],
      terning: "Terningkast", pres: "Bokpresentasjon (2–3 minutter)", presIntro: "Bruk punktene som manus når du presenterer boka for klassen.",
      presPunkt: ["Tittel, forfatter og sjanger", "Hvorfor valgte du boka?", "Hva handler den om? (Ikke avslør slutten!)", "Les opp et kort utdrag du liker – og fortell hvorfor", "Hva synes du om boka? Gi terningkast og begrunn", "Hvem bør lese den?"],
      lenker: 'Skal du skrive en bokanmeldelse? Bruk <a href="skriving.html?id=anmeldelse">guiden for anmeldelse</a>. Trenger du hjelp underveis? Se <a href="lesestrategier.html">lesestrategiene</a>.',
      kopier: "Kopier lesedagboka", slett: "Tøm alt", kopiert: "Lesedagboka er kopiert!", tom: "Du har ikke skrevet noe ennå.", sikker: "Vil du tømme hele lesedagboka?", slettet: "Lesedagboka er tømt.", navn: "Navn",
      bytt: "In English"
    },
    en: {
      tittel: "Reading log", ingress: "For books and texts you choose yourself – novels, graphic novels, non-fiction or something you read online. Fill in a little every time you read.",
      om: "About the book", felt: [["bok-tittel", "Title"], ["bok-forfatter", "Author"], ["bok-sjanger", "Genre", "crime, fantasy, biography, non-fiction …"], ["bok-sider", "Number of pages"]],
      hvorfor: "Why did I choose this book?",
      for: "Before you read", forSp: ["Look at the cover, the title and the back cover. What do you think the book is about?", "What do you already know about the topic or the author?"],
      logg: "Reading log", loggIntro: "Write one line every time you read.", kol: ["Date", "Pages", "Minutes", "What happened / what I learned"], flere: "+ Show more rows",
      kort: "Reading cards", kortIntro: "Press the button to get a reading card. Answer it in the box below – a new card every time you read.", trekk: "🎴 Give me a reading card", kortFelt: "Answers to the reading cards",
      ord: "New words", ordIntro: "Write new words and what they mean.",
      etter: "After reading", etterSp: ["Write a short summary (you can use Somebody – Wanted – But – So – Then).", "Who was the most important character, and how did he or she change?", "What was the best and the weakest thing about the book?", "Who would you recommend the book to, and why?"],
      terning: "Rating", pres: "Book talk (2–3 minutes)", presIntro: "Use the points as notes when you present the book to the class.",
      presPunkt: ["Title, author and genre", "Why did you choose the book?", "What is it about? (Don’t give away the ending!)", "Read a short passage you like – and say why", "What do you think of the book? Give it a rating and explain", "Who should read it?"],
      lenker: 'Writing a book review? Use <a href="skriving.html?id=review">the review guide</a>. Need help while reading? See the <a href="lesestrategier.html">reading strategies</a>.',
      kopier: "Copy my reading log", slett: "Clear everything", kopiert: "Your reading log has been copied!", tom: "You have not written anything yet.", sikker: "Do you want to clear the whole reading log?", slettet: "The reading log has been cleared.", navn: "Name",
      bytt: "På norsk"
    }
  };
  const KORT = {
    nb: ["Beskriv stedet der handlingen foregår. Hva ser, hører og lukter du?", "Hvilken person liker du best så langt? Hvorfor?", "Hva tror du skjer videre? Hvorfor tror du det?", "Skriv av en setning du liker, og forklar hvorfor.", "Har du opplevd noe som ligner på det som skjer i boka?", "Hvilket spørsmål ville du stilt hovedpersonen?", "Hva er det største problemet i boka så langt?", "Minner boka om en annen bok, film eller serie? Hvordan?", "Hvem forteller historien? Hvordan påvirker det det du får vite?", "Hva overrasket deg i dag?", "Hvilken følelse satt du igjen med etter å ha lest i dag?", "Hva ville du gjort hvis du var hovedpersonen?", "Velg et ord du ikke kjente. Hva tror du det betyr ut fra sammenhengen?", "Hva har du lært om verden fra boka så langt?", "Tegn eller beskriv en scene du ser for deg."],
    en: ["Describe the place where the story happens. What do you see, hear and smell?", "Which character do you like best so far? Why?", "What do you think will happen next? Why?", "Copy a sentence you like, and explain why you like it.", "Have you experienced something similar to what happens in the book?", "What question would you ask the main character?", "What is the biggest problem in the book so far?", "Does the book remind you of another book, film or series? How?", "Who is telling the story? How does that affect what you learn?", "What surprised you today?", "How did you feel after reading today?", "What would you do if you were the main character?", "Choose a word you didn’t know. What do you think it means from the context?", "What have you learned about the world from the book so far?", "Draw or describe a scene you can see in your mind."]
  };

  function bygg() {
    const sp = LV.param("sprak") === "en" ? "en" : "nb", tx = T[sp];
    document.documentElement.lang = sp === "en" ? "en" : "nb";
    document.title = tx.tittel + " – " + (LV.config ? LV.config.navn : "Les verden");
    const omraade = (id, etikett, rader) => '<label class="mu-notat"><span>' + esc(etikett) + '</span><textarea id="' + id + '" rows="' + (rader || 3) + '" data-sp="' + esc(etikett) + '"></textarea></label>';
    let h = '<nav class="brodsmuler" aria-label="Brødsmuler" lang="nb"><a href="index.html">Forside</a> › Lesedagbok</nav>' +
      '<header class="sidehode"><p class="overlinje">' + (sp === "en" ? "Free reading" : "Selvvalgte tekster") + "</p><h1>📔 " + tx.tittel + '</h1><p class="ingress">' + tx.ingress + '</p><p><a class="knapp liten" href="lesedagbok.html' + (sp === "en" ? "" : "?sprak=en") + '">' + (sp === "en" ? "🇳🇴 " : "🇬🇧 ") + tx.bytt + "</a></p></header>" +
      '<div id="ld-skjema">' +
      '<section class="le-del ld-boks"><h2>📘 ' + tx.om + '</h2><div class="ld-felt">' + tx.felt.map(([id, e, ph]) => '<label class="mu-notat"><span>' + esc(e) + '</span><input type="text" id="' + id + '" autocomplete="off" data-sp="' + esc(e) + '"' + (ph ? ' placeholder="' + esc(ph) + '"' : "") + "></label>").join("") + "</div>" + omraade("bok-hvorfor", tx.hvorfor, 2) + "</section>" +
      '<section class="le-del ld-boks"><h2>🔮 ' + tx.for + "</h2>" + tx.forSp.map((s, i) => omraade("for-" + i, s)).join("") + "</section>" +
      '<section class="le-del ld-boks"><h2>🗓️ ' + tx.logg + '</h2><p class="mu-intro">' + tx.loggIntro + '</p><div class="ld-logg-wrap"><table class="ld-logg"><thead><tr>' + tx.kol.map(k => '<th scope="col">' + k + "</th>").join("") + "</tr></thead><tbody>" +
        Array.from({ length: RADER }, (_, i) => '<tr data-rad="' + i + '"' + (i >= SYNLIGE ? " hidden" : "") + ">" + ["dato", "sider", "min", "notat"].map((k, j) => '<td><input type="text" id="logg-' + i + "-" + k + '" aria-label="' + esc(tx.kol[j]) + " " + (i + 1) + '" autocomplete="off"></td>').join("") + "</tr>").join("") +
        '</tbody></table></div><p><button class="knapp liten" type="button" id="ld-flere">' + tx.flere + '</button> <span class="ld-sum" id="ld-sum" aria-live="polite"></span></p></section>' +
      '<section class="le-del ld-boks"><h2>🎴 ' + tx.kort + '</h2><p class="mu-intro">' + tx.kortIntro + '</p><div class="mu-kortet ld-kort" id="ld-kort" aria-live="polite"><p>…</p></div><p><button class="knapp hoved" type="button" id="ld-trekk">' + tx.trekk + "</button></p>" + omraade("kort-svar", tx.kortFelt, 6) + "</section>" +
      '<section class="le-del ld-boks"><h2>🔤 ' + tx.ord + '</h2><p class="mu-intro">' + tx.ordIntro + "</p>" + omraade("ordliste", tx.ord, 5) + "</section>" +
      '<section class="le-del ld-boks"><h2>✅ ' + tx.etter + "</h2>" + tx.etterSp.map((s, i) => omraade("etter-" + i, s, i === 0 ? 5 : 3)).join("") +
        '<fieldset class="ld-terning"><legend>' + tx.terning + "</legend>" + [1, 2, 3, 4, 5, 6].map(n => '<label><input type="radio" name="terning" id="terning-' + n + '" value="' + n + '"><span>' + "⚀⚁⚂⚃⚄⚅"[n - 1] + " " + n + "</span></label>").join("") + "</fieldset></section>" +
      '<section class="le-del ld-boks"><h2>🎤 ' + tx.pres + '</h2><p class="mu-intro">' + tx.presIntro + "</p>" + tx.presPunkt.map((s, i) => omraade("pres-" + i, (i + 1) + ". " + s, 2)).join("") + "</section></div>" +
      '<p class="fo-merk">' + tx.lenker + "</p>";
    $("innhold").innerHTML = h;

    // Logg: vis flere rader, vis rader med innhold, summer
    const tbody = document.querySelector(".ld-logg tbody");
    const oppdater = () => {
      let sider = 0, min = 0, okter = 0;
      tbody.querySelectorAll("tr").forEach(tr => {
        const v = [...tr.querySelectorAll("input")].map(x => x.value.trim());
        if (v.some(Boolean)) { tr.hidden = false; okter++; }
        const s = v[1].match(/(\d+)\s*[-–]\s*(\d+)/); sider += s ? Math.max(0, s[2] - s[1] + 1) : (parseInt(v[1], 10) || 0);
        min += parseInt(v[2], 10) || 0;
      });
      $("ld-sum").textContent = okter ? (sp === "en" ? okter + " sessions · " + sider + " pages · " + min + " minutes" : okter + " økter · " + sider + " sider · " + min + " minutter") : "";
    };
    tbody.addEventListener("input", oppdater);
    $("ld-flere").addEventListener("click", () => { const skjult = [...tbody.querySelectorAll("tr[hidden]")].slice(0, 4); skjult.forEach(tr => { tr.hidden = false; }); if (!tbody.querySelector("tr[hidden]")) $("ld-flere").hidden = true; });

    // Lesekort
    let bunke = [];
    $("ld-trekk").addEventListener("click", () => {
      if (!bunke.length) bunke = KORT[sp].map((_, i) => i).sort(() => Math.random() - .5);
      const k = KORT[sp][bunke.pop()];
      $("ld-kort").innerHTML = "<p>" + esc(k) + "</p>";
      const f = $("kort-svar"); if (!f.value.includes(k)) f.value = (f.value.trim() ? f.value.trim() + "\n\n" : "") + k + "\n";
      f.dispatchEvent(new Event("input", { bubbles: true }));
    });

    // Svarlinje
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">' + tx.navn + '</label><input id="elevnavn" type="text" placeholder="' + tx.navn + '" autocomplete="off">' +
      '<button class="knapp hoved" id="kopier" type="button">' + tx.kopier + '</button><button class="knapp fare" id="slett" type="button">' + tx.slett + '</button><span class="status" id="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
    let endret = false;
    document.addEventListener("input", e => { if (e.target.closest("#ld-skjema")) { endret = true; $("status").textContent = ""; } });
    $("kopier").addEventListener("click", () => {
      const deler = [];
      const navn = $("elevnavn").value.trim();
      document.querySelectorAll("#ld-skjema [data-sp]").forEach(f => { if (f.value.trim()) deler.push(f.dataset.sp + "\n" + f.value.trim()); });
      const logg = [...tbody.querySelectorAll("tr")].map(tr => [...tr.querySelectorAll("input")].map(x => x.value.trim())).filter(v => v.some(Boolean)).map(v => v.join(" | "));
      if (logg.length) deler.push(tx.logg.toUpperCase() + " (" + tx.kol.join(" | ") + ")\n" + logg.join("\n"));
      const t = document.querySelector('input[name="terning"]:checked'); if (t) deler.push(tx.terning + ": " + t.value);
      if (!deler.length) { $("status").textContent = tx.tom; return; }
      const tekst = tx.tittel + (navn ? " – " + navn : "") + "\n" + new Date().toLocaleDateString("nb-NO") + "\n\n" + deler.join("\n\n") + "\n";
      const ok = () => { endret = false; $("status").textContent = tx.kopiert; };
      const reserve = () => { const x = document.createElement("textarea"); x.value = tekst; document.body.appendChild(x); x.select(); let lyktes = false; try { lyktes = document.execCommand("copy"); } catch (er) { lyktes = false; } x.remove(); if (lyktes) ok(); else window.prompt("Ctrl+C / Cmd+C", tekst); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(tekst).then(ok, reserve); else reserve();
    });
    $("slett").addEventListener("click", () => {
      if (!confirm(tx.sikker)) return;
      document.querySelectorAll("#ld-skjema input, #ld-skjema textarea").forEach(f => { if (f.type === "radio") f.checked = false; else f.value = ""; });
      tbody.querySelectorAll("tr").forEach((tr, i) => { tr.hidden = i >= SYNLIGE; }); $("ld-flere").hidden = false; oppdater();
      endret = false; $("status").textContent = tx.slettet;
    });
    window.addEventListener("beforeunload", e => { if (!endret) return; e.preventDefault(); e.returnValue = ""; });
  }
  document.addEventListener("DOMContentLoaded", bygg);
})();
