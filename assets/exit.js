/* =========================================================
   Les verden – Exit ticket (exit.html)
   Korte «avslutningslapper» på slutten av timen. Fem varianter,
   valgfritt koblet til et tema (tittel og læringsmål). Vises på
   storskjerm, skrives ut fire på et ark, eller fylles ut digitalt.
   exit.html?v=321&tema=<id>[&elev=1]
   Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const V = {
    "321": { navn: "3–2–1", ikon: "3️⃣", nb: [["3 ting jeg lærte i dag", 3], ["2 ting jeg vil vite mer om", 2], ["1 spørsmål jeg har", 1]], en: [["3 things I learned today", 3], ["2 things I want to know more about", 2], ["1 question I have", 1]] },
    "uklart": { navn: "Klart og uklart", ikon: "🌫️", nb: [["Det som var klarest i dag:", 2], ["Det som var mest uklart (det «gjørmete punktet»):", 2]], en: [["The clearest thing today:", 2], ["The muddiest point – what was most unclear:", 2]] },
    "trodde": { navn: "Jeg trodde – nå tenker jeg", ikon: "💭", nb: [["Før timen trodde jeg at …", 2], ["Nå tenker jeg at …", 2]], en: [["Before the lesson I thought …", 2], ["Now I think …", 2]] },
    "ettord": { navn: "Ett ord og en skala", ikon: "🔤", nb: [["Beskriv dagens tema med ett ord – og forklar hvorfor:", 2], ["Hvor sikker er du på det vi lærte i dag? Sett ring: 1 – 2 – 3 – 4 – 5", 0]], en: [["Describe today's topic in one word – and explain why:", 2], ["How sure are you about what we learned today? Circle: 1 – 2 – 3 – 4 – 5", 0]] },
    "maal": { navn: "Læringsmål-sjekk", ikon: "🎯", nb: [["Det viktigste jeg lærte:", 2]], en: [["The most important thing I learned:", 2]], maal: true }
  };
  const hode = () => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="laerer.html">For lærere</a> › Exit ticket</nav>';
  const temaValg = (valgt) => '<select id="ex-tema"><option value="">Uten tema</option>' + ["samfunnsfag", "engelsk"].map(f => '<optgroup label="' + (f === "engelsk" ? "Engelsk" : "Samfunnsfag") + '">' + LV.temaer.filter(t => t.fag === f).sort((a, b) => a.trinn - b.trinn || a.tittel.localeCompare(b.tittel)).map(t => '<option value="' + t.id + '"' + (t.id === valgt ? " selected" : "") + ">" + t.trinn + ". trinn – " + esc(t.tittel) + "</option>").join("") + "</optgroup>").join("") + "</select>";

  async function hentTema(id) {
    if (!id || !LV.temaer.find(t => t.id === id)) return null;
    try { LV.tema = null; await LV.lastSkript("data/temaer/" + id + ".js"); return LV.tema; } catch (e) { return null; }
  }
  const ren = s => String(s).replace(/\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g, "$1").replace(/\*\*/g, "");

  async function side() {
    const v = V[LV.param("v")] ? LV.param("v") : "321", elev = LV.param("elev") === "1";
    const tema = await hentTema(LV.param("tema")), sp = tema && tema.sprak === "en" ? "en" : "nb", lang = sp === "en" ? ' lang="en"' : "";
    const def = V[v], felt = def[sp], maal = def.maal && tema ? (tema.maal || []) : [];
    const T = sp === "en" ? { kan: "I can …", valg: ["Not yet", "Partly", "Yes"], navn: "Name" } : { kan: "Jeg kan …", valg: ["Ikke ennå", "Delvis", "Ja"], navn: "Navn" };
    document.title = "Exit ticket – " + (LV.config ? LV.config.navn : "Les verden");
    const lapp = (nr) => '<div class="ex-lapp"' + lang + '><p class="ex-lapp-topp"><strong>' + def.ikon + " Exit ticket" + (tema ? " · " + esc(tema.tittel) : "") + '</strong><span>' + T.navn + ': ________________</span></p>' +
      (maal.length ? '<ul class="ex-maal">' + maal.map(m => "<li>" + T.kan + " " + esc(ren(m)) + ' <span class="ex-bokser">' + T.valg.map(x => "☐ " + x).join("  ") + "</span></li>").join("") + "</ul>" : "") +
      felt.map(([q, n]) => '<p class="ex-q">' + esc(q) + "</p>" + '<span class="ex-linje"></span>'.repeat(n)).join("") + "</div>";

    if (elev) {
      $("innhold").innerHTML = '<div class="ex-elev"' + lang + '><p class="overlinje">' + def.ikon + " Exit ticket" + (tema ? " · " + esc(tema.tittel) : "") + "</p><h1>" + esc(def.navn) + "</h1>" +
        (maal.length ? '<ul class="ev-liste">' + maal.map((m, i) => '<li><fieldset><legend><span class="ev-kan">' + T.kan + "</span> " + esc(ren(m)) + '</legend><div class="ev-valg">' + T.valg.map((x, j) => '<label><input type="radio" name="ex-m' + i + '" id="ex-m' + i + "-" + j + '" value="' + j + '"> <span>' + ["🌱", "🌿", "🌳"][j] + " " + x + "</span></label>").join("") + "</div></fieldset></li>").join("") + "</ul>" : "") +
        felt.map(([q, n], i) => n ? '<label class="mu-notat" for="ex-f' + i + '"><span>' + esc(q) + '</span><textarea id="ex-f' + i + '" rows="' + Math.max(2, n) + '"></textarea></label>' : '<fieldset class="ex-skala"><legend>' + esc(q.replace(/ Sett ring:.*| Circle:.*/, "")) + "</legend>" + [1, 2, 3, 4, 5].map(k => '<label><input type="radio" name="ex-skala" id="ex-s' + k + '" value="' + k + '"> ' + k + "</label>").join("") + "</fieldset>").join("") +
        '<p class="ll-hint" lang="nb">Trykk «Last ned svarene» nederst og lever fila til læreren – eller vis skjermen til læreren.</p></div>';
      const l = document.createElement("div"); l.className = "svarlinje"; l.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>'; document.body.appendChild(l);
      return;
    }

    const elevLenke = location.href.split(/[?#]/)[0] + "?v=" + v + (tema ? "&tema=" + tema.id : "") + "&elev=1";
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje">For læreren</p><h1>🎟️ Exit ticket</h1><p class="ingress">En exit ticket er en liten lapp elevene fyller ut de siste minuttene av timen. Den hjelper elevene med å hente fram og oppsummere det de har lært – og gir deg et raskt bilde av hva klassen har forstått, og hva du bør ta opp igjen neste time.</p></header>' +
      '<form class="ex-oppsett" id="ex-form"><fieldset class="ex-varianter"><legend>Velg type</legend>' + Object.entries(V).map(([k, x]) => '<label><input type="radio" name="ex-v" value="' + k + '"' + (k === v ? " checked" : "") + "> " + x.ikon + " " + esc(x.navn) + (x.maal ? " <small>(krever tema)</small>" : "") + "</label>").join("") + '</fieldset><label class="ex-temavalg">Tema (valgfritt – gir tittel og læringsmål)' + temaValg(tema ? tema.id : "") + "</label></form>" +
      '<section class="ex-storskjerm" aria-labelledby="ex-ss-h"' + lang + '><h2 id="ex-ss-h" class="skjult-visuelt">Storskjerm</h2><p class="ex-ss-topp">' + def.ikon + " Exit ticket" + (tema ? " · " + esc(tema.tittel) : "") + '</p><ol class="ex-ss-liste">' + (maal.length ? "<li>" + (sp === "en" ? "How well can you do the learning goals? Not yet – partly – yes" : "Hvor godt kan du læringsmålene? Ikke ennå – delvis – ja") + "</li>" : "") + felt.map(([q]) => "<li>" + esc(q) + "</li>").join("") + '</ol><p><button type="button" class="knapp" id="ex-full">⛶ Vis i fullskjerm</button></p></section>' +
      '<section class="le-del" aria-labelledby="ex-rom-h"><h2 id="ex-rom-h">📱 Samle inn svarene med romkode</h2><p class="mu-intro">Elevene skriver på mobilen eller PC-en, og svarene kommer rett inn hos deg – uten navn. Ingenting lagres: kopier svarene før du lukker siden.</p><p id="ex-romknapp"><button type="button" class="knapp hoved" id="ex-romstart">📱 Start innsamlingen</button></p><div id="ex-rom"></div><div id="ex-romsvar" aria-live="polite"></div></section>' +
      '<section class="le-del"><h2>Skriv ut lapper</h2><p class="mu-intro">Fire lapper på hvert A4-ark. Klipp langs de stiplede linjene.</p><p><button type="button" class="knapp hoved" id="ex-skriv">🖨️ Skriv ut lapper</button></p><div class="ex-ark" id="ex-ark">' + [1, 2, 3, 4].map(lapp).join("") + "</div></section>" +
      '<section class="le-del"><h2>Digital versjon for elevene</h2><p class="mu-intro">Del lenken med elevene. De fyller ut på egen enhet og kan laste ned svarene. Ingenting lagres på nettstedet.</p><label class="lg-felt" for="ex-lenke"><span>Lenke til elevversjonen</span><input type="text" id="ex-lenke" readonly value="' + esc(elevLenke) + '"></label><p class="ak-knapper"><button type="button" class="knapp" id="ex-kopier">📋 Kopier lenken</button> <a class="knapp" href="' + esc(elevLenke) + '">Åpne elevversjonen</a> <span class="lg-status" id="ex-status" role="status" aria-live="polite"></span></p></section>' +
      '<p class="fo-merk">Tips: Les gjennom lappene etter timen og sorter dem i tre bunker – har forstått, delvis, ikke ennå. Start neste time med det som var mest uklart, gjerne med <a href="repetisjon.html">Repetisjonsstart</a>. Alle temaene har også en avslutningslapp nederst på siden som elevene kan fylle ut selv.</p>';
    const oppdater = () => { const nv = document.querySelector('input[name="ex-v"]:checked').value, nt = $("ex-tema").value; location.search = "?v=" + nv + (nt ? "&tema=" + nt : ""); };
    document.querySelectorAll('input[name="ex-v"]').forEach(r => r.addEventListener("change", oppdater));
    $("ex-tema").addEventListener("change", oppdater);
    $("ex-skriv").addEventListener("click", () => { document.body.classList.add("ex-skriv-lapper"); window.print(); setTimeout(() => document.body.classList.remove("ex-skriv-lapper"), 500); });
    $("ex-full").addEventListener("click", () => { const el = document.querySelector(".ex-storskjerm"); if (document.fullscreenElement) document.exitFullscreen(); else if (el.requestFullscreen) el.requestFullscreen(); });
    kobleRom(def, felt, maal, sp, tema, T);
    $("ex-kopier").addEventListener("click", async () => { try { await navigator.clipboard.writeText($("ex-lenke").value); $("ex-status").textContent = "✔ Lenken er kopiert."; } catch (e) { $("ex-lenke").select(); $("ex-status").textContent = "Lenken er merket – trykk Ctrl+C."; } });
  }
  // ---------- Innsamling med romkode (anonymt) ----------
  function kobleRom(def, felt, maal, sp, tema, T) {
    let K = null, nr = 0, vis = false;
    const en = sp === "en";
    const FELT = maal.map((m, i) => ({ id: "m" + i, tekst: T.kan + " " + ren(m), type: "nivaa" }))
      .concat(felt.map(([q, n], i) => n ? { id: "f" + i, tekst: q, type: "tekst", rader: Math.max(2, n) } : { id: "s", tekst: q.replace(/ Sett ring:.*| Circle:.*/, ""), type: "skala" }));
    const stokk = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    const alle = () => stokk([...K.svar.values()]);
    function tegn() {
      if (!K) { $("ex-romsvar").innerHTML = ""; return; }
      const svar = alle();
      let h = '<p><strong>' + svar.length + "</strong> " + (svar.length === 1 ? "svar" : "svar") + " kommet inn. " +
        '<button type="button" class="knapp" id="ex-vis" aria-pressed="' + vis + '">' + (vis ? "🙈 Skjul svarene" : "👀 Vis svarene") + '</button> <button type="button" class="knapp" id="ex-kopisvar">📋 Kopier alle svarene</button> ' +
        (K.aapen ? '<button type="button" class="knapp" id="ex-steng">⏹ Avslutt innsamlingen</button>' : '<button type="button" class="knapp" id="ex-ny">🔁 Ny innsamling</button>') + '</p><p class="status" id="ex-romstatus" role="status"></p>';
      if (vis) h += '<div class="ex-svarvisning"' + (en ? ' lang="en"' : "") + ">" + FELT.map(f => {
        const v = svar.map(x => x[f.id]).filter(x => x != null && x !== "");
        if (f.type === "skala") { const snitt = v.length ? (v.reduce((a, b) => a + +b, 0) / v.length).toFixed(1).replace(".", ",") : "–"; return "<h3>" + esc(f.tekst) + "</h3><p>" + [1, 2, 3, 4, 5].map(k => k + ": <strong>" + v.filter(x => +x === k).length + "</strong>").join(" · ") + " – snitt " + snitt + "</p>"; }
        if (f.type === "nivaa") return "<h3>" + esc(f.tekst) + "</h3><p>" + ["🌱 " + T.valg[0], "🌿 " + T.valg[1], "🌳 " + T.valg[2]].map((x, k) => x + ": <strong>" + v.filter(y => +y === k).length + "</strong>").join(" · ") + "</p>";
        return "<h3>" + esc(f.tekst) + "</h3>" + (v.length ? '<ul class="ex-svarliste">' + v.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul>" : "<p>–</p>");
      }).join("") + "</div>";
      $("ex-romsvar").innerHTML = h;
    }
    const nyInnsamling = () => { nr++; K.spor({ id: "ex" + nr, type: "skjema", anonym: true, en, tekst: def.ikon + " Exit ticket" + (tema ? " · " + tema.tittel : ""), felt: FELT }); tegn(); };
    $("ex-romstart").addEventListener("click", async () => {
      $("ex-romknapp").hidden = true;
      try {
        await LV.lastSkript("assets/rom.js"); await LV.lastSkript("assets/romklasse.js");
        K = await LV.romKlasse.apne($("ex-rom"), { tittel: "Exit ticket", onSvar: tegn, onEndret: () => {}, onLukket: () => { K = null; tegn(); $("ex-romknapp").hidden = false; } });
        nyInnsamling();
      } catch (e) { $("ex-rom").textContent = "Klarte ikke å åpne rommet. " + (LV.rom ? LV.rom.feilTekst(e) : ""); $("ex-romknapp").hidden = false; }
    });
    $("ex-romsvar").addEventListener("click", async e => {
      if (e.target.closest("#ex-vis")) { vis = !vis; tegn(); }
      else if (e.target.closest("#ex-steng")) { K.lukkSporsmal(en ? "Your answer has been sent. Have a nice day!" : "Svaret ditt er sendt. Ha en fin dag!"); tegn(); }
      else if (e.target.closest("#ex-ny")) nyInnsamling();
      else if (e.target.closest("#ex-kopisvar")) {
        const tekst = "Exit ticket" + (tema ? " – " + tema.tittel : "") + " (" + new Date().toLocaleDateString("nb-NO") + ")\n\n" + FELT.map(f => f.tekst + "\n" + alle().map(x => x[f.id]).filter(x => x != null && x !== "").map(x => f.type === "nivaa" ? "- " + T.valg[+x] : "- " + x).join("\n")).join("\n\n");
        try { await navigator.clipboard.writeText(tekst); $("ex-romstatus").textContent = "✔ Svarene er kopiert. Lim dem inn i et dokument."; } catch (er) { $("ex-romstatus").textContent = "Kunne ikke kopiere automatisk."; }
      }
    });
  }

  document.addEventListener("DOMContentLoaded", side);
})();
