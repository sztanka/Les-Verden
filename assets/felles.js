/* =========================================================
   Les verden – felles kode for alle sider
   Lager toppmeny, lesestøtte og bunntekst, og har små hjelpefunksjoner.
   Ingenting lagres: ingen localStorage, ingen cookies, ingen sporing.
   ========================================================= */

window.LV = window.LV || {};

(function () {
  const LV = window.LV;

  // ---------- Hjelpefunksjoner ----------
  LV.esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  };

  LV.param = function (navn) {
    return new URLSearchParams(location.search).get(navn);
  };

  LV.fagNavn = { samfunnsfag: "Samfunnsfag", engelsk: "Engelsk" };

  // Delene av samfunnsfag. Feltet «emne» i oversikt.js bruker disse nøklene.
  LV.emner = {
    historie: { navn: "Historie", ikon: "🏛️", tekst: "Hvordan fortiden har formet verden vi lever i – kriger, revolusjoner og vanlige menneskers liv." },
    geografi: { navn: "Geografi", ikon: "🗺️", tekst: "Klima, ressurser og samarbeid på tvers av grenser – hvordan mennesker og natur påvirker hverandre." },
    samfunnskunnskap: { navn: "Samfunnskunnskap", ikon: "⚖️", tekst: "Demokrati, makt, konflikter og hvordan vi lever sammen i samfunnet i dag." }
  };

  // Merkelapper (fag · del · trinn) brukt på temakort og temasider.
  LV.merker = function (t) {
    const e = t.emne && LV.emner[t.emne];
    return '<span class="merker"><span class="merke">' + LV.fagNavn[t.fag] + "</span>" +
      (e ? '<span class="merke merke-emne">' + e.navn + "</span>" : "") +
      '<span class="merke">' + t.trinn + ". trinn</span></span>";
  };

  // Laster en datafil (vanlig <script>), slik at siden også virker når
  // den åpnes direkte fra disken uten nettserver.
  LV.lastSkript = function (src) {
    return new Promise(function (ok, feil) {
      const s = document.createElement("script");
      s.src = src;
      s.onload = ok;
      s.onerror = function () { feil(new Error("Fant ikke " + src)); };
      document.head.appendChild(s);
    });
  };

  // ---------- Toppmeny ----------
  function lagTopp() {
    const k = LV.config || { navn: "Les verden" };
    const side = document.body.dataset.side || "";
    const fag = LV.param("fag");
    const aktiv = function (navn) {
      if (navn === "forside") return side === "forside" && !fag;
      if (navn === "samfunnsfag" || navn === "engelsk") return (side === "forside" && fag === navn) || (side === "tema" && document.body.dataset.fag === navn);
      return side === navn;
    };
    const lenke = function (href, tekst, navn) {
      return '<a href="' + href + '"' + (aktiv(navn) ? ' aria-current="page"' : "") + ">" + tekst + "</a>";
    };

    const topp = document.createElement("header");
    topp.className = "topp";
    topp.innerHTML =
      '<a class="hopp-til-innhold" href="#innhold">Hopp til innholdet</a>' +
      '<div class="topp-indre">' +
        '<a class="logo" href="index.html"><span class="logo-merke" aria-hidden="true">' + LV.esc(k.forkortelse || "LV") + "</span>" + LV.esc(k.navn) + "</a>" +
        '<nav class="hovedmeny" aria-label="Hovedmeny">' +
          lenke("index.html", "Forside", "forside") +
          lenke("index.html?fag=samfunnsfag", "Samfunnsfag", "samfunnsfag") +
          lenke("index.html?fag=engelsk", "Engelsk", "engelsk") +
          lenke("laerer.html", "For lærere", "laerer") +
        "</nav>" +
        '<button class="knapp" id="lesestotte-knapp" aria-expanded="false" aria-controls="lesestotte">' +
          '<span aria-hidden="true">Aa</span> Lesestøtte</button>' +
      "</div>" +
      '<div class="lesestotte" id="lesestotte" hidden>' +
        '<span class="etikett">Tekststørrelse:</span>' +
        '<button class="knapp" data-skala="-1" aria-label="Mindre tekst">A−</button>' +
        '<button class="knapp" data-skala="0" aria-label="Vanlig tekststørrelse">A</button>' +
        '<button class="knapp" data-skala="1" aria-label="Større tekst">A+</button>' +
        '<button class="knapp" id="skrift-knapp" aria-pressed="false">Lesevennlig skrift</button>' +
        '<button class="knapp" id="tema-knapp" aria-pressed="false">Mørk modus</button>' +
      "</div>";
    document.body.prepend(topp);

    // Lesestøtte (gjelder bare så lenge siden er åpen – ingenting lagres)
    const panel = topp.querySelector("#lesestotte");
    const panelKnapp = topp.querySelector("#lesestotte-knapp");
    panelKnapp.addEventListener("click", function () {
      const apen = panel.hidden;
      panel.hidden = !apen;
      panelKnapp.setAttribute("aria-expanded", String(apen));
    });

    const skalaer = [0.9, 1, 1.15, 1.3, 1.45];
    let skalaIndeks = 1;
    panel.querySelectorAll("[data-skala]").forEach(function (b) {
      b.addEventListener("click", function () {
        const v = Number(b.dataset.skala);
        skalaIndeks = v === 0 ? 1 : Math.min(skalaer.length - 1, Math.max(0, skalaIndeks + v));
        document.documentElement.style.setProperty("--skala", skalaer[skalaIndeks]);
      });
    });

    const skrift = panel.querySelector("#skrift-knapp");
    skrift.addEventListener("click", function () {
      const pa = skrift.getAttribute("aria-pressed") !== "true";
      skrift.setAttribute("aria-pressed", String(pa));
      if (pa) document.documentElement.dataset.skrift = "lesevennlig";
      else delete document.documentElement.dataset.skrift;
    });

    const tema = panel.querySelector("#tema-knapp");
    tema.addEventListener("click", function () {
      const pa = tema.getAttribute("aria-pressed") !== "true";
      tema.setAttribute("aria-pressed", String(pa));
      if (pa) document.documentElement.dataset.tema = "mork";
      else delete document.documentElement.dataset.tema;
    });
  }

  function lagFot() {
    const k = LV.config || {};
    const fot = document.createElement("footer");
    fot.className = "fot";
    fot.innerHTML =
      "<p><strong>" + LV.esc(k.navn || "Les verden") + "</strong> – " + LV.esc(k.undertittel || "") + "</p>" +
      "<p>Siden lagrer ingenting om deg. Svarene dine finnes bare så lenge fanen er åpen. " +
      "Bruk «Kopier mine svar» for å ta vare på dem.</p>";
    document.body.appendChild(fot);
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (LV.config && LV.config.navn) {
      document.title = document.title.replace("Les verden", LV.config.navn);
    }
    lagTopp();
    lagFot();
  });
})();
