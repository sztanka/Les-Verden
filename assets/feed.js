/* =========================================================
   Les verden – Feeden fra fortiden (feed.html)
   feed.html          → oversikt over feedene
   feed.html?id=<id>  → feeden: 1) les  2) sorter innleggene
                        3) svar og skriv selv  4) snakk sammen
   Sorteringen gir tilbakemelding med en gang. Ingenting lagres –
   skrivesvarene kan lastes ned med svarfil.js.
   Data: data/feed.js. Appen «Pip» er den samme oppdiktede appen
   som i Løgnfabrikken.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const tall = n => n >= 1000 ? (Math.round(n / 100) / 10).toLocaleString("nb-NO") + "k" : String(n);
  const T = {
    nb: { les: "Les feeden", sorter: "Sorter innleggene", skriv: "Skriv selv", snakk: "Snakk sammen", hva: "Hva slags innlegg er dette?", riktig: "Riktig!", feil: "Ikke helt – dette er", poeng: (a, b) => a + " av " + b + " riktige på første forsøk", svarTil: "Svar på innlegget", velgRolle: "Velg en person og skriv et nytt innlegg fra feeden:", innlegg: "Ditt innlegg", tegn: "tegn", svar: "Skriv et svar til ett av innleggene. Hvilket innlegg svarer du på, og hvorfor?", typer: "Fire typer innlegg", merk: "Personene i feeden er oppdiktet. Det som skjer, bygger på ekte historie.", stegTekst: ["Les alle innleggene. Hva skjer, og hvem skriver?", "Bestem om hvert innlegg er fakta, mening, rykte eller propaganda.", "Skriv et innlegg i rollen til en av personene – og svar på et innlegg.", "Diskuter spørsmålene i gruppa eller i klassen."], liker: "liker", delt: "delt", lesTema: "Les temaet", andre: "Andre feeder" },
    en: { les: "Read the feed", sorter: "Sort the posts", skriv: "Write", snakk: "Talk about it", hva: "What kind of post is this?", riktig: "Correct!", feil: "Not quite – this is", poeng: (a, b) => a + " of " + b + " correct on the first try", svarTil: "Reply to the post", velgRolle: "Choose a person and write a new post from the feed:", innlegg: "Your post", tegn: "characters", svar: "Write a reply to one of the posts. Which post are you replying to, and why?", typer: "Four kinds of posts", merk: "The people in the feed are made up. What happens is based on real history.", stegTekst: ["Read all the posts. What is happening, and who is writing?", "Decide if each post is a fact, an opinion, a rumour or propaganda.", "Write a post as one of the people – and reply to a post.", "Discuss the questions in your group or with the class."], liker: "likes", delt: "shares", lesTema: "Read the topic", andre: "Other feeds" }
  };
  const hode = f => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › <a href="feed.html">Feeden fra fortiden</a>' + (f ? " › " + esc(f.tittel) : "") + "</nav>";

  function oversikt() {
    document.title = "Feeden fra fortiden – " + (LV.config ? LV.config.navn : "Les verden");
    const liste = LV.feeder.slice().sort((a, b) => a.trinn - b.trinn);
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje">Kilder og medier · historie</p><h1>📱 Feeden fra fortiden</h1><p class="ingress">Hva om folk hadde hatt sosiale medier da Bastillen falt, da Grunnloven ble skrevet eller da tyskerne kom 9. april? Les feeden, sorter innleggene i fakta, mening, rykte og propaganda – og skriv selv.</p></header>' +
      '<ul class="fo-liste">' + liste.map(f => '<li><a class="fo-kort" href="feed.html?id=' + f.id + '" style="--fo-a:' + f.farger[0] + ";--fo-b:" + f.farger[1] + '"' + (f.sprak === "en" ? ' lang="en"' : "") + '><span class="fo-kort-topp"><span class="fo-ikon" aria-hidden="true">' + f.ikon + "</span><span>" + esc(f.sted) + " · " + esc(f.dato) + "</span></span><strong>" + esc(f.tittel) + "</strong><span>" + esc(f.intro.split(". ")[0]) + '.</span><span class="fo-trinn" lang="nb">' + (f.sprak === "en" ? "🇬🇧 English · " : "") + f.trinn + ". trinn · " + f.innlegg.length + " innlegg</span></a></li>").join("") + "</ul>" +
      typerHtml("nb") +
      '<p class="mu-intro">For læreren: Personene i feedene er oppdiktet, men hendelsene og faktaboksene bygger på ekte historie. Ekte historiske personer skriver aldri selv – de blir bare nevnt. Feeden passer som inngang til et tema eller som kildekritisk øvelse. Snakk gjerne om forskjellen på å sortere innleggene i ettertid og å stå midt i hendelsene uten å vite hva som er sant. Se også <a href="lognfabrikk.html">Løgnfabrikken</a>, som bruker den samme oppdiktede appen Pip.</p>';
  }

  const typerHtml = sp => '<section class="fd-typer" aria-labelledby="fd-typer-t"' + (sp === "en" ? ' lang="en"' : "") + '><h2 id="fd-typer-t">' + T[sp].typer + '</h2><ul>' + Object.entries(LV.feedTyper[sp]).map(([k, t]) => '<li class="fd-t-' + k + '"><span aria-hidden="true">' + t[0] + "</span><strong>" + t[1] + "</strong><span>" + t[2] + "</span></li>").join("") + "</ul></section>";

  function feed(f) {
    const sp = f.sprak === "en" ? "en" : "nb", tx = T[sp], TY = LV.feedTyper[sp];
    document.title = f.tittel + " – Feeden fra fortiden";
    const tema = LV.temaer && LV.temaer.find(t => t.id === f.tema);
    const forsok = {}; // innleggnr → antall feil
    const laerer = LV.param("laerer") === "1" && f.kontroller ? '<aside class="laerer-boks" lang="nb"><h2>For læreren: kontroller disse opplysningene</h2><ul>' + f.kontroller.map(k => "<li>" + esc(k) + "</li>").join("") + "</ul></aside>" : "";
    const profil = k => f.profiler[k];
    const postHtml = (p, i) => {
      const pr = profil(p.av);
      return '<article class="fd-post" id="fd-p-' + i + '" aria-labelledby="fd-n-' + i + '"><div class="fd-avatar" aria-hidden="true">' + pr.ikon + '</div><div class="fd-kropp"><p class="fd-hode"><strong id="fd-n-' + i + '">' + esc(pr.navn) + '</strong> <span class="fd-handle">' + esc(pr.handle) + " · " + esc(p.tid) + "</span></p>" +
        '<p class="fd-tekst">' + esc(p.tekst) + '</p><p class="fd-tall"><span>❤️ ' + tall(p.liker) + " " + tx.liker + "</span><span>🔁 " + tall(p.delt) + " " + tx.delt + "</span></p>" +
        (p.svar || []).map(s => '<div class="fd-svar"><span aria-hidden="true">' + profil(s.av).ikon + "</span> <strong>" + esc(profil(s.av).navn) + "</strong> " + esc(s.tekst) + "</div>").join("") +
        '<div class="fd-sorter" role="group" aria-label="' + tx.hva + '"><span class="fd-sp">' + tx.hva + "</span>" + Object.entries(TY).map(([k, t]) => '<button type="button" class="knapp liten fd-valg" data-i="' + i + '" data-t="' + k + '"><span aria-hidden="true">' + t[0] + "</span> " + t[1] + "</button>").join("") + '</div><p class="fd-tilbake" id="fd-tb-' + i + '" role="status" aria-live="polite"></p></div></article>';
    };
    const roller = Object.entries(f.profiler);
    $("innhold").innerHTML = hode(f) + laerer +
      '<div class="fd-side"' + (sp === "en" ? ' lang="en"' : "") + '><header class="sidehode fd-hodet" style="--fo-a:' + f.farger[0] + ";--fo-b:" + f.farger[1] + '"><p class="overlinje">Pip · ' + esc(f.sted) + " · " + esc(f.dato) + '</p><h1><span aria-hidden="true">' + f.ikon + "</span> " + esc(f.tittel) + '</h1><p class="ingress">' + esc(f.intro) + '</p><p class="fo-merk">' + tx.merk + "</p></header>" +
      '<ol class="fd-steg">' + [tx.les, tx.sorter, tx.skriv, tx.snakk].map((s, i) => '<li><strong>' + s + "</strong><span>" + tx.stegTekst[i] + "</span></li>").join("") + "</ol>" +
      '<div class="fd-oppsett"><div class="fd-app"><div class="fd-appbar" aria-hidden="true"><span>🐦 Pip</span><span>' + esc(f.tittel) + '</span></div><div class="fd-strom">' + f.innlegg.map(postHtml).join("") + "</div></div>" +
      '<aside class="fd-sidepanel"><p class="fd-poeng" id="fd-poeng" role="status" aria-live="polite">' + tx.poeng(0, f.innlegg.length) + "</p>" + typerHtml(sp) + "</aside></div>" +
      '<section class="fd-skriv" id="skriv"><h2>✍️ ' + tx.skriv + "</h2><p>" + tx.velgRolle + "</p>" +
      '<label class="skjult-visuelt" for="fd-rolle">Rolle</label><select id="fd-rolle">' + roller.map(([k, r]) => '<option value="' + k + '">' + esc(r.ikon + " " + r.navn + " – " + r.rolle) + "</option>").join("") + "</select>" +
      '<div class="fd-nypost"><div class="fd-avatar" aria-hidden="true" id="fd-nyikon">' + roller[0][1].ikon + '</div><div class="fd-kropp"><label for="fd-ny">' + tx.innlegg + '</label><textarea id="fd-ny" rows="3" maxlength="280"></textarea><p class="fd-teller" id="fd-teller" aria-live="polite">0 / 280 ' + tx.tegn + "</p></div></div>" +
      '<label for="fd-svartekst">' + tx.svar + '</label><textarea id="fd-svartekst" rows="4"></textarea></section>' +
      '<section class="fd-snakk"><h2>💬 ' + tx.snakk + "</h2><ol>" + f.sporsmal.map((q, i) => '<li><label for="fd-q-' + i + '">' + esc(q) + '</label><textarea id="fd-q-' + i + '" rows="3"></textarea></li>').join("") + "</ol>" +
      "<p>" + (tema ? '<a class="knapp" href="tema.html?id=' + encodeURIComponent(tema.id) + '">' + tx.lesTema + " «" + esc(tema.tittel) + "» →</a> " : "") + '<a class="knapp" href="feed.html">' + tx.andre + "</a></p></section></div>";

    let rett = 0;
    $("innhold").addEventListener("click", e => {
      const b = e.target.closest(".fd-valg"); if (!b) return;
      const i = +b.dataset.i, p = f.innlegg[i], t = b.dataset.t, tb = $("fd-tb-" + i);
      const gruppe = b.parentElement;
      if (gruppe.dataset.ferdig) return;
      if (t === p.type) {
        gruppe.dataset.ferdig = "1";
        if (!forsok[i]) rett++;
        gruppe.querySelectorAll("button").forEach(x => { x.disabled = true; x.classList.toggle("valgt", x === b); });
        b.closest(".fd-post").classList.add("fd-" + p.type);
        tb.className = "fd-tilbake ok"; tb.innerHTML = "<strong>" + TY[p.type][0] + " " + tx.riktig + "</strong> " + esc(p.forklaring);
        $("fd-poeng").textContent = tx.poeng(rett, f.innlegg.length);
      } else {
        forsok[i] = (forsok[i] || 0) + 1;
        b.disabled = true;
        if (forsok[i] >= 2) {
          gruppe.dataset.ferdig = "1";
          gruppe.querySelectorAll("button").forEach(x => { x.disabled = true; x.classList.toggle("valgt", x.dataset.t === p.type); });
          b.closest(".fd-post").classList.add("fd-" + p.type);
          tb.className = "fd-tilbake feil"; tb.innerHTML = "<strong>" + tx.feil + " " + TY[p.type][0] + " " + TY[p.type][1].toLowerCase() + ".</strong> " + esc(p.forklaring);
        } else { tb.className = "fd-tilbake feil"; tb.textContent = "✗ " + (sp === "en" ? "Try again." : "Prøv igjen."); }
      }
    });
    $("fd-rolle").addEventListener("change", e => { $("fd-nyikon").textContent = f.profiler[e.target.value].ikon; });
    $("fd-ny").addEventListener("input", e => { $("fd-teller").textContent = e.target.value.length + " / 280 " + tx.tegn; });

    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const f = LV.feeder.find(x => x.id === LV.param("id"));
    if (f) feed(f); else oversikt();
  });
})();
