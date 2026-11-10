/* =========================================================
   Les verden – Ta opp deg selv (opptak.html)
   Ta opp høytlesing, en presentasjon eller uttale, lytt og vurder
   deg selv med en sjekkliste. Opptaket lagres ikke.
   opptak.html?for=lesing|presentasjon|uttale|samtale
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const FORMAL = {
    lesing: { ikon: "📖", navn: "Høytlesing", intro: "Les et avsnitt fra et tema eller en tekst høyt. Ta opp, lytt, og les det igjen. Hør du forskjell?", tips: ["Velg et kort avsnitt – 100–150 ord holder.", "Les det stille én gang først.", "Ta opp to ganger og sammenlign."], sjekk: ["Jeg tok pause ved punktum og komma.", "Tempoet var passe – ikke for fort.", "Jeg la trykk på de viktige ordene.", "Stemmen var tydelig og lett å høre.", "Stemmen passet til innholdet i teksten."], lenke: ["leseflyt.html", "Øv mer med Leseflyt"] },
    presentasjon: { ikon: "🎤", navn: "Muntlig presentasjon", intro: "Øv på en presentasjon eller et innlegg. Ta opp hele, eller bare innledningen. Mange blir overrasket når de hører seg selv – det er helt vanlig.", tips: ["Snakk ut fra stikkord, ikke les opp et manus.", "Si tydelig hva du skal snakke om i starten.", "Avslutt med en kort oppsummering."], sjekk: ["Innledningen fortalte hva presentasjonen handler om.", "Jeg snakket ut fra stikkord, ikke opplesning.", "Jeg brukte fagbegreper og forklarte dem.", "Det var en tydelig rekkefølge (først, deretter, til slutt).", "Jeg holdt tiden.", "Jeg hadde en tydelig avslutning."], lenke: ["muntlig.html", "Se Muntlig og lytting"] },
    uttale: { ikon: "👄", navn: "Engelsk uttale", intro: "Read a short English text aloud. Listen for the sounds Norwegians often find difficult: th, w and v, and the z sound at the end of words.", tips: ["Hør på uttale-siden først.", "Ta opp de samme setningene flere ganger.", "Overdriv gjerne lydene når du øver."], sjekk: ["th: think, this (ikke «tink», «dis»).", "w og v: very well (ikke «wery vell»).", "Endelser: dogs, was (z-lyd, ikke s).", "Ordtrykk: PHOtograph – phoTOgraphy.", "Jeg snakket i et naturlig tempo."], lenke: ["uttale.html", "Practise on the Pronunciation page"], en: true },
    samtale: { ikon: "💬", navn: "Samtale og eksamensøving", intro: "Ta opp en samtale med en makker om et tema, for eksempel som øving til muntlig eksamen. Spør hverandre «hvorfor?» og bygg videre på det den andre sier.", tips: ["Avtal temaet på forhånd.", "Bruk samtalekortene på Muntlig og lytting.", "Spør begge før dere tar opp."], sjekk: ["Vi lyttet til hverandre og bygde videre.", "Vi begrunnet meningene våre.", "Vi brukte eksempler fra fagstoffet.", "Begge snakket omtrent like mye.", "Vi var uenige på en god måte."], lenke: ["muntlig.html", "Samtalekort på Muntlig og lytting"] }
  };

  function side() {
    const f = FORMAL[LV.param("for")] ? LV.param("for") : "lesing", F = FORMAL[f];
    document.title = "Ta opp deg selv – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="muntlig.html">Muntlig</a> › Ta opp deg selv</nav>' +
      '<header class="sidehode"><p class="overlinje">Muntlige ferdigheter</p><h1>🎙️ Ta opp deg selv</h1><p class="ingress">Når du hører deg selv utenfra, oppdager du ting du ikke merker mens du snakker: tempo, pauser, uttale og hvor tydelig du er. Ta opp, lytt – og prøv igjen.</p></header>' +
      '<div class="lp-viktig"><p><strong>Personvern:</strong> Opptaket blir bare i nettleseren din og forsvinner når du lukker siden. Det sendes ingen steder. Last det ned hvis du vil ta vare på det eller levere det til læreren. Ta bare opp andre hvis de har sagt ja.</p></div>' +
      '<fieldset class="ot-formal"><legend>Hva vil du øve på?</legend>' + Object.entries(FORMAL).map(([k, x]) => '<label><input type="radio" name="ot-for" value="' + k + '"' + (k === f ? " checked" : "") + '> <span aria-hidden="true">' + x.ikon + "</span> " + esc(x.navn) + "</label>").join("") + "</fieldset>" +
      '<section class="le-del" aria-labelledby="ot-1h"' + (F.en ? ' lang="en"' : "") + '><h2 id="ot-1h">' + F.ikon + " " + esc(F.navn) + '</h2><p class="mu-intro">' + esc(F.intro) + '</p><ul class="ot-tips" lang="nb">' + F.tips.map(t => "<li>" + esc(t) + "</li>").join("") + "</ul></section>" +
      '<section class="le-del" aria-labelledby="ot-2h"><h2 id="ot-2h">1. Ta opp</h2><div id="ot-opptaker"></div></section>' +
      '<section class="le-del" aria-labelledby="ot-3h"><h2 id="ot-3h">2. Lytt og vurder deg selv</h2><p class="mu-intro">Hør opptaket minst to ganger. Kryss av for det som stemte.</p><fieldset class="ot-sjekk"><legend class="skjult-visuelt">Sjekkliste</legend>' + F.sjekk.map((s, i) => '<label><input type="checkbox" id="ot-' + f + "-s" + i + '"> ' + esc(s) + "</label>").join("") + "</fieldset>" +
      '<label class="mu-notat" for="ot-' + f + '-bra"><span>⭐ Dette var bra:</span><textarea id="ot-' + f + '-bra" rows="2"></textarea></label>' +
      '<label class="mu-notat" for="ot-' + f + '-bedre"><span>🎯 Dette vil jeg gjøre bedre neste gang:</span><textarea id="ot-' + f + '-bedre" rows="2"></textarea></label></section>' +
      '<section class="le-del" aria-labelledby="ot-4h"><h2 id="ot-4h">3. Prøv igjen</h2><p class="mu-intro">Ta opp på nytt med det du vil gjøre bedre i tankene. Hører du forskjell? <a href="' + F.lenke[0] + '">' + esc(F.lenke[1]) + " →</a></p>" +
      '<label class="mu-notat" for="ot-' + f + '-forskjell"><span>Hva ble annerledes i det nye opptaket?</span><textarea id="ot-' + f + '-forskjell" rows="2"></textarea></label></section>' +
      '<p class="fo-merk">Til læreren: Elevene kan laste ned opptaket og levere det i skolens læringsplattform, for eksempel som øving til muntlig eksamen eller som en del av leseflyt-arbeid. Siden laster ikke opp noe. På nettbrett og mobil må eleven gi nettleseren lov til å bruke mikrofonen. Opptaksknappen finnes også i <a href="leseflyt.html">Leseflyt</a>.</p>';
    LV.opptaker($("ot-opptaker"), { id: "ot-opp", filnavn: "opptak-" + f });
    document.querySelectorAll('input[name="ot-for"]').forEach(r => r.addEventListener("change", () => { location.search = "?for=" + r.value; }));
  }

  document.addEventListener("DOMContentLoaded", () => {
    side();
    const l = document.createElement("div"); l.className = "svarlinje"; l.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>'; document.body.appendChild(l);
  });
})();
