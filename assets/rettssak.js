/* =========================================================
   Les verden – Rettssaken (rettssak.html)
   Rollespill: en oppdiktet straffesak i tingretten med rollekort,
   saksdokumenter, dommerens manus og skjema for meddommerne.
   rettssak.html → oversikt · ?sak=<id> → hele saken (læreren)
   · ?sak=<id>&rolle=<rolle> → ett rollekort (til eleven)
   Data: data/rettssak.js. Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const hode = (t, sak) => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › <a href="rettssak.html">Rettssaken</a>' + (sak ? ' › <a href="rettssak.html?sak=' + sak.id + '">' + esc(sak.tittel) + "</a>" : "") + (t ? " › " + esc(t) : "") + "</nav>";
  const svarlinje = () => { const l = document.createElement("div"); l.className = "svarlinje"; l.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>'; document.body.appendChild(l); };

  const kort = (S, r, pre) => '<article class="rs-kort" aria-labelledby="' + (pre || "rs-k-") + r.id + '"><h3 id="' + (pre || "rs-k-") + r.id + '"><span aria-hidden="true">' + r.ikon + "</span> " + esc(r.navn) + '</h3><p class="rs-hvem">' + esc(r.hvem) + '</p><h4>Dette vet du</h4><ul>' + r.vet.map(v => "<li>" + fmt(v) + "</li>").join("") + "</ul><h4>Din oppgave</h4><ul>" + r.oppgave.map(v => "<li>" + fmt(v) + "</li>").join("") + '</ul><p class="rs-sak">Rollekort · ' + esc(S.tittel) + " · Oppdiktet sak</p></article>";
  const tiltaleHtml = S => '<section class="le-del" aria-labelledby="rs-t"><h2 id="rs-t">📜 Tiltalen</h2><div class="rs-tiltale">' + S.tiltale.map(p => "<p>" + fmt(p) + "</p>").join("") + '</div><h3>Hva sier loven?</h3><dl class="rs-lov">' + S.lovtekst.map(([a, b]) => "<div><dt>" + esc(a) + "</dt><dd>" + esc(b) + "</dd></div>").join("") + "</dl></section>";
  const bevisHtml = S => '<section class="le-del" aria-labelledby="rs-b"><h2 id="rs-b">🗂️ Saksdokumenter og bevis</h2><ul class="rs-bevis">' + S.bevis.map(([a, b]) => "<li><strong>" + esc(a) + "</strong><p>" + esc(b) + "</p></li>").join("") + "</ul></section>";

  function oversikt() {
    document.title = "Rettssaken – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje">Rollespill · Rettsstaten</p><h1>⚖️ Rettssaken</h1><p class="ingress">Hvordan foregår en straffesak i en norsk domstol? Her spiller klassen en rettssak – med dommer, aktor, forsvarer, tiltalt, vitner og meddommere. Sakene er oppdiktet, men saksgangen og prinsippene er de samme som i en ekte tingrett.</p></header>' +
      '<div class="ka-metode"><h2>Fire prinsipper i en rettferdig rettssak</h2><ul><li><strong>Uskyldig til det motsatte er bevist.</strong> Det er aktor som må bevise at tiltalte er skyldig – ikke tiltalte som må bevise at hen er uskyldig.</li><li><strong>Enhver rimelig tvil skal komme tiltalte til gode.</strong> Er dommerne i tvil, skal tiltalte frifinnes.</li><li><strong>Rett til forsvarer.</strong> Alle tiltalte har rett til en advokat.</li><li><strong>Begge sider skal høres</strong>, og rettssaken er som hovedregel åpen for publikum.</li></ul></div>' +
      '<ul class="fo-liste">' + LV.rettssaker.map(S => '<li><a class="fo-kort" href="rettssak.html?sak=' + S.id + '" style="--fo-a:var(--samfunnsfag)"><span class="fo-kort-topp"><span class="fo-ikon" aria-hidden="true">' + S.ikon + "</span><span>" + S.roller.length + " roller</span></span><strong>" + esc(S.tittel) + "</strong><span>" + esc(S.kort) + "</span></a></li>").join("") + "</ul>" +
      '<section class="le-del"><h2>Slik går en straffesak</h2><ol class="rs-gang">' + LV.rettssakGang.map(([a, b]) => "<li><strong>" + esc(a) + ".</strong> " + esc(b) + "</li>").join("") + "</ol></section>" +
      '<p class="fo-merk">Til læreren: Regn med to skoletimer – én til forberedelse i grupper (aktor, forsvar, vitner, meddommere) og én til selve rettssaken. Forslag til fordeling i en klasse på 25: 1 dommer, 2–3 aktorer, 2–3 forsvarere, 1 tiltalt, 3 vitner, 2 journalister og resten meddommere i grupper på 3–4, som hver avgjør saken. Del rollekortene ut på papir eller som lenke (hver rolle har egen lenke). Sakene er forenklet; strafferammene er hentet fra straffeloven, men sjekk gjerne Lovdata. Se også temaene <a href="tema.html?id=sf8-rettsstaten">Rettsstaten</a> og <a href="tema.html?id=sf9-kriminalitet-straff">Kriminalitet og straff</a>.</p>';
  }

  function sak(S) {
    document.title = S.tittel + " – Rettssaken";
    $("innhold").innerHTML = hode(null, S).replace(' › <a href="rettssak.html?sak=' + S.id + '">' + esc(S.tittel) + "</a>", " › " + esc(S.tittel)) +
      '<header class="sidehode"><p class="overlinje">⚖️ Rettssaken · Oppdiktet sak</p><h1>' + S.ikon + " " + esc(S.tittel) + '</h1><p class="ingress">' + esc(S.kort) + "</p></header>" +
      tiltaleHtml(S) + bevisHtml(S) +
      '<section class="le-del" aria-labelledby="rs-r"><h2 id="rs-r">🎭 Rollekort</h2><p class="mu-intro">Hver rolle har en egen lenke, slik at eleven bare ser sitt eget kort. Eller skriv ut alle kortene – ett per side.</p><p class="ak-knapper"><button type="button" class="knapp hoved" id="rs-skriv">🖨️ Skriv ut alle rollekortene</button></p>' +
      '<ul class="rs-rolleliste">' + S.roller.map(r => '<li><details><summary><span aria-hidden="true">' + r.ikon + "</span> " + esc(r.navn) + '</summary><div class="rs-kortboks">' + kort(S, r) + '<p><a class="knapp liten" href="rettssak.html?sak=' + S.id + "&amp;rolle=" + r.id + '">🔗 Lenke til dette rollekortet</a></p></div></details></li>').join("") + '</ul><div class="rs-utskrift">' + S.roller.map(r => kort(S, r, "rs-p-")).join("") + "</div></section>" +
      '<section class="le-del" aria-labelledby="rs-m"><h2 id="rs-m">📋 Dommerens manus</h2><ol class="rs-manus">' + LV.rettssakGang.map(([a, b], i) => '<li><label for="rs-g' + i + '"><input type="checkbox" id="rs-g' + i + '"> <span><strong>' + esc(a) + "</strong> – " + esc(b) + "</span></label></li>").join("") + "</ol></section>" +
      skjema(S) +
      '<section class="le-del" aria-labelledby="rs-e"><h2 id="rs-e">💭 Etter rettssaken</h2>' +
      [["rs-e1", "Var dommen rettferdig? Begrunn svaret."], ["rs-e2", "Hvorfor er det viktig at «enhver rimelig tvil skal komme tiltalte til gode»? Hva kunne skjedd uten denne regelen?"], ["rs-e3", "Hvordan var det å ha din rolle? Hva var vanskelig?"]].map(([id, l]) => '<label class="mu-notat" for="' + S.id + "-" + id + '"><span>' + l + '</span><textarea id="' + S.id + "-" + id + '" rows="3"></textarea></label>').join("") + "</section>";
    $("rs-skriv").addEventListener("click", () => { document.body.classList.add("rs-skriv-kort"); window.print(); setTimeout(() => document.body.classList.remove("rs-skriv-kort"), 500); });
    koble(S);
  }

  function skjema(S) {
    const p = S.id + "-md-";
    return '<section class="le-del" aria-labelledby="rs-s"><h2 id="rs-s">🧑‍⚖️ Skjema for meddommerne</h2><p class="mu-intro">Fyll ut underveis og i rådslagningen. Husk: Er dere i rimelig tvil, skal tiltalte frifinnes.</p>' +
      '<label class="mu-notat" for="' + p + 'for"><span>Bevis og forklaringer som taler <strong>for</strong> at tiltalte er skyldig:</span><textarea id="' + p + 'for" rows="3"></textarea></label>' +
      '<label class="mu-notat" for="' + p + 'mot"><span>Bevis og forklaringer som taler <strong>mot</strong> – eller skaper tvil:</span><textarea id="' + p + 'mot" rows="3"></textarea></label>' +
      S.tiltale.map((t, i) => '<fieldset class="rs-skyld"><legend>' + (S.tiltale.length > 1 ? (i === 0 ? "Hovedpunktet i tiltalen" : "Subsidiært") : "Skyldspørsmålet") + ": " + esc(t.replace(/\*\*/g, "").split(".")[0].slice(0, 90)) + ' …</legend><label><input type="radio" name="' + p + "s" + i + '" id="' + p + "s" + i + '-ja" value="ja"> Skyldig – bevist utover rimelig tvil</label><label><input type="radio" name="' + p + "s" + i + '" id="' + p + "s" + i + '-nei" value="nei"> Ikke skyldig / ikke bevist</label></fieldset>').join("") +
      '<fieldset class="rs-straff"><legend>Hvis tiltalte er skyldig: Hvilken straff?</legend>' + LV.rettssakStraff.map(([a, b], i) => '<label><input type="radio" name="' + p + 'straff" id="' + p + "straff" + i + '" value="' + i + '"> <span><strong>' + esc(a) + "</strong> – " + esc(b) + "</span></label>").join("") + "</fieldset>" +
      '<label class="mu-notat" for="' + p + 'begr"><span>Begrunnelse for dommen (det dommeren leser opp). Ta med hva som er bevist, hva som er formildende (gjør straffen mildere) og hva som er skjerpende (gjør den strengere):</span><textarea id="' + p + 'begr" rows="6"></textarea></label>' +
      '<div id="rs-dom" class="rs-dom" aria-live="polite"></div></section>';
  }
  function koble(S) {
    const p = S.id + "-md-";
    const vis = () => {
      const sv = S.tiltale.map((_, i) => (document.querySelector('input[name="' + p + "s" + i + '"]:checked') || {}).value);
      const st = document.querySelector('input[name="' + p + 'straff"]:checked');
      let t = "";
      if (sv[0] === "ja") t = "Retten finner tiltalte skyldig etter tiltalen.";
      else if (sv[0] === "nei" && sv[1] === "ja") t = "Retten frifinner tiltalte for hovedpunktet, men finner hen skyldig etter det subsidiære punktet.";
      else if (sv[0] === "nei" && (S.tiltale.length === 1 || sv[1] === "nei")) t = "Retten frifinner tiltalte.";
      if (t && (sv.includes("ja")) && st) t += " Straff: " + LV.rettssakStraff[+st.value][0].toLowerCase() + ".";
      $("rs-dom").innerHTML = t ? "<p><strong>Dommen så langt:</strong> " + esc(t) + "</p>" : "";
    };
    document.querySelectorAll('.rs-skyld input, .rs-straff input').forEach(i => i.addEventListener("change", vis));
  }

  function rolle(S, r) {
    document.title = r.navn + " – " + S.tittel;
    $("innhold").innerHTML = hode(r.navn, S) + '<header class="sidehode"><p class="overlinje">⚖️ Rettssaken · ' + esc(S.tittel) + "</p><h1>" + r.ikon + " Din rolle: " + esc(r.navn) + "</h1></header>" + kort(S, r) + tiltaleHtml(S) + bevisHtml(S) +
      '<label class="mu-notat" for="' + S.id + "-" + r.id + '-notat"><span>Dine notater og spørsmål til rettssaken:</span><textarea id="' + S.id + "-" + r.id + '-notat" rows="6"></textarea></label>' +
      (r.id === "meddommer" ? skjema(S) : "") + '<p class="lg-elevmerk">Saken er oppdiktet. Personene finnes ikke.</p>';
    if (r.id === "meddommer") koble(S);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const S = LV.rettssaker.find(x => x.id === LV.param("sak"));
    const r = S && S.roller.find(x => x.id === LV.param("rolle"));
    if (S && r) rolle(S, r); else if (S) sak(S); else oversikt();
    svarlinje();
  });
})();
