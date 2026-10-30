#!/usr/bin/env python3
"""
Lager ordboka på nettstedet (data/ordbok/) fra to åpne kilder:

1. Bokmålsordboka (Universitetet i Bergen og Språkrådet), CC BY 4.0
   verktoy/kilder/bokmalsordboka-articles.json.gz  (artiklene i UiB-formatet)
   verktoy/kilder/bokmalsordboka-concepts.json      (forklaring av forkortelser)
   Hentes f.eks. fra pakken «ordb» på PyPI (mappen db/ i kildekoden):
       pip download ordb --no-deps --no-binary :all:
   eller direkte fra https://ord.uib.no/ (se ordbokene.no/eng/about/open-data).

2. Norsk (bokmål)–engelsk ordbok fra Wiktionary (via kaikki.org / wiktextract),
   CC BY-SA 3.0 / GFDL:
   verktoy/kilder/wiktionary-nb-en.tsv
   Hentes fra https://github.com/Vuizur/Wiktionary-Dictionaries
   (fila «Norwegian Bokmål-English Wiktionary dictionary.tsv»).

3. Engelsk–norsk ordbok fra FreeDict/WikDict (også fra Wiktionary), CC BY-SA 3.0:
   verktoy/kilder/freedict-eng-nor.index og freedict-eng-nor.dict.dz
   Hentes fra Debian/Ubuntu-pakken dict-freedict-eng-nor (mappen usr/share/dictd/),
   eller fra https://freedict.org/downloads/

Kjør:  python3 verktoy/lag-ordbok.py
Resultatet er mange små .js-filer i data/ordbok/ som lastes ved behov,
så ordboka virker både på GitHub Pages og når filene åpnes lokalt.
"""
import gzip, html, json, os, re, shutil, sys
from collections import defaultdict

ROT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KILDER = os.path.join(ROT, "verktoy", "kilder")
UT = os.path.join(ROT, "data", "ordbok")
MAKS_DEL = 120_000  # byte per fil før den deles videre

# ---------------------------------------------------------------
# Bokmålsordboka
# ---------------------------------------------------------------
konsepter = json.load(open(os.path.join(KILDER, "bokmalsordboka-concepts.json"), encoding="utf-8"))["concepts"]

def utvid(id_):
    k = konsepter.get(id_)
    if k and k.get("expansion"):
        return k["expansion"]
    return id_.replace("_", " ")

def fyll(innhold, items):
    """Bytt ut $ i teksten med innholdet i items."""
    deler = (innhold or "").split("$")
    ut = deler[0]
    for i, rest in enumerate(deler[1:]):
        it = items[i] if i < len(items) else {}
        t = ""
        if isinstance(it, dict):
            typ = it.get("type_")
            if typ == "article_ref":
                t = it.get("word_form") or ", ".join(l.get("lemma", "") for l in it.get("lemmas", []))
            elif typ in ("usage", "superscript", "subscript"):
                t = str(it.get("text", ""))
            elif typ == "fraction":
                t = "%s/%s" % (it.get("numerator"), it.get("denominator"))
            elif typ == "quote_inset":
                t = fyll(it.get("content", ""), it.get("items", []))
            elif "id" in it:
                t = utvid(it["id"])
            else:
                t = str(it.get("text", ""))
        ut += t + rest
    ut = re.sub(r"\s+", " ", ut).strip()
    ut = re.sub(r"\s+([,.;:)])", r"\1", ut).replace("( ", "(")
    return ut

def betydninger(defs, sanser, eksempler):
    """Gå gjennom definisjonstreet og samle betydninger og eksempler."""
    for d in defs:
        if not isinstance(d, dict):
            continue
        if d.get("type_") != "definition":
            continue
        forkl, eks, under = [], [], []
        for el in d.get("elements", []):
            t = el.get("type_")
            if t == "explanation":
                s = fyll(el.get("content", ""), el.get("items", []))
                if s:
                    forkl.append(s)
            elif t == "example":
                q = el.get("quote") or {}
                s = fyll(q.get("content", ""), q.get("items", []))
                if s:
                    eks.append(s)
            elif t == "definition":
                under.append(el)
        if forkl:
            sanser.append("; ".join(forkl))
        eksempler.extend(eks)
        betydninger(under, sanser, eksempler)

