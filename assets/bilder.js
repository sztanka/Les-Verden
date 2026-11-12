/* =========================================================
   Les verden – bilder inne i tekstene (data/bilder.js)
   LV.bildeFigurer("tema:<id>:<avsnittstittel>", "nb"|"en") → HTML
   Flere bilder på samme sted vises side om side.
   ========================================================= */
window.LV = window.LV || {};
LV.bildeFigurer = function (sted, sprak) {
  const B = (window.LV.bilder || []).filter(b => (b.steder || []).includes(sted));
  if (!B.length) return "";
  const esc = window.LV.esc, en = sprak === "en";
  const fig = b => {
    const lis = (window.LV.lisenser || {})[b.lisens] || [b.lisens, ""];
    const kilde = b.kilde || "https://commons.wikimedia.org/w/index.php?search=" + encodeURIComponent(b.sok || b.id) + "&title=Special:MediaSearch&type=image";
    const tekst = (en ? b.en : b.nb) || b.nb || b.en || "";
    return '<figure class="tekstbilde"><a class="tb-bilde" href="' + esc("assets/bilder/commons/" + b.fil) + '" target="_blank" rel="noopener"><img src="' + esc("assets/bilder/commons/" + b.fil) + '" alt="' + esc(b.alt || "") + '" loading="lazy"></a>' +
      "<figcaption" + (en ? ' lang="en"' : "") + '><span class="tb-tekst">' + esc(tekst) + '</span> <span class="tb-kreditt" lang="nb">' + esc(b.kreditt) + ", " +
      (lis[1] ? '<a href="' + esc(lis[1]) + '" target="_blank" rel="noopener">' + esc(lis[0]) + "</a>" : esc(lis[0])) +
      ', via <a href="' + esc(kilde) + '" target="_blank" rel="noopener">Wikimedia Commons</a></span></figcaption></figure>';
  };
  return '<div class="tekstbilder' + (B.length > 1 ? " flere" : "") + '">' + B.map(fig).join("") + "</div>";
};
