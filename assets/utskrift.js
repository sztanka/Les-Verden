/* =========================================================
   Les verden – utskrift og arbeidsark
   Legger knappen «🖨️ Skriv ut» i svarlinja nederst (temasider, Reading Room,
   landsider). Eleven eller læreren velger hva som skal med, og om svarfeltene
   skal skrives ut som tomme skrivelinjer (arbeidsark) eller med svarene.
   Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const DELER = [
    ["details.sammendrag", "Lettlest sammendrag", false],
    ["#fagtekst", "Fagteksten", true],
    [".tidslinje", "Tidslinje", true],
    [".personer-tema", "Personer", false],
    [".begrepsliste", "Begreper", true],
    [".oppgaver", "Oppgaver", true],
    ["#egenvurdering", "Egenvurdering og avslutningslapp", true],
    ["#ld-skjema", "Lesedagboka", true],
    ["#for", "Before you read", true],
    ["#les", "Teksten (den fanen som er valgt)", true],
    ["#etter", "After reading", true],
    [".temabilde, .lr-omslag, figure", "Bilder", false]
  ];
  const ALLTID_BORT = ".spill-og-ov, .landstripe, .lr-andre, .lr-verktoy, .lr-hopp, .opplesing, .temaliste, .km-boks, .fo-laerer, .lr-qstrat, .stopp-strategi, .vk-cta, .sp-banner, .ordbok-tips, iframe, .video, .lr-qresultat button";

  function dialog() {
    const finnes = DELER.filter(([sel]) => document.querySelector("#innhold " + sel.split(",").join(", #innhold ")));
    const nivaer = [...document.querySelectorAll(".nivapanel")];
    const d = document.createElement("dialog");
    d.className = "us-dialog";
    d.setAttribute("aria-labelledby", "us-tittel");
    d.innerHTML = '<form method="dialog"><h2 id="us-tittel">🖨️ Skriv ut</h2>' +
      (finnes.length ? '<fieldset><legend>Hva skal være med?</legend>' + finnes.map(([sel, navn, på], i) => '<label><input type="checkbox" data-del="' + i + '"' + (på ? " checked" : "") + "> " + navn + "</label>").join("") + "</fieldset>" : "") +
      (nivaer.length ? '<fieldset><legend>Oppgavenivå</legend>' + nivaer.map((p, i) => '<label><input type="checkbox" data-niva="' + p.id + '" checked> Nivå ' + (i + 1) + "</label>").join("") + "</fieldset>" : "") +
      (document.querySelector("#fagtekst, #les") ? '<fieldset><legend>Utforming</legend><label><input type="radio" name="us-form" value="vanlig" checked> Vanlig</label><label><input type="radio" name="us-form" value="hefte"> Lesehefte – bred marg for notater, nummererte avsnitt og lesetegn</label></fieldset>' : "") +
      '<fieldset><legend>Svarfeltene</legend><label><input type="radio" name="us-svar" value="tom" checked> Tomme skrivelinjer (arbeidsark)</label><label><input type="radio" name="us-svar" value="mine"> Ta med svarene jeg har skrevet</label></fieldset>' +
      '<label class="us-navn"><input type="checkbox" id="us-hode" checked> Linje for navn, klasse og dato øverst</label>' +
      '<div class="us-knapper"><button class="knapp hoved" value="skriv" id="us-skriv">Skriv ut</button><button class="knapp" value="avbryt">Avbryt</button></div>' +
      '<p class="us-tips">Tips: Velg «Lagre som PDF» i utskriftsvinduet for å få en fil du kan dele.</p></form>';
    document.body.appendChild(d);
    d.addEventListener("close", () => {
      if (d.returnValue === "skriv") skrivUt(d, finnes);
      d.remove();
    });
    d.showModal();
  }

  function skrivUt(d, finnes) {
    const bort = [], laget = [];
    finnes.forEach(([sel], i) => {
      if (!d.querySelector('[data-del="' + i + '"]').checked) document.querySelectorAll(sel.split(",").map(s => "#innhold " + s.trim()).join(",")).forEach(el => { el.classList.add("us-bort"); bort.push(el); });
    });
    d.querySelectorAll("[data-niva]").forEach(c => { const p = document.getElementById(c.dataset.niva); if (!c.checked && p) { p.classList.add("us-bort"); bort.push(p); } });
    document.querySelectorAll(ALLTID_BORT).forEach(el => { el.classList.add("us-bort"); bort.push(el); });
    // Svarfelt → skrivelinjer eller svarene
    const mine = d.querySelector('input[name="us-svar"]:checked').value === "mine";
    document.querySelectorAll("textarea").forEach(t => {
      const div = document.createElement("div");
      div.className = "us-svar";
      if (mine && t.value.trim()) { div.classList.add("us-utfylt"); div.textContent = t.value; }
      else { const n = Math.max(3, Math.min(10, Number(t.getAttribute("rows")) + 1 || 4)); div.innerHTML = '<span class="us-linje"></span>'.repeat(n); }
      t.after(div); laget.push(div);
    });
    // Lukkede detaljer og skjulte nivåpaneler som skal med, må åpnes
    const lukket = [...document.querySelectorAll("#innhold details:not([open])")].filter(x => !x.closest(".us-bort"));
    lukket.forEach(x => x.setAttribute("open", ""));
    if (d.querySelector("#us-hode").checked) {
      const hode = document.createElement("div");
      hode.className = "us-hode";
      hode.innerHTML = "<span>Navn: </span><span>Klasse: </span><span>Dato: </span>";
      document.getElementById("innhold").prepend(hode); laget.push(hode);
    }
    const fot = document.createElement("p");
    fot.className = "us-fot";
    fot.textContent = (LV.config ? LV.config.navn : "Les verden") + " – " + location.href.split("#")[0];
    document.getElementById("innhold").append(fot); laget.push(fot);
    const hefte = d.querySelector('input[name="us-form"]:checked');
    if (hefte && hefte.value === "hefte") {
      document.body.classList.add("us-lesehefte");
      const mal = document.querySelector("#innhold #fagtekst, #innhold #les");
      if (mal) {
        const boks = document.createElement("div");
        boks.className = "us-lesetegn";
        boks.innerHTML = "<p><strong>Lesetegn i margen:</strong> <span>✓ Dette forstår jeg</span> <span>? Dette lurer jeg på</span> <span>! Dette er viktig</span> <span>~ Nytt eller vanskelig ord</span> <span>↔ Henger sammen med noe annet</span></p>" +
          "<p><strong>Før du leser:</strong> Se på overskriftene. Hva tror du teksten handler om?</p><div class=\"us-svar\">" + '<span class="us-linje"></span>'.repeat(2) + "</div>" +
          "<p><strong>Etter at du har lest:</strong> Skriv det viktigste i teksten med egne ord på baksiden av arket.</p>";
        mal.before(boks); laget.push(boks);
      }
    }
    document.body.classList.add("us-aktiv");
    const rydd = () => {
      bort.forEach(el => el.classList.remove("us-bort"));
      laget.forEach(el => el.remove());
      lukket.forEach(x => x.removeAttribute("open"));
      document.body.classList.remove("us-aktiv", "us-lesehefte");
      window.removeEventListener("afterprint", rydd);
    };
    window.addEventListener("afterprint", rydd);
    setTimeout(() => { window.print(); setTimeout(() => { if (document.body.classList.contains("us-aktiv")) rydd(); }, 1500); }, 60);
  }

  function leggTilKnapp() {
    const linje = document.querySelector(".svarlinje-indre");
    if (!linje || linje.querySelector(".us-knapp")) return !!linje;
    const b = document.createElement("button");
    b.type = "button"; b.className = "knapp us-knapp"; b.innerHTML = '<span aria-hidden="true">🖨️</span> <span class="knapp-tekst">Skriv ut</span>';
    b.title = "Skriv ut siden som arbeidsark eller med svarene dine";
    b.addEventListener("click", dialog);
    const status = linje.querySelector(".status");
    linje.insertBefore(b, status || null);
    return true;
  }
  document.addEventListener("DOMContentLoaded", () => {
    if (leggTilKnapp()) return;
    const obs = new MutationObserver(() => { if (leggTilKnapp()) obs.disconnect(); });
    obs.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => obs.disconnect(), 15000);
  });
  LV.skrivUt = dialog;
})();
