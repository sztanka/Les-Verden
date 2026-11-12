/* =========================================================
   Les verden – Historiske kort (historiske-kort.html)
   Lag kortspill i «Top Trumps»-stil med personene fra temaene.
   Verdiene står IKKE ferdig – gruppene setter dem selv (0–10) og
   må kunne begrunne dem. Det er det som er læringen.
   ?fag=&trinn=&tema=<id>   filtrerer personene
   Ingenting lagres. Kortene skrives ut (6 per side).
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const kortTekst = t => { const s = String(t || "").replace(/\*\*|\[\[|\]\]/g, "").replace(/\[\[([^\]|]+)\|[^\]]+\]\]/g, "$1"); const m = s.match(/^.{20,170}?[^\d\s][.!?](\s|$)/); return m ? m[0].trim() : s.slice(0, 160) + "…"; };
  let personer = [], valgt = new Set(), egne = [];
  let kat = ["Makt i sin tid", "Påvirkning i dag", "Mot", "Kjent i Norge"];

  function samle(temaer) {
    const kart = new Map();
    temaer.forEach(({ kat: k, tema }) => (tema.personer || []).forEach(p => {
      const n = p.navn.toLowerCase();
      if (!kart.has(n)) kart.set(n, Object.assign({}, p, { sprak: tema.sprak === "en" ? "en" : "nb", temaer: [] }));
      const b = kart.get(n);
      if ((p.tekst || "").length > (b.tekst || "").length) { b.tekst = p.tekst; b.rolle = p.rolle; b.levde = p.levde; }
      if (!b.temaer.some(t => t.id === k.id)) b.temaer.push({ id: k.id, tittel: k.tittel, fag: k.fag, trinn: k.trinn });
    }));
    return [...kart.values()].sort((a, b) => a.navn.localeCompare(b.navn, "nb"));
  }

  async function bygg() {
    document.title = "Historiske kort – " + (LV.config ? LV.config.navn : "Les verden");
    const p = new URLSearchParams(location.search);
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › Historiske kort</nav>' +
      '<header class="sidehode"><p class="overlinje">Spill · utskrift</p><h1>🃏 Historiske kort</h1><p class="ingress">Lag deres eget kortspill i «Top Trumps»-stil med personer fra historien og samfunnet. Kortene har ingen ferdige tall: Det er dere som bestemmer hvor mye makt, påvirkning og mot hver person hadde – og dere må kunne begrunne det. Så skriver dere ut kortene og spiller.</p>' +
      '<nav class="dsp-innhold" aria-label="På denne siden"><ol><li><a href="#hk-velg">Velg personer</a></li><li><a href="#hk-kategorier">Kategorier</a></li><li><a href="#hk-kort">Kortene</a></li><li><a href="#hk-regler">Slik spiller dere</a></li></ol></nav></header>' +
      '<section id="hk-velg" class="hk-del"><h2>1. Velg personer</h2><p id="hk-laster" role="status">Henter personene fra temaene …</p></section>';
    personer = samle(await LV.lastAlleTemaer());
    const fag = p.get("fag") || "", trinn = p.get("trinn") || "", temaId = p.get("tema") || "";
    const temaValg = '<select id="hk-tema"><option value="">Alle temaer</option>' + LV.temaer.filter(t => personer.some(x => x.temaer.some(y => y.id === t.id))).sort((a, b) => a.fag.localeCompare(b.fag) || a.trinn - b.trinn).map(t => '<option value="' + t.id + '"' + (t.id === temaId ? " selected" : "") + ">" + t.trinn + ". – " + esc(t.tittel) + "</option>").join("") + "</select>";
    $("hk-velg").innerHTML = '<h2>1. Velg personer</h2><p>Velg 12–24 personer – gjerne fra temaene dere har jobbet med. Et kortspill fungerer best når personene er ganske ulike.</p>' +
      '<div class="or-rad"><label>Fag <select id="hk-fag"><option value="">Begge fag</option><option value="samfunnsfag">Samfunnsfag</option><option value="engelsk">Engelsk</option></select></label><label>Trinn <select id="hk-trinn"><option value="">Alle</option><option>8</option><option>9</option><option>10</option></select></label><label>Tema ' + temaValg + '</label><label>Søk <input type="search" id="hk-sok"></label></div>' +
      '<p class="hk-knapper"><button type="button" class="knapp liten" id="hk-alle">Velg alle som vises</button><button type="button" class="knapp liten" id="hk-tilf">🎲 12 tilfeldige</button><button type="button" class="knapp liten" id="hk-ingen">Fjern alle</button><span id="hk-antall" role="status" aria-live="polite"></span></p>' +
      '<div class="hk-liste" id="hk-liste"></div>' +
      '<details class="hk-egen"><summary>➕ Lag kort til en person som ikke er med</summary><label for="hk-e-navn">Navn</label><input type="text" id="hk-e-navn"><label for="hk-e-levde">Levde</label><input type="text" id="hk-e-levde" placeholder="1820–1910"><label for="hk-e-rolle">Rolle</label><input type="text" id="hk-e-rolle" placeholder="For eksempel: oppfinner"><label for="hk-e-tekst">Kort tekst (én setning)</label><input type="text" id="hk-e-tekst"><p><button type="button" class="knapp liten" id="hk-e-legg">Legg til kortet</button></p></details>';
    $("innhold").insertAdjacentHTML("beforeend",
      '<section id="hk-kategorier" class="hk-del"><h2>2. Kategorier</h2><p>Hvert kort har fire kategorier. Dere kan bruke forslagene eller lage egne.</p><div class="hk-kat">' + kat.map((k, i) => '<label>Kategori ' + (i + 1) + ' <input type="text" id="hk-k-' + i + '" value="' + esc(k) + '"></label>').join("") + "</div></section>" +
      '<section id="hk-kort" class="hk-del"><h2>3. Kortene</h2><p>Sett verdier fra 0 til 10 i gruppa. Diskuter: Hvorfor fikk Nansen 9 i mot, men bare 4 i makt? Skriv begrunnelsen for de vanskeligste verdiene på begrunnelsesarket.</p><p class="hk-knapper"><button type="button" class="knapp hoved" id="hk-print">🖨️ Skriv ut kortene (6 per side)</button><button type="button" class="knapp" id="hk-ark">🖨️ Skriv ut begrunnelsesark</button></p><div class="hk-kortene" id="hk-kortene"></div></section>' +
      '<section id="hk-regler" class="hk-del"><h2>4. Slik spiller dere</h2><ol><li>Del kortene likt mellom to–fire spillere. Hold bunken med forsiden ned.</li><li>Den første spilleren ser på det øverste kortet sitt, velger en kategori og leser opp verdien: «Mot: 8!»</li><li>De andre leser opp sin verdi i samme kategori. Høyeste verdi vinner alle kortene i runden.</li><li><strong>Utfordring!</strong> Hvis du mener en verdi er urettferdig, kan du utfordre. Begge må begrunne verdien med noe dere vet om personene. De andre stemmer – vinner du utfordringen, vinner du runden.</li><li>Den som har alle kortene til slutt – eller flest når tiden er ute – vinner.</li></ol><p class="fo-merk">Snakk sammen etterpå: Hvilke verdier var vanskeligst å bli enige om? Kan man måle «mot» eller «påvirkning» med et tall? Hvem bestemmer hvem som blir «viktige» i historien?</p></section>');

    const vist = () => { const f = $("hk-fag").value, tr = $("hk-trinn").value, tm = $("hk-tema").value, s = $("hk-sok").value.toLowerCase(); return personer.filter(x => (!f || x.temaer.some(t => t.fag === f)) && (!tr || x.temaer.some(t => String(t.trinn) === tr)) && (!tm || x.temaer.some(t => t.id === tm)) && (!s || (x.navn + " " + x.rolle).toLowerCase().includes(s))); };
    const tegnListe = () => {
      const v = vist();
      $("hk-liste").innerHTML = v.map(x => '<label' + (x.sprak === "en" ? ' lang="en"' : "") + '><input type="checkbox" value="' + esc(x.navn) + '"' + (valgt.has(x.navn) ? " checked" : "") + "> <span><strong>" + esc(x.navn) + "</strong> <small>" + esc(x.levde || "") + "</small></span></label>").join("") || "<p>Ingen personer passer.</p>";
      $("hk-antall").textContent = valgt.size + egne.length + " kort valgt";
    };
    const tegnKort = () => {
      kat = [0, 1, 2, 3].map(i => $("hk-k-" + i).value || "Kategori " + (i + 1));
      const gml = {}; document.querySelectorAll(".hk-verdi").forEach(i => { gml[i.id] = i.value; });
      const liste = personer.filter(x => valgt.has(x.navn)).concat(egne);
      $("hk-kortene").innerHTML = liste.length ? liste.map((x, n) => '<article class="hk-kortet fag-' + ((x.temaer && x.temaer[0] && x.temaer[0].fag) || "samfunnsfag") + '"' + (x.sprak === "en" ? ' lang="en"' : "") + '><p class="hk-k-topp">' + esc(x.levde || "") + '</p><h3>' + esc(x.navn) + '</h3><p class="hk-k-rolle">' + esc(x.rolle || "") + '</p><p class="hk-k-tekst">' + esc(kortTekst(x.tekst)) + '</p><dl class="hk-k-verdier" lang="nb">' + kat.map((k, i) => { const id = "hk-v-" + n + "-" + i; return "<div><dt><label for=\"" + id + '">' + esc(k) + '</label></dt><dd><input class="hk-verdi" type="number" min="0" max="10" id="' + id + '" inputmode="numeric"><span aria-hidden="true">/10</span></dd></div>'; }).join("") + "</dl></article>").join("") : '<p class="melding">Velg personer i steg 1.</p>';
      Object.entries(gml).forEach(([id, v]) => { if ($(id)) $(id).value = v; });
    };
    const oppdater = () => { tegnListe(); tegnKort(); };
    ["hk-fag", "hk-trinn", "hk-tema"].forEach(id => $(id).addEventListener("change", tegnListe));
    $("hk-fag").value = fag; $("hk-trinn").value = trinn;
    $("hk-sok").addEventListener("input", tegnListe);
    $("hk-liste").addEventListener("change", e => { const c = e.target; if (c.checked) valgt.add(c.value); else valgt.delete(c.value); oppdater(); });
    $("hk-alle").addEventListener("click", () => { vist().forEach(x => valgt.add(x.navn)); oppdater(); });
    $("hk-ingen").addEventListener("click", () => { valgt.clear(); egne = []; oppdater(); });
    $("hk-tilf").addEventListener("click", () => { valgt.clear(); bland(vist()).slice(0, 12).forEach(x => valgt.add(x.navn)); oppdater(); });
    $("hk-e-legg").addEventListener("click", () => { const n = $("hk-e-navn").value.trim(); if (!n) return; egne.push({ navn: n, levde: $("hk-e-levde").value, rolle: $("hk-e-rolle").value, tekst: $("hk-e-tekst").value }); ["hk-e-navn", "hk-e-levde", "hk-e-rolle", "hk-e-tekst"].forEach(id => { $(id).value = ""; }); oppdater(); });
    document.querySelectorAll(".hk-kat input").forEach(i => i.addEventListener("input", tegnKort));
    $("hk-print").addEventListener("click", () => { document.body.classList.add("hk-skriv"); window.print(); document.body.classList.remove("hk-skriv"); });
    $("hk-ark").addEventListener("click", () => {
      const liste = personer.filter(x => valgt.has(x.navn)).concat(egne);
      const w = document.createElement("div"); w.className = "hk-arket";
      w.innerHTML = "<h2>Begrunnelsesark – Historiske kort</h2><table><thead><tr><th>Person</th><th>Kategori</th><th>Verdi</th><th>Begrunnelse: … fordi …</th></tr></thead><tbody>" + liste.map(x => "<tr><td>" + esc(x.navn) + "</td><td></td><td></td><td></td></tr>").join("") + "</tbody></table>";
      document.body.appendChild(w); document.body.classList.add("hk-skriv-ark"); window.print(); document.body.classList.remove("hk-skriv-ark"); w.remove();
    });
    if (temaId) personer.filter(x => x.temaer.some(t => t.id === temaId)).forEach(x => valgt.add(x.navn));
    oppdater();
  }
  document.addEventListener("DOMContentLoaded", bygg);
})();
