/* =========================================================
   Les verden – Velg din vei (fortelling.html)
   Historiske fortellinger med valg. Data: data/fortellinger.js
   fortelling.html                  → oversikt
   fortelling.html?id=<id>          → fortellingen
   fortelling.html?id=<id>&lett=1   → lettere tekst (når fortellingen har «lett»)
   fortelling.html?id=<id>&laerer=1 → viser «kontroller» (faktasjekk for læreren)
   Ingenting lagres. Veien eleven har valgt, vises nederst sammen med
   et kart over alle veiene og sluttene, og kan lastes ned (svarfil.js)
   eller skrives ut.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));

  const T = {
    nb: {
      del: "Del", slutt: "Slutt", hvaGjor: "Hva gjør du?", valgte: "Du valgte", tilbake: "↶ Gå tilbake ett valg",
      merk: "Personene i fortellingen er oppdiktet. Faktaboksene forteller hva som skjedde i virkeligheten.",
      veien: "🧭 Veien din", ogsa: "Du kunne også ha valgt:", funnet: (a, b) => "Du har funnet <strong>" + a + " av " + b + "</strong> slutter i denne fortellingen. Hva skjer hvis du velger annerledes?",
      igjen: "↺ Prøv en annen vei", les: t => "Les temaet «" + t + "» →", kart: "🗺️ Kart over fortellingen",
      kartTekst: "Hver prikk er en del av fortellingen, og hvert flagg er en slutt. Den tykke streken er veien du valgte.",
      sluttene: "Sluttene", ukjent: "Ukjent slutt – ikke funnet ennå", dinSlutt: "din slutt nå", funnetMerke: "funnet",
      ekte: "🔎 Hva var ekte, og hva er oppdiktet?", ekteJa: "Ekte historie", ekteNei: "Oppdiktet",
      snakk: "Snakk og skriv", skriv: "✍️ Skriveoppgave", tekst: "Tekst:", lett: "🌱 Lettere tekst", vanlig: "📄 Vanlig tekst",
      lettInfo: "Den lettere teksten er kortere og har enklere ord. Valgene er de samme.",
      laerer: "For læreren: kontroller disse opplysningene", navn: "Navn", skrivUt: "Skriv ut"
    },
    en: {
      del: "Part", slutt: "Ending", hvaGjor: "What do you do?", valgte: "You chose", tilbake: "↶ Go back one choice",
      merk: "The people in the story are made up. The fact boxes tell you what really happened.",
      veien: "🧭 Your path", ogsa: "You could also have chosen:", funnet: (a, b) => "You have found <strong>" + a + " of " + b + "</strong> endings in this story. What happens if you choose differently?",
      igjen: "↺ Try another path", les: t => "Read the topic «" + t + "» →", kart: "🗺️ Map of the story",
      kartTekst: "Each dot is a part of the story, and each flag is an ending. The thick line is the path you chose.",
      sluttene: "The endings", ukjent: "Unknown ending – not found yet", dinSlutt: "your ending now", funnetMerke: "found",
      ekte: "🔎 What was real, and what is made up?", ekteJa: "Real history", ekteNei: "Made up",
      snakk: "Talk and write", skriv: "✍️ Writing task", tekst: "Text:", lett: "🌱 Easier text", vanlig: "📄 Standard text",
      lettInfo: "The easier text is shorter and uses simpler words. The choices are the same.",
      laerer: "For læreren: kontroller disse opplysningene", navn: "Name", skrivUt: "Print"
    }
  };

  function fmt(t, ord) {
    return esc(t)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (m, vis, nokkel) => {
        const k = nokkel || vis;
        const f = ord && (ord[k] || ord[k.toLowerCase()] || ord[k.replace(/(en|ene|er|s)$/, "")]);
        if (!f) return vis;
        return '<button type="button" class="ord fo-ord" aria-expanded="false">' + vis + '</button><span class="fo-forkl" hidden> (' + esc(f) + ")</span>";
      });
  }

  const hode = (ekstra) => '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="spill.html">Spill</a> › <a href="fortelling.html">Velg din vei</a>' + (ekstra ? " › " + esc(ekstra) : "") + "</nav>";
  const antSlutter = f => Object.values(f.noder).filter(n => !n.valg).length;

  function oversikt() {
    document.title = "Velg din vei – " + (LV.config ? LV.config.navn : "Les verden");
    const kort = f => '<li><a class="fo-kort" href="fortelling.html?id=' + f.id + '" style="--fo-a:' + f.farger[0] + ";--fo-b:" + f.farger[1] + '"' + (f.sprak === "en" ? ' lang="en"' : "") + ">" +
      '<span class="fo-kort-topp"><span class="fo-ikon" aria-hidden="true">' + f.ikon + "</span><span>" + esc(f.undertittel) + "</span></span>" +
      "<strong>" + esc(f.tittel) + "</strong><span>" + esc(f.kort) + '</span><span class="fo-trinn" lang="nb">' + (f.sprak === "en" ? "🇬🇧 English · " : "") + f.trinn + ". trinn · " + antSlutter(f) + " ulike slutter" + (Object.values(f.noder).some(n => n.lett) ? " · 🌱 lettere tekst" : "") + "</span></a></li>";
    const liste = LV.fortellinger.slice().sort((a, b) => a.trinn - b.trinn || (a.ar || 0) - (b.ar || 0));
    const grupper = [["nb", "Samfunnsfag – på norsk"], ["en", "English – in English"]];
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje">Spill · lesing</p><h1>🧭 Velg din vei</h1><p class="ingress">Gå inn i historien som en ung person som lever i den. Du leser, tar valg – og ser hva som skjer. Personene er oppdiktet, men hendelsene, stedene og faktaboksene bygger på ekte historie. Prøv gjerne flere veier!</p></header>' +
      grupper.map(([sp, navn]) => {
        const l = liste.filter(f => (f.sprak || "nb") === sp);
        return l.length ? '<h2 class="fo-gruppe">' + navn + '</h2><ul class="fo-liste">' + l.map(kort).join("") + "</ul>" : "";
      }).join("") +
      '<p class="mu-intro">For læreren: Fortellingene passer som inngang til et tema, eller som avslutning der elevene sammenligner veiene de har valgt. Kartet over fortellingen etter hver slutt gjør det lett å snakke om hvor veiene skilte lag. Be elevene lese faktaboksene høyt for hverandre. Mange fortellinger har også en lettere tekst.</p>';
  }

  // ---------- Kart over fortellingen (SVG) ----------
  function kart(f, ider, funnet, tx) {
    // Dybde = korteste vei fra start
    const dybde = { [f.start]: 0 }, ko = [f.start];
    while (ko.length) { const id = ko.shift(); (f.noder[id].valg || []).forEach(v => { if (!(v.til in dybde)) { dybde[v.til] = dybde[id] + 1; ko.push(v.til); } }); }
    const lag = [];
    Object.keys(dybde).forEach(id => { (lag[dybde[id]] = lag[dybde[id]] || []).push(id); });
    const slutter = Object.keys(f.noder).filter(k => !f.noder[k].valg && k in dybde);
    const nr = {}; slutter.forEach((k, i) => { nr[k] = i + 1; });
    const smal = window.innerWidth < 600, B = smal ? 340 : 640, dy = 54, H = lag.length * dy + 30;
    const pos = {};
    lag.forEach((l, d) => l.forEach((id, i) => { pos[id] = [Math.round(B * (i + 1) / (l.length + 1)), 24 + d * dy]; }));
    const paVei = new Set(); for (let i = 1; i < ider.length; i++) paVei.add(ider[i - 1] + ">" + ider[i]);
    const besokt = new Set(ider);
    let s = "";
    Object.keys(dybde).forEach(id => (f.noder[id].valg || []).forEach(v => {
      const a = pos[id], b = pos[v.til]; if (!b) return;
      const valgt = paVei.has(id + ">" + v.til);
      const my = (a[1] + b[1]) / 2;
      s += '<path d="M' + a[0] + " " + a[1] + " C" + a[0] + " " + my + " " + b[0] + " " + my + " " + b[0] + " " + b[1] + '" class="fk-kant' + (valgt ? " valgt" : "") + '"/>';
    }));
    Object.keys(dybde).forEach(id => {
      const [x, y] = pos[id], n = f.noder[id];
      if (n.valg) s += '<circle cx="' + x + '" cy="' + y + '" r="' + (besokt.has(id) ? 9 : 7) + '" class="fk-node' + (besokt.has(id) ? " besokt" : "") + '"/>';
      else {
        const kl = ider[ider.length - 1] === id ? " na" : funnet.has(id) ? " funnet" : "";
        s += '<g class="fk-slutt' + kl + '"><rect x="' + (x - 13) + '" y="' + (y - 13) + '" width="26" height="26" rx="6"/><text x="' + x + '" y="' + (y + 5) + '" text-anchor="middle">' + nr[id] + "</text></g>";
      }
    });
    const liste = slutter.map(k => {
      const na = ider[ider.length - 1] === k, kjent = funnet.has(k);
      return '<li class="' + (na ? "na" : kjent ? "funnet" : "ukjent") + '"><span class="fk-nr">' + nr[k] + "</span> " + (kjent ? "<strong>" + esc(f.noder[k].slutt || "") + "</strong>" + (na ? " – " + tx.dinSlutt : " – " + tx.funnetMerke) : tx.ukjent) + "</li>";
    }).join("");
    return '<section class="fo-kart" aria-labelledby="fk-tittel"><h2 id="fk-tittel">' + tx.kart + '</h2><p class="fo-merk">' + tx.kartTekst + "</p>" +
      '<svg viewBox="0 0 ' + B + " " + H + '" aria-hidden="true" focusable="false">' + s + "</svg>" +
      "<h3>" + tx.sluttene + '</h3><ol class="fk-slutter">' + liste + "</ol></section>";
  }

  function fortelling(f) {
    const sp = f.sprak === "en" ? "en" : "nb", tx = T[sp];
    document.title = f.tittel + " – Velg din vei";
    const tema = LV.temaer && LV.temaer.find(t => t.id === f.tema);
    let sti = [];            // [{node, valg}] – valgene eleven har tatt
    const funnet = new Set(); // slutter funnet i denne økta (bare i minnet)
    const slutter = Object.keys(f.noder).filter(k => !f.noder[k].valg);
    const harLett = Object.values(f.noder).some(n => n.lett);
    let lett = harLett && LV.param("lett") === "1";
    const tekstAv = n => (lett && n.lett) || n.tekst;

    const lærer = LV.param("laerer") === "1" && f.kontroller && f.kontroller.length
      ? '<aside class="laerer-boks" lang="nb"><h2>' + T.nb.laerer + "</h2><ul>" + f.kontroller.map(k => "<li>" + esc(k) + "</li>").join("") + "</ul></aside>" : "";
    $("innhold").innerHTML = hode(f.tittel) + lærer +
      '<div class="fo-ramme-ytre"' + (sp === "en" ? ' lang="en"' : "") + '><header class="sidehode fo-hode" style="--fo-a:' + f.farger[0] + ";--fo-b:" + f.farger[1] + '"><p class="overlinje">' + (sp === "en" ? "Choose your path" : "Velg din vei") + " · " + esc(f.undertittel) + '</p><h1><span aria-hidden="true">' + f.ikon + "</span> " + esc(f.tittel) + "</h1>" +
      (harLett ? '<div class="tekstniva" role="group" aria-label="' + (sp === "en" ? "Text level" : "Tekstnivå") + '"><span class="etikett">' + tx.tekst + '</span><button type="button" class="knapp liten" data-fo-niva="lett">' + tx.lett + '</button><button type="button" class="knapp liten" data-fo-niva="vanlig">' + tx.vanlig + '</button><span class="tekstniva-info">' + tx.lettInfo + "</span></div>" : "") +
      '<div class="fo-rolle" id="fo-rolle"></div></header>' +
      '<div id="fo-scener" class="fo-scener" aria-live="polite"></div><div id="fo-etter"></div></div>';

    const rolle = () => {
      $("fo-rolle").innerHTML = (LV.bildeFigurer ? LV.bildeFigurer("fortelling:" + f.id, f.sprak === "en" ? "en" : "nb") : "") + "<p>" + fmt((lett && f.rolleLett) || f.rolle, f.ord) + '</p><p class="fo-merk">' + tx.merk + "</p>";
      document.querySelectorAll("[data-fo-niva]").forEach(b => b.setAttribute("aria-pressed", String((b.dataset.foNiva === "lett") === lett)));
    };

    const scene = (id, nr) => {
      const n = f.noder[id];
      let h = '<section class="fo-scene' + (n.valg ? "" : " fo-slutt") + '" data-node="' + id + '"><h2 class="fo-nr" tabindex="-1">' + (n.valg ? tx.del + " " + (nr + 1) : "🏁 " + tx.slutt + ": " + esc(n.slutt || "")) + "</h2>" +
        tekstAv(n).map(p => "<p>" + fmt(p, f.ord) + "</p>").join("");
      if (n.kilde) h += '<aside class="fo-kilde"><h3>📜 ' + esc(n.kilde.tittel) + "</h3><p>" + fmt((lett && n.kilde.lett) || n.kilde.tekst, f.ord) + "</p></aside>";
      if (n.valg) h += '<div class="fo-valg" role="group" aria-label="' + tx.hvaGjor + '"><p class="fo-sporsmal">' + tx.hvaGjor + "</p>" + n.valg.map((v, i) => '<button type="button" class="fo-valgknapp" data-i="' + i + '">' + esc((lett && v.lett) || v.t) + "</button>").join("") + "</div>";
      return h + "</section>";
    };

    const tegn = (fokus) => {
      rolle();
      const ider = [f.start].concat(sti.map(s => f.noder[s.node].valg[s.valg].til));
      $("fo-scener").innerHTML = ider.map((id, i) => {
        let h = scene(id, i);
        const tatt = sti[i];
        if (tatt) {
          const v = f.noder[id].valg[tatt.valg];
          h = h.replace(/<div class="fo-valg"[\s\S]*<\/div><\/section>$/, '<p class="fo-valgt">➜ ' + tx.valgte + ": <strong>" + esc((lett && v.lett) || v.t) + "</strong></p></section>");
        }
        return h;
      }).join("");
      const siste = ider[ider.length - 1];
      if (sti.length) $("fo-scener").insertAdjacentHTML("beforeend", '<p class="fo-tilbake"><button type="button" class="knapp liten" id="fo-angre">' + tx.tilbake + "</button></p>");
      if (!f.noder[siste].valg) { funnet.add(siste); etter(ider); } else $("fo-etter").innerHTML = "";
      if (fokus) {
        const s = $("fo-scener").querySelectorAll(".fo-scene");
        const h2 = s[s.length - 1].querySelector(".fo-nr");
        h2.focus({ preventScroll: true });
        s[s.length - 1].scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const etter = (ider) => {
      const e = f.etterpaa;
      const vei = sti.map(s => f.noder[s.node].valg[s.valg].t);
      const veiListe = sti.map(s => {
        const n = f.noder[s.node], andre = n.valg.filter((_, i) => i !== s.valg);
        return "<li><strong>" + esc(n.valg[s.valg].t) + "</strong>" + (andre.length ? '<span class="fo-andrevalg">' + tx.ogsa + " " + andre.map(v => "«" + esc(v.t) + "»").join(" · ") + "</span>" : "") + "</li>";
      }).join("");
      const ekte = e.ekte && e.ekte.length ? '<section class="fo-ekte"><h2>' + tx.ekte + '</h2><div class="fo-ekte-rad"><div><h3>✔ ' + tx.ekteJa + "</h3><ul>" + e.ekte.filter(x => x[0]).map(x => "<li>" + fmt(x[1], f.ord) + "</li>").join("") + "</ul></div><div><h3>✎ " + tx.ekteNei + "</h3><ul>" + e.ekte.filter(x => !x[0]).map(x => "<li>" + fmt(x[1], f.ord) + "</li>").join("") + "</ul></div></div></section>" : "";
      $("fo-etter").innerHTML = '<section class="fo-oppsummering"><h2>' + tx.veien + '</h2><ol class="fo-vei">' + veiListe + "</ol>" +
        '<p class="fo-funnet">' + tx.funnet(funnet.size, slutter.length) + "</p>" +
        '<p><button type="button" class="knapp hoved" id="fo-igjen">' + tx.igjen + "</button>" + (tema ? ' <a class="knapp" href="tema.html?id=' + encodeURIComponent(tema.id) + '">' + esc(tx.les(tema.tittel)) + "</a>" : "") + "</p></section>" +
        kart(f, ider, funnet, tx) + ekte +
        '<section class="fo-oppgaver" id="oppgaver"><h2>' + tx.snakk + "</h2><ol>" + e.sporsmal.map((s, i) =>
          '<li><label for="fo-s-' + i + '">' + esc(s) + '</label><textarea id="fo-s-' + i + '" rows="3"></textarea></li>').join("") + "</ol>" +
        "<h3>" + tx.skriv + '</h3><label for="fo-skriv">' + esc(e.skriv) + '</label><textarea id="fo-skriv" rows="9"></textarea>' +
        '<input type="hidden" id="fo-veien" value="' + esc(vei.join(" → ")) + '"></section>';
      $("fo-igjen").addEventListener("click", () => { sti = []; tegn(true); window.scrollTo({ top: 0, behavior: "smooth" }); });
    };

    $("innhold").addEventListener("click", e => {
      const o = e.target.closest(".fo-ord");
      if (o) { const sp = o.nextElementSibling; const apen = o.getAttribute("aria-expanded") === "true"; o.setAttribute("aria-expanded", String(!apen)); sp.hidden = apen; return; }
      const b = e.target.closest(".fo-valgknapp");
      if (b) { const sc = b.closest(".fo-scene"); sti.push({ node: sc.dataset.node, valg: +b.dataset.i }); tegn(true); return; }
      const nv = e.target.closest("[data-fo-niva]");
      if (nv) {
        lett = nv.dataset.foNiva === "lett";
        try { const u = new URL(location.href); if (lett) u.searchParams.set("lett", "1"); else u.searchParams.delete("lett"); history.replaceState(null, "", u); } catch (_) {}
        tegn(false); return;
      }
      if (e.target.id === "fo-angre") { sti.pop(); tegn(true); }
    });
    tegn(false);

    // Svarlinje: navn + last ned / fortsett fra fil (svarfil.js) + skriv ut
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">' + tx.navn + '</label><input id="elevnavn" type="text" placeholder="' + tx.navn + '" autocomplete="off"><button type="button" class="knapp" id="fo-skrivut">🖨️ <span class="knapp-tekst">' + tx.skrivUt + '</span></button><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
    $("fo-skrivut").addEventListener("click", () => window.print());
  }

  document.addEventListener("DOMContentLoaded", () => {
    const f = LV.fortellinger.find(x => x.id === LV.param("id"));
    if (f) fortelling(f); else oversikt();
  });
})();
