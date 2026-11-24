/* =========================================================
   Les verden – Pass the Bomb (bombe.html + visning i rom.html)
   Bomben går på rundgang. Den som har den, får en oppgave og må
   svare (muntlig eller skriftlig) før bomben kan sendes videre.
   Bomben eksploderer etter en tilfeldig tid som ingen ser.
   Oppgaver: Dypdykk-kategorier (svaret sjekkes automatisk, ingen
   gjentakelser) eller begreper fra begrepsbanken (forklar muntlig).
   Klientdelen (LV.romKlient.bombe) brukes både av spillerne og av
   verten. Vertsdelen kjører bare på bombe.html.
   ========================================================= */
(function () {
  const LV = window.LV;
  const esc = s => LV.esc(String(s == null ? "" : s));

  // ---------- Visning for spillerne ----------
  LV.romKlient = LV.romKlient || {};
  LV.romKlient.bombe = {
    start(el, send) {
      el.innerHTML = '<p class="rk-stor">✅ Du er med!</p><p>Vent på at spillet starter.</p>';
      let tikker = null, start = 0, nokkel = "";
      el._bombe = { stopp() { clearInterval(tikker); tikker = null; } };
      el.addEventListener("submit", e => {
        if (!e.target.matches(".bb-skjema")) return;
        e.preventDefault();
        const inp = el.querySelector(".bb-svar"); const v = inp.value.trim(); if (!v) return;
        send({ t: "svar", svar: v }); inp.select();
      });
      el.addEventListener("click", e => {
        if (e.target.closest(".bb-ferdig")) send({ t: "ferdig" });
        if (e.target.closest(".bb-lyd")) { LV.romLyd.pa = !LV.romLyd.pa; e.target.closest(".bb-lyd").textContent = LV.romLyd.pa ? "🔊 Lyd på" : "🔇 Lyd av"; }
      });
      el._bombe.tikk = (pa, k) => {
        if (!pa) { clearInterval(tikker); tikker = null; nokkel = ""; return; }
        if (k === nokkel && tikker) return;
        clearInterval(tikker); nokkel = k; start = Date.now();
        let neste = 0;
        tikker = setInterval(() => {
          const t = (Date.now() - start) / 1000, intervall = Math.max(.18, .9 - t * .012);
          if (t >= neste) { LV.romLyd.tikk(); neste = t + intervall; }
        }, 50);
      };
    },
    melding(d, el) {
      if (d.t !== "tilstand") return;
      const jeg = d.holder && d.holder.id === d.jeg;
      const lyd = '<button type="button" class="knapp liten bb-lyd">' + (LV.romLyd.pa ? "🔊 Lyd på" : "🔇 Lyd av") + "</button>";
      const tabell = '<ol class="bb-tabell">' + d.tabell.map(r => '<li class="' + (r.id === d.jeg ? "bb-meg" : "") + (r.borte ? " frakoblet" : "") + '"><span>' + esc(r.navn) + '</span><span aria-label="' + r.bomber + ' bomber">' + (r.bomber ? "💥".repeat(Math.min(r.bomber, 6)) + (r.bomber > 6 ? "+" : "") : "–") + "</span></li>").join("") + "</ol>";
      const brukte = d.brukte && d.brukte.length ? '<p class="bb-brukte-t">Brukte svar:</p><p class="bb-brukte">' + d.brukte.map(b => esc(b)).join(" · ") + "</p>" : "";
      let h = "";
      if (d.fase === "venter") h = '<p class="rk-stor">✅ Du er med!</p><p>Vent på at spillet starter.</p>';
      else if (d.fase === "spill") {
        h = '<p class="bb-runde">Runde ' + d.runde + (d.antallRunder ? " av " + d.antallRunder : "") + " " + lyd + "</p>" +
          '<div class="bb-bombe' + (jeg ? " bb-min" : "") + '" aria-hidden="true">💣</div>' +
          (jeg ? '<p class="rk-stor">Du har bomben!</p>' : '<p class="bb-hos">Bomben er hos <strong>' + esc(d.holder.navn) + "</strong></p>") +
          '<p class="bb-oppgave"' + (d.en ? ' lang="en"' : "") + ">" + esc(d.oppgave) + "</p>" + (d.hint ? '<p class="bb-hint"' + (d.en ? ' lang="en"' : "") + ">" + esc(d.hint) + "</p>" : "");
        if (jeg) {
          h += d.skriftlig
            ? '<form class="bb-skjema rk-skjema-rad" autocomplete="off"><label class="skjult-visuelt" for="bb-svar-' + d.runde + '">Svaret ditt</label><input class="bb-svar" id="bb-svar-' + d.runde + '" spellcheck="false" autocapitalize="off" placeholder="Svaret ditt …"><button class="knapp hoved" type="submit">Send ✔</button></form>'
            : '<p><button type="button" class="knapp hoved bb-ferdig bb-stor-knapp">✔ Jeg har svart – send bomben!</button></p>';
          if (d.melding) h += '<p class="bb-melding" role="alert">' + esc(d.melding) + "</p>";
        } else if (d.sist) h += '<p class="bb-sist">' + esc(d.sist) + "</p>";
        h += brukte;
      } else if (d.fase === "boom") {
        h = '<div class="bb-boom" aria-hidden="true">💥</div><p class="rk-stor">' + (d.holder && d.holder.id === d.jeg ? "BOOM! Du hadde bomben!" : "BOOM! " + esc(d.holder ? d.holder.navn : "") + " hadde bomben!") + "</p>" + (d.svarEks ? '<p class="bb-hint">' + esc(d.svarEks) + "</p>" : "") + tabell + '<p class="rv-merk">Vent på neste runde …</p>';
      } else if (d.fase === "slutt") {
        const minst = Math.min(...d.tabell.filter(r => !r.borte).map(r => r.bomber));
        const vinnere = d.tabell.filter(r => !r.borte && r.bomber === minst).map(r => r.navn);
        h = '<p class="rk-stor">🏁 Spillet er over!</p><p>Færrest eksplosjoner: <strong>' + vinnere.map(esc).join(", ") + "</strong> 🏆</p>" + tabell;
      }
      if (d.fase !== "boom" && d.fase !== "slutt" && d.fase !== "venter") h += tabell;
      LV.romTegn(el, h);
      const b = el._bombe;
      if (b) {
        b.tikk(d.fase === "spill" && (jeg || d.tilskuer), "r" + d.runde);
        if (d.fase === "boom" && el._sistFase !== "boom") LV.romLyd.boom();
      }
      el._sistFase = d.fase;
      if (jeg && d.fase === "spill" && d.skriftlig) { const i = el.querySelector(".bb-svar"); if (i && document.activeElement !== i && !("ontouchstart" in window)) i.focus(); }
    }
  };

  // ---------- Verten (bare på bombe.html) ----------
  if (!document.querySelector('meta[name="lv-vert"][content="bombe"]')) return;

  const TIDER = { kort: [15, 35], middels: [25, 60], lang: [40, 90] };
  let V = null, S = null;

  function oppsettHtml() {
    const temaer = [...new Map((LV.dagensBegrep || []).map(b => [b[2], [b[3], b[4]]])).entries()];
    return '<div class="rv-felt"><label for="bb-kilde">Oppgaver</label><select id="bb-kilde">' +
      '<optgroup label="Kategorier fra Dypdykk"><option value="dd:samfunnsfag">Samfunnsfag – «Et land i EU», «En religion» …</option><option value="dd:engelsk">Engelsk – «A US state», «A job» …</option></optgroup>' +
      '<optgroup label="Forklar et begrep (muntlig)"><option value="begrep:samfunnsfag">Begreper i samfunnsfag</option><option value="begrep:engelsk">Words in English</option></optgroup>' +
      '<optgroup label="Begreper fra ett tema (muntlig)">' + temaer.map(([id, [t, e]]) => '<option value="tema:' + esc(id) + '">' + (e ? "Engelsk – " : "Samfunnsfag – ") + esc(t) + "</option>").join("") + "</optgroup></select></div>" +
      '<div class="rv-felt"><label for="bb-svarmate">Svarmåte</label><select id="bb-svarmate"><option value="skriftlig">Skriftlig – svaret sjekkes automatisk</option><option value="muntlig">Muntlig – gruppa passer på</option></select><p class="rv-merk" id="bb-svarmerk">Skriftlig fungerer bare med Dypdykk-kategoriene.</p></div>' +
      '<div class="rv-felt"><label for="bb-tid">Bomben eksploderer etter</label><select id="bb-tid"><option value="kort">15–35 sekunder</option><option value="middels" selected>25–60 sekunder</option><option value="lang">40–90 sekunder</option></select></div>' +
      '<div class="rv-felt"><label for="bb-runder">Antall runder</label><select id="bb-runder"><option value="5">5</option><option value="8" selected>8</option><option value="12">12</option><option value="0">Til vi stopper</option></select></div>';
  }

  // Oppgavekilde
  function lagKilde(verdi) {
    const [type, id] = verdi.split(":");
    if (type === "dd") {
      const kat = LV.dypdykk.kategorier.filter(k => k.fag === id && !k.fraLand);
      let pose = [];
      return { en: id === "engelsk", kanSkrive: true, perRunde: true, neste() { if (!pose.length) pose = stokk(kat); const k = pose.pop(); return { oppgave: k.t, hint: k.h || "", kat: k }; } };
    }
    const begr = (LV.dagensBegrep || []).filter(b => type === "tema" ? b[2] === id : !!b[4] === (id === "engelsk"));
    const en = begr.length && !!begr[0][4];
    let pose = [];
    return { en, kanSkrive: false, perRunde: false, neste() { if (!pose.length) pose = stokk(begr); const b = pose.pop(); return { oppgave: (en ? "Explain in English: «" : "Forklar begrepet: «") + b[0] + "»", hint: "", forkl: b[1] }; } };
  }
  const stokk = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  function onStart(v) {
    const kilde = lagKilde(document.getElementById("bb-kilde").value);
    const skriftlig = document.getElementById("bb-svarmate").value === "skriftlig" && kilde.kanSkrive;
    const med = v.spillere().filter(p => p.tilkoblet);
    if (med.length < 2) return "Det må være minst to spillere med (deg selv medregnet).";
    S = { kilde, skriftlig, tid: TIDER[document.getElementById("bb-tid").value], antallRunder: +document.getElementById("bb-runder").value,
      runde: 0, fase: "venter", rekke: med.map(p => p.id), bomber: new Map(med.map(p => [p.id, 0])), holder: null, brukte: [], sist: "", melding: "", oppg: null, timer: null };
    nyRunde();
    return null;
  }
  const navnPaa = id => { const p = V.spillere().find(x => x.id === id); return p ? p.navn : "?"; };
  const erMed = id => V.spillere().some(p => p.id === id && p.tilkoblet);
  function oppdaterRekke() { V.spillere().forEach(p => { if (p.tilkoblet && !S.rekke.includes(p.id)) { S.rekke.push(p.id); if (!S.bomber.has(p.id)) S.bomber.set(p.id, 0); } }); }

  function nyRunde() {
    clearTimeout(S.timer);
    oppdaterRekke();
    if (S.antallRunder && S.runde >= S.antallRunder) return slutt();
    S.runde++; S.fase = "spill"; S.brukte = []; S.sist = ""; S.melding = "";
    const aktive = S.rekke.filter(erMed);
    if (!S.holder || !erMed(S.holder)) S.holder = aktive[Math.floor(Math.random() * aktive.length)];
    S.oppg = S.kilde.neste();
    const sek = S.tid[0] + Math.random() * (S.tid[1] - S.tid[0]);
    S.timer = setTimeout(boom, sek * 1000);
    send();
  }
  function videre() {
    oppdaterRekke();
    const aktive = S.rekke.filter(erMed); if (!aktive.length) return;
    let i = S.rekke.indexOf(S.holder);
    for (let k = 0; k < S.rekke.length; k++) { i = (i + 1) % S.rekke.length; if (erMed(S.rekke[i]) && S.rekke[i] !== S.holder) break; }
    S.holder = S.rekke[i]; S.melding = "";
    if (!S.kilde.perRunde) S.oppg = S.kilde.neste();
    send();
  }
  function boom() {
    if (!S || S.fase !== "spill") return;
    S.fase = "boom";
    S.bomber.set(S.holder, (S.bomber.get(S.holder) || 0) + 1);
    send();
  }
  function slutt() { clearTimeout(S.timer); S.fase = "slutt"; send(); }

  function eksempelSvar() {
    if (!S.oppg || !S.oppg.kat) return S.oppg && S.oppg.forkl ? "«" + S.oppg.oppgave.replace(/^.*«|»$/g, "") + "»: " + S.oppg.forkl : "";
    const alle = S.oppg.kat.n.flatMap((r, i) => r.split(";").filter(Boolean).map(x => [x.split("|")[0].replace(/^~/, ""), i]));
    const ubrukte = alle.filter(([n]) => !S.brukte.includes(n));
    return (S.kilde.en ? "Some other answers: " : "Noen andre svar: ") + stokk(ubrukte).slice(0, 4).map(x => x[0]).join(", ");
  }
  function send() {
    const tabell = S.rekke.map(id => ({ id, navn: navnPaa(id), bomber: S.bomber.get(id) || 0, borte: !erMed(id) })).sort((a, b) => a.bomber - b.bomber);
    const felles = { t: "tilstand", fase: S.fase, runde: S.runde, antallRunder: S.antallRunder, holder: S.holder ? { id: S.holder, navn: navnPaa(S.holder) } : null,
      oppgave: S.oppg ? S.oppg.oppgave : "", hint: S.oppg ? S.oppg.hint : "", en: S.kilde.en, skriftlig: S.skriftlig, brukte: S.brukte, sist: S.sist, tabell,
      svarEks: S.fase === "boom" ? eksempelSvar() : "" };
    V.hver(p => Object.assign({}, felles, { jeg: p.id, tilskuer: !!p.tilskuer, melding: p.id === S.holder ? S.melding : "" }));
    const tekst = S.fase === "spill" ? "Runde " + S.runde + ": bomben er hos " + esc(navnPaa(S.holder)) : S.fase === "boom" ? "💥 Runde " + S.runde + " er over." : S.fase === "slutt" ? "Spillet er over." : "";
    V.kontroll('<p class="rv-kontrolltekst">' + tekst + '</p><div class="mu-knapper">' +
      (S.fase === "boom" ? '<button type="button" class="knapp hoved" id="bb-neste">▶ Neste runde</button>' : "") +
      (S.fase === "spill" && !S.skriftlig ? '<button type="button" class="knapp" id="bb-hopp">⏭ Send bomben videre</button>' : "") +
      (S.fase !== "slutt" ? '<button type="button" class="knapp" id="bb-stopp">⏹ Avslutt spillet</button>' : '<button type="button" class="knapp hoved" id="bb-igjen">↺ Nytt spill</button>') + "</div>");
  }

  function onMelding(id, m) {
    if (!S || S.fase !== "spill" || id !== S.holder) return;
    if (m.t === "ferdig" && !S.skriftlig) { S.sist = navnPaa(id) + " svarte."; videre(); return; }
    if (m.t === "svar" && S.skriftlig) {
      const r = LV.dypdykkMatch(S.oppg.kat, String(m.svar || "").slice(0, 80));
      if (!r) { S.melding = (S.kilde.en ? "“" + m.svar + "” is not on the list. Try again!" : "«" + m.svar + "» står ikke på lista. Prøv igjen!"); send(); return; }
      if (r.feil) { S.melding = "✋ " + r.feil; send(); return; }
      if (S.brukte.includes(r.treff.navn)) { S.melding = (S.kilde.en ? "“" + r.treff.navn + "” has already been used!" : "«" + r.treff.navn + "» er allerede brukt!"); send(); return; }
      S.brukte.push(r.treff.navn); S.sist = navnPaa(id) + ": " + r.treff.navn + " ✔";
      videre();
    }
  }

  document.addEventListener("click", e => {
    if (!S) return;
    if (e.target.closest("#bb-neste")) nyRunde();
    else if (e.target.closest("#bb-hopp") && S.fase === "spill") { S.sist = ""; videre(); }
    else if (e.target.closest("#bb-stopp") && confirm("Avslutte spillet?")) slutt();
    else if (e.target.closest("#bb-igjen")) { S = null; V.tilLobby(); }
  });

  document.addEventListener("DOMContentLoaded", async () => {
    document.title = "Pass the Bomb – " + (LV.config ? LV.config.navn : "Les verden");
    try {
      V = await LV.romVert({ spill: "bombe", tittel: "Pass the Bomb", ikon: "💣",
        ingress: "Bomben går på rundgang i gruppa. Har du den, må du svare på oppgaven før du kan sende den videre – og ingen vet når den smeller! Én lager rommet, de andre blir med med romkoden.",
        oppsettHtml: oppsettHtml(), onStart, onMelding,
        onEndret: () => { if (S && S.fase !== "venter") { if (S.fase === "spill" && !erMed(S.holder)) videre(); else send(); } }
      });
    } catch (e) { return; }
    const k = document.getElementById("bb-kilde"), sm = document.getElementById("bb-svarmate");
    const juster = () => { const dd = k.value.startsWith("dd:"); sm.disabled = !dd; if (!dd) sm.value = "muntlig"; document.getElementById("bb-svarmerk").hidden = dd; };
    k.addEventListener("change", juster); juster();
    V.send("vert", { t: "tilstand", fase: "venter", tabell: [], brukte: [] });
  });
})();
