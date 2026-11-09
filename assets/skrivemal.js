/* =========================================================
   Les verden – Skrivemaler (skrivemal.html)
   Postkort fra fortiden, historisk avisforside, Wanted-plakat,
   nytt bokomslag og booktrailer-manus. Eleven fyller ut feltene,
   og forhåndsvisningen oppdateres mens hen skriver.
   skrivemal.html?mal=postkort|avis|wanted|omslag|trailer[&sprak=en]
   Skriv ut (bare forhåndsvisningen) eller last ned svarene (svarfil.js).
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const avs = s => esc(s).split(/\n\s*\n/).map(p => "<p>" + p.replace(/\n/g, "<br>") + "</p>").join("");

  const MALER = {
    postkort: {
      ikon: "📮", sprak: ["nb", "en"],
      nb: { tittel: "Postkort fra fortiden", kort: "Skriv et postkort fra en person som lever midt i en historisk hendelse.", intro: "Du er en person som lever midt i en historisk hendelse. Skriv et postkort hjem. Bruk fakta du har lært – men skriv med følelser, som en ekte person.",
        tips: ["Fra en utvandrer på Ellis Island, 1892", "Fra en soldat i skyttergraven ved Somme, 1916", "Fra en tilskuer på Eidsvoll 17. mai 1814", "Fra en fyrstikkarbeiderske i Kristiania, 1889", "Fra Paris 14. juli 1789", "Fra en samisk elev på internatskole, 1930"],
        felt: [["bilde", "Bildesiden: «Hilsen fra …»", "input", "Hilsen fra Ellis Island!"], ["symbol", "Velg et symbol til bildesiden", "symbol"], ["sted", "Sted og dato", "input", "New York, 3. mai 1892"], ["tekst", "Hilsenen din (6–10 setninger)", "textarea", "Kjære mor! Nå er jeg endelig …"], ["fra", "Hilsen fra", "input", "Kari"], ["til", "Til (navn og adresse)", "textarea", "Ingrid Olsen\nØvre Hagen\nValdres, Norge"]] },
      en: { tittel: "Postcard from the past", kort: "Write a postcard from someone who is living through a historical event.", intro: "You are a person living through a historical event. Write a postcard home. Use facts you have learned – but write with feelings, like a real person.",
        tips: ["From an immigrant at Ellis Island, 1907", "From a visitor to the Great Exhibition in London, 1851", "From a soldier in the trenches, 1916", "From a marcher in Washington, D.C., August 1963", "From a child in a Victorian factory, 1840", "From a convict on a ship to Australia, 1788"],
        felt: [["bilde", "Picture side: «Greetings from …»", "input", "Greetings from Ellis Island!"], ["symbol", "Choose a symbol for the picture side", "symbol"], ["sted", "Place and date", "input", "New York, 3 May 1907"], ["tekst", "Your message (6–10 sentences)", "textarea", "Dear Mum, I have finally …"], ["fra", "From", "input", "Anna"], ["til", "To (name and address)", "textarea", "Mrs Mary Smith\n12 Mill Street\nManchester, England"]] },
      vis: (v, tx) => '<div class="sm-postkort"><div class="sm-pk-bilde"><span class="sm-pk-symbol" aria-hidden="true">' + esc(v.symbol || "🏞️") + '</span><span class="sm-pk-hilsen">' + esc(v.bilde || "…") + '</span></div><div class="sm-pk-bak"><div class="sm-pk-tekst"><p class="sm-pk-sted">' + esc(v.sted) + "</p>" + avs(v.tekst) + '<p class="sm-pk-fra">' + esc(v.fra) + '</p></div><div class="sm-pk-adr"><span class="sm-pk-frimerke" aria-hidden="true">' + esc(v.symbol || "📮") + "</span>" + esc(v.til).replace(/\n/g, "<br>") + "</div></div></div>"
    },
    avis: {
      ikon: "📰", sprak: ["nb"],
      nb: { tittel: "Historisk avisforside", kort: "Lag forsiden til en avis den dagen noe stort skjedde.", intro: "Lag forsiden til en avis som kom ut dagen etter en stor historisk hendelse. Skriv som en journalist: Hvem, hva, hvor, når og hvorfor – og få med et sitat fra et vitne.",
        tips: ["18. mai 1814: Norge har fått en grunnlov!", "8. juni 1905: Unionen med Sverige er oppløst", "15. juli 1789: Bastillen er stormet", "10. april 1940: Tyskland har angrepet Norge", "10. november 1989: Berlinmuren har falt", "12. februar 1990: Nelson Mandela er fri"],
        felt: [["navn", "Avisens navn", "input", "Eidsvoll-Posten"], ["dato", "Dato", "input", "Onsdag 18. mai 1814"], ["tittel", "Hovedoverskrift", "input", "NORGE HAR FÅTT EN GRUNNLOV!"], ["ingress", "Ingress (1–2 setninger som oppsummerer saken)", "textarea", ""], ["tekst", "Brødtekst (hvem, hva, hvor, når, hvorfor)", "textarea", ""], ["sitat", "Sitat fra et vitne", "input", "«Jeg har aldri sett så mange glade mennesker», sier …"], ["bilde", "Beskriv bildet og skriv bildeteksten", "input", "Eidsvollsmennene samlet i salen."], ["kort", "Kort fortalt: en liten nyhet nederst", "textarea", ""]] },
      vis: v => '<div class="sm-avis"><div class="sm-avis-hode"><span class="sm-avis-navn">' + esc(v.navn || "Avisen") + '</span><span class="sm-avis-dato">' + esc(v.dato) + '</span></div><h3 class="sm-avis-tittel">' + esc(v.tittel || "Overskrift") + '</h3><p class="sm-avis-ingress">' + esc(v.ingress) + '</p><div class="sm-avis-kropp"><div class="sm-avis-bilde"><span aria-hidden="true">📷</span><small>' + esc(v.bilde) + "</small></div>" + avs(v.tekst) + (v.sitat ? '<blockquote class="sm-avis-sitat">' + esc(v.sitat) + "</blockquote>" : "") + '</div><div class="sm-avis-kort"><strong>Kort fortalt</strong>' + avs(v.kort) + "</div></div>"
    },
    wanted: {
      ikon: "🤠", sprak: ["en"],
      en: { tittel: "Wanted poster", kort: "Make a wanted poster for a villain from a story – with evidence from the text.", intro: "Choose a villain (or a troublemaker) from a story you have read. Make a wanted poster – and back up everything with evidence from the text.",
        tips: ["Dr Grimesby Roylott – «The Speckled Band»", "Nag and Nagaina – «Rikki-Tikki-Tavi»", "Ebenezer Scrooge (before he changes) – «A Christmas Carol»", "The narrator – «The Tell-Tale Heart»", "«Silky» Bob – «After Twenty Years»", "Vera – «The Open Window» (for telling tall tales!)"],
        felt: [["navn", "Name of the villain", "input", "Dr Grimesby Roylott"], ["symbol", "Choose a symbol for the portrait", "symbol"], ["bok", "Story and author", "input", "«The Speckled Band» by Arthur Conan Doyle"], ["utseende", "What does the villain look like?", "textarea", ""], ["forbrytelse", "Wanted for … (what did they do?)", "textarea", ""], ["trekk", "Character traits (with examples)", "textarea", "Violent – he bends a steel poker with his hands."], ["sitat", "Evidence: a quotation from the text", "textarea", ""], ["sist", "Last seen …", "input", ""], ["belonning", "Reward", "input", "100 guineas"]] },
      vis: v => '<div class="sm-wanted"><p class="sm-w-topp">WANTED</p><p class="sm-w-under">for crimes in «' + esc((v.bok || "the story").replace(/[«»]/g, "")) + '»</p><div class="sm-w-portrett" aria-hidden="true">' + esc(v.symbol || "🕵️") + '</div><p class="sm-w-navn">' + esc(v.navn || "Name") + '</p><dl class="sm-w-info"><dt>Wanted for</dt><dd>' + esc(v.forbrytelse) + "</dd><dt>Description</dt><dd>" + esc(v.utseende) + "</dd><dt>Dangerous because</dt><dd>" + esc(v.trekk).replace(/\n/g, "<br>") + "</dd>" + (v.sitat ? "<dt>Evidence</dt><dd><q>" + esc(v.sitat) + "</q></dd>" : "") + "<dt>Last seen</dt><dd>" + esc(v.sist) + '</dd></dl><p class="sm-w-reward">REWARD: ' + esc(v.belonning || "…") + "</p></div>"
    },
    omslag: {
      ikon: "📕", sprak: ["nb", "en"],
      nb: { tittel: "Nytt bokomslag", kort: "Design et nytt omslag og skriv baksideteksten til boka du leser.", intro: "Design et nytt omslag til boka du har lest. Symbolet og fargene skal si noe om handlingen eller stemningen. Skriv også en baksidetekst som får andre til å ville lese boka – uten å avsløre slutten!",
        tips: ["Velg en farge som passer stemningen i boka.", "Velg et symbol som er viktig i handlingen.", "Undertittelen kan være et kort sitat eller en «krok».", "Baksideteksten: hovedperson – problem – et spørsmål leseren vil ha svar på."],
        felt: [["tittel", "Tittel", "input", ""], ["forfatter", "Forfatter", "input", ""], ["symbol", "Symbol på forsiden", "symbol"], ["farge", "Farge", "farge"], ["krok", "Undertittel eller sitat på forsiden", "input", "«Noen hemmeligheter bør aldri graves fram.»"], ["bakside", "Baksidetekst (4–6 setninger)", "textarea", ""], ["anbefalt", "Anbefalt av (deg!) – én setning", "input", "«Jeg klarte ikke å legge den fra meg!»"], ["hvorfor", "Forklar valgene dine: Hvorfor dette symbolet og denne fargen?", "textarea", ""]] },
      en: { tittel: "New book cover", kort: "Design a new cover and write the blurb for the book you are reading.", intro: "Design a new cover for a book you have read. The symbol and colours should say something about the plot or the mood. Write a blurb that makes others want to read the book – without giving away the ending!",
        tips: ["Choose a colour that fits the mood of the book.", "Choose a symbol that is important in the story.", "The tagline can be a short quote or a «hook».", "The blurb: main character – problem – a question the reader wants answered."],
        felt: [["tittel", "Title", "input", ""], ["forfatter", "Author", "input", ""], ["symbol", "Symbol on the cover", "symbol"], ["farge", "Colour", "farge"], ["krok", "Tagline or quote on the cover", "input", "«Some secrets should stay buried.»"], ["bakside", "Blurb (4–6 sentences)", "textarea", ""], ["anbefalt", "Recommended by (you!) – one sentence", "input", "«I couldn’t put it down!»"], ["hvorfor", "Explain your choices: Why this symbol and this colour?", "textarea", ""]] },
      vis: v => { const f = v.farge || "#1f3b57"; return '<div class="sm-omslag"><div class="sm-om-forside" style="--om:' + esc(f) + '"><p class="sm-om-forfatter">' + esc(v.forfatter) + '</p><span class="sm-om-symbol" aria-hidden="true">' + esc(v.symbol || "📖") + '</span><p class="sm-om-tittel">' + esc(v.tittel || "…") + '</p><p class="sm-om-krok">' + esc(v.krok) + '</p></div><div class="sm-om-bakside" style="--om:' + esc(f) + '">' + avs(v.bakside) + (v.anbefalt ? '<p class="sm-om-anbefalt">' + esc(v.anbefalt) + "</p>" : "") + "</div></div>"; }
    },
    trailer: {
      ikon: "🎬", sprak: ["nb", "en"],
      nb: { tittel: "Booktrailer-manus", kort: "Planlegg en 30–60 sekunders booktrailer, scene for scene.", intro: "En booktrailer er som en filmtrailer – bare for en bok. Planlegg seks korte scener. Du kan filme den, lage den som lysbilder eller fremføre den for klassen.",
        tips: ["Start med en krok: et spørsmål, en lyd eller en dramatisk setning.", "Vis hovedpersonen og hvor historien foregår.", "Vis problemet – men ikke løsningen.", "Bygg opp spenning, og slutt med et spørsmål eller en «cliffhanger».", "Avslutt med tittel og forfatter: «Les den – hvis du tør!»"],
        felt: [["bok", "Bok og forfatter", "input", ""], ["s1", "Scene 1 (0–5 sek.) – Kroken: Hva ser og hører vi?", "textarea", ""], ["s2", "Scene 2 (5–15 sek.) – Hovedpersonen og stedet", "textarea", ""], ["s3", "Scene 3 (15–25 sek.) – Problemet", "textarea", ""], ["s4", "Scene 4 (25–35 sek.) – Spenningen øker", "textarea", ""], ["s5", "Scene 5 (35–45 sek.) – Cliffhanger", "textarea", ""], ["s6", "Scene 6 (45–50 sek.) – Tittel, forfatter og en oppfordring", "textarea", ""], ["musikk", "Musikk og lyd (stemning)", "input", "Rolig piano som blir raskere og mørkere"]] },
      en: { tittel: "Book trailer script", kort: "Plan a 30–60 second book trailer, scene by scene.", intro: "A book trailer is like a film trailer – for a book. Plan six short scenes. You can film it, make it as slides or perform it for the class.",
        tips: ["Start with a hook: a question, a sound or a dramatic line.", "Show the main character and the setting.", "Show the problem – but not the solution.", "Build up tension and end with a question or a cliffhanger.", "Finish with the title and author: «Read it – if you dare!»"],
        felt: [["bok", "Book and author", "input", ""], ["s1", "Scene 1 (0–5 sec.) – The hook: What do we see and hear?", "textarea", ""], ["s2", "Scene 2 (5–15 sec.) – Main character and setting", "textarea", ""], ["s3", "Scene 3 (15–25 sec.) – The problem", "textarea", ""], ["s4", "Scene 4 (25–35 sec.) – Rising tension", "textarea", ""], ["s5", "Scene 5 (35–45 sec.) – Cliffhanger", "textarea", ""], ["s6", "Scene 6 (45–50 sec.) – Title, author and a call to action", "textarea", ""], ["musikk", "Music and sound (mood)", "input", "Quiet piano getting faster and darker"]] },
      vis: (v, tx, sp) => '<div class="sm-trailer"><p class="sm-tr-tittel">🎬 ' + esc(v.bok || "…") + '</p><ol class="sm-tr-scener">' + [1, 2, 3, 4, 5, 6].map(i => '<li><span class="sm-tr-tid">' + ["0:00", "0:05", "0:15", "0:25", "0:35", "0:45"][i - 1] + '</span><span class="sm-tr-ramme" aria-hidden="true">🎞️</span><span class="sm-tr-tekst">' + esc(v["s" + i]).replace(/\n/g, "<br>") + "</span></li>").join("") + "</ol>" + (v.musikk ? '<p class="sm-tr-musikk">🎵 ' + esc(v.musikk) + "</p>" : "") + "</div>"
    }
  };
  const SYMBOLER = ["🏞️", "🚢", "🏰", "⚓", "🗽", "🏭", "🔥", "📜", "🕊️", "⚔️", "🌹", "🗝️", "🐍", "🦉", "🌙", "💀", "❤️", "🌊", "🏔️", "🌲", "🕯️", "📖", "🔎", "🐺", "👑", "⏳", "🎭", "🧭"];
  const ORDER = ["postkort", "avis", "wanted", "omslag", "trailer"];

  function oversikt() {
    document.title = "Skrivemaler – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = hode() + '<ul class="fo-liste">' + ORDER.map(id => {
      const m = MALER[id], t = m[m.sprak[0]];
      return '<li><a class="fo-kort sm-kort" href="skrivemal.html?mal=' + id + '" style="--fo-a:var(--lilla)"><span class="fo-kort-topp"><span class="fo-ikon" aria-hidden="true">' + m.ikon + "</span><span>" + m.sprak.map(s => s === "en" ? "🇬🇧" : "🇳🇴").join(" ") + "</span></span><strong" + (m.sprak[0] === "en" ? ' lang="en"' : "") + ">" + esc(t.tittel) + "</strong><span" + (m.sprak[0] === "en" ? ' lang="en"' : "") + ">" + esc(t.kort) + "</span></a></li>";
    }).join("") + "</ul>";
  }
  const hode = (t) => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="skriving.html">Skriving</a> › <a href="skrivemal.html">Skrivemaler</a>' + (t ? " › " + esc(t) : "") + "</nav>" +
    (t ? "" : '<header class="sidehode"><p class="overlinje">Skapende skriving</p><h1>✍️ Skrivemaler</h1><p class="ingress">Skriv som en person i historien, lag en avisforside, en Wanted-plakat, et nytt bokomslag eller et manus til en booktrailer. Forhåndsvisningen viser resultatet mens du skriver – skriv det ut eller last ned svarene.</p></header>');

  function mal(id) {
    const m = MALER[id];
    const sp = m.sprak.includes(LV.param("sprak")) ? LV.param("sprak") : m.sprak[0], tx = m[sp];
    document.title = tx.tittel + " – Les verden";
    const felt = ([f, label, type, ph]) => {
      const fid = "sm-" + id + "-" + f;
      if (type === "symbol") return '<fieldset class="sm-symboler"><legend>' + esc(label) + "</legend>" + SYMBOLER.map((s, i) => '<label><input type="radio" name="' + fid + '" id="' + fid + "-" + i + '" value="' + s + '"' + (i === 0 ? " checked" : "") + '><span aria-hidden="true">' + s + '</span><span class="skjult-visuelt">' + s + "</span></label>").join("") + "</fieldset>";
      if (type === "farge") return '<label class="mu-notat sm-fargefelt" for="' + fid + '"><span>' + esc(label) + '</span><input type="color" id="' + fid + '" value="#1f3b57"></label>';
      return '<label class="mu-notat" for="' + fid + '"><span>' + esc(label) + "</span>" + (type === "textarea" ? '<textarea id="' + fid + '" rows="' + (/tekst|bakside|ingress/.test(f) ? 6 : 3) + '" placeholder="' + esc(ph || "") + '"></textarea>' : '<input type="text" id="' + fid + '" autocomplete="off" placeholder="' + esc(ph || "") + '">') + "</label>";
    };
    $("innhold").innerHTML = hode(tx.tittel) + '<div' + (sp === "en" ? ' lang="en"' : "") + '><header class="sidehode"><p class="overlinje">' + (sp === "en" ? "Writing frame" : "Skrivemal") + '</p><h1><span aria-hidden="true">' + m.ikon + "</span> " + esc(tx.tittel) + '</h1><p class="ingress">' + esc(tx.intro) + "</p>" +
      (m.sprak.length > 1 ? '<div class="kd-filter" role="group" aria-label="Språk"><a class="knapp liten" href="skrivemal.html?mal=' + id + '"' + (sp === "nb" ? ' aria-current="true"' : "") + ' lang="nb">Norsk</a><a class="knapp liten" href="skrivemal.html?mal=' + id + '&sprak=en"' + (sp === "en" ? ' aria-current="true"' : "") + ' lang="en">English</a></div>' : "") + "</header>" +
      '<div class="sm-rad"><form class="sm-skjema" id="sm-skjema" onsubmit="return false"><details class="sm-tips" open><summary>💡 ' + (sp === "en" ? "Ideas" : "Ideer") + "</summary><ul>" + tx.tips.map(t => "<li>" + esc(t) + "</li>").join("") + "</ul></details>" + tx.felt.map(felt).join("") + "</form>" +
      '<section class="sm-vis" aria-label="' + (sp === "en" ? "Preview" : "Forhåndsvisning") + '"><h2 class="sm-vis-t">' + (sp === "en" ? "Preview" : "Forhåndsvisning") + '</h2><div id="sm-vis"></div><p><button type="button" class="knapp hoved" id="sm-skriv">🖨️ ' + (sp === "en" ? "Print" : "Skriv ut") + "</button></p></section></div></div>";

    const verdier = () => {
      const v = {};
      tx.felt.forEach(([f, , type]) => {
        const fid = "sm-" + id + "-" + f;
        if (type === "symbol") { const c = document.querySelector('input[name="' + fid + '"]:checked'); v[f] = c ? c.value : ""; }
        else v[f] = ($(fid) || {}).value || "";
      });
      return v;
    };
    const oppdater = () => { $("sm-vis").innerHTML = m.vis(verdier(), tx, sp); };
    $("sm-skjema").addEventListener("input", oppdater);
    $("sm-skjema").addEventListener("change", oppdater);
    $("sm-skriv").addEventListener("click", () => window.print());
    oppdater();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const id = LV.param("mal");
    if (MALER[id]) mal(id); else oversikt();
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
  });
})();
