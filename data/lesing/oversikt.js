/* =========================================================
   Les verden – Reading Room: oversikt over tekstene
   Alle tekstene er i det fri (public domain): forfatterne døde for mer
   enn 70 år siden. Originaltekstene er hentet fra Standard Ebooks (CC0).
   Hver tekst ligger i data/lesing/<id>.js.
   nivaa: 1 = easier, 2 = medium, 3 = challenging
   ========================================================= */
window.LV = window.LV || {};
LV.lesetekster = [
  { id: "after-twenty-years", tittel: "After Twenty Years", forfatter: "O. Henry", levde: "1862–1910", ar: 1906, sjanger: "Short story", nivaa: 1, trinn: "8–10", ord: 1260,
    ikon: "🕰️", farger: ["#1f3b57", "#c9a227"], kort: "Two best friends promised to meet again in New York after twenty years. One of them is waiting in a dark doorway …",
    tags: ["Twist", "Friendship", "Crime"], temaer: ["en10-narrated-stories"] },
  { id: "open-window", tittel: "The Open Window", forfatter: "Saki", levde: "1870–1916", ar: 1914, sjanger: "Short story", nivaa: 2, trinn: "8–10", ord: 1210,
    ikon: "🪟", farger: ["#2f4a2a", "#e8d9a8"], kort: "A nervous man visits a family in the countryside. A calm young girl tells him why the window is always open.",
    tags: ["Twist", "Humour"], temaer: ["en10-narrated-stories"] },
  { id: "gift-of-the-magi", tittel: "The Gift of the Magi", forfatter: "O. Henry", levde: "1862–1910", ar: 1905, sjanger: "Short story", nivaa: 2, trinn: "8–10", ord: 2060,
    ikon: "🎁", farger: ["#7a1f2b", "#f2d16b"], kort: "It is Christmas Eve, and Della has only $1.87 to buy a present for the husband she loves.",
    tags: ["Twist", "Love", "Christmas"], temaer: ["en10-narrated-stories"] },
  { id: "monkeys-paw", tittel: "The Monkey’s Paw", forfatter: "W. W. Jacobs", levde: "1863–1943", ar: 1902, sjanger: "Short story", nivaa: 3, trinn: "9–10", ord: 3930,
    ikon: "🐾", farger: ["#2b2118", "#b5793a"], kort: "A dried monkey’s paw from India can grant three wishes. But be careful what you wish for …",
    tags: ["Horror", "Suspense"], temaer: ["en10-narrated-stories", "en9-british-empire"] },
  { id: "tell-tale-heart", tittel: "The Tell-Tale Heart", forfatter: "Edgar Allan Poe", levde: "1809–1849", ar: 1843, sjanger: "Short story", nivaa: 3, trinn: "10", ord: 2080,
    ikon: "🫀", farger: ["#1a1216", "#e0c48a"], kort: "«Why will you say that I am mad?» A murderer tries to convince us that he is perfectly sane.",
    tags: ["Horror", "Unreliable narrator"], temaer: ["en10-narrated-stories"] },
  { id: "zitkala-sa", tittel: "The School Days of an Indian Girl", forfatter: "Zitkala-Ša", levde: "1876–1938", ar: 1900, sjanger: "Memoir", nivaa: 2, trinn: "9–10", ord: 1780,
    ikon: "🍎", farger: ["#5a2d1a", "#d9a35f"], kort: "An eight-year-old Dakota girl is taken to a boarding school far from home – «the land of red apples».",
    tags: ["Indigenous peoples", "Identity", "True story"], temaer: ["en10-indigenous-peoples", "en10-identity-stereotypes", "sf9-fornorskingen"] },
  { id: "douglass", tittel: "Learning to Read and Write", forfatter: "Frederick Douglass", levde: "c. 1818–1895", ar: 1845, sjanger: "Autobiography", nivaa: 3, trinn: "10", ord: 2450,
    ikon: "✒️", farger: ["#24324a", "#e3d3b0"], kort: "An enslaved boy teaches himself to read and write in secret – and discovers that knowledge is the path to freedom.",
    tags: ["Slavery", "Civil rights", "True story"], temaer: ["en10-oppression"] }
];
LV.lesenivaer = { 1: "Easier", 2: "Medium", 3: "Challenging" };
