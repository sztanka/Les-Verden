/* =========================================================
   Les verden – Kameratvurdering (kamerat.html)
   Tilbakemelding fra en medelev: kriterier fra et tema, en
   skrivesjanger eller egne kriterier, «to stjerner og et ønske»
   og setningsstartere. kamerat.html?kilde=tema:<id> | sjanger:<id>
   Ingenting lagres – svarene kan lastes ned eller skrives ut.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const ren = s => String(s).replace(/\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g, "$1").replace(/\*\*/g, "");
  const SJANGRE = {
    fagtekst: { navn: "Fagtekst", sp: "nb", k: ["Innledningen presenterer temaet og gjør leseren interessert.", "Hvert avsnitt har én hovedidé.", "Fagbegreper brukes riktig og forklares.", "Påstander underbygges med fakta, eksempler eller kilder.", "Kildene er oppgitt.", "Avslutningen oppsummerer det viktigste."] },
    droftende: { navn: "Drøftende tekst", sp: "nb", k: ["Problemstillingen er tydelig.", "Teksten tar med argumenter for.", "Teksten tar med argumenter mot.", "Argumentene begrunnes med eksempler eller kilder.", "Bindeord viser sammenhengen (på den ene siden, likevel, derfor).", "Konklusjonen følger av drøftingen."] },
    presentasjon: { navn: "Muntlig presentasjon", sp: "nb", k: ["Innledningen forteller hva presentasjonen handler om.", "Det er en rød tråd og tydelig rekkefølge.", "Fagbegreper brukes og forklares.", "Taleren har kontakt med publikum og snakker ut fra stikkord.", "Tempo og stemme gjør det lett å følge med.", "Avslutningen oppsummerer."] },
    essay: { navn: "Argumentative essay", sp: "en", k: ["The introduction has a clear thesis statement.", "Each paragraph starts with a topic sentence.", "The arguments are supported by evidence and examples.", "The text deals with a counterargument.", "Linking words make the text flow (however, therefore, in addition).", "The conclusion sums up without new arguments.", "Grammar and spelling are mostly correct."] },
    story: { navn: "Short story", sp: "en", k: ["The opening catches the reader’s interest.", "There is a clear conflict or problem.", "The characters’ feelings are shown, not just told.", "Dialogue is punctuated correctly.", "Sentences are varied in length and type.", "The ending is satisfying or makes the reader think."] }
  };
  const STARTERE = {
    nb: ["Jeg likte spesielt …", "Det var tydelig da du …", "Et sterkt eksempel er …", "Kanskje du kan …", "Har du tenkt på å …", "Jeg ble litt usikker da …", "Det kan bli enda bedre hvis …"],
    en: ["I really liked …", "It was clear when you …", "A strong example is …", "Maybe you could …", "Have you thought about …", "I was a bit confused when …", "It would be even better if …"]
  };
  const TX = {
    nb: { kan: "", niva: ["Ikke ennå", "Delvis", "Ja"], hvor: "Hvor i teksten? (valgfritt)", stjerne: "⭐ Stjerne", onske: "🎯 Ønske – ett konkret forslag", forfatter: "✍️ Forfatteren: Dette vil jeg særlig ha tilbakemelding på", svar: "✍️ Forfatteren etterpå: Hva vil jeg endre, og hvorfor?", startere: "Setningsstartere – trykk for å sette inn i feltet du skriver i:", kriterier: "Kriterier" },
    en: { kan: "", niva: ["Not yet", "Partly", "Yes"], hvor: "Where in the text? (optional)", stjerne: "⭐ Star", onske: "🎯 Wish – one concrete suggestion", forfatter: "✍️ Writer: I especially want feedback on", svar: "✍️ Writer afterwards: What will I change, and why?", startere: "Sentence starters – tap to insert into the box you are writing in:", kriterier: "Criteria" }
  };

  async function hentKriterier() {
    const k = LV.param("kilde") || "", type = k.split(":")[0], id = k.slice(type.length + 1);
    if (type === "sjanger" && SJANGRE[id]) return { tittel: SJANGRE[id].navn, sp: SJANGRE[id].sp, k: SJANGRE[id].k };
    if (type === "tema" && LV.temaer.find(t => t.id === id)) {
      try { LV.tema = null; await LV.lastSkript("data/temaer/" + id + ".js"); const t = LV.tema; const en = t.sprak === "en"; return { tittel: t.tittel, sp: en ? "en" : "nb", k: (t.maal || []).map(m => (en ? "I can " : "Jeg kan ") + ren(m) + ".") }; } catch (e) { return null; }
    }
    if (type === "egne") { const linjer = String(id || "").split("|").map(s => s.trim()).filter(Boolean).slice(0, 8); if (linjer.length) return { tittel: "Egne kriterier", sp: "nb", k: linjer }; }
    return null;
  }

  async function side() {
    document.title = "Kameratvurdering – " + (LV.config ? LV.config.navn : "Les verden");
    const K = await hentKriterier();
    const valg = '<form class="kv-oppsett" id="kv-form"><fieldset><legend>Hva skal vurderes?</legend>' +
      '<label class="lg-felt" for="kv-sjanger"><span>En skrivesjanger eller presentasjon</span><select id="kv-sjanger"><option value="">Velg …</option>' + Object.entries(SJANGRE).map(([k, s]) => '<option value="sjanger:' + k + '">' + esc(s.navn) + "</option>").join("") + "</select></label>" +
      '<label class="lg-felt" for="kv-tema"><span>Læringsmålene i et tema</span><select id="kv-tema"><option value="">Velg …</option>' + ["samfunnsfag", "engelsk"].map(f => '<optgroup label="' + (f === "engelsk" ? "Engelsk" : "Samfunnsfag") + '">' + LV.temaer.filter(t => t.fag === f).sort((a, b) => a.trinn - b.trinn || a.tittel.localeCompare(b.tittel)).map(t => '<option value="tema:' + t.id + '">' + t.trinn + ". trinn – " + esc(t.tittel) + "</option>").join("") + "</optgroup>").join("") + "</select></label>" +
      '<label class="lg-felt" for="kv-egne"><span>Eller skriv egne kriterier – ett per linje (maks 8)</span><textarea id="kv-egne" rows="3"></textarea></label>' +
      '<p><button type="submit" class="knapp hoved">Lag skjema →</button></p></fieldset></form>';
    const intro = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="skriving.html">Skriveverksted</a> › Kameratvurdering</nav>' +
      '<header class="sidehode"><p class="overlinje">Vurdering for læring</p><h1>🤝 Kameratvurdering</h1><p class="ingress">Å gi tilbakemelding på en medelevs tekst eller presentasjon gjør deg bedre selv: Du lærer å se hva som gjør en tekst god. Her lager dere et skjema med tydelige kriterier og gir «to stjerner og et ønske».</p></header>' +
      '<div class="ka-metode"><h2>Tre regler for god tilbakemelding</h2><ul><li><strong>Vær snill</strong> – kritiser teksten, ikke personen.</li><li><strong>Vær konkret</strong> – vis til et bestemt sted i teksten. «Bra!» hjelper lite; «Eksempelet i avsnitt 2 gjorde det lett å forstå» hjelper mye.</li><li><strong>Vær nyttig</strong> – gi et forslag forfatteren faktisk kan bruke.</li></ul></div>';
    if (!K) {
      $("innhold").innerHTML = intro + valg + '<p class="fo-merk">Til læreren: Velg kriterier, og del lenken med elevene – lenken inneholder valget. Elevene jobber i par: Forfatteren skriver først hva hen vil ha tilbakemelding på, og så fyller makkeren ut skjemaet. Til slutt skriver forfatteren hva hen vil endre. Skjemaet kan også skrives ut. Se også <a href="skrivom.html">Rewrite and improve</a>.</p>';
      koble(); return;
    }
    const T = TX[K.sp], lang = K.sp === "en" ? ' lang="en"' : "";
    const p = "kv-" + (LV.param("kilde") || "").replace(/[^a-z0-9]+/gi, "-").slice(0, 40) + "-";
    $("innhold").innerHTML = intro +
      '<section class="le-del kv-skjema"' + lang + ' aria-labelledby="kv-h"><h2 id="kv-h">' + esc(K.tittel) + '</h2><p class="kv-lenke" lang="nb"><a href="kamerat.html">← Velg andre kriterier</a> · <button type="button" class="knapp liten" id="kv-skriv">🖨️ Skriv ut tomt skjema</button></p>' +
      '<label class="mu-notat" for="' + p + 'onsker"><span>' + T.forfatter + '</span><textarea id="' + p + 'onsker" rows="2"></textarea></label>' +
      '<h3>' + T.kriterier + '</h3><ol class="kv-kriterier">' + K.k.map((k, i) => '<li><fieldset><legend>' + esc(k) + '</legend><div class="kv-niva">' + T.niva.map((n, j) => '<label><input type="radio" name="' + p + "k" + i + '" id="' + p + "k" + i + "-" + j + '" value="' + j + '"> <span aria-hidden="true">' + ["🌱", "🌿", "🌳"][j] + "</span> " + n + "</label>").join("") + '</div><label class="kv-hvor" for="' + p + "h" + i + '"><span>' + T.hvor + '</span><input type="text" id="' + p + "h" + i + '"></label></fieldset></li>').join("") + "</ol>" +
      '<div class="kv-startere"><p>' + T.startere + '</p><div class="kv-chips">' + STARTERE[K.sp].map(s => '<button type="button" class="knapp liten kv-chip">' + esc(s) + "</button>").join("") + "</div></div>" +
      '<label class="mu-notat" for="' + p + 's1"><span>' + T.stjerne + ' 1</span><textarea id="' + p + 's1" rows="2" class="kv-felt"></textarea></label>' +
      '<label class="mu-notat" for="' + p + 's2"><span>' + T.stjerne + ' 2</span><textarea id="' + p + 's2" rows="2" class="kv-felt"></textarea></label>' +
      '<label class="mu-notat" for="' + p + 'o"><span>' + T.onske + '</span><textarea id="' + p + 'o" rows="3" class="kv-felt"></textarea></label>' +
      '<label class="mu-notat" for="' + p + 'svar"><span>' + T.svar + '</span><textarea id="' + p + 'svar" rows="3" class="kv-felt"></textarea></label></section>' +
      '<p class="fo-merk">Til læreren: Del denne lenken med elevene. Forfatteren skriver først hva hen vil ha tilbakemelding på, så fyller makkeren ut kriteriene og «to stjerner og et ønske». Til slutt skriver forfatteren hva hen vil endre. Svarene kan lastes ned med «Last ned svarene» eller skrives ut.</p>';
    let sist = $(p + "s1");
    document.querySelectorAll(".kv-felt").forEach(t => t.addEventListener("focus", () => { sist = t; }));
    document.querySelectorAll(".kv-chip").forEach(b => b.addEventListener("click", () => {
      const t = sist, v = b.textContent.replace(/\s*…$/, " ");
      const a = t.selectionStart != null ? t.selectionStart : t.value.length;
      t.value = t.value.slice(0, a) + (a && !/\s$/.test(t.value.slice(0, a)) ? " " : "") + v + t.value.slice(t.selectionEnd || a);
      t.focus(); const pos = t.value.indexOf(v, Math.max(0, a - 1)) + v.length; t.setSelectionRange(pos, pos);
      t.dispatchEvent(new Event("input", { bubbles: true }));
    }));
    $("kv-skriv").addEventListener("click", () => window.print());
  }
  function koble() {
    $("kv-sjanger").addEventListener("change", () => { if ($("kv-sjanger").value) $("kv-tema").value = ""; });
    $("kv-tema").addEventListener("change", () => { if ($("kv-tema").value) $("kv-sjanger").value = ""; });
    $("kv-form").addEventListener("submit", e => {
      e.preventDefault();
      const egne = $("kv-egne").value.split("\n").map(s => s.trim().replace(/\|/g, "/")).filter(Boolean).slice(0, 8);
      const v = $("kv-sjanger").value || $("kv-tema").value || (egne.length ? "egne:" + encodeURIComponent(egne.join("|")) : "");
      if (!v) { $("kv-sjanger").focus(); return; }
      location.search = "?kilde=" + v;
    });
  }

  document.addEventListener("DOMContentLoaded", async () => {
    await side();
    const l = document.createElement("div"); l.className = "svarlinje"; l.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><span class="status" role="status" aria-live="polite"></span></div>'; document.body.appendChild(l);
  });
})();
