/* =========================================================
   Les verden – Rewrite and improve (skrivom.html)
   Bearbeide egen tekst etter tilbakemelding (e15):
   1) Hva betyr kodene læreren har brukt? 2) Før og etter.
   3) Revidere innhold (ARMS) og rette språk (CUPS).
   4) Min egen sjekkliste. Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/~~(.+?)~~/g, "<s>$1</s>").replace(/\*(.+?)\*/g, "<em>$1</em>");
  const KODER = [
    { k: "Sp", n: "Spelling", nb: "Stavefeil", hva: "A word is spelled wrong.", gjor: "Look the word up in a dictionary or use spell check. Write the word correctly three times.", eks: ["~~becuase~~ → because", "~~beutiful~~ → beautiful"], se: "homophones" },
    { k: "Vb", n: "Verb form", nb: "Feil verbform", hva: "The verb does not agree with the subject, or the form is wrong.", gjor: "Find the subject. Is it he, she, it or one thing? Then the verb needs -s. Check irregular verbs.", eks: ["~~she play~~ → she plays", "~~people is~~ → people are", "~~he goed~~ → he went"], se: "agreement" },
    { k: "T", n: "Tense", nb: "Feil tid", hva: "You have used the wrong tense, or changed tense in the middle of the story.", gjor: "Decide: past or present? Stay in the same tense. Past time (yesterday, last year) = past simple.", eks: ["~~I have been in London last year~~ → I went to London last year"], se: "verbs" },
    { k: "WO", n: "Word order", nb: "Ordstilling", hva: "The words are in the wrong order – often because of Norwegian word order.", gjor: "Subject before verb – always. Put adverbs like always/never before the main verb.", eks: ["~~Yesterday went I to town~~ → Yesterday I went to town", "~~I like very much football~~ → I like football very much"], se: "word-order" },
    { k: "WW", n: "Wrong word", nb: "Feil ord", hva: "The word does not mean what you think, or is not used like this in English.", gjor: "Look the word up. Is it a false friend? Read example sentences in the dictionary.", eks: ["~~eventually~~ (eventuelt) → possibly", "~~learn me~~ → teach me"], se: "norwegian-errors" },
    { k: "Art", n: "Article", nb: "Artikkel", hva: "a/an/the is missing, wrong or not needed.", gjor: "Use a/an the first time you mention something, the when we know which one. Professions: She is a doctor.", eks: ["~~She is doctor~~ → She is a doctor", "~~an university~~ → a university"], se: "articles" },
    { k: "^", n: "Missing word", nb: "Ord mangler", hva: "A word is missing.", gjor: "Read the sentence aloud, slowly. Where do you stumble?", eks: ["~~I looking forward to it~~ → I am looking forward to it"] },
    { k: "P", n: "Punctuation", nb: "Tegnsetting", hva: "A full stop, comma, apostrophe or question mark is missing or wrong.", gjor: "Two full sentences need a full stop or a linking word, not just a comma. No comma before that.", eks: ["~~It was late, we went home~~ → It was late, so we went home.", "~~I think, that~~ → I think that"], se: "run-ons" },
    { k: "C", n: "Capital letter", nb: "Stor/liten forbokstav", hva: "A word needs a capital letter – or should not have one.", gjor: "Capital letters for I, days, months, languages and nationalities.", eks: ["~~on monday i spoke english~~ → On Monday I spoke English"], se: "punctuation" },
    { k: "¶", n: "New paragraph", nb: "Nytt avsnitt", hva: "Start a new paragraph here – the text moves on to a new idea.", gjor: "One main idea per paragraph. Start each paragraph with a topic sentence.", eks: ["Paragraph 1: the problem · Paragraph 2: one cause · Paragraph 3: another cause"] },
    { k: "?", n: "Unclear", nb: "Uklart", hva: "The reader does not understand what you mean.", gjor: "Ask yourself: What did I want to say? Say it aloud to a friend, then write it down in simpler words.", eks: [] },
    { k: "Inf", n: "Too informal", nb: "For uformelt", hva: "The language is too informal for this kind of text.", gjor: "Avoid slang, contractions and words like gonna, stuff, kinda in formal texts.", eks: ["~~gonna~~ → going to", "~~a lot of stuff~~ → many things"] }
  ];
  const ARMS = [["A", "Add", "Legg til", "Can you add an example, a detail, a fact or a quote?"], ["R", "Remove", "Fjern", "Is anything repeated, off-topic or unnecessary?"], ["M", "Move", "Flytt", "Is the order logical? Would a sentence or paragraph work better somewhere else?"], ["S", "Substitute", "Bytt ut", "Can you replace a weak word (good, nice, thing) with a more precise one?"]];
  const CUPS = [["C", "Capitals", "Stor forbokstav", "I, names, days, months, languages, start of sentences."], ["U", "Usage", "Grammatikk", "Verb forms, -s, tense, word order, small words."], ["P", "Punctuation", "Tegnsetting", "Full stops, commas, apostrophes, question marks."], ["S", "Spelling", "Rettskriving", "Check words you are unsure of. Watch out for homophones."]];

  function side() {
    document.title = "Rewrite and improve – " + (LV.config ? LV.config.navn : "Les verden");
    const rader = n => Array.from({ length: n }, (_, i) => '<li class="so-rad"><label class="lg-felt" for="so-for' + i + '"><span>Before</span><textarea id="so-for' + i + '" rows="2"></textarea></label><span class="so-pil" aria-hidden="true">→</span><label class="lg-felt" for="so-etter' + i + '"><span>After</span><textarea id="so-etter' + i + '" rows="2"></textarea></label><label class="lg-felt so-kode" for="so-k' + i + '"><span>Code</span><select id="so-k' + i + '"><option value=""></option>' + KODER.map(k => '<option value="' + esc(k.k) + '">' + esc(k.k + " – " + k.n) + "</option>").join("") + "</select></label></li>").join("");
    $("innhold").innerHTML = '<div lang="en"><nav class="brodsmuler" aria-label="Brødsmuler" lang="nb"><a href="index.html">Forside</a> › <a href="skriving.html">Skriveverksted</a> › Rewrite and improve</nav>' +
      '<header class="sidehode"><p class="overlinje">Writing</p><h1>🔁 Rewrite and improve</h1><p class="ingress">Good writers rewrite. When you get your text back with feedback, the real learning starts: you understand your mistakes, fix them – and make a plan so that you don’t make them again.</p><p class="ingress" lang="nb">Fikk du teksten tilbake med kommentarer eller koder? Her finner du ut hva kodene betyr, retter feilene, forbedrer innholdet og lager din egen sjekkliste.</p></header>' +
      '<nav class="dsp-innhold" aria-label="On this page"><ol><li><a href="#so-1">What do the codes mean?</a></li><li><a href="#so-2">Before and after</a></li><li><a href="#so-3">Revise and edit</a></li><li><a href="#so-4">My checklist</a></li></ol></nav>' +
      '<section class="le-del" id="so-1" aria-labelledby="so-1h"><h2 id="so-1h">1. What do the codes mean?</h2><p class="mu-intro">Tick the codes your teacher has used in your text. <span lang="nb">(Læreren kan bruke andre koder – spør hvis du er usikker.)</span></p>' +
      '<ul class="so-koder">' + KODER.map((k, i) => '<li class="so-kodekort"><label class="so-velg" for="so-v' + i + '"><input type="checkbox" id="so-v' + i + '" data-i="' + i + '"><span class="so-merke">' + esc(k.k) + "</span><strong>" + esc(k.n) + '</strong> <span lang="nb" class="so-nb">' + esc(k.nb) + '</span></label><details><summary>What it means and what to do</summary>' +
        '<p><strong>What it means:</strong> ' + esc(k.hva) + "</p><p><strong>What to do:</strong> " + esc(k.gjor) + "</p>" + (k.eks.length ? '<ul class="so-eks">' + k.eks.map(e => "<li>" + fmt(e) + "</li>").join("") + "</ul>" : "") + (k.se ? '<p><a href="grammatikk.html?id=' + k.se + '">Practise this in Grammar →</a></p>' : "") + "</details></li>").join("") + "</ul></section>" +
      '<section class="le-del" id="so-2" aria-labelledby="so-2h"><h2 id="so-2h">2. Before and after</h2><p class="mu-intro">Copy sentences with mistakes from your text, and write the corrected version. Choose the code for each one.</p><ol class="so-rader">' + rader(6) + "</ol></section>" +
      '<section class="le-del" id="so-3" aria-labelledby="so-3h"><h2 id="so-3h">3. Revise and edit</h2><div class="so-to"><div><h3>Revise the content – ARMS</h3><p class="so-under" lang="nb">Gjør teksten bedre</p><ul class="so-sjekk">' + ARMS.map(([b, n, nb, t], i) => '<li><label for="so-a' + i + '"><input type="checkbox" id="so-a' + i + '"> <span class="so-bokstav">' + b + "</span> <span><strong>" + n + '</strong> <span lang="nb" class="so-nb">(' + nb + ")</span> – " + esc(t) + "</span></label></li>").join("") + "</ul></div>" +
      '<div><h3>Edit the language – CUPS</h3><p class="so-under" lang="nb">Rett språket</p><ul class="so-sjekk">' + CUPS.map(([b, n, nb, t], i) => '<li><label for="so-c' + i + '"><input type="checkbox" id="so-c' + i + '"> <span class="so-bokstav">' + b + "</span> <span><strong>" + n + '</strong> <span lang="nb" class="so-nb">(' + nb + ")</span> – " + esc(t) + "</span></label></li>").join("") + "</ul></div></div>" +
      '<label class="mu-notat" for="so-forbedring"><span>Rewrite one paragraph from your text and make it better. Use ARMS.</span><textarea id="so-forbedring" rows="6"></textarea></label>' +
      '<label class="mu-notat" for="so-endret"><span>What did you change, and why is it better now?</span><textarea id="so-endret" rows="3"></textarea></label></section>' +
      '<section class="le-del" id="so-4" aria-labelledby="so-4h"><h2 id="so-4h">4. My checklist</h2><p class="mu-intro">Based on the codes you ticked, here is your personal checklist for the next text. Print it or download it, and use it every time you write.</p><div id="so-liste" aria-live="polite"></div>' +
      '<label class="mu-notat" for="so-maal"><span>My most important goal for the next text:</span><textarea id="so-maal" rows="2"></textarea></label><p><button type="button" class="knapp" id="so-skriv">🖨️ Print my checklist</button></p></section>' +
      '<p class="fo-merk" lang="nb">Til læreren: Siden støtter kompetansemålet om å «bearbeide egne tekster ut fra tilbakemeldinger og kunnskap om språk». Kodene er vanlige rettekoder; bruk gjerne de samme kodene når du retter, eller fortell elevene hvilke koder du bruker. ARMS og CUPS er kjente huskeregler for å revidere innhold og rette språk. Elevene kan laste ned arbeidet sitt og levere det sammen med den nye versjonen av teksten.</p></div>';

    const liste = () => {
      const valgt = KODER.filter((_, i) => $("so-v" + i).checked);
      $("so-liste").innerHTML = valgt.length ? '<ol class="so-min">' + valgt.map(k => '<li><span class="so-merke">' + esc(k.k) + "</span> <strong>" + esc(k.n) + ":</strong> " + esc(k.gjor) + "</li>").join("") + '<li><span class="so-merke">✓</span> <strong>Read aloud:</strong> Read the whole text aloud, slowly, before you hand it in.</li></ol>' : '<p class="so-tom">Tick the codes in part 1 to build your checklist.</p>';
    };
    KODER.forEach((_, i) => $("so-v" + i).addEventListener("change", liste));
    $("so-skriv").addEventListener("click", () => { document.body.classList.add("so-skriv-liste"); window.print(); setTimeout(() => document.body.classList.remove("so-skriv-liste"), 500); });
    liste();
  }

  document.addEventListener("DOMContentLoaded", () => {
    side();
    const l = document.createElement("div"); l.className = "svarlinje"; l.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>'; document.body.appendChild(l);
  });
})();
