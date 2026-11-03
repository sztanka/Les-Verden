#!/usr/bin/env python3
"""
Les verden – henter originaltekstene til Reading Room fra Standard Ebooks.

Standard Ebooks (https://standardebooks.org) gir ut korrekturleste utgaver av
tekster i det fri (public domain). Deres eget arbeid er frigitt med CC0.
Vi bruker bare tekster der forfatteren døde for mer enn 70 år siden.

Bruk:
  cd verktoy && mkdir -p kilder && cd kilder
  git clone --depth 1 https://github.com/standardebooks/<repo>   (se KILDER under)
  cd ../.. && python3 verktoy/lag-lesing.py

Skriptet legger originalteksten nederst i data/lesing/<id>.js (etter merket under).
Alt over merket (ordliste, oppgaver osv.) er skrevet for hånd og blir ikke endret.
Skriptet sjekker også at alle ordene i ordlista finnes i teksten.
"""
import re, json, html, os, sys

KILDER = {
    # id: (Standard Ebooks-repo, fil, antall deler som tas med / None = alt)
    "open-window": ("saki_short-fiction", "the-open-window", None),
    "after-twenty-years": ("o-henry_short-fiction", "after-twenty-years", None),
    "gift-of-the-magi": ("o-henry_short-fiction", "the-gift-of-the-magi", None),
    "monkeys-paw": ("w-w-jacobs_the-lady-of-the-barge", "the-monkeys-paw", None),
    "tell-tale-heart": ("edgar-allan-poe_short-fiction", "the-telltale-heart", None),
    "douglass": ("frederick-douglass_narrative-of-the-life-of-frederick-douglass", "chapter-7", None),
    "zitkala-sa": ("zitkala-sa_american-indian-stories", "the-school-days-of-an-indian-girl", 2),
}
MERKE = "// --- Originaltekst: generert av verktoy/lag-lesing.py fra Standard Ebooks. Ikke rediger for hånd. ---"
ROT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KILDEMAPPE = os.environ.get("KILDER", os.path.join(ROT, "verktoy", "kilder"))


def ren(s):
    s = re.sub(r"<(i|em)\b[^>]*>(.*?)</\1>", r"*\2*", s, flags=re.S)
    s = re.sub(r"<br\s*/?>", " / ", s)
    s = re.sub(r"<[^>]+>", "", s)
    s = html.unescape(s).replace("⁠", "").replace(" ", " ")
    return re.sub(r"\s+", " ", s).strip()


def les(repo, fil, maks):
    x = open(os.path.join(KILDEMAPPE, repo, "src", "epub", "text", fil + ".xhtml"), encoding="utf8").read()
    body = x.split("<body", 1)[1]
    ut, sek = [], 0
    for m in re.finditer(r'<section[^>]*epub:type="chapter"|<h3[^>]*>(.*?)</h3>\s*<p epub:type="title">(.*?)</p>|<p(?![^>]*epub:type="title")[^>]*>(.*?)</p>|<h[356][^>]*>(.*?)</h[356]>', body, re.S):
        if m.group(0).startswith("<section"):
            sek += 1
            if maks and sek > maks:
                break
            continue
        if m.group(1):
            ut.append({"h": ren(m.group(1)) + ". " + ren(m.group(2))})
        elif m.group(3) is not None:
            t = ren(m.group(3))
            if t:
                ut.append(t)
        elif m.group(4):
            ut.append({"h": ren(m.group(4))})
    return ut


feil = 0
for id_, (repo, fil, maks) in KILDER.items():
    sti = os.path.join(ROT, "data", "lesing", id_ + ".js")
    tekst = les(repo, fil, maks)
    hel = " ".join(p for p in tekst if isinstance(p, str)).lower()
    data = open(sti, encoding="utf8").read().split(MERKE)[0].rstrip() + "\n"
    # Kontroll: ordlista
    for o in re.findall(r'^\s*\["([^"]+)",', data, re.M):
        if o.lower() not in hel:
            print("  ! %s: «%s» finnes ikke i teksten" % (id_, o)); feil += 1
    for n in re.findall(r"^\s*(\d+): \"", data, re.M):
        if int(n) >= len(tekst):
            print("  ! %s: stopp etter avsnitt %s finnes ikke" % (id_, n)); feil += 1
    data += "\n" + MERKE + "\nLV.lesetekst.tekst = " + json.dumps(tekst, ensure_ascii=False, indent=0) + ";\n"
    open(sti, "w", encoding="utf8").write(data)
    print("%-20s %3d avsnitt %5d ord" % (id_, len(tekst), len(hel.split())))
sys.exit(1 if feil else 0)
