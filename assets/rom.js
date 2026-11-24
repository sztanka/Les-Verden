/* =========================================================
   Les verden – Fellesrom med romkode (LV.rom)
   Én nettleser «verter» rommet (lærerens PC, eller en elev i en
   gruppe). De andre blir med ved å skrive romkoden. Forbindelsen
   går direkte mellom nettleserne (WebRTC). PeerJS sin offentlige
   tjeneste brukes bare til å finne hverandre. Ingenting lagres –
   rommet forsvinner når verten lukker fanen. Flere rom kan være
   åpne samtidig; hvert rom har sin egen kode.

   Vert:  const rom = await LV.rom.vert({ spill, onBli, onForlat, onMelding })
          rom.kode, rom.spillere (Map), rom.send(id, data), rom.sendAlle(data),
          rom.kast(id), rom.lukk()
   Deltaker: const r = await LV.rom.bli(kode, navn, { onMelding, onStatus })
          r.navn, r.send(data), r.lukk()
   Testing med egen signalserver: ?romserver=localhost:9000
   ========================================================= */
(function () {
  const LV = window.LV = window.LV || {};
  const PREFIKS = "lesverden-rom1-";
  const TEGN = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const lagKode = () => Array.from({ length: 5 }, () => TEGN[Math.floor(Math.random() * TEGN.length)]).join("");
  const rensKode = k => String(k || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 5);
  const rensNavn = n => String(n || "").replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 16);

  async function lastBibliotek() {
    if (!window.Peer) await LV.lastSkript("assets/vendor/peerjs.min.js");
  }
  function peerValg() {
    const s = LV.param && LV.param("romserver");
    const valg = { debug: 0 };
    if (s) { const [host, port] = s.split(":"); Object.assign(valg, { host, port: +port || 9000, path: "/", secure: false }); }
    return valg;
  }
  function lagPeer(id) {
    return new Promise((ok, feil) => {
      const p = new window.Peer(id, peerValg());
      const t = setTimeout(() => feil(new Error("tidsavbrudd")), 15000);
      p.on("open", () => { clearTimeout(t); ok(p); });
      p.on("error", e => { clearTimeout(t); feil(e); });
    });
  }

  // ---------- Vert ----------
  async function vert(opts) {
    await lastBibliotek();
    let peer = null, kode = "";
    for (let forsok = 0; forsok < 4 && !peer; forsok++) {
      kode = lagKode();
      try { peer = await lagPeer(PREFIKS + kode); }
      catch (e) { if (e.type !== "unavailable-id") throw e; }
    }
    if (!peer) throw new Error("Fant ingen ledig romkode");
    const spillere = new Map();   // id → { id, navn, tilkoblet, sist, conn }
    let teller = 0;
    const send = (id, data) => { const s = spillere.get(id); if (s && s.conn && s.conn.open) try { s.conn.send(data); } catch (e) { /* ignorer */ } };
    const sendAlle = data => spillere.forEach(s => send(s.id, data));
    const frakoble = s => { if (!s.tilkoblet) return; s.tilkoblet = false; opts.onForlat && opts.onForlat(s); };

    peer.on("connection", conn => {
      conn.on("open", () => {
        if (conn._lvKoblet) return;   // «open» kan komme mer enn én gang
        conn._lvKoblet = true;
        const navn = rensNavn(conn.metadata && conn.metadata.navn) || "Spiller";
        // Gjenkobling: samme navn, frakoblet spiller → ta over plassen
        const ledig = x => !x.tilkoblet || !(x.conn && x.conn.open) || Date.now() - x.sist > 9000;
        let s = [...spillere.values()].find(x => x.navn.toLowerCase() === navn.toLowerCase() && ledig(x));
        if (s) { const gammel = s.conn; s.conn = conn; s.tilkoblet = true; s.sist = Date.now(); if (gammel && gammel !== conn) try { gammel.close(); } catch (e) { /* ignorer */ } }
        else {
          let endelig = navn, n = 2;
          while ([...spillere.values()].some(x => x.navn.toLowerCase() === endelig.toLowerCase())) endelig = navn.slice(0, 13) + " " + n++;
          s = { id: "s" + (++teller), navn: endelig, tilkoblet: true, sist: Date.now(), conn };
          spillere.set(s.id, s);
        }
        send(s.id, { _t: "velkommen", spill: opts.spill, navn: s.navn, id: s.id });
        opts.onBli && opts.onBli(s);
        conn.on("data", d => {
          if (!d || typeof d !== "object") return;
          s.sist = Date.now();
          if (!s.tilkoblet && s.conn === conn) { s.tilkoblet = true; opts.onBli && opts.onBli(s); }
          if (d._t === "pong") return;
          if (d._t === "forlat") { frakoble(s); return; }
          opts.onMelding && opts.onMelding(s, d);
        });
        conn.on("close", () => { if (s.conn === conn) frakoble(s); });
        conn.on("error", () => { if (s.conn === conn) frakoble(s); });
      });
    });
    peer.on("disconnected", () => { try { peer.reconnect(); } catch (e) { /* ignorer */ } });
    const puls = setInterval(() => {
      const naa = Date.now();
      spillere.forEach(s => { if (s.tilkoblet && naa - s.sist > 16000) frakoble(s); });
      sendAlle({ _t: "ping" });
    }, 4000);
    const lukk = () => { clearInterval(puls); sendAlle({ _t: "stengt" }); setTimeout(() => { try { peer.destroy(); } catch (e) { /* ignorer */ } }, 300); };
    window.addEventListener("pagehide", lukk);
    return {
      kode, spillere, send, sendAlle, lukk,
      kast(id) { const s = spillere.get(id); if (!s) return; send(id, { _t: "kastet" }); setTimeout(() => { try { s.conn.close(); } catch (e) { /* ignorer */ } }, 200); spillere.delete(id); opts.onForlat && opts.onForlat(s); },
      lenke: location.origin + location.pathname.replace(/[^/]*$/, "") + "rom.html?kode=" + kode
    };
  }

  // ---------- Deltaker ----------
  async function bli(kodeInn, navnInn, opts) {
    await lastBibliotek();
    const kode = rensKode(kodeInn), navn = rensNavn(navnInn);
    const peer = await lagPeer(PREFIKS + "e-" + Math.random().toString(36).slice(2, 12));
    return new Promise((ok, feil) => {
      const conn = peer.connect(PREFIKS + kode, { metadata: { navn }, reliable: true });
      let sist = Date.now(), velkommen = false, ferdig = false;
      const t = setTimeout(() => { if (!velkommen) { try { peer.destroy(); } catch (e) { /* ignorer */ } feil(new Error("fant-ikke")); } }, 12000);
      peer.on("error", e => { if (!velkommen) { clearTimeout(t); try { peer.destroy(); } catch (x) { /* ignorer */ } feil(e.type === "peer-unavailable" ? new Error("fant-ikke") : e); } });
      const vakt = setInterval(() => { if (velkommen && !ferdig && Date.now() - sist > 15000) { ferdig = true; opts.onStatus && opts.onStatus("frakoblet"); } }, 3000);
      const api = {
        navn, kode,
        send(d) { if (conn.open) try { conn.send(d); } catch (e) { /* ignorer */ } },
        lukk() { clearInterval(vakt); api.send({ _t: "forlat" }); setTimeout(() => { try { peer.destroy(); } catch (e) { /* ignorer */ } }, 200); }
      };
      conn.on("data", d => {
        if (!d || typeof d !== "object") return;
        sist = Date.now();
        if (d._t === "ping") { api.send({ _t: "pong" }); return; }
        if (d._t === "velkommen") { velkommen = true; clearTimeout(t); api.navn = d.navn; api.spill = d.spill; api.id = d.id; ok(api); return; }
        if (d._t === "stengt") { ferdig = true; opts.onStatus && opts.onStatus("stengt"); return; }
        if (d._t === "kastet") { ferdig = true; opts.onStatus && opts.onStatus("kastet"); return; }
        opts.onMelding && opts.onMelding(d);
      });
      conn.on("close", () => { if (velkommen && !ferdig) { ferdig = true; opts.onStatus && opts.onStatus("frakoblet"); } });
    });
  }

  // QR-kode som SVG (krever assets/vendor/qrcode.js)
  async function qr(tekst) {
    if (!window.qrcode) await LV.lastSkript("assets/vendor/qrcode.js");
    const q = window.qrcode(0, "M"); q.addData(tekst); q.make();
    return q.createSvgTag({ cellSize: 6, margin: 2, scalable: true });
  }

  LV.rom = { vert, bli, qr, rensKode, rensNavn,
    feilTekst: e => /fant-ikke/.test(e && e.message) ? "Fant ikke noe rom med den koden. Sjekk koden – og at rommet fortsatt er åpent." :
      /tidsavbrudd|network|server|socket/i.test((e && (e.type || e.message)) || "") ? "Fikk ikke kontakt med koblingstjenesten. Sjekk nettet – noen skolenett blokkerer slike forbindelser." :
      "Noe gikk galt med forbindelsen (" + ((e && (e.type || e.message)) || "ukjent feil") + ")." };
})();
