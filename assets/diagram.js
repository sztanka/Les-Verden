/* =========================================================
   Les verden – enkle, tilgjengelige diagrammer (SVG)
   LV.diagram({ type: "soyle" | "linje" | "sektor", tittel, x: [...],
     serier: [{ navn, verdier: [...] }], yMin, yMaks, enhet, kilde, id })
   Gir en <figure> med SVG (role="img") og en tabell med tallene.
   Brukes av grafleser.html, undersokelse.html og valg.html.
   ========================================================= */
(function () {
  const LV = window.LV = window.LV || {};
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const FARGER = ["var(--dg-1)", "var(--dg-2)", "var(--dg-3)", "var(--dg-4)", "var(--dg-5)", "var(--dg-6)", "var(--dg-7)", "var(--dg-8)"];
  const tall = v => (Math.round(v * 10) / 10).toLocaleString("nb-NO");
  let teller = 0;

  function fineSteg(min, maks) {
    const sp = maks - min || 1, rå = sp / 5, mag = Math.pow(10, Math.floor(Math.log10(rå)));
    const steg = [1, 2, 2.5, 5, 10].map(m => m * mag).find(s => s >= rå) || rå;
    const ut = []; for (let v = Math.ceil(min / steg) * steg; v <= maks + 1e-9; v += steg) ut.push(+v.toFixed(6));
    return ut;
  }

  LV.diagram = function (o) {
    const smal = typeof window !== "undefined" && window.innerWidth < 600;
    const id = o.id || ("dg" + (++teller)), B = smal ? 440 : 640, H = Math.round((o.hoyde || 320) * (smal ? 0.95 : 1));
    const x = o.x || [], serier = o.serier || [];
    const tittel = o.tittel || "";
    let svg = "";
    if (o.type === "sektor") {
      const v = serier[0].verdier, sum = v.reduce((a, b) => a + b, 0) || 1;
      let vinkel = -Math.PI / 2; const cx = smal ? 110 : 170, cy = smal ? 115 : H / 2, r = smal ? 100 : Math.min(140, H / 2 - 20);
      svg += v.map((t, i) => {
        const a = t / sum * Math.PI * 2, x1 = cx + r * Math.cos(vinkel), y1 = cy + r * Math.sin(vinkel);
        vinkel += a; const x2 = cx + r * Math.cos(vinkel), y2 = cy + r * Math.sin(vinkel);
        const sti = a >= Math.PI * 2 - 1e-6 ? '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '"' : '<path d="M' + cx + " " + cy + " L" + x1.toFixed(1) + " " + y1.toFixed(1) + " A" + r + " " + r + " 0 " + (a > Math.PI ? 1 : 0) + " 1 " + x2.toFixed(1) + " " + y2.toFixed(1) + ' Z"';
        return sti + ' fill="' + FARGER[i % FARGER.length] + '" stroke="var(--flate)" stroke-width="2"/>';
      }).join("");
      const lx = smal ? 16 : 350, ly = smal ? 235 : 30;
      svg += x.map((n, i) => '<rect x="' + lx + '" y="' + (ly + i * 28) + '" width="16" height="16" rx="3" fill="' + FARGER[i % FARGER.length] + '"/><text x="' + (lx + 24) + '" y="' + (ly + 13 + i * 28) + '" class="dg-tekst">' + esc(n) + " (" + tall(v[i] / sum * 100) + " %)</text>").join("");
    } else {
      const alle = serier.flatMap(s => s.verdier).filter(v => v != null);
      const yMin = o.yMin != null ? o.yMin : Math.min(0, ...alle), yMaks = o.yMaks != null ? o.yMaks : Math.max(...alle, 1) * 1.1;
      const V = o.enhet ? 74 : 56, Hø = 16, T = 20, U = 56, bredde = B - V - Hø, hoyde = H - T - U;
      const y = v => T + hoyde - (v - yMin) / (yMaks - yMin) * hoyde;
      const ticks = fineSteg(yMin, yMaks);
      svg += ticks.map(t => '<line x1="' + V + '" x2="' + (B - Hø) + '" y1="' + y(t).toFixed(1) + '" y2="' + y(t).toFixed(1) + '" class="dg-rutenett"/><text x="' + (V - 8) + '" y="' + (y(t) + 4).toFixed(1) + '" text-anchor="end" class="dg-tekst">' + tall(t) + "</text>").join("");
      const n = x.length, slot = bredde / Math.max(n, 1);
      if (o.type === "linje") {
        const px = i => V + slot * i + slot / 2;
        serier.forEach((s, si) => {
          const pts = s.verdier.map((v, i) => v == null ? null : [px(i), y(v)]).filter(Boolean);
          svg += '<polyline fill="none" stroke="' + FARGER[si % FARGER.length] + '" stroke-width="3" stroke-linejoin="round" points="' + pts.map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ") + '"/>';
          svg += pts.map(p => '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="4" fill="' + FARGER[si % FARGER.length] + '"/>').join("");
        });
      } else {
        const g = serier.length, sb = Math.min(56, slot * 0.8 / g);
        serier.forEach((s, si) => s.verdier.forEach((v, i) => {
          if (v == null) return;
          const x0 = V + slot * i + (slot - sb * g) / 2 + sb * si, y0 = y(Math.max(v, yMin)), yb = y(yMin > 0 ? yMin : 0);
          svg += '<rect x="' + x0.toFixed(1) + '" y="' + Math.min(y0, yb).toFixed(1) + '" width="' + (sb - 2).toFixed(1) + '" height="' + Math.max(1, Math.abs(yb - y0)).toFixed(1) + '" rx="3" fill="' + FARGER[(g > 1 ? si : (o.fargePerSoyle ? i : 0)) % FARGER.length] + '"/>';
          if (o.verdiPaSoyle) svg += '<text x="' + (x0 + sb / 2 - 1).toFixed(1) + '" y="' + (Math.min(y0, yb) - 5).toFixed(1) + '" text-anchor="middle" class="dg-tekst dg-verdi">' + tall(v) + "</text>";
        }));
      }
      svg += '<line x1="' + V + '" x2="' + (B - Hø) + '" y1="' + (T + hoyde) + '" y2="' + (T + hoyde) + '" class="dg-akse"/><line x1="' + V + '" x2="' + V + '" y1="' + T + '" y2="' + (T + hoyde) + '" class="dg-akse"/>';
      const skrå = n > 7 || x.some(l => String(l).length > 9);
      svg += x.map((l, i) => { const cx = V + slot * i + slot / 2, cy = T + hoyde + 18; return '<text x="' + cx.toFixed(1) + '" y="' + cy + '" class="dg-tekst"' + (skrå ? ' text-anchor="end" transform="rotate(-30 ' + cx.toFixed(1) + " " + cy + ')"' : ' text-anchor="middle"') + ">" + esc(l) + "</text>"; }).join("");
      if (o.enhet) svg += '<text x="14" y="' + (T + hoyde / 2) + '" class="dg-tekst" text-anchor="middle" transform="rotate(-90 14 ' + (T + hoyde / 2) + ')">' + esc(o.enhet) + "</text>";
    }
    const forklaring = serier.length > 1 && o.type !== "sektor" ? '<ul class="dg-forklaring">' + serier.map((s, i) => '<li><span style="background:' + FARGER[i % FARGER.length] + '"></span>' + esc(s.navn) + "</li>").join("") + "</ul>" : "";
    const tabell = '<details class="dg-tabell"><summary>Vis tallene i en tabell</summary><table><thead><tr><th scope="col"></th>' + serier.map(s => '<th scope="col">' + esc(s.navn || o.enhet || "Verdi") + "</th>").join("") + "</tr></thead><tbody>" + x.map((l, i) => '<tr><th scope="row">' + esc(l) + "</th>" + serier.map(s => "<td>" + (s.verdier[i] == null ? "–" : tall(s.verdier[i])) + "</td>").join("") + "</tr>").join("") + "</tbody></table></details>";
    const hFinal = o.type === "sektor" && smal ? 245 + x.length * 28 : H;
    return '<figure class="dg" id="' + id + '"><figcaption class="dg-tittel">' + esc(tittel) + '</figcaption><svg viewBox="0 0 ' + B + " " + hFinal + '" role="img" aria-labelledby="' + id + '-t"><title id="' + id + '-t">' + esc(tittel + (o.beskrivelse ? ". " + o.beskrivelse : "")) + "</title>" + svg + "</svg>" + forklaring + (o.kilde ? '<p class="dg-kilde">' + esc(o.kilde) + "</p>" : "") + tabell + "</figure>";
  };
})();
