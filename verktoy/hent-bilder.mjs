// Les verden – laster ned temabildene fra Unsplash og legger dem i assets/bilder/,
// slik at elevenes nettlesere ikke trenger å kontakte Unsplash.
// Bytter samtidig lenkene i datafilene til de lokale filene.
// Kjøres av GitHub-jobben «Hent bilder lokalt» (.github/workflows/hent-bilder.yml),
// eller lokalt med: node verktoy/hent-bilder.mjs
//
// Hvis et bilde ikke kan hentes (for eksempel fordi fotografen har fjernet det),
// beholdes Unsplash-lenken, og bildet nevnes i oppsummeringen. Jobben feiler ikke
// av den grunn – bildene som ble hentet, blir likevel lagret.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FILER = ["data/temaer/oversikt.js", "data/land/oversikt.js"];
const MAPPE = path.join(ROT, "assets/bilder");
fs.mkdirSync(MAPPE, { recursive: true });

const vent = ms => new Promise(r => setTimeout(r, ms));
async function hent(url) {
  // Prøv lenken slik den står, og deretter en enklere variant uten ekstra parametre
  const id = (url.match(/\/(photo-[A-Za-z0-9-]+)/) || [])[1];
  const forsok = [url];
  if (id) forsok.push("https://images.unsplash.com/" + id + "?w=1200&q=80&fm=jpg");
  let sist = "";
  for (const u of forsok) {
    for (let gang = 0; gang < 2; gang++) {
      try {
        const svar = await fetch(u, { headers: { "User-Agent": "les-verden-bildehenter/1.0 (GitHub Actions)", "Accept": "image/*" } });
        if (svar.ok) {
          const buf = Buffer.from(await svar.arrayBuffer());
          if (buf.length > 1000) return buf;
          sist = "for liten fil (" + buf.length + " byte)";
        } else sist = "HTTP " + svar.status;
        if (svar.status === 404) break; // finnes ikke – ingen vits å prøve igjen
      } catch (e) { sist = e.message; }
      await vent(1500);
    }
  }
  throw new Error(sist || "ukjent feil");
}

const ok = [], feil = [];
for (const fil of FILER) {
  const full = path.join(ROT, fil);
  if (!fs.existsSync(full)) continue;
  let tekst = fs.readFileSync(full, "utf8");
  const lenker = [...new Set(tekst.match(/https:\/\/images\.unsplash\.com\/[^"'\s]+/g) || [])];
  for (const url of lenker) {
    const id = (url.match(/\/(photo-[A-Za-z0-9-]+|[A-Za-z0-9_-]{6,})(?=\?|$)/) || [])[1] || ("bilde-" + ok.length);
    const navn = "unsplash-" + id.replace(/^photo-/, "") + ".jpg";
    const mal = path.join(MAPPE, navn);
    try {
      if (!fs.existsSync(mal)) fs.writeFileSync(mal, await hent(url));
      tekst = tekst.split(url).join("assets/bilder/" + navn);
      ok.push(navn);
      console.log("OK  ", navn);
    } catch (e) {
      feil.push([fil, url, e.message]);
      console.log("::warning title=Bilde ble ikke hentet::" + fil + ": " + url + " (" + e.message + ")");
    }
  }
  fs.writeFileSync(full, tekst);
}
const oppsummering = "Ferdig: " + ok.length + " bilder lagt lokalt, " + feil.length + " kunne ikke hentes.";
console.log("\n" + oppsummering);
if (process.env.GITHUB_STEP_SUMMARY) {
  let md = "## Hent bilder lokalt\n\n" + oppsummering + "\n";
  if (feil.length) md += "\nDisse bildene beholder Unsplash-lenken. Bytt dem gjerne ut med et annet bilde i datafilen:\n\n" + feil.map(([f, u, m]) => "- `" + f + "`: " + u + " – " + m).join("\n") + "\n";
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, md);
}
