/* =========================================================
   Les verden – Sports in the English-speaking world (sport.html)
   Brukes også av landsidene: LV.sport.land[<land-id>] vises som
   en egen «Sport»-del på landsiden.
   styrke i idrettene: 2 = one of the biggest sports, 1 = popular
   ========================================================= */
window.LV = window.LV || {};
LV.sport = {
  ingress: "Many of the world’s most popular sports got their modern rules in Britain in the 1800s. The British Empire then carried them all over the world – while the Americans invented their own. That is why the English-speaking world has a sports map unlike anywhere else.",

  innledning: [
    {
      tittel: "Made in Britain",
      tekst: "In the 1800s, boys at British private schools played many different ball games, and every school had its own rules. To play against each other, they needed shared rules. Football (1863), rugby (1871), tennis and golf all got their first official rules in Britain, and cricket’s rules are even older. Britain also gave the world the idea of fair play and the word **sportsmanship**."
    },
    {
      tittel: "Spread by the Empire",
      tekst: "British soldiers, teachers, traders and officials took their sports with them to the colonies. Cricket became a passion in India, Australia, South Africa and the Caribbean, and rugby became the national sport of New Zealand and South Africa. Today, beating England at «their own game» is extra sweet for many former colonies."
    },
    {
      tittel: "Changed in America",
      tekst: "The Americans went their own way. They turned an English bat-and-ball game into **baseball**, rugby into **American football**, and invented **basketball** from scratch. Australia and Ireland also created their own kinds of football. That is why the word «football» means different games in different countries!"
    }
  ],

  // Idrettene. land: { landId: 2 (one of the biggest) | 1 (popular) }
  idretter: [
    {
      id: "football", navn: "Football (soccer)", ikon: "⚽",
      kort: "The world’s most popular sport – called «soccer» in the USA.",
      land: { uk: 2, ireland: 1, usa: 1, australia: 1, newzealand: 1, southafrica: 2, india: 1, singapore: 2, canada: 1, jamaica: 2, nigeria: 2 },
      spilles: "Two teams of eleven players try to kick or head the ball into the other team’s goal. Only the goalkeeper may touch the ball with the hands. A match lasts 90 minutes.",
      ord: [["pitch", "the field a match is played on"], ["nil", "zero (British English)"], ["penalty", "a free shot at goal from 11 metres"], ["offside", "a rule that stops attackers from waiting next to the goal"]],
      store: ["The Premier League (England)", "The FA Cup – the oldest football competition in the world (1871)", "The FIFA World Cup"],
      visste: "England, Scotland, Wales and Northern Ireland each have their own national team. That is why there is no «UK team» in the football World Cup."
    },
    {
      id: "cricket", navn: "Cricket", ikon: "🏏",
      kort: "A bat-and-ball game where a match can last for five days – with breaks for lunch and tea.",
      land: { uk: 2, australia: 2, newzealand: 1, southafrica: 2, india: 2, jamaica: 2 },
      spilles: "Two teams of eleven take turns to bat and to field. The bowler throws the ball at the wicket (three wooden stumps), and the batter tries to protect it and hit the ball far enough to run between the wickets and score runs. The team with the most runs wins.",
      ord: [["wicket", "three stumps with two small pieces of wood on top"], ["bowler", "the player who throws the ball"], ["batter / batsman", "the player who hits the ball"], ["over", "six balls in a row from the same bowler"], ["run", "one point"]],
      store: ["Test matches (up to five days)", "The Ashes – England v Australia since 1882", "The Indian Premier League (IPL)", "The Cricket World Cup"],
      visste: "The Ashes trophy is a tiny urn. It is said to hold the ashes of a burnt cricket bail – made as a joke after England lost to Australia at home in 1882."
    },
    {
      id: "rugby", navn: "Rugby", ikon: "🏉",
      kort: "A tough game with an oval ball, where you may only pass backwards.",
      land: { uk: 2, ireland: 2, australia: 1, newzealand: 2, southafrica: 2 },
      spilles: "Players carry, kick and pass an oval ball. To move forward you must run with the ball or kick it – passes must go backwards. You score a **try** by putting the ball down behind the other team’s line. There are two main types: **rugby union** (15 players) and **rugby league** (13 players).",
      ord: [["try", "putting the ball down over the line – worth 5 points in rugby union"], ["scrum", "when the players push against each other to win the ball"], ["tackle", "stopping a player by holding them"], ["conversion", "a kick at goal after a try"]],
      store: ["The Rugby World Cup", "The Six Nations: England, Scotland, Wales, Ireland, France and Italy", "State of Origin (rugby league, Australia)"],
      visste: "According to a legend, rugby started in 1823 when a pupil at Rugby School in England picked up the ball during a football match and ran with it. Historians doubt the story – but the World Cup trophy is still named after him: the Webb Ellis Cup."
    },
    {
      id: "american-football", navn: "American football", ikon: "🏈",
      kort: "The most watched sport in the USA – with helmets, pads and lots of breaks.",
      land: { usa: 2 },
      spilles: "Two teams of eleven players. The attacking team has four tries, called **downs**, to move the ball ten yards forward. If they make it, they get four new downs. A **touchdown** (6 points) is scored by carrying or catching the ball in the other team’s end zone. The game stops after every play, so a 60-minute match takes more than three hours.",
      ord: [["quarterback", "the player who throws the ball and leads the attack"], ["touchdown", "the main way to score – 6 points"], ["down", "one attempt to move the ball forward"], ["field goal", "a kick between the posts – 3 points"]],
      store: ["The NFL (National Football League)", "The Super Bowl – the final, played in February", "College football"],
      visste: "Super Bowl Sunday is almost like a national holiday. Many people watch mainly for the half-time show and the expensive TV commercials."
    },
    {
      id: "baseball", navn: "Baseball", ikon: "⚾",
      kort: "«America’s pastime» – a bat-and-ball game with roots in English games like rounders.",
      land: { usa: 2, canada: 1 },
      spilles: "Two teams of nine take turns to bat and to field. The pitcher throws the ball, and the batter tries to hit it and run around four bases. A run is scored when a player gets all the way around. A game has nine **innings**.",
      ord: [["pitcher", "the player who throws the ball to the batter"], ["home run", "hitting the ball so far that you can run around all bases at once"], ["strike", "a miss – three strikes and you are out"], ["inning", "one part of the game, where both teams bat once"]],
      store: ["MLB (Major League Baseball)", "The World Series"],
      visste: "The «World Series» is mostly played by American teams – plus one team from Canada, the Toronto Blue Jays."
    },
    {
      id: "basketball", navn: "Basketball", ikon: "🏀",
      kort: "Invented by a teacher in 1891 – now one of the most popular sports in the world.",
      land: { usa: 2, australia: 1, newzealand: 1, singapore: 1, canada: 1, nigeria: 1 },
      spilles: "Two teams of five try to throw the ball through the other team’s hoop, three metres above the floor. You must bounce (dribble) the ball when you move. A basket is worth 2 points, or 3 points from far away.",
      ord: [["dribble", "bounce the ball while you move"], ["slam dunk", "pushing the ball down through the hoop"], ["three-pointer", "a basket from behind the long line"], ["rebound", "catching the ball after a missed shot"]],
      store: ["The NBA (National Basketball Association)", "March Madness – the college tournament", "The WNBA for women"],
      visste: "James Naismith, a teacher in Massachusetts, invented basketball in 1891 so that his students could play indoors in winter. The first «hoops» were peach baskets – someone had to climb up and get the ball out after every basket!"
    },
    {
      id: "ice-hockey", navn: "Ice hockey", ikon: "🏒",
      kort: "Canada’s national winter sport – and big in the northern USA.",
      land: { usa: 1, canada: 2 },
      spilles: "Two teams of six players (including a goalkeeper) skate on ice and use sticks to shoot a hard rubber disc, the **puck**, into the other team’s goal. Players change very often because the game is so fast and tiring.",
      ord: [["puck", "the black rubber disc"], ["rink", "the ice where the game is played"], ["power play", "when one team has more players because the other team has a player in the penalty box"]],
      store: ["The NHL (teams from the USA and Canada)", "The Stanley Cup"],
      visste: "The Stanley Cup is the oldest trophy in North American professional sport. Every player on the winning team gets to spend one day with the cup."
    },
    {
      id: "aussie-rules", navn: "Australian rules football", ikon: "🦘",
      kort: "Australia’s own kind of football – fast, physical and played on a huge oval field.",
      land: { australia: 2 },
      spilles: "Two teams of 18 players on an oval cricket field. Players can kick the ball, or hit it with their fist (a **handball**), but not throw it. A kick through the two middle posts is a **goal** (6 points), and through the outer posts a **behind** (1 point).",
      ord: [["footy", "Australian slang for football"], ["mark", "catching a kick cleanly – you then get a free kick"], ["behind", "1 point"]],
      store: ["The AFL (Australian Football League)", "The AFL Grand Final at the Melbourne Cricket Ground (MCG)"],
      visste: "The famous «specky» is a spectacular mark where a player jumps up on another player’s back to catch the ball high in the air."
    },
    {
      id: "gaelic", navn: "Gaelic games", ikon: "☘️",
      kort: "Ireland’s own sports: Gaelic football and hurling – played by amateurs.",
      land: { ireland: 2 },
      spilles: "**Gaelic football** is a mix of football and rugby: you can kick the ball, or carry it if you bounce or «solo» it (kick it to yourself) every four steps. **Hurling** is one of the fastest field sports in the world: players use a wooden stick, the hurley, to hit a small ball, the sliotar. In both games, a goal under the bar is 3 points, and over the bar 1 point.",
      ord: [["hurley", "the wooden stick used in hurling"], ["sliotar", "the small leather ball in hurling"], ["county", "players play for their home county – not for a club bought with money"], ["camogie", "the women’s version of hurling"]],
      store: ["The All-Ireland finals at Croke Park in Dublin", "The GAA (Gaelic Athletic Association), founded in 1884"],
      visste: "The players are amateurs: they are not paid, even though more than 80,000 people can watch the finals at Croke Park."
    },
    {
      id: "netball", navn: "Netball", ikon: "🥅",
      kort: "One of the biggest team sports for women in the Commonwealth.",
      land: { uk: 1, australia: 2, newzealand: 2, southafrica: 1, singapore: 1, jamaica: 2 },
      spilles: "Two teams of seven. Players may not run with the ball or bounce it – they must pass it within three seconds. Every player has a position that decides where on the court they may go. Only two players on each team may shoot at the hoop, which has no backboard.",
      ord: [["court", "the area where the game is played"], ["bib", "a vest with the player’s position, like GS (goal shooter)"], ["centre pass", "the pass that starts the game after each goal"]],
      store: ["The Netball World Cup", "The Commonwealth Games"],
      visste: "Netball grew out of early basketball. Australia has won the Netball World Cup more often than any other country."
    },
    {
      id: "athletics", navn: "Athletics (track and field)", ikon: "🏃",
      kort: "Running, jumping and throwing – the heart of the Olympic Games.",
      land: { uk: 1, usa: 1, canada: 1, jamaica: 2, nigeria: 1 },
      spilles: "Athletics includes **track** events like sprints, hurdles, relays and long-distance races, and **field** events like the long jump, high jump, pole vault, shot put and javelin. In a **relay**, four runners pass a baton to each other.",
      ord: [["sprint", "a short, very fast race, like the 100 metres"], ["baton", "the stick passed between runners in a relay"], ["false start", "starting before the gun – you are disqualified"], ["personal best (PB)", "your best result ever"]],
      store: ["The Olympic Games", "The World Athletics Championships", "The Penn Relays (USA) – where Jamaican high-school teams are stars"],
      visste: "In 2009, Jamaica’s Usain Bolt ran 100 metres in 9.58 seconds. That is a top speed of more than 44 km/h – and the world record still stands."
    },
    {
      id: "tennis", navn: "Tennis", ikon: "🎾",
      kort: "Wimbledon, the oldest tennis tournament in the world, began in 1877.",
      land: { uk: 1, usa: 1, australia: 1 },
      spilles: "Two players (or two pairs) hit a ball over a net with rackets. You win a point if the other player cannot return the ball inside the lines. Points are counted in a strange way: 15, 30, 40, game!",
      ord: [["serve", "the first hit that starts a point"], ["love", "zero in tennis"], ["deuce", "40–40"], ["Grand Slam", "the four biggest tournaments"]],
      store: ["Wimbledon (UK)", "The US Open (USA)", "The Australian Open (Australia)", "The French Open – the only Grand Slam not in an English-speaking country"],
      visste: "At Wimbledon, players must wear almost only white, and the fans eat tonnes of strawberries and cream."
    },
    {
      id: "golf", navn: "Golf", ikon: "⛳",
      kort: "The game was born in Scotland – St Andrews is called «the home of golf».",
      land: { uk: 1, ireland: 1, usa: 1, southafrica: 1 },
      spilles: "Players hit a small ball with clubs into 18 holes, one after the other. The player who uses the fewest shots wins.",
      ord: [["par", "the normal number of shots for a hole"], ["birdie", "one shot under par"], ["caddie", "a person who carries the clubs and gives advice"]],
      store: ["The Open Championship (UK) – the oldest major, from 1860", "The Masters (USA)", "The Ryder Cup – Europe v the USA"],
      visste: "Golf was so popular in Scotland in the 1400s that the king tried to ban it, because men played golf instead of practising archery for war."
    }
  ],

  // Én del per land – vises på sport.html og som «Sport» på landsiden
  land: {
    uk: {
      tittel: "Sport in the United Kingdom",
      tekst: [
        "Britain is called the home of modern sport. Football is by far the biggest sport, and the English **Premier League** is watched in almost every country in the world. In Wales, rugby is the national passion, and in summer, cricket is played on village greens all over England.",
        "The UK has many traditional sporting events, often with a long history: Wimbledon in tennis, the Oxford and Cambridge **Boat Race** on the Thames, and horse races like the Grand National. Football fans are very loyal to their local club – many support the same club all their lives, just like their parents and grandparents."
      ],
      store: ["The Premier League and the FA Cup", "The Six Nations (rugby)", "Wimbledon (tennis)", "The Ashes at Lord’s, «the home of cricket»"],
      visste: "England won the football World Cup only once, in 1966. Fans still sing «Football’s coming home» before big tournaments.",
      idretter: ["football", "cricket", "rugby", "tennis", "golf", "netball"]
    },
    ireland: {
      tittel: "Sport in Ireland",
      tekst: [
        "Ireland has its own national sports: **Gaelic football** and **hurling**. They are organised by the GAA, which was founded in 1884 to protect Irish culture at a time when Ireland was ruled by Britain. The players are amateurs who play for their home county, and the whole local community supports them.",
        "Rugby is also very popular. The Irish rugby team represents the whole island – both the Republic of Ireland and Northern Ireland – and plays in the Six Nations. Ireland is also famous for horse racing, golf and boxing."
      ],
      store: ["The All-Ireland finals at Croke Park", "The Six Nations (rugby)", "Horse racing at the Curragh and Punchestown"],
      visste: "Croke Park is one of the largest stadiums in Europe, even though most of the players there are not paid.",
      idretter: ["gaelic", "rugby", "football", "golf"]
    },
    usa: {
      tittel: "Sport in the USA",
      tekst: [
        "The USA has its own «big four»: **American football**, **baseball**, **basketball** and **ice hockey**. Each has a professional league – the NFL, MLB, the NBA and the NHL – where teams cannot be relegated. Soccer is growing fast, and the US women’s team is one of the most successful in the world.",
        "School and college sports are much more important than in Norway. High school football games on Friday nights can gather a whole town, and college games fill stadiums with over 100,000 fans. Many good athletes get **scholarships** to go to college. In 1972, a law called **Title IX** gave girls the same right to school and college sports as boys."
      ],
      store: ["The Super Bowl (American football)", "The World Series (baseball)", "The NBA Finals and March Madness (basketball)", "The 2028 Olympic Games in Los Angeles"],
      visste: "In 1947, Jackie Robinson became the first Black player in modern Major League Baseball. Today, every player in the league wears his number, 42, on Jackie Robinson Day.",
      idretter: ["american-football", "baseball", "basketball", "ice-hockey", "football", "tennis", "golf"]
    },
    australia: {
      tittel: "Sport in Australia",
      tekst: [
        "Australians love sport, and the warm climate means that a lot of it happens outdoors. Australia has its own football, **Aussie rules**, which is biggest in Victoria, South Australia and Western Australia. In New South Wales and Queensland, **rugby league** is more popular, and the yearly **State of Origin** series between the two states is a huge event.",
        "In summer, cricket is the national sport, and beating England in the Ashes is the greatest victory of all. Australia is also a nation of swimmers and surfers, and its women’s teams in netball and cricket are among the best in the world."
      ],
      store: ["The AFL Grand Final", "State of Origin (rugby league)", "The Australian Open (tennis)", "The Melbourne Cup – «the race that stops a nation»", "The 2032 Olympic Games in Brisbane"],
      visste: "The Melbourne Cup horse race is held on the first Tuesday in November. It is a public holiday in Melbourne, and people all over Australia stop to watch.",
      idretter: ["aussie-rules", "cricket", "rugby", "netball", "tennis", "football", "basketball"]
    },
    newzealand: {
      tittel: "Sport in New Zealand",
      tekst: [
        "Rugby is almost a religion in New Zealand. The men’s national team, the **All Blacks**, and the women’s team, the **Black Ferns**, are among the most successful teams in any sport. Before every match they perform a **haka**, a Māori war dance, to challenge the other team.",
        "Netball is the biggest team sport for women and girls, and the national team is called the Silver Ferns. New Zealanders also love sailing, cricket and adventure sports – bungy jumping was made popular in Queenstown."
      ],
      store: ["Rugby matches against Australia for the Bledisloe Cup", "The Rugby World Cup", "Netball: the Silver Ferns v Australia"],
      visste: "Many New Zealand national teams have names with «black» or «fern» – the silver fern is a national symbol: the All Blacks, Black Ferns, Black Caps (cricket) and Silver Ferns (netball).",
      idretter: ["rugby", "netball", "cricket", "football", "basketball"]
    },
    southafrica: {
      tittel: "Sport in South Africa",
      tekst: [
        "South Africans are passionate about sport, and the three biggest are football, rugby and cricket. During apartheid, sport was divided by race, and many countries refused to play against South Africa. The **sports boycott** put pressure on the government to end apartheid.",
        "When South Africa won the Rugby World Cup at home in 1995, President Nelson Mandela wore the team’s green Springbok shirt. For many, it was a symbol that sport could help unite the «Rainbow Nation». In 2010, South Africa became the first African country to host the football World Cup."
      ],
      store: ["The Springboks (rugby)", "Bafana Bafana (football)", "The Proteas (cricket)", "The Comrades Marathon – almost 90 km"],
      visste: "South Africa has won the Rugby World Cup four times – more than any other country.",
      idretter: ["football", "rugby", "cricket", "netball", "golf"]
    },
    india: {
      tittel: "Sport in India",
      tekst: [
        "In India, cricket is much more than a sport. Top players are national heroes, and big matches – especially against Pakistan – are watched by hundreds of millions of people. The **Indian Premier League (IPL)** is one of the richest sports leagues in the world, with players from many countries.",
        "India was once the best in the world in field hockey and has won eight Olympic gold medals in the sport. Traditional Indian games like **kabaddi** – a tag game where you hold your breath and chant «kabaddi, kabaddi» – are now professional sports on TV. Badminton and chess are also very popular."
      ],
      store: ["The IPL (cricket)", "India v Pakistan cricket matches", "The Pro Kabaddi League"],
      visste: "In 1983, India surprised the world by winning the Cricket World Cup. The victory made cricket the country’s great passion.",
      idretter: ["cricket", "football"]
    },
    canada: {
      tittel: "Sport in Canada",
      tekst: [
        "Ice hockey is Canada’s national winter sport and a big part of the country’s identity. Children play on frozen lakes and backyard rinks, and on a Saturday night millions of Canadians watch «Hockey Night in Canada». **Lacrosse**, a game first played by Indigenous peoples, is Canada’s official national summer sport.",
        "Canadians also love basketball – which was invented by a Canadian, **James Naismith**, in 1891 – and the Toronto Raptors won the NBA in 2019. Canadian football is a lot like American football, but the field is bigger and teams have only three tries to move the ball forward, not four."
      ],
      store: ["The Stanley Cup (ice hockey)", "Olympic ice hockey finals", "The Grey Cup (Canadian football)", "The Toronto Blue Jays (baseball)"],
      visste: "When Canada beat the USA in the Olympic ice hockey final in Vancouver in 2010, about 80 per cent of all Canadians watched at least part of the game.",
      idretter: ["ice-hockey", "basketball", "baseball", "football", "athletics"]
    },
    jamaica: {
      tittel: "Sport in Jamaica and the Caribbean",
      tekst: [
        "For its size, Jamaica is the greatest sprinting nation in the world. **Usain Bolt** holds the world records in the 100 and 200 metres, and **Shelly-Ann Fraser-Pryce** and **Elaine Thompson-Herah** have won many Olympic golds. The secret? Many say it is **«Champs»**, a huge athletics competition for high schools, where the stars of the future are discovered in front of 30,000 fans.",
        "Cricket is the big team sport across the English-speaking Caribbean, and the countries play together as **the West Indies**. Football is hugely popular too – the Jamaican team, the **Reggae Boyz**, played at the World Cup in 1998 – and the netball team, the **Sunshine Girls**, is one of the best in the world."
      ],
      store: ["«Champs» – the high-school athletics championships", "The West Indies cricket team", "The Caribbean Premier League (cricket)", "The Reggae Boyz and the Reggae Girlz (football)"],
      visste: "In 1988, Jamaica sent a bobsleigh team to the Winter Olympics in Calgary – a country without snow! Their story became the film «Cool Runnings».",
      idretter: ["athletics", "cricket", "football", "netball"]
    },
    nigeria: {
      tittel: "Sport in Nigeria",
      tekst: [
        "Football is by far the biggest sport in Nigeria. When the men’s national team, the **Super Eagles**, plays, the whole country stops. In 1996, Nigeria won the Olympic gold medal in football, beating Brazil and Argentina. The women’s team, the **Super Falcons**, has won the African championship more times than any other team.",
        "Nigeria has many great sprinters and jumpers, and basketball is growing fast: the women’s team, **D’Tigress**, has won the African championship several times, and many NBA stars have Nigerian parents."
      ],
      store: ["The Super Eagles (men’s football)", "The Super Falcons (women’s football)", "The Africa Cup of Nations", "D’Tigress (women’s basketball)"],
      visste: "Many famous footballers in the English Premier League have Nigerian roots – and many young Nigerians support English clubs like Arsenal, Chelsea and Manchester United.",
      idretter: ["football", "athletics", "basketball"]
    },
    singapore: {
      tittel: "Sport in Singapore",
      tekst: [
        "Football is the most popular sport to watch in Singapore, and many fans support clubs in the English Premier League. Because the country is small and very hot, a lot of sport happens indoors or in the water: swimming, badminton and table tennis are popular.",
        "Singapore hosts the Formula 1 **Singapore Grand Prix**, which was the first ever F1 night race, through the city streets under bright lights."
      ],
      store: ["The Singapore Grand Prix (Formula 1)", "The SEA Games (Southeast Asian Games)"],
      visste: "In 2016, swimmer Joseph Schooling won Singapore’s first Olympic gold medal – and he beat his childhood hero, Michael Phelps.",
      idretter: ["football", "basketball", "netball"]
    }
  },

  // Britisk og amerikansk sportsspråk
  ordpar: [
    ["football", "soccer", "fotball"],
    ["pitch", "field", "bane"],
    ["match", "game", "kamp"],
    ["nil", "zero", "null"],
    ["draw", "tie", "uavgjort"],
    ["kit", "uniform", "drakt"],
    ["boots", "cleats", "fotballsko"],
    ["fixture list", "schedule", "terminliste"],
    ["supporters", "fans", "supportere"],
    ["manager", "head coach", "trener / manager"],
    ["sport", "sports", "idrett («Do you like sport?» / «Do you like sports?»)"]
  ],

  // Idiomer – eleven velger riktig betydning
  idiomer: [
    { uttrykk: "It’s not cricket.", sport: "cricket", betydning: "It is not fair." },
    { uttrykk: "to be on a sticky wicket", sport: "cricket", betydning: "to be in a difficult situation" },
    { uttrykk: "to hit it out of the park", sport: "baseball", betydning: "to do something extremely well" },
    { uttrykk: "to step up to the plate", sport: "baseball", betydning: "to take responsibility" },
    { uttrykk: "a slam dunk", sport: "basketball", betydning: "something that is sure to succeed" },
    { uttrykk: "The ball is in your court.", sport: "tennis", betydning: "It is your turn to act or decide." },
    { uttrykk: "par for the course", sport: "golf", betydning: "normal and expected (often something negative)" },
    { uttrykk: "to move the goalposts", sport: "football", betydning: "to change the rules unfairly" },
    { uttrykk: "to drop the ball", sport: "American football / baseball", betydning: "to make a careless mistake" },
    { uttrykk: "a Hail Mary", sport: "American football", betydning: "a desperate last try with little chance of success" }
  ],

  quiz: [
    { s: "Which country gave modern football, rugby and tennis their first rules?", valg: ["Britain", "The USA", "Australia", "India"], riktig: 0, forklaring: "The rules were written in Britain in the 1800s." },
    { s: "What do Americans call the game the rest of the world calls football?", valg: ["Soccer", "Rugby", "Footy", "Kickball"], riktig: 0, forklaring: "In the USA, «football» means American football." },
    { s: "How long can a Test match in cricket last?", valg: ["Up to five days", "90 minutes", "Three hours", "One week"], riktig: 0, forklaring: "Test matches last up to five days. Shorter forms like Twenty20 last about three hours." },
    { s: "Which country has won the Rugby World Cup most times?", valg: ["South Africa", "England", "Australia", "Ireland"], riktig: 0, forklaring: "South Africa has won it four times." },
    { s: "What is the haka?", valg: ["A Māori war dance performed before rugby matches", "A cricket shot", "A kind of surfboard", "An Irish ball game"], riktig: 0, forklaring: "New Zealand’s teams perform the haka before matches." },
    { s: "Who invented basketball?", valg: ["A teacher, James Naismith", "Michael Jordan", "A British soldier", "A Native American chief"], riktig: 0, forklaring: "Naismith invented it in 1891 so his students could play indoors in winter." },
    { s: "Which sport is called «America’s pastime»?", valg: ["Baseball", "American football", "Basketball", "Ice hockey"], riktig: 0, forklaring: "Baseball has been played in the USA since the 1800s." },
    { s: "What are hurling and Gaelic football?", valg: ["Irish sports played by amateurs", "Scottish sports", "Australian sports", "Old Viking games"], riktig: 0, forklaring: "They are organised by the GAA in Ireland. The players are not paid." },
    { s: "Where is Australian rules football played?", valg: ["On an oval cricket field", "On ice", "On a basketball court", "On a beach"], riktig: 0, forklaring: "Aussie rules is played on large oval fields, often cricket grounds like the MCG." },
    { s: "What was the sports boycott against South Africa a protest against?", valg: ["Apartheid", "Doping", "High ticket prices", "The British Empire"], riktig: 0, forklaring: "Many countries refused to play against South Africa during apartheid." },
    { s: "Which sport is the great passion of India?", valg: ["Cricket", "Baseball", "Rugby", "Ice hockey"], riktig: 0, forklaring: "Big cricket matches in India are watched by hundreds of millions." },
    { s: "Which is the oldest tennis tournament in the world?", valg: ["Wimbledon", "The US Open", "The Australian Open", "The French Open"], riktig: 0, forklaring: "Wimbledon started in 1877." },
    { s: "What does «It’s not cricket» mean?", valg: ["It is not fair.", "It is boring.", "It is too slow.", "It is the wrong sport."], riktig: 0, forklaring: "Cricket was seen as a game of fair play." },
    { s: "What is Title IX in the USA?", valg: ["A law that gave girls equal rights to school and college sports", "The biggest basketball trophy", "A baseball team", "A rule in American football"], riktig: 0, forklaring: "Title IX was passed in 1972." }
  ],

  oppgaver: [
    "Choose one sport from this page. Explain the rules to someone who has never seen it – in 5–8 sentences.",
    "Compare a sport that is big in one English-speaking country with a sport that is big in Norway. What is similar, and what is different?",
    "Why do you think the British Empire spread sports like cricket and rugby? What could sport mean for the people in the colonies?",
    "In the USA, school and college sports are very important. Would you like a system like that in Norway? Give reasons.",
    "Sport can unite a country – but it can also divide it. Use South Africa or Ireland as an example.",
    "Find a sports star from an English-speaking country. Write a short presentation: who, which sport, why they are famous."
  ],

  temaer: ["en8-sports", "en8-united-kingdom", "en10-oppression"],

  kilder: [
    { tittel: "Britannica: sports", url: "https://www.britannica.com/sports" },
    { tittel: "BBC Sport", url: "https://www.bbc.co.uk/sport" },
    { tittel: "GAA – Gaelic Athletic Association", url: "https://www.gaa.ie/" },
    { tittel: "World Rugby", url: "https://www.world.rugby/" },
    { tittel: "ICC – International Cricket Council", url: "https://www.icc-cricket.com/" }
  ],

  kontroller: [
    "Rugby World Cup: Sør-Afrika 4 titler (1995, 2007, 2019, 2023) – sjekk etter neste VM (2027).",
    "Netball World Cup: Australia flest titler (12 etter 2023).",
    "India: 8 OL-gull i landhockey (menn).",
    "Croke Park: kapasitet ca. 82 000.",
    "NFL 32 lag, NBA 30, MLB 30, NHL 32 – ligaene kan endres.",
    "Singapore Grand Prix: avtale om nattløp – sjekk at løpet fortsatt arrangeres.",
    "Comrades Marathon: ca. 87–90 km avhengig av retning.",
    "«Webb Ellis»-legenden er omstridt – teksten sier dette."
  ]
};
