/* =========================================================
   Les verden – Lesestrategier (lesestrategier.html)
   Én side med alle strategiene, gruppert før / under / etter lesing.
   Hver strategi har et anker (#forutsi, #stopp …) som «Stopp og tenk»-
   boksene i tekstene lenker til. VØL-skjemaet kan kopieres – ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
  const navn = () => (LV.config ? LV.config.navn : "Les verden");

  function bygg() {
    const D = LV.lesestrategier;
    const finn = id => D.strategier.find(s => s.id === id);
    document.title = "Lesestrategier – " + navn();
    const faser = ["for", "under", "etter"];

    let h = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › Lesestrategier</nav>' +
      '<header class="sidehode"><p class="overlinje" lang="en">Reading strategies</p><h1>Lesestrategier</h1>' +
      '<p class="ingress">Gode lesere gjør mer enn å lese ordene. De forbereder seg, følger med på om de forstår, og tenker over teksten etterpå. Her er strategiene du kan bruke – med eksempler fra tekstene på siden.</p></header>';

    // Oversikt: tre faser
    h += '<section class="ls-faser" aria-label="Oversikt over strategiene">' + faser.map((f, i) => {
      const fa = D.faser[f];
      return '<div class="ls-fase ls-fase-' + f + '"><h2><span class="ls-fase-nr">' + (i + 1) + "</span> " + fa.navn + ' <span class="ls-en" lang="en">' + fa.en + "</span></h2>" +
        "<p>" + fa.tekst + '</p><ul class="ls-snarvei">' + D.strategier.filter(s => s.fase === f).map(s =>
          '<li><a href="#' + s.id + '"><span aria-hidden="true">' + s.ikon + "</span> " + esc(s.navn) + "</a></li>").join("") + "</ul></div>";
    }).join("") + "</section>";

    // Hvilken strategi passer?
    h += '<section class="ls-velger" aria-labelledby="ls-velger-tittel"><h2 id="ls-velger-tittel">Hvilken strategi passer?</h2>' +
      '<p class="ls-liten">Velg hva slags tekst du skal lese:</p><div class="ls-typer" role="group" aria-label="Teksttype">' +
      D.teksttyper.map(t => '<button class="knapp liten" type="button" data-type="' + t.id + '" aria-pressed="false"><span aria-hidden="true">' + t.ikon + "</span> " + esc(t.navn) + "</button>").join("") +
      '</div><div class="ls-forslag" id="ls-forslag" aria-live="polite"><p class="ls-liten">Trykk på en teksttype for å få forslag.</p></div></section>';

    // Strategiene
    faser.forEach((f, i) => {
      const fa = D.faser[f];
      h += '<section class="ls-gruppe ls-fase-' + f + '"><h2 class="ls-gruppe-tittel"><span class="ls-fase-nr">' + (i + 1) + "</span> " + fa.navn + ' <span class="ls-en" lang="en">' + fa.en + "</span></h2>";
      D.strategier.filter(s => s.fase === f).forEach(s => { h += strategi(s); });
      h += "</section>";
    });

    h += '<p class="fo-merk">Til læreren: «Stopp og tenk»-boksene i tekstene har en liten merkelapp (🧠) som viser hvilken strategi spørsmålet trener, og lenker hit. Merkelappen settes automatisk ut fra ordene i spørsmålet.</p>';
    $("innhold").innerHTML = h;

    // Velger
    document.querySelectorAll(".ls-typer [data-type]").forEach(b => b.addEventListener("click", () => {
      document.querySelectorAll(".ls-typer [data-type]").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      const t = D.teksttyper.find(x => x.id === b.dataset.type);
      $("ls-forslag").innerHTML = '<h3><span aria-hidden="true">' + t.ikon + "</span> " + esc(t.navn) + ' <span class="ls-en" lang="en">' + esc(t.en) + "</span></h3><p>" + fmt(t.tips) + '</p><ol class="ls-forslag-liste">' +
        t.strategier.map(id => { const s = finn(id); return '<li><a href="#' + s.id + '"><span aria-hidden="true">' + s.ikon + "</span> <strong>" + esc(s.navn) + "</strong> – " + esc(s.kort) + '</a> <span class="ls-fase-merke ls-fase-' + s.fase + '">' + D.faser[s.fase].navn + "</span></li>"; }).join("") +
        '</ol><p><a class="knapp" href="' + t.lenke.u + '">Prøv: ' + esc(t.lenke.t) + " →</a></p>";
    }));

    // VØL-skjema
    const vol = document.querySelector(".ls-vol");
    if (vol) {
      vol.querySelector(".ls-vol-kopier").addEventListener("click", () => {
        const felt = [...vol.querySelectorAll("textarea")];
        const tema = vol.querySelector("input").value.trim();
        if (!felt.some(x => x.value.trim())) { vol.querySelector(".status").textContent = "Du har ikke skrevet noe ennå."; return; }
        const tekst = "VØL-skjema" + (tema ? ": " + tema : "") + "\n\n" + felt.map(x => x.dataset.navn.toUpperCase() + "\n" + (x.value.trim() || "–")).join("\n\n");
        const ok = () => { vol.querySelector(".status").textContent = "Kopiert! Lim inn i et dokument."; };
        const reserve = () => { const x = document.createElement("textarea"); x.value = tekst; document.body.appendChild(x); x.select(); let lyktes = false; try { lyktes = document.execCommand("copy"); } catch (e) { lyktes = false; } x.remove(); if (lyktes) ok(); else window.prompt("Ctrl+C / Cmd+C", tekst); };
        if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(tekst).then(ok, reserve); else reserve();
      });
      vol.querySelector(".ls-vol-slett").addEventListener("click", () => {
        vol.querySelectorAll("textarea, input").forEach(x => { x.value = ""; });
        vol.querySelector(".status").textContent = "Skjemaet er tømt.";
      });
    }

    // Hopp til strategien i adressen (#forutsi) etter at siden er bygd
    if (location.hash) {
      const mal = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (mal) setTimeout(() => mal.scrollIntoView(), 30);
    }
  }

  function strategi(s) {
    let h = '<article class="ls-strategi" id="' + s.id + '" tabindex="-1">' +
      '<header class="ls-hode"><span class="ls-ikon" aria-hidden="true">' + s.ikon + '</span><div><h3>' + esc(s.navn) + ' <span class="ls-en" lang="en">' + esc(s.en) + "</span></h3>" +
      '<p class="ls-kort">' + esc(s.kort) + "</p></div></header>" +
      '<div class="ls-kropp"><div class="ls-tekst"><h4>Hva er det?</h4><p>' + fmt(s.hva) + "</p><h4>Hvorfor hjelper det?</h4><p>" + fmt(s.hvorfor) + "</p></div>" +
      '<div class="ls-steg"><h4>Slik gjør du</h4><ol>' + s.steg.map(x => "<li>" + fmt(x) + "</li>").join("") + "</ol></div></div>";
    h += '<div class="ls-eksempel"><span class="ls-eksempel-tittel">Eksempel</span><p>' + fmt(s.eksempel) + "</p></div>";
    if (s.startere && s.startere.length) h += '<div class="ls-startere"><span class="ls-liten">Setningsstartere på engelsk:</span><ul lang="en">' + s.startere.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul></div>";
    if (s.skjema) {
      h += '<div class="ls-vol"><h4>Prøv VØL-skjemaet</h4><p class="ls-liten">Skriv i feltene og kopier skjemaet når du er ferdig. Ingenting lagres.</p>' +
        '<label class="ls-vol-tema">Tema eller tekst: <input type="text" autocomplete="off" placeholder="For eksempel: Apartheid"></label><div class="ls-vol-rad">' +
        [["v", "V – Dette vet jeg", "Know"], ["o", "Ø – Dette vil jeg vite", "Want to know"], ["l", "L – Dette lærte jeg", "Learned"]].map(([k, t, en]) =>
          '<label class="ls-vol-kol"><span><strong>' + t + '</strong> <span class="ls-en" lang="en">' + en + '</span></span><textarea rows="6" data-navn="' + t + '"></textarea></label>').join("") +
        '</div><div class="ls-vol-knapper"><button class="knapp hoved ls-vol-kopier" type="button">Kopier skjemaet</button><button class="knapp ls-vol-slett" type="button">Tøm</button><span class="status" role="status" aria-live="polite"></span></div></div>';
    }
    h += '<p class="ls-prov"><span class="ls-liten">Prøv selv:</span> ' + s.prov.map(p => '<a href="' + p.u + '">' + esc(p.t) + "</a>").join(" · ") + "</p></article>";
    return h;
  }

  document.addEventListener("DOMContentLoaded", bygg);
})();
