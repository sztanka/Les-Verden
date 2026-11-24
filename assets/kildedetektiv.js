/* =========================================================
   Les verden – Kildedetektiven (kildedetektiv.html)
   Eleven ser et (oppdiktet) innlegg, undersøker sporene og avgjør:
   troverdig, ikke troverdig eller usikker. Ingenting lagres.
   ?sprak=nb / ?sprak=en filtrerer sakene etter språk.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const DOM = {
    sann: { ikon: "✅", nb: "Troverdig", en: "Trustworthy" },
    falsk: { ikon: "❌", nb: "Ikke troverdig", en: "Not trustworthy" },
    usikker: { ikon: "❓", nb: "Usikker – må sjekkes mer", en: "Not sure – needs checking" }
  };

  function bygg() {
    const sp = LV.param("sprak");
    let saker = bland(LV.kildedetektiv.filter(s => !sp || s.sprak === sp));
    let n = 0, poeng = 0, sporBrukt = 0;
    document.title = "Kildedetektiven – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › Kildedetektiven</nav>' +
      '<header class="sidehode"><p class="overlinje">Kildekritikk</p><h1>🕵️ Kildedetektiven</h1><p class="ingress">Kan du stole på det du ser på nettet? Undersøk sporene – avsender, dato, bilde og andre kilder – og avgjør om innlegget er troverdig. Alle innleggene, kontoene og avisene er oppdiktet.</p><a class="mu-banner" href="lateral.html"><span class="mu-banner-ikon" aria-hidden="true">↔️</span><span><strong>Lateral lesing</strong><span>Sjekk en ukjent nettside slik faktasjekkere gjør: Forlat siden og søk etter hvem som står bak.</span></span><span aria-hidden="true">→</span></a><a class="mu-banner" href="lognfabrikk.html"><span class="mu-banner-ikon" aria-hidden="true">🏭</span><span><strong>Løgnfabrikken</strong><span>Lær triksene innenfra: Spill skurken som sprer desinformasjon – og avslør teknikkene.</span></span><span aria-hidden="true">→</span></a>' +
      '<div class="kd-filter" role="group" aria-label="Språk"><a class="knapp liten" href="kildedetektiv.html"' + (!sp ? ' aria-current="true"' : "") + '>Alle saker</a><a class="knapp liten" href="kildedetektiv.html?sprak=nb"' + (sp === "nb" ? ' aria-current="true"' : "") + '>🇳🇴 Bare norsk</a><a class="knapp liten" href="kildedetektiv.html?sprak=en"' + (sp === "en" ? ' aria-current="true"' : "") + ' lang="en">🇬🇧 Only English</a></div><p class="mu-intro">Sakene her er oppdiktet. Vil du jobbe med <strong>ekte kilder fra historien</strong>? Prøv <a href="kilder.html">Kildeanalyse</a>.</p></header>' +
      '<div class="kd-romvalg"><p id="kd-romknapp"><button type="button" class="knapp" id="kd-romstart">📱 La hele klassen svare på mobilen (romkode)</button></p><div id="kd-rom"></div></div>' +
      '<div class="kd-rad"><section class="kd-sak" id="kd-sak" aria-live="polite"></section><aside class="kd-sjekk"><h2>🔎 Detektivens sjekkliste</h2><ol><li><strong>Hvem</strong> står bak? Kan du finne ut mer om avsenderen?</li><li><strong>Når</strong> ble det publisert? Er det gammelt innhold i en ny sammenheng?</li><li><strong>Hvor</strong> kommer bildet eller tallet fra? Prøv omvendt bildesøk.</li><li><strong>Hva sier andre</strong> pålitelige kilder?</li><li><strong>Hvorfor</strong> ble det laget? For å informere, selge, skremme eller få klikk?</li><li><strong>Fakta eller mening?</strong></li></ol><p class="kd-poeng" id="kd-poeng"></p><p><a href="tema.html?id=sf8-kildekritikk">Les mer om kildekritikk →</a></p></aside></div>';

    const vis = () => {
      const s = saker[n];
      if (!s) { ferdig(); return; }
      const en = s.sprak === "en";
      $("kd-sak").innerHTML = '<p class="kd-nr">Sak ' + (n + 1) + " av " + saker.length + "</p>" +
        '<article class="kd-innlegg"' + (en ? ' lang="en"' : "") + '><div class="kd-hode"><span class="kd-avatar" aria-hidden="true">' + esc(s.avsender.navn.charAt(0)) + '</span><div><strong>' + esc(s.avsender.navn) + "</strong><small>" + esc(s.avsender.konto) + " · " + esc(s.dato) + '</small></div><span class="kd-type">' + esc(s.type) + "</span></div>" +
        '<p class="kd-tekst">' + esc(s.tekst) + "</p>" + (s.bilde ? '<div class="kd-bilde" role="img" aria-label="' + esc(s.bilde.tekst) + '"><span aria-hidden="true">' + s.bilde.ikon + "</span><small>" + esc(s.bilde.tekst) + "</small></div>" : "") +
        '<p class="kd-info">ℹ️ ' + esc(s.avsender.info) + "</p></article>" +
        '<h2 class="kd-h">1. Undersøk sporene</h2><div class="kd-spor">' + s.spor.map((x, i) => '<details data-i="' + i + '"><summary' + (en ? ' lang="en"' : "") + ">🔍 " + esc(x.navn) + "</summary><p" + (en ? ' lang="en"' : "") + ">" + esc(x.tekst) + "</p></details>").join("") + "</div>" +
        '<h2 class="kd-h">2. Hva mener du?</h2><div class="kd-valg">' + ["sann", "falsk", "usikker"].map(k => '<button type="button" class="knapp kd-dom" data-dom="' + k + '">' + DOM[k].ikon + " " + DOM[k].nb + "</button>").join("") + '</div><div class="kd-svar" id="kd-svar"></div>';
      if (K) {
        $("kd-svar").insertAdjacentHTML("beforebegin", '<div class="kd-klasse" id="kd-klasse" aria-live="polite"></div>');
        visKlasse = false;
        K.spor({ id: "sak" + (++sporNr), type: "valg", tekst: "Sak " + (n + 1) + ": Se på tavla. Er innlegget troverdig?", valg: ["sann", "falsk", "usikker"].map(k => ({ id: k, tekst: DOM[k].nb, ikon: DOM[k].ikon, farge: FARGE[k] })) });
        klasse();
      }
      document.querySelectorAll(".kd-spor details").forEach(d => d.addEventListener("toggle", () => { if (d.open && !d.dataset.sett) { d.dataset.sett = 1; sporBrukt++; } }, { once: false }));
      document.querySelectorAll(".kd-dom").forEach(b => b.addEventListener("click", () => svar(b.dataset.dom)));
      $("kd-poeng").textContent = n ? "Poeng: " + poeng + " av " + n : "";
    };
    const svar = dom => {
      const s = saker[n], ok = dom === s.svar, en = s.sprak === "en";
      if (ok) poeng++;
      document.querySelectorAll(".kd-dom").forEach(b => { b.disabled = true; b.classList.toggle("kd-riktig", b.dataset.dom === s.svar); b.classList.toggle("kd-feil", b.dataset.dom === dom && !ok); });
      document.querySelectorAll(".kd-spor details").forEach(d => { d.open = true; });
      $("kd-svar").innerHTML = '<div class="kd-fasit ' + (ok ? "ok" : "ikke") + '"><p><strong>' + (ok ? "✔ Godt jobbet, detektiv!" : "✘ Ikke helt.") + "</strong> Riktig svar: " + DOM[s.svar].ikon + " " + DOM[s.svar].nb + "</p><p" + (en ? ' lang="en"' : "") + ">" + esc(s.forklaring) + '</p><p class="kd-laerdom"' + (en ? ' lang="en"' : "") + ">💡 " + esc(s.laerdom) + '</p></div><button class="knapp hoved" type="button" id="kd-neste">' + (n < saker.length - 1 ? "Neste sak →" : "Se resultatet") + "</button>";
      if (K) {
        K.lukkSporsmal(id => { const v = K.svar.get(id); return (v ? "Du svarte: " + DOM[v].ikon + " " + DOM[v].nb + (v === s.svar ? " ✔" : " ✘") + "\n" : "") + "Fasit: " + DOM[s.svar].ikon + " " + DOM[s.svar].nb + ". Se forklaringen på tavla."; });
        visKlasse = true; klasse();
      }
      $("kd-neste").addEventListener("click", () => { n++; vis(); $("kd-sak").scrollIntoView({ behavior: "smooth", block: "start" }); });
      $("kd-neste").focus();
      $("kd-poeng").textContent = "Poeng: " + poeng + " av " + (n + 1);
    };
    const ferdig = () => {
      const andel = poeng / saker.length;
      $("kd-sak").innerHTML = '<div class="kd-slutt"><p class="kd-merke" aria-hidden="true">' + (andel === 1 ? "🏆" : andel >= .7 ? "🥇" : andel >= .4 ? "🔎" : "🧭") + "</p><h2>Du løste " + poeng + " av " + saker.length + " saker</h2><p>" +
        (andel === 1 ? "Mesterdetektiv! Du lar deg ikke lure." : andel >= .7 ? "Skarpt! Du har et godt kildekritisk blikk." : andel >= .4 ? "Godt i gang. Bruk sjekklista og undersøk alle sporene neste gang." : "Det er ikke lett! Les om kildekritikk og prøv igjen.") +
        "</p><p>Du åpnet " + sporBrukt + " spor underveis.</p>" + '<button class="knapp hoved" type="button" id="kd-igjen">↺ Spill igjen</button></div>';
      $("kd-igjen").addEventListener("click", () => { saker = bland(saker); n = 0; poeng = 0; sporBrukt = 0; vis(); });
    };
    // ---------- Hele klassen svarer (romkode) ----------
    let K = null, sporNr = 0, visKlasse = false;
    const FARGE = { sann: "#23703f", falsk: "#a32626", usikker: "#8a6a00" };
    function klasse() {
      const el = $("kd-klasse"); if (!el || !K) return;
      const a = { sann: 0, falsk: 0, usikker: 0 }; K.svar.forEach(v => { if (v in a) a[v]++; });
      const sum = K.svar.size, besvart = !!document.querySelector(".kd-dom[disabled]");
      el.innerHTML = '<p>📱 <strong>' + sum + "</strong> av " + K.antall() + " har svart. " +
        '<button type="button" class="knapp liten" id="kd-visklasse" aria-pressed="' + visKlasse + '">' + (visKlasse ? "Skjul klassens svar" : "Vis klassens svar") + "</button>" +
        (besvart ? "" : ' <button type="button" class="knapp liten hoved" id="kd-flertall"' + (sum ? "" : " disabled") + ">✔ Avslør fasit (klassens flertall teller)</button>") + "</p>" +
        (visKlasse ? '<ul class="hj-stolper">' + Object.keys(a).map(k => '<li><span class="hj-stolpenavn">' + DOM[k].ikon + " " + DOM[k].nb + '</span><span class="hj-stolpe"><span style="width:' + (sum ? a[k] / sum * 100 : 0) + "%;background:" + FARGE[k] + '"></span></span><strong>' + a[k] + "</strong></li>").join("") + "</ul>" : "");
    }
    $("innhold").addEventListener("click", e => {
      if (e.target.closest("#kd-visklasse")) { visKlasse = !visKlasse; klasse(); }
      else if (e.target.closest("#kd-flertall") && K && K.svar.size) {
        const a = { sann: 0, falsk: 0, usikker: 0 }; K.svar.forEach(v => { if (v in a) a[v]++; });
        const maks = Math.max(...Object.values(a)), beste = Object.keys(a).filter(k => a[k] === maks);
        const b = document.querySelector('.kd-dom[data-dom="' + beste[Math.floor(Math.random() * beste.length)] + '"]'); if (b) b.click();
      }
    });
    $("kd-romstart").addEventListener("click", async () => {
      $("kd-romknapp").hidden = true;
      try {
        await LV.lastSkript("assets/rom.js"); await LV.lastSkript("assets/romklasse.js");
        K = await LV.romKlasse.apne($("kd-rom"), { tittel: "Kildedetektiven", onSvar: klasse, onEndret: klasse, onLukket: () => { K = null; $("kd-romknapp").hidden = false; const el = $("kd-klasse"); if (el) el.remove(); } });
        vis();
      } catch (er) { $("kd-rom").textContent = "Klarte ikke å åpne rommet. " + (LV.rom ? LV.rom.feilTekst(er) : ""); $("kd-romknapp").hidden = false; }
    });
    vis();
  }
  document.addEventListener("DOMContentLoaded", bygg);
})();
