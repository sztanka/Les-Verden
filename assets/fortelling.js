/* =========================================================
   Les verden – Velg din vei (fortelling.html)
   Historiske fortellinger med valg. Data: data/fortellinger.js
   fortelling.html            → oversikt
   fortelling.html?id=<id>    → fortellingen
   Ingenting lagres. Veien eleven har valgt, vises nederst og kan
   lastes ned sammen med svarene (svarfil.js) eller skrives ut.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));

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

  function oversikt() {
    document.title = "Velg din vei – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = hode() +
      '<header class="sidehode"><p class="overlinje">Spill · lesing</p><h1>🧭 Velg din vei</h1><p class="ingress">Gå inn i historien som en ung person som lever i den. Du leser, tar valg – og ser hva som skjer. Personene er oppdiktet, men hendelsene, stedene og faktaboksene bygger på ekte historie. Prøv gjerne flere veier!</p></header>' +
      '<ul class="fo-liste">' + LV.fortellinger.map(f =>
        '<li><a class="fo-kort" href="fortelling.html?id=' + f.id + '" style="--fo-a:' + f.farger[0] + ";--fo-b:" + f.farger[1] + '">' +
        '<span class="fo-kort-topp"><span class="fo-ikon" aria-hidden="true">' + f.ikon + "</span><span>" + esc(f.undertittel) + "</span></span>" +
        "<strong>" + esc(f.tittel) + "</strong><span>" + esc(f.kort) + '</span><span class="fo-trinn">' + f.trinn + ". trinn · " + Object.values(f.noder).filter(n => !n.valg).length + " ulike slutter</span></a></li>").join("") + "</ul>" +
      '<p class="mu-intro">For læreren: Fortellingene passer som inngang til et tema, eller som avslutning der elevene sammenligner veiene de har valgt. Be elevene lese faktaboksene høyt for hverandre.</p>';
  }

  function fortelling(f) {
    document.title = f.tittel + " – Velg din vei";
    const tema = LV.temaer && LV.temaer.find(t => t.id === f.tema);
    let sti = [];            // [{node, valg}] – valgene eleven har tatt
    const funnet = new Set(); // slutter funnet i denne økta (bare i minnet)
    const slutter = Object.keys(f.noder).filter(k => !f.noder[k].valg);

    $("innhold").innerHTML = hode(f.tittel) +
      '<header class="sidehode fo-hode" style="--fo-a:' + f.farger[0] + ";--fo-b:" + f.farger[1] + '"><p class="overlinje">Velg din vei · ' + esc(f.undertittel) + '</p><h1><span aria-hidden="true">' + f.ikon + "</span> " + esc(f.tittel) + "</h1>" +
      '<div class="fo-rolle"><p>' + fmt(f.rolle, f.ord) + '</p><p class="fo-merk">Personene i fortellingen er oppdiktet. Faktaboksene forteller hva som skjedde i virkeligheten.</p></div></header>' +
      '<div id="fo-scener" class="fo-scener" aria-live="polite"></div><div id="fo-etter"></div>';

    const scene = (id, nr) => {
      const n = f.noder[id];
      let h = '<section class="fo-scene' + (n.valg ? "" : " fo-slutt") + '" data-node="' + id + '"><h2 class="fo-nr" tabindex="-1">' + (n.valg ? "Del " + (nr + 1) : "🏁 Slutt: " + esc(n.slutt || "")) + "</h2>" +
        n.tekst.map(p => "<p>" + fmt(p, f.ord) + "</p>").join("");
      if (n.kilde) h += '<aside class="fo-kilde"><h3>📜 ' + esc(n.kilde.tittel) + "</h3><p>" + fmt(n.kilde.tekst, f.ord) + "</p></aside>";
      if (n.valg) h += '<div class="fo-valg" role="group" aria-label="Hva gjør du?"><p class="fo-sporsmal">Hva gjør du?</p>' + n.valg.map((v, i) => '<button type="button" class="fo-valgknapp" data-i="' + i + '">' + esc(v.t) + "</button>").join("") + "</div>";
      return h + "</section>";
    };

    const tegn = (fokus) => {
      const ider = [f.start].concat(sti.map(s => f.noder[s.node].valg[s.valg].til));
      $("fo-scener").innerHTML = ider.map((id, i) => {
        let h = scene(id, i);
        const tatt = sti[i];
        if (tatt) {
          // Allerede valgt: vis valget som tekst i stedet for knappene
          h = h.replace(/<div class="fo-valg"[\s\S]*<\/div><\/section>$/, '<p class="fo-valgt">➜ Du valgte: <strong>' + esc(f.noder[id].valg[tatt.valg].t) + "</strong></p></section>");
        }
        return h;
      }).join("");
      const siste = ider[ider.length - 1];
      if (sti.length) $("fo-scener").insertAdjacentHTML("beforeend", '<p class="fo-tilbake"><button type="button" class="knapp liten" id="fo-angre">↶ Gå tilbake ett valg</button></p>');
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
      $("fo-etter").innerHTML = '<section class="fo-oppsummering"><h2>🧭 Veien din</h2><ol class="fo-vei">' + vei.map(v => "<li>" + esc(v) + "</li>").join("") + "</ol>" +
        '<p class="fo-funnet">Du har funnet <strong>' + funnet.size + " av " + slutter.length + "</strong> slutter i denne fortellingen. Hva skjer hvis du velger annerledes?</p>" +
        '<p><button type="button" class="knapp hoved" id="fo-igjen">↺ Prøv en annen vei</button>' + (tema ? ' <a class="knapp" href="tema.html?id=' + encodeURIComponent(tema.id) + '">Les temaet «' + esc(tema.tittel) + "» →</a>" : "") + "</p></section>" +
        '<section class="fo-oppgaver" id="oppgaver"><h2>Snakk og skriv</h2><ol>' + e.sporsmal.map((s, i) =>
          '<li><label for="fo-s-' + i + '">' + esc(s) + '</label><textarea id="fo-s-' + i + '" rows="3"></textarea></li>').join("") + "</ol>" +
        '<h3>✍️ Skriveoppgave</h3><label for="fo-skriv">' + esc(e.skriv) + '</label><textarea id="fo-skriv" rows="9"></textarea>' +
        '<input type="hidden" id="fo-veien" value="' + esc(vei.join(" → ")) + '"></section>';
      $("fo-igjen").addEventListener("click", () => { sti = []; tegn(true); window.scrollTo({ top: 0, behavior: "smooth" }); });
    };

    $("innhold").addEventListener("click", e => {
      const o = e.target.closest(".fo-ord");
      if (o) { const sp = o.nextElementSibling; const apen = o.getAttribute("aria-expanded") === "true"; o.setAttribute("aria-expanded", String(!apen)); sp.hidden = apen; return; }
      const b = e.target.closest(".fo-valgknapp");
      if (b) { const sc = b.closest(".fo-scene"); sti.push({ node: sc.dataset.node, valg: +b.dataset.i }); tegn(true); return; }
      if (e.target.id === "fo-angre") { sti.pop(); tegn(true); }
    });
    tegn(false);

    // Svarlinje: navn + last ned / fortsett fra fil (svarfil.js) + skriv ut
    const linje = document.createElement("div");
    linje.className = "svarlinje";
    linje.innerHTML = '<div class="svarlinje-indre"><label class="skjult-visuelt" for="elevnavn">Navn</label><input id="elevnavn" type="text" placeholder="Navn" autocomplete="off"><button type="button" class="knapp" id="fo-skrivut">🖨️ <span class="knapp-tekst">Skriv ut</span></button><span class="status" role="status" aria-live="polite"></span></div>';
    document.body.appendChild(linje);
    $("fo-skrivut").addEventListener("click", () => window.print());
  }

  document.addEventListener("DOMContentLoaded", () => {
    const f = LV.fortellinger.find(x => x.id === LV.param("id"));
    if (f) fortelling(f); else oversikt();
  });
})();
