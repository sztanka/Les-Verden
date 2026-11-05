// Les verden – laster ned temabildene fra Unsplash og legger dem i assets/bilder/,
// slik at elevenes nettlesere ikke trenger å kontakte Unsplash.
// Bytter samtidig lenkene i datafilene til de lokale filene.
// Kjøres av GitHub-jobben «Hent bilder lokalt» (.github/workflows/hent-bilder.yml),
// eller lokalt med: node verktoy/hent-bilder.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FILER = ["data/temaer/oversikt.js", "data/land/oversikt.js"];
const MAPPE = path.join(ROT, "assets/bilder");
fs.mkdirSync(MAPPE, { recursive: true });

let hentet = 0, feil = 0;
for (const fil of FILER) {
  const full = path.join(ROT, fil);
  let tekst = fs.readFileSync(full, "utf8");
  const lenker = [...new Set(tekst.match(/https:\/\/images\.unsplash\.com\/[^"'\s]+/g) || [])];
  for (const url of lenker) {
    const id = (url.match(/\/(photo-[A-Za-z0-9-]+|[A-Za-z0-9_-]{6,})(?=\?|$)/) || [])[1] || ("bilde-" + hentet);
    const navn = "unsplash-" + id.replace(/^photo-/, "") + ".jpg";
    const mal = path.join(MAPPE, navn);
    try {
      if (!fs.existsSync(mal)) {
        const svar = await fetch(url);
        if (!svar.ok) throw new Error("HTTP " + svar.status);
        fs.writeFileSync(mal, Buffer.from(await svar.arrayBuffer()));
      }
      tekst = tekst.split(url).join("assets/bilder/" + navn);
      hentet++;
      console.log("OK  ", navn);
    } catch (e) {
      feil++;
      console.log("FEIL", url, e.message);
    }
  }
  fs.writeFileSync(full, tekst);
}
console.log("\nFerdig: " + hentet + " bilder lagt lokalt, " + feil + " feil.");
if (feil) process.exitCode = 1;
