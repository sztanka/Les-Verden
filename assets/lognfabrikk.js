/* =========================================================
   Les verden – Løgnfabrikken (lognfabrikk.html)
   Et «prebunking»-spill: Eleven spiller en som sprer
   desinformasjon på det oppdiktede mediet «Pip» i den oppdiktede
   byen Fjordvik, og lærer seks manipulasjonsteknikker innenfra.
   Til slutt: avsløring, «Slik kjenner du det igjen» og en test.
   Bygger på forskning om «inokulering» (Roozenbeek og van der Linden).
   Alt er oppdiktet. Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  const TEKNIKKER = [
    { id: "etterligning", ikon: "🎭", navn: "Etterligning", kjenn: "Avsenderen later som den er noen du stoler på – en avis, en myndighet eller en ekspert. Sjekk brukernavnet nøye, og søk etter avsenderen andre steder." },
    { id: "folelser", ikon: "😱", navn: "Følelser", kjenn: "Innlegget prøver å gjøre deg redd, sint eller sjokkert med store bokstaver, utropstegn og sterke ord. Sterke følelser gjør at vi deler før vi tenker." },
    { id: "polarisering", ikon: "⚔️", navn: "Polarisering", kjenn: "Saken blir framstilt som en kamp mellom «oss» og «dem». Det finnes bare to sider, og den andre siden er dum eller ond." },
    { id: "konspirasjon", ikon: "🕵️", navn: "Konspirasjon", kjenn: "Noen påstår at mektige personer i hemmelighet står bak alt. Påstanden kan ikke motbevises – alle bevis mot den blir «en del av planen»." },
    { id: "diskreditering", ikon: "🎯", navn: "Diskreditering", kjenn: "I stedet for å svare på kritikken, angriper avsenderen den som kritiserer: «De er kjøpt og betalt», «De lyver alltid»." },
    { id: "falske", ikon: "🤖", navn: "Falske kontoer", kjenn: "Mange kontoer som deler det samme på kort tid, kan være roboter eller falske profiler. Popularitet er ikke det samme som sannhet." }
  ];
  const NIVAER = [
    { t: "etterligning", scene: "Du har laget en konto på Pip, Fjordviks mest populære app. Men ingen følger deg. Hvilket brukernavn og profilbilde velger du?",
      valg: [
        { tekst: "@Ola_fra_Fjordvik – med et bilde av deg selv", f: 5, tr: 0, svar: "Ærlig – men ingen bryr seg om hva en tilfeldig person mener. Bare fem nye følgere." },
        { tekst: "@FjordvikNyheter_Offisiell – med en logo som ligner på lokalavisen", f: 120, tr: 15, best: true, svar: "Smart – og skummelt. Folk tror du er lokalavisen. Dette er etterligning: å låne troverdighet fra noen andre." },
        { tekst: "@xX_anonym_Xx – uten bilde", f: 0, tr: -5, svar: "Ingen stoler på en anonym konto uten bilde. Du får ingen nye følgere." }
      ] },
    { t: "folelser", scene: "Kommunen har bestemt at skolene skal servere varm lunsj to dager i uka, laget på et felles kjøkken. Hvordan skriver du om det?",
      valg: [
        { tekst: "Fra januar får elevene i Fjordvik varm lunsj to dager i uka. Maten lages på et felles kjøkken.", f: 3, tr: 5, svar: "Saklig og riktig – men kjedelig. Nesten ingen deler det." },
        { tekst: "SJOKK!!! 😡 Barna våre skal spise RESTEMAT fra en FABRIKK! Hvem bryr seg om ungene?! DEL hvis du er SINT!", f: 300, tr: 5, best: true, svar: "Innlegget eksploderer! Sinne og sjokk får folk til å dele uten å sjekke. Dette er følelsesmanipulasjon." },
        { tekst: "Hva synes dere om at skolene får varm lunsj?", f: 20, tr: 5, svar: "Et greit spørsmål, men det skaper lite engasjement." }
      ] },
    { t: "polarisering", scene: "Fjordvik skal bygge en ny sykkelvei langs hovedgata, og noen parkeringsplasser forsvinner. Hva poster du?",
      valg: [
        { tekst: "Noen er glade for sykkelveien, andre savner parkeringsplassene. Møtet om saken er torsdag.", f: 5, tr: 5, svar: "Balansert – og nesten usynlig i strømmen." },
        { tekst: "Bilistene i Fjordvik er egoister som ødelegger byen for alle andre. 🚲 Nå er det NOK!", f: 250, tr: 0, best: true, svar: "Kommentarfeltet koker! Du har delt byen i to lag som hater hverandre. Dette er polarisering." },
        { tekst: "Sykkelveien blir 1,2 kilometer lang og koster 14 millioner kroner.", f: 2, tr: 10, svar: "Fakta er nyttig, men få deler tall uten følelser." }
      ] },
    { t: "konspirasjon", scene: "Vannverket i Fjordvik har vært stengt i to dager på grunn av et rørbrudd. Folk lurer på hva som skjer. Hva skriver du?",
      valg: [
        { tekst: "Et gammelt rør har sprukket. Kommunen sier vannet er tilbake fredag.", f: 5, tr: 5, svar: "Sant og kjedelig. Ingen ny følger." },
        { tekst: "Er det tilfeldig at ordføreren eier aksjer i et firma som selger flaskevann? 🤔 Tenk selv. De vil ikke at du skal vite dette.", f: 400, tr: -5, best: true, svar: "Mange begynner å lure. Du har ikke påstått noe direkte – bare «stilt spørsmål». Dette er en konspirasjonsteori: Ingen bevis trengs, og alt kan forklares som en hemmelig plan." },
        { tekst: "Vannverket er sikkert ødelagt. Typisk.", f: 10, tr: 0, svar: "Litt sur, men ikke spennende nok til å spre seg." }
      ] },
    { t: "diskreditering", scene: "Lokalavisen har faktasjekket innlegget ditt om vannverket og skriver at ordføreren ikke eier aksjer i noe vannfirma. Hvordan svarer du?",
      valg: [
        { tekst: "Beklager, jeg tok feil. Takk for faktasjekken.", f: -150, tr: 20, svar: "Ærlig og modig – men i dette spillet mister du følgere. Mange som sprer desinformasjon, innrømmer aldri feil." },
        { tekst: "Selvfølgelig sier avisen det. Den får jo støtte fra kommunen. Kjøpt og betalt! 💰", f: 200, tr: 5, best: true, svar: "Du svarte ikke på kritikken – du angrep den som kritiserte. Nå stoler følgerne dine enda mindre på avisen. Dette er diskreditering." },
        { tekst: "(Ignorer det og håp at ingen ser det.)", f: -20, tr: -10, svar: "Noen følgere ser faktasjekken og forsvinner." }
      ] },
    { t: "falske", scene: "Du vil at det skal se ut som om hele Fjordvik er enig med deg. På et nettforum kan du kjøpe 1000 falske kontoer. Hva gjør du?",
      valg: [
        { tekst: "Kjøper kontoene og lar dem dele og like alt du poster – samtidig.", f: 1000, tr: 10, best: true, svar: "Nå ser det ut som tusenvis er enige med deg. Ekte mennesker blir med fordi «alle andre» mener det samme. Dette er falske kontoer og roboter." },
        { tekst: "Nei, jeg vil bare ha ekte følgere.", f: 0, tr: 5, svar: "Et godt valg i virkeligheten – men i spillet står du stille." },
        { tekst: "Ber vennene mine om å dele.", f: 30, tr: 0, svar: "Noen få venner deler. Det hjelper litt." }
      ] }
  ];
  const TEST = [
    { tekst: "Pip-konto @Helsedirektoratet_Info: «Fra mandag er det FORBUDT å gå ut etter kl. 21!»", svar: "etterligning" },
    { tekst: "«ALLE som har barn MÅ lese dette!!! 😭😭 Jeg gråt i en time!!!»", svar: "folelser" },
    { tekst: "«Det finnes to typer folk i denne byen: de som bryr seg om naturen, og de som bare tenker på penger.»", svar: "polarisering" },
    { tekst: "«Det er ingen tilfeldighet at strømmen gikk akkurat samme dag som valget. Hvem tjener på det? Tenk selv.»", svar: "konspirasjon" },
    { tekst: "«Den såkalte eksperten har aldri hatt en ordentlig jobb. Hvorfor skal vi høre på henne?»", svar: "diskreditering" },
    { tekst: "Femti nye kontoer uten profilbilde, alle opprettet i går, deler det samme innlegget i løpet av to minutter.", svar: "falske" }
  ];

  document.addEventListener("DOMContentLoaded", () => {
    document.title = "Løgnfabrikken – " + (LV.config ? LV.config.navn : "Les verden");
    let nr = -1, folgere = 0, trov = 50, merker = [], innlegg = [];
    const hode = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › Løgnfabrikken</nav>';

    function start() {
      $("innhold").innerHTML = hode +
        '<header class="sidehode"><p class="overlinje">Prebunking-spill</p><h1>🏭 Løgnfabrikken</h1><p class="ingress">I dette spillet er du skurken. Målet ditt er å få flest mulig følgere på det sosiale mediet «Pip» i den lille byen Fjordvik – uansett om det du skriver er sant. Underveis lærer du seks triks som brukes for å spre desinformasjon. Når du kjenner triksene innenfra, blir du mye flinkere til å avsløre dem.</p></header>' +
        '<div class="lp-viktig"><p><strong>Alt i spillet er oppdiktet:</strong> byen, personene, sakene og appen. Du lærer triksene for å kjenne dem igjen – ikke for å bruke dem.</p></div>' +
        '<ul class="lgf-teknikker">' + TEKNIKKER.map(t => '<li><span aria-hidden="true">' + t.ikon + "</span> " + esc(t.navn) + "</li>").join("") + "</ul>" +
        '<p><button type="button" class="knapp hoved" id="lgf-start">Start spillet →</button></p>' +
        '<p class="fo-merk">Til læreren: Spillet bygger på forskning om «psykologisk vaksinering» (prebunking): Når man får prøve manipulasjonsteknikker i en trygg, svekket form, blir man flinkere til å oppdage dem senere. Kjente forskningsspill er <span lang="en">Bad News</span> og <span lang="en">Harmony Square</span> (Universitetet i Cambridge). Snakk med klassen etterpå om hvorfor de «beste» valgene i spillet er de verste i virkeligheten.</p>';
      $("lgf-start").addEventListener("click", () => { nr = 0; folgere = 0; trov = 50; merker = []; innlegg = []; niva(); });
    }

    function status() {
      return '<div class="lgf-status" aria-live="polite"><div><span class="lgf-tall">' + folgere.toLocaleString("nb-NO") + '</span><span>følgere</span></div><div class="lgf-meter"><span>Troverdighet</span><div class="lgf-bar" role="img" aria-label="Troverdighet ' + trov + ' av 100"><div style="width:' + trov + '%"></div></div></div><div class="lgf-merker" aria-label="Teknikker du har lært">' + TEKNIKKER.map(t => '<span class="lgf-merke' + (merker.includes(t.id) ? " opptjent" : "") + '" title="' + esc(t.navn) + '" aria-label="' + esc(t.navn) + (merker.includes(t.id) ? " – lært" : " – ikke lært ennå") + '">' + t.ikon + "</span>").join("") + "</div></div>";
    }
    const feed = () => innlegg.length ? '<div class="lgf-feed" aria-label="Innleggene dine på Pip">' + innlegg.slice().reverse().map(p => '<article class="lgf-post"><p class="lgf-post-hode"><strong>' + esc(p.konto) + "</strong> · Pip</p><p>" + esc(p.tekst) + '</p><p class="lgf-post-fot">❤️ ' + p.likes + " · 🔁 " + Math.round(p.likes / 3) + "</p></article>").join("") + "</div>" : "";

    function niva() {
      const N = NIVAER[nr], T = TEKNIKKER.find(t => t.id === N.t);
      const konto = innlegg.length ? innlegg[0].konto : "@deg";
      $("innhold").innerHTML = hode + '<div class="lgf-spill"><div class="lgf-hoved"><p class="lgf-nivå">Nivå ' + (nr + 1) + " av " + NIVAER.length + '</p><h1 class="lgf-tittel" tabindex="-1" id="lgf-h">' + T.ikon + " " + esc(T.navn) + '</h1><p class="lgf-scene">' + esc(N.scene) + '</p><div class="lgf-valg" role="group" aria-label="Velg">' +
        bland(N.valg).map(v => '<button type="button" class="lgf-valgknapp" data-i="' + N.valg.indexOf(v) + '">' + esc(v.tekst) + "</button>").join("") + '</div><div id="lgf-svar" aria-live="polite"></div></div><aside class="lgf-side">' + status() + feed() + "</aside></div>";
      $("lgf-h").focus();
      document.querySelectorAll(".lgf-valgknapp").forEach(b => b.addEventListener("click", () => {
        const v = N.valg[+b.dataset.i];
        document.querySelectorAll(".lgf-valgknapp").forEach(x => { x.disabled = true; x.classList.toggle("valgt", x === b); });
        folgere = Math.max(0, folgere + v.f); trov = Math.max(0, Math.min(100, trov + v.tr));
        if (v.best && !merker.includes(N.t)) merker.push(N.t);
        if (nr === 0) innlegg.push({ konto: v.tekst.split(" ")[0], tekst: "Hei Fjordvik! 👋", likes: Math.max(0, v.f) });
        else innlegg.push({ konto: konto, tekst: v.tekst, likes: Math.max(0, v.f) });
        $("lgf-svar").innerHTML = '<div class="lgf-tilbake' + (v.best ? " best" : "") + '"><p>' + (v.best ? "<strong>" + T.ikon + " Du har lært teknikken «" + esc(T.navn) + "».</strong> " : "") + esc(v.svar) + "</p>" + (!v.best ? '<p class="lgf-hint">Tips: Hvilket av de andre valgene ville gitt flest følgere? Det er teknikken «' + esc(T.navn) + '».</p>' : "") + '<p class="lgf-kjenn"><strong>Slik kjenner du det igjen:</strong> ' + esc(T.kjenn) + '</p><button type="button" class="knapp hoved" id="lgf-neste">' + (nr + 1 < NIVAER.length ? "Neste nivå →" : "Til avsløringen →") + "</button></div>";
        document.querySelector(".lgf-side").innerHTML = status() + feed();
        $("lgf-neste").focus();
        $("lgf-neste").addEventListener("click", () => { nr++; if (nr < NIVAER.length) niva(); else avsloring(); });
      }));
    }

    function avsloring() {
      const test = bland(TEST);
      $("innhold").innerHTML = hode + '<header class="sidehode"><p class="overlinje">🚨 Avsløringen</p><h1 tabindex="-1" id="lgf-h">Spillet er over</h1><p class="ingress">Du endte med <strong>' + folgere.toLocaleString("nb-NO") + " følgere</strong>. I virkeligheten er det ikke du som er skurken – men du har nå sett triksene innenfra. Her er de seks teknikkene, og hvordan du kjenner dem igjen:</p></header>" +
        '<ul class="lgf-oversikt">' + TEKNIKKER.map(t => '<li><span class="lgf-oversikt-ikon" aria-hidden="true">' + t.ikon + "</span><div><h2>" + esc(t.navn) + "</h2><p>" + esc(t.kjenn) + "</p></div></li>").join("") + "</ul>" +
        '<section class="le-del"><h2>Test deg selv: Hvilken teknikk er dette?</h2><ol class="lgf-test">' + test.map((q, i) => '<li><p class="lgf-testtekst">' + esc(q.tekst) + '</p><fieldset><legend class="skjult-visuelt">Teknikk i innlegg ' + (i + 1) + "</legend>" + TEKNIKKER.map(t => '<label><input type="radio" name="lgf-t' + i + '" value="' + t.id + '"> ' + t.ikon + " " + esc(t.navn) + "</label>").join("") + '</fieldset><p class="lgf-testsvar" id="lgf-ts' + i + '" aria-live="polite"></p></li>').join("") + '</ol><p><button type="button" class="knapp hoved" id="lgf-sjekk">Sjekk svarene</button> <span id="lgf-poeng" role="status" aria-live="polite"></span></p></section>' +
        '<section class="le-del"><h2>Tenk etter</h2>' + [["lgf-r1", "Hvilken teknikk tror du er vanligst på sosiale medier du bruker? Gi et eksempel (uten navn)."], ["lgf-r2", "Hvorfor tror du desinformasjon ofte sprer seg raskere enn sannheten?"], ["lgf-r3", "Hva kan du gjøre neste gang du ser et innlegg som gjør deg sint eller redd?"]].map(([id, l]) => '<label class="mu-notat" for="' + id + '"><span>' + l + '</span><textarea id="' + id + '" rows="3"></textarea></label>').join("") +
        '<p><button type="button" class="knapp" id="lgf-igjen">↻ Spill igjen</button> <a class="knapp" href="kildedetektiv.html">Til Kildedetektiven →</a></p></section>';
      $("lgf-h").focus();
      $("lgf-sjekk").addEventListener("click", () => {
        let p = 0;
        test.forEach((q, i) => {
          const v = document.querySelector('input[name="lgf-t' + i + '"]:checked'), riktig = TEKNIKKER.find(t => t.id === q.svar);
          const ok = v && v.value === q.svar; if (ok) p++;
          $("lgf-ts" + i).textContent = !v ? "Du har ikke svart." : ok ? "✔ Riktig!" : "✘ Det er " + riktig.ikon + " " + riktig.navn + ".";
          $("lgf-ts" + i).className = "lgf-testsvar " + (ok ? "ok" : "feil");
        });
        $("lgf-poeng").textContent = p + " av " + test.length + " riktige." + (p === test.length ? " Du er vaksinert! 💉" : "");
      });
      $("lgf-igjen").addEventListener("click", start);
      const linje = document.createElement("div");
      linje.className = "svarlinje";
      linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
      if (!document.querySelector(".svarlinje")) document.body.appendChild(linje);
    }
    start();
  });
})();
