/* =========================================================
   Les verden – Idiomdetektiven (idiomer.html)
   Engelske idiomer og historien bak dem.
   i = idiomet, m = meaning (engelsk forklaring), nb = norsk tilsvarende,
   k = kategori, o = opphav (origin, engelsk), sikker = false betyr at
   forklaringen er en populær, men usikker historie.
   e = eksempelsetning, tema = temaside (valgfritt)
   ========================================================= */
window.LV = window.LV || {};
LV.idiomKategorier = {
  sjo: ["⛵", "Ships and the sea"], krig: ["⚔️", "War and history"], teater: ["🎭", "Theatre and entertainment"], gammel: ["🏛️", "Bible and ancient times"], teknikk: ["🚂", "Technology"], ukjent: ["❓", "Nobody knows!"]
};
LV.idiomer = [
  { i: "to show your true colours", m: "to show what you are really like, often something bad", nb: "å vise sitt sanne ansikt", k: "sjo", sikker: true,
    o: "Ships’ flags were called «colours». Warships and pirate ships sometimes sailed under a false flag to trick their enemies – and raised their true colours just before they attacked.", e: "He seemed friendly at first, but he showed his true colours when he lost the game." },
  { i: "to be taken aback", m: "to be very surprised or shocked", nb: "å bli satt ut", k: "sjo", sikker: true,
    o: "On a sailing ship, the sails were «taken aback» when a sudden change of wind blew them backwards against the mast. The ship stopped or even moved backwards – a dangerous surprise.", e: "I was taken aback when my strict teacher started dancing." },
  { i: "to know the ropes", m: "to know how to do a job or how things work", nb: "å kjenne gangen", k: "sjo", sikker: true,
    o: "A big sailing ship had kilometres of ropes. A new sailor had to learn which rope did what before he was any use on board.", e: "Ask Sara – she has worked here for years and knows the ropes." },
  { i: "by and large", m: "generally, mostly", nb: "stort sett", k: "sjo", sikker: true,
    o: "Sailing «by» meant sailing close to the wind, and sailing «large» meant sailing with the wind behind you. A ship that sailed well «by and large» was good in most conditions.", e: "By and large, the school trip was a success." },
  { i: "to give someone a wide berth", m: "to keep away from someone or something", nb: "å gå i en stor bue rundt noen", k: "sjo", sikker: true,
    o: "A berth is the space a ship needs when it lies at anchor and swings with the wind. Sensible sailors gave other ships a wide berth.", e: "I always give the neighbour’s dog a wide berth." },
  { i: "to be in the same boat", m: "to be in the same difficult situation as others", nb: "å sitte i samme båt", k: "sjo", sikker: true,
    o: "If a boat sinks, everyone in it has the same problem. The idea is old – the ancient Greeks used a similar expression.", e: "Don’t worry about the test – we are all in the same boat." },
  { i: "to turn a blind eye", m: "to pretend not to see something", nb: "å se gjennom fingrene med noe", k: "krig", sikker: false, tema: "sf8-1814-grunnloven",
    o: "A popular story says that during the Battle of Copenhagen in 1801, Admiral Nelson was ordered to stop fighting the Danish-Norwegian fleet. He put his telescope to his blind eye and said he could not see the signal. Historians are not sure he really said it.", e: "The teacher turned a blind eye to the chewing gum." },
  { i: "to meet your Waterloo", m: "to finally be defeated", nb: "å møte sitt Waterloo", k: "krig", sikker: true, tema: "sf8-franske-revolusjonen",
    o: "In 1815, Napoleon was finally defeated at the Battle of Waterloo in Belgium. After that, he was sent to a small island in the Atlantic for the rest of his life.", e: "The champion had won every match, but he met his Waterloo in the final." },
  { i: "a Pyrrhic victory", m: "a win that costs so much that it is almost a defeat", nb: "en pyrrhusseier", k: "gammel", sikker: true,
    o: "King Pyrrhus of Epirus beat the Romans in 279 BC, but lost so many soldiers that he said: «One more victory like this, and we are lost.»", e: "We won the argument, but lost a friend – it was a Pyrrhic victory." },
  { i: "to cross the Rubicon", m: "to take a step that you cannot undo", nb: "å krysse Rubicon", k: "gammel", sikker: true,
    o: "In 49 BC, Julius Caesar led his army across the small river Rubicon into Italy. By law, this meant war against Rome – there was no going back.", e: "Once you send that message, you have crossed the Rubicon." },
  { i: "the writing on the wall", m: "a sign that something bad is going to happen", nb: "skriften på veggen", k: "gammel", sikker: true,
    o: "In the Bible, a hand writes mysterious words on the wall during a feast of King Belshazzar of Babylon. The words mean that his kingdom will fall – and it does, that same night.", e: "When the shop stopped ordering new goods, we saw the writing on the wall." },
  { i: "to go the extra mile", m: "to do more than you have to", nb: "å gå den ekstra mila", k: "gammel", sikker: true,
    o: "In the Bible, Jesus tells people that if a Roman soldier forces them to carry his pack for one mile, they should carry it for two.", e: "Our coach always goes the extra mile for the team." },
  { i: "to bury the hatchet", m: "to stop arguing and become friends again", nb: "å begrave stridsøksen", k: "krig", sikker: true, tema: "en10-indigenous-peoples",
    o: "Among some Native American peoples, such as the Haudenosaunee, weapons were buried in the ground when peace was made. European settlers wrote about the custom in the 1600s and 1700s.", e: "After years of fighting, the two brothers finally buried the hatchet." },
  { i: "to go berserk", m: "to become wildly angry or out of control", nb: "å gå berserk", k: "krig", sikker: true, tema: "en8-norwegian-and-english",
    o: "In the Norse sagas, berserkers were warriors who fought in a wild rage. The word came into English in the 1800s, when the sagas were translated.", e: "The crowd went berserk when the band came on stage." },
  { i: "an iron curtain", m: "a strong barrier between two groups", nb: "jernteppet", k: "krig", sikker: true, tema: "sf10-kalde-krigen",
    o: "In 1946, the British leader Winston Churchill said that «an iron curtain» had come down across Europe, dividing the communist East from the democratic West. The phrase became a symbol of the Cold War.", e: "For many years, the border was like an iron curtain between the two families." },
  { i: "to be sent to Coventry", m: "to be ignored by everyone on purpose", nb: "å bli frosset ut", k: "krig", sikker: false,
    o: "One popular explanation is that during the English Civil War in the 1640s, prisoners were sent to the town of Coventry, where the people refused to talk to them.", e: "After he told the secret, he was sent to Coventry by the whole class." },
  { i: "to steal someone’s thunder", m: "to take attention or praise that should go to someone else", nb: "å stjele showet", k: "teater", sikker: true,
    o: "In 1709, the playwright John Dennis invented a new way of making thunder sounds for his play. The play failed – but soon after, another theatre used his thunder machine. «They have stolen my thunder!» he complained.", e: "I was going to announce the news, but my sister stole my thunder." },
  { i: "to be in the limelight", m: "to get a lot of public attention", nb: "å stå i rampelyset", k: "teater", sikker: true,
    o: "In the 1800s, theatres used «limelight» – a very bright light made by heating lime (a kind of stone). The actor standing in the limelight was the one everybody looked at.", e: "After the video went viral, she was suddenly in the limelight." },
  { i: "break a leg!", m: "good luck! (said to actors before a show)", nb: "tvi tvi! / lykke til!", k: "teater", sikker: false,
    o: "Actors believe it is bad luck to say «good luck». Nobody knows exactly where «break a leg» comes from – there are many theories, but no clear answer.", e: "«Break a leg tonight!» she said before the school play." },
  { i: "to pull out all the stops", m: "to do everything you can", nb: "å sette inn alle krefter", k: "teater", sikker: true,
    o: "A church organ has «stops» that let air into different sets of pipes. When the organist pulls out all the stops, the organ plays as loudly as it can.", e: "The school pulled out all the stops for the 17th of May celebration." },
  { i: "a red herring", m: "something that takes your attention away from what is important", nb: "et villspor", k: "ukjent", sikker: false,
    o: "A red herring is a smoked fish with a strong smell. In 1807, the writer William Cobbett told a story about using one to lead hunting dogs away from a hare. Today, crime writers use «red herrings» to fool readers.", e: "The broken window was a red herring – the thief came in through the door." },
  { i: "to let the cat out of the bag", m: "to tell a secret by mistake", nb: "å slippe katta ut av sekken", k: "ukjent", sikker: false,
    o: "A popular story says that dishonest sellers at markets put a cat in a bag and sold it as a piglet. If the cat got out, the trick was revealed. The same expression exists in Norwegian.", e: "We planned a surprise party, but my little brother let the cat out of the bag." },
  { i: "a white elephant", m: "something expensive that is useless or costs too much to keep", nb: "et pengesluk", k: "ukjent", sikker: false,
    o: "A popular story says that the kings of Siam (Thailand) gave white elephants to courtiers they did not like. The sacred animals could not be used for work, but cost a fortune to feed.", e: "The huge new stadium became a white elephant after the Olympics." },
  { i: "to have a chip on your shoulder", m: "to be angry or bitter because you feel treated unfairly", nb: "å være bitter / ha noe å bevise", k: "ukjent", sikker: true, tema: "en10-american-dream",
    o: "In the USA in the 1800s, a boy who wanted a fight put a small piece of wood – a chip – on his shoulder and dared others to knock it off. Newspapers wrote about the custom around 1830.", e: "He has had a chip on his shoulder since he didn’t make the team." },
  { i: "to blow off steam", m: "to get rid of anger or energy", nb: "å få ut damp", k: "teknikk", sikker: true, tema: "sf9-industrialiseringen",
    o: "Steam engines had valves that let out steam when the pressure got too high. Without them, the boiler could explode.", e: "After the exam, we went for a run to blow off steam." },
  { i: "to go off the rails", m: "to start behaving badly or in a strange way", nb: "å spore av", k: "teknikk", sikker: true, tema: "sf9-industrialiseringen",
    o: "When a train leaves the rails, it crashes. The railways of the 1800s gave English many new expressions – like «to be on the right track».", e: "He went off the rails after his parents divorced, but now he is doing fine." },
  { i: "to run out of steam", m: "to lose energy or enthusiasm", nb: "å gå tom for krefter", k: "teknikk", sikker: true,
    o: "A steam train stopped when it had no more steam. The expression came into use in the 1800s.", e: "The team started well but ran out of steam in the second half." },
  { i: "it’s raining cats and dogs", m: "it’s raining very heavily", nb: "det regner trollkjerringer / øsregner", k: "ukjent", sikker: false,
    o: "Nobody knows! One theory is that animals were washed through the streets in heavy rain in old cities. Another is that it is just a funny, exaggerated picture. In Norwegian, we have troll witches instead.", e: "Take an umbrella – it’s raining cats and dogs!" },
  { i: "to bite the bullet", m: "to do something unpleasant that you cannot avoid", nb: "å bite i det sure eplet", k: "krig", sikker: false,
    o: "A popular explanation is that wounded soldiers bit on a bullet during operations before painkillers were invented. Historians are not sure – but the picture is strong.", e: "I hate the dentist, but I had to bite the bullet." },
  { i: "to toe the line", m: "to follow the rules", nb: "å holde seg på matta", k: "ukjent", sikker: false,
    o: "Possibly from runners who put their toes on the starting line, or from sailors who lined up along a line on the deck for inspection.", e: "In Mr. Hansen’s class, everyone toes the line." }
];
LV.idiomTekster = [
  { tittel: "The School Trip", tekst: "The trip to London started badly. Our teacher, Mr. Berg, was taken aback when half the class arrived late at the airport. «We are all in the same boat now,» he sighed. By and large, though, the trip was fantastic. Ida, who had been to London before, knew the ropes and showed us the best markets. On the last evening, someone let the cat out of the bag about Mr. Berg’s birthday, so the surprise cake was not much of a surprise. But he turned a blind eye to that – and we all went berserk on the dance floor.",
    idiomer: [["taken aback", "to be taken aback"], ["in the same boat", "to be in the same boat"], ["By and large", "by and large"], ["knew the ropes", "to know the ropes"], ["let the cat out of the bag", "to let the cat out of the bag"], ["turned a blind eye", "to turn a blind eye"], ["went berserk", "to go berserk"]] },
  { tittel: "The Big Match", tekst: "Our football team had won every match, but in the final we met our Waterloo. We started well, but we ran out of steam after half-time. Our coach always goes the extra mile, and he pulled out all the stops with three new players. It did not help. After the match, our striker had a chip on his shoulder and blamed the referee. «Blow off steam if you need to,» the coach said, «but tomorrow we bury the hatchet and start training again.»",
    idiomer: [["met our Waterloo", "to meet your Waterloo"], ["ran out of steam", "to run out of steam"], ["goes the extra mile", "to go the extra mile"], ["pulled out all the stops", "to pull out all the stops"], ["had a chip on his shoulder", "to have a chip on your shoulder"], ["Blow off steam", "to blow off steam"], ["bury the hatchet", "to bury the hatchet"]] },
  { tittel: "The Mystery of the Missing Phone", tekst: "When Jonas’s phone went missing, everyone gave Oliver a wide berth – he had been near Jonas’s bag. But that was a red herring. The real thief showed his true colours the next day, when he tried to sell the phone online. When the police called, he knew he had crossed the Rubicon. Sadly for him, the story ended up in the local newspaper, and he was in the limelight for all the wrong reasons.",
    idiomer: [["gave Oliver a wide berth", "to give someone a wide berth"], ["red herring", "a red herring"], ["showed his true colours", "to show your true colours"], ["crossed the Rubicon", "to cross the Rubicon"], ["in the limelight", "to be in the limelight"]] }
];