KLASSE = {"NOUN": "substantiv", "VERB": "verb", "ADJ": "adjektiv", "ADV": "adverb", "PRON": "pronomen",
          "ADP": "preposisjon", "CCONJ": "konjunksjon", "SCONJ": "subjunksjon", "INTJ": "interjeksjon",
          "DET": "determinativ", "NUM": "tallord", "PROPN": "egennavn", "SYM": "symbol", "ABBR": "forkortelse"}
KJONN = {"Masc": "en", "Fem": "ei/en", "Neuter": "et"}

def kort(s, n):
    if len(s) <= n:
        return s
    s = s[:n]
    return s[: s.rfind(" ")] + " …" if " " in s else s + "…"

def les_bm():
    data = json.load(gzip.open(os.path.join(KILDER, "bokmalsordboka-articles.json.gz"), "rt", encoding="utf-8"))
    oppslag = defaultdict(list)   # lemma -> [artikler]
    former = defaultdict(set)     # bøyningsform (små bokstaver) -> {lemma}
    for a in data.values():
        if not a.get("lemmas"):
            continue
        l0 = a["lemmas"][0]
        lemma = l0["lemma"]
        tags = []
        for p in l0.get("paradigm_info", []):
            tags = p.get("tags", [])
            break
        if "EXPR" in tags or " " in lemma:
            continue  # faste uttrykk tas ikke med
        sanser, eks = [], []
        betydninger(a["body"].get("definitions", []), sanser, eks)
        sanser = [s for s in sanser if s and not s.startswith(("Se:", "se "))]
        if not sanser:
            continue
        klasse = KLASSE.get(tags[0], "") if tags else ""
        kjonn = " / ".join(dict.fromkeys(KJONN[t] for p in l0.get("paradigm_info", []) for t in p.get("tags", []) if t in KJONN))
        # bøyning: formene fra første paradigme
        boy = []
        for p in l0.get("paradigm_info", [])[:1]:
            for inf in p.get("inflection", []):
                f = inf.get("word_form")
                if f and f != lemma and f not in boy and "-" not in f:
                    boy.append(f)
        for l in a["lemmas"]:
            for p in l.get("paradigm_info", []):
                for inf in p.get("inflection", []):
                    f = inf.get("word_form")
                    if f:
                        former[f.lower()].add(lemma)
            if l["lemma"] != lemma:
                former[l["lemma"].lower()].add(lemma)
        art = [klasse, kjonn, [kort(s, 220) for s in sanser[:5]], [kort(e, 90) for e in eks[:3]], ", ".join(boy[:6])]
        if len(sanser) > 5:
            art.append(len(sanser) - 5)  # antall betydninger som ikke er tatt med
        oppslag[lemma].append(art)
    # Flere artikler med samme oppslagsord (homonymer): vis den fyldigste først,
    # den er som regel den vanligste betydningen (bank = pengeinstitusjon, ikke «juling»)
    for lemma, arts in oppslag.items():
        arts.sort(key=lambda a: -(len(a[2]) * 3 + (a[5] if len(a) > 5 else 0) * 3 + len(a[3])))
    return oppslag, former

# ---------------------------------------------------------------
# Wiktionary norsk–engelsk
# ---------------------------------------------------------------
HOPP_OVER = re.compile(r"\b(form removed|letter-case form|alternative form|alternative spelling|plural of|inflection of|"
                       r"definite (singular|plural)|indefinite (singular|plural)|past tense of|past participle|present tense|"
                       r"imperative of|passive (infinitive|form)|simple past|present perfect|superlative|comparative|"
                       r"feminine of|masculine of|neuter of|obsolete spelling|misspelling|synonym of|clipping of|"
                       r"abbreviation of|initialism of)\b", re.I)
STED = re.compile(r"^(A|An|The)( former| island| large| small)? (municipality|town|village|city|county|district|river|lake|island|fjord|surname|male given name|female given name|unisex given name)\b", re.I)

