/* =========================================================
   Les verden – Byen vokser (byen.html)
   Bystyret i Elvebyen tar valg tiår for tiår, 1840–1910.
   Valgene ligger i adressen (#v=AB-C-…), så siden kan lastes på nytt
   og gruppa kan fortsette. Ingenting lagres – begrunnelsene kan
   lastes ned (svarfil.js). Data: data/byen.js.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const B = () => LV.byen;
  const tall = x => Math.round(x).toLocaleString("nb-NO");
  const klem = x => Math.max(0, Math.min(100, Math.round(x)));
  const VERDIER = ["bolig", "helse", "miljo", "skole", "tillit"];

  // ---------- Simuleringen ----------
  function tiaar(s, runde, valgte) {
    const n = Object.assign({}, s);
    valgte.forEach(id => {
      const v = runde.valg.find(x => x.id === id); if (!v) return;
      n.kasse -= v.k; n.fab = Math.max(0, n.fab + (v.fab || 0)); if (v.vann) n.vann = 1;
      VERDIER.forEach(k => { n[k] = klem(n[k] + (v[k] || 0)); });
    });
    // Ti år går
    const vekst = Math.min(0.6, 0.06 + 0.05 * n.fab + (n.vann ? 0.02 : 0));
    n.folk = s.folk * (1 + vekst);
    n.bolig = klem(n.bolig - vekst * 35);
    n.miljo = klem(n.miljo - 2 * n.fab + (n.vann ? 2 : 0));
    const mal = 0.35 * n.bolig + 0.3 * n.miljo + 0.15 * n.skole + 20 * n.vann + 12;
    n.helse = klem(n.helse + (mal - n.helse) * 0.4);
    n.tillit = klem(n.tillit - (n.bolig < 35 ? 6 : 0) - (n.helse < 35 ? 4 : 0) + (n.skole > 60 ? 3 : 0));
    n.kasse = Math.round(n.kasse + 8 + 4 * n.fab + n.folk / 5000);
    n.aar = s.aar + 10;
    return n;
  }
  const dod = s => Math.round(38 - 0.25 * s.helse);
  function spill(valg) {
    const hist = [Object.assign({}, B().start)];
    valg.forEach((v, i) => hist.push(tiaar(hist[i], B().runder[i], v)));
    return hist;
  }

  // ---------- Visning ----------
  const stolpe = (s, k, f) => {
    const m = B().maal.find(x => x[0] === k), d = f ? s[k] - f[k] : 0;
    return '<li class="by-maal"><span class="by-mnavn"><span aria-hidden="true">' + m[1] + "</span> " + m[2] + '</span><span class="by-bar" role="img" aria-label="' + m[2] + ": " + s[k] + ' av 100"><span class="by-fyll by-' + (s[k] < 35 ? "lav" : s[k] < 65 ? "mid" : "hoy") + '" style="width:' + s[k] + '%"></span></span><span class="by-tall">' + s[k] +
      (d ? ' <span class="by-endring ' + (d > 0 ? "by-opp" : "by-ned") + '">' + (d > 0 ? "▲ +" : "▼ ") + d + "</span>" : "") + "</span></li>";
  };
  const panel = (s, f) => '<section class="by-panel" aria-label="Status for byen"><div class="by-nokkel"><div><span>År</span><strong>' + s.aar + '</strong></div><div><span>Innbyggere</span><strong>' + tall(s.folk) + '</strong></div><div><span>Fabrikker</span><strong>' + s.fab + '</strong></div><div><span>Bykassa</span><strong>💰 ' + s.kasse + '</strong></div><div><span>Dødsfall per 1000 per år</span><strong>' + dod(s) + "</strong></div></div>" +
    '<ul class="by-maalliste">' + VERDIER.map(k => stolpe(s, k, f)).join("") + "</ul>" + (s.vann ? '<p class="by-merke">🚰 Byen har vannverk og kloakk</p>' : "") + "</section>";

  function graf(hist) {
    const W = 640, H = 260, ml = 40, mr = 12, mt = 12, mb = 28;
    const x = i => ml + (W - ml - mr) * i / (hist.length - 1 || 1), y = v => mt + (H - mt - mb) * (1 - v / 100);
    const farger = { bolig: "#c2410c", helse: "#be123c", miljo: "#0e7490", skole: "#1d4ed8", tillit: "#15803d" };
    let s = "";
    [0, 25, 50, 75, 100].forEach(v => { s += '<line x1="' + ml + '" x2="' + (W - mr) + '" y1="' + y(v) + '" y2="' + y(v) + '" class="kl-rutenett"/><text x="' + (ml - 6) + '" y="' + (y(v) + 4) + '" text-anchor="end">' + v + "</text>"; });
    hist.forEach((h, i) => { s += '<text x="' + x(i) + '" y="' + (H - 8) + '" text-anchor="' + (i === hist.length - 1 ? "end" : i ? "middle" : "start") + '">' + h.aar + "</text>"; });
    VERDIER.forEach((k, j) => { s += '<path d="M' + hist.map((h, i) => x(i).toFixed(1) + "," + y(h[k]).toFixed(1)).join("L") + '" fill="none" stroke="' + farger[k] + '" stroke-width="3" stroke-dasharray="' + ["", "8 4", "2 4", "12 4 2 4", "4 2"][j] + '"/>'; });
    const siste = hist[hist.length - 1];
    return '<svg viewBox="0 0 ' + W + " " + H + '" class="kl-svg" role="img" aria-label="Utviklingen i byen fra ' + hist[0].aar + " til " + siste.aar + ": " + B().maal.map(m => m[2] + " fra " + hist[0][m[0]] + " til " + siste[m[0]]).join(", ") + '">' + s + "</svg>" +
      '<ul class="kl-forklaring">' + B().maal.map(([k, ik, n], j) => '<li><svg width="28" height="10" aria-hidden="true"><line x1="0" x2="28" y1="5" y2="5" stroke="' + farger[k] + '" stroke-width="3" stroke-dasharray="' + ["", "8 4", "2 4", "12 4 2 4", "4 2"][j] + '"/></svg> ' + n + "</li>").join("") + "</ul>";
  }

  function bygg() {
    const h = new URLSearchParams(location.hash.slice(1));
    const valg = (h.get("v") || "").split("-").filter(x => x !== "").slice(0, B().runder.length).map(x => x === "0" ? [] : x.split("").filter(c => "ABCD".includes(c)).slice(0, 2));
    const vist = h.get("vis") === "1"; // vis resultatet av siste runde
    const hist = spill(valg);
    const n = valg.length, s = hist[n];
    const ferdig = n >= B().runder.length && !vist;
    document.title = "Byen vokser – " + (LV.config ? LV.config.navn : "Les verden");
    const lenke = (v, vis) => "#v=" + (v.map(x => x.join("") || "0").join("-")) + (vis ? "&vis=1" : "");

    let html = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › Byen vokser</nav>' +
      '<header class="sidehode"><p class="overlinje">Simulering · samfunnsfag 9. trinn</p><h1>🏭 Byen vokser</h1><p class="ingress">Dere er bystyret i ' + esc(B().navn) + ", en oppdiktet norsk by ved en elv med mange fosser. Det er 1840, og industrialiseringen er på vei. I sju runder – én for hvert tiår – velger dere hva byen skal bruke pengene på. Velg to tiltak i hver runde, og begrunn valgene.</p></header>";

    if (!n) html += '<details class="kl-laerer"><summary>For læreren</summary><p>Spillet fungerer best i grupper på 3–4 som diskuterer seg fram til valgene. En runde tar 5–8 minutter. Valgene lagres i adressen, så gruppa kan fortsette senere ved å bokmerke siden – men begrunnelsene må lastes ned med «Last ned svarene». Byen og tallene er oppdiktet; tiltakene og hendelsene bygger på norsk historie, og etter hver runde står det hva som skjedde i virkeligheten.</p><p>' + esc(B().kontroller) + "</p></details>";

    if (vist) {
      // Resultat av runden som nettopp ble vedtatt
      const r = B().runder[n - 1], f = hist[n - 1];
      html += '<section class="by-runde"><h2>' + r.aar + "–" + (r.aar + 10) + ": slik gikk det</h2>" + panel(s, f) +
        '<p class="by-folk">Byen vokste fra ' + tall(f.folk) + " til " + tall(s.folk) + " innbyggere." + (s.kasse < 10 ? " Bykassa er nesten tom." : "") + "</p>" +
        '<div class="by-ekte"><h3>📜 I virkeligheten</h3><p>' + esc(r.ekte) + "</p></div>" +
        '<p class="mu-kontroll"><a class="knapp hoved" href="' + lenke(valg) + '" id="by-videre">' + (n < B().runder.length ? "Videre til " + (r.aar + 10) + " →" : "Se hvordan det gikk med byen →") + "</a></p></section>";
    } else if (!ferdig) {
      const r = B().runder[n];
      html += panel(s) + '<section class="by-runde"><h2>' + r.aar + ": " + esc(r.tittel) + '</h2><p class="by-hendelse">' + esc(r.tekst) + "</p>" +
        '<fieldset class="by-valg"><legend>Velg inntil to tiltak. Bykassa har 💰 ' + s.kasse + "</legend>" +
        r.valg.map(v => '<label class="by-tiltak"><input type="checkbox" name="by-v" value="' + v.id + '"><span><strong>' + esc(v.tittel) + '</strong> <span class="by-kost">💰 ' + v.k + "</span><small>" + esc(v.tekst) + "</small></span></label>").join("") +
        '</fieldset><p class="by-status" id="by-status" aria-live="polite"></p><label for="by-b' + n + '">Begrunnelse: Hvorfor valgte dere disse tiltakene?</label><textarea id="by-b' + n + '" rows="3"></textarea>' +
        '<p class="mu-kontroll"><button type="button" class="knapp hoved" id="by-vedta">Vedta og la ti år gå →</button></p></section>';
    } else {
      html += '<section class="by-runde"><h2>1910: Elvebyen etter 70 år</h2>' + panel(s, hist[0]) + '<figure class="kl-graf">' + graf(hist) + "<figcaption>Utviklingen tiår for tiår (0–100). Innbyggere: " + hist.map(x => x.aar + ": " + tall(x.folk)).join(" · ") + "</figcaption></figure>" +
        '<div class="by-ekte"><h3>📜 I virkeligheten</h3><p>' + esc(B().slutt) + "</p></div></section>" +
        '<section class="kl-del"><h2>✍️ Tenk etter</h2>' + B().refleksjon.map((q, i) => '<label for="by-r' + i + '">' + esc(q) + '</label><textarea id="by-r' + i + '" rows="3"></textarea>').join("") + '<p class="mu-kontroll kl-start"><a class="knapp" href="byen.html" id="by-ny">↺ Spill på nytt</a></p></section>';
    }
    // Logg over tidligere runder, med begrunnelsene
    if (n) html += '<section class="kl-del"><h2>Vedtakene deres</h2><ol class="by-logg">' + valg.map((v, i) => { const r = B().runder[i]; return "<li><strong>" + r.aar + ": " + esc(r.tittel) + "</strong> – " + (v.length ? v.map(id => esc(r.valg.find(x => x.id === id).tittel)).join(" og ") : "ingen tiltak") +
      ('<label class="skjult-visuelt" for="by-b' + i + '">Begrunnelse ' + r.aar + '</label><textarea id="by-b' + i + '" rows="2" placeholder="Begrunnelse"></textarea>') + "</li>"; }).join("") + "</ol></section>";
    html += '<p class="fo-merk">Se også: <a href="tema.html?id=sf9-industrialiseringen">Industrialiseringen</a> · <a href="tema.html?id=sf9-arbeiderbevegelsen">Arbeiderbevegelsen</a> · <a href="fortelling.html?id=akerselva-1870">Velg din vei: Akerselva 1870</a> · <a href="tema.html?id=sf8-befolkning-urbanisering">Befolkning og urbanisering</a> · <a href="kommune.html">Ordfører for en dag</a></p>';
    const gml = {}; document.querySelectorAll("#innhold textarea").forEach(t => { gml[t.id] = t.value; });
    $("innhold").innerHTML = html;
    Object.keys(gml).forEach(id => { if ($(id) && !$(id).value) $(id).value = gml[id]; });

    if (!vist && !ferdig) {
      const r = B().runder[n];
      const boks = [...document.querySelectorAll('input[name="by-v"]')];
      const sjekk = () => {
        const valgt = boks.filter(b => b.checked), kost = valgt.reduce((x, b) => x + r.valg.find(v => v.id === b.value).k, 0);
        boks.forEach(b => { const v = r.valg.find(x => x.id === b.value); b.disabled = !b.checked && (valgt.length >= 2 || kost + v.k > s.kasse); });
        $("by-status").textContent = valgt.length ? "Valgt: " + valgt.length + " av 2 · koster 💰 " + kost + " · igjen etterpå: 💰 " + (s.kasse - kost) : "";
      };
      boks.forEach(b => b.addEventListener("change", sjekk)); sjekk();
      $("by-vedta").addEventListener("click", () => {
        const v = boks.filter(b => b.checked).map(b => b.value);
        location.hash = lenke(valg.concat([v]), true).slice(1);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    bygg();
    window.addEventListener("hashchange", () => { bygg(); const h = document.querySelector(".by-runde h2"); if (h) { h.setAttribute("tabindex", "-1"); h.focus(); } });
    const linje = document.createElement("div"); linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
  });
})();
