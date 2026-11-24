/* =========================================================
   Les verden – Password (passord.html + visning i rom.html)
   Lagene får det samme ordet. Hintgiveren på laget som har tur
   gir ett ords hint (skriftlig eller muntlig), og laget gjetter
   skriftlig – gjetningen vurderes automatisk. Er den feil, går
   turen til det andre laget med et nytt hint. Ordet er verdt
   10 poeng, så 9, 8 … for hvert hint som brukes.
   Med få spillere kan dere spille med ett lag (samarbeid).
   Ordene kommer fra begrepsbanken (data/dagens-begrep.js).
   Klientdelen (LV.romKlient.passord) brukes av spillere og vert.
   Vertsdelen kjører bare på passord.html.
   ========================================================= */
(function () {
  const LV = window.LV;
  const esc = s => LV.esc(String(s == null ? "" : s));
  const LAGFARGE = ["lag-a", "lag-b", "lag-c"];

  // ---------- Visning for spillerne ----------
  LV.romKlient = LV.romKlient || {};
  LV.romKlient.passord = {
    start(el, send) {
      el.innerHTML = '<p class="rk-stor">✅ Du er med!</p><p>Vent på at spillet starter.</p>';
      el.addEventListener("submit", e => {
        const f = e.target.closest("form"); if (!f) return; e.preventDefault();
        const i = f.querySelector("input"); const v = i.value.trim(); if (!v) return;
        send({ t: f.dataset.t, tekst: v }); i.value = "";
      });
      el.addEventListener("click", e => { if (e.target.closest(".pw-muntlig")) send({ t: "hint", tekst: "", muntlig: true }); });
    },
    melding(d, el) {
      if (d.t !== "tilstand") return;
      if (d.fase === "venter") { LV.romTegn(el, '<p class="rk-stor">✅ Du er med!</p><p>Vent på at spillet starter.</p>'); return; }
      const en = d.en ? ' lang="en"' : "";
      const lagHtml = '<div class="pw-lagrad">' + d.lag.map((l, i) => '<div class="pw-lag ' + LAGFARGE[i] + (d.tur === i && (d.fase === "hint" || d.fase === "gjett") ? " pw-tur" : "") + (d.mittLag === i ? " pw-mitt" : "") + '"><p class="pw-lagnavn">' + esc(l.navn) + (d.mittLag === i ? " (ditt lag)" : "") + '</p><p class="pw-poeng">' + l.poeng + '</p><p class="pw-medl">' + l.medlemmer.map(m => esc(m) + (m === l.giver ? " 🗣️" : "")).join(", ") + "</p></div>").join("") + "</div>";
      const logg = d.logg.length ? '<ol class="pw-logg">' + d.logg.map(x => '<li class="' + LAGFARGE[x.lag] + '"><span class="pw-lagmerke">' + esc(d.lag[x.lag].navn) + '</span> 🗣️ <strong' + en + ">" + (x.hint ? esc(x.hint) : "(muntlig hint)") + "</strong>" + (x.gjett ? " → <span" + en + ">" + esc(x.gjett) + "</span> " + (x.ok ? "✔" : "✘") : "") + "</li>").join("") + "</ol>" : "";
      let h = '<p class="pw-topp">Ord ' + d.ordNr + " av " + d.antallOrd + (d.fase === "hint" || d.fase === "gjett" ? " · verdt <strong>" + d.verdi + " poeng</strong>" : "") + "</p>" + lagHtml;
      if (d.ord && (d.fase === "hint" || d.fase === "gjett")) h += '<div class="pw-ordboks"><p class="pw-ledetekst">Ordet er</p><p class="pw-ord"' + en + ">" + esc(d.ord) + '</p><p class="pw-forkl"' + en + ">" + esc(d.forkl) + '</p><p class="rv-merk">Ikke si ordet – og ikke vis skjermen til laget ditt!</p></div>';
      const turNavn = d.lag[d.tur] ? d.lag[d.tur].navn : "";
      if (d.fase === "hint") {
        if (d.rolle === "giver" && d.mittLag === d.tur) h += d.muntlig
          ? '<p><strong>Din tur!</strong> Si ett ord som hint til laget ditt.</p><p><button type="button" class="knapp hoved pw-muntlig">✔ Jeg har sagt hintet</button></p>'
          : '<form class="rk-skjema-rad" data-t="hint" autocomplete="off"><label for="pw-hint">Ditt hint – ett ord</label><input id="pw-hint" maxlength="30" spellcheck="false" autocapitalize="off"' + en + '><button type="submit" class="knapp hoved">Gi hint</button></form>';
        else h += '<p class="pw-status">⏳ Venter på hint fra <strong>' + esc(d.lag[d.tur].giver) + "</strong> (" + esc(turNavn) + ").</p>";
      } else if (d.fase === "gjett") {
        const sistHint = d.logg.length ? d.logg[d.logg.length - 1].hint : "";
        h += '<p class="pw-hintstor">🗣️ ' + (sistHint ? "<span" + en + ">" + esc(sistHint) + "</span>" : "(muntlig hint)") + "</p>";
        if (d.rolle === "gjetter" && d.mittLag === d.tur) h += '<form class="rk-skjema-rad" data-t="gjett" autocomplete="off"><label for="pw-gjett">Hva er ordet?</label><input id="pw-gjett" maxlength="40" spellcheck="false" autocapitalize="off"' + en + '><button type="submit" class="knapp hoved">Gjett</button></form><p class="rv-merk">Bli enige først – den første gjetningen som sendes, gjelder.</p>';
        else h += '<p class="pw-status">⏳ ' + esc(turNavn) + " gjetter …</p>";
      } else if (d.fase === "riktig" || d.fase === "bom") {
        h += '<div class="pw-fasit ' + (d.fase === "riktig" ? "rk-riktig" : "rk-feil") + '"><p class="rk-stor">' + (d.fase === "riktig" ? "✔ " + esc(d.lag[d.vinner].navn) + " fikk " + d.fikk + " poeng!" : "Ingen klarte det denne gangen.") + '</p><p>Ordet var <strong' + en + ">" + esc(d.fasit.ord) + "</strong></p><p" + en + ">" + esc(d.fasit.forkl) + '</p></div><p class="rv-merk">Vent på neste ord …</p>';
      } else if (d.fase === "slutt") {
        const maks = Math.max(...d.lag.map(l => l.poeng));
        h = '<p class="rk-stor">🏁 Spillet er over!</p>' + (d.lag.length > 1 ? "<p>" + d.lag.filter(l => l.poeng === maks).map(l => "🏆 <strong>" + esc(l.navn) + "</strong>").join(" og ") + " vant!</p>" : "<p>Dere fikk <strong>" + d.lag[0].poeng + "</strong> poeng av " + d.antallOrd * 10 + " mulige.</p>") + lagHtml;
      }
      if (d.melding) h += '<p class="bb-melding" role="alert">' + esc(d.melding) + "</p>";
      if (d.fase !== "slutt") h += logg;
      LV.romTegn(el, h);
      if (el._sistFase !== d.fase && d.fase === "riktig") LV.romLyd.riktig();
      el._sistFase = d.fase;
    }
  };

  // ---------- Verten (bare på passord.html) ----------
  if (!document.querySelector('meta[name="lv-vert"][content="passord"]')) return;
  let V = null, S = null;

  const fold = s => String(s || "").toLowerCase().replace(/æ/g, "ae").replace(/ø/g, "o").replace(/å/g, "a").normalize("NFD").replace(/[̀-ͯ]/g, "");
  const norm = s => fold(s).replace(/^(the|a|an|to|en|et|ei)\s+/, "").replace(/[^a-z0-9]/g, "");
  function lev(a, b) { if (Math.abs(a.length - b.length) > 2) return 9; const d = Array.from({ length: a.length + 1 }, (_, i) => [i]); for (let j = 1; j <= b.length; j++) d[0][j] = j; for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[a.length][b.length]; }
  function likt(gjett, ord) {
    const g = norm(gjett), o = norm(ord); if (!g) return false;
    const varianter = [g]; ["ene", "en", "et", "a", "er", "es", "s", "e"].forEach(s => { if (g.endsWith(s) && g.length - s.length >= 3) varianter.push(g.slice(0, -s.length)); });
    const oVar = [o]; ["en", "et", "a", "er", "s", "e"].forEach(s => { if (o.endsWith(s) && o.length - s.length >= 3) oVar.push(o.slice(0, -s.length)); });
    const tol = o.length >= 9 ? 2 : o.length >= 5 ? 1 : 0;
    return varianter.some(v => oVar.includes(v) || lev(v, o) <= tol);
  }
  function ugyldigHint(hint, ord, brukt) {
    const h = hint.trim();
    if (/\s/.test(h)) return "Hintet må være ett ord.";
    const hn = norm(h), on = norm(ord);
    if (hn.length < 2) return "Hintet er for kort.";
    const stamme = on.slice(0, Math.max(4, on.length - 3));
    if (hn.includes(stamme) || (hn.length >= 4 && on.includes(hn)) || ord.toLowerCase().split(/\s+/).some(w => norm(w).length >= 4 && hn.includes(norm(w)))) return "Hintet kan ikke være ordet eller en del av det.";
    if (brukt.includes(hn)) return "Det hintet er allerede brukt.";
    return "";
  }
  const stokk = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  function oppsettHtml() {
    const temaer = [...new Map((LV.dagensBegrep || []).map(b => [b[2], [b[3], b[4]]])).entries()];
    return '<div class="rv-felt"><label for="pw-kilde">Ordene</label><select id="pw-kilde"><option value="alle:samfunnsfag">Begreper i samfunnsfag (alle temaer)</option><option value="alle:engelsk">Words in English (all topics)</option>' +
      '<optgroup label="Ett tema">' + temaer.map(([id, [t, e]]) => '<option value="tema:' + esc(id) + '">' + (e ? "Engelsk – " : "Samfunnsfag – ") + esc(t) + "</option>").join("") + "</optgroup></select></div>" +
      '<div class="rv-felt"><label for="pw-hintmate">Hint</label><select id="pw-hintmate"><option value="skriftlig">Skriftlig – hintgiveren skriver ett ord</option><option value="muntlig">Muntlig – hintgiveren sier ett ord</option></select></div>' +
      '<div class="rv-felt"><label for="pw-lag">Lag</label><select id="pw-lag"><option value="auto">Automatisk (to lag fra fire spillere)</option><option value="1">Ett lag – vi samarbeider</option><option value="2">To lag</option></select></div>' +
      '<div class="rv-felt"><label for="pw-antall">Antall ord</label><select id="pw-antall"><option>6</option><option selected>10</option><option>15</option></select></div>';
  }

  function onStart(v) {
    const [type, id] = document.getElementById("pw-kilde").value.split(":");
    const ord = (LV.dagensBegrep || []).filter(b => (type === "tema" ? b[2] === id : !!b[4] === (id === "engelsk")) && b[0].split(/\s+/).length <= 2 && b[0].length <= 16);
    const med = v.spillere().filter(p => p.tilkoblet);
    if (med.length < 2) return "Det må være minst to spillere med (deg selv medregnet).";
    let antallLag = document.getElementById("pw-lag").value;
    antallLag = antallLag === "auto" ? (med.length >= 4 ? 2 : 1) : +antallLag;
    if (antallLag === 2 && med.length < 4) return "To lag krever minst fire spillere – to på hvert lag.";
    const antall = Math.min(+document.getElementById("pw-antall").value, ord.length);
    if (antall < 1) return "Fant ingen ord for dette valget.";
    const lag = Array.from({ length: antallLag }, (_, i) => ({ navn: "Lag " + (i + 1), ids: [], giverNr: 0, poeng: 0 }));
    stokk(med).forEach((p, i) => lag[i % antallLag].ids.push(p.id));
    const en = ord.length && !!ord[0][4];
    S = { lag, ord: stokk(ord).slice(0, antall), ordNr: 0, en, muntlig: document.getElementById("pw-hintmate").value === "muntlig", fase: "venter", logg: [], melding: {}, tur: 0, hintNr: 0 };
    nyttOrd();
    return null;
  }
  const navnPaa = id => { const p = V.spillere().find(x => x.id === id); return p ? p.navn : "?"; };
  const erMed = id => V.spillere().some(p => p.id === id && p.tilkoblet);
  const giver = l => { const aktive = l.ids.filter(erMed); return aktive.length ? aktive[l.giverNr % aktive.length] : l.ids[0]; };
  const lagFor = id => S.lag.findIndex(l => l.ids.includes(id));
  function nyeSpillere() {
    V.spillere().forEach(p => { if (p.tilkoblet && lagFor(p.id) < 0) { const minst = S.lag.reduce((m, l, i) => (l.ids.length < S.lag[m].ids.length ? i : m), 0); S.lag[minst].ids.push(p.id); } });
  }

  function nyttOrd() {
    nyeSpillere();
    if (S.ordNr >= S.ord.length) { S.fase = "slutt"; return send(); }
    if (S.ordNr > 0) S.lag.forEach(l => l.giverNr++);
    S.naa = S.ord[S.ordNr]; S.ordNr++;
    S.tur = (S.ordNr - 1) % S.lag.length; S.hintNr = 0; S.logg = []; S.melding = {}; S.fase = "hint"; S.vinner = null; S.fikk = 0;
    send();
  }
  function forklaring(b) { let f = b[1]; if (b[4] && f.includes(" – ")) f = f.slice(f.indexOf(" – ") + 3); return f; }

  function send() {
    const verdi = Math.max(1, 10 - S.hintNr);
    const lag = S.lag.map(l => ({ navn: l.navn, poeng: l.poeng, medlemmer: l.ids.filter(erMed).map(navnPaa), giver: navnPaa(giver(l)) }));
    const givere = S.lag.map(giver);
    V.hver(p => {
      const mitt = lagFor(p.id), erGiver = givere.includes(p.id);
      return { t: "tilstand", fase: S.fase, jeg: p.id, rolle: p.tilskuer ? "tilskuer" : erGiver ? "giver" : "gjetter", mittLag: p.tilskuer ? -1 : mitt,
        ord: erGiver ? S.naa[0] : "", forkl: erGiver ? forklaring(S.naa) : "", lag, tur: S.tur, verdi, logg: S.logg, ordNr: S.ordNr, antallOrd: S.ord.length, muntlig: S.muntlig, en: S.en,
        melding: S.melding[p.id] || "", vinner: S.vinner, fikk: S.fikk, fasit: S.fase === "riktig" || S.fase === "bom" ? { ord: S.naa[0], forkl: forklaring(S.naa) } : null };
    });
    const t = S.fase === "hint" ? "Venter på hint fra " + esc(navnPaa(givere[S.tur])) : S.fase === "gjett" ? esc(S.lag[S.tur].navn) + " gjetter" : S.fase === "slutt" ? "Spillet er over." : "Ordet er avslørt.";
    V.kontroll('<p class="rv-kontrolltekst">Ord ' + S.ordNr + " av " + S.ord.length + " · " + t + '</p><div class="mu-knapper">' +
      (S.fase === "riktig" || S.fase === "bom" ? '<button type="button" class="knapp hoved" id="pw-neste">▶ ' + (S.ordNr < S.ord.length ? "Neste ord" : "Se resultatet") + "</button>" : "") +
      (S.fase === "hint" || S.fase === "gjett" ? '<button type="button" class="knapp" id="pw-hopp">⏭ Hopp over ordet</button>' : "") +
      (S.fase === "gjett" && S.muntlig ? "" : "") +
      (S.fase !== "slutt" ? '<button type="button" class="knapp" id="pw-stopp">⏹ Avslutt spillet</button>' : '<button type="button" class="knapp hoved" id="pw-igjen">↺ Nytt spill</button>') + "</div>");
  }

  function onMelding(id, m) {
    if (!S || !["hint", "gjett"].includes(S.fase)) return;
    const lagNr = lagFor(id); if (lagNr !== S.tur) return;
    const erGiver = giver(S.lag[lagNr]) === id;
    if (m.t === "hint" && S.fase === "hint" && erGiver) {
      if (m.muntlig && S.muntlig) { S.logg.push({ lag: lagNr, hint: "", gjett: "" }); S.fase = "gjett"; S.melding = {}; return send(); }
      if (S.muntlig) return;
      const tekst = String(m.tekst || "").trim().slice(0, 30);
      const feil = ugyldigHint(tekst, S.naa[0], S.logg.map(x => norm(x.hint)));
      if (feil) { S.melding = { [id]: feil }; return send(); }
      S.logg.push({ lag: lagNr, hint: tekst, gjett: "" }); S.fase = "gjett"; S.melding = {};
      return send();
    }
    if (m.t === "gjett" && S.fase === "gjett" && !erGiver) {
      const g = String(m.tekst || "").trim().slice(0, 40); if (!g) return;
      const sist = S.logg[S.logg.length - 1]; sist.gjett = g;
      if (likt(g, S.naa[0])) { sist.ok = true; S.fikk = Math.max(1, 10 - S.hintNr); S.lag[lagNr].poeng += S.fikk; S.vinner = lagNr; S.fase = "riktig"; return send(); }
      S.hintNr++;
      if (S.hintNr >= 10) { S.fase = "bom"; return send(); }
      if (S.lag.length > 1) S.tur = (S.tur + 1) % S.lag.length;
      S.fase = "hint"; S.melding = {};
      send();
    }
  }

  document.addEventListener("click", e => {
    if (!S) return;
    if (e.target.closest("#pw-neste")) nyttOrd();
    else if (e.target.closest("#pw-hopp")) { S.fase = "bom"; send(); }
    else if (e.target.closest("#pw-stopp") && confirm("Avslutte spillet?")) { S.fase = "slutt"; send(); }
    else if (e.target.closest("#pw-igjen")) { S = null; V.tilLobby(); }
  });

  document.addEventListener("DOMContentLoaded", async () => {
    document.title = "Password – " + (LV.config ? LV.config.navn : "Les verden");
    try {
      V = await LV.romVert({ spill: "passord", tittel: "Password", ikon: "🔐",
        ingress: "Hintgiveren ser ordet og gir laget ett ords hint om gangen. Laget skriver gjetningen sin, og den sjekkes automatisk. Jo færre hint, jo flere poeng! Én lager rommet, de andre blir med med romkoden.",
        oppsettHtml: oppsettHtml(), onStart, onMelding,
        onEndret: () => { if (S && S.fase !== "venter") { nyeSpillere(); send(); } }
      });
    } catch (e) { /* feilen vises på siden */ }
  });
})();
