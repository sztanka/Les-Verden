/* =========================================================
   Les verden – Skriveverksted: oversikt over skriveguidene
   Hver guide ligger i data/skriving/<id>.js (LV.skriveguide).
   lenke: guiden ligger et annet sted (f.eks. filmsiden).
   par: id-en til samme guide på det andre språket.
   ========================================================= */
window.LV = window.LV || {};
LV.skriveguider = [
  { id: "five-paragraph-essay", sprak: "en", ikon: "🍔", farge: "#c0632b", tittel: "The five-paragraph essay", kort: "Introduction, three body paragraphs and a conclusion – the classic school essay.", fag: ["Engelsk"] },
  { id: "argumentative-essay", sprak: "en", ikon: "⚖️", farge: "#2c4f8f", tittel: "The argumentative essay", kort: "Take a stand, give reasons, meet the counterarguments – and convince your reader.", fag: ["Engelsk"], par: "droftende" },
  { id: "short-story", sprak: "en", ikon: "📖", farge: "#7a3e8f", tittel: "The short story", kort: "Character, setting, conflict, climax – plan and write your own short story.", fag: ["Engelsk"] },
  { id: "literary-analysis", sprak: "en", ikon: "🔍", farge: "#24624a", tittel: "Analysing a short story", kort: "Write about plot, characters, narrator, themes and language – with quotes.", fag: ["Engelsk"] },
  { id: "presentation", sprak: "en", ikon: "🎤", farge: "#a3420e", tittel: "The oral presentation", kort: "Plan, structure and deliver a presentation – with useful phrases and slide tips.", fag: ["Engelsk"], par: "presentasjon" },
  { id: "news-article", sprak: "en", ikon: "📰", farge: "#3b4a5c", tittel: "The news article", kort: "Headline, lead and the 5 Ws – write like a journalist.", fag: ["Engelsk"] },
  { id: "formal-email", sprak: "en", ikon: "✉️", farge: "#5a6b2a", tittel: "The formal letter or email", kort: "Greetings, polite phrases and a clear purpose – for applications and complaints.", fag: ["Engelsk"] },
  { id: "summary", sprak: "en", ikon: "🧾", farge: "#6b4a1f", tittel: "The summary", kort: "Retell the main points of a text – short, clear and in your own words.", fag: ["Engelsk"] },
  { id: "review", sprak: "en", ikon: "🎬", farge: "#8a2d6b", tittel: "The movie review", kort: "Summary without spoilers, analysis and your opinion. (On the film page.)", fag: ["Engelsk"], lenke: "film.html?guide=review", par: "anmeldelse" },
  { id: "fagtekst", sprak: "nb", ikon: "📘", farge: "#2f6f57", tittel: "Fagtekst", kort: "Forklar et tema saklig og ryddig – med innledning, hoveddel, avslutning og kilder.", fag: ["Samfunnsfag"] },
  { id: "droftende", sprak: "nb", ikon: "⚖️", farge: "#2c4f8f", tittel: "Drøftende tekst", kort: "Se en sak fra flere sider, vei argumentene og kom fram til en konklusjon.", fag: ["Samfunnsfag"], par: "argumentative-essay" },
  { id: "presentasjon", sprak: "nb", ikon: "🎤", farge: "#a3420e", tittel: "Muntlig presentasjon", kort: "Planlegg, bygg opp og hold en presentasjon – med fraser og tips til lysbilder.", fag: ["Samfunnsfag", "Muntlig eksamen"], par: "presentation" },
  { id: "kildebruk", sprak: "nb", ikon: "🔗", farge: "#5b4a8a", tittel: "Kildebruk og kildehenvisning", kort: "Finn gode kilder, vurder dem, siter riktig og lag kildeliste.", fag: ["Samfunnsfag", "Engelsk"] },
  { id: "anmeldelse", sprak: "nb", ikon: "📝", farge: "#8a2d6b", tittel: "Filmanmeldelse", kort: "Oppbygging, fraser og eksempel på norsk. (På filmsiden.)", fag: ["Samfunnsfag"], lenke: "film.html?guide=anmeldelse", par: "review" }
];
