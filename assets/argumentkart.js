/* =========================================================
   Les verden – Argumentkart (argumentkart.html)
   Bygg et kart over argumentasjonen: påstand → grunner → belegg,
   innvendinger og svar på innvendingene. Kartet vises visuelt,
   kan gjøres om til et tekstutkast, skrives ut og deles som lenke.
   Alt innholdet ligger i lenken (etter #) – ingenting lagres.
   Kan starte fra en påstand i Debattduell (data/debatt.js).
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const MAKS = 4;
  const TX = {
    nb: { pastand: "Påstand", grunn: "Grunn", belegg: "Belegg", innv: "Innvending", svar: "Svar på innvendingen", phP: "Hva mener du? Skriv én tydelig setning.", phG: "Hvorfor? Én grunn …", phB: "Fakta, eksempel, tall eller kilde som støtter grunnen", phI: "Hva kan noen som er uenig, si?", phS: "Hvordan svarer du på innvendingen?", leggTil: "➕ Legg til en grunn", fjern: "Fjern grunn", tekst: "📝 Gjør om til tekstutkast", start: ["Jeg mener at", "Den første grunnen er at", "Den andre grunnen er at", "Den tredje grunnen er at", "Den fjerde grunnen er at"], fordi: "Dette ser vi for eksempel ved at", noen: "Noen vil kanskje si at", men: "Men", derfor: "Alt i alt mener jeg derfor at" },
    en: { pastand: "Claim", grunn: "Reason", belegg: "Evidence", innv: "Counter-argument", svar: "Rebuttal", phP: "What do you think? Write one clear sentence.", phG: "Why? One reason …", phB: "A fact, example, number or source that supports the reason", phI: "What might someone who disagrees say?", phS: "How do you answer the counter-argument?", leggTil: "➕ Add a reason", fjern: "Remove reason", tekst: "📝 Turn into a draft text", start: ["I believe that", "Firstly,", "Secondly,", "Thirdly,", "Finally,"], fordi: "For example,", noen: "Some people might argue that", men: "However,", derfor: "All in all, I therefore believe that" }
  };
  const SJEKK = ["Påstanden er tydelig og handler om én ting.", "Hver grunn støtter påstanden.", "Hver grunn har belegg – fakta, eksempler eller kilder.", "Jeg har tatt med minst én innvending.", "Jeg har svart saklig på innvendingene.", "Jeg unngår argumentasjonsfeil, som personangrep og stråmann."];

  // ---------- Koding (som i Lag selv) ----------
  const b64 = bytes => { let s = ""; bytes.forEach(b => { s += String.fromCharCode(b); }); return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); };
  const fraB64 = s => { s = s.replace(/-/g, "+").replace(/_/g, "/"); while (s.length % 4) s += "="; return Uint8Array.from(atob(s), c => c.charCodeAt(0)); };
  const kanPakke = typeof CompressionStream === "function";
  async function strom(bytes, S) { return new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new S("deflate-raw"))).arrayBuffer()); }
  async function kod(d) { const r = new TextEncoder().encode(JSON.stringify(d)); if (kanPakke) { try { return "1" + b64(await strom(r, CompressionStream)); } catch (e) { /* tilbake */ } } return "0" + b64(r); }
  async function dekod(h) { if (!h) return null; try { const by = fraB64(h.slice(1)); return rens(JSON.parse(new TextDecoder().decode(h[0] === "1" ? await strom(by, DecompressionStream) : by))); } catch (e) { return null; } }
  const tom = () => ({ g: "", b: "", i: "", s: "" });
  function rens(d) {
    const s = (v, n) => String(v == null ? "" : v).slice(0, n || 300);
    const g = (Array.isArray(d && d.g) ? d.g : []).slice(0, MAKS).map(x => ({ g: s(x && x.g), b: s(x && x.b), i: s(x && x.i), s: s(x && x.s) }));
    if (!g.length) g.push(tom(), tom());
    return { sp: d && d.sp === "en" ? "en" : "nb", p: s(d && d.p, 200), g };
  }

  document.addEventListener("DOMContentLoaded", async () => {
    let d = (await dekod(location.hash.slice(1))) || rens({});
    document.title = "Argumentkart – " + (LV.config ? LV.config.navn : "Les verden");
    const pastander = (LV.debatt && LV.debatt.pastander) || [];
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="skriving.html">Skriveverksted</a> › Argumentkart</nav>' +
      '<header class="sidehode"><p class="overlinje">Argumentasjon</p><h1>🗺️ Argumentkart</h1><p class="ingress">Et godt argument er mer enn en mening. Det har grunner, belegg for grunnene – og det tar på alvor hva de som er uenige, kan si. Bygg argumentasjonen din som et kart, se hvordan den henger sammen, og gjør den om til et utkast til en argumenterende tekst.</p></header>' +
      '<div class="ak-start"><label for="ak-velg">Start fra en påstand i Debattduell (valgfritt)</label><select id="ak-velg"><option value="">Skriv min egen påstand …</option>' + pastander.map(p => '<option value="' + p.id + '"' + (p.sprak === "en" ? ' lang="en"' : "") + ">" + esc(p.pastand) + "</option>").join("") + '</select><fieldset class="lg-sprak"><legend>Språk</legend><label><input type="radio" name="ak-sp" value="nb"> Norsk</label><label><input type="radio" name="ak-sp" value="en"> Engelsk</label></fieldset></div>' +
      '<div class="ak-arbeid"><div class="ak-skjema" id="ak-skjema"></div><aside class="ak-ideer" id="ak-ideer" hidden aria-labelledby="ak-ideer-h"><h2 id="ak-ideer-h">💡 Ideer fra Debattduell</h2><p class="ll-hint">Trykk for å sette inn i feltet du sist var i.</p><div id="ak-ideliste"></div></aside></div>' +
      '<section class="ak-kartdel" aria-labelledby="ak-kart-h"><h2 id="ak-kart-h">Kartet ditt</h2><div class="ak-kart" id="ak-kart"></div></section>' +
      '<section class="le-del"><h2>Sjekk argumentasjonen</h2><ul class="lf-prosodi">' + SJEKK.map((s, i) => '<li><label><input type="checkbox" id="ak-sj' + i + '"> ' + esc(s) + "</label></li>").join("") + "</ul>" +
      '<p class="ak-knapper"><button type="button" class="knapp hoved" id="ak-tekst"></button> <button type="button" class="knapp" id="ak-kopier">🔗 Kopier lenke</button> <button type="button" class="knapp" id="ak-skriv">🖨️ Skriv ut kartet</button> <span class="lg-status" id="ak-status" role="status" aria-live="polite"></span></p>' +
      '<label class="mu-notat" for="ak-utkast"><span>Tekstutkast – bearbeid videre med egne ord</span><textarea id="ak-utkast" rows="12"></textarea></label>' +
      '<p class="lg-merk">Kartet ligger i lenken i adresselinja og oppdateres mens du skriver. Ingenting lagres på nettstedet – kopier lenken før du lukker siden.</p></section>' +
      '<p class="fo-merk">Til læreren: Forskning viser at det å tegne opp argumenter visuelt hjelper elever med å se sammenhengen mellom påstand, grunner og belegg, og gjør dem flinkere til å vurdere argumenter kritisk. Argumentkartet passer som forarbeid til drøftende og argumenterende tekster og til <a href="debatt.html">Debattduell</a>. Se også <a href="oppgaveord.html">Oppgaveord</a> om forskjellen på «argumenter» og «drøft».</p>';
    document.querySelector('input[name="ak-sp"][value="' + d.sp + '"]').checked = true;

    let sistFelt = null;
    function skjema() {
      const T = TX[d.sp];
      $("ak-skjema").innerHTML = '<label class="lg-felt ak-p" for="ak-p"><span>🎯 ' + T.pastand + '</span><textarea id="ak-p" rows="2" maxlength="200" placeholder="' + esc(T.phP) + '"></textarea></label>' +
        d.g.map((x, i) => '<fieldset class="ak-grunn"><legend>' + T.grunn + " " + (i + 1) + "</legend>" +
          [["g", T.grunn, T.phG], ["b", T.belegg, T.phB], ["i", T.innv, T.phI], ["s", T.svar, T.phS]].map(([k, n, ph]) => '<label class="lg-felt ak-f-' + k + '" for="ak-' + i + k + '"><span>' + n + '</span><textarea id="ak-' + i + k + '" data-i="' + i + '" data-k="' + k + '" rows="2" maxlength="300" placeholder="' + esc(ph) + '"></textarea></label>').join("") +
          (d.g.length > 1 ? '<button type="button" class="knapp liten ak-fjern" data-i="' + i + '">🗑️ ' + T.fjern + " " + (i + 1) + "</button>" : "") + "</fieldset>").join("") +
        '<p><button type="button" class="knapp" id="ak-ny"' + (d.g.length >= MAKS ? " disabled" : "") + ">" + T.leggTil + "</button></p>";
      $("ak-p").value = d.p;
      d.g.forEach((x, i) => ["g", "b", "i", "s"].forEach(k => { $("ak-" + i + k).value = x[k]; }));
      $("ak-tekst").textContent = T.tekst;
      $("ak-ny").addEventListener("click", () => { d.g.push(tom()); skjema(); kart(); $("ak-" + (d.g.length - 1) + "g").focus(); });
      document.querySelectorAll(".ak-fjern").forEach(b => b.addEventListener("click", () => { d.g.splice(+b.dataset.i, 1); skjema(); kart(); $("ak-p").focus(); }));
      $("ak-skjema").querySelectorAll("textarea").forEach(t => t.addEventListener("focus", () => { sistFelt = t; }));
    }
    $("ak-skjema").addEventListener("input", e => {
      const t = e.target;
      if (t.id === "ak-p") d.p = t.value; else if (t.dataset.k) d.g[+t.dataset.i][t.dataset.k] = t.value;
      kart();
    });
    let tid = null;
    function kart() {
      const T = TX[d.sp], boks = (k, tekst, ph) => '<div class="ak-boks ak-bx-' + k + (tekst.trim() ? "" : " tom") + '"><span class="ak-etikett">' + esc({ p: T.pastand, g: T.grunn, b: T.belegg, i: T.innv, s: T.svar }[k]) + "</span>" + (tekst.trim() ? esc(tekst) : "<em>" + esc(ph) + "</em>") + "</div>";
      $("ak-kart").innerHTML = '<div class="ak-topp"' + (d.sp === "en" ? ' lang="en"' : "") + ">" + boks("p", d.p, "…") + '</div><div class="ak-kolonner"' + (d.sp === "en" ? ' lang="en"' : "") + ">" + d.g.map(x => '<div class="ak-kol">' + boks("g", x.g, "…") + boks("b", x.b, "…") + (x.i.trim() || x.s.trim() ? boks("i", x.i, "…") + boks("s", x.s, "…") : "") + "</div>").join("") + "</div>";
      clearTimeout(tid); tid = setTimeout(async () => { try { history.replaceState(null, "", "#" + await kod(d)); } catch (e) { /* ignorer */ } }, 400);
    }
    function ideer(id) {
      const p = pastander.find(x => x.id === id);
      if (!p) { $("ak-ideer").hidden = true; return; }
      const forK = p.kort.filter(k => k.side === "for"), motK = p.kort.filter(k => k.side === "mot");
      $("ak-ideliste").innerHTML = "<h3>" + (p.sprak === "en" ? "For" : "For") + "</h3>" + forK.map(k => '<button type="button" class="ak-ide ak-ide-for"' + (p.sprak === "en" ? ' lang="en"' : "") + ">" + esc(k.t) + "</button>").join("") + "<h3>" + (p.sprak === "en" ? "Against" : "Mot") + "</h3>" + motK.map(k => '<button type="button" class="ak-ide ak-ide-mot"' + (p.sprak === "en" ? ' lang="en"' : "") + ">" + esc(k.t) + "</button>").join("");
      $("ak-ideer").hidden = false;
      $("ak-ideliste").querySelectorAll(".ak-ide").forEach(b => b.addEventListener("click", () => {
        let t = sistFelt && document.body.contains(sistFelt) ? sistFelt : (b.classList.contains("ak-ide-mot") ? $("ak-0i") : $("ak-0g"));
        t.value = (t.value.trim() ? t.value.trim() + " " : "") + b.textContent;
        t.dispatchEvent(new Event("input", { bubbles: true })); t.focus();
      }));
    }
    $("ak-velg").addEventListener("change", () => {
      const p = pastander.find(x => x.id === $("ak-velg").value);
      if (p) { d.p = p.pastand; d.sp = p.sprak === "en" ? "en" : "nb"; document.querySelector('input[name="ak-sp"][value="' + d.sp + '"]').checked = true; skjema(); kart(); }
      ideer($("ak-velg").value);
    });
    document.querySelectorAll('input[name="ak-sp"]').forEach(r => r.addEventListener("change", () => { d.sp = r.value; skjema(); kart(); }));
    $("ak-tekst").addEventListener("click", () => {
      const T = TX[d.sp], rensS = s => s.trim().replace(/[.!?]+$/, ""), liten = s => s ? s[0].toLowerCase() + s.slice(1) : s;
      const deler = [T.start[0] + " " + liten(rensS(d.p || "…")) + "."];
      d.g.forEach((x, i) => {
        if (!x.g.trim()) return;
        let avsnitt = T.start[Math.min(i + 1, 4)] + " " + liten(rensS(x.g)) + ".";
        if (x.b.trim()) avsnitt += " " + T.fordi + " " + liten(rensS(x.b)) + ".";
        if (x.i.trim()) avsnitt += " " + T.noen + " " + liten(rensS(x.i)) + ".";
        if (x.s.trim()) avsnitt += " " + T.men + " " + liten(rensS(x.s)) + ".";
        deler.push(avsnitt);
      });
      deler.push(T.derfor + " " + liten(rensS(d.p || "…")) + ".");
      $("ak-utkast").value = deler.join("\n\n");
      $("ak-utkast").dispatchEvent(new Event("input", { bubbles: true }));
      $("ak-status").textContent = "Utkastet er laget nedenfor. Skriv det om med egne ord!";
      $("ak-utkast").focus();
    });
    $("ak-kopier").addEventListener("click", async () => {
      const lenke = location.href.split("#")[0] + "#" + await kod(d);
      try { await navigator.clipboard.writeText(lenke); $("ak-status").textContent = "✔ Lenken er kopiert."; } catch (e) { $("ak-status").textContent = "Kopier lenken fra adresselinja."; }
    });
    $("ak-skriv").addEventListener("click", () => window.print());
    skjema(); kart();
    const l = document.createElement("div"); l.className = "svarlinje"; l.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>'; document.body.appendChild(l);
  });
})();
