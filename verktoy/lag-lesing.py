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
    "whitewasher": ("mark-twain_the-adventures-of-tom-sawyer", "chapter-2", None),
    "rikki-tikki-tavi": ("rudyard-kipling_the-jungle-book", "rikki-tikki-tavi", None),
    "speckled-band": ("arthur-conan-doyle_the-adventures-of-sherlock-holmes", "the-adventure-of-the-speckled-band", None),
    "christmas-carol": ("charles-dickens_a-christmas-carol", "chapter-1", None),
    "to-build-a-fire": ("jack-london_lost-face", "to-build-a-fire", None),
    "araby": ("james-joyce_dubliners", "araby", None),
    "model-millionaire": ("oscar-wilde_lord-arthur-saviles-crime-and-other-stories", "the-model-millionaire", None),
    # Taler og sakprosa. ("txt", [(fil, fra-linje, til-linje), …]) henter fra Project Gutenberg-tekst (GITenberg på GitHub).
    "gettysburg": ("txt", [("gettysburg/4-0.txt", r"^Four score", r"perish from this earth")], None),
    "fourth-of-july": ("txt", [("bondage/202-0.txt", r"^Fellow-Citizens--Pardon me", r"What to the American slave is your Fourth of July")], None),
    "votes-for-women": ("txt", [("pankhurst/34856.txt", r"^It was in October, 1903", r"Deeds, not words, was to be our permanent motto"),
                                ("pankhurst/34856.txt", r"^The Women's Social and Political Union had been in existence two years", r"have to be fought until they were conquered")], None),
    "nellie-bly": ("txt", [("bly/59899-0.txt", r"^On the 22d of September I was asked", r"not soon forget\.$"),
                           ("bly/59899-0.txt", r"^A few more songs and we were told to go with Miss Grupe", r"^tale of horror never equaled")], None),
    "atlanta-address": ("booker-t-washington_up-from-slavery", "chapter-14", {"fra": r"^Mr\. President and Gentlemen", "til": r"^In conclusion"}),
}
# Kloner: git clone https://github.com/GITenberg/Gettysburg-Address_4 gettysburg ·
#   …/My-Bondage-and-My-Freedom_202 bondage · …/My-Own-Story_34856 pankhurst ·
#   …/Ten-Days-in-a-Mad-House-or-Nellie-Bly-s-Experience-on-Blackwell-s-Island-Feigning-Insanity-in__59899 bly

