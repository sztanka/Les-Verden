/* =========================================================
   Les verden – lagre svarene i en fil og fortsette senere
   Legger to knapper i svarlinja nederst:
   «💾 Last ned svarene» – lager en tekstfil på elevens egen maskin.
   «📂 Fortsett fra fil» – leser filen inn igjen og fyller ut feltene.
   Siden lagrer fortsatt ingenting: filen ligger bare hos eleven.
   ========================================================= */
(function () {
  const LV = window.LV;
  const MERKE = "===== Les verden: ikke endre linjene under – de brukes når du fortsetter =====";
  const sideNokkel = () => { const p = new URLSearchParams(location.search); const fil = location.pathname.split("/").pop() || "index.html"; return fil + (p.get("id") ? "?id=" + p.get("id") : ""); };
  const tittel = () => (document.querySelector("h1") ? document.querySelector("h1").textContent.trim() : document.title);

  function felt() {
    const alle = [...document.querySelectorAll("textarea, input[type=text], input:not([type]), input[type=checkbox], input[type=radio]")]
      .filter(el => !el.closest(".topp, dialog, .lesestotte") && el.type !== "file" && el.type !== "search");
    return alle.map((el, i) => ({ el: el, nokkel: el.id || (el.name ? "n:" + el.name : "nr" + i) }));
  }
  function sporsmalFor(el) {
    if (el.id) { const l = document.querySelector('label[for="' + el.id + '"]'); if (l && !l.classList.contains("skjult-visuelt") && !/^(ditt svar|your answer|svar|navn|name)\b/i.test(l.textContent.trim())) return l.textContent.trim(); }
    if (el.getAttribute("aria-label") && !/^(your answer|ditt svar|svar)/i.test(el.getAttribute("aria-label"))) return el.getAttribute("aria-label");
    for (let x = el.previousElementSibling; x; x = x.previousElementSibling) if (/^(P|LEGEND|H3|H4)$/.test(x.tagName) && x.textContent.trim()) return x.textContent.trim().slice(0, 300);
    const boks = el.closest("li, aside, .sk-del, fieldset, label, section");
    const q = boks && [...boks.querySelectorAll("legend, p, h3, h2")].find(x => x.textContent.trim() && !x.contains(el));
    return q ? q.textContent.trim().slice(0, 300) : "";
  }

  function lastNed(status) {
    const f = felt();
    const data = {}; let antall = 0;
    f.forEach(({ el, nokkel }) => {
      if (el.type === "checkbox" || el.type === "radio") { if (el.checked) { data[nokkel] = true; antall++; } }
      else if (el.value.trim()) { data[nokkel] = el.value; antall++; }
    });
    if (!antall) { status("Du har ikke skrevet noe ennå."); return; }
    const dato = new Date();
    const lesbar = f.filter(({ el }) => el.tagName === "TEXTAREA" && el.value.trim()).map(({ el }) => { const q = sporsmalFor(el); return (q ? q + "\n" : "") + el.value.trim(); }).join("\n\n");
    const navnFelt = document.getElementById("elevnavn");
    const tekst = (LV.config ? LV.config.navn : "Les verden") + " – " + tittel() + "\n" + (navnFelt && navnFelt.value.trim() ? "Navn: " + navnFelt.value.trim() + "\n" : "") +
      "Lagret: " + dato.toLocaleString("nb-NO") + "\nSide: " + location.href.split("#")[0] + "\n\n" + lesbar + "\n\n\n" + MERKE + "\n" +
      JSON.stringify({ versjon: 1, side: sideNokkel(), tittel: tittel(), dato: dato.toISOString(), felt: data });
    const blob = new Blob([tekst], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    const slug = tittel().toLowerCase().replace(/æ/g, "ae").replace(/ø/g, "o").replace(/å/g, "a").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
    a.href = URL.createObjectURL(blob);
    a.download = "les-verden-" + slug + "-" + dato.toISOString().slice(0, 10) + ".txt";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    status("Filen er lastet ned. Ta vare på den – da kan du fortsette senere.");
  }

  function lesInn(fil, status) {
    const r = new FileReader();
    r.onload = () => {
      const tekst = String(r.result), i = tekst.indexOf(MERKE);
      let d = null;
      try { d = JSON.parse(tekst.slice(i + MERKE.length).trim()); } catch (e) { d = null; }
      if (i < 0 || !d || !d.felt) { status("Fant ingen svar i filen. Bruk en fil du har lastet ned fra Les verden."); return; }
      if (d.side !== sideNokkel()) {
        status("");
        const lenke = document.createElement("p");
        lenke.className = "sf-annen";
        lenke.innerHTML = "Filen hører til en annen side: <strong>" + LV.esc(d.tittel || d.side) + '</strong>. <a href="' + LV.esc(d.side) + '">Åpne den siden</a>, og last inn filen der.';
        document.querySelector(".svarlinje-indre").appendChild(lenke);
        setTimeout(() => lenke.remove(), 12000);
        return;
      }
      let fylt = 0;
      felt().forEach(({ el, nokkel }) => {
        if (!(nokkel in d.felt)) return;
        if (el.type === "checkbox" || el.type === "radio") { el.checked = !!d.felt[nokkel]; el.dispatchEvent(new Event("change", { bubbles: true })); }
        else { el.value = d.felt[nokkel]; el.dispatchEvent(new Event("input", { bubbles: true })); }
        fylt++;
      });
      status(fylt ? "Velkommen tilbake! " + fylt + " felt er fylt ut fra filen." : "Fant ingen felt å fylle ut.");
    };
    r.readAsText(fil, "utf-8");
  }

  function leggTil() {
    const linje = document.querySelector(".svarlinje-indre");
    if (!linje) return false;
    if (linje.querySelector(".sf-ned")) return true;
    const ytre = linje.closest(".svarlinje");
    if (ytre && !ytre.closest("main, [role=region], aside, footer") && !ytre.hasAttribute("role")) { ytre.setAttribute("role", "region"); ytre.setAttribute("aria-label", "Svarene dine"); }
    const statusEl = linje.querySelector(".status") || (() => { const s = document.createElement("span"); s.className = "status"; s.setAttribute("role", "status"); linje.appendChild(s); return s; })();
    const status = t => { statusEl.textContent = t; };
    const ned = document.createElement("button");
    ned.type = "button"; ned.className = "knapp sf-ned"; ned.innerHTML = '<span aria-hidden="true">💾</span> <span class="knapp-tekst">Last ned svarene</span>';
    ned.title = "Lagre svarene i en fil på din egen maskin";
    ned.addEventListener("click", () => lastNed(status));
    const opp = document.createElement("button");
    opp.type = "button"; opp.className = "knapp sf-opp"; opp.innerHTML = '<span aria-hidden="true">📂</span> <span class="knapp-tekst">Fortsett fra fil</span>';
    opp.title = "Les inn en fil du har lastet ned før, og fortsett der du slapp";
    const inn = document.createElement("input");
    inn.type = "file"; inn.accept = ".txt,text/plain"; inn.hidden = true;
    inn.addEventListener("change", () => { if (inn.files[0]) lesInn(inn.files[0], status); inn.value = ""; });
    opp.addEventListener("click", () => inn.click());
    linje.insertBefore(ned, statusEl); linje.insertBefore(opp, statusEl); linje.appendChild(inn);
    return true;
  }
  document.addEventListener("DOMContentLoaded", () => {
    if (leggTil()) return;
    const obs = new MutationObserver(() => { if (leggTil()) obs.disconnect(); });
    obs.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => obs.disconnect(), 15000);
  });
})();
