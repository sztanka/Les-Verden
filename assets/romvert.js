/* =========================================================
   Les verden – Felles vertsoppsett for romspill (bombe.html, passord.html)
   Viser romkode, QR og deltakere, lar verten være med som spiller
   («Jeg spiller også»), og gir spillet én felles måte å sende til
   alle – også til vertens egen skjerm. Hvis verten ikke spiller
   (f.eks. læreren på tavla), vises en tilskuervisning i stedet.

   const V = await LV.romVert({ spill, tittel, ikon, ingress, oppsettHtml,
     onStart(oppsett), onMelding(id, m), onEndret(), kontrollHtml })
   V.spillere()          → [{ id, navn, tilkoblet }] (verten først hvis den spiller)
   V.send(id, data)      → sender til en spiller (id "vert" = egen skjerm)
   V.hver(fn)            → send(p.id, fn(p)) til alle + tilskuervisning
   V.kontroll(html)      → oppdaterer kontrollfeltet for verten
   V.tilLobby()          → tilbake til lobbyen
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));

  LV.romVert = async function (o) {
    const el = $("innhold");
    el.innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › ' + esc(o.tittel) + "</nav>" +
      '<header class="sidehode"><p class="overlinje">Spill sammen · romkode</p><h1>' + o.ikon + " " + esc(o.tittel) + '</h1><p class="ingress">' + o.ingress + "</p></header>" +
      '<p class="rv-status" id="rv-status" role="status">Åpner rommet …</p>';
    const lokal = { navn: "", spiller: false, el: null, startet: false };
    let rom;
    try {
      rom = await LV.rom.vert({
        spill: o.spill,
        onBli: () => { tegnDeltakere(); o.onEndret && o.onEndret(); },
        onForlat: () => { tegnDeltakere(); o.onEndret && o.onEndret(); },
        onMelding: (s, m) => o.onMelding(s.id, m)
      });
    } catch (e) {
      $("rv-status").innerHTML = "✘ Klarte ikke å åpne rommet. " + esc(LV.rom.feilTekst(e)) + ' <a href="' + location.pathname + '">Prøv igjen</a>';
      throw e;
    }
    const qr = await LV.rom.qr(rom.lenke).catch(() => "");
    el.querySelector("#rv-status").outerHTML =
      '<section class="rv-romkort" aria-label="Romkode"><div><p class="rv-ledetekst">Romkode</p><p class="rv-kode">' + rom.kode + '</p><p class="rv-lenke">Gå til <strong>' + esc(rom.lenke.replace(/^https?:\/\//, "").replace(/\?.*$/, "")) + '</strong> og skriv koden, eller skann QR-koden.</p></div><div class="rv-qr" aria-hidden="true">' + qr + "</div></section>" +
      '<section class="rv-lobby" id="rv-lobby"><h2 id="rv-antall">Ingen er med ennå</h2><ul class="kq-deltakere" id="rv-deltakere"></ul>' +
      '<form class="rv-oppsett" id="rv-oppsett" autocomplete="off">' + o.oppsettHtml +
      '<fieldset class="rv-egen"><legend>Spiller du selv?</legend><label><input type="checkbox" id="rv-egen" checked> Jeg spiller også på denne enheten</label><label class="rv-egennavn">Kallenavnet ditt <input id="rv-egennavn" maxlength="16" spellcheck="false"></label><p class="rv-merk">Skal du vise spillet på tavla for hele klassen, tar du bort haken.</p></fieldset>' +
      '<p class="rv-feil" id="rv-feil" role="alert"></p><button type="submit" class="knapp hoved">▶ Start spillet</button></form></section>' +
      '<section class="rv-spill" id="rv-spill" hidden><div class="rv-lokal" id="rv-lokal" aria-live="polite"></div><div class="rv-kontroll" id="rv-kontroll"></div></section>' +
      '<p class="rv-merk">Kallenavn, ikke fullt navn. Ingenting lagres, og rommet stenges når du lukker siden.</p>';
    lokal.el = $("rv-lokal");
    const klient = LV.romKlient[o.spill];
    const lokalSend = m => setTimeout(() => o.onMelding("vert", m), 0);
    klient.start(lokal.el, lokalSend);

    function spillere() {
      const l = [...rom.spillere.values()].map(s => ({ id: s.id, navn: s.navn, tilkoblet: s.tilkoblet }));
      if (lokal.spiller) l.unshift({ id: "vert", navn: lokal.navn, tilkoblet: true });
      return l;
    }
    function tegnDeltakere() {
      const l = spillere(), med = l.filter(s => s.tilkoblet);
      const a = $("rv-antall"); if (a) a.textContent = med.length ? med.length + (med.length === 1 ? " spiller er med" : " spillere er med") : "Ingen er med ennå";
      const ul = $("rv-deltakere");
      if (ul) ul.innerHTML = l.map(s => '<li class="' + (s.tilkoblet ? "" : "frakoblet") + '">' + esc(s.navn) + (s.id === "vert" ? " (deg)" : ' <button type="button" class="kq-kast" data-kast="' + s.id + '" data-navn="' + esc(s.navn) + '" aria-label="Fjern ' + esc(s.navn) + '">✕</button>') + "</li>").join("");
    }
    $("rv-deltakere").addEventListener("click", e => { const b = e.target.closest("[data-kast]"); if (b && confirm("Fjerne " + b.dataset.navn + " fra rommet?")) rom.kast(b.dataset.kast); });
    const oppdaterEgen = () => { lokal.spiller = $("rv-egen").checked && !!LV.rom.rensNavn($("rv-egennavn").value); lokal.navn = LV.rom.rensNavn($("rv-egennavn").value); tegnDeltakere(); };
    $("rv-egen").addEventListener("change", () => { $("rv-egennavn").closest("label").hidden = !$("rv-egen").checked; oppdaterEgen(); });
    $("rv-egennavn").addEventListener("input", oppdaterEgen);
    tegnDeltakere();

    const V = {
      kode: rom.kode, rom,
      spillere,
      get egen() { return lokal.spiller; },
      send(id, d) { if (id === "vert" || id === "tavle") klient.melding(d, lokal.el, lokalSend); else rom.send(id, d); },
      hver(fn) {
        spillere().forEach(p => { if (p.tilkoblet) V.send(p.id, fn(p)); });
        if (!lokal.spiller) V.send("tavle", fn({ id: "tavle", navn: "", tilskuer: true }));
      },
      kontroll(html) { $("rv-kontroll").innerHTML = html; },
      tilLobby() { $("rv-lobby").hidden = false; $("rv-spill").hidden = true; tegnDeltakere(); },
      lukk() { rom.lukk(); }
    };
    $("rv-oppsett").addEventListener("submit", e => {
      e.preventDefault();
      oppdaterEgen();
      if ($("rv-egen").checked && !lokal.navn) { $("rv-feil").textContent = "Skriv kallenavnet ditt – eller ta bort haken hvis du ikke spiller selv."; return; }
      const feil = o.onStart(V);
      if (feil) { $("rv-feil").textContent = feil; return; }
      $("rv-feil").textContent = "";
      $("rv-lobby").hidden = true; $("rv-spill").hidden = false;
    });
    return V;
  };

  // Felles: tegn html på nytt, men behold teksten i feltet brukeren skriver i
  LV.romTegn = function (el, html) {
    const a = document.activeElement;
    let id = null, v = null, pos = null;
    if (a && el.contains(a) && a.id) { id = a.id; v = a.value; pos = a.selectionStart; }
    el.innerHTML = html;
    if (id) { const n = document.getElementById(id); if (n && !n.disabled) { if (v != null && "value" in n && n.tagName === "INPUT") { n.value = v; } n.focus(); try { if (pos != null) n.setSelectionRange(pos, pos); } catch (e) { /* ignorer */ } } }
  };

  // Felles lyd (WebAudio, uten filer)
  let ctx = null;
  LV.romLyd = {
    pa: true,
    tikk(hoy) { if (!this.pa) return; try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); if (ctx.state === "suspended") ctx.resume(); const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.value = hoy ? 1200 : 800; o.type = "square"; g.gain.setValueAtTime(.08, ctx.currentTime); g.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + .06); o.connect(g).connect(ctx.destination); o.start(); o.stop(ctx.currentTime + .07); } catch (e) { /* ignorer */ } },
    boom() { if (!this.pa) return; try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); if (ctx.state === "suspended") ctx.resume(); const n = ctx.sampleRate * .8, buf = ctx.createBuffer(1, n, ctx.sampleRate), d = buf.getChannelData(0); for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2.5); const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 700; s.buffer = buf; s.connect(f).connect(ctx.destination); s.start(); } catch (e) { /* ignorer */ } if (navigator.vibrate) navigator.vibrate([300, 100, 300]); },
    riktig() { if (!this.pa) return; try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); [660, 880].forEach((f, i) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.value = f; g.gain.setValueAtTime(.1, ctx.currentTime + i * .12); g.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + i * .12 + .15); o.connect(g).connect(ctx.destination); o.start(ctx.currentTime + i * .12); o.stop(ctx.currentTime + i * .12 + .16); }); } catch (e) { /* ignorer */ } }
  };
})();
