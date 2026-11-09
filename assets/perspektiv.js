/* =========================================================
   Les verden – Perspektivbytte (perspektiv.html)
   Én hendelse, fire mennesker. Eleven skriver fra én rolle,
   bytter perspektiv og skriver på nytt, og sammenligner.
   Data: data/perspektiv.js
   perspektiv.html → oversikt · perspektiv.html?id=<hendelse>
   Ingenting lagres – svarene kan lastes ned med svarfil.js.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const hode = t => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › <a href="perspektiv.html">Perspektivbytte</a>' + (t ? " › " + esc(t) : "") + "</nav>";
  const TX = {
    nb: { hend: "1. Hendelsen", roller: "2. Hvem var der?", rollerT: "Les alle fire rollekortene. Velg én person du vil skrive som.", velg: "Skriv som", skriv1: "3. Skriv fra rollen", ikkeValgt: "Velg en rolle i rollekortene først.", skriver: "Du skriver som", bytt: "4. Bytt perspektiv", byttT: "Velg en annen person, og skriv om den samme hendelsen – gjerne som svar til den første teksten.", skriv2: "Teksten fra det nye perspektivet", sml: "5. Sammenlign", starter: "Setningsstartere – trykk for å sette inn:", vet: "Vet:", tenk: "Tenk:", ord: "ord", mer: "Les mer i temaet", tilbake: "← Velg en annen hendelse", tekst1: "Teksten din" },
    en: { hend: "1. The event", roller: "2. Who was there?", rollerT: "Read all four role cards. Choose one person to write as.", velg: "Write as", skriv1: "3. Write as your character", ikkeValgt: "Choose a role in the role cards first.", skriver: "You are writing as", bytt: "4. Switch perspective", byttT: "Choose another person and write about the same event – perhaps as a reply to your first text.", skriv2: "Your text from the new perspective", sml: "5. Compare", starter: "Sentence starters – tap to insert:", vet: "Knows:", tenk: "Think:", ord: "words", mer: "Read more in the topic", tilbake: "← Choose another event", tekst1: "Your text" }
  };

  function oversikt() {
    document.title = "Perspektivbytte – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje">Historisk empati</p><h1>🔄 Perspektivbytte</h1><p class="ingress">Den samme hendelsen kan se helt forskjellig ut, avhengig av hvem du er. En fabrikkeier og en barnearbeider, en mor som blir igjen og en datter som reiser: Gå inn i en rolle, skriv – og bytt så perspektiv.</p></header>' +
      '<ul class="fo-liste">' + LV.perspektiv.map(p => '<li><a class="fo-kort" href="perspektiv.html?id=' + p.id + '" style="--fo-a:var(--' + (p.sp === "en" ? "engelsk" : "samfunnsfag") + ')"' + (p.sp === "en" ? ' lang="en"' : "") + '><span class="fo-kort-topp"><span class="fo-ikon" aria-hidden="true">' + p.ikon + "</span><span>" + esc(p.tid) + "</span></span><strong>" + esc(p.tittel) + "</strong><span>" + p.roller.map(r => esc(r.navn)).join(" · ") + '</span><span class="fo-trinn" lang="nb">' + p.trinn + ". trinn" + (p.sp === "en" ? " · engelsk" : "") + "</span></a></li>").join("") + "</ul>" +
      '<p class="fo-merk">Til læreren: Personene er oppdiktede, men situasjonene bygger på temaene. Snakk gjerne om forskjellen på innlevelse og fakta: Hva vet vi sikkert, og hva har vi forestilt oss? Del klassen i fire, la hver gruppe ta én rolle, og les tekstene høyt etter hverandre.</p>';
  }

  function hendelse(p) {
    const T = TX[p.sp], pre = "pe-" + p.id + "-", lang = p.sp === "en" ? ' lang="en"' : "";
    const tema = LV.temaer.find(t => t.id === p.tema);
    document.title = p.tittel + " – Perspektivbytte";
    const startere = id => '<div class="pe-startere"><span>' + T.starter + "</span>" + p.starter.map(s => '<button type="button" class="knapp liten pe-start" data-til="' + id + '">' + esc(s) + "</button>").join("") + "</div>";
    $("innhold").innerHTML = hode(p.tittel) + "<div" + lang + ">" +
      '<header class="sidehode"><p class="overlinje">🔄 ' + esc(p.tid) + "</p><h1>" + p.ikon + " " + esc(p.tittel) + "</h1></header>" +
      '<section class="le-del"><h2>' + T.hend + '</h2><p class="pe-bakgrunn">' + esc(p.bakgrunn) + "</p>" + (tema ? '<p lang="nb"><a href="tema.html?id=' + tema.id + '">' + T.mer + " «" + esc(tema.tittel) + "» →</a></p>" : "") + "</section>" +
      '<section class="le-del"><h2>' + T.roller + '</h2><p class="mu-intro">' + T.rollerT + '</p><div class="pe-roller">' + p.roller.map((r, i) =>
        '<article class="pe-rolle" aria-labelledby="' + pre + "rh" + i + '"><p class="pe-rolle-ikon" aria-hidden="true">' + r.ikon + '</p><h3 id="' + pre + "rh" + i + '">' + esc(r.navn) + '</h3><p class="pe-hvem">' + esc(r.hvem) + "</p><p>" + esc(r.situasjon) + '</p><p class="pe-merke">' + T.vet + "</p><ul>" + r.vet.map(v => "<li>" + esc(v) + "</li>").join("") + '</ul><p class="pe-tenk"><strong>' + T.tenk + "</strong> " + esc(r.foler) + '</p><label class="pe-velg"><input type="radio" name="' + pre + 'r1" id="' + pre + "r1-" + i + '" value="' + i + '"> ' + T.velg + " " + esc(r.navn.split(",")[0]) + "</label></article>").join("") + "</div></section>" +
      '<section class="le-del"><h2>' + T.skriv1 + '</h2><p class="sx-oppgave">' + esc(p.format) + '</p><p class="pe-valgt" id="' + pre + 'valgt1" aria-live="polite">' + T.ikkeValgt + "</p>" + startere(pre + "t1") +
      '<label class="mu-notat" for="' + pre + 't1"><span>' + T.tekst1 + '</span><textarea id="' + pre + 't1" rows="9"></textarea></label><p class="tp-ord-teller" id="' + pre + 'n1"></p></section>' +
      '<section class="le-del"><h2>' + T.bytt + '</h2><p class="mu-intro">' + T.byttT + '</p><fieldset class="pe-bytt"><legend>' + T.velg + ":</legend>" + p.roller.map((r, i) => '<label><input type="radio" name="' + pre + 'r2" id="' + pre + "r2-" + i + '" value="' + i + '"> ' + r.ikon + " " + esc(r.navn) + "</label>").join("") + "</fieldset>" + startere(pre + "t2") +
      '<label class="mu-notat" for="' + pre + 't2"><span>' + T.skriv2 + '</span><textarea id="' + pre + 't2" rows="9"></textarea></label><p class="tp-ord-teller" id="' + pre + 'n2"></p></section>' +
      '<section class="le-del"><h2>' + T.sml + "</h2>" + p.sporsmal.map((s, i) => '<label class="mu-notat" for="' + pre + "s" + i + '"><span>' + esc(s) + '</span><textarea id="' + pre + "s" + i + '" rows="3"></textarea></label>').join("") +
      '<p lang="nb"><a class="knapp" href="perspektiv.html">' + TX.nb.tilbake + "</a></p></section></div>";

    // Valg av rolle
    const oppdater = () => {
      const r1 = document.querySelector('input[name="' + pre + 'r1"]:checked');
      $(pre + "valgt1").innerHTML = r1 ? T.skriver + " <strong>" + esc(p.roller[+r1.value].navn) + "</strong> – " + esc(p.roller[+r1.value].hvem) + "." : T.ikkeValgt;
      document.querySelectorAll(".pe-rolle").forEach((a, i) => a.classList.toggle("valgt", !!r1 && +r1.value === i));
      document.querySelectorAll('input[name="' + pre + 'r2"]').forEach(x => { const lik = r1 && x.value === r1.value; x.disabled = !!lik; if (lik) x.checked = false; });
    };
    document.querySelectorAll('input[name="' + pre + 'r1"], input[name="' + pre + 'r2"]').forEach(x => x.addEventListener("change", oppdater));
    oppdater();
    // Ordtellere
    ["1", "2"].forEach(n => { const t = $(pre + "t" + n), f = () => { $(pre + "n" + n).textContent = t.value.trim().split(/\s+/).filter(Boolean).length + " " + T.ord; }; t.addEventListener("input", f); f(); });
    // Setningsstartere settes inn der markøren står
    document.querySelectorAll(".pe-start").forEach(b => b.addEventListener("click", () => {
      const t = $(b.dataset.til), s = t.selectionStart != null ? t.selectionStart : t.value.length, e = t.selectionEnd != null ? t.selectionEnd : s;
      const foran = t.value.slice(0, s), sett = (foran && !/\s$/.test(foran) ? " " : "") + b.textContent.replace(/\s*…$/, " ");
      t.value = foran + sett + t.value.slice(e);
      t.focus(); t.selectionStart = t.selectionEnd = s + sett.length;
      t.dispatchEvent(new Event("input", { bubbles: true }));
    }));
  }

  document.addEventListener("DOMContentLoaded", () => {
    const p = LV.perspektiv.find(x => x.id === LV.param("id"));
    if (p) hendelse(p); else oversikt();
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
  });
})();
