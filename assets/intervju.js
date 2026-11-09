/* =========================================================
   Les verden – Historisk intervju (intervju.html)
   Velg spørsmål og «intervju» en historisk person. Hvert svar
   er merket med om det bygger på fakta eller inneholder tolkning,
   og hva det bygger på. Data: data/intervju.js
   intervju.html → oversikt · intervju.html?id=<person>
   Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const hode = t => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › <a href="intervju.html">Historisk intervju</a>' + (t ? " › " + esc(t) : "") + "</nav>";
  const initialer = n => n.split(/\s+/).map(x => x[0]).join("").slice(0, 2);
  const TX = {
    nb: { du: "Du", sted: "Intervjuet finner sted:", velg: "Velg et spørsmål", alle: "Du har stilt alle spørsmålene.", fakta: "Bygger på fakta", tolk: "Inneholder tolkning", bygger: "Bygger på:", etter: "Hva skjedde videre?", oppg: "Etter intervjuet", nullstill: "↻ Start intervjuet på nytt", les: "🔊 Les svaret", t: [["Hvilket svar overrasket deg mest? Hvorfor?"], ["Noen svar er merket «inneholder tolkning». Hva er forskjellen på dem og svarene som bygger på fakta?"], ["Skriv to spørsmål du ville stilt selv. Hvor kunne du funnet svaret?"], ["Faktasjekk: Velg ett av faktasvarene og sjekk det i et leksikon, for eksempel Store norske leksikon. Stemte det? Skriv hva du fant."]] },
    en: { du: "You", sted: "The interview takes place:", velg: "Choose a question", alle: "You have asked all the questions.", fakta: "Based on facts", tolk: "Contains interpretation", bygger: "Based on:", etter: "What happened next?", oppg: "After the interview", nullstill: "↻ Start the interview again", les: "🔊 Read the answer", t: [["Which answer surprised you most? Why?"], ["Some answers are marked «contains interpretation». What is the difference between them and the answers based on facts?"], ["Write two questions you would like to ask. Where could you find the answer?"], ["Fact check: Choose one of the fact-based answers and check it in an encyclopedia, for example Britannica or Store norske leksikon. Was it correct? Write what you found."]] }
  };

  function oversikt() {
    document.title = "Historisk intervju – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje">Gjenskapt intervju</p><h1>🎙️ Historisk intervju</h1><p class="ingress">Hva ville du spurt Fridtjof Nansen, Gina Krog eller Frederick Douglass om? Velg spørsmål og les svarene. Men pass på: Svarene er skrevet av oss ut fra det historikerne vet. Hvert svar er merket med hva det bygger på – og om det er fakta eller tolkning.</p></header>' +
      '<ul class="fo-liste">' + LV.intervju.map(p => '<li><a class="fo-kort" href="intervju.html?id=' + p.id + '" style="--fo-a:var(--' + (p.sp === "en" ? "engelsk" : "samfunnsfag") + ')"><span class="fo-kort-topp"><span class="fo-ikon" aria-hidden="true">' + p.ikon + "</span><span>" + esc(p.levde) + "</span></span><strong>" + esc(p.navn) + "</strong><span" + (p.sp === "en" ? ' lang="en"' : "") + ">" + esc(p.om) + '</span><span class="fo-trinn">' + p.q.length + " spørsmål · på " + (p.sp === "en" ? "engelsk" : "norsk") + "</span></a></li>").join("") + "</ul>" +
      '<div class="ka-metode"><h2>Lag ditt eget intervju</h2><ol><li>Velg en person fra et tema du har lest.</li><li>Skriv 5–6 gode spørsmål – ikke bare ja/nei-spørsmål.</li><li>Finn svarene i temaet, i leksikon eller i kilder.</li><li>Skriv svarene som om personen svarer. Merk hva som er fakta, og hva du har tolket.</li><li>Framfør intervjuet i par – en spør, en svarer.</li></ol></div>' +
      '<p class="fo-merk">Til læreren: Intervjuene er gjenskapte og ikke ekte. Bare der det står at noe er et sitat, er ordene personens egne. Bruk merkingen «fakta» og «tolkning» til å snakke om hvordan historiske framstillinger lages – og hvorfor man må være kritisk også til filmer, spill og romaner om ekte personer.</p>';
  }

  function intervju(p) {
    const T = TX[p.sp], lang = p.sp === "en" ? ' lang="en"' : "", pre = "iv-" + p.id + "-";
    const tema = LV.temaer.find(t => t.id === p.tema);
    document.title = p.navn + " – Historisk intervju";
    $("innhold").innerHTML = hode(p.navn) + "<div" + lang + ">" +
      '<header class="sidehode"><p class="overlinje">🎙️ ' + (p.sp === "en" ? "Recreated interview" : "Gjenskapt intervju") + "</p><h1>" + esc(p.navn) + ' <span class="iv-levde">(' + esc(p.levde) + ')</span></h1><p class="ingress">' + esc(p.om) + '</p><p class="iv-sted"><strong>' + T.sted + "</strong> " + esc(p.sted) + "</p></header>" +
      '<p class="lg-elevmerk" lang="nb">Svarene er skrevet av Les verden ut fra det vi vet om ' + esc(p.navn) + ". De er ikke ekte sitater, bortsett fra der det står at noe er et sitat.</p>" +
      '<div class="iv-chat" id="iv-chat" aria-live="polite"></div>' +
      '<div class="iv-sporsmal"><h2 id="iv-velg-h">' + T.velg + '</h2><div class="iv-knapper" role="group" aria-labelledby="iv-velg-h">' + p.q.map((q, i) => '<button type="button" class="knapp iv-q" data-i="' + i + '">' + esc(q.s) + "</button>").join("") + '</div><p class="iv-ferdig" id="iv-ferdig" hidden>' + T.alle + "</p></div>" +
      '<div class="iv-etter" id="iv-etter" hidden><h2>' + T.etter + "</h2><p>" + esc(p.etterpa) + "</p></div>" +
      '<section class="le-del"><h2>' + T.oppg + "</h2>" + T.t.map(([s], i) => '<label class="mu-notat" for="' + pre + "t" + i + '"><span>' + esc(s) + '</span><textarea id="' + pre + "t" + i + '" rows="3"></textarea></label>').join("") +
      '<p><button type="button" class="knapp liten" id="iv-nullstill">' + T.nullstill + "</button></p>" + (tema ? '<p lang="nb"><a href="tema.html?id=' + tema.id + '">Les mer i temaet «' + esc(tema.tittel) + "» →</a></p>" : "") + '<p lang="nb"><a class="knapp" href="intervju.html">← Velg en annen person</a></p></section></div>';

    const kanLese = "speechSynthesis" in window;
    function svar(i) {
      const q = p.q[i], chat = $("iv-chat");
      const b = document.querySelector('.iv-q[data-i="' + i + '"]'); b.disabled = true; b.hidden = true;
      chat.insertAdjacentHTML("beforeend",
        '<div class="iv-boble iv-elev"><span class="iv-hvem">' + T.du + "</span><p>" + esc(q.s) + "</p></div>" +
        '<div class="iv-boble iv-person"><span class="iv-avatar" aria-hidden="true">' + esc(initialer(p.navn)) + '</span><div><span class="iv-hvem">' + esc(p.navn) + "</span><p>" + esc(q.a) + '</p><p class="iv-merk"><span class="iv-type iv-' + q.t + '">' + (q.t === "f" ? "✔ " + T.fakta : "💭 " + T.tolk) + "</span> " + T.bygger + " " + esc(q.kilde) + "</p>" +
        (kanLese ? '<button type="button" class="knapp liten iv-les" data-i="' + i + '">' + T.les + "</button>" : "") + "</div></div>");
      const igjen = document.querySelectorAll(".iv-q:not([disabled])");
      if (!igjen.length) { $("iv-ferdig").hidden = false; $("iv-etter").hidden = false; }
      const neste = igjen[0]; if (neste) neste.focus(); else $("iv-ferdig").setAttribute("tabindex", "-1"), $("iv-ferdig").focus();
    }
    document.querySelectorAll(".iv-q").forEach(b => b.addEventListener("click", () => svar(+b.dataset.i)));
    $("iv-chat").addEventListener("click", e => {
      const b = e.target.closest(".iv-les"); if (!b) return;
      if (speechSynthesis.speaking) { speechSynthesis.cancel(); return; }
      const tekst = p.q[+b.dataset.i].a;
      if (p.sp === "en") LV.lesEngelsk(tekst, "en-US", 0.95);
      else { const u = new SpeechSynthesisUtterance(tekst); u.lang = "nb-NO"; u.rate = 0.95; const v = speechSynthesis.getVoices().find(x => /^(nb|no|nn)/i.test(x.lang)); if (v) u.voice = v; speechSynthesis.speak(u); }
    });
    $("iv-nullstill").addEventListener("click", () => {
      if (kanLese) speechSynthesis.cancel();
      $("iv-chat").innerHTML = ""; $("iv-ferdig").hidden = true; $("iv-etter").hidden = true;
      document.querySelectorAll(".iv-q").forEach(b => { b.disabled = false; b.hidden = false; });
      document.querySelector(".iv-q").focus();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const p = LV.intervju.find(x => x.id === LV.param("id"));
    if (p) intervju(p); else oversikt();
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
  });
})();