def les_wikt():
    oppslag = defaultdict(list)   # lemma -> [[ordklasse, [forklaringer]]]
    former = defaultdict(set)
    for linje in open(os.path.join(KILDER, "wiktionary-nb-en.tsv"), encoding="utf-8"):
        if "\t" not in linje:
            continue
        hode, kropp = linje.rstrip("\n").split("\t", 1)
        fl = hode.split("|")
        lemma = fl[0]
        blokker = re.findall(r"<i>(.*?)</i><br><ol>(.*?)</ol>", kropp)
        for pos, ol in blokker:
            glosser = []
            for li in re.findall(r"<li>(.*?)</li>", ol):
                g = html.unescape(re.sub(r"<[^>]+>", "", li)).strip()
                if not g or HOPP_OVER.search(g) or STED.search(g):
                    continue
                glosser.append(kort(g, 140))
            if glosser:
                oppslag[lemma].append([pos, glosser[:5]])
        if lemma in oppslag:
            for f in fl:
                former[f.lower()].add(lemma)
    return oppslag, former

# ---------------------------------------------------------------
# FreeDict engelsk -> norsk
# ---------------------------------------------------------------
B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
def b64(t):
    n = 0
    for c in t:
        n = n * 64 + B64.index(c)
    return n

def les_freedict():
    sti = os.path.join(KILDER, "freedict-eng-nor.dict.dz")
    if not os.path.exists(sti):
        print("   (fant ikke FreeDict – hopper over)")
        return {}
    tekst = gzip.open(sti).read()
    ut = defaultdict(list)  # engelsk ord -> [(norsk, hint)]
    for linje in open(os.path.join(KILDER, "freedict-eng-nor.index"), encoding="utf-8"):
        ord_, off, lengde = linje.rstrip("\n").split("\t")
        if ord_.startswith("00database"):
            continue
        bit = tekst[b64(off): b64(off) + b64(lengde)].decode("utf-8").split("\n")
        hode = bit[0]
        m = re.search(r"<([^>]+)>\s*$", hode)
        pos = m.group(1) if m else ""
        linjer = [l for l in bit[1:] if l.strip()]
        i = 0
        while i < len(linjer):
            ov = re.sub(r"^\s*\d+\.\s*", "", linjer[i])
            ov = re.sub(r"\s+\d+\.\s*$", "", ov).strip()
            hint = linjer[i + 1].strip() if i + 1 < len(linjer) and not re.match(r"^\s*\d+\.", linjer[i + 1]) else ""
            if hint and re.search(r"\s\d+\.\s*$", linjer[i + 1]):
                hint = ""
            if ov:
                for no in [x.strip() for x in ov.split(",") if x.strip()]:
                    ut[ord_.lower()].append((no, pos, ""))
            i += 2 if hint or (i + 1 < len(linjer) and not re.match(r"^\s*\d+\.", linjer[i + 1]) and not ov) else 1
    return ut

# ---------------------------------------------------------------
# Engelsk -> norsk (FreeDict + snudd fra Wiktionary-forklaringene)
# ---------------------------------------------------------------
def snu(wikt, bm, fd):
    ut = defaultdict(dict)  # engelsk -> {norsk lemma: (poeng, ordklasse, hint)}
    for en, liste in fd.items():
        for i, (no, pos, hint) in enumerate(liste):
            if no not in ut[en]:
                ut[en][no] = (i - 2 + (0 if no in bm else 3), pos, hint)
    for lemma, blokker in wikt.items():
        for pos, glosser in blokker:
            for gi, g in enumerate(glosser):
                hint = g
                g2 = re.sub(r"\([^)]*\)", "", g)          # fjern (forklaringer)
                g2 = re.sub(r"[“”\"].*?[“”\"]", "", g2)
                for pi, bit in enumerate(re.split(r"[;,]", g2)):
                    b = bit.strip().rstrip(".").strip()
                    eget = b[:1].isupper() and lemma[:1].isupper()
                    bl = b.lower()
                    bl = re.sub(r"^(a|an|the|to|be) ", "", bl)
                    if not re.fullmatch(r"[a-z][a-z'\- ]{0,28}", bl) or len(bl.split()) > 3:
                        continue
                    if lemma[:1].isupper() and not eget:
                        continue
                    poeng = gi * 3 + pi + (0 if lemma in bm else 4) + len(bl.split()) - 1
                    gammel = ut[bl].get(lemma)
                    if gammel is None:
                        ut[bl][lemma] = (poeng, pos, kort(hint, 70))
                    elif gammel[2] == "" :  # finnes i FreeDict også: bonus, og bruk Wiktionary-hintet
                        ut[bl][lemma] = (min(poeng, gammel[0]) - 3, pos, kort(hint, 70))
                    elif poeng < gammel[0]:
                        ut[bl][lemma] = (poeng, pos, kort(hint, 70))
    resultat = {}
    for en, d in ut.items():
        liste = sorted(d.items(), key=lambda x: (x[1][0], len(x[0])))[:10]
        resultat[en] = [[no, v[1], v[2]] for no, v in liste]
    return resultat

