/* =========================================================
   Les verden – Ordfører for en dag (kommune.html)
   Tre år som ordfører i den oppdiktede kommunen Fjordvik:
   budsjett → dilemma → reaksjoner, og til slutt kommunevalg.
   Data: data/kommune.js. Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const fmt = t => esc(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const AR = 3;

  function bygg() {
    const K = LV.kommune;
    document.title = "Ordfører for en dag – " + (LV.config ? LV.config.navn : "Les verden");
    let ar, fordeling, varig, engang, tilfreds, dilemmaer, logg;

    const nullstill = () => {
      ar = 1; varig = 0; engang = 0; logg = [];
      fordeling = Object.fromEntries(K.omrader.map(o => [o.id, o.start]));
      tilfreds = Object.fromEntries(K.grupper.map(g => [g.id, 50]));
      dilemmaer = bland(K.dilemmaer).slice(0, AR);
    };
    const total = () => K.budsjett + varig + engang;
    const brukt = () => Object.values(fordeling).reduce((a, b) => a + b, 0);
    const klem = v => Math.max(0, Math.min(100, v));
    const oppslutning = () => Math.round(K.grupper.reduce((s, g) => s + g.andel * klem(tilfreds[g.id]), 0) / 100);

    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › Ordfører for en dag</nav>' +
      '<header class="sidehode"><p class="overlinje">Spill · demokrati</p><h1>🏛️ Ordfører for en dag</h1><p class="ingress">Du er nyvalgt ordfører i den oppdiktede kommunen <strong>' + K.navn + '</strong> med 8 000 innbyggere. I tre år skal du fordele pengene, ta vanskelige valg og lytte til innbyggerne. Så kommer valget: Vil de stemme på deg igjen?</p></header>' +
      '<div id="ko-spill" class="ko-spill"></div>';

    const sporer = () => '<div class="ko-sporer" aria-label="Status"><span>📅 År ' + ar + " av " + AR + "</span><span>💰 Budsjett: <strong>" + total() + " mill.</strong></span><span>🗳️ Oppslutning nå: <strong>" + oppslutning() + " %</strong></span></div>";

    const grupperHtml = (endring) => '<ul class="ko-grupper">' + K.grupper.map(g => {
      const v = klem(Math.round(tilfreds[g.id])), d = endring ? Math.round(endring[g.id] || 0) : 0;
      return '<li><span class="ko-gnavn"><span aria-hidden="true">' + g.ikon + "</span> " + esc(g.navn) + ' <small>(' + g.andel + ' % av velgerne)</small></span><span class="ko-bar" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + v + '" aria-label="' + esc(g.navn) + ' fornøyd"><span style="width:' + v + '%" class="' + (v >= 60 ? "god" : v >= 40 ? "middels" : "lav") + '"></span></span><span class="ko-tall">' + v + (d ? ' <small class="' + (d > 0 ? "opp" : "ned") + '">' + (d > 0 ? "▲" : "▼") + Math.abs(d) + "</small>" : "") + "</span></li>";
    }).join("") + "</ul>";

    function intro() {
      $("ko-spill").innerHTML = '<section class="ko-kort"><h2>Slik fungerer en kommune</h2><ul>' + K.fakta.map(f => "<li>" + fmt(f) + "</li>").join("") + "</ul>" +
        "<h3>Slik spiller du</h3><ol><li>Hvert år fordeler du budsjettet på sju områder. Noen områder har en <strong>minstegrense</strong> fordi tjenestene er lovpålagte.</li><li>Så må du ta et vanskelig valg.</li><li>Etterpå ser du hvordan seks grupper av velgere reagerer.</li><li>Etter tre år er det valg. Får du over 50 % oppslutning, blir du gjenvalgt.</li></ol>" +
        '<button type="button" class="knapp hoved" id="ko-start">Start som ordfører →</button></section>';
      $("ko-start").addEventListener("click", budsjett);
    }

    function budsjett() {
      const tegn = () => {
        const igjen = total() - brukt();
        const under = K.omrader.filter(o => fordeling[o.id] < o.min);
        $("ko-spill").innerHTML = sporer() + '<section class="ko-kort"><h2>Budsjettet for år ' + ar + "</h2><p>Fordel <strong>" + total() + " millioner kroner</strong>. Hvert trykk flytter " + K.steg + " millioner." + (engang ? " (Dette året er budsjettet " + (engang > 0 ? "større" : "mindre") + " på grunn av valget i fjor.)" : "") + "</p>" +
          '<ul class="ko-omrader">' + K.omrader.map(o => {
            const v = fordeling[o.id], lav = v < o.min;
            return '<li class="' + (lav ? "lav" : "") + '"><div class="ko-otekst"><strong><span aria-hidden="true">' + o.ikon + "</span> " + esc(o.navn) + "</strong><small>" + esc(o.tekst) + (o.min ? " Minst " + o.min + " mill. (lovkrav)." : "") + '</small></div><div class="ko-juster"><button type="button" class="knapp liten" data-o="' + o.id + '" data-d="-1" aria-label="Mindre til ' + esc(o.navn) + '">−</button><output aria-live="polite">' + v + ' mill.</output><button type="button" class="knapp liten" data-o="' + o.id + '" data-d="1" aria-label="Mer til ' + esc(o.navn) + '"' + (igjen <= 0 ? " disabled" : "") + ">+</button></div></li>";
          }).join("") + "</ul>" +
          '<p class="ko-igjen ' + (igjen === 0 ? "ok" : "") + '" role="status">' + (igjen > 0 ? "Du har <strong>" + igjen + " millioner</strong> igjen å fordele." : igjen < 0 ? "Du har brukt <strong>" + (-igjen) + " millioner for mye</strong>. Kutt et sted!" : "✔ Alle pengene er fordelt.") + "</p>" +
          (under.length ? '<p class="ko-advarsel">⚠️ Statsforvalteren advarer: ' + under.map(o => esc(o.navn)).join(" og ") + " får mindre enn loven krever.</p>" : "") +
          '<button type="button" class="knapp hoved" id="ko-vedta"' + (igjen !== 0 || under.length ? " disabled" : "") + ">Vedta budsjettet</button></section>";
        $("ko-spill").querySelectorAll("[data-o]").forEach(b => b.addEventListener("click", () => {
          const o = b.dataset.o, rest = total() - brukt();
          // Pluss: høyst det som er igjen. Minus: ned til nærmeste hele tier (eller én tier ned).
          if (+b.dataset.d > 0) fordeling[o] += Math.min(K.steg, rest);
          else fordeling[o] = Math.max(0, fordeling[o] % K.steg ? fordeling[o] - fordeling[o] % K.steg : fordeling[o] - K.steg);
          tegn();
          const ny = $("ko-spill").querySelector('[data-o="' + o + '"][data-d="' + b.dataset.d + '"]'); if (ny && !ny.disabled) ny.focus();
        }));
        $("ko-vedta").addEventListener("click", vedta);
      };
      tegn();
    }

    function vedta() {
      const endring = {};
      K.grupper.forEach(g => {
        let d = 0;
        K.omrader.forEach(o => { d += (g.vekt[o.id] || 0) * ((fordeling[o.id] - o.start) / K.steg) * 1.5; });
        // Avtagende effekt: velgerne vurderer endringen fra i fjor, ikke bare totalen
        d = Math.max(-15, Math.min(15, d)) / (ar === 1 ? 1 : 2);
        endring[g.id] = d; tilfreds[g.id] += d;
      });
      logg.push({ ar, type: "budsjett", tekst: "Budsjett: " + K.omrader.map(o => o.navn + " " + fordeling[o.id]).join(", ") });
      engang = 0;
      dilemma(endring);
    }

    function dilemma(budsjettEndring) {
      const d = dilemmaer[ar - 1];
      $("ko-spill").innerHTML = sporer() + '<section class="ko-kort ko-dilemma"><p class="overlinje">Saken som splitter Fjordvik</p><h2>' + esc(d.tittel) + "</h2><p>" + esc(d.tekst) + '</p><div class="fo-valg" role="group" aria-label="Hva bestemmer du?">' +
        d.valg.map((v, i) => '<button type="button" class="fo-valgknapp" data-i="' + i + '">' + esc(v.t) + "</button>").join("") + "</div></section>";
      $("ko-spill").querySelectorAll(".fo-valgknapp").forEach(b => b.addEventListener("click", () => {
        const v = d.valg[+b.dataset.i], endring = Object.assign({}, budsjettEndring);
        Object.entries(v.g || {}).forEach(([g, x]) => { tilfreds[g] += x; endring[g] = (endring[g] || 0) + x; });
        if (v.b) { if (v.engang) engang += v.b; else varig += v.b; }
        logg.push({ ar, type: "dilemma", tekst: d.tittel + ": " + v.t });
        reaksjon(v, endring);
      }));
      $("ko-spill").querySelector("h2").scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function reaksjon(v, endring) {
      const best = K.grupper.slice().sort((a, b) => (endring[b.id] || 0) - (endring[a.id] || 0));
      $("ko-spill").innerHTML = sporer() + '<section class="ko-kort"><p class="ko-avis"><span class="ko-avisnavn">Fjordvik-Posten</span>' + esc(v.nyhet) + "</p>" +
        "<h2>Hvordan reagerer innbyggerne?</h2>" + grupperHtml(endring) +
        '<p class="mu-intro">Mest fornøyd i år: <strong>' + esc(best[0].navn) + "</strong>. Minst fornøyd: <strong>" + esc(best[best.length - 1].navn) + "</strong>.</p>" +
        (v.b ? "<p>💰 Valget ditt gjør at budsjettet blir " + (v.b > 0 ? Math.abs(v.b) + " millioner større" : Math.abs(v.b) + " millioner mindre") + (v.engang ? " neste år." : " hvert år framover.") + "</p>" : "") +
        '<button type="button" class="knapp hoved" id="ko-videre">' + (ar < AR ? "Til år " + (ar + 1) + " →" : "🗳️ Til kommunevalget →") + "</button></section>";
      $("ko-videre").addEventListener("click", () => { if (ar < AR) { ar++; budsjett(); } else valg(); });
      $("ko-videre").focus();
    }

    function valg() {
      const p = oppslutning(), vant = p > 50;
      const fornoyd = K.grupper.filter(g => tilfreds[g.id] >= 60).map(g => g.navn), misfornoyd = K.grupper.filter(g => tilfreds[g.id] < 40).map(g => g.navn);
      $("ko-spill").innerHTML = '<section class="ko-kort ko-valg"><p class="kd-merke" aria-hidden="true">' + (vant ? "🎉" : "📉") + "</p><h2>Kommunevalget: " + p + " %</h2><p class=\"ko-valgtekst\">" +
        (vant ? "Gratulerer! Du er gjenvalgt som ordfører i Fjordvik." : p >= 40 ? "Det ble jevnt, men du mister flertallet. Kanskje kan du samarbeide med et annet parti?" : "Velgerne vil ha en ny ordfører. Prøv igjen – med en annen strategi?") + "</p>" +
        grupperHtml(null) +
        (fornoyd.length ? "<p>😊 Mest fornøyd: " + esc(fornoyd.join(", ")) + ".</p>" : "") + (misfornoyd.length ? "<p>😠 Mest misfornøyd: " + esc(misfornoyd.join(", ")) + ".</p>" : "") +
        '<h3>Det du bestemte</h3><ol class="fo-vei">' + logg.filter(l => l.type === "dilemma").map(l => "<li>År " + l.ar + ": " + esc(l.tekst) + "</li>").join("") + "</ol>" +
        '<p><button type="button" class="knapp hoved" id="ko-igjen">↺ Spill igjen</button> <a class="knapp" href="tema.html?id=sf8-demokratiet-i-norge">Les om demokratiet i Norge →</a></p></section>' +
        '<section class="fo-oppgaver"><h2>Snakk og skriv</h2><ol>' + [
          "Hvilken gruppe var vanskeligst å gjøre fornøyd? Hvorfor?",
          "Hvorfor kan ikke ordføreren bare gi alle det de vil ha?",
          "Hvilket valg var vanskeligst for deg, og hvordan begrunnet du det?",
          "I virkeligheten bestemmer ikke ordføreren alene. Hvem andre er med på å vedta budsjettet?"
        ].map((s, i) => '<li><label for="ko-s-' + i + '">' + esc(s) + '</label><textarea id="ko-s-' + i + '" rows="3"></textarea></li>').join("") +
        '</ol><h3>✍️ Skriveoppgave</h3><label for="ko-skriv">Skriv en kort valgtale der du forklarer innbyggerne hva du har gjort de tre årene – og hvorfor de bør stemme på deg.</label><textarea id="ko-skriv" rows="8"></textarea></section>';
      $("ko-igjen").addEventListener("click", () => { nullstill(); intro(); window.scrollTo({ top: 0, behavior: "smooth" }); });
    }

    nullstill();
    intro();
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
  }
  document.addEventListener("DOMContentLoaded", bygg);
})();
