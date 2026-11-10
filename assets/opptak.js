/* =========================================================
   Les verden – felles lydopptaker
   LV.opptaker(element, { id, filnavn, maks }) lager knapper for å
   ta opp, stoppe, lytte og laste ned. Opptaket ligger bare i
   nettleseren og forsvinner når siden lukkes. Ingenting lastes opp.
   Brukes av opptak.html og leseflyt.html.
   ========================================================= */
(function () {
  const LV = window.LV = window.LV || {};
  const kanTaOpp = () => !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  const tid = s => Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");

  LV.opptaker = function (el, o) {
    o = Object.assign({ id: "opp", filnavn: "opptak", maks: 300, nb: true }, o || {});
    const T = o.nb ? { ta: "🎙️ Ta opp", stopp: "⏹ Stopp", ny: "🎙️ Ta opp på nytt", last: "⬇️ Last ned opptaket", slett: "🗑 Slett", ingen: "Nettleseren din kan ikke ta opp lyd. Prøv Chrome, Edge, Firefox eller Safari – eller bruk opptaksappen på mobilen.", tilgang: "Fikk ikke tilgang til mikrofonen. Sjekk at du har gitt nettleseren lov til å bruke mikrofonen.", tar: "Tar opp …", ferdig: "Hør på opptaket ditt. Det lagres ikke – last det ned hvis du vil ta vare på det.", maks: "Maks lengde er nådd.", slettet: "Opptaket er slettet." }
      : { ta: "🎙️ Record", stopp: "⏹ Stop", ny: "🎙️ Record again", last: "⬇️ Download the recording", slett: "🗑 Delete", ingen: "Your browser cannot record sound. Try Chrome, Edge, Firefox or Safari – or use the recording app on your phone.", tilgang: "Could not use the microphone. Check that you have allowed the browser to use it.", tar: "Recording …", ferdig: "Listen to your recording. It is not saved – download it if you want to keep it.", maks: "Maximum length reached.", slettet: "The recording has been deleted." };
    const p = o.id;
    el.classList.add("opp");
    if (!kanTaOpp()) { el.innerHTML = '<p class="opp-status">' + T.ingen + "</p>"; return; }
    el.innerHTML = '<div class="opp-knapper"><button type="button" class="knapp hoved" id="' + p + '-ta">' + T.ta + '</button><button type="button" class="knapp" id="' + p + '-stopp" hidden>' + T.stopp + '</button><span class="opp-tid" id="' + p + '-tid" aria-hidden="true"></span></div>' +
      '<p class="opp-status" id="' + p + '-status" role="status" aria-live="polite"></p>' +
      '<div class="opp-resultat" id="' + p + '-res" hidden><audio controls id="' + p + '-lyd"></audio><p class="opp-knapper"><a class="knapp" id="' + p + '-last" download>' + T.last + '</a><button type="button" class="knapp" id="' + p + '-slett">' + T.slett + "</button></p></div>";
    const $ = s => document.getElementById(p + "-" + s);
    let rec = null, biter = [], url = null, strom = null, start = 0, klokke = null;
    const rydd = () => { if (url) URL.revokeObjectURL(url); url = null; };
    const stoppStrom = () => { if (strom) strom.getTracks().forEach(t => t.stop()); strom = null; clearInterval(klokke); };
    $("ta").addEventListener("click", async () => {
      try { strom = await navigator.mediaDevices.getUserMedia({ audio: true }); }
      catch (e) { $("status").textContent = T.tilgang; return; }
      rydd(); biter = []; $("res").hidden = true;
      rec = new MediaRecorder(strom);
      rec.ondataavailable = e => { if (e.data && e.data.size) biter.push(e.data); };
      rec.onstop = () => {
        stoppStrom();
        const type = rec.mimeType || "audio/webm", blob = new Blob(biter, { type });
        url = URL.createObjectURL(blob);
        $("lyd").src = url;
        const ext = /ogg/.test(type) ? "ogg" : /mp4|aac/.test(type) ? "m4a" : "webm";
        $("last").href = url; $("last").download = o.filnavn + "." + ext;
        $("res").hidden = false; $("ta").hidden = false; $("ta").textContent = T.ny; $("stopp").hidden = true;
        $("status").textContent = T.ferdig; $("ta").focus();
      };
      rec.start(); start = Date.now();
      $("ta").hidden = true; $("stopp").hidden = false; $("stopp").focus(); $("status").textContent = T.tar;
      klokke = setInterval(() => { const s = (Date.now() - start) / 1000; $("tid").textContent = tid(s); if (s >= o.maks) { $("status").textContent = T.maks; rec.stop(); } }, 250);
    });
    $("stopp").addEventListener("click", () => { if (rec && rec.state !== "inactive") rec.stop(); });
    $("slett").addEventListener("click", () => { rydd(); $("lyd").removeAttribute("src"); $("res").hidden = true; $("tid").textContent = ""; $("ta").textContent = T.ta; $("status").textContent = T.slettet; $("ta").focus(); });
    window.addEventListener("pagehide", () => { stoppStrom(); rydd(); });
  };
})();
