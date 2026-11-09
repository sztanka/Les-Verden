/* =========================================================
   Les verden – QR-leseløype (leseloype.html)
   Læreren lager en løype fra et tema: én post per avsnitt,
   med QR-kode som skrives ut og henges opp. Elevene skanner,
   leser og svarer på svararket. Hver post gir en kodebokstav.
   leseloype.html                         → lag løype (lærer)
   leseloype.html?tema=<id>&poster=0,1,2&ord=…&lett=1 → plakater
   leseloype.html?tema=<id>&post=<n>&av=<N>&k=<kode>  → post (elev)
   leseloype.html?tema=<id>&svar=1&poster=…           → svarark
   Ingenting lagres. QR-koder: assets/vendor/qrcode.js (MIT).
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const fmt = s => esc(String(s).replace(/\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g, "$1")).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  const hode = t => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › <a href="leseloype.html">QR-leseløype</a>' + (t ? " › " + esc(t) : "") + "</nav>";
  const kode = (bokstav, n) => btoa(encodeURIComponent(bokstav + "|" + n)).replace(/=+$/, "");
  const avkod = (k, n) => { try { const [b, m] = decodeURIComponent(atob(k)).split("|"); return +m === n ? b : ""; } catch (e) { return ""; } };
  const base = () => location.href.split(/[?#]/)[0];
  // Finn et fagbegrep i avsnittet som har en forklaring i temaets ordliste
  function begrep(tema, avsnitt) {
    const ord = tema.ord || {};
    const funn = [];
    avsnitt.tekst.forEach(p => { if (typeof p === "string") p.replace(/\[\[([^\]|]+)(?:\|([^\]]*))?\]\]/g, (_, vis, nokkel) => { const k = (nokkel || vis).trim(); const n = Object.keys(ord).find(x => x.toLowerCase() === k.toLowerCase()); if (n && !funn.some(f => f[1] === n)) funn.push([vis, n]); }); });
    return funn.length ? { vis: funn[0][0], forklaring: ord[funn[0][1]] } : null;
  }
  async function hentTema(id) { if (!LV.temaer.find(t => t.id === id)) throw 0; await LV.lastSkript("data/temaer/" + id + ".js"); return LV.tema; }

  // ---------- Lag løype ----------
  function lag() {
    document.title = "QR-leseløype – " + (LV.config ? LV.config.navn : "Les verden");
    const tema = LV.temaer.slice().sort((a, b) => a.fag.localeCompare(b.fag) || a.trinn - b.trinn || a.tittel.localeCompare(b.tittel));
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje">For læreren</p><h1>📍 QR-leseløype</h1><p class="ingress">Lag en leseløype fra et tema. Hvert avsnitt blir en post med QR-kode som du skriver ut og henger opp i klasserommet, i gangen eller ute. Elevene går i par, skanner koden, leser avsnittet og svarer på svararket. Hver post gir en kodebokstav – til sammen blir de et løsningsord.</p></header>' +
      '<form class="ly-velg ll-form" id="ll-form"><label for="ll-tema">Tema</label><select id="ll-tema" required><option value="">Velg et tema …</option>' +
      ["samfunnsfag", "engelsk"].map(f => '<optgroup label="' + (f === "engelsk" ? "Engelsk" : "Samfunnsfag") + '">' + tema.filter(t => t.fag === f).map(t => '<option value="' + t.id + '">' + t.trinn + ". trinn – " + esc(t.tittel) + "</option>").join("") + "</optgroup>").join("") + "</select>" +
      '<fieldset class="ll-poster" id="ll-poster" hidden><legend>Hvilke avsnitt skal bli poster?</legend><div id="ll-avsnitt"></div></fieldset>' +
      '<label for="ll-ord">Løsningsord (valgfritt, én bokstav per post)</label><input type="text" id="ll-ord" maxlength="12" autocomplete="off" placeholder="For eksempel FRIHET"><p class="ll-hint" id="ll-hint" aria-live="polite"></p>' +
      '<label class="ly-lett"><input type="checkbox" id="ll-lett"> Bruk lettere tekst når den finnes</label><button class="knapp hoved" type="submit">Lag løypa →</button></form>' +
      '<div class="ka-metode"><h2>Slik gjør du</h2><ol><li>Velg tema og avsnitt, og skriv eventuelt et løsningsord.</li><li>Skriv ut plakatene (én per side) og svararket.</li><li>Heng opp plakatene i tilfeldig rekkefølge.</li><li>Elevene går i par med én mobil eller nettbrett og ett svarark. De kan starte på hvilken post som helst.</li><li>Til slutt: Hvem har løsningsordet? Gå gjennom svarene i plenum.</li></ol><p>QR-kodene peker til denne nettsiden og virker når siden ligger på nettet. Ingenting lagres, og elevene trenger ingen innlogging.</p></div>';

    let valgt = null;
    const hint = () => {
      const n = document.querySelectorAll("#ll-avsnitt input:checked").length, o = $("ll-ord").value.replace(/\s/g, "");
      $("ll-hint").textContent = n ? n + " poster valgt." + (o ? (o.length > n ? " Løsningsordet er for langt – bruk høyst " + n + " bokstaver." : o.length < n ? " De siste " + (n - o.length) + " postene får en stjerne (★) i stedet for en bokstav." : " Én bokstav per post – perfekt!") : "") : "";
    };
    $("ll-tema").addEventListener("change", async () => {
      const id = $("ll-tema").value; if (!id) { $("ll-poster").hidden = true; return; }
      valgt = await hentTema(id);
      $("ll-avsnitt").innerHTML = valgt.avsnitt.map((a, i) => '<label><input type="checkbox" value="' + i + '"' + (i < 8 ? " checked" : "") + "> " + (i + 1) + ". " + esc(a.tittel) + "</label>").join("");
      $("ll-poster").hidden = false; hint();
    });
    $("ll-avsnitt").addEventListener("change", hint);
    $("ll-ord").addEventListener("input", hint);
    $("ll-form").addEventListener("submit", e => {
      e.preventDefault();
      const id = $("ll-tema").value, poster = [...document.querySelectorAll("#ll-avsnitt input:checked")].map(x => x.value), ord = $("ll-ord").value.replace(/\s/g, "").toUpperCase();
      if (!id || !poster.length) { $("ll-hint").textContent = "Velg tema og minst ett avsnitt."; return; }
      if (ord.length > poster.length) { $("ll-hint").textContent = "Løsningsordet er for langt – bruk høyst " + poster.length + " bokstaver."; $("ll-ord").focus(); return; }
      location.search = "?tema=" + encodeURIComponent(id) + "&poster=" + poster.join(",") + (ord ? "&ord=" + encodeURIComponent(kode(ord, 0)) : "") + ($("ll-lett").checked ? "&lett=1" : "");
    });
  }

  // ---------- Plakater ----------
  async function plakater(id, poster, ordKode, lett) {
    let t; try { t = await hentTema(id); } catch (e) { $("innhold").innerHTML = hode() + "<p>Fant ikke temaet.</p>"; return; }
    const ord = ordKode ? avkod(ordKode, 0) : "";
    poster = poster.filter(i => t.avsnitt[i]);
    document.title = "Leseløype: " + t.tittel;
    const lenke = (n, i) => base() + "?tema=" + encodeURIComponent(id) + "&post=" + (n + 1) + "&a=" + i + "&av=" + poster.length + "&k=" + encodeURIComponent(kode(ord[n] || "★", n + 1)) + (lett ? "&lett=1" : "");
    const svarark = base() + "?tema=" + encodeURIComponent(id) + "&svar=1&poster=" + poster.join(",") + (ord ? "&n=" + ord.length : "");
    const qr = (tekst, cell) => { const q = window.qrcode(0, "M"); q.addData(tekst); q.make(); return q.createSvgTag({ cellSize: cell, margin: cell * 2, scalable: true, alt: "QR-kode" }); };
    $("innhold").innerHTML = hode(t.tittel) +
      '<header class="sidehode ll-skjerm"><p class="overlinje">📍 QR-leseløype</p><h1>' + esc(t.tittel) + '</h1><p class="ingress">' + poster.length + " poster" + (ord ? " · løsningsord: <strong>" + esc(ord) + "</strong> (bare synlig for deg her)" : "") + (lett ? " · lettere tekst" : "") + '</p><p class="ll-knapper"><button type="button" class="knapp hoved" id="ll-skriv">🖨️ Skriv ut plakatene</button> <a class="knapp" href="' + esc(svarark) + '">📝 Åpne svararket</a> <a class="knapp" href="leseloype.html">← Lag en ny løype</a></p><p class="mu-intro">Tips: Prøv en QR-kode med mobilen før du skriver ut. QR-kodene virker bare når siden ligger på nettet (ikke når den åpnes som fil på datamaskinen).</p></header>' +
      '<div class="ll-plakater">' + poster.map((i, n) => '<article class="ll-plakat"><p class="ll-plakat-tema">' + esc(t.tittel) + '</p><p class="ll-plakat-nr">Post ' + (n + 1) + '</p><p class="ll-plakat-tittel">' + esc(t.avsnitt[i].tittel) + '</p><div class="ll-qr">' + qr(lenke(n, i), 6) + '</div><p class="ll-plakat-tips">Skann koden, les og svar på svararket.</p><p class="ll-lenke"><a href="' + esc(lenke(n, i)) + '">Åpne post ' + (n + 1) + "</a></p></article>").join("") + "</div>";
    $("ll-skriv").addEventListener("click", () => window.print());
  }

  // ---------- Post (elev) ----------
  async function post(id, n, a, av, k, lett) {
    let t; try { t = await hentTema(id); } catch (e) { $("innhold").innerHTML = hode() + "<p>Fant ikke posten.</p>"; return; }
    const avs = t.avsnitt[a]; if (!avs) { $("innhold").innerHTML = hode() + "<p>Fant ikke posten.</p>"; return; }
    const en = t.sprak === "en", lang = en ? ' lang="en"' : "";
    const tekst = (lett && avs.lett && avs.lett.length ? avs.lett : avs.tekst).filter(p => typeof p === "string");
    const b = begrep(t, avs), bokstav = avkod(k || "", n);
    document.title = "Post " + n + " – " + t.tittel;
    $("innhold").innerHTML = '<div class="ll-post"' + lang + '><p class="ll-post-topp" lang="nb">📍 Post ' + n + (av ? " av " + esc(av) : "") + " · " + esc(t.tittel) + "</p><h1>" + esc(avs.tittel) + '</h1><div class="ll-post-tekst">' + tekst.map(p => "<p>" + fmt(p) + "</p>").join("") + "</div>" +
      '<section class="ll-oppg" lang="nb"><h2>Skriv på svararket</h2><ol><li><strong>' + (en ? "Hva er det viktigste i denne delen? Skriv én setning (gjerne på engelsk)." : "Hva er det viktigste i denne delen? Skriv én setning.") + "</strong></li>" +
      (b ? "<li><strong>Forklar ordet «<span" + lang + ">" + esc(b.vis) + "</span>» med egne ord.</strong> " + '<button type="button" class="knapp liten" id="ll-vis-ord" aria-expanded="false" aria-controls="ll-ord-svar">Sjekk etterpå</button><span id="ll-ord-svar" class="ll-ord-svar" hidden' + lang + ">" + esc(b.forklaring) + "</span></li>" : "<li><strong>Skriv ett spørsmål du har etter å ha lest.</strong></li>") + "</ol>" +
      '<p><button type="button" class="knapp hoved" id="ll-kode" aria-expanded="false" aria-controls="ll-kode-svar">🔑 Vis kodebokstaven</button></p><p class="ll-kodebokstav" id="ll-kode-svar" hidden aria-live="polite">Kodebokstav for post ' + n + ': <strong>' + esc(bokstav || "★") + "</strong></p>" +
      '<p class="ll-hint">Ferdig? Gå videre til en post dere ikke har vært på.</p></section></div>';
    $("ll-kode").addEventListener("click", () => { $("ll-kode-svar").hidden = false; $("ll-kode").setAttribute("aria-expanded", "true"); });
    if (b) $("ll-vis-ord").addEventListener("click", () => { const s = $("ll-ord-svar"), apen = !s.hidden; s.hidden = apen; $("ll-vis-ord").setAttribute("aria-expanded", String(!apen)); });
  }

  // ---------- Svarark ----------
  async function svarark(id, poster, n) {
    let t; try { t = await hentTema(id); } catch (e) { $("innhold").innerHTML = hode() + "<p>Fant ikke temaet.</p>"; return; }
    poster = poster.filter(i => t.avsnitt[i]);
    document.title = "Svarark – " + t.tittel;
    $("innhold").innerHTML = hode("Svarark") + '<header class="sidehode"><p class="overlinje">📝 Svarark · QR-leseløype</p><h1>' + esc(t.tittel) + '</h1><p class="ingress">Dere kan starte på hvilken post som helst. Skriv svarene her (eller på det utskrevne arket), og noter kodebokstaven fra hver post.</p><p class="ll-knapper"><button type="button" class="knapp" id="ll-skriv">🖨️ Skriv ut svararket</button></p></header>' +
      '<ol class="ll-svarliste">' + poster.map((i, m) => { const b = begrep(t, t.avsnitt[i]), p = "ll-" + t.id + "-" + (m + 1); return '<li class="ll-svarpost"><h2>Post ' + (m + 1) + ": " + esc(t.avsnitt[i].tittel) + '</h2><label class="mu-notat" for="' + p + '-a"><span>Det viktigste i denne delen</span><textarea id="' + p + '-a" rows="2"></textarea></label><label class="mu-notat" for="' + p + '-b"><span>' + (b ? "Forklar ordet «" + esc(b.vis) + "»" : "Ett spørsmål jeg har") + '</span><textarea id="' + p + '-b" rows="2"></textarea></label><label class="ll-bokstav" for="' + p + '-k"><span>Kodebokstav</span><input type="text" id="' + p + '-k" maxlength="1" autocomplete="off"></label></li>'; }).join("") + "</ol>" +
      (n ? '<label class="mu-notat ll-losning" for="ll-' + t.id + '-ord"><span>Løsningsord (' + n + " bokstaver): Sett sammen bokstavene i rekkefølge fra post 1</span><input type=\"text\" id=\"ll-" + t.id + '-ord" maxlength="' + n + '" autocomplete="off"></label>' : "");
    $("ll-skriv").addEventListener("click", () => window.print());
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const P = k => LV.param(k), tema = P("tema");
    const liste = (P("poster") || "").split(",").filter(x => /^\d+$/.test(x)).map(Number);
    if (tema && P("post")) post(tema, parseInt(P("post"), 10) || 1, parseInt(P("a"), 10) || 0, P("av"), P("k"), P("lett") === "1");
    else if (tema && P("svar")) svarark(tema, liste, parseInt(P("n"), 10) || 0);
    else if (tema && liste.length) plakater(tema, liste, P("ord"), P("lett") === "1");
    else lag();
  });
})();