# ---------------------------------------------------------------
# Del opp i små filer
# ---------------------------------------------------------------
def del_opp(oppforinger, storrelse):
    """Sorter ordene og del dem i biter på rundt MAKS_DEL byte.
    Returnerer en liste med (første ord, [ordene]). Nettsiden finner riktig fil
    ved å søke i lista over første ord (samme sortering som i JavaScript)."""
    deler, bit, sum_ = [], [], 0
    for o in sorted(oppforinger):
        s = storrelse(o)
        if bit and sum_ + s > MAKS_DEL:
            deler.append((bit[0], bit))
            bit, sum_ = [], 0
        bit.append(o)
        sum_ += s
    if bit:
        deler.append((bit[0], bit))
    return deler

def skriv(mappe, sprak, deler, lag_innhold):
    os.makedirs(mappe, exist_ok=True)
    total = 0
    for nr, (forste, ordene) in enumerate(deler):
        innhold = lag_innhold(ordene)
        tekst = 'LV.ordbokDel("%s",%d,%s);\n' % (sprak, nr, json.dumps(innhold, ensure_ascii=False, separators=(",", ":")))
        with open(os.path.join(mappe, "%d.js" % nr), "w", encoding="utf-8") as f:
            f.write(tekst)
        total += len(tekst.encode("utf-8"))
    return total

def main():
    print("Leser Bokmålsordboka …")
    bm, bm_former = les_bm()
    print("  ", len(bm), "oppslagsord")
    print("Leser Wiktionary …")
    wikt, wikt_former = les_wikt()
    print("  ", len(wikt), "oppslagsord")
    print("Leser FreeDict …")
    fd = les_freedict()
    print("  ", len(fd), "engelske oppslagsord")
    en = snu(wikt, bm, fd)
    print("  ", len(en), "engelske oppslagsord")

    # Norsk: alt som slås opp på små bokstaver
    no = defaultdict(lambda: {"o": {}, "f": set()})
    for lemma in set(bm) | set(wikt):
        o = {}
        if lemma in bm: o["b"] = bm[lemma]
        if lemma in wikt: o["e"] = wikt[lemma]
        no[lemma.lower()]["o"][lemma] = o
    for kilde in (bm_former, wikt_former):
        for form, lemmaer in kilde.items():
            for l in lemmaer:
                if l.lower() != form:
                    no[form]["f"].add(l)

    def str_no(o):
        v = no[o]
        return len(json.dumps(v["o"], ensure_ascii=False).encode()) + len(o) * 2 + sum(len(x) + 4 for x in v["f"])
    def inn_no(ordene):
        oo, ff = {}, {}
        for o in ordene:
            oo.update(no[o]["o"])
            if no[o]["f"]:
                ff[o] = sorted(no[o]["f"])
        return {"o": oo, "f": ff}
    def str_en(o):
        return len(json.dumps(en[o], ensure_ascii=False).encode()) + len(o) + 4
    def inn_en(ordene):
        return {"w": {o: en[o] for o in ordene}}

    if os.path.isdir(UT):
        shutil.rmtree(UT)
    deler_no = del_opp(no, str_no)
    deler_en = del_opp(en, str_en)
    b1 = skriv(os.path.join(UT, "no"), "no", deler_no, inn_no)
    b2 = skriv(os.path.join(UT, "en"), "en", deler_en, inn_en)
    indeks = {"no": [d[0] for d in deler_no], "en": [d[0] for d in deler_en], "antall": {"bm": len(bm), "wikt": len(wikt), "en": len(en)}}
    with open(os.path.join(UT, "indeks.js"), "w", encoding="utf-8") as f:
        f.write("/* Laget av verktoy/lag-ordbok.py – ikke rediger for hånd */\nwindow.LV = window.LV || {};\nLV.ordbokIndeks = " +
                json.dumps(indeks, ensure_ascii=False, separators=(",", ":")) + ";\n")
    print("Skrev %d norske filer (%.1f MB) og %d engelske filer (%.1f MB)" % (len(deler_no), b1 / 1e6, len(deler_en), b2 / 1e6))

if __name__ == "__main__":
    main()
