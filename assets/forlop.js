/* =========================================================
   Les verden – Øktplanleggeren (planlegger.html, standardvisning)
   Læreren velger tema, antall økter, øktlengde, et kompetansemål å
   legge vekt på og vurderingsform. Planleggeren foreslår et forløp
   økt for økt (start – hoveddel – avslutning) med aktiviteter fra hele
   siden som passer til temaet. Hver aktivitet kan byttes.
   Alt ligger i adressen, så planen kan bokmerkes og deles:
   planlegger.html?tema=<id>&n=4&min=60&fokus=s2&vurd=skriftlig
     &o=ILFA  (type økt: I L F O U A)  &v=1.2.3,2.0.1 (bytter: økt.plass.valg)
   &elev=forlop[&okt=2] → elevvisning av hele forløpet eller én økt.
   Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const K = () => LV.kompetansemal;

  // ---------- Øktypene ----------
  // plasser: [kategori, navn, andel av hoveddelen]
  const TYPER = {
    I: { navn: "Inngang og nysgjerrighet", ikon: "🚪", hva: "Vekk nysgjerrigheten, finn ut hva elevene kan fra før, og start lesingen.", plasser: [["start", "Start"], ["les", "Hoveddel: les"], ["forsta", "Hoveddel: forstå"], ["slutt", "Avslutning"]] },
    L: { navn: "Lese og forstå", ikon: "📖", hva: "Les videre i temaet og jobb med begreper og forståelse.", plasser: [["repeter", "Start"], ["les", "Hoveddel: les"], ["forsta", "Hoveddel: forstå"], ["slutt", "Avslutning"]] },
    F: { navn: "Fordypning og tenking", ikon: "🧠", hva: "Bruk kunnskapen: kilder, perspektiver, årsaker, rollespill og diskusjon.", plasser: [["start", "Start"], ["tenk", "Hoveddel"], ["tenk2", "Hoveddel: fortsett"], ["slutt", "Avslutning"]] },
    O: { navn: "Øve og repetere", ikon: "🎮", hva: "Hent fram det elevene har lært, og øv på begreper, personer og hendelser.", plasser: [["repeter", "Start"], ["forsta", "Hoveddel"], ["ov", "Hoveddel: spill og øv"], ["slutt", "Avslutning"]] },
    U: { navn: "Skrive og snakke", ikon: "✍️", hva: "Elevene uttrykker det de har lært, muntlig eller skriftlig.", plasser: [["start", "Start"], ["uttrykk", "Hoveddel"], ["respons", "Hoveddel: respons"], ["slutt", "Avslutning"]] },
    A: { navn: "Avslutning og vurdering", ikon: "🎯", hva: "Oppsummer, vis hva dere kan, og se tilbake på læringsmålene.", plasser: [["repeter", "Start"], ["vurdering", "Hoveddel"], ["respons", "Hoveddel: se tilbake"], ["sluttmal", "Avslutning"]] }
  };
  const FORLOP = { 2: "IA", 3: "IFA", 4: "ILFA", 5: "ILFUA", 6: "ILFOUA", 7: "ILLFOUA", 8: "ILLFFOUA" };
  const VURD = { skriftlig: "Skriftlig tekst", muntlig: "Muntlig presentasjon eller samtale", quiz: "Quiz og oppgaver", ingen: "Ingen formell vurdering" };

  // ---------- Aktivitetene til temaet ----------
  // { navn, ikon, url, tekst, kat: [...], klasse (lærerstyrt), elevUrl, en, mal }
  function lagPool(tema) {
    const A = LV.temaAktiviteter(tema), en = A.en, id = A.id, tid = encodeURIComponent(tema.id);
    const temaMal = K().kobling[tema.id] || [];
    const sideMal = url => { const f = url.split(/[?#]/)[0].replace(/\.html$/, ""); return (K().kobling["side:" + f] || []).concat(K().kobling["side:" + f.replace("laere-engelsk", "laere")] || []); };
    const P = [];
    const legg = (o) => { if (o.en === undefined) o.en = en; o.mal = o.mal || sideMal(o.url).concat(/^tema\.html/.test(o.url) ? temaMal : []); P.push(o); };
    const T = s => en ? s[1] : s[0];
    // Start
    const rutine = A.G.klasse.find(a => /tenkerutiner/.test(a[1]));
    if (rutine) legg({ navn: rutine[3], ikon: rutine[2], url: rutine[1], tekst: rutine[4], kat: ["start"], klasse: true, min: 10 });
    legg({ navn: T(["Startspørsmålet", "The starting question"]), ikon: "💬", url: "tema.html?id=" + tid + "#for-du-leser", tekst: tema.startsporsmal || "", kat: ["start"], min: 5 });
    legg({ navn: T(["Fire hjørner", "Four corners"]), ikon: "🧭", url: "hjorner.html" + (en ? "?sprak=en" : ""), tekst: T(["Ta stilling til en påstand og begrunn", "Take a stand and explain why"]), kat: ["start"], klasse: true, min: 10 });
    legg({ navn: T(["Spørsmålsstudioet", "Question studio"]), ikon: "❓", url: "sporsmal.html?tema=" + tid, tekst: T(["Elevene lager egne spørsmål til temaet", "Students ask their own questions"]), kat: ["start", "tenk2"], min: 20, stor: true });
    A.G.les.concat(A.G.ov).filter(a => /modus=hverdag/.test(a[1])).forEach(a => legg({ navn: a[3], ikon: a[2], url: a[1], tekst: a[4], kat: ["start", "repeter"], min: 10, en: false }));
    // Repetere
    const quiz = A.G.klasse.find(a => /klassequiz/.test(a[1]));
    if (quiz) legg({ navn: quiz[3], ikon: quiz[2], url: quiz[1], tekst: T(["Hva husker vi fra sist?", "What do we remember?"]), kat: ["repeter", "vurdering", "ov"], klasse: true, min: 10 });
    A.spill.forEach(s => legg({ navn: s[2], ikon: s[1], url: "spill.html?spill=" + s[0] + "&tema=" + tid, tekst: T(["Øv på begreper, personer og hendelser", "Practise terms, people and events"]), kat: ["repeter", "ov"], min: 10 }));
    // Lese
    legg({ navn: T(["Les selv – med lesestrategi", "Read on your own – with a reading strategy"]), ikon: "📖", url: "tema.html?id=" + tid, tekst: T(["Les avsnittene og svar på «Stopp og tenk». Bruk en strategi fra Lesestrategier.", "Read the sections and answer the «Stop and think» questions."]), kat: ["les"], min: 20, les: true });
    const lg = A.G.klasse.find(a => /lesegruppe/.test(a[1]));
    if (lg) legg({ navn: lg[3], ikon: lg[2], url: lg[1], tekst: lg[4], kat: ["les"], min: 25, les: true });
    const eg = A.G.klasse.find(a => /ekspertgrupper/.test(a[1]));
    if (eg) legg({ navn: eg[3], ikon: eg[2], url: eg[1], tekst: eg[4], kat: ["les"], min: 40, les: true, stor: true });
    A.G.les.filter(a => /lytt\.html|leseflyt\.html/.test(a[1])).forEach(a => legg({ navn: a[3], ikon: a[2], url: a[1], tekst: a[4], kat: ["les"], min: 20, les: true }));
    // Forstå
    legg({ navn: T(["Oppgaver: finn og forstå", "Tasks: find and understand"]), ikon: "📝", url: "tema.html?id=" + tid + "#oppgaver", tekst: T(["Nivå 1 og 2 i oppgavene til temaet", "Level 1 and 2 tasks"]), kat: ["forsta"], min: 20 });
    if ((tema.tidslinje || []).length) legg({ navn: T(["Tidslinja i temaet", "The timeline"]), ikon: "📅", url: "tema.html?id=" + tid + "#tidslinje", tekst: T(["Gå gjennom hendelsene og forklar sammenhengene", "Go through the events"]), kat: ["forsta"], min: 15 });
    legg({ navn: T(["Begrepene i temaet", "Key terms"]), ikon: "🔤", url: "tema.html?id=" + tid + "#begreper-tittel", tekst: T(["Forklar begrepene for en makker – med egne ord", "Explain the terms to a partner"]), kat: ["forsta"], min: 10 });
    A.G.ov.filter(a => !/modus=hverdag/.test(a[1])).forEach(a => legg({ navn: a[3], ikon: a[2], url: a[1], tekst: a[4], kat: ["ov", "forsta"], min: 20, en: /tidslinjeduell|historiske-kort/.test(a[1]) ? en : a[5] === "en" }));
    // Tenke
    legg({ navn: T(["Oppgaver: diskuter", "Tasks: discuss"]), ikon: "🗣️", url: "tema.html?id=" + tid + "#oppgaver", tekst: T(["Nivå 3 – diskuter i par eller grupper", "Level 3 – discuss in pairs or groups"]), kat: ["tenk", "tenk2"], min: 20 });
    A.G.tenk.forEach(a => legg({ navn: a[3], ikon: a[2], url: a[1], tekst: a[4], kat: ["tenk", "tenk2"], min: 30, en: a[5] === "en" }));
    A.G.les.filter(a => !/lytt\.html|leseflyt\.html|modus=hverdag/.test(a[1])).forEach(a => legg({ navn: a[3], ikon: a[2], url: a[1], tekst: a[4], kat: ["tenk2", "tenk"], min: 30, en: a[5] === "en" }));
    if (tema.fag === "samfunnsfag") legg({ navn: "Debattduell", ikon: "⚖️", url: "debatt.html", tekst: "Argumenter for og mot", kat: ["tenk2", "uttrykk"], min: 30, en: false });
    // Uttrykke
    const guider = (LV.skriveguider || []).filter(g => !g.lenke && (en ? g.sprak === "en" : g.sprak !== "en"));
    guider.forEach(g => legg({ navn: (en ? "Writing: " : "Skriv: ") + g.tittel, ikon: g.ikon, url: "skriving.html?id=" + encodeURIComponent(g.id), tekst: g.kort, kat: ["uttrykk", "vurdering-skriftlig"], min: 40, en: g.sprak === "en" }));
    A.G.skriv.forEach(a => legg({ navn: a[3], ikon: a[2], url: a[1], tekst: a[4], kat: /kamerat/.test(a[1]) ? ["respons"] : /muntlig/.test(a[1]) ? ["uttrykk", "vurdering-muntlig"] : ["uttrykk"], min: /kamerat/.test(a[1]) ? 15 : 30 }));
    legg({ navn: T(["Ta opp deg selv", "Record yourself"]), ikon: "🎙️", url: "opptak.html", tekst: T(["Øv på presentasjonen og vurder deg selv", "Practise and assess yourself"]), kat: ["uttrykk", "respons", "vurdering-muntlig"], min: 20 });
    legg({ navn: T(["Skrivemaler", "Writing templates"]), ikon: "📮", url: "skrivemal.html", tekst: T(["Postkort fra fortiden, avisforside, plakat", "Postcard, front page, poster"]), kat: ["uttrykk"], min: 30 });
    legg({ navn: T(["Tegneseriemaker", "Comic maker"]), ikon: "💬", url: "tegneserie.html", tekst: T(["Fortell en hendelse som tegneserie", "Tell an event as a comic"]), kat: ["uttrykk"], min: 30 });
    // Vurdering og respons
    if (quiz) legg({ navn: T(["Klassequiz som oppsummering", "Class quiz as a summary"]), ikon: "📺", url: quiz[1], tekst: T(["Hele temaet på storskjerm", "The whole topic on the big screen"]), kat: ["vurdering-quiz"], klasse: true, min: 15 });
    legg({ navn: T(["Oppgaver på alle nivåer", "Tasks at all levels"]), ikon: "📝", url: "tema.html?id=" + tid + "#oppgaver", tekst: T(["Elevene velger nivå og svarer skriftlig", "Students choose a level and answer in writing"]), kat: ["vurdering-quiz", "vurdering"], min: 30 });
    legg({ navn: T(["Egenvurdering mot læringsmålene", "Self-assessment"]), ikon: "🎯", url: "tema.html?id=" + tid + "#egenvurdering", tekst: T(["Hva kan jeg nå – og hva må jeg øve mer på?", "What can I do now?"]), kat: ["respons", "sluttmal"], min: 10 });
    legg({ navn: T(["Lettlest sammendrag", "Easy summary"]), ikon: "🧾", url: "tema.html?id=" + tid + "#sammendrag", tekst: T(["Sammenlign med det dere har lært", "Compare with what you have learnt"]), kat: ["respons"], min: 10 });
    // Avslutning
    [["321", ["3–2–1", "3–2–1"], ["3 ting jeg lærte, 2 jeg vil vite mer om, 1 spørsmål", "3 things I learnt, 2 I want to know more about, 1 question"]], ["uklart", ["Klart og uklart", "Clear and unclear"], ["Hva var klart, og hva er fortsatt uklart?", "What was clear, and what is still unclear?"]], ["trodde", ["Jeg trodde – nå tenker jeg", "I used to think – now I think"], ["Hvordan har tankene dine endret seg?", "How has your thinking changed?"]], ["ettord", ["Ett ord og en skala", "One word and a scale"], ["Beskriv dagens tema med ett ord", "Describe today’s topic in one word"]], ["maal", ["Læringsmål-sjekk", "Learning goal check"], ["Hvor godt kan jeg læringsmålene?", "How well do I know the learning goals?"]]]
      .map(([v, n, t]) => [v, T(n), T(t)]).forEach(([v, n, t]) => legg({ navn: "Exit ticket: " + n, ikon: "🎫", url: "exit.html?v=" + v + "&tema=" + tid, elevUrl: "exit.html?v=" + v + "&tema=" + tid + "&elev=1", tekst: t, kat: v === "maal" ? ["slutt", "sluttmal"] : ["slutt"], min: 5 }));
    return P;
  }

  // ---------- Lag forløpet ----------
  function lagForlop(tema, P, o) {
    const min = o.min, fokus = o.fokus;
    const brukt = new Set();
    const reading = [...o.typer].map((t, i) => (t === "I" || t === "L") ? i : -1).filter(i => i >= 0);
    const n = tema.avsnitt.length, delAv = reading.length || 1;
    const avsnittFor = i => { const k = reading.indexOf(i); if (k < 0) return []; const fra = Math.floor(k * n / delAv), til = Math.floor((k + 1) * n / delAv); return tema.avsnitt.slice(fra, til).map((a, j) => fra + j); };
    const maal = tema.maal || [];
    return [...o.typer].map((t, i) => {
      const T = TYPER[t];
      let plasser = T.plasser.slice();
      if (min <= 45) plasser = [plasser[0], plasser[1], plasser[plasser.length - 1]];
      const hoved = min - 15, nHoved = plasser.length - 2;
      const ov = plasser.map((p, s) => {
        let kat = p[0];
        if (kat === "vurdering") kat = o.vurd === "ingen" ? "uttrykk" : "vurdering-" + o.vurd;
        let alt = P.filter(x => x.kat.includes(kat));
        if (!alt.length) alt = P.filter(x => x.kat.includes(kat.replace(/-.*$/, "")));
        if (fokus) alt = alt.filter(x => x.mal.includes(fokus)).concat(alt.filter(x => !x.mal.includes(fokus)));
        const valgt = o.bytt[i + "." + s];
        let idx = valgt != null && valgt < alt.length ? valgt : alt.findIndex(x => !brukt.has(x.url + x.navn));
        if (idx < 0) idx = 0;
        // Les-plassen i inngangen: varier metoden mellom leseøktene
        if (valgt == null && kat === "les") { const k = reading.indexOf(i); const lesAlt = alt.map((x, j) => j); idx = lesAlt[k % lesAlt.length] || 0; }
        const a = alt[idx];
        if (a) brukt.add(a.url + a.navn);
        const tid = s === 0 ? (min >= 90 ? 15 : 10) : s === plasser.length - 1 ? 5 : Math.round(hoved / nHoved / 5) * 5;
        return { plass: p[1], kat: kat, alt: alt, idx: idx, a: a, tid: tid };
      });
      return { type: t, navn: T.navn, ikon: T.ikon, hva: T.hva, plasser: ov, avsnitt: avsnittFor(i), maal: maal.length ? maal[i % maal.length] : "" };
    });
  }

  // ---------- Tilstand ----------
  function lesValg() {
    const p = new URLSearchParams(location.search);
    const n = Math.max(2, Math.min(8, +p.get("n") || 4));
    let typer = (p.get("o") || "").toUpperCase().replace(/[^ILFOUA]/g, "");
    if (typer.length !== n) typer = FORLOP[n];
    const bytt = {};
    (p.get("v") || "").split(",").forEach(x => { const m = x.match(/^(\d+)\.(\d+)\.(\d+)$/); if (m) bytt[m[1] + "." + m[2]] = +m[3]; });
    return { tema: p.get("tema") || "", n: n, min: [45, 60, 90].includes(+p.get("min")) ? +p.get("min") : 60, fokus: p.get("fokus") || "", vurd: VURD[p.get("vurd")] ? p.get("vurd") : "skriftlig", typer: typer, bytt: bytt, elev: p.get("elev") === "forlop", okt: p.get("okt") };
  }
  function adresse(o, ekstra) {
    const p = new URLSearchParams();
    if (o.tema) p.set("tema", o.tema);
    p.set("n", o.n); p.set("min", o.min); if (o.fokus) p.set("fokus", o.fokus); p.set("vurd", o.vurd);
    if (o.typer !== FORLOP[o.n]) p.set("o", o.typer);
    const v = Object.keys(o.bytt).map(k => k + "." + o.bytt[k]); if (v.length) p.set("v", v.join(","));
    Object.keys(ekstra || {}).forEach(k => p.set(k, ekstra[k]));
    return "planlegger.html?" + p.toString();
  }

  const temaValg = valgt => '<select id="fl-tema"><option value="">Velg et tema …</option>' +
    [["samfunnsfag", "Samfunnsfag"], ["engelsk", "Engelsk"]].map(([f, n]) => '<optgroup label="' + n + '">' + LV.temaer.filter(t => t.fag === f).sort((a, b) => a.trinn - b.trinn || a.tittel.localeCompare(b.tittel, "nb")).map(t => '<option value="' + t.id + '"' + (t.id === valgt ? " selected" : "") + ">" + t.trinn + ". – " + esc(t.tittel) + "</option>").join("") + "</optgroup>").join("") + "</select>";

  // ---------- Lærervisningen ----------
  LV.forlop = async function (rot, faner) {
    const o = lesValg();
    document.title = "Øktplanlegger – " + (LV.config ? LV.config.navn : "Les verden");
    let tema = null;
    if (o.tema && LV.temaer.find(t => t.id === o.tema)) { try { await LV.lastSkript("data/temaer/" + encodeURIComponent(o.tema) + ".js"); tema = LV.tema; } catch (e) { tema = null; } }
    const malIder = tema ? (K().kobling[tema.id] || []) : [];
    const alleMal = ["samfunnsfag", "engelsk"].map(f => K()[f].mal.map(m => m.id)).flat();
    const malValg = '<option value="">Ingen bestemt</option>' + (malIder.length ? '<optgroup label="Temaets kompetansemål">' + malIder.map(id => { const m = LV.kmFinn(id); return m ? '<option value="' + id + '"' + (o.fokus === id ? " selected" : "") + ">" + esc(m.kort) + "</option>" : ""; }).join("") + "</optgroup>" : "") +
      '<optgroup label="Andre kompetansemål">' + alleMal.filter(id => !malIder.includes(id)).map(id => { const m = LV.kmFinn(id); return m ? '<option value="' + id + '"' + (o.fokus === id ? " selected" : "") + ">" + esc(m.plan.navn.replace(/^Læreplan i /, "")) + ": " + esc(m.kort) + "</option>" : ""; }).join("") + "</optgroup>";
    let h = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="laerer.html">For lærere</a> › Planlegger</nav>' +
      '<header class="sidehode"><p class="overlinje">For lærere</p><h1>Planlegger</h1><p class="ingress">Velg et tema, så får du forslag til et helt undervisningsforløp – økt for økt, med aktiviteter fra hele Les verden. Bytt det du vil, og del planen eller elevlenken.</p></header>' + faner +
      '<form class="fl-valg" id="fl-valg"><label class="fl-bred">Tema' + temaValg(o.tema) + "</label>" +
      '<label>Antall økter<select id="fl-n">' + [2, 3, 4, 5, 6, 7, 8].map(x => "<option" + (x === o.n ? " selected" : "") + ">" + x + "</option>").join("") + "</select></label>" +
      '<label>Øktlengde<select id="fl-min">' + [45, 60, 90].map(x => '<option value="' + x + '"' + (x === o.min ? " selected" : "") + ">" + x + " min</option>").join("") + "</select></label>" +
      '<label>Vurdering til slutt<select id="fl-vurd">' + Object.keys(VURD).map(k => '<option value="' + k + '"' + (k === o.vurd ? " selected" : "") + ">" + VURD[k] + "</option>").join("") + "</select></label>" +
      '<label class="fl-bred">Kompetansemål å legge vekt på<select id="fl-fokus">' + malValg + "</select></label></form>";
    if (!tema) {
      rot.innerHTML = h + '<div class="fl-tom"><p>👆 Velg et tema for å få et forslag til forløp.</p><p>Planleggeren foreslår en rekkefølge fra <strong>inngang</strong> via <strong>lesing</strong> og <strong>fordypning</strong> til <strong>skriving, muntlig og vurdering</strong>. Hver økt har en start, en hoveddel og en avslutning, og alle aktivitetene kan byttes med andre som passer til temaet.</p></div>';
      kobleValg(o); return;
    }
    const P = lagPool(tema);
    const F = lagForlop(tema, P, o);
    const en = tema.sprak === "en";
    const lenkeTil = url => url;
    h += '<section class="fl-oversikt" aria-label="Forløpet"><h2>' + esc(tema.tittel) + ": " + o.n + " økter à " + o.min + ' minutter</h2>' +
      '<ol class="fl-tidslinje">' + F.map((k, i) => '<li><a href="#okt-' + (i + 1) + '"><span aria-hidden="true">' + k.ikon + "</span> Økt " + (i + 1) + "<small>" + esc(k.navn) + "</small></a></li>").join("") + "</ol>" +
      '<p class="fl-knapper"><button type="button" class="knapp hoved" id="fl-elev">🔗 Kopier elevlenke</button> <button type="button" class="knapp" id="fl-lenke">📌 Kopier lenke til planen</button> <button type="button" class="knapp" id="fl-tekst">📋 Kopier som tekst</button> <button type="button" class="knapp" id="fl-skriv">🖨️ Skriv ut</button> <a class="knapp" href="tema.html?id=' + encodeURIComponent(tema.id) + '" target="_blank" rel="noopener">📚 Åpne temaet</a></p><p class="pl-status" id="fl-status" role="status" aria-live="polite"></p></section>';
    h += F.map((k, i) => '<article class="fl-okt fl-' + k.type + '" id="okt-' + (i + 1) + '"><header class="fl-okt-hode"><h2><span aria-hidden="true">' + k.ikon + "</span> Økt " + (i + 1) + ": " + esc(k.navn) + "</h2>" +
      '<label class="fl-type">Type økt<select data-type="' + i + '">' + Object.keys(TYPER).map(t => '<option value="' + t + '"' + (t === k.type ? " selected" : "") + ">" + TYPER[t].navn + "</option>").join("") + "</select></label></header>" +
      '<p class="fl-hva">' + esc(k.hva) + "</p>" +
      (k.maal ? '<p class="fl-maal"><strong>Læringsmål:</strong> <span' + (en ? ' lang="en"' : "") + ">" + esc(k.maal) + "</span></p>" : "") +
      (k.avsnitt.length ? '<p class="fl-les"><strong>Les:</strong> ' + k.avsnitt.map(j => '<a href="tema.html?id=' + encodeURIComponent(tema.id) + "#avsnitt-" + j + '" target="_blank" rel="noopener"' + (en ? ' lang="en"' : "") + ">" + esc(tema.avsnitt[j].tittel) + "</a>").join(" · ") + "</p>" : "") +
      '<ol class="fl-plasser">' + k.plasser.map((p, s) => {
        const a = p.a;
        if (!a) return "";
        return '<li class="fl-plass"><div class="fl-tid"><strong>' + p.tid + ' min</strong><small>' + esc(p.plass) + '</small></div><div class="fl-akt"><a href="' + lenkeTil(a.url) + '" target="_blank" rel="noopener"><span aria-hidden="true">' + a.ikon + "</span> <strong" + (a.en ? ' lang="en"' : "") + ">" + esc(a.navn) + "</strong></a>" +
          (a.tekst ? "<small" + (a.en ? ' lang="en"' : "") + ">" + esc(a.tekst) + "</small>" : "") +
          '<span class="fl-merker">' + (a.klasse ? '<span class="fl-merke">👩‍🏫 Lærerstyrt</span>' : "") + (a.stor ? '<span class="fl-merke">⏱️ Tar ca. ' + a.min + " min</span>" : "") + (o.fokus && a.mal.includes(o.fokus) ? '<span class="fl-merke fl-fokus">🎯 Fokusmålet</span>' : "") + "</span></div>" +
          (p.alt.length > 1 ? '<label class="fl-bytt"><span class="fl-bytt-tekst" aria-hidden="true">⇄ Bytt aktivitet</span><span class="skjult-visuelt">Bytt aktivitet i økt ' + (i + 1) + ", " + esc(p.plass) + '</span><select data-bytt="' + i + "." + s + '">' + p.alt.map((x, j) => '<option value="' + j + '"' + (j === p.idx ? " selected" : "") + ">" + esc(x.ikon + " " + x.navn) + "</option>").join("") + "</select></label>" : "") + "</li>";
      }).join("") + "</ol>" +
      '<p class="fl-okt-knapper"><button type="button" class="knapp liten" data-elevokt="' + (i + 1) + '">🔗 Elevlenke for økt ' + (i + 1) + "</button></p></article>").join("");
    const malListe = (K().kobling[tema.id] || []).map(LV.kmFinn).filter(Boolean);
    if (malListe.length) h += '<details class="fl-km"><summary>🎯 Kompetansemål for temaet</summary><ul>' + malListe.map(m => "<li><strong>" + esc(m.kort) + ":</strong> Eleven skal kunne " + esc(m.tekst) + ".</li>").join("") + "</ul></details>";
    h += '<p class="fo-merk">Forslagene er laget automatisk fra innholdet på Les verden. Tidene er omtrentlige – juster etter klassen. Alt ligger i adressen, så lenken til planen husker valgene dine. Elevlenken viser elevene hva de skal gjøre, uten lærerdetaljene.</p>';
    rot.innerHTML = h;
    kobleValg(o);

    rot.querySelectorAll("[data-bytt]").forEach(sel => sel.addEventListener("change", () => { o.bytt[sel.dataset.bytt] = +sel.value; gaa(o, "#okt-" + (+sel.dataset.bytt.split(".")[0] + 1)); }));
    rot.querySelectorAll("[data-type]").forEach(sel => sel.addEventListener("change", () => {
      const i = +sel.dataset.type; o.typer = o.typer.slice(0, i) + sel.value + o.typer.slice(i + 1);
      Object.keys(o.bytt).filter(k => k.split(".")[0] === String(i)).forEach(k => delete o.bytt[k]);
      gaa(o, "#okt-" + (i + 1));
    }));
    const status = t => { $("fl-status").textContent = t; };
    const abs = rel => location.href.split("?")[0].replace(/planlegger\.html.*$/, "") + rel;
    const kopier = (tekst, melding) => { const reserve = () => { const x = document.createElement("textarea"); x.value = tekst; document.body.appendChild(x); x.select(); try { document.execCommand("copy"); status(melding); } catch (e) { status("Kunne ikke kopiere."); } x.remove(); }; if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(tekst).then(() => status(melding), reserve); else reserve(); };
    $("fl-elev").addEventListener("click", () => kopier(abs(adresse(o, { elev: "forlop" })), "Elevlenken er kopiert."));
    rot.querySelectorAll("[data-elevokt]").forEach(b => b.addEventListener("click", () => kopier(abs(adresse(o, { elev: "forlop", okt: b.dataset.elevokt })), "Elevlenken for økt " + b.dataset.elevokt + " er kopiert.")));
    $("fl-lenke").addEventListener("click", () => kopier(location.href, "Lenken til planen er kopiert."));
    $("fl-skriv").addEventListener("click", () => window.print());
    $("fl-tekst").addEventListener("click", () => {
      const t = tema.tittel + " – " + o.n + " økter à " + o.min + " min\n\n" + F.map((k, i) => "ØKT " + (i + 1) + ": " + k.navn + (k.maal ? "\nLæringsmål: " + k.maal : "") + (k.avsnitt.length ? "\nLes: " + k.avsnitt.map(j => tema.avsnitt[j].tittel).join(", ") : "") + "\n" +
        k.plasser.filter(p => p.a).map(p => "  " + p.tid + " min – " + p.plass + ": " + p.a.navn + "\n    " + abs(p.a.url)).join("\n")).join("\n\n");
      kopier(t, "Planen er kopiert som tekst.");
    });
    if (location.hash) { const m = document.querySelector(location.hash); if (m) m.scrollIntoView(); }
  };

  function gaa(o, hash) { location.href = adresse(o) + (hash || ""); }
  function kobleValg(o) {
    const ny = () => { o.tema = $("fl-tema").value; o.n = +$("fl-n").value; o.min = +$("fl-min").value; o.vurd = $("fl-vurd").value; o.fokus = $("fl-fokus").value; o.typer = FORLOP[o.n]; o.bytt = {}; gaa(o); };
    ["fl-tema", "fl-n", "fl-min", "fl-vurd", "fl-fokus"].forEach(id => $(id).addEventListener("change", ny));
    $("fl-valg").addEventListener("submit", e => e.preventDefault());
  }

  // ---------- Elevvisningen ----------
  LV.forlopElev = async function (rot) {
    const o = lesValg();
    if (!o.tema || !LV.temaer.find(t => t.id === o.tema)) { rot.innerHTML = '<p class="melding">Fant ikke planen.</p>'; return; }
    await LV.lastSkript("data/temaer/" + encodeURIComponent(o.tema) + ".js");
    const tema = LV.tema, en = tema.sprak === "en";
    const F = lagForlop(tema, lagPool(tema), o);
    const vis = o.okt && F[+o.okt - 1] ? [+o.okt - 1] : F.map((k, i) => i);
    document.title = (vis.length === 1 ? "Økt " + (vis[0] + 1) + ": " : "") + tema.tittel + " – " + (LV.config ? LV.config.navn : "Les verden");
    document.body.classList.add("pl-elevside");
    rot.innerHTML = '<header class="sidehode"><p class="overlinje">' + (en ? "Work plan" : "Arbeidsplan") + '</p><h1' + (en ? ' lang="en"' : "") + ">" + esc(tema.tittel) + (vis.length === 1 ? " – " + (en ? "lesson " : "økt ") + (vis[0] + 1) : "") + "</h1></header>" +
      vis.map(i => { const k = F[i]; return '<section class="fl-elevokt"><h2>' + k.ikon + " " + (en ? "Lesson " : "Økt ") + (i + 1) + "</h2>" + (k.maal ? '<p class="fl-maal"' + (en ? ' lang="en"' : "") + "><strong>" + (en ? "Goal: " : "Mål: ") + "</strong>" + esc(k.maal) + "</p>" : "") +
        (k.avsnitt.length ? '<p class="fl-les"><strong>' + (en ? "Read: " : "Les: ") + "</strong>" + k.avsnitt.map(j => '<a href="tema.html?id=' + encodeURIComponent(tema.id) + "#avsnitt-" + j + '"' + (en ? ' lang="en"' : "") + ">" + esc(tema.avsnitt[j].tittel) + "</a>").join(" · ") + "</p>" : "") +
        '<ol class="pl-elevliste">' + k.plasser.filter(p => p.a).map(p => { const a = p.a; const url = a.elevUrl || a.url; return a.klasse && !a.elevUrl ? '<li><div class="pl-elevkort fl-klasse"><span class="pl-ikon" aria-hidden="true">' + a.ikon + "</span><span><strong>" + esc(a.navn) + "</strong><small>" + (en ? "Together with the class" : "Sammen med klassen") + "</small></span></div></li>" :
          '<li><a class="pl-elevkort" href="' + url + '"><span class="pl-ikon" aria-hidden="true">' + a.ikon + "</span><span><strong" + (a.en ? ' lang="en"' : "") + ">" + esc(a.navn) + "</strong>" + (a.tekst ? "<small" + (a.en ? ' lang="en"' : "") + ">" + esc(a.tekst) + "</small>" : "") + "</span></a></li>"; }).join("") + "</ol></section>"; }).join("") +
      '<p class="fo-merk">' + (en ? "Your answers are not saved on the site. Use «Download answers» or copy them to a document." : "Svarene dine lagres ikke på siden. Bruk «Last ned svarene» eller kopier dem til et dokument.") + "</p>";
  };
})();
