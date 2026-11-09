/* Les verden – Ordverksted (ordverksted.html)
   Hvordan ord er bygd opp: forstavelser, endelser og ordstammer.
   deler: [del, type, betydning, eksempler]  type: "for" | "etter" | "stamme"
   del: ord og riktig oppdeling (skilletegn |), feil: andre oppdelinger
   bygg: [betydning, [forstavelse, stamme, endelse], ord]  ("" = ingen)
   gjett: [ord, riktig betydning, feil1, feil2, forklaring] */
window.LV = window.LV || {};
window.LV.ordverksted = {
  nb: {
    deler: [
      ["u-", "for", "ikke, det motsatte", ["urettferdig", "ulikhet", "uavhengig"]],
      ["mis-", "for", "galt, feil, dårlig", ["misforståelse", "mistillit", "misbruk"]],
      ["gjen-", "for", "igjen, på nytt", ["gjenoppbygging", "gjenvinning", "gjenvalg"]],
      ["sam-", "for", "sammen", ["samarbeid", "samfunn", "samtale"]],
      ["mot-", "for", "imot, det motsatte", ["motstand", "motsetning", "motargument"]],
      ["inn- / ut-", "for", "inn i / ut av", ["innvandring", "utvandring", "utslipp"]],
      ["selv-", "for", "seg selv, egen", ["selvstendighet", "selvbestemmelse", "selvstyre"]],
      ["over- / under-", "for", "for mye, høyere / for lite, lavere", ["overbefolkning", "undertrykkelse", "overmakt"]],
      ["anti-", "for", "mot", ["antisemittisme", "antirasisme", "antibiotika"]],
      ["post-", "for", "etter", ["postkolonial", "postmoderne", "postindustriell"]],
      ["-het", "etter", "lager et substantiv av et adjektiv", ["frihet", "likhet", "sikkerhet"]],
      ["-ing / -else", "etter", "handlingen eller prosessen", ["fornorsking", "urbanisering", "bevegelse"]],
      ["-isme", "etter", "en lære, et system eller en holdning", ["nasjonalisme", "kolonialisme", "rasisme"]],
      ["-sjon", "etter", "handling eller resultat (fra latin)", ["revolusjon", "migrasjon", "produksjon"]],
      ["-skap", "etter", "tilstand eller fellesskap", ["vennskap", "statsborgerskap", "lederskap"]],
      ["-dom", "etter", "tilstand", ["fattigdom", "rikdom", "ungdom"]],
      ["-ist", "etter", "en person som er tilhenger av eller arbeider med", ["nasjonalist", "terrorist", "journalist"]],
      ["demo-", "stamme", "folk (gresk)", ["demokrati", "demografi", "demagog"]],
      ["-krati", "stamme", "styre, makt (gresk)", ["demokrati", "byråkrati", "aristokrati"]],
      ["geo-", "stamme", "jord (gresk)", ["geografi", "geologi", "geopolitikk"]],
      ["-grafi", "stamme", "skrive, beskrive (gresk)", ["geografi", "biografi", "fotografi"]],
      ["-logi", "stamme", "lære, kunnskap om (gresk)", ["ideologi", "økologi", "biologi"]],
      ["mono- / poly-", "stamme", "én / mange (gresk)", ["monopol", "monarki", "polyteisme"]],
      ["migr-", "stamme", "flytte (latin)", ["migrasjon", "emigrant", "immigrant"]]
    ],
    del: [
      ["u|lik|het", ["ul|ik|het", "uli|khet"]],
      ["selv|stendig|het", ["sel|vsten|dighet", "selvsten|dig|het"]],
      ["mis|forstå|else", ["mi|sfor|ståelse", "misfor|stå|else"]],
      ["gjen|opp|bygg|ing", ["gje|nopp|bygging", "gjenopp|byg|ging"]],
      ["nasjonal|isme", ["nasjon|alis|me", "nasj|onalisme"]],
      ["sam|arbeid", ["sa|marbeid", "samar|beid"]],
      ["mot|stand", ["mo|tstand", "motst|and"]],
      ["fattig|dom", ["fatt|igdom", "fattigd|om"]],
      ["demo|krati", ["dem|okrati", "demok|rati"]],
      ["inn|vandr|ing", ["in|nvandring", "innvan|dring"]]
    ],
    bygg: [
      ["det å ikke være lik", ["u-", "lik", "-het"], "ulikhet"],
      ["det å bestemme over seg selv", ["selv-", "bestemme", "-else"], "selvbestemmelse"],
      ["det å bygge opp igjen", ["gjen-", "oppbygge", "-ing"], "gjenoppbygging"],
      ["det å arbeide sammen", ["sam-", "arbeid", ""], "samarbeid"],
      ["det å ikke stole på noen", ["mis-", "tillit", ""], "mistillit"],
      ["det å flytte ut av et land", ["ut-", "vandre", "-ing"], "utvandring"],
      ["det å være fattig", ["", "fattig", "-dom"], "fattigdom"],
      ["en som er tilhenger av nasjonalisme", ["", "nasjonal", "-ist"], "nasjonalist"]
    ],
    gjett: [
      ["postkolonial", "som har med tiden etter kolonitiden å gjøre", "som er for kolonier", "som har med postvesenet i koloniene å gjøre", "post- betyr «etter». Postkolonial handler om tiden etter at koloniene ble selvstendige."],
      ["antidemokratisk", "som er mot demokrati", "som er svært demokratisk", "som handler om gamle demokratier", "anti- betyr «mot», demo- betyr «folk» og -krati betyr «styre»."],
      ["undervurdere", "å tro at noe er mindre eller svakere enn det er", "å vurdere noe på nytt", "å vurdere noe grundig", "under- betyr «for lite». Å undervurdere er å vurdere noe for lavt."],
      ["urbefolkning", "de første som bodde et sted", "folk som bor i byer", "en befolkning som ikke vokser", "ur- betyr «opprinnelig, eldst», som i urfolk og urskog."],
      ["mikroplast", "svært små plastbiter", "plast som brukes i mikrobølgeovner", "plast laget av planter", "mikro- betyr «svært liten» (gresk)."],
      ["selvforsynt", "som klarer seg med det man lager selv", "som selger til andre", "som er syk av for mye mat", "selv- betyr «seg selv», og forsynt betyr at man har det man trenger."]
    ]
  },
  en: {
    deler: [
      ["un-", "for", "not, the opposite", ["unfair", "unequal", "unemployment"]],
      ["in- / im- / il- / ir-", "for", "not", ["independent", "impossible", "illegal", "irresponsible"]],
      ["dis-", "for", "not, the opposite", ["disagree", "dishonest", "disappear"]],
      ["re-", "for", "again, back", ["rebuild", "recycle", "reform"]],
      ["mis-", "for", "wrongly, badly", ["misunderstand", "misinformation", "mistrust"]],
      ["pre- / post-", "for", "before / after", ["prehistoric", "postwar", "postcolonial"]],
      ["inter-", "for", "between", ["international", "interview", "interact"]],
      ["over- / under-", "for", "too much / too little, below", ["overpopulation", "underestimate", "underpaid"]],
      ["-tion / -sion", "etter", "turns a verb into a noun (the action)", ["revolution", "migration", "decision"]],
      ["-ment", "etter", "turns a verb into a noun (the result)", ["government", "movement", "agreement"]],
      ["-ness", "etter", "turns an adjective into a noun", ["happiness", "darkness", "awareness"]],
      ["-ful / -less", "etter", "full of / without", ["peaceful", "powerful", "homeless"]],
      ["-able / -ible", "etter", "can be done", ["readable", "sustainable", "visible"]],
      ["-ism / -ist", "etter", "a belief or system / a person who believes in it", ["racism", "nationalist", "activist"]],
      ["-ity", "etter", "a quality or state", ["equality", "security", "diversity"]],
      ["-ise / -ize", "etter", "to make, to become", ["modernise", "colonise", "realise"]],
      ["demo- / -cracy", "stamme", "people / rule (Greek)", ["democracy", "demography", "bureaucracy"]],
      ["port", "stamme", "carry (Latin)", ["transport", "import", "export"]],
      ["scrib / script", "stamme", "write (Latin)", ["describe", "manuscript", "subscribe"]],
      ["dict", "stamme", "say (Latin)", ["dictator", "predict", "contradict"]],
      ["vis / vid", "stamme", "see (Latin)", ["vision", "evidence", "visible"]],
      ["tele", "stamme", "far (Greek)", ["telephone", "television", "telescope"]]
    ],
    del: [
      ["un|employ|ment", ["une|mploy|ment", "unemp|loyment"]],
      ["in|depend|ence", ["ind|epend|ence", "indep|ende|nce"]],
      ["mis|inform|ation", ["mi|sinform|ation", "misin|for|mation"]],
      ["re|build", ["reb|uild", "rebu|ild"]],
      ["peace|ful", ["pea|ceful", "peacef|ul"]],
      ["inter|nation|al", ["int|ernation|al", "intern|ation|al"]],
      ["equal|ity", ["equ|ality", "eq|uality"]],
      ["pre|dict", ["pr|edict", "pred|ict"]],
      ["home|less", ["hom|eless", "homel|ess"]],
      ["over|population", ["ove|rpopulation", "overpop|ulation"]]
    ],
    bygg: [
      ["not fair", ["un-", "fair", ""], "unfair"],
      ["to build again", ["re-", "build", ""], "rebuild"],
      ["the state of being equal", ["", "equal", "-ity"], "equality"],
      ["without a home", ["", "home", "-less"], "homeless"],
      ["full of power", ["", "power", "-ful"], "powerful"],
      ["the act of moving to another place", ["", "migrate", "-tion"], "migration"],
      ["to understand wrongly", ["mis-", "understand", ""], "misunderstand"],
      ["between nations", ["inter-", "nation", "-al"], "international"]
    ],
    gjett: [
      ["transatlantic", "across the Atlantic Ocean", "under the Atlantic Ocean", "against the Atlantic countries", "trans- means «across», as in transport."],
      ["unbreakable", "impossible to break", "easy to break", "broken many times", "un- means «not», and -able means «can be done»."],
      ["autobiography", "a book about your own life, written by yourself", "a book about cars", "a book about someone else's life", "auto = self, bio = life, graphy = writing (all Greek)."],
      ["predetermined", "decided in advance", "decided again", "never decided", "pre- means «before»."],
      ["antisocial", "not wanting to be with other people, or harmful to others", "very social", "part of social media", "anti- means «against»."],
      ["multicultural", "with many cultures", "with no culture", "with one main culture", "multi- means «many»."]
    ]
  }
};