# Redaksjonelle endringer i originalteksten (vises i [klammer] og forklares i lærerdelen)
ERSTATT = {
    "to-build-a-fire": [("a wide flat of nigger-heads", "a wide flat of [tussocks]")],
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


VERSLISTE = []


def vers(blokk):
    """Et dikt eller en sang (<blockquote>) blir {"vers": "linje\nlinje\n\nny strofe"} – med ev. tittel først."""
    ut = []
    if "<br" not in blokk:  # et sitert brev, en tale e.l. – vanlige avsnitt
        ut = []
        for attr, p in re.findall(r"<p([^>]*)>(.*?)</p>", blokk, re.S):
            v = re.search(r'data-vers="(\d+)"', attr)
            if v:
                ut.extend(VERSLISTE[int(v.group(1))])
            elif ren(p):
                ut.append({"h": ren(p)} if "<header" in blokk and blokk.index(p) < blokk.find("</header>") else ren(p))
        return ut
    hode = re.search(r"<header[^>]*>(.*?)</header>", blokk, re.S)
    if hode:
        titler = [ren(t) for t in re.findall(r"<p[^>]*>(.*?)</p>", hode.group(1), re.S)]
        ut.append({"h": " ".join(t for t in titler if t)})
        blokk = blokk.replace(hode.group(0), "")
    strofer = []
    for p in re.findall(r"<p[^>]*>(.*?)</p>", blokk, re.S):
        linjer = [ren(x) for x in re.findall(r"<span[^>]*>(.*?)</span>", p, re.S)] or [ren(p)]
        strofer.append("\n".join(l for l in linjer if l))
    ut.append({"vers": "\n\n".join(strofer)})
    return ut


def les_txt(fil, fra, til):
    """Ren tekst fra Project Gutenberg (via GITenberg): avsnitt skilles med blanke linjer."""
    linjer = open(os.path.join(KILDEMAPPE, fil), encoding="utf-8-sig", errors="replace").read().replace("\r", "").split("\n")
    start = next(i for i, l in enumerate(linjer) if re.search(fra, l))
    slutt = next(i for i, l in enumerate(linjer) if i > start and re.search(til, l))
    while slutt + 1 < len(linjer) and linjer[slutt + 1].strip():  # ta med resten av avsnittet
        slutt += 1
    ut, buf = [], []
    for l in linjer[start:slutt + 1] + [""]:
        if l.strip():
            buf.append(l.strip())
        elif buf:
            t = " ".join(buf)
            buf = []
            t = re.sub(r"\[Illustration[^\]]*\]", "", t)
            t = re.sub(r"_(.+?)_", r"*\1*", t).replace("--", "—")
            t = re.sub(r"\s*\.\s?\.\s?\.\s*", "—", t)
            t = re.sub(r"\s*\{\d+\}", "", t)
            t = re.sub(r"\s+", " ", t).strip()
            if t:
                ut.append(t)
    # Avsnitt som slutter midt i (til-linjen) beholdes helt
    return ut


def utsnitt(tekst, fra=None, til=None):
    tekststr = lambda p: p if isinstance(p, str) else p.get("h", p.get("vers", ""))
    a = next(i for i, p in enumerate(tekst) if re.search(fra, tekststr(p))) if fra else 0
    b = next(i for i, p in enumerate(tekst) if i >= a and re.search(til, tekststr(p))) if til else len(tekst) - 1
    return tekst[a:b + 1]


def les(repo, fil, maks):
    x = open(os.path.join(KILDEMAPPE, repo, "src", "epub", "text", fil + ".xhtml"), encoding="utf8").read()
    body = x.split("<body", 1)[1]
    # Overskriftsgrupper (f.eks. «Stave I» + «Marley’s Ghost») blir én mellomtittel
    def gruppe(m):
        deler = [ren(t) for (tag, attr, t) in re.findall(r"<(h\d|p)([^>]*)>(.*?)</\1>", m.group(1), re.S) if not (tag == "h2" and 'epub:type="title"' in attr)]
        return "<h6>" + ". ".join(t for t in deler if t) + "</h6>"
    body = re.sub(r"<hgroup>(.*?)</hgroup>", gruppe, body, flags=re.S)
    # Dikt og sanger
    VERSLISTE.clear()
    versliste = VERSLISTE
    def lagre(m):
        versliste.append(vers(m.group(0)))
        return '<p data-vers="%d">x</p>' % (len(versliste) - 1)
    # innerste blokk først (et dikt inne i en tale)
    while True:
        ny = re.sub(r"<blockquote[^>]*>(?:(?!<blockquote).)*?</blockquote>", lagre, body, count=1, flags=re.S)
        if ny == body:
            break
        body = ny
    ut, sek = [], 0
    for m in re.finditer(r'<section[^>]*epub:type="chapter"|<p(?![^>]*epub:type="title")([^>]*)>(.*?)</p>|<h[3456][^>]*>(.*?)</h[3456]>', body, re.S):
        if m.group(0).startswith("<section"):
            sek += 1
            if maks and sek > maks:
                break
            continue
        if m.group(3) is not None:
            ut.append({"h": ren(m.group(3))})
            continue
        attr = m.group(1) or ""
        v = re.search(r'data-vers="(\d+)"', attr)
        if v:
            ut.extend(versliste[int(v.group(1))])
        elif "subtitle" in attr:
            ut.append({"h": ren(m.group(2))})
        else:
            t = ren(m.group(2))
            if t:
                ut.append(t)
    return ut


def hent(id_):
    repo, fil, maks = KILDER[id_]
    if repo == "txt":
        tekst = []
        for (f, fra, til) in fil:
            if tekst:
                tekst.append({"h": "[…]"})
            tekst += les_txt(f, fra, til)
    else:
        tekst = les(repo, fil, maks if isinstance(maks, int) else None)
        if isinstance(maks, dict):
            tekst = utsnitt(tekst, maks.get("fra"), maks.get("til"))
    for fra, til in ERSTATT.get(id_, []):
        tekst = [p.replace(fra, til) if isinstance(p, str) else p for p in tekst]
    return tekst


if __name__ != "__main__":
    raise SystemExit  # brukt som modul: stopp her

feil = 0
for id_, (repo, fil, maks) in KILDER.items():
    sti = os.path.join(ROT, "data", "lesing", id_ + ".js")
    if not os.path.exists(sti):
        print("  (hopper over %s – ingen datafil ennå)" % id_); continue
    tekst = hent(id_)
    hel = " ".join(p if isinstance(p, str) else p.get("vers", "") for p in tekst).lower().replace("’", "'")
    data = open(sti, encoding="utf8").read().split(MERKE)[0].rstrip() + "\n"
    # Kontroll: ordlista
    for o in re.findall(r'^\s*\["([^"]+)",', data, re.M):
        if o.lower().replace("’", "'") not in hel:
            print("  ! %s: «%s» finnes ikke i teksten" % (id_, o)); feil += 1
    for n in re.findall(r"^\s*(\d+): \"", data, re.M):
        if int(n) >= len(tekst):
            print("  ! %s: stopp etter avsnitt %s finnes ikke" % (id_, n)); feil += 1
    data += "\n" + MERKE + "\nLV.lesetekst.tekst = " + json.dumps(tekst, ensure_ascii=False, indent=0) + ";\n"
    open(sti, "w", encoding="utf8").write(data)
    print("%-20s %3d avsnitt %5d ord" % (id_, len(tekst), len(hel.split())))
sys.exit(1 if feil else 0)
