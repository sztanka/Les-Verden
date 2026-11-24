/* =========================================================
   Les verden – Escape room med delte ledetråder: visning på mobilen
   (rom.html). Hvert lagmedlem ser bare noen av tekstbitene ved hver
   lås og må lese dem høyt for de andre. Svaret gis på gruppas felles
   skjerm (escape.html), som også er verten.
   ========================================================= */
(function () {
  const LV = window.LV;
  const esc = s => LV.esc(String(s == null ? "" : s));
  const fmt = t => esc(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
  const avsnitt = t => String(t).startsWith("> ") ? '<blockquote class="es-dok">' + String(t).split("\n").map(l => fmt(l.replace(/^> ?/, ""))).join("<br>") + "</blockquote>" : "<p>" + fmt(t) + "</p>";

  LV.romKlient = LV.romKlient || {};
  LV.romKlient.escape = {
    start(el) { el.innerHTML = '<p class="rk-stor">✅ Du er med i laget!</p><p>Vent på at rømningen starter.</p>'; },
    melding(d, el) {
      if (d.t !== "es") return;
      const lang = d.en ? ' lang="en"' : "";
      const tx = d.en
        ? { venter: "Wait for the escape to start.", ledetrader: "Your clues – read them aloud to your team!", ingen: "You have no text this time. Read the task aloud, keep track of what the others say, and help find the answer.", apen: "🔓 Open!", fri: "You are free!", las: "Lock" }
        : { venter: "Vent på at rømningen starter.", ledetrader: "Dine ledetråder – les dem høyt for laget!", ingen: "Du har ingen tekst denne gangen. Les oppgaven høyt, hold styr på det de andre leser, og hjelp til å finne svaret.", apen: "🔓 Åpen!", fri: "Dere er fri!", las: "Lås" };
      let h = "";
      if (d.fase === "venter") h = '<p class="rk-stor">' + (d.ikon || "🔐") + " " + esc(d.rom || "") + "</p><p" + lang + ">" + tx.venter + "</p>";
      else if (d.fase === "ferdig") h = '<p class="rk-stor">🗝️ ' + tx.fri + "</p><p" + lang + ">" + esc(d.tekst || "") + "</p>";
      else {
        h = '<div' + lang + '><p class="esr-las">' + tx.las + " " + d.nr + " / " + d.av + " · <strong>" + esc(d.tittel) + "</strong></p>" +
          '<p class="es-oppgave"><span aria-hidden="true">🔒</span> ' + fmt(d.oppgave) + "</p>";
        if (d.fase === "apen") h += '<p class="es-melding ok">' + tx.apen + " " + fmt(d.forklaring || "") + "</p>";
        else h += '<h2 class="esr-h">📜 ' + tx.ledetrader + "</h2>" + (d.biter.length ? '<div class="esr-biter">' + d.biter.map(avsnitt).join("") + "</div>" : '<p class="esr-ingen">' + tx.ingen + "</p>");
        h += "</div>";
      }
      el.innerHTML = h;
    }
  };
})();
