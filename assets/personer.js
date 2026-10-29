/* =========================================================
   Les verden – personsiden
   Samler feltet «personer» fra alle temaene. Samme person fra flere
   temaer vises én gang, med lenke til alle temaene.
   Inneholder også quizen «Hvem er jeg?». Ingenting lagres.
   ========================================================= */

(function () {
  const LV = window.LV;

  let personer = [];
  let fag = "", trinn = "", sok = "", sorter = "tid";
  let quiz = { riktig: 0, totalt: 0, gjeldende: null, sist: null };

  function fodt(p) {
    const m = String(p.levde || "").match(/\d{3,4}/);
    return m ? Number(m[0]) : 9999;
  }

  function samle(temaer) {
    const kart = new Map();
    temaer.forEach(({ kat, tema }) => {
      (tema.personer || []).forEach(p => {
        const nokkel = p.navn.toLowerCase();
        if (!kart.has(nokkel)) kart.set(nokkel, Object.assign({}, p, { sprak: tema.sprak === "en" ? "en" : "nb", temaer: [] }));
        const b = kart.get(nokkel);
        if ((p.tekst || "").length > (b.tekst || "").length) { b.tekst = p.tekst; b.rolle = p.rolle; b.levde = p.levde; }
        if (!b.temaer.some(t => t.id === kat.id)) b.temaer.push({ id: kat.id, tittel: kat.tittel, fag: kat.fag, trinn: kat.trinn });
      });
    });
    return [...kart.values()];
  }

  function passer(p, medSok) {
    if (fag && !p.temaer.some(t => t.fag === fag)) return false;
    if (trinn && !p.temaer.some(t => String(t.trinn) === trinn)) return false;
    if (medSok && sok) {
      const tekst = (p.navn + " " + p.rolle + " " + p.tekst + " " + p.levde).toLowerCase();
      if (!sok.toLowerCase().split(/\s+/).every(o => tekst.includes(o))) return false;
    }
    return true;
  }

  function temalenker(p) {
    return '<span class="tema-lenker" lang="nb">' + p.temaer.map(t =>
      '<a class="tema-lenke fag-' + t.fag + '" href="tema.html?id=' + encodeURIComponent(t.id) + '">' + LV.esc(t.tittel) + "</a>").join("") + "</span>";
  }

  function tegn() {
    const utvalg = personer.filter(p => passer(p, true)).sort(sorter === "tid"
      ? (a, b) => fodt(a) - fodt(b) || a.navn.localeCompare(b.navn, "nb")
      : (a, b) => a.navn.localeCompare(b.navn, "nb"));
    document.getElementById("antall").textContent =
      utvalg.length ? "Viser " + utvalg.length + " personer." : "Ingen personer passer med søket.";
    document.getElementById("personer").innerHTML = utvalg.map(p =>
      '<div class="personkort-wrap fag-' + p.temaer[0].fag + '"' + (p.sprak === "en" ? ' lang="en"' : "") + ">" + LV.personkort(p, temalenker(p)) + "</div>").join("");

    document.querySelectorAll("[data-fag]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.fag === fag)));
    document.querySelectorAll("[data-trinn]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.trinn === trinn)));
    document.querySelectorAll("[data-sorter]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.sorter === sorter)));
  }

  // ---------- Hvem er jeg? ----------
  function skjulNavn(tekst, navn) {
    let t = tekst;
    navn.replace(/\b(Jr|Queen|King)\.?/g, "").split(/[\s.]+/).filter(d => d.length > 2).forEach(d => {
      t = t.split(d).join("___");
    });
    return t;
  }
  function blandet(liste) {
    const a = liste.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function nyttSporsmal() {
    const ut = document.getElementById("hej-innhold");
    const mulige = personer.filter(p => passer(p, false));
    if (mulige.length < 4) {
      ut.innerHTML = '<p class="hej-tom">Det må være minst fire personer i utvalget for å spille. Velg et annet fag eller trinn.</p>';
      return;
    }
    let kandidater = mulige.filter(p => p !== quiz.sist);
    const riktig = kandidater[Math.floor(Math.random() * kandidater.length)];
    quiz.gjeldende = riktig; quiz.sist = riktig;
    // Feilsvar: helst fra samme språk/fag, så det ikke blir for lett
    const like = blandet(mulige.filter(p => p !== riktig && p.sprak === riktig.sprak));
    const andre = blandet(mulige.filter(p => p !== riktig && p.sprak !== riktig.sprak));
    const valg = blandet([riktig].concat(like.concat(andre).slice(0, 3)));

    ut.innerHTML = '<blockquote class="hej-ledetrad"' + (riktig.sprak === "en" ? ' lang="en"' : "") + ">" + LV.esc(skjulNavn(riktig.tekst, riktig.navn)) + "</blockquote>" +
      '<p class="hej-hint"><button class="knapp liten" id="hej-hint-knapp">Vis hint</button> <span id="hej-hint" hidden>Levde: ' + LV.esc(riktig.levde) + "</span></p>" +
      '<div class="hej-valg" role="group" aria-label="Svaralternativer">' + valg.map((p, i) =>
        '<button class="hej-alternativ" data-i="' + i + '">' + LV.esc(p.navn) + "</button>").join("") + "</div>" +
      '<p class="hej-svar" id="hej-svar" aria-live="polite"></p>';
    document.getElementById("hej-hint-knapp").addEventListener("click", function () {
      document.getElementById("hej-hint").hidden = false; this.remove();
    });
    ut.querySelectorAll(".hej-alternativ").forEach(b => b.addEventListener("click", () => svar(b, valg[Number(b.dataset.i)])));
  }
  function svar(knapp, valgt) {
    const r = quiz.gjeldende;
    const knapper = document.querySelectorAll(".hej-alternativ");
    knapper.forEach(k => { k.disabled = true; if (k.textContent === r.navn) k.classList.add("riktig"); });
    quiz.totalt++;
    const svarUt = document.getElementById("hej-svar");
    if (valgt === r) {
      quiz.riktig++;
      knapp.insertAdjacentHTML("afterbegin", '<span aria-hidden="true">✓ </span>');
      svarUt.innerHTML = "<strong>Riktig!</strong> ";
    } else {
      knapp.classList.add("feil");
      knapp.insertAdjacentHTML("afterbegin", '<span aria-hidden="true">✗ </span>');
      svarUt.innerHTML = "<strong>Ikke helt.</strong> Riktig svar er " + LV.esc(r.navn) + ". ";
    }
    svarUt.innerHTML += LV.esc(r.navn) + " (" + LV.esc(r.levde) + ") – " + LV.esc(r.rolle) + ". " +
      '<span class="hej-videre"><button class="knapp hoved" id="hej-neste">Neste person →</button> ' +
      "<a href=\"tema.html?id=" + encodeURIComponent(r.temaer[0].id) + '">Les mer i temaet</a></span>';
    document.getElementById("hej-poeng").textContent = quiz.riktig + " av " + quiz.totalt + " riktige";
    const neste = document.getElementById("hej-neste");
    neste.addEventListener("click", nyttSporsmal);
    neste.focus();
  }

  function oppdaterAdresse() {
    const p = new URLSearchParams();
    if (fag) p.set("fag", fag);
    if (trinn) p.set("trinn", trinn);
    if (sok) p.set("sok", sok);
    if (sorter !== "tid") p.set("sorter", sorter);
    history.replaceState(null, "", "personer.html" + (p.toString() ? "?" + p : ""));
  }

  document.addEventListener("DOMContentLoaded", async function () {
    fag = LV.param("fag") || "";
    trinn = LV.param("trinn") || "";
    sok = LV.param("sok") || "";
    sorter = LV.param("sorter") === "navn" ? "navn" : "tid";
    const sokFelt = document.getElementById("sok");
    sokFelt.value = sok;

    personer = samle(await LV.lastAlleTemaer());
    tegn();
    nyttSporsmal();

    const endretFilter = () => { oppdaterAdresse(); tegn(); nyttSporsmal(); };
    document.querySelectorAll("[data-fag]").forEach(b => b.addEventListener("click", () => { fag = b.dataset.fag; endretFilter(); }));
    document.querySelectorAll("[data-trinn]").forEach(b => b.addEventListener("click", () => { trinn = b.dataset.trinn; endretFilter(); }));
    document.querySelectorAll("[data-sorter]").forEach(b => b.addEventListener("click", () => { sorter = b.dataset.sorter; oppdaterAdresse(); tegn(); }));
    let tid;
    sokFelt.addEventListener("input", () => { clearTimeout(tid); tid = setTimeout(() => { sok = sokFelt.value.trim(); oppdaterAdresse(); tegn(); }, 150); });
  });
})();
