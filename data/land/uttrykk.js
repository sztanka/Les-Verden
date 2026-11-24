/* =========================================================
   Les verden – Words and expressions (landsidene)
   Vanlige ord og uttrykk som er typiske for hvert land.
   Felter: o = ord/uttrykk, b = betydning (enkel engelsk),
   n = norsk, e = eksempelsetning (leses opp med landets aksent),
   r = område (valgfritt).
   Eksempelsetningene er skrevet for nettstedet.
   ========================================================= */
window.LV = window.LV || {};
LV.landUttrykk = {
  uk: [
    { o: "cheers", b: "thanks (and sometimes: goodbye)", n: "takk; ha det", e: "Cheers for the help, mate!" },
    { o: "mate", b: "friend", n: "kompis", e: "Are you coming to the match, mate?" },
    { o: "brilliant", b: "great, excellent", n: "kjempebra", e: "You passed the test? Brilliant!" },
    { o: "chuffed", b: "very pleased", n: "veldig fornøyd", e: "She was chuffed with her exam results." },
    { o: "gutted", b: "very disappointed", n: "skikkelig skuffet", e: "I was gutted when we lost the final." },
    { o: "knackered", b: "very tired", n: "helt utslitt", e: "I'm knackered after that long walk." },
    { o: "fancy", b: "to want, to like the idea of", n: "ha lyst på", e: "Do you fancy a cup of tea?" },
    { o: "queue", b: "a line of people waiting", n: "kø", e: "There was a long queue outside the shop." },
    { o: "loo", b: "toilet", n: "do", e: "Excuse me, where's the loo?" },
    { o: "quid", b: "pound (money)", n: "pund", e: "These trainers cost fifty quid." },
    { o: "innit?", b: "isn't it? (very informal)", n: "ikke sant?", e: "It's freezing today, innit?", r: "London" },
    { o: "wee", b: "small, little", n: "liten", e: "Just a wee bit of milk, please.", r: "Scotland and Northern Ireland" },
    { o: "aye", b: "yes", n: "ja", e: "Aye, I'll be there at six.", r: "Scotland and northern England" },
    { o: "bairn", b: "child", n: "barn", e: "The bairns are playing in the garden.", r: "Scotland and northern England" },
    { o: "lush", b: "lovely, great", n: "deilig, nydelig", e: "This cake is lush!", r: "Wales and south-west England" }
  ],
  ireland: [
    { o: "What's the craic?", b: "What's happening? How are things?", n: "Hva skjer?", e: "Hey Siobhán, what's the craic?" },
    { o: "grand", b: "fine, OK", n: "greit, fint", e: "Don't worry about it, it's grand." },
    { o: "deadly", b: "great, brilliant", n: "kjempebra", e: "The concert last night was deadly!" },
    { o: "fierce", b: "very", n: "veldig", e: "It's fierce cold out today." },
    { o: "your man / your one", b: "that man / that woman (someone you point at or talk about)", n: "han der / hun der", e: "Your man over there is the new teacher." },
    { o: "giving out", b: "complaining, telling someone off", n: "kjefte, klage", e: "My mam was giving out to me for coming home late." },
    { o: "I'm after …", b: "I have just …", n: "jeg har nettopp …", e: "I'm after eating my dinner." },
    { o: "eejit", b: "idiot, fool (often friendly)", n: "tosk", e: "Ah, you eejit, you forgot your keys again!" },
    { o: "press", b: "cupboard", n: "skap", e: "The cups are in the press above the sink." },
    { o: "I will, yeah", b: "(said ironically) No, I won't!", n: "Ja, sikkert! (betyr nei)", e: "Clean my room on a Saturday? I will, yeah." },
    { o: "Sláinte!", b: "Cheers! (when you raise your glass – Irish for “health”, say SLAWN-cha)", n: "Skål!", e: "Sláinte, everyone, and happy birthday!" }
  ],
  usa: [
    { o: "How's it going?", b: "Hi, how are you?", n: "Hvordan går det?", e: "Hey, how's it going?" },
    { o: "awesome", b: "great, very good", n: "kjempebra", e: "Your project looks awesome!" },
    { o: "dude", b: "guy, friend (informal)", n: "kompis, fyr", e: "Dude, that was an amazing goal!" },
    { o: "You bet!", b: "Of course! Sure!", n: "Så klart!", e: "Can you help me with this? You bet!" },
    { o: "y'all", b: "you (more than one person)", n: "dere", e: "Are y'all coming to the game tonight?", r: "the South" },
    { o: "soda / pop", b: "a fizzy soft drink (“pop” in the Midwest and North-west)", n: "brus", e: "Do you want a soda with your burger?" },
    { o: "apartment", b: "a flat (British English)", n: "leilighet", e: "We live in an apartment on the fourth floor." },
    { o: "sidewalk", b: "pavement (British English)", n: "fortau", e: "The kids were drawing with chalk on the sidewalk." },
    { o: "fall", b: "autumn", n: "høst", e: "The leaves turn red and gold in the fall." },
    { o: "gas", b: "petrol (British English)", n: "bensin", e: "We need to stop and get gas." },
    { o: "cookie", b: "a sweet biscuit", n: "kjeks, cookie", e: "Can I have another chocolate chip cookie?" },
    { o: "check", b: "the bill in a restaurant", n: "regning", e: "Could we get the check, please?" },
    { o: "freshman", b: "a student in the first year of high school or college", n: "førsteårselev, førsteårsstudent", e: "My sister is a freshman in high school." }
  ],
  australia: [
    { o: "G'day", b: "hello", n: "hei", e: "G'day! Welcome to Sydney." },
    { o: "How ya going?", b: "How are you?", n: "Hvordan går det?", e: "G'day mate, how ya going?" },
    { o: "mate", b: "friend", n: "kompis", e: "Thanks for your help, mate." },
    { o: "no worries", b: "no problem; you're welcome", n: "ikke noe problem", e: "Sorry I'm late! No worries." },
    { o: "arvo", b: "afternoon", n: "ettermiddag", e: "See you this arvo at the beach." },
    { o: "brekkie", b: "breakfast", n: "frokost", e: "What did you have for brekkie?" },
    { o: "barbie", b: "barbecue", n: "grill", e: "We're having a barbie on Saturday." },
    { o: "sunnies", b: "sunglasses", n: "solbriller", e: "Don't forget your sunnies, it's bright out there." },
    { o: "thongs", b: "flip-flops", n: "flip-flops", e: "Take your thongs off before you go inside." },
    { o: "heaps", b: "a lot; very", n: "masse; veldig", e: "Thanks heaps for the lift!" },
    { o: "fair dinkum", b: "real, true, honest", n: "ekte, ærlig", e: "He caught a shark? Is that fair dinkum?" },
    { o: "servo", b: "petrol station", n: "bensinstasjon", e: "Let's stop at the servo and grab a drink." },
    { o: "footy", b: "football (often Australian rules football or rugby league)", n: "fotball (australsk)", e: "We're watching the footy on Saturday arvo." }
  ],
  newzealand: [
    { o: "kia ora", b: "hello; thank you (Māori)", n: "hei; takk", e: "Kia ora, everyone, and welcome!" },
    { o: "whānau", b: "family, extended family (Māori)", n: "familie, storfamilie", e: "The whole whānau came to my birthday." },
    { o: "kai", b: "food (Māori)", n: "mat", e: "Come over and have some kai with us." },
    { o: "sweet as", b: "great, no problem", n: "topp, greit", e: "Can you pick me up at six? Sweet as!" },
    { o: "chur", b: "thanks; cool", n: "takk; kult", e: "You saved me a seat? Chur, bro!" },
    { o: "jandals", b: "flip-flops", n: "flip-flops", e: "I lost one of my jandals at the beach." },
    { o: "togs", b: "swimwear", n: "badetøy", e: "Grab your togs, we're going for a swim!" },
    { o: "chilly bin", b: "a cool box", n: "kjølebag, kjøleboks", e: "Put the drinks in the chilly bin." },
    { o: "bach", b: "a small holiday house, often by the sea (say: batch)", n: "hytte", e: "We're spending the summer at the bach." },
    { o: "dairy", b: "a small corner shop", n: "nærbutikk, kiosk", e: "I'll get some milk from the dairy." },
    { o: "tramping", b: "hiking", n: "fottur, fjelltur", e: "We went tramping in the mountains last weekend." }
  ],
  southafrica: [
    { o: "howzit", b: "hello, how are you?", n: "hei, hvordan går det?", e: "Howzit, bru? Long time no see!" },
    { o: "lekker", b: "nice, tasty (from Afrikaans)", n: "deilig, digg", e: "This pie is lekker!" },
    { o: "braai", b: "barbecue", n: "grill, grillfest", e: "Come to our braai on Sunday." },
    { o: "robot", b: "traffic light", n: "trafikklys", e: "Turn left at the next robot." },
    { o: "bakkie", b: "pickup truck", n: "pickup", e: "We put the bikes in the back of the bakkie." },
    { o: "now now", b: "soon, in a moment", n: "straks", e: "Wait, I'm coming now now." },
    { o: "just now", b: "later (at some point – maybe!)", n: "senere, etter hvert", e: "I'll clean my room just now." },
    { o: "eish", b: "a word that shows surprise, worry or frustration", n: "huff, oi", e: "Eish, it's so hot today!" },
    { o: "shame", b: "how sweet! / poor thing!", n: "så søtt! / stakkars!", e: "Shame, look at the little puppy!" },
    { o: "izit?", b: "really? (from “is it?”)", n: "er det sant?", e: "I got full marks in the test. Izit?" },
    { o: "sharp sharp", b: "OK, see you; all good", n: "greit; ha det", e: "See you tomorrow, sharp sharp!" }
  ],
  india: [
    { o: "What is your good name?", b: "What is your name? (polite)", n: "Hva heter du?", e: "Hello, sir, what is your good name?" },
    { o: "prepone", b: "to move something to an earlier time (the opposite of postpone)", n: "fremskynde", e: "The exam has been preponed to Monday." },
    { o: "do the needful", b: "do what is necessary", n: "gjøre det som trengs", e: "Please check the form and do the needful." },
    { o: "cousin-brother / cousin-sister", b: "male cousin / female cousin", n: "fetter / kusine", e: "My cousin-brother is coming to stay with us." },
    { o: "timepass", b: "something you do just to pass the time", n: "tidsfordriv", e: "I watch cricket highlights for timepass." },
    { o: "only", b: "used to make a word stronger", n: "jo, nettopp (forsterker)", e: "I told you only yesterday!" },
    { o: "same to same", b: "exactly the same", n: "helt lik", e: "Your bag and my bag are same to same!" },
    { o: "out of station", b: "out of town, travelling", n: "bortreist", e: "Sorry, I am out of station until Monday." },
    { o: "batchmate", b: "a student from the same year at school or college", n: "kullkamerat", e: "She was my batchmate at college." },
    { o: "yaar", b: "friend, mate (Hindi)", n: "kompis", e: "Come on, yaar, we will be late!" },
    { o: "Tell me", b: "Yes? How can I help? (on the phone or in a shop)", n: "Ja? Hva kan jeg hjelpe med?", e: "Hello? Yes, tell me." }
  ],
  singapore: [
    { o: "lah", b: "a little word at the end of a sentence to make it friendly or strong", n: "(småord, omtrent «da», «vel»)", e: "Don't worry lah, it's OK!" },
    { o: "can or not?", b: "is it possible? is it OK?", n: "går det an?", e: "I want to sit here, can or not?" },
    { o: "can", b: "yes, that's OK", n: "ja, det går fint", e: "Meet at three? Can!" },
    { o: "makan", b: "to eat; food (from Malay)", n: "spise; mat", e: "Let's go makan at the hawker centre." },
    { o: "shiok", b: "very good, delicious", n: "nydelig, digg", e: "This chicken rice is so shiok!" },
    { o: "chope", b: "to save a seat (often with a packet of tissues!)", n: "holde av en plass", e: "I'll chope a table for us." },
    { o: "alamak", b: "oh no! (from Malay)", n: "å nei!", e: "Alamak, I forgot my wallet!" },
    { o: "kiasu", b: "afraid of missing out, so you always want to be first", n: "redd for å gå glipp av noe", e: "He queued for three hours. So kiasu!" },
    { o: "paiseh", b: "embarrassed; sorry", n: "flau; unnskyld", e: "Paiseh, I'm late again." },
    { o: "sian", b: "bored, fed up", n: "lei, kjedelig", e: "So much homework today. Sian!" }
  ],
  canada: [
    { o: "eh?", b: "right? don't you think? (at the end of a sentence)", n: "ikke sant?", e: "Nice day today, eh?" },
    { o: "toque", b: "a woolly winter hat (say: took)", n: "lue", e: "Put on your toque, it's minus twenty outside!" },
    { o: "loonie", b: "a one-dollar coin", n: "dollarmynt (1 dollar)", e: "Can you lend me a loonie?" },
    { o: "toonie", b: "a two-dollar coin", n: "2-dollarmynt", e: "The hot chocolate costs a toonie." },
    { o: "double-double", b: "coffee with two creams and two sugars", n: "kaffe med to fløte og to sukker", e: "I'll have a double-double, please." },
    { o: "washroom", b: "toilet", n: "toalett", e: "Excuse me, where is the washroom?" },
    { o: "keener", b: "a very eager student", n: "ivrig elev, streber", e: "She's a keener. She always does extra homework." },
    { o: "give'r", b: "go for it, give it everything", n: "gi alt", e: "It's the last lap, give'r!" },
    { o: "zed", b: "the letter Z", n: "bokstaven z", e: "My name starts with a zed." },
    { o: "sorry", b: "Canadians say it a lot – even when it isn't their fault!", n: "unnskyld", e: "Oh, sorry, sorry, my mistake!" }
  ],
  jamaica: [
    { o: "Wah gwaan?", b: "What's going on? Hi!", n: "Hva skjer? Hei!", e: "Wah gwaan, bredda?" },
    { o: "Mi deh yah", b: "I'm here; I'm OK (an answer to “Wah gwaan?”)", n: "Jeg har det bra", e: "Wah gwaan? Mi deh yah, man." },
    { o: "irie", b: "good, fine, happy", n: "bra, fint", e: "Everything irie today." },
    { o: "bredda / bredrin", b: "brother; close friend", n: "bror; kompis", e: "Him a mi bredrin from school." },
    { o: "likkle", b: "little", n: "liten", e: "Gimme a likkle more rice." },
    { o: "pickney", b: "child", n: "barn", e: "The pickney dem playing in the yard." },
    { o: "nyam", b: "eat", n: "spise", e: "Come nyam some ackee and saltfish." },
    { o: "yaad", b: "home", n: "hjem", e: "Mi a go yaad now." },
    { o: "soon come", b: "I'll be there soon (but maybe not very soon!)", n: "kommer snart", e: "Don't worry, mi soon come." },
    { o: "likkle more", b: "see you later", n: "vi ses", e: "Likkle more, mi friend!" },
    { o: "tallawah", b: "strong, not to be underestimated", n: "sterk, tøff", e: "She small, but she tallawah!" }
  ],
  nigeria: [
    { o: "How far?", b: "Hi, how are you? (Pidgin)", n: "Hei, hvordan går det?", e: "How far, my guy?" },
    { o: "I dey", b: "I'm fine (Pidgin)", n: "Jeg har det fint", e: "How far? I dey, I dey fine." },
    { o: "abeg", b: "please (Pidgin)", n: "vær så snill", e: "Abeg, help me carry this bag." },
    { o: "no wahala", b: "no problem (Pidgin)", n: "ikke noe problem", e: "You want to borrow my pen? No wahala." },
    { o: "chop", b: "to eat (Pidgin)", n: "spise", e: "Make we go chop rice." },
    { o: "sabi", b: "to know, to be good at (Pidgin)", n: "kunne, vite", e: "She sabi play football well well." },
    { o: "Oya!", b: "Come on! Let's go!", n: "Kom igjen!", e: "Oya, we are late for school!" },
    { o: "Na wa o!", b: "Wow! I can't believe it!", n: "Herregud!", e: "Na wa o, this traffic is too much!" },
    { o: "go-slow", b: "traffic jam", n: "trafikkork", e: "We were stuck in a go-slow for two hours." },
    { o: "flash", b: "to call someone and hang up, so they call you back", n: "ringe og legge på (så den andre ringer tilbake)", e: "I have no credit, so I will flash you." },
    { o: "mama put", b: "a cheap street food stall", n: "enkel gatekjøkkenbod", e: "Let's buy lunch at the mama put." }
  ]
};
