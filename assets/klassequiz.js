/* =========================================================
   Les verden – Klassequiz på storskjerm (klassequiz.html)
   Læreren velger et tema, en tekst i Reading Room eller et land, og
   spørsmålene vises stort på tavla. Elevene svarer med fingrene (A–D)
   eller på små tavler. Spørsmål fra temaene lages automatisk av begreper,
   personer og tidslinje. Ingen innlogging, ingenting lagres.
   klassequiz.html?kilde=tema:sf10-apartheid&antall=10&tid=20
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const ren = s => String(s || "").replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1").replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, "$1");
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const FORMER = ["▲", "◆", "●", "■"];

  // ---------- Lag spørsmål fra et tema ----------
  function fraTema(t) {
    const en = t.sprak === "en", Q = [];
    const forkl = v => { let f = String(v); if (en) { const i = f.indexOf(" – "); if (i > 0) f = f.slice(i + 3); } f = ren(f); return f.charAt(0).toUpperCase() + f.slice(1); };
    const ord = Object.entries(t.ord || {}).map(([k, v]) => [k, forkl(v)]);
    if (ord.length >= 4) ord.forEach(([k, f], i) => {
      const andre = bland(ord.filter((_, j) => j !== i)).slice(0, 3).map(x => x[1]);
      Q.push({ s: en ? "What does «" + k + "» mean?" : "Hva betyr «" + k + "»?", valg: [f].concat(andre), riktig: 0 });
      Q.push({ s: (en ? "Which term is this? " : "Hvilket begrep er dette? ") + "«" + f + "»", valg: [k].concat(bland(ord.filter((_, j) => j !== i)).slice(0, 3).map(x => x[0])), riktig: 0 });
    });
    const pers = t.personer || [];
    if (pers.length >= 4) pers.forEach((p, i) => {
      const hint = p.rolle + (p.levde ? " (" + p.levde + ")" : "");
      Q.push({ s: (en ? "Who is this? " : "Hvem er dette? ") + hint, valg: [p.navn].concat(bland(pers.filter((_, j) => j !== i)).slice(0, 3).map(x => x.navn)), riktig: 0 });
    });
    const tl = (t.tidslinje || []).filter((h, i, a) => a.findIndex(x => x.dato === h.dato) === i);
    if (tl.length >= 4) tl.forEach((h, i) => {
      Q.push({ s: (en ? "When did this happen? " : "Når skjedde dette? ") + ren(h.tekst), valg: [h.dato].concat(bland(tl.filter((_, j) => j !== i)).slice(0, 3).map(x => x.dato)), riktig: 0 });
    });
    return Q;
  }

  // ---------- Kildene ----------
  function kildeValg() {
    const tema = ["samfunnsfag", "engelsk"].map(f => '<optgroup label="' + LV.fagNavn[f] + '">' + (LV.temaer || []).filter(t => t.fag === f).sort((a, b) => a.trinn - b.trinn).map(t => '<option value="tema:' + t.id + '">' + t.trinn + ". – " + esc(t.tittel) + "</option>").join("") + "</optgroup>").join("");
    const les = '<optgroup label="Reading Room">' + (LV.lesetekster || []).filter(t => LV.lesequiz && LV.lesequiz[t.id]).map(t => '<option value="lesing:' + t.id + '">' + esc(t.tittel) + "</option>").join("") + "</optgroup>";
    const land = '<optgroup label="Landsider (engelsk)">' + (LV.landliste || []).map(l => '<option value="land:' + l.id + '">' + l.flagg + " " + esc(l.navn) + "</option>").join("") + "</optgroup>";
    return tema + les + land;
  }
  async function hentSporsmal(kilde) {
    const [type, id] = kilde.split(":");
    if (type === "tema") {
      const kat = LV.temaer.find(t => t.id === id); if (!kat) throw new Error("tema");
      LV.tema = null; await LV.lastSkript("data/temaer/" + encodeURIComponent(id) + ".js");
      return { tittel: kat.tittel, en: LV.tema.sprak === "en", lenke: "tema.html?id=" + id, q: fraTema(LV.tema) };
    }
    if (type === "lesing") {
      const t = LV.lesetekster.find(x => x.id === id); if (!t) throw new Error("lesing");
      return { tittel: t.tittel, en: true, lenke: "lesing.html?id=" + id, q: LV.lesequiz[id].map(x => Object.assign({}, x)) };
    }
    if (type === "land") {
      const l = LV.landliste.find(x => x.id === id); if (!l) throw new Error("land");
      LV.land = null; await LV.lastSkript("data/land/" + encodeURIComponent(id) + ".js");
      return { tittel: l.navn, en: true, lenke: "land.html?id=" + id, q: (LV.land.quiz || []).map(x => Object.assign({}, x)) };
    }
    throw new Error("kilde");
  }

  // ---------- Oppsett ----------
  function oppsett() {
    const p = new URLSearchParams(location.search);
    document.title = "Klassequiz – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › Klassequiz</nav>' +
      '<header class="sidehode"><p class="overlinje">For storskjerm</p><h1>📺 Klassequiz</h1><p class="ingress">Vis spørsmålene stort på tavla. Elevene svarer med fingrene (1–4) eller på små tavler, eller dere stemmer ved å reise dere. Spørsmålene lages av begrepene, personene og tidslinjen i temaet – eller av quizen til en tekst eller et land.</p></header>' +
      '<form class="kq-oppsett" id="kq-oppsett"><label>Hva skal quizen handle om?<select id="kq-kilde">' + kildeValg() + "</select></label>" +
      '<label>Antall spørsmål<select id="kq-antall"><option>5</option><option selected>10</option><option>15</option><option>20</option></select></label>' +
      '<label>Tid per spørsmål<select id="kq-tid"><option value="0">Ingen tidtaker</option><option value="20" selected>20 sekunder</option><option value="30">30 sekunder</option><option value="60">60 sekunder</option></select></label>' +
      '<button class="knapp hoved kq-start" type="submit">▶ Start quizen</button></form>' +
      '<div class="kq-tips"><h2>Tips</h2><ul><li><strong>Fullskjerm:</strong> Trykk på ⛶ i quizen, eller F11.</li><li><strong>Tastatur:</strong> <kbd>Mellomrom</kbd> viser svaret, <kbd>→</kbd> går til neste spørsmål.</li><li><strong>Fingrene:</strong> Elevene viser 1, 2, 3 eller 4 fingre – eller tegner formen ▲ ◆ ● ■ på en liten tavle.</li><li>Lenken i adressefeltet tar vare på valget ditt, så du kan bokmerke den.</li></ul></div>';
    if (p.get("kilde")) $("kq-kilde").value = p.get("kilde");
    if (p.get("antall")) $("kq-antall").value = p.get("antall");
    if (p.get("tid")) $("kq-tid").value = p.get("tid");
    $("kq-oppsett").addEventListener("submit", async e => {
      e.preventDefault();
      const kilde = $("kq-kilde").value, antall = +$("kq-antall").value, tid = +$("kq-tid").value;
      history.replaceState(null, "", "klassequiz.html?kilde=" + encodeURIComponent(kilde) + "&antall=" + antall + "&tid=" + tid);
      try { const d = await hentSporsmal(kilde); if (!d.q.length) throw new Error("tom"); spill(d, antall, tid); }
      catch (er) { alert("Dette temaet har for lite innhold til en quiz. Velg et annet."); }
    });
  }

  // ---------- Selve quizen ----------
  function spill(d, antall, tid) {
    const liste = bland(d.q).slice(0, antall).map(q => { const r = bland(q.valg.map((v, i) => i)).slice(0, 4); if (!r.includes(q.riktig || 0)) r[0] = q.riktig || 0; return Object.assign({}, q, { rekke: bland(r) }); });
    let n = 0, klokke = null, igjen = 0, vist = false;
    document.body.classList.add("kq-aktiv");
    $("innhold").innerHTML = '<div class="kq-skjerm"' + (d.en ? ' lang="en"' : "") + '><div class="kq-topp"><span class="kq-tittel">' + esc(d.tittel) + '</span><span class="kq-nr" id="kq-nr"></span><span class="kq-klokke" id="kq-klokke" aria-live="off"></span><button class="kq-ikon" type="button" id="kq-full" title="Fullskjerm" aria-label="Fullskjerm">⛶</button><button class="kq-ikon" type="button" id="kq-lukk" title="Avslutt" aria-label="Avslutt quizen">✕</button></div>' +
      '<div class="kq-tidbar"><div id="kq-tidbar"></div></div><h1 class="kq-sporsmal" id="kq-sporsmal"></h1><ol class="kq-valg" id="kq-valg"></ol><p class="kq-forklaring" id="kq-forklaring" aria-live="polite"></p>' +
      '<div class="kq-knapper" lang="nb"><button class="knapp hoved" type="button" id="kq-vis">Vis svaret (mellomrom)</button><button class="knapp hoved" type="button" id="kq-neste" hidden>Neste →</button></div></div>';
    const stopp = () => { clearInterval(klokke); klokke = null; };
    const vis = () => {
      const q = liste[n]; vist = false; stopp();
      $("kq-nr").textContent = (n + 1) + " / " + liste.length;
      $("kq-sporsmal").textContent = ren(q.s);
      $("kq-valg").innerHTML = q.rekke.map((j, pos) => '<li class="kq-alt kq-alt-' + pos + '" data-j="' + j + '"><span class="kq-form" aria-hidden="true">' + FORMER[pos] + '</span><span class="kq-bokstav">' + (pos + 1) + '</span><span class="kq-tekst">' + esc(ren(q.valg[j])) + "</span></li>").join("");
      $("kq-forklaring").textContent = "";
      $("kq-vis").hidden = false; $("kq-neste").hidden = true;
      if (tid) { igjen = tid; $("kq-klokke").textContent = igjen; $("kq-tidbar").style.width = "100%";
        klokke = setInterval(() => { igjen--; $("kq-klokke").textContent = Math.max(0, igjen); $("kq-tidbar").style.width = Math.max(0, igjen / tid * 100) + "%"; if (igjen <= 0) visSvar(); }, 1000); }
      else { $("kq-klokke").textContent = ""; $("kq-tidbar").style.width = "0"; }
    };
    const visSvar = () => {
      if (vist) return; vist = true; stopp();
      const q = liste[n];
      document.querySelectorAll(".kq-alt").forEach(li => li.classList.add(+li.dataset.j === (q.riktig || 0) ? "riktig" : "feil"));
      $("kq-forklaring").textContent = q.forklaring ? ren(q.forklaring) : "";
      $("kq-vis").hidden = true; $("kq-neste").hidden = false; $("kq-neste").textContent = n < liste.length - 1 ? "Neste →" : "Avslutt";
      $("kq-neste").focus();
    };
    const neste = () => {
      if (!vist) return;
      if (n < liste.length - 1) { n++; vis(); return; }
      stopp();
      $("kq-sporsmal").textContent = "Ferdig! 🎉";
      $("kq-valg").innerHTML = ""; $("kq-nr").textContent = ""; $("kq-klokke").textContent = ""; $("kq-tidbar").style.width = "0";
      $("kq-forklaring").innerHTML = '<span lang="nb">Snakk om spørsmålene som var vanskeligst. <a href="' + d.lenke + '">Gå til ' + esc(d.tittel) + "</a></span>";
      $("kq-vis").hidden = true; $("kq-neste").hidden = false; $("kq-neste").textContent = "↺ Ny runde";
      $("kq-neste").onclick = () => { $("kq-neste").onclick = null; spill(d, antall, tid); };
    };
    $("kq-vis").addEventListener("click", visSvar);
    $("kq-neste").addEventListener("click", () => { if (!$("kq-neste").onclick) neste(); });
    $("kq-lukk").addEventListener("click", avslutt);
    $("kq-full").addEventListener("click", () => { if (document.fullscreenElement) document.exitFullscreen(); else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen(); });
    document.onkeydown = e => {
      if (e.target.matches("input, select, textarea")) return;
      if (e.key === " ") { e.preventDefault(); if (!vist) visSvar(); else if (!$("kq-neste").onclick) neste(); }
      else if (e.key === "ArrowRight") { if (vist && !$("kq-neste").onclick) neste(); }
      else if (e.key === "Escape" && !document.fullscreenElement) avslutt();
    };
    vis();
  }
  function avslutt() {
    document.onkeydown = null; document.body.classList.remove("kq-aktiv");
    if (document.fullscreenElement) document.exitFullscreen();
    oppsett();
  }

  document.addEventListener("DOMContentLoaded", oppsett);
})();
