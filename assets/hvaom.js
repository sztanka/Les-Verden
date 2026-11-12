/* =========================================================
   Les verden – Hva om …? (hvaom.html)
   hvaom.html          → oversikt
   hvaom.html?id=<id>  → ett scenario i seks steg
   Data: data/hvaom.js. Svarene kan lastes ned (svarfil.js).
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const T = {
    nb: { s1: "Hva skjedde egentlig?", s2: "Velg én årsak å endre", s2t: "Her er noen av de virkelige årsakene. Velg én du vil endre – bare én!", hvaom: "Skriv spørsmålet ditt: «Hva om …?»", s3: "Følgekjeden", s3t: "Tenk steg for steg. Hver følge må henge sammen med den forrige.", f: [["Med en gang", "Dager eller uker etter: Hva skjer først? Hvem reagerer, og hvordan?"], ["Noen år senere", "Hva har forandret seg? Hvem har fått mer eller mindre makt?"], ["I dag", "Hvordan kunne Norge eller verden sett annerledes ut i dag?"]], s4: "Hvor sannsynlig er din versjon?", lite: "Lite sannsynlig", svart: "Svært sannsynlig", hvorfor: "Hvorfor tror du det? Hva kunne gjort at historien likevel gikk omtrent som i virkeligheten?", s5: "Hva sier historikerne?", vis: "Vis hva historikere har tenkt", spek: "Husk: Dette er også spekulasjon – ingen kan vite sikkert.", s6: "Tilbake til virkeligheten", s6t: "Hva har du lært om hvorfor det virkelig skjedde? Hvilken årsak tror du var viktigst – og hvorfor?", advarsel: "<strong>Historikerens advarsel:</strong> Kontrafaktisk historie – «hva om»-historie – er spekulasjon. Vi kan ikke vite hva som ville skjedd. Men spørsmålet hjelper oss å se hvilke årsaker som var viktigst, og at historien ikke var bestemt på forhånd.", les: "Les temaet", andre: "Andre scenarioer" },
    en: { s1: "What really happened?", s2: "Choose one cause to change", s2t: "Here are some of the real causes. Choose one to change – only one!", hvaom: "Write your question: «What if …?»", s3: "The chain of consequences", s3t: "Think step by step. Each consequence must follow from the one before.", f: [["Right away", "Days or weeks later: What happens first? Who reacts, and how?"], ["A few years later", "What has changed? Who has gained or lost power?"], ["Today", "How could the world look different today?"]], s4: "How likely is your version?", lite: "Not likely", svart: "Very likely", hvorfor: "Why do you think so? What could have made history turn out roughly the same anyway?", s5: "What do historians say?", vis: "Show what historians have thought", spek: "Remember: This is speculation too – nobody can know for sure.", s6: "Back to reality", s6t: "What have you learned about why it really happened? Which cause do you think was most important – and why?", advarsel: "<strong>A historian’s warning:</strong> Counterfactual history – «what if» history – is speculation. We cannot know what would have happened. But the question helps us see which causes mattered most, and that history was not decided in advance.", les: "Read the topic", andre: "Other scenarios" }
  };
  const hode = s => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › <a href="hvaom.html">Hva om …?</a>' + (s ? " › " + esc(s.sporsmal) : "") + "</nav>";

  function oversikt() {
    document.title = "Hva om …? – " + (LV.config ? LV.config.navn : "Les verden");
    const liste = LV.hvaom.slice().sort((a, b) => a.trinn - b.trinn);
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje">Historisk tenkning</p><h1>🔀 Hva om …?</h1><p class="ingress">Hva om skuddene i Sarajevo hadde bommet? Hva om Norge hadde sagt ja til EF? Når du endrer én årsak og tenker gjennom følgene, forstår du bedre hvorfor det virkelige skjedde – og at historien ikke var bestemt på forhånd.</p></header>' +
      '<ul class="fo-liste">' + liste.map(s => { const tema = LV.temaer.find(t => t.id === s.tema); return '<li><a class="fo-kort" href="hvaom.html?id=' + s.id + '" style="--fo-a:var(--' + (tema && tema.fag === "engelsk" ? "engelsk" : "samfunnsfag") + ')"' + (s.sprak === "en" ? ' lang="en"' : "") + '><span class="fo-kort-topp"><span class="fo-ikon" aria-hidden="true">' + s.ikon + "</span><span lang=\"nb\">" + esc(tema ? tema.tittel : "") + "</span></span><strong>" + esc(s.sporsmal) + '</strong><span class="fo-trinn" lang="nb">' + (s.sprak === "en" ? "🇬🇧 English · " : "") + s.trinn + ". trinn · " + s.arsaker.length + " årsaker å velge mellom</span></a></li>"; }).join("") + "</ul>" +
      '<p class="mu-intro">' + T.nb.advarsel + ' Til læreren: Fint i grupper, der hver gruppe velger en ulik årsak og presenterer følgekjeden sin. Diskuter til slutt: Hvilke årsaker endret mest? Kombiner gjerne med <a href="arsak.html">Årsak og virkning</a> og <a href="diamant.html">Diamantrangering</a>.</p>';
  }

  function scenario(s) {
    const sp = s.sprak === "en" ? "en" : "nb", tx = T[sp];
    document.title = s.sporsmal + " – Hva om …?";
    const tema = LV.temaer.find(t => t.id === s.tema);
    const steg = (n, t) => '<h2 class="ho-steg"><span class="ho-nr">' + n + "</span> " + t + "</h2>";
    $("innhold").innerHTML = hode(s) +
      '<div' + (sp === "en" ? ' lang="en"' : "") + '><header class="sidehode"><p class="overlinje">' + (sp === "en" ? "What if …?" : "Hva om …?") + (tema ? " · " + esc(tema.tittel) : "") + '</p><h1><span aria-hidden="true">' + s.ikon + "</span> " + esc(s.sporsmal) + "</h1></header>" +
      '<p class="ho-advarsel">' + tx.advarsel + "</p>" +
      '<section class="ho-del">' + steg(1, tx.s1) + '<p class="ho-hendelse">' + esc(s.hendelse) + "</p></section>" +
      '<section class="ho-del">' + steg(2, tx.s2) + "<p>" + tx.s2t + '</p><fieldset class="ho-arsaker"><legend class="skjult-visuelt">' + tx.s2 + "</legend>" + s.arsaker.map((a, i) => '<label class="ho-arsak"><input type="radio" name="ho-arsak" id="ho-a-' + i + '" value="' + i + '"><span><strong>' + esc(a[0]) + "</strong>" + esc(a[1]) + "</span></label>").join("") + "</fieldset>" +
      '<p class="ho-endrer" id="ho-endrer" aria-live="polite"></p><label for="ho-sporsmal">' + tx.hvaom + '</label><input type="text" id="ho-sporsmal"></section>' +
      '<section class="ho-del">' + steg(3, tx.s3) + "<p>" + tx.s3t + '</p><ol class="ho-kjede">' + tx.f.map((f, i) => '<li><label for="ho-f-' + i + '"><strong>' + f[0] + "</strong> " + f[1] + '</label><textarea id="ho-f-' + i + '" rows="3"></textarea></li>').join("") + "</ol></section>" +
      '<section class="ho-del">' + steg(4, tx.s4) + '<div class="ho-skala"><span>' + tx.lite + '</span><input type="range" id="ho-sanns" min="1" max="5" value="3" aria-label="' + tx.s4 + '"><span>' + tx.svart + '</span></div><label for="ho-hvorfor">' + tx.hvorfor + '</label><textarea id="ho-hvorfor" rows="3"></textarea></section>' +
      '<section class="ho-del">' + steg(5, tx.s5) + '<button type="button" class="knapp" id="ho-vis">' + tx.vis + '</button><div id="ho-spor" hidden><ul>' + s.spor.map(x => "<li>" + esc(x) + "</li>").join("") + '</ul><p class="fo-merk">' + tx.spek + "</p></div></section>" +
      '<section class="ho-del">' + steg(6, tx.s6) + '<label for="ho-laert">' + tx.s6t + '</label><textarea id="ho-laert" rows="4"></textarea>' +
      "<p>" + (tema ? '<a class="knapp" href="tema.html?id=' + encodeURIComponent(tema.id) + '">' + tx.les + " «" + esc(tema.tittel) + "» →</a> " : "") + '<a class="knapp" href="hvaom.html">' + tx.andre + "</a></p></section></div>";
    document.querySelectorAll('input[name="ho-arsak"]').forEach(r => r.addEventListener("change", () => {
      const a = s.arsaker[+r.value][0]; const f = $("ho-sporsmal");
      $("ho-endrer").textContent = (sp === "en" ? "You are changing: " : "Du endrer: ") + a;
      if (!f.value.trim()) f.value = sp === "en" ? "What if " : "Hva om ";
      f.focus(); f.setSelectionRange(f.value.length, f.value.length);
    }));
    $("ho-vis").addEventListener("click", () => { $("ho-spor").hidden = false; $("ho-vis").hidden = true; });
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const s = LV.hvaom.find(x => x.id === LV.param("id"));
    if (s) scenario(s); else oversikt();
  });
})();
