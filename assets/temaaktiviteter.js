/* =========================================================
   Les verden – aktivitetene som hører til et tema
   Brukes av «Alt om temaet» (tema.js) og øktplanleggeren
   (planlegger.js). Trenger temaet (LV.tema-objektet) og helst
   data/aktiviteter.js, lesing/film/land-oversiktene.
   Gir { G: {les, ov, tenk, skriv, klasse}, spill: [...] }.
   Hver aktivitet: [gruppe, lenke, ikon, tittel, undertekst, språk].
   ========================================================= */
window.LV = window.LV || {};
LV.temaAktiviteter = function (tema) {
  const LV = window.LV;
  const en = tema.sprak === "en", id = encodeURIComponent(tema.id), harLett = tema.avsnitt.some(a => a.lett);
  const antOrd = Object.keys(tema.ord || {}).length, antPar = antOrd + (tema.personer || []).length + (tema.tidslinje || []).length;
  const enkelt = (k, min, maks) => !/[\s\-.'’]/.test(k) && k.length >= min && k.length <= maks;
  const enkle = Object.keys(tema.ord || {}).filter(k => enkelt(k, 4, 9)).length, enkle3 = Object.keys(tema.ord || {}).filter(k => enkelt(k, 3, 10)).length;
  const navn = (tema.personer || []).filter(p => { const d = p.navn.split(/\s+/), e = d[d.length - 1]; return e.length >= 4 && e.length <= 9 && !/[\-.'’]/.test(e); }).length;
  const spill = [
    ["ordkort", "🗂️", en ? "Flashcards" : "Ordkort", antPar >= 4], ["memory", "🃏", "Memory", antPar >= 4], ["koble", "🔗", en ? "Match up" : "Koble sammen", antPar >= 4],
    ["hangman", "🔤", en ? "Hangman" : "Gjett ordet", antOrd >= 3], ["ordsok", "🔍", en ? "Word search" : "Ordsøk", antOrd >= 3],
    ["ordle", "🟩", "Ordle", enkle + navn >= 2], ["ordmiks", "🔀", en ? "Word mix" : "Ordmiks", enkle3 + navn >= 3],
    ["kryssord", "✏️", en ? "Crossword" : "Kryssord", antOrd + (tema.personer || []).length >= 4],
    ["rekkefolge", "⏳", en ? "Timeline" : "Tidslinje", (tema.tidslinje || []).length >= 4]
  ].filter(x => x[3]);
  // [gruppe, lenke, ikon, tittel, type]
  const G = { les: [], ov: [], tenk: [], skriv: [], klasse: [] };
  (LV.lesetekster || []).filter(t => (t.temaer || []).includes(tema.id)).forEach(t => G.les.push(["les", "lesing.html?id=" + encodeURIComponent(t.id), t.ikon, t.tittel, "Reading Room · " + t.forfatter + " (" + t.ar + ")", "en"]));
  (LV.filmer || []).filter(f => (f.temaer || []).includes(tema.id)).forEach(f => G.les.push(["les", "film.html?id=" + encodeURIComponent(f.id), f.ikon, f.tittel + " (" + f.ar + ")", en ? "Film" : "Film med oppgaver", f.sprak === "en" ? "en" : ""]));
  (LV.landliste || []).filter(l => (l.temaer || []).includes(tema.id)).forEach(l => G.les.push(["les", "land.html?id=" + encodeURIComponent(l.id), l.flagg, l.navn, en ? "Country page" : "Landside", "en"]));
  G.les.push(["les", "lytt.html?tema=" + id + (harLett ? "&lett=1" : ""), "🎧", en ? "Listening session with stops" : "Lytteøkt med stopp", en ? "Listen part by part" : "Lytt del for del"]);
  G.les.push(["les", "leseflyt.html?tema=" + id, "⏱️", en ? "Reading fluency" : "Leseflyt", en ? "Read aloud and record yourself" : "Les høyt og ta opp deg selv"]);
  G.skriv.push(["skriv", "muntlig.html?id=" + id, "🗣️", en ? "Speaking and listening" : "Muntlig og lytting", en ? "Talk cards, listening task, hot seat" : "Samtalekort, lytteøvelse, den varme stolen"]);
  G.skriv.push(["skriv", "kamerat.html?kilde=tema:" + id, "🤝", en ? "Peer feedback" : "Kameratvurdering", en ? "Criteria from the learning goals" : "Kriterier fra læringsmålene"]);
  G.klasse.push(["klasse", "klassequiz.html?kilde=tema:" + id, "📺", en ? "Class quiz" : "Klassequiz", en ? "On the big screen" : "På storskjerm"]);
  G.klasse.push(["klasse", "lesegruppe.html?tema=" + id, "👥", en ? "Reading group with roles" : "Lesegruppe med roller", en ? "Read together in groups" : "Les sammen i grupper"]);
  const harBilde = !!(LV.temaer.find(t => t.id === tema.id) || {}).bilde;
  G.klasse.push(["klasse", "tenkerutiner.html?rutine=" + (harBilde ? "se-tenk-undre" : "tenk-lur-utforsk") + "&tema=" + id + "&vis=storskjerm", "💭", en ? "Thinking routine on the big screen" : "Tenkerutine på storskjerm", harBilde ? (en ? "See – Think – Wonder with the topic image" : "Se – tenk – undre med temabildet") : (en ? "Think – Puzzle – Explore" : "Tenk – lur – utforsk")]);
  G.klasse.push(["klasse", "sporsmal.html?tema=" + id, "❓", en ? "Question studio" : "Spørsmålsstudioet", en ? "Students ask their own questions" : "Elevene lager egne spørsmål"]);
  if ((tema.avsnitt || []).length >= 3) G.klasse.push(["klasse", "ekspertgrupper.html?tema=" + id + "&grupper=" + Math.min(4, tema.avsnitt.length), "🧩", en ? "Expert groups (jigsaw)" : "Ekspertgrupper", en ? "Become an expert and teach the others" : "Bli ekspert og lær bort"]);
  G.klasse.push(["klasse", "exit.html?v=maal&tema=" + id, "🎫", en ? "Exit ticket" : "Exit ticket", en ? "For the whole class" : "For hele klassen"]);
  if ((tema.tidslinje || []).length >= 8) G.ov.push(["ov", "tidslinjeduell.html?tema=" + id, "⚔️", en ? "Timeline duel" : "Tidslinjeduellen", en ? "Place the events on the timeline" : "Legg hendelsene på riktig plass"]);
  if ((tema.personer || []).length >= 4) G.ov.push(["ov", "historiske-kort.html?tema=" + id, "🃏", en ? "Historical cards" : "Historiske kort", en ? "Make a card game with the people" : "Lag et kortspill med personene"]);
  ((LV.aktiviteter || {})[tema.id] || []).forEach(a => (G[a[0]] || G.tenk).push(a));
  return { G: G, spill: spill, en: en, id: id };
};
