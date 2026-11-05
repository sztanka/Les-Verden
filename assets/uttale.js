/* =========================================================
   Les verden – Pronunciation for Norwegians (uttale.html)
   Lyder med eksempelord og lyttequiz (minimale par), ordtrykk,
   stumme bokstaver, vanskelige ord, aksenter og «ta opp deg selv».
   Opptaket ligger bare i nettleserens minne og forsvinner når du
   lukker siden. Ingenting lagres eller sendes.
   ========================================================= */
(function () {
  const LV = window.LV;
  const $ = id => document.getElementById(id);
  const esc = s => LV.esc(String(s == null ? "" : s));
  const fmt = s => esc(s).replace(/\*(.+?)\*/g, "<em>$1</em>");
  const kanLese = "speechSynthesis" in window;
  let aksent = "en-GB";
  const les = (t, fart) => { if (!kanLese) return; speechSynthesis.cancel(); LV.lesEngelsk(t, aksent, fart || 0.85); };
  const knapp = (t, etikett) => kanLese ? '<button type="button" class="ut-les" data-les="' + esc(t) + '" aria-label="' + esc(etikett || "Listen: " + t) + '">🔊 <span lang="en">' + esc(t) + "</span></button>" : '<span class="ut-ord" lang="en">' + esc(t) + "</span>";

  const knappVis = (t, vis) => kanLese ? '<button type="button" class="ut-les" data-les="' + esc(t) + '" aria-label="Listen: ' + esc(t) + '">🔊 <span lang="en">' + esc(vis) + "</span></button>" : '<span class="ut-ord" lang="en">' + esc(vis) + "</span>";

  function bygg() {
    const D = LV.uttale;
    document.title = "Pronunciation for Norwegians – " + (LV.config ? LV.config.navn : "Les verden");
    let h = '<nav class="brodsmuler" aria-label="Brødsmuler"><a href="index.html">Forside</a> › <a href="index.html?fag=engelsk">Engelsk</a> › Pronunciation</nav>' +
      '<header class="sidehode"><p class="overlinje" lang="en">Pronunciation</p><h1 lang="en">Pronunciation for Norwegians</h1><p class="ingress">De engelske lydene nordmenn sliter mest med, ordtrykk, stumme bokstaver og forskjellige aksenter. Trykk på 🔊 for å høre ordene, og ta opp deg selv for å sammenligne.</p></header>' +
      '<div class="ut-verktoy"><label>Aksent: <select id="ut-aksent"></select></label><span class="ut-info" id="ut-info"></span></div>' +
      '<nav class="mu-hopp" aria-label="Snarveier"><a href="#lyder">🔤 Lyder</a><a href="#trykk">📢 Ordtrykk</a><a href="#stumme">🤫 Stumme bokstaver</a><a href="#vanskelige">😅 Vanskelige ord</a><a href="#aksenter">🌍 Aksenter</a><a href="#opptak">🎙️ Ta opp deg selv</a></nav>';

    // Lyder
    h += '<section class="le-del" id="lyder"><h2>🔤 Lydene nordmenn sliter med</h2><p class="mu-intro">Trykk på et ord for å høre det. I lyttequizen hører du ett av to ord – hvilket?</p><div class="ut-lyder">' +
      D.lyder.map(l => '<article class="ut-lyd" id="lyd-' + l.id + '"><h3><span class="ut-tegn">/' + esc(l.tegn) + '/</span> <span lang="en">' + fmt(l.navn) + "</span></h3><p>" + fmt(l.tips) + '</p><div class="ut-ordrad">' + l.ord.map(o => knapp(o)).join("") + "</div>" +
        (kanLese ? '<div class="ut-quiz" data-lyd="' + l.id + '"><button type="button" class="knapp liten ut-spill">▶ Lyttequiz: hvilket ord hører du?</button><div class="ut-svar" hidden><div class="ut-valg"></div><p class="ut-tilbake" aria-live="polite"></p><p class="ut-poeng"></p></div></div>' : "") + "</article>").join("") + "</div></section>";

    // Ordtrykk
    h += '<section class="le-del" id="trykk"><h2>📢 Ordtrykk <span class="ls-en" lang="en">Word stress</span></h2><p class="mu-intro">I engelske ord med flere stavelser er én stavelse sterkere enn de andre. Feil trykk kan gjøre ordet vanskelig å forstå. Lytt, og trykk på stavelsen som har trykk.</p>' +
      '<ol class="ut-trykkliste">' + D.trykk.map((t, i) => '<li data-i="' + i + '"><span class="ut-trykkord">' + (kanLese ? '<button type="button" class="ut-les liten" data-les="' + esc(t.ord) + '" aria-label="Listen: ' + esc(t.ord) + '">🔊</button>' : "") + '</span><span class="ut-stavelser" lang="en">' + t.stavelser.map((s, j) => '<button type="button" class="ut-stavelse" data-j="' + j + '">' + esc(s) + "</button>").join("") + '</span><span class="ut-trykksvar" aria-live="polite"></span></li>').join("") + "</ol>" +
      '<h3>Samme ord – to betydninger</h3><p class="mu-intro">Mange ord har trykk på første stavelse når de er substantiv, og på andre når de er verb.</p><ul class="ut-par">' + D.trykkPar.map(([a, b]) => "<li>" + knappVis(a.toLowerCase(), a) + " – " + knappVis(b.toLowerCase(), b) + "</li>").join("") + "</ul></section>";

    // Stumme bokstaver
    h += '<section class="le-del" id="stumme"><h2>🤫 Stumme bokstaver <span class="ls-en" lang="en">Silent letters</span></h2><p class="mu-intro">Mange engelske ord har bokstaver som ikke uttales. Trykk på ordet for å høre det. Den stumme bokstaven er merket.</p><div class="ut-ordrad">' +
      D.stumme.map(([o, b]) => { const i = o.toLowerCase().indexOf(b); const vis = o.slice(0, i) + "<s>" + o.slice(i, i + 1) + "</s>" + o.slice(i + 1); return kanLese ? '<button type="button" class="ut-les" data-les="' + esc(o) + '" aria-label="Listen: ' + esc(o) + ", silent " + esc(b) + '">🔊 <span lang="en">' + vis + "</span></button>" : '<span class="ut-ord" lang="en">' + vis + "</span>"; }).join("") + "</div></section>";

    // Vanskelige ord
    h += '<section class="le-del" id="vanskelige"><h2>😅 Ord som ofte uttales feil</h2><div class="ut-vanskelige">' + D.vanskelige.map(([o, t]) => '<div class="ut-vansk">' + knapp(o) + "<span>" + fmt(t) + "</span></div>").join("") + "</div></section>";

    // Aksenter
    h += '<section class="le-del" id="aksenter"><h2>🌍 Aksenter <span class="ls-en" lang="en">Varieties of English</span></h2><p class="mu-intro">Engelsk uttales forskjellig i Storbritannia, USA, Australia, India og andre land. Ingen aksent er «riktigere» enn en annen – det viktigste er at du blir forstått. Velg aksent øverst på siden, og lytt til setningene.</p>' +
      '<div class="ut-vanskelige">' + D.aksentord.map(a => '<div class="ut-vansk ut-aksentkort"><strong lang="en">' + esc(a.ord) + "</strong>" + knapp(a.tekst) + '<div class="ut-aksentknapper"></div><span>' + fmt(a.forskjell) + "</span></div>").join("") + "</div>" +
      '<p class="mu-intro">Vil du høre ekte stemmer fra hele verden? Se landsidene: <a href="land.html">The English-speaking world</a>.</p></section>';

    // Opptak
    h += '<section class="le-del" id="opptak"><h2>🎙️ Ta opp deg selv</h2><p class="mu-intro">Les et ord eller en setning høyt, ta det opp, og hør på deg selv. Sammenlign med 🔊. <strong>Opptaket lagres ikke</strong> – det forsvinner når du lukker eller laster siden på nytt.</p>' +
      '<label class="mu-notat"><span>Hva vil du øve på?</span><textarea id="ut-tekst" rows="2" lang="en">I think three thousand thin things went through the window on Wednesday.</textarea></label>' +
      '<div class="mu-knapper"><button class="knapp" type="button" id="ut-hor">🔊 Hør setningen</button><button class="knapp hoved" type="button" id="ut-ta">⏺ Ta opp</button><button class="knapp" type="button" id="ut-stopp" hidden>⏹ Stopp</button><span class="status" id="ut-status" role="status"></span></div><audio id="ut-lyd" controls hidden></audio></section>';

    $("innhold").innerHTML = h;
    kobleAksent(); kobleQuiz(); kobleTrykk(); kobleOpptak();
    document.addEventListener("click", e => { const b = e.target.closest(".ut-les"); if (b) les(b.dataset.les); });
  }

  function kobleAksent() {
    const fyll = () => {
      const liste = LV.tilgjengeligeAksenter();
      const sel = $("ut-aksent");
      sel.innerHTML = (liste.length ? liste : [["en-GB", "British English"]]).map(([k, n]) => '<option value="' + k + '"' + (k === aksent ? " selected" : "") + ">" + n + "</option>").join("");
      $("ut-info").textContent = !kanLese ? "Nettleseren din kan ikke lese opp tekst." : liste.length < 2 ? "Nettleseren din har bare én engelsk stemme. Prøv Chrome eller Edge for flere aksenter." : "";
      document.querySelectorAll(".ut-aksentknapper").forEach((el, i) => {
        const a = LV.uttale.aksentord[i];
        el.innerHTML = liste.filter(([k]) => k === "en-GB" || k === "en-US").map(([k, n]) => '<button type="button" class="knapp liten ut-aksentles" data-k="' + k + '" data-t="' + esc(a.tekst) + '">' + (k === "en-GB" ? "🇬🇧" : "🇺🇸") + " " + n.split(" ")[0] + "</button>").join("");
      });
    };
    fyll();
    if (kanLese) speechSynthesis.addEventListener("voiceschanged", fyll);
    $("ut-aksent").addEventListener("change", e => { aksent = e.target.value; });
    document.addEventListener("click", e => { const b = e.target.closest(".ut-aksentles"); if (b) { speechSynthesis.cancel(); LV.lesEngelsk(b.dataset.t, b.dataset.k, 0.9); } });
  }

  function kobleQuiz() {
    document.querySelectorAll(".ut-quiz").forEach(q => {
      const l = LV.uttale.lyder.find(x => x.id === q.dataset.lyd);
      let par = null, riktig = null, poeng = 0, antall = 0;
      const ny = () => {
        par = l.par[Math.floor(Math.random() * l.par.length)]; riktig = par[Math.floor(Math.random() * 2)];
        const sv = q.querySelector(".ut-svar"); sv.hidden = false;
        sv.querySelector(".ut-valg").innerHTML = par.map(o => '<button type="button" class="knapp liten ut-velg" lang="en">' + esc(o) + "</button>").join("") + '<button type="button" class="knapp liten ut-igjen">🔁 Hør igjen</button>';
        sv.querySelector(".ut-tilbake").textContent = "";
        les(riktig, 0.8);
      };
      q.querySelector(".ut-spill").addEventListener("click", ny);
      q.addEventListener("click", e => {
        if (e.target.closest(".ut-igjen")) { les(riktig, 0.75); return; }
        const b = e.target.closest(".ut-velg"); if (!b || !riktig) return;
        antall++; const ok = b.textContent === riktig; if (ok) poeng++;
        q.querySelector(".ut-tilbake").innerHTML = ok ? "✔ Riktig! Det var <em lang=\"en\">" + esc(riktig) + "</em>." : "✘ Det var <em lang=\"en\">" + esc(riktig) + "</em>. Lytt en gang til.";
        q.querySelector(".ut-poeng").textContent = poeng + " av " + antall + " riktige";
        q.querySelectorAll(".ut-velg").forEach(k => { k.disabled = true; if (k.textContent === riktig) k.classList.add("riktig-svar"); });
        q.querySelector(".ut-spill").textContent = "▶ Nytt ord";
        riktig = null;
      });
    });
  }

  function kobleTrykk() {
    document.querySelectorAll(".ut-trykkliste > li").forEach(li => {
      const t = LV.uttale.trykk[+li.dataset.i];
      li.querySelectorAll(".ut-stavelse").forEach(b => b.addEventListener("click", () => {
        const ok = +b.dataset.j === t.trykk;
        li.querySelectorAll(".ut-stavelse").forEach((k, j) => { k.classList.toggle("ut-trykket", j === t.trykk); k.classList.toggle("ut-feil", j === +b.dataset.j && !ok); });
        li.querySelector(".ut-trykksvar").textContent = ok ? "✔" : "✘ Trykket ligger på «" + t.stavelser[t.trykk] + "»";
        les(t.ord, 0.8);
      }));
    });
  }

  function kobleOpptak() {
    $("ut-hor").addEventListener("click", () => les($("ut-tekst").value, 0.85));
    const kan = navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder;
    if (!kan) { $("ut-ta").disabled = true; $("ut-status").textContent = "Nettleseren din kan ikke ta opp lyd her."; return; }
    let opptaker = null, biter = [], url = null;
    $("ut-ta").addEventListener("click", async () => {
      try {
        const strom = await navigator.mediaDevices.getUserMedia({ audio: true });
        biter = []; opptaker = new MediaRecorder(strom);
        opptaker.ondataavailable = e => biter.push(e.data);
        opptaker.onstop = () => {
          strom.getTracks().forEach(t => t.stop());
          if (url) URL.revokeObjectURL(url);
          url = URL.createObjectURL(new Blob(biter, { type: opptaker.mimeType || "audio/webm" }));
          $("ut-lyd").src = url; $("ut-lyd").hidden = false;
          $("ut-status").textContent = "Hør på opptaket ditt. Det lagres ikke.";
        };
        opptaker.start();
        $("ut-ta").hidden = true; $("ut-stopp").hidden = false; $("ut-status").textContent = "⏺ Tar opp … Les høyt nå.";
      } catch (e) { $("ut-status").textContent = "Fikk ikke tilgang til mikrofonen. Sjekk innstillingene i nettleseren."; }
    });
    $("ut-stopp").addEventListener("click", () => { if (opptaker && opptaker.state !== "inactive") opptaker.stop(); $("ut-ta").hidden = false; $("ut-stopp").hidden = true; });
    window.addEventListener("pagehide", () => { if (url) URL.revokeObjectURL(url); });
  }

  document.addEventListener("DOMContentLoaded", bygg);
})();
