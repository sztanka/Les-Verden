/* =========================================================
   Les verden – Svarte-ut-dikt / Blackout poetry (svartut.html)
   Velg en side fra en tekst i Reading Room. Trykk på ordene du
   vil beholde – resten svartes ut, og det blir et nytt dikt.
   svartut.html?tekst=<id>&side=<n>
   Last ned som bilde (PNG) eller skriv ut. Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const ren = s => String(s).replace(/\*\*?|\[\[|\]\]/g, "");
  const antOrd = s => ren(s).split(/\s+/).filter(Boolean).length;

  function sider(d) {
    // Kandidater: avsnitt eller dikt med 40–230 ord. Korte avsnitt slås sammen.
    const ut = []; let buf = [];
    const tekster = (d.tekst || []).map(p => typeof p === "string" ? p : (p.vers ? p.vers.replace(/\n+/g, " / ") : null)).filter(Boolean);
    tekster.forEach(t => {
      buf.push(t);
      const n = antOrd(buf.join(" "));
      if (n >= 60) { if (n <= 230) ut.push(buf.join(" ")); buf = []; }
    });
    if (buf.length && antOrd(buf.join(" ")) >= 40) ut.push(buf.join(" "));
    return ut;
  }

  function oversikt() {
    document.title = "Svarte-ut-dikt – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = hode() + '<ul class="fo-liste">' + LV.lesetekster.map(t =>
      '<li><a class="fo-kort" href="svartut.html?tekst=' + t.id + '" style="--fo-a:' + t.farger[0] + ";--fo-b:" + t.farger[1] + '" lang="en"><span class="fo-kort-topp"><span class="fo-ikon" aria-hidden="true">' + t.ikon + "</span><span>" + esc(t.forfatter) + "</span></span><strong>" + esc(t.tittel) + '</strong><span lang="nb">' + esc(t.sjanger) + "</span></a></li>").join("") + "</ul>";
  }
  const hode = () => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="lesing.html" lang="en">Reading Room</a> › <a href="svartut.html">Svarte-ut-dikt</a></nav>' +
    '<header class="sidehode"><p class="overlinje">Skapende lesing</p><h1>⬛ Svarte-ut-dikt <span lang="en">(blackout poetry)</span></h1><p class="ingress">Ta en side fra en ekte tekst og lag et nytt dikt av den. Les siden, velg ut ordene som sier noe viktig eller vakkert – og svart ut resten. Ordene må stå i den rekkefølgen de har på siden.</p></header>';

  async function lag(info) {
    document.title = "Svarte-ut-dikt: " + info.tittel;
    $("innhold").innerHTML = hode() + '<p>Laster teksten …</p>';
    try { await LV.lastSkript("data/lesing/" + info.id + ".js"); } catch (e) { $("innhold").innerHTML = hode() + "<p>Fant ikke teksten.</p>"; return; }
    const d = LV.lesetekst, alle = sider(d);
    let side = Math.min(Math.max(0, +(LV.param("side") || 0)), alle.length - 1);
    let valgt = new Set(), visning = "velg";

    $("innhold").innerHTML = hode() +
      '<div class="su-verktoy"><label for="su-side">Side fra <em lang="en">' + esc(info.tittel) + "</em> (" + esc(info.forfatter) + '):</label><select id="su-side">' +
      alle.map((t, i) => '<option value="' + i + '"' + (i === side ? " selected" : "") + ">" + (i + 1) + ": " + esc(ren(t).split(/\s+/).slice(0, 7).join(" ")) + " …</option>").join("") + "</select>" +
      '<div class="su-knapper" role="group" aria-label="Visning"><button type="button" class="knapp liten" id="su-velg" aria-pressed="true">✏️ Velg ord</button><button type="button" class="knapp liten" id="su-svart" aria-pressed="false">⬛ Svart ut</button><button type="button" class="knapp liten" id="su-nullstill">↺ Start på nytt</button></div></div>' +
      '<ol class="su-steg"><li>Les hele siden én gang.</li><li>Les den igjen og let etter ord som berører deg, eller som sammen kan si noe nytt.</li><li>Trykk på ordene du vil beholde. Trykk igjen for å angre.</li><li>Trykk «Svart ut» og les diktet ditt. Gi det en tittel.</li></ol>' +
      '<div class="su-side" id="su-side-tekst" lang="en"></div>' +
      '<section class="su-resultat"><h2>Diktet ditt</h2><p class="su-dikt" id="su-dikt" lang="en" aria-live="polite"></p>' +
      '<label class="mu-notat" for="su-tittel"><span>Tittel på diktet</span><input type="text" id="su-tittel" autocomplete="off"></label>' +
      '<label class="mu-notat" for="su-tanker"><span>Hva handler diktet ditt om? Hvorfor valgte du disse ordene?</span><textarea id="su-tanker" rows="4"></textarea></label>' +
      '<textarea id="su-ordvalg" hidden aria-label="Ordvalg (brukes når du fortsetter fra fil)"></textarea><p><button type="button" class="knapp hoved" id="su-bilde">🖼️ Last ned som bilde</button> <button type="button" class="knapp" id="su-skriv">🖨️ Skriv ut</button></p>' +
      '<p class="mu-intro">Kilde: <span lang="en">' + esc(info.forfatter) + ", «" + esc(info.tittel) + "»</span> (" + info.ar + '), i det fri. <a href="lesing.html?id=' + info.id + '">Les hele teksten i Reading Room →</a></p></section>';

    let ordliste = [];
    const tegn = () => {
      ordliste = ren(alle[side]).split(/\s+/).filter(Boolean);
      $("su-side-tekst").className = "su-side" + (visning === "svart" ? " svart" : "");
      $("su-side-tekst").innerHTML = ordliste.map((o, i) => o === "/" ? '<span class="su-skille" aria-hidden="true"> / </span>' :
        '<button type="button" class="su-ord' + (valgt.has(i) ? " valgt" : "") + '" data-i="' + i + '" aria-pressed="' + valgt.has(i) + '">' + esc(o) + "</button>").join(" ");
      oppdater();
    };
    const dikt = () => [...valgt].sort((a, b) => a - b).map(i => ordliste[i]).join(" ");
    const oppdater = () => {
      const t = dikt();
      $("su-dikt").textContent = t || "(Ingen ord valgt ennå.)";
      $("su-ordvalg").value = side + ":" + [...valgt].sort((a, b) => a - b).join(",");
    };
    $("su-side-tekst").addEventListener("click", e => {
      const b = e.target.closest(".su-ord"); if (!b) return;
      const i = +b.dataset.i;
      if (valgt.has(i)) valgt.delete(i); else valgt.add(i);
      b.classList.toggle("valgt", valgt.has(i)); b.setAttribute("aria-pressed", String(valgt.has(i)));
      oppdater();
    });
    const settVisning = v => { visning = v; $("su-velg").setAttribute("aria-pressed", String(v === "velg")); $("su-svart").setAttribute("aria-pressed", String(v === "svart")); $("su-side-tekst").classList.toggle("svart", v === "svart"); };
    $("su-velg").addEventListener("click", () => settVisning("velg"));
    $("su-svart").addEventListener("click", () => settVisning("svart"));
    $("su-nullstill").addEventListener("click", () => { valgt = new Set(); tegn(); });
    $("su-side").addEventListener("change", e => { side = +e.target.value; valgt = new Set(); tegn(); history.replaceState(null, "", "svartut.html?tekst=" + info.id + "&side=" + side); });
    $("su-skriv").addEventListener("click", () => { settVisning("svart"); window.print(); });
    $("su-bilde").addEventListener("click", () => lastNed(info));
    // Gjenopprett ordvalg når en svarfil leses inn
    $("su-ordvalg").addEventListener("input", () => { const [s, l] = $("su-ordvalg").value.split(":"); if (s !== undefined && alle[+s]) { side = +s; $("su-side").value = s; valgt = new Set((l || "").split(",").filter(Boolean).map(Number)); tegn(); } });
    tegn();

    function lastNed() {
      const W = 1000, PAD = 60, LH = 40, FONT = '26px Georgia, "Times New Roman", serif';
      const c = document.createElement("canvas"), x = c.getContext("2d");
      x.font = FONT;
      // Linjebryting
      const linjer = []; let linje = [], bredde = 0; const mellom = x.measureText(" ").width;
      ordliste.forEach((o, i) => { const w = x.measureText(o).width; if (bredde + w > W - 2 * PAD && linje.length) { linjer.push(linje); linje = []; bredde = 0; } linje.push({ o, i, w }); bredde += w + mellom; });
      if (linje.length) linjer.push(linje);
      const tittel = $("su-tittel").value.trim();
      c.width = W; c.height = PAD * 2 + linjer.length * LH + (tittel ? 70 : 0) + 40;
      x.fillStyle = "#f7f3ea"; x.fillRect(0, 0, c.width, c.height);
      let y = PAD;
      if (tittel) { x.fillStyle = "#1a1a1a"; x.font = 'bold 34px Georgia, serif'; x.fillText(tittel, PAD, y + 30); y += 70; x.font = FONT; }
      linjer.forEach(l => {
        let px = PAD;
        l.forEach(({ o, i, w }) => {
          if (o === "/") { px += w + mellom; return; }
          if (valgt.has(i)) { x.fillStyle = "#1a1a1a"; x.fillText(o, px, y + 28); x.strokeStyle = "#c0392b"; x.lineWidth = 2; x.strokeRect(px - 4, y + 2, w + 8, 34); }
          else { x.fillStyle = "#111"; x.fillRect(px - 2, y + 4, w + mellom - 3, 30); }
          px += w + mellom;
        });
        y += LH;
      });
      x.fillStyle = "#555"; x.font = '16px Arial, sans-serif';
      x.fillText("Blackout poem from «" + info.tittel + "» by " + info.forfatter + " – Les verden", PAD, c.height - 30);
      const a = document.createElement("a");
      a.download = "svart-ut-dikt.png"; a.href = c.toDataURL("image/png"); document.body.appendChild(a); a.click(); a.remove();
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const info = LV.lesetekster.find(t => t.id === LV.param("tekst"));
    if (info) lag(info); else oversikt();
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
  });
})();
