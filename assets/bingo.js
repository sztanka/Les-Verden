/* =========================================================
   Les verden – Lesebingo / Reading Room Bingo (bingo.html)
   5 × 5 brett med leseoppgaver. Midten er gratis.
   bingo.html?id=nb-123456 / en-123456 → samme id = samme brett,
   så læreren kan dele ett brett med hele klassen.
   Ingenting lagres – bruk «Last ned svarene» eller skriv ut.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const blandR = (a, r) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  const OPPG = {
    nb: ["Les en bok med en hovedperson som er eldre enn deg", "Les en avisartikkel og finn tre fakta", "Les en tekst om et land du aldri har vært i", "Les et dikt høyt for noen hjemme", "Les en tegneserie eller grafisk roman", "Les en bok som er blitt film", "Les en sakprosatekst om naturen", "Les en tekst fra et tema på Les verden", "Les i 20 minutter et nytt sted", "Les en bok av en forfatter fra et annet land", "Les en bok som en venn anbefaler", "Les en fortelling fra før 1950", "Les en tekst med vanskelige ord – slå opp tre av dem", "Les en bok med mer enn 200 sider", "Les en novelle", "Les en biografi eller en tekst om en ekte person", "Les et eventyr eller et sagn", "Les en tekst om noe som skjedde i år", "Les en lettlest bok på én dag", "Les en tekst og lag et tankekart om den", "Les en bok der handlingen foregår i framtida", "Les en bok med en hovedperson som er ulik deg", "Les noe som får deg til å le", "Les en tekst om sport", "Les en bok fra skolebiblioteket du aldri har sett før", "Les en tekst om historie", "Les en tekst og skriv tre spørsmål til den", "Les en bok i en sjanger du vanligvis ikke leser", "Les en tekst på nynorsk", "Les en tekst om et yrke du er nysgjerrig på", "Les høyt for en yngre person", "Les en tekst og fortell om den til en makker", "Les en bok som er første bok i en serie", "Les en krimbok eller en mysteriefortelling", "Les en tekst om klima eller miljø", "Les et kapittel to ganger og legg merke til nye ting", "Les en tekst med kart, tabeller eller diagrammer", "Les en bok med et omslag du liker", "Les en bok som har vunnet en pris", "Les en tekst om rettigheter eller demokrati"],
    en: ["Read a book with a main character who is older than you", "Read a news article in English and find three facts", "Read a text set in an English-speaking country", "Read a poem aloud to someone at home", "Read a comic or graphic novel in English", "Read a book that has been made into a film", "Read a non-fiction text about animals or nature", "Read a text from the Reading Room", "Read for 20 minutes in a new place", "Read a book by an author from another country", "Read a book a friend recommends", "Read a story written before 1950", "Read a text with difficult words – look up three of them", "Read a book with more than 150 pages", "Read a short story", "Read a biography or a text about a real person", "Read a fairy tale, a myth or a fable", "Read a text about something that happened this year", "Read an easy reader in one day", "Read a text and make a mind map about it", "Read a book set in the future", "Read a book with a main character who is different from you", "Read something that makes you laugh", "Read a text about sport", "Read a book from the school library you have never seen before", "Read a text about history", "Read a text and write three questions about it", "Read a book in a genre you don't usually read", "Read song lyrics and talk about what they mean", "Read a text about a job you are curious about", "Read aloud to a younger person", "Read a text and retell it to a partner", "Read the first book in a series", "Read a mystery or crime story", "Read a text about climate or the environment", "Read a chapter twice and notice new things", "Read a text with maps, tables or charts", "Read a book because you like the cover", "Read a book that has won a prize", "Read a text about rights or equality"]
  };
  const T = {
    nb: { tittel: "Lesebingo", ingress: "Fem på rad – vannrett, loddrett eller på skrå – gir bingo! Skriv tittelen på det du har lest i ruta, og kryss av når du er ferdig. Ruta i midten er gratis.", gratis: "GRATIS", fritt: "Fritt valg!", ferdig: "Ferdig", tittelF: "Tittel", nytt: "🎲 Nytt brett", del: "🔗 Kopier lenke til brettet", kopiert: "Lenken er kopiert – del den med klassen.", skriv: "🖨️ Skriv ut", bytt: "🇬🇧 English board", bingo: "🎉 BINGO!", rader: n => n + (n === 1 ? " bingo" : " bingoer"), kryss: n => n + " av 25 ruter", alle: "🏆 Fullt brett! Du er en lesemester.", navn: "Navn", tips: "Tips til læreren: Del lenken, så får alle i klassen det samme brettet. Elevene laster ned svarene sine og fortsetter senere med samme fil.", brett: "Brett" },
    en: { tittel: "Reading Room Bingo", ingress: "Five in a row – across, down or diagonal – is bingo! Write the title of what you read in the square, and tick it when you are done. The middle square is free.", gratis: "FREE", fritt: "Free choice!", ferdig: "Done", tittelF: "Title", nytt: "🎲 New board", del: "🔗 Copy link to this board", kopiert: "Link copied – share it with your class.", skriv: "🖨️ Print", bytt: "🇳🇴 Norsk brett", bingo: "🎉 BINGO!", rader: n => n + " bingo" + (n === 1 ? "" : "s"), kryss: n => n + " of 25 squares", alle: "🏆 Full board! You are a reading champion.", navn: "Name", tips: "Teacher tip: Share the link so the whole class gets the same board. Students download their answers and continue later with the same file.", brett: "Board" }
  };
  const LINJER = (() => { const l = []; for (let i = 0; i < 5; i++) { l.push([0, 1, 2, 3, 4].map(j => i * 5 + j)); l.push([0, 1, 2, 3, 4].map(j => j * 5 + i)); } l.push([0, 6, 12, 18, 24], [4, 8, 12, 16, 20]); return l; })();

  function bygg() {
    let id = LV.param("id") || "";
    let m = /^(nb|en)-(\d{1,9})$/.exec(id);
    if (!m) {
      const sp = LV.param("sprak") === "en" ? "en" : "nb";
      id = sp + "-" + (Math.floor(Math.random() * 900000) + 100000);
      history.replaceState(null, "", "bingo.html?id=" + id);
      m = /^(nb|en)-(\d+)$/.exec(id);
    }
    const sp = m[1], seed = +m[2], tx = T[sp];
    const ruter = blandR(OPPG[sp], rng(seed)).slice(0, 24);
    ruter.splice(12, 0, null);
    document.title = tx.tittel + " – " + (LV.config ? LV.config.navn : "Les verden");
    document.documentElement.lang = sp === "en" ? "en" : "nb";
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="' + (sp === "en" ? "Breadcrumbs" : "Brødsmuler") + '"><a href="index.html">' + (sp === "en" ? "Home" : "Forside") + '</a> › <a href="spill.html">' + (sp === "en" ? "Games" : "Spill") + "</a> › " + tx.tittel + "</nav>" +
      '<header class="sidehode"><p class="overlinje">' + tx.brett + " " + esc(id) + '</p><h1>📚 ' + tx.tittel + '</h1><p class="ingress">' + tx.ingress + "</p>" +
      '<div class="mu-knapper bg-verktoy"><a class="knapp" href="bingo.html?sprak=' + sp + '">' + tx.nytt + '</a><button class="knapp" type="button" id="bg-del">' + tx.del + '</button><button class="knapp" type="button" id="bg-skriv">' + tx.skriv + '</button><a class="knapp" href="bingo.html?sprak=' + (sp === "en" ? "nb" : "en") + '">' + tx.bytt + '</a><span class="status" id="bg-delstatus" role="status"></span></div></header>' +
      '<p class="bg-stilling" id="bg-stilling" aria-live="polite"></p>' +
      '<ol class="bg-brett" id="bg-brett">' + ruter.map((r, i) => r === null
        ? '<li class="bg-rute bg-gratis ok"><span class="bg-stjerne" aria-hidden="true">⭐</span><strong>' + tx.gratis + "</strong><span>" + tx.fritt + "</span></li>"
        : '<li class="bg-rute" data-i="' + i + '"><p class="bg-oppg" id="bg-o-' + i + '">' + esc(r) + '</p><label class="skjult-visuelt" for="bg-t-' + i + '">' + tx.tittelF + ": " + esc(r) + '</label><input type="text" id="bg-t-' + i + '" placeholder="' + tx.tittelF + '" autocomplete="off"><label class="bg-kryss"><input type="checkbox" id="bg-c-' + i + '" aria-describedby="bg-o-' + i + '"> ' + tx.ferdig + "</label></li>").join("") + "</ol>" +
      '<p class="mu-intro bg-tips">💡 ' + tx.tips + "</p>";

    const oppdater = () => {
      const ok = ruter.map((r, i) => r === null || (($("bg-c-" + i) || {}).checked));
      document.querySelectorAll(".bg-rute[data-i]").forEach(li => li.classList.toggle("ok", ok[+li.dataset.i]));
      const vinn = LINJER.filter(l => l.every(i => ok[i]));
      document.querySelectorAll(".bg-rute").forEach(li => li.classList.remove("bingo"));
      vinn.forEach(l => l.forEach(i => document.querySelectorAll(".bg-rute")[i].classList.add("bingo")));
      const n = ok.filter(Boolean).length - 1;
      $("bg-stilling").innerHTML = (n === 24 ? tx.alle : vinn.length ? "<strong>" + tx.bingo + "</strong> " + tx.rader(vinn.length) : "") + ' <span class="bg-teller">' + tx.kryss(n + 1) + "</span>";
    };
    $("bg-brett").addEventListener("change", oppdater);
    oppdater();

    $("bg-del").addEventListener("click", () => {
      const url = location.href.split("#")[0];
      const ok = () => { $("bg-delstatus").textContent = tx.kopiert; };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(url).then(ok, () => window.prompt("Ctrl+C / Cmd+C", url)); else window.prompt("Ctrl+C / Cmd+C", url);
    });
    $("bg-skriv").addEventListener("click", () => window.print());

    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">' + tx.navn + '</label><input id="elevnavn" type="text" placeholder="' + tx.navn + '" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
  }
  document.addEventListener("DOMContentLoaded", bygg);
})();
