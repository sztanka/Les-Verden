/* =========================================================
   Les verden – Ordverksted (ordverksted.html)
   Hvordan ord er bygd opp: forstavelser, endelser og ordstammer.
   Øvinger: del opp ordet, ordbygger og gjett betydningen.
   ordverksted.html (norsk) · ordverksted.html?sp=en (engelsk)
   Data: data/ordverksted.js · Ingenting lagres.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const bland = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const TX = {
    nb: { tittel: "Ordverksted", over: "Ordenes byggeklosser", ingress: "Mange lange fagord er bygd av mindre deler. Kjenner du delene, kan du ofte gjette hva et nytt ord betyr: u + rett + ferdig, selv + stendig + het, demo + krati. Her lærer du de vanligste byggeklossene – og øver på å ta ord fra hverandre og sette dem sammen.", bytt: ["🇬🇧 English word parts", "ordverksted.html?sp=en"], typer: { for: "Forstavelser – foran", etter: "Endelser – bak", stamme: "Ordstammer fra gresk og latin" }, bet: "betyr", eks: "Eksempler", o1: "1. Del opp ordet", o1t: "Hvilken oppdeling viser ordets byggeklosser?", o2: "2. Ordbygger", o2t: "Velg byggeklossene som gir et ord med denne betydningen.", ingen: "(ingen)", forst: "Forstavelse", stamme: "Stamme", ende: "Endelse", sjekk: "Sjekk", o3: "3. Gjett betydningen", o3t: "Du har kanskje aldri sett disse ordene før. Bruk byggeklossene til å gjette!", riktig: "Riktig!", feil: "Ikke helt – prøv igjen.", neste: "Neste →", ferdig: "Ferdig! Du fikk", av: "av", igjen: "↻ Prøv igjen", merk: "Til læreren: Når elevene møter et nytt fagord, kan dere stoppe opp og spørre: Hvilke deler ser du? Hva betyr de? Denne vanen gir bedre ordforråd og leseforståelse – særlig for flerspråklige elever, som ofte kjenner de greske og latinske stammene fra andre språk." },
    en: { tittel: "Word Workshop", over: "Building blocks of words", ingress: "Many long words are built from smaller parts. If you know the parts, you can often guess what a new word means: un + employ + ment, inter + nation + al, demo + cracy. Learn the most common building blocks – and practise taking words apart and putting them together.", bytt: ["🇳🇴 Norske ordbiter", "ordverksted.html"], typer: { for: "Prefixes – at the start", etter: "Suffixes – at the end", stamme: "Roots from Greek and Latin" }, bet: "means", eks: "Examples", o1: "1. Split the word", o1t: "Which split shows the building blocks of the word?", o2: "2. Word builder", o2t: "Choose the building blocks that make a word with this meaning.", ingen: "(none)", forst: "Prefix", stamme: "Root", ende: "Suffix", sjekk: "Check", o3: "3. Guess the meaning", o3t: "You may never have seen these words before. Use the building blocks to guess!", riktig: "Correct!", feil: "Not quite – try again.", neste: "Next →", ferdig: "Finished! You got", av: "of", igjen: "↻ Try again", merk: "For teachers: When students meet a new word, stop and ask: Which parts can you see? What do they mean? This habit improves vocabulary and reading comprehension – especially for multilingual students, who often know Greek and Latin roots from other languages." }
  };

  document.addEventListener("DOMContentLoaded", () => {
    const sp = LV.param("sp") === "en" ? "en" : "nb", T = TX[sp], D = LV.ordverksted[sp], lang = sp === "en" ? ' lang="en"' : "";
    document.title = T.tittel + " – " + (LV.config ? LV.config.navn : "Les verden");
    $("innhold").innerHTML = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="lesestrategier.html">Lese og skrive</a> › Ordverksted</nav><div' + lang + ">" +
      '<header class="sidehode"><p class="overlinje">' + T.over + "</p><h1>🧱 " + T.tittel + '</h1><p class="ingress">' + T.ingress + '</p><p><a class="knapp liten" href="' + T.bytt[1] + '"' + (sp === "en" ? ' lang="nb"' : ' lang="en"') + ">" + T.bytt[0] + "</a></p></header>" +
      ["for", "etter", "stamme"].map(k => '<section class="ow-gruppe"><h2>' + T.typer[k] + '</h2><ul class="ow-deler">' + D.deler.filter(d => d[1] === k).map(d => '<li class="ow-del ow-' + k + '"><span class="ow-bit">' + esc(d[0]) + '</span><span class="ow-bet">' + T.bet + " " + esc(d[2]) + '</span><span class="ow-eks">' + d[3].map(esc).join(" · ") + "</span></li>").join("") + "</ul></section>").join("") +
      '<section class="ov-ovelse"><h2>' + T.o1 + '</h2><p class="mu-intro">' + T.o1t + '</p><div id="ow-del"></div></section>' +
      '<section class="ov-ovelse"><h2>' + T.o2 + '</h2><p class="mu-intro">' + T.o2t + '</p><div id="ow-bygg"></div></section>' +
      '<section class="ov-ovelse"><h2>' + T.o3 + '</h2><p class="mu-intro">' + T.o3t + '</p><div id="ow-gjett"></div></section>' +
      '<p class="fo-merk">' + T.merk + "</p></div>";

    // Generisk flervalgsrunde
    function runde(boks, oppgaver, lagHtml) {
      let nr = 0, poeng = 0, liste = bland(oppgaver);
      function vis() {
        if (nr >= liste.length) { $(boks).innerHTML = '<p class="ov-det-slutt">🏁 ' + T.ferdig + " " + poeng + " " + T.av + " " + liste.length + '.</p><button type="button" class="knapp liten">' + T.igjen + "</button>"; $(boks).querySelector("button").addEventListener("click", () => { nr = 0; poeng = 0; liste = bland(oppgaver); vis(); }); return; }
        const o = lagHtml(liste[nr]);
        $(boks).innerHTML = '<p class="ov-det-teller">' + (nr + 1) + " " + T.av + " " + liste.length + "</p>" + o.html + '<div class="ov-det-valg">' + o.valg.map((v, i) => '<button type="button" class="knapp ow-valg" data-ok="' + (v.ok ? 1 : 0) + '">' + v.html + "</button>").join("") + '</div><p class="ov-melding" role="status" aria-live="polite"></p>';
        let svart = false;
        $(boks).querySelectorAll(".ow-valg").forEach(b => b.addEventListener("click", () => {
          if (svart) return; svart = true;
          const ok = b.dataset.ok === "1"; if (ok) poeng++;
          $(boks).querySelectorAll(".ow-valg").forEach(x => { x.disabled = true; if (x.dataset.ok === "1") x.classList.add("ok"); else if (x === b) x.classList.add("feil"); });
          $(boks).querySelector(".ov-melding").innerHTML = (ok ? "✔ " + T.riktig : "✘") + (o.forklaring ? " " + esc(o.forklaring) : "") + ' <button type="button" class="knapp liten ow-neste">' + T.neste + "</button>";
          const n = $(boks).querySelector(".ow-neste"); n.addEventListener("click", () => { nr++; vis(); const f = $(boks).querySelector("button"); if (f) f.focus(); }); n.focus();
        }));
      }
      vis();
    }
    const delt = s => s.split("|").map(esc).join('<span class="ow-skille" aria-hidden="true">|</span><span class="skjult-visuelt"> + </span>');
    runde("ow-del", D.del, ([riktig, feil]) => ({ html: '<p class="ow-ordet">' + esc(riktig.replace(/\|/g, "")) + "</p>", valg: bland([{ html: delt(riktig), ok: true }].concat(feil.map(f => ({ html: delt(f) })))) }));
    runde("ow-gjett", D.gjett, ([ord, rett, f1, f2, forkl]) => ({ html: '<p class="ow-ordet">' + esc(ord) + "</p>", valg: bland([{ html: esc(rett), ok: true }, { html: esc(f1) }, { html: esc(f2) }]), forklaring: forkl }));

    // Ordbygger
    const unik = i => [...new Set(D.bygg.map(b => b[1][i]).filter(Boolean))].sort();
    const kol = [[T.forst, unik(0)], [T.stamme, unik(1)], [T.ende, unik(2)]];
    let bn = 0, bliste = bland(D.bygg);
    function bygg() {
      if (bn >= bliste.length) { $("ow-bygg").innerHTML = '<p class="ov-det-slutt">🏁 ' + T.ferdig.replace(/ Du fikk| You got/, "") + '</p><button type="button" class="knapp liten" id="ow-bygg-igjen">' + T.igjen + "</button>"; $("ow-bygg-igjen").addEventListener("click", () => { bn = 0; bliste = bland(D.bygg); bygg(); }); return; }
      const [bet, deler, ord] = bliste[bn];
      $("ow-bygg").innerHTML = '<p class="ov-det-teller">' + (bn + 1) + " " + T.av + " " + bliste.length + '</p><p class="ow-ordet ow-betydning">«' + esc(bet) + '»</p><div class="ow-byggrad">' + kol.map(([navn, opsj], i) => '<label>' + navn + '<select data-i="' + i + '"><option value="">' + T.ingen + "</option>" + opsj.map(o => '<option value="' + esc(o) + '">' + esc(o) + "</option>").join("") + "</select></label>").join('<span class="ow-pluss" aria-hidden="true">+</span>') +
        '</div><p><button type="button" class="knapp hoved" id="ow-sjekk">' + T.sjekk + '</button></p><p class="ov-melding" id="ow-bygg-m" role="status" aria-live="polite"></p>';
      $("ow-sjekk").addEventListener("click", () => {
        const valgt = [...$("ow-bygg").querySelectorAll("select")].map(s => s.value);
        const ok = valgt.every((v, i) => v === deler[i]);
        $("ow-bygg-m").innerHTML = ok ? "✔ " + T.riktig + " " + deler.filter(Boolean).map(esc).join(" + ") + " = <strong>" + esc(ord) + '</strong> <button type="button" class="knapp liten" id="ow-bygg-neste">' + T.neste + "</button>" : "✘ " + T.feil;
        if (ok) { $("ow-sjekk").disabled = true; $("ow-bygg-neste").addEventListener("click", () => { bn++; bygg(); const f = $("ow-bygg").querySelector("select, button"); if (f) f.focus(); }); $("ow-bygg-neste").focus(); }
      });
    }
    bygg();
  });
})();
