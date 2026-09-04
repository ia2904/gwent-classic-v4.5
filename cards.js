/*
 * Original cards from The Witcher 3
 */
var default_cards = {
    "spe_decoy": {
        "name": "Decoy",
        "deck": "special",
        "row": "",
        "strength": "",
        "ability": "decoy",
        "filename": "decoy",
        "count": "3",
        "quote": "When you run out of peasants, decoys also make decent arrow fodder."
    },
    "spe_frost": {
        "name": "Biting Frost",
        "deck": "weather",
        "row": "",
        "strength": "",
        "ability": "frost",
        "filename": "frost",
        "count": "2",
        "quote": "Best part about frost - bodies of the fallen don't rot so quickly."
    },
    "spe_clear": {
        "name": "Clear Weather",
        "deck": "weather",
        "row": "",
        "strength": "",
        "ability": "clear",
        "filename": "clear",
        "count": "2",
        "quote": "The sun' shinin', Dromle! The sun's shinin'! Maybe there's hope left after all..."
    },
    "spe_horn": {
        "name": "Commander's Horn",
        "deck": "special",
        "row": "",
        "strength": "",
        "ability": "horn",
        "filename": "horn",
        "count": "3",
        "quote": "Plus one to morale, minus three to hearing."
    },
 "ntr_geralt": {
        "name": "Geralt of Rivia",
        "deck": "neutral",
        "row": "close",
        "strength": "12",
        "ability": "hero",
        "filename": "geralt",
        "count": "1",
        "quote": "If that's what it takes to save the world, it's better to let that world die."
    },
  "ntr_ciri": {
        "name": "Cirilla Fiona Elen Riannon",
        "deck": "neutral",
        "row": "close",
        "strength": "12",
        "ability": "hero",
        "filename": "ciri",
        "count": "1",
        "quote": "Know when fairy tales cease to be tales? When people start believing in them."
    },
"ntr_mysterious_elf": {
        "name": "Avallach'h",
        "deck": "neutral",
        "row": "close",
        "strength": "0",
        "ability": "hero spy",
        "filename": "mysterious_elf",
        "count": "1",
        "quote": "You humans have... unusual tastes."
    },
    "ntr_dandelion": {
        "name": "Dandelion",
        "deck": "neutral",
        "row": "close",
        "strength": "2",
        "ability": "horn",
        "filename": "dandelion",
        "count": "1",
        "quote": "Dandelion, you're a cynic, a lecher, a whoremonger, a liar - and my best friend."
    },
"ntr_triss": {
        "name": "Triss Merigold",
        "deck": "neutral",
        "row": "close",
        "strength": "7",
        "ability": "hero",
        "filename": "triss",
        "count": "1",
        "quote": "I can take care of myself. Trust me."
    },
    "ntr_vesemir": {
        "name": "Vesemir",
        "deck": "neutral",
        "row": "close",
        "strength": "6",
        "ability": "",
        "filename": "vesemir",
        "count": "1",
        "quote": "If you're to be hanged, ask for water. Anything can happen before they fetch it."
    },
"ntr_yennefer": {
        "name": "Yennefer of Vengerberg",
        "deck": "neutral",
        "row": "ranged",
        "strength": "7",
        "ability": "hero medic",
        "filename": "yennefer",
        "count": "1",
        "quote": "Magic is Chaos, Art and Science. It is a curse, a blessing and a progression."
    },
    "spe_fog": {
        "name": "Impenetrable Fog",
        "deck": "weather",
        "row": "",
        "strength": "",
        "ability": "fog",
        "filename": "fog",
        "count": "2",
        "quote": "A good commander's dream... a bad one's horror."
    },
    "spe_scorch": {
        "name": "Scorch",
        "deck": "special",
        "row": "",
        "strength": "",
        "ability": "scorch",
        "filename": "scorch",
        "count": "3",
        "quote": "Pillars of flame turn the mightiest to ash. All others tremble in shock and awe."
    },
"spe_cull": {
        "name": "Cull",
        "deck": "special novigrad",
        "row": "",
        "strength": "",
        "ability": "cull",
        "filename": "cull",
        "count": "2",
        "quote": "Not every death’s heroic. Most are just… flimsy necks meeting sharp steel."
    },
    "spe_rain": {
        "name": "Torrential Rain",
        "deck": "weather",
        "row": "",
        "strength": "",
        "ability": "rain",
        "filename": "rain",
        "count": "2",
        "quote": "Even the rain in this land smells like piss."
    }
};

/*
 * Custom new cards
 */


var ext_nr_cards = {
     "nr_villen": {
        "name": "Villentretenmerth",
        "deck": "realms",
        "row": "close",
        "strength": "5",
        "ability": "scorch_c",
        "filename": "villen",
        "count": "1",
        "quote": "Also calls himself Borkh Three Jackdaws... he's not the best at names."
    },
      "nr_zoltan": {
        "name": "Zoltan Chivay",
        "deck": "realms",
        "row": "close",
        "strength": "4",
        "ability": "comrade",
        "filename": "zoltan",
        "count": "1",
        "quote": "Life without old mates and booze is like a woman without a rump."
    },
    "nr_foltest_king": {
        "name": "Foltest - King of Temeria",
        "deck": "realms",
        "row": "leader",
        "strength": "",
        "ability": "foltest_king",
        "filename": "foltest_king",
        "count": "1",
        "quote": "It is natural and beautiful that a man should love his sister."
    },
    "nr_foltest_lord": {
        "name": "Foltest - Lord Commander of the North",
        "deck": "realms",
        "row": "leader",
        "strength": "",
        "ability": "foltest_lord",
        "filename": "foltest_lord",
        "count": "1",
        "quote": "Sod advisors and their schemes. I place my trust in my soldiers' blades."
    },
    "nr_foltest_siegemaster": {
        "name": "Foltest - The Siegemaster",
        "deck": "realms",
        "row": "leader",
        "strength": "",
        "ability": "foltest_siegemaster",
        "filename": "foltest_siegemaster",
        "count": "1",
        "quote": "A well-aimed ballista razes not just the enemy's wall, but his morale as well."
    },
    "nr_foltest_steelforged": {
        "name": "Foltest - The Steel-Forged",
        "deck": "realms",
        "row": "leader",
        "strength": "",
        "ability": "foltest_steelforged",
        "filename": "foltest_steelforged",
        "count": "1",
        "quote": "A beautiful day for battle"
    },
    "nr_foltest_son_of_medell": {
        "name": "Foltest - Son of Medell",
        "deck": "realms",
        "row": "leader",
        "strength": "",
        "ability": "foltest_son",
        "filename": "foltest_son_of_medell",
        "count": "1",
        "quote": "Dammit, I rule this land and I refuse to creep around its corners."
    },
    "nr_blue_stripes_1": {
        "name": "Blue Stripes Commando",
        "id": 1,
        "deck": "realms",
        "row": "close",
        "strength": "4",
        "ability": "bond",
        "filename": "blue_stripes_1",
        "count": "1",
        "target": "nr_blue_stripes",
        "quote": "I'd do anything for Temeria. Mostly, though, I kill for her."
    },
    "nr_blue_stripes_2": {
        "name": "Blue Stripes Commando",
        "id": 2,
        "deck": "realms",
        "row": "close",
        "strength": "4",
        "ability": "bond",
        "filename": "blue_stripes_2",
        "count": "1",
        "target": "nr_blue_stripes",
        "quote": "I'd do anything for Temeria. Mostly, though, I kill for her."
    },
    "nr_blue_stripes_3": {
        "name": "Blue Stripes Commando",
        "id": 3,
        "deck": "realms",
        "row": "close",
        "strength": "4",
        "ability": "bond",
        "filename": "blue_stripes_3",
        "count": "1",
        "target": "nr_blue_stripes",
        "quote": "I'd do anything for Temeria. Mostly, though, I kill for her."
    },
       "nr_olgierd": {
        "name": "Olgierd von Everec",
        "deck": "realms",
        "row": "agile_cr",
        "strength": "6",
        "ability": "morale",
        "filename": "olgierd",
        "count": "1",
        "quote": "At least you now know I don't easily lose my head."
    },
    "nr_catapult_1": {
        "name": "Catapult",
        "id": 1,
        "deck": "realms",
        "row": "siege",
        "strength": "5",
        "ability": "bond",
        "filename": "catapult_1",
        "count": "1",
        "target": "nr_catapult",
        "quote": "The gods help those who have better catapults."
    },
    "nr_catapult_2": {
        "name": "Catapult",
        "id": 2,
        "deck": "realms",
        "row": "siege",
        "strength": "5",
        "ability": "bond",
        "filename": "catapult_2",
        "count": "1",
        "target": "nr_catapult",
        "quote": "The gods help those who have better catapults."
    },
    "nr_crinfrid_1": {
        "name": "Crinfrid Reavers Dragon Hunter",
        "id": 1,
        "deck": "realms",
        "row": "ranged",
        "strength": "5",
        "ability": "bond",
        "filename": "crinfrid_1",
        "count": "1",
        "target": "nr_crinfrid",
        "quote": "Haven't had much luck with monsters of late, so we enlisted."
    },
    "nr_crinfrid_2": {
        "name": "Crinfrid Reavers Dragon Hunter",
        "id": 2,
        "deck": "realms",
        "row": "ranged",
        "strength": "5",
        "ability": "bond",
        "filename": "crinfrid_2",
        "count": "1",
        "target": "nr_crinfrid",
        "quote": "Haven't had much luck with monsters of late, so we enlisted."
    },
    "nr_crinfrid_3": {
        "name": "Crinfrid Reavers Dragon Hunter",
        "id": 3,
        "deck": "realms",
        "row": "ranged",
        "strength": "5",
        "ability": "bond",
        "filename": "crinfrid_3",
        "count": "1",
        "target": "nr_crinfrid",
        "quote": "Haven't had much luck with monsters of late, so we enlisted."
    },
    "nr_ballista_1": {
        "name": "Ballista",
        "id": 1,
        "deck": "realms",
        "row": "siege",
        "strength": "5",
        "ability": "bond",
        "filename": "ballista_1",
        "count": "1",
        "target": "nr_ballista",
        "quote": "Never manages to hit the same place twice, which might constitute a real problem."
    },
    "nr_ballista_2": {
        "name": "Ballista",
        "id": 2,
        "deck": "realms",
        "row": "siege",
        "strength": "5",
        "ability": "bond",
        "filename": "ballista_2",
        "count": "1",
        "target": "nr_ballista",
        "quote": "Never manages to hit the same place twice, which might constitute a real problem."
    },
    "nr_banner_nurse": {
        "name": "Dun Banner Medic",
        "deck": "realms",
        "row": "siege",
        "strength": "2",
        "ability": "medic",
        "filename": "banner_nurse",
        "count": "1",
        "quote": "Stitch red to red, white to white, and everything will be all right."
    },
    "nr_esterad": {
        "name": "Esterad Thyssen",
        "deck": "realms",
        "row": "close",
        "strength": "10",
        "ability": "hero",
        "filename": "esterad",
        "count": "1",
        "quote": "Like all Thyssen men, he was tall, powerfully built and criminally handsome"
    },
    "nr_natalis": {
        "name": "John Natalis",
        "deck": "realms",
        "row": "close",
        "strength": "10",
        "ability": "hero",
        "filename": "natalis",
        "count": "1",
        "quote": "That square should bear the names of my soldiers, of the dead. Not mine."
    },
    "nr_kaedwen_siege_1": {
        "name": "Kaedweni Siege Expert",
        "deck": "realms",
        "row": "siege",
        "strength": "5",
        "ability": "morale",
        "filename": "kaedwen_siege_1",
        "count": "1",
        "quote": "'You gotta recalibrate the arm by five degrees.' 'Do what by the what now?'"
    },
    "nr_kaedwen_siege_2": {
        "name": "Kaedweni Siege Expert",
        "deck": "realms",
        "row": "siege",
        "strength": "5",
        "ability": "morale",
        "filename": "kaedwen_siege_2",
        "count": "1",
        "quote": "'You gotta recalibrate the arm by five degrees.' 'Do what by the what now?'"
    },
    "nr_keira": {
        "name": "Keira Metz",
        "deck": "realms",
        "row": "ranged",
        "strength": "8",
        "ability": "",
        "filename": "keira",
        "count": "1",
        "quote": "If I'm to die today, I wish to look smashing for the occasion."
    },
    "nr_philippa": {
        "name": "Philippa Eilhart",
        "deck": "realms",
        "row": "ranged",
        "strength": "10",
        "ability": "hero",
        "filename": "philippa",
        "count": "1",
        "quote": "Soon the power of kings will wither, and the Lodge shall seize its rightful place."
    },
    "nr_poor_infantry_1": {
        "name": "Poor Fucking Infantry",
        "id": 1,
        "deck": "realms",
        "row": "close",
        "strength": "4",
        "ability": "muster",
        "filename": "poor_infantry_1",
        "count": "1",
        "target": "nr_poor_infantry",
        "quote": "I's a war veteran! ... spare me a crown?"
    },
    "nr_poor_infantry_2": {
        "name": "Poor Fucking Infantry",
        "id": 2,
        "deck": "realms",
        "row": "close",
        "strength": "4",
        "ability": "muster",
        "filename": "poor_infantry_2",
        "count": "1",
        "target": "nr_poor_infantry",
        "quote": "I's a war veteran! ... spare me a crown?"
    },
    "nr_poor_infantry_3": {
        "name": "Poor Fucking Infantry",
        "id": 3,
        "deck": "realms",
        "row": "close",
        "strength": "4",
        "ability": "muster",
        "filename": "poor_infantry_3",
        "count": "1",
        "target": "nr_poor_infantry",
        "quote": "I's a war veteran! ... spare me a crown?"
    },
    "nr_stennis": {
        "name": "Prince Stennis",
        "deck": "realms",
        "row": "close",
        "strength": "9",
        "ability": "spy",
        "filename": "stennis",
        "count": "1",
        "quote": "He ploughin' wears the golden armor. Golden. 'Course he's an arsehole."
    },
    "nr_sheldon": {
        "name": "Sheldon Skaggs",
        "deck": "realms",
        "row": "ranged",
        "strength": "4",
        "ability": "comrade",
        "filename": "sheldon",
        "count": "1",
        "quote": "I was there, on the front lines! Right where the fightin' was the thickest!"
    },
    "nr_siege_tower": {
        "name": "Siege Tower",
        "deck": "realms",
        "row": "siege",
        "strength": "7",
        "ability": "",
        "filename": "siege_tower",
        "count": "1",
        "quote": "I love the clamor of siege towers in the morning. Sounds like victory."
    },
    "nr_dijkstra": {
        "name": "Sigismund Dijkstra",
        "deck": "realms",
        "row": "close",
        "strength": "8",
        "ability": "spy",
        "filename": "dijkstra",
        "count": "1",
        "quote": "Gwent's like politics, just more honest."
    },
    "nr_sheala": {
        "name": "Síle de Tansarville",
        "deck": "realms",
        "row": "ranged",
        "strength": "8",
        "ability": "",
        "filename": "sheala",
        "count": "1",
        "quote": "The Lodge lacks humility. Our lust for power may yet be our undoing."
    },
    "nr_thaler": {
        "name": "Thaler",
        "deck": "realms",
        "row": "siege",
        "strength": "7",
        "ability": "spy",
        "filename": "thaler",
        "count": "1",
        "quote": "Fuck off! We aren't all ploughin' philanderers. Some of us have depth..."
    },
    "nr_vernon": {
        "name": "Vernon Roche",
        "deck": "realms",
        "row": "close",
        "strength": "10",
        "ability": "hero",
        "filename": "vernon",
        "count": "1",
        "quote": "A partiot... and a real son of a bitch."
    },
    "nr_ves": {
        "name": "Ves",
        "deck": "realms",
        "row": "close",
        "strength": "7",
        "ability": "",
        "filename": "ves",
        "count": "1",
        "quote": "Better to live one day as a king than a whole life as a beggar."
    },
    "nr_trebuchet": {
        "name": "Trebuchet",
        "deck": "realms",
        "row": "siege",
        "strength": "6",
        "ability": "",
        "filename": "trebuchet",
        "count": "1",
        "quote": "Castle won't batter itself down, now will it? Get them trebuchets rollin'!"
    }
};

var ext_ne_cards = {
    "ne_emhyr_imperial": {
        "name": "Emhyr var Emreis - His Imperial Majesty",
        "deck": "nilfgaard",
        "row": "leader",
        "strength": "",
        "ability": "emhyr_imperial",
        "filename": "emhyr_imperial",
        "count": "1",
        "quote": "The skies wept when my Pavetta died. They will not weep for me."
    },
    "ne_emhyr_emperor": {
        "name": "Emhyr var Emreis - Emperor of Nilfgaard",
        "deck": "nilfgaard",
        "row": "leader",
        "strength": "",
        "ability": "emhyr_emperor",
        "filename": "emhyr_emperor",
        "count": "1",
        "quote": "Your motives do not interest me. Only results."
    },
    "ne_emhyr_whiteflame": {
        "name": "Emhyr var Emreis - the White Flame",
        "deck": "nilfgaard",
        "row": "leader",
        "strength": "",
        "ability": "emhyr_whiteflame",
        "filename": "emhyr_whiteflame",
        "count": "1",
        "quote": "A sword is but one of many tools at a ruler's disposal."
    },
    "ne_emhyr_relentless": {
        "name": "Emhyr var Emreis - The Relentless",
        "deck": "nilfgaard",
        "row": "leader",
        "strength": "",
        "ability": "emhyr_relentless",
        "filename": "emhyr_relentless",
        "count": "1",
        "quote": "They do not call me the Patient. Take care they do not call you the Headless."
    },
    "ne_emhyr_invader_of_the_north": {
        "name": "Emhyr var Emreis - Invader of the North",
        "deck": "nilfgaard",
        "row": "leader",
        "strength": "",
        "ability": "emhyr_invader",
        "filename": "emhyr_invader_of_the_north",
        "count": "1",
        "quote": "Emperors command multitudes, yet cannot control two things: their time and their hearts."
    },
    "ne_cahir": {
        "name": "Cahir Mawr Dyffryn aep Ceallach",
        "deck": "nilfgaard",
        "row": "close",
        "strength": "7",
        "ability": "",
        "filename": "cahir",
        "count": "1",
        "quote": "His eyes flashed under his winged helmet. Fire gleamed from his sword's blade."
    },
    "ne_shilard": {
        "name": "Shilard Fitz-Oesterlen",
        "deck": "nilfgaard",
        "row": "close",
        "strength": "8",
        "ability": "spy",
        "filename": "shilard",
        "count": "1",
        "quote": "Warfare is mere sound and fury - diplomacy is what truly shapes history."
    },
    "ne_renuald": {
        "name": "Renuald aep Matsen",
        "deck": "nilfgaard",
        "row": "close",
        "strength": "2",
        "ability": "invoke",
        "filename": "renuald",
        "count": "1",
        "target": "ne_impera_brigade",
        "quote": "They say the Impera fear nothing. Untrue. Renuald scares them shitless."
    },
    "ne_impera_brigade_1": {
        "name": "Impera Brigade Guard",
        "id": 1,
        "deck": "nilfgaard",
        "row": "close",
        "strength": "3",
        "ability": "bond",
        "filename": "impera_brigade_1",
        "count": "1",
        "target": "ne_impera_brigade",
        "quote": "The Impera Brigade never surrenders. Ever."
    },
    "ne_impera_brigade_2": {
        "name": "Impera Brigade Guard",
        "id": 2,
        "deck": "nilfgaard",
        "row": "close",
        "strength": "3",
        "ability": "bond",
        "filename": "impera_brigade_2",
        "count": "1",
        "target": "ne_impera_brigade",
        "quote": "The Impera Brigade never surrenders. Ever."
    },
    "ne_impera_brigade_3": {
        "name": "Impera Brigade Guard",
        "id": 3,
        "deck": "nilfgaard",
        "row": "close",
        "strength": "3",
        "ability": "bond",
        "filename": "impera_brigade_3",
        "count": "1",
        "target": "ne_impera_brigade",
        "quote": "The Impera Brigade never surrenders. Ever."
    },
    "ne_impera_brigade_4": {
        "name": "Impera Brigade Guard",
        "id": 4,
        "deck": "nilfgaard",
        "row": "close",
        "strength": "3",
        "ability": "bond",
        "filename": "impera_brigade_4",
        "count": "1",
        "target": "ne_impera_brigade",
        "quote": "The Impera Brigade never surrenders. Ever."
    },
    "ne_nauzicaa_1": {
        "name": "Nausicaa Cavalry Rider",
        "id": 1,
        "deck": "nilfgaard",
        "row": "close",
        "strength": "4",
        "ability": "bond",
        "filename": "nauzicaa_1",
        "count": "1",
        "target": "ne_nauzicaa",
        "quote": "The Emperor will teach the North discipline."
    },
    "ne_nauzicaa_2": {
        "name": "Nausicaa Cavalry Rider",
        "id": 2,
        "deck": "nilfgaard",
        "row": "close",
        "strength": "4",
        "ability": "bond",
        "filename": "nauzicaa_2",
        "count": "1",
        "target": "ne_nauzicaa",
        "quote": "The Emperor will teach the North discipline."
    },
    "ne_nauzicaa_3": {
        "name": "Nausicaa Cavalry Rider",
        "id": 3,
        "deck": "nilfgaard",
        "row": "close",
        "strength": "4",
        "ability": "bond",
        "filename": "nauzicaa_3",
        "count": "1",
        "target": "ne_nauzicaa",
        "quote": "The Emperor will teach the North discipline."
    },
    "ne_stefan": {
        "name": "Stefan Skellen",
        "deck": "nilfgaard",
        "row": "close",
        "strength": "9",
        "ability": "spy",
        "filename": "stefan",
        "count": "1",
        "quote": "My mark scards the face of our future empress. That is my proudest achievement."
    },
    "ne_vreemde": {
        "name": "Vreemde",
        "deck": "nilfgaard",
        "row": "agile_cr",
        "strength": "6",
        "ability": "",
        "filename": "vreemde",
        "count": "1",
        "quote": "Discipline is the Empire's deadliest weapon."
    },
    "ne_morteisen": {
        "name": "Morteisen",
        "deck": "nilfgaard",
        "row": "agile_cr",
        "strength": "5",
        "ability": "emissary",
        "filename": "morteisen",
        "count": "1",
        "quote": "No Nordling pikemen or dwarven spearbearers can hope to best trained cavalary."
    },
    "ne_letho": {
        "name": "Letho of Gulet",
        "deck": "nilfgaard",
        "row": "close",
        "strength": "8",
        "ability": "hero scorch_c",
        "filename": "letho",
        "count": "1",
        "quote": "Witchers never die in the beds."
    },
    "ne_menno": {
        "name": "Menno Coehoorn",
        "deck": "nilfgaard",
        "row": "close",
        "strength": "10",
        "ability": "hero",
        "filename": "menno",
        "count": "1",
        "quote": "I'll take an attentive reconnaissance unit over a fine cavalry brigade any day."
    },
    "ne_vattier": {
        "name": "Vattier de Rideaux",
        "deck": "nilfgaard",
        "row": "close",
        "strength": "8",
        "ability": "hero spy",
        "filename": "vattier",
        "count": "1",
        "quote": "There's never been a problem a well-planned assassination couldn't solve."
    },
        "ne_tibor": {
        "name": "Tibor Eggebracht",
        "deck": "nilfgaard",
        "row": "ranged",
        "strength": "7",
        "ability": "hero morale",
        "filename": "tibor",
        "count": "1",
        "quote": "Albaaaa! Forward!! Alba! Long live the Emperor!"
    },
    "ne_assire": {
        "name": "Sorceress: Assire var Anahid",
        "deck": "nilfgaard",
        "row": "ranged",
        "strength": "4",
        "ability": "bond",
        "filename": "assire",
        "count": "1",
        "target": "ne_sorceress",
        "quote": "Nilfgaardian mages do have a choice, servile submission, or the gallows."
    },
    "ne_cynthia": {
        "name": "Sorceress: Cynthia",
        "deck": "nilfgaard",
        "row": "ranged",
        "strength": "4",
        "ability": "bond",
        "filename": "cynthia",
        "count": "1",
        "target": "ne_sorceress",
        "quote": "Cynthia's talents can be deadly. She needs a tight leash."
    },
    "ne_fringilla": {
        "name": "Sorceress: Fringilla Vigo",
        "deck": "nilfgaard",
        "row": "ranged",
        "strength": "4",
        "ability": "bond",
        "filename": "fringilla",
        "count": "1",
        "target": "ne_sorceress",
        "quote": "Magic is the highest good. It transcends all borders and divisions."
    },
    "ne_black_archer": {
        "name": "Black Infantry Archer",
        "deck": "nilfgaard",
        "row": "ranged",
        "strength": "7",
        "ability": "",
        "filename": "black_archer",
        "count": "1",
        "quote": "I aim for the knee. Always."
    },
    "ne_black_archer_1": {
        "name": "Black Infantry Archer",
        "deck": "nilfgaard",
        "row": "ranged",
        "strength": "7",
        "ability": "",
        "filename": "black_archer_1",
        "count": "1",
        "quote": "I aim for the knee. Always."
    },
    "ne_albrich": {
        "name": "Albrich",
        "deck": "nilfgaard",
        "row": "ranged",
        "strength": "3",
        "ability": "medic",
        "filename": "albrich",
        "count": "1",
        "quote": "A fireball? Of course. Whatever Your Imperial Majesty whishes."
    },
    "ne_young_emissary_1": {
        "name": "Young Emissary",
        "id": 1,
        "deck": "nilfgaard",
        "row": "close",
        "strength": "4",
        "ability": "emissary",
        "filename": "young_emissary_1",
        "count": "1",
        "quote": "If I acquit myself well, perhaps next they'll post me somewhere more civilized."
    },
    "ne_young_emissary_2": {
        "name": "Young Emissary",
        "id": 2,
        "deck": "nilfgaard",
        "row": "close",
        "strength": "4",
        "ability": "emissary",
        "filename": "young_emissary_2",
        "count": "1",
        "quote": "If I acquit myself well, perhaps next they'll post me somewhere more civilized."
    },
    "ne_puttkammer": {
        "name": "Puttkammer",
        "deck": "nilfgaard",
        "row": "ranged",
        "strength": "2",
        "ability": "horn",
        "filename": "puttkammer",
        "count": "1",
        "quote": "Learned a lot at Braibant Military Academy. How to scrub potatoes, for instance."
    },
    "ne_archer_support": {
        "name": "Etolian Auxiliary Archers",
        "deck": "nilfgaard",
        "row": "ranged",
        "strength": "5",
        "ability": "morale",
        "filename": "archer_support",
        "count": "1",
        "quote": "Double or nothing, aim for his cock"
    },
    "ne_archer_support_1": {
        "name": "Etolian Auxiliary Archers",
        "deck": "nilfgaard",
        "row": "ranged",
        "strength": "5",
        "ability": "morale",
        "filename": "archer_support_1",
        "count": "1",
        "quote": "Double or nothing, aim for his cock"
    },
    "ne_moorvran": {
        "name": "Morvran Voorhis",
        "deck": "nilfgaard",
        "row": "siege",
        "strength": "10",
        "ability": "hero",
        "filename": "moorvran",
        "count": "1",
        "quote": "Summer sun reflecting in the quiet waters of Alba - that's Nilfgaard to me."
    }
};

var ext_mo_cards = {
    "mo_eredin_commander": {
        "name": "Eredin - Commander of the Red Riders",
        "deck": "monsters",
        "row": "leader",
        "strength": "",
        "ability": "eredin_commander",
        "filename": "eredin_commander",
        "count": "1",
        "quote": "Go on. Show me your spins, pirouettes and feints. I want to watch."
    },
    "mo_eredin_bringer_of_death": {
        "name": "Eredin - Bringer of Death",
        "deck": "monsters",
        "row": "leader",
        "strength": "",
        "ability": "eredin_bringer_of_death",
        "filename": "eredin_bringer_of_death",
        "count": "1",
        "quote": "It is unavoidable."
    },
    "mo_eredin_destroyer": {
        "name": "Eredin - Destroyer of Worlds",
        "deck": "monsters",
        "row": "leader",
        "strength": "",
        "ability": "eredin_destroyer",
        "filename": "eredin_destroyer",
        "count": "1",
        "quote": "I've long awaited this..."
    },
    "mo_eredin_king": {
        "name": "Eredin - King of the Wild Hunt",
        "deck": "monsters",
        "row": "leader",
        "strength": "",
        "ability": "eredin_king",
        "filename": "eredin_king",
        "count": "1",
        "quote": "Have some dignity. You know how this will end."
    },
    "mo_eredin_the_treacherous": {
        "name": "Eredin Bréacc Glas - The Treacherous",
        "deck": "monsters",
        "row": "leader",
        "strength": "",
        "ability": "eredin_treacherous",
        "filename": "eredin_the_treacherous",
        "count": "1",
        "quote": "I'm enjoying this. You are my toy."
    },
    "mo_ghoul": {
        "name": "Ghoul",
        "deck": "monsters",
        "row": "close",
        "strength": "4",
        "ability": "necrophage",
        "filename": "ghoul",
        "count": "1",
        "quote": "If ghouls are part of the Circle of Life... then it's a damn vicious circle."
    },
    "mo_cow": {
        "name": "Cow",
        "deck": "monsters",
        "row": "ranged",
        "strength": "0",
        "ability": "avenger",
        "filename": "cow",
        "count": "1",
        "target": "mo_bovine_defense",
        "quote": "Mooo!"
    },
    "mo_bovine_defense": {
        "name": "Bovine Defense Force",
        "deck": "monsters",
        "row": "close",
        "strength": "7",
        "ability": "",
        "filename": "chort",
        "count": "0",
        "quote": "Grrrrr!"
    },
    "mo_forktail": {
        "name": "Forktail",
        "deck": "monsters",
        "row": "close",
        "strength": "3",
        "ability": "scorch_c",
        "filename": "forktail",
        "count": "1",
        "quote": "Fork tail.. Bah! Fuckers' tails're more like cleavers."
    },
    "mo_werewolf": {
        "name": "Werewolf",
        "deck": "monsters",
        "row": "close",
        "strength": "8",
        "ability": "",
        "filename": "werewolf",
        "count": "1",
        "quote": "Wolves aren't as bad as they say. Werewolves, though - they're worse."
    },
    "mo_witch_velen": {
        "name": "Crone - Brewess",
        "id": 1,
        "deck": "monsters",
        "row": "close",
        "strength": "6",
        "ability": "muster",
        "filename": "witch_velen",
        "count": "1",
        "target": "mo_witch_velen",
        "quote": "We'll cut you up, boy. A fina broth you will make."
    },
    "mo_witch_velen_1": {
        "name": "Crone - Weavess",
        "id": 2,
        "deck": "monsters",
        "row": "close",
        "strength": "6",
        "ability": "muster",
        "filename": "witch_velen_1",
        "count": "1",
        "target": "mo_witch_velen",
        "quote": "I sense your pain. I see your fear..."
    },
    "mo_witch_velen_2": {
        "name": "Crone - Whispess",
        "id": 3,
        "deck": "monsters",
        "row": "close",
        "strength": "6",
        "ability": "muster",
        "filename": "witch_velen_2",
        "count": "1",
        "target": "mo_witch_velen",
        "quote": "I'l be your best - and last."
    },
    "mo_bruxa": {
        "name": "Vampire - Bruxa",
        "id": 1,
        "deck": "monsters",
        "row": "close",
        "strength": "4",
        "ability": "muster",
        "filename": "bruxa",
        "count": "1",
        "target": "mo_vampire",
        "quote": "A vile, bloodthirsty, man-eating hag. Kind of like my mother-in-law."
    },
    "mo_ekkima": {
        "name": "Vampire - Ekimmara",
        "id": 2,
        "deck": "monsters",
        "row": "close",
        "strength": "4",
        "ability": "muster",
        "filename": "ekkima",
        "count": "1",
        "target": "mo_vampire",
        "quote": "Who would think overgrown bats would have a taste for gaudy jewelry?"
    },
    "mo_fleder": {
        "name": "Vampire - Fleder",
        "id": 3,
        "deck": "monsters",
        "row": "close",
        "strength": "4",
        "ability": "muster",
        "filename": "fleder",
        "count": "1",
        "target": "mo_vampire",
        "quote": "Higher vampieres embrace their victims. Fleders rim them to shreds."
    },
    "mo_garkain": {
        "name": "Vampire - Garkain",
        "id": 4,
        "deck": "monsters",
        "row": "close",
        "strength": "4",
        "ability": "muster",
        "filename": "garkain",
        "count": "1",
        "target": "mo_vampire",
        "quote": "Blood-drinkers and corpse-eaters so foul their very ugliness paralyses foes."
    },
    "mo_katakan": {
        "name": "Vampire - Katakan",
        "id": 5,
        "deck": "monsters",
        "row": "close",
        "strength": "5",
        "ability": "muster",
        "filename": "katakan",
        "count": "1",
        "target": "mo_vampire",
        "quote": "Drinking the blood of the Continent since the Conjunction."
    },
    "mo_imlerith": {
        "name": "Imlerith",
        "deck": "monsters",
        "row": "close",
        "strength": "10",
        "ability": "hero",
        "filename": "imlerith",
        "count": "1",
        "quote": "Ladd nahw! Kill them! Litter the earth with their entrails!"
    },
    "mo_celaeno_harpy": {
        "name": "Celaeno Harpy",
        "deck": "monsters",
        "row": "close",
        "strength": "8",
        "ability": "hero spy",
        "filename": "celaeno_harpy",
        "count": "1",
        "quote": "Common harpies feed on carrion. Calaeno harpies... they feed on dreams."
    },
    "mo_kayran": {
        "name": "Kayran",
        "deck": "monsters",
        "row": "agile_cr",
        "strength": "8",
        "ability": "hero morale",
        "filename": "kayran",
        "count": "1",
        "quote": "Kill a kayran? Simple. Take your best sword... then sell it and hire a witcher."
    },
    "mo_gaunter_odimm": {
        "name": "Gaunter O'Dimm",
        "deck": "monsters",
        "row": "siege",
        "strength": "8",
        "ability": "hero goetia",
        "filename": "gaunter_odimm",
        "count": "1",
        "quote": "He always grants exactly what you wish for. That's the problem."
    },
    "mo_gaunter_odimm_darkness": {
        "name": "Gaunter O'Dimm - Darkness",
        "deck": "monsters",
        "row": "agile_crs",
        "strength": "5",
        "ability": "goetia",
        "filename": "gaunter_odimm_darkness",
        "count": 1,
        "quote": "Fear not the shadows, but the light."
    },
    "mo_nekker": {
        "name": "Nekker",
        "id": 1,
        "deck": "monsters",
        "row": "ranged",
        "strength": "5",
        "ability": "muster",
        "filename": "nekker",
        "count": "1",
        "target": "mo_nekker",
        "quote": "Damn things are almost cute, if you ignore the whole vicious killer aspect."
    },
    "mo_nekker_1": {
        "name": "Nekker",
        "id": 1,
        "deck": "monsters",
        "row": "ranged",
        "strength": "5",
        "ability": "muster",
        "filename": "nekker_1",
        "count": "1",
        "target": "mo_nekker",
        "quote": "Damn things are almost cute, if you ignore the whole vicious killer aspect."
    },
    "mo_nekker_2": {
        "name": "Nekker",
        "id": 3,
        "deck": "monsters",
        "row": "ranged",
        "strength": "5",
        "ability": "muster",
        "filename": "nekker_2",
        "count": "1",
        "target": "mo_nekker",
        "quote": "Damn things are almost cute, if you ignore the whole vicious killer aspect."
    },
    "mo_foglet": {
        "name": "Foglet",
        "deck": "monsters",
        "row": "ranged",
        "strength": "6",
        "ability": "fog_summoning",
        "filename": "foglet",
        "count": "1",
        "quote": "Fog creeps on little cat feet. Foglets creep over the bodies of their victims."
    },
    "mo_plague_maiden": {
        "name": "Plague Maiden",
        "deck": "monsters",
        "row": "ranged",
        "strength": "4",
        "ability": "medic",
        "filename": "plague_maiden",
        "count": "1",
        "quote": "The sick rave about a boil-pocked woman surrounded by herds of rabid rats..."
    },
    "mo_toad": {
        "name": "Toad",
        "deck": "monsters",
        "row": "ranged",
        "strength": "5",
        "ability": "scorch_r",
        "filename": "toad",
        "count": "1",
        "quote": "Big. Bad. Ugly. Squats in the sewers."
    },
    "mo_gravehag": {
        "name": "Grave Hag",
        "deck": "monsters",
        "row": "ranged",
        "strength": "5",
        "ability": "necrophage",
        "filename": "gravehag",
        "count": "1",
        "quote": "Their long tongues're for slurping marrow - and whipping prey."
    },
    "mo_leshen": {
        "name": "Leshen",
        "deck": "monsters",
        "row": "ranged",
        "strength": "10",
        "ability": "hero",
        "filename": "leshen",
        "count": "1",
        "quote": "We never hunt in these woods. Not even if it means the whole village starves."
    },
    "mo_caranthir": {
        "name": "Caranthir Ar-Feiniel",
        "deck": "monsters",
        "row": "ranged",
        "strength": "6",
        "ability": "hero frost",
        "filename": "caranthir",
        "count": "1",
        "quote": "Zirael! I await."
    },
    "mo_wyvern": {
        "name": "Wyvern",
        "deck": "monsters",
        "row": "agile_rs",
        "strength": "7",
        "ability": "",
        "filename": "wyvern",
        "count": "1",
        "quote": "Imagine a cross between a winged snake and a nightmare. Wyverns are worse."
    },
    "mo_gryffin": {
        "name": "Griffin",
        "deck": "monsters",
        "row": "agile_rs",
        "strength": "7",
        "ability": "",
        "filename": "gryffin",
        "count": "1",
        "quote": "Griffins like to toy with their prey. Eat 'em alive, piece by piece."
    },
    "mo_arachas": {
        "name": "Arachas ",
        "id": 1,
        "deck": "monsters",
        "row": "siege",
        "strength": "4",
        "ability": "muster",
        "filename": "arachas",
        "count": "1",
        "target": "mo_arachas",
        "quote": "Ugly - nature's way of saying 'Stay the fuck away'"
    },
    "mo_arachas_1": {
        "name": "Arachas ",
        "id": 2,
        "deck": "monsters",
        "row": "siege",
        "strength": "4",
        "ability": "muster",
        "filename": "arachas_1",
        "count": "1",
        "target": "mo_arachas",
        "quote": "Ugly - nature's way of saying 'Stay the fuck away'"
    },
    "mo_arachas_2": {
        "name": "Arachas ",
        "id": 3,
        "deck": "monsters",
        "row": "siege",
        "strength": "4",
        "ability": "muster",
        "filename": "arachas_2",
        "count": "1",
        "target": "mo_arachas",
        "quote": "Ugly - nature's way of saying 'Stay the fuck away'"
    },
    "mo_arachas_behemoth": {
        "name": "Arachas- Behemoth",
        "id": 4,
        "deck": "monsters",
        "row": "siege",
        "strength": "5",
        "ability": "muster",
        "filename": "arachas_behemoth",
        "count": "1",
        "target": "mo_arachas",
        "quote": "Like a cross between a crab, a spider... and a ploughin' moutain."
    },
    "mo_draug": {
        "name": "Draug",
        "deck": "monsters",
        "row": "siege",
        "strength": "10",
        "ability": "hero",
        "filename": "draug",
        "count": "1",
        "quote": "Some men cannot admit defeat. Some keep fighting from beyond the grave."
    },
};

var ext_st_cards = {
    "sc_francesca_queen": {
        "name": "Francesca Findabair - Queen of Dol Blathanna",
        "deck": "scoiatael",
        "row": "leader",
        "strength": "",
        "ability": "francesca_queen",
        "filename": "francesca_queen",
        "count": "1",
        "quote": "Ash shall fertilize the soil. By spring, the valley shall bloom once more."
    },
    "sc_francesca_beautiful": {
        "name": "Francesca Findabair - the Beautiful",
        "deck": "scoiatael",
        "row": "leader",
        "strength": "",
        "ability": "francesca_beautiful",
        "filename": "francesca_beautiful",
        "count": "1",
        "quote": "The Elder Races have forgotten more than humans can ever hope to know."
    },
    "sc_francesca_daisy": {
        "name": "Francesca Findabair - Daisy of the Valley",
        "deck": "scoiatael",
        "row": "leader",
        "strength": "",
        "ability": "francesca_daisy",
        "filename": "francesca_daisy",
        "count": "1",
        "quote": "Do not let my beauty distract your aim."
    },
    "sc_francesca_pureblood": {
        "name": "Francesca Findabair - Pureblood Elf",
        "deck": "scoiatael",
        "row": "leader",
        "strength": "",
        "ability": "francesca_pureblood",
        "filename": "francesca_pureblood",
        "count": "1",
        "quote": "To live in peave, we first must kill. This is human oppression's cruel finale."
    },
    "sc_francesca_hope_of_the_aen_seidhe": {
        "name": "Francesca Findabair - Hope of the Aen Seidhe",
        "deck": "scoiatael",
        "row": "leader",
        "strength": "",
        "ability": "francesca_hope",
        "filename": "francesca_hope_of_the_aen_seidhe",
        "count": "1",
        "quote": "Daede sian caente, Aen Seidhe en'allane ael coeden..."
    },
    "sc_riordain": {
        "name": "Riordain",
        "deck": "scoiatael",
        "row": "close",
        "strength": "1",
        "ability": "scorch_c",
        "filename": "riordain",
        "count": "1",
        "quote": "Stare into their eyes, feast on their terror. Then go in for the kill."
    },
    "sc_havekar_support": {
        "name": "Havekar Smuggler",
        "id": 1,
        "deck": "scoiatael",
        "row": "close",
        "strength": "5",
        "ability": "muster",
        "filename": "havekar_support",
        "count": "1",
        "target": "sc_havekar_support",
        "quote": "I fight for whoever's paying the best. Or whoever's easiest to rob."
    },
    "sc_havekar_support_1": {
        "name": "Havekar Smuggler",
        "id": 2,
        "deck": "scoiatael",
        "row": "close",
        "strength": "5",
        "ability": "muster",
        "filename": "havekar_support_1",
        "count": "1",
        "target": "sc_havekar_support",
        "quote": "I fight for whoever's paying the best. Or whoever's easiest to rob."
    },
    "sc_havekar_support_2": {
        "name": "Havekar Smuggler",
        "id": 3,
        "deck": "scoiatael",
        "row": "close",
        "strength": "5",
        "ability": "muster",
        "filename": "havekar_support_2",
        "count": "1",
        "target": "sc_havekar_support",
        "quote": "I fight for whoever's paying the best. Or whoever's easiest to rob."
    },
    "sc_dennis": {
        "name": "Dennis Cranmer",
        "deck": "scoiatael",
        "row": "close",
        "strength": "8",
        "ability": "",
        "filename": "dennis",
        "count": "1",
        "quote": "I know how to carry out orders, so you can shove you advice up your coal chute."
    },
    "sc_mahakam": {
        "name": "Mahakaman Defender",
        "deck": "scoiatael",
        "row": "close",
        "strength": "7",
        "ability": "bond",
        "filename": "mahakam",
        "count": "1",
        "target": "sc_mahakam_defender",
        "quote": "I'm telling ye, we're born for battle - we slash straight at their kneed!"
    },
    "sc_mahakam_1": {
        "name": "Mahakaman Defender",
        "deck": "scoiatael",
        "row": "close",
        "strength": "7",
        "ability": "bond",
        "filename": "mahakam_1",
        "count": "1",
        "target": "sc_mahakam_defender",
        "quote": "I'm telling ye, we're born for battle - we slash straight at their kneed!"
    },
    "sc_barclay": {
        "name": "Barclay Els",
        "deck": "scoiatael",
        "row": "close",
        "strength": "2",
        "ability": "horn",
        "filename": "barclay",
        "count": "1",
        "quote": "Our mead smells like piss, do it? Easy to fix - I'll break your fuckin' nose!"
    },
        "sc_isengrim": {
        "name": "Isengrim Faoiltiarna",
        "deck": "scoiatael",
        "row": "close",
        "strength": "10",
        "ability": "hero morale",
        "filename": "isengrim",
        "count": "1",
        "quote": "It dawns on them once they notice my scar: a realization of imminent death."
    },
    "sc_dol_infantry_1": {
        "name": "Dol Blathanna Scout",
        "deck": "scoiatael",
        "row": "agile_cr",
        "strength": "5",
        "ability": "muster",
        "filename": "dol_infantry_1",
        "count": "1",
        "target": "sc_dol_infantry",
        "quote": "They track like hounds, run like deer and kill like cold-hearted bastards."
    },
    "sc_dol_infantry_2": {
        "name": "Dol Blathanna Scout",
        "deck": "scoiatael",
        "row": "agile_cr",
        "strength": "5",
        "ability": "muster",
        "filename": "dol_infantry_2",
        "count": "1",
        "target": "sc_dol_infantry",
        "quote": "They track like hounds, run like deer and kill like cold-hearted bastards."
    },
    "sc_vrihedd_cadet": {
        "name": "Vrihedd Brigade Recruit",
        "deck": "scoiatael",
        "row": "agile_cr",
        "strength": "4",
        "ability": "decoy",
        "filename": "vrihedd_cadet",
        "count": "1",
        "quote": "Hatred burns brighter than any fire, and cuts deeper than any blade."
    },
    "sc_vrihedd_brigade_1": {
        "name": "Vrihedd Brigade Veteran",
        "deck": "scoiatael",
        "row": "agile_cs",
        "strength": "7",
        "ability": "",
        "filename": "vrihedd_brigade_1",
        "count": "1",
        "quote": "'Vrihedd? What's that mean?' 'Trouble.'"
    },
    "sc_saskia": {
        "name": "Saesenthessis",
        "deck": "scoiatael",
        "row": "agile_cr",
        "strength": "7",
        "ability": "hero morale",
        "filename": "saskia",
        "count": "1",
        "quote": "Beautiful, pure, fierce - the perfect icon for a rebellion."
    },
    "sc_havekar_nurse": {
        "name": "Havekar Healer",
        "deck": "scoiatael",
        "row": "ranged",
        "strength": "2",
        "ability": "medic",
        "filename": "havekar_nurse",
        "count": "1",
        "quote": "Sure, I'll patch you up. Gonna cost you, though."
    },
    "sc_havekar_nurse_1": {
        "name": "Havekar Healer",
        "deck": "scoiatael",
        "row": "ranged",
        "strength": "2",
        "ability": "medic",
        "filename": "havekar_nurse_1",
        "count": "1",
        "quote": "Sure, I'll patch you up. Gonna cost you, though."
    },
    "sc_havekar_nurse_2": {
        "name": "Havekar Healer",
        "deck": "scoiatael",
        "row": "ranged",
        "strength": "2",
        "ability": "medic",
        "filename": "havekar_nurse_2",
        "count": "1",
        "quote": "Sure, I'll patch you up. Gonna cost you, though."
    },
    "sc_elf_skirmisher": {
        "name": "Elven Skirmisher",
        "id": 1,
        "deck": "scoiatael",
        "row": "ranged",
        "strength": "4",
        "ability": "muster",
        "filename": "elf_skirmisher",
        "count": "1",
        "target": "sc_elf_skirmisher",
        "quote": "No matter what you may have heard, elves don't take human scalps. Too much lice."
    },
    "sc_elf_skirmisher_1": {
        "name": "Elven Skirmisher",
        "id": 2,
        "deck": "scoiatael",
        "row": "ranged",
        "strength": "4",
        "ability": "muster",
        "filename": "elf_skirmisher_1",
        "count": "1",
        "target": "sc_elf_skirmisher",
        "quote": "No matter what you may have heard, elves don't take human scalps. Too much lice."
    },
    "sc_elf_skirmisher_2": {
        "name": "Elven Skirmisher",
        "id": 3,
        "deck": "scoiatael",
        "row": "ranged",
        "strength": "4",
        "ability": "muster",
        "filename": "elf_skirmisher_2",
        "count": "1",
        "target": "sc_elf_skirmisher",
        "quote": "No matter what you may have heard, elves don't take human scalps. Too much lice."
    },
    "sc_dol_archer": {
        "name": "Dol Blathanna Archer",
        "deck": "scoiatael",
        "row": "ranged",
        "strength": "8",
        "ability": "",
        "filename": "dol_archer",
        "count": "1",
        "quote": "Take another step, dh'oine. You'd look better with an arrow between your eyes."
    },
    "sc_milva": {
        "name": "Milva",
        "deck": "scoiatael",
        "row": "ranged",
        "strength": "6",
        "ability": "morale",
        "filename": "milva",
        "count": "1",
        "quote": "With each arrow I loose, I think of my da. He'd be proud. I think."
    },
    "sc_iorveth": {
        "name": "Iorveth",
        "deck": "scoiatael",
        "row": "ranged",
        "strength": "10",
        "ability": "hero morale",
        "filename": "iorveth",
        "count": "1",
        "quote": "King or beggar, what's the difference? One dh'oine less."
    },
    "sc_vrihedd_brigade": {
        "name": "Vrihedd Brigade Veteran",
        "deck": "scoiatael",
        "row": "agile_rs",
        "strength": "7",
        "ability": "",
        "filename": "vrihedd_brigade",
        "count": "1",
        "quote": "'Vrihedd? What's that mean?' 'Trouble.'"
    },
    "sc_yaevinn": {
        "name": "Yaevinn",
        "deck": "scoiatael",
        "row": "agile_crs",
        "strength": "6",
        "ability": "",
        "filename": "yaevinn",
        "count": "1",
        "quote": "We are drops of rain that together make a ferocious storm."
    },
    "sc_toruviel": {
        "name": "Toruviel",
        "deck": "scoiatael",
        "row": "agile_crs",
        "strength": "6",
        "ability": "",
        "filename": "toruviel",
        "count": "1",
        "quote": "I'd gladly kill you from up close, stare in your eyese... But you reek, human."
    },
    "sc_filavandrel": {
        "name": "Filavandrel aen Fidhail",
        "deck": "scoiatael",
        "row": "agile_crs",
        "strength": "6",
        "ability": "",
        "filename": "filavandrel",
        "count": "1",
        "quote": "Though we are now few and scattered, our hearts burn brighter than ever."
    },
    "sc_temptress": {
        "name": "Temptress",
        "deck": "scoiatael",
        "row": "agile_crs",
        "strength": "0",
        "ability": "hero ambush",
        "filename": "temptress",
        "count": "1",
        "quote": "Hey! Would you like to have some fun?"
    },
    "sc_schirru": {
        "name": "Schirru",
        "deck": "scoiatael",
        "row": "siege",
        "strength": "8",
        "ability": "scorch_s",
        "filename": "schirru",
        "count": "1",
        "quote": "Time to look death in the face."
    }
};

var ext_sk_cards = {
    "spe_mardroeme": {
        "name": "Mardroeme",
        "deck": "special skellige",
        "row": "",
        "strength": "",
        "ability": "mardroeme",
        "filename": "mardroeme",
        "count": "3",
        "quote": "Eat enough of them, and the world will never be the same..."
    },
    "spe_skellige_fleet": {
        "name": "Skellige Fleet",
        "deck": "special skellige",
        "row": "",
        "strength": "",
        "ability": "skellige_fleet",
        "filename": "skellige_fleet",
        "count": "3",
        "quote": "Look at the horizon! They are coming!"
    },
    "spe_storm": {
        "name": "Skellige Storm",
        "deck": "weather skellige",
        "row": "",
        "strength": "",
        "ability": "storm",
        "filename": "storm",
        "count": "2",
        "quote": "This ain't no normal storm. This here's the wrath of the gods."
    },
    "sk_crach_an_craite": {
        "name": "Crach an Craite",
        "deck": "skellige",
        "row": "leader",
        "strength": "",
        "ability": "crach_an_craite",
        "filename": "crach_an_craite",
        "count": "0",
        "quote": "A king's gotta be wise. A king's gotta command respect. A king's gotta have stones."
    },
    "sk_king_bran": {
        "name": "Bran an Tuirseach: Iron King",
        "deck": "skellige",
        "row": "leader",
        "strength": "",
        "ability": "king_bran",
        "filename": "king_bran",
        "count": "0",
        "quote": "No one can replace Bran. Though they're sure to try."
    },
    "sk_birna": {
        "name": "Birna Bran: Conspirator",
        "deck": "skellige",
        "row": "leader",
        "strength": "",
        "ability": "birna",
        "filename": "birna",
        "count": "0",
        "quote": "Skellige must have a strong king. No matter what it takes."
    },
    "sk_madman_lugos": {
        "name": "Lugos an Drummond: Madman",
        "deck": "skellige",
        "row": "leader",
        "strength": "",
        "ability": "madman_lugos",
        "filename": "madman_lugos",
        "count": "0",
        "quote": "WAAAAAAAGH!!!!"
    },
    "sk_holger": {
        "name": "Holger an Dimun: Blackhand",
        "deck": "skellige",
        "row": "leader",
        "strength": "",
        "ability": "holger_blakhand",
        "filename": "holger_blakhand",
        "count": "0",
        "quote": "Now let's drink to Emperor of Nilfgaard - may his prick forever stay limp!"
    },
    "sk_arnvald": {
        "name": "Arnvald",
        "deck": "skellige",
        "row": "close",
        "strength": "2",
        "ability": "mardroeme",
        "filename": "arnvald",
        "count": "1",
        "quote": "His name on the island was synonymous with loyalty. For a time."
    },
    "sk_kambi": {
        "name": "Kambi",
        "deck": "skellige",
        "row": "close",
        "strength": "0",
        "ability": "avenger",
        "filename": "kambi",
        "count": "1",
        "target": "sk_hemdall",
        "quote": "When the time comes, the cockerel Kambi shall crow and awaken Hemdall."
    },
    "sk_shield_maiden_1": {
        "name": "Clan Drummond Shield Maiden",
        "id": 1,
        "deck": "skellige",
        "row": "close",
        "strength": "4",
        "ability": "bond",
        "filename": "shield_maiden_1",
        "count": "1",
        "target": "sk_shield_maiden",
        "quote": "They'll shatter on our shields like waves on a rocky shore."
    },
    "sk_shield_maiden_2": {
        "name": "Clan Drummond Shield Maiden",
        "id": 2,
        "deck": "skellige",
        "row": "close",
        "strength": "4",
        "ability": "bond",
        "filename": "shield_maiden_2",
        "count": "1",
        "target": "sk_shield_maiden",
        "quote": "They'll shatter on our shields like waves on a rocky shore."
    },
    "sk_shield_maiden_3": {
        "name": "Clan Drummond Shield Maiden",
        "id": 3,
        "deck": "skellige",
        "row": "close",
        "strength": "4",
        "ability": "bond",
        "filename": "shield_maiden_3",
        "count": "1",
        "target": "sk_shield_maiden",
        "quote": "They'll shatter on our shields like waves on a rocky shore."
    },
    "sk_draig": {
        "name": "Draig Bon-Dhu",
        "deck": "skellige",
        "row": "close",
        "strength": "3",
        "ability": "horn",
        "filename": "draig",
        "count": "1",
        "quote": "Hear ye now the tale of the heroic deeds of Clan an Craite."
    },
    "sk_donar": {
        "name": "Donar an Hindar",
        "deck": "skellige",
        "row": "close",
        "strength": "8",
        "ability": "",
        "filename": "donar",
        "count": "1",
        "quote": "I've gathered all the jarls together. Now make your case."
    },
    "sk_craite_warrior_1": {
        "name": "Clan an Craite Warrior",
        "id": 1,
        "deck": "skellige",
        "row": "close",
        "strength": "6",
        "ability": "bond",
        "filename": "craite_warrior_1",
        "count": "1",
        "target": "sk_craite_warrior",
        "quote": "I'll bring the an Craites such glory, bards'll go hoarse singin' me praises!"
    },
    "sk_craite_warrior_2": {
        "name": "Clan an Craite Warrior",
        "id": 2,
        "deck": "skellige",
        "row": "close",
        "strength": "6",
        "ability": "bond",
        "filename": "craite_warrior_2",
        "count": "1",
        "target": "sk_craite_warrior",
        "quote": "I'll bring the an Craites such glory, bards'll go hoarse singin' me praises!"
    },
    "sk_cerys": {
        "name": "Cerys",
        "id": 4,
        "deck": "skellige",
        "row": "close",
        "strength": "7",
        "ability": "hero invoke",
        "filename": "cerys",
        "count": "1",
        "target": "sk_shield_maiden",
        "quote": "They call me Sparrowhawk, know why? Because I eat rats like you for breakfast."
    },
    "sk_hemdall": {
        "name": "Hemdall",
        "deck": "skellige",
        "row": "close",
        "strength": "11",
        "ability": "hero",
        "filename": "hemdall",
        "count": "1",
        "quote": "When the time of the White Frost comes, Hemdall will sound the call for battle."
    },
    "sk_hjalmar": {
        "name": "Hjalmar an Craite",
        "deck": "skellige",
        "row": "close",
        "strength": "10",
        "ability": "hero morale",
        "filename": "hjalmar",
        "count": "1",
        "quote": "Instead of mournin' the fallen, let's drink to their memory!"
    },
    "sk_young_berserker_1": {
        "name": "Young Berserker",
        "id": 1,
        "deck": "skellige",
        "row": "agile_cr",
        "strength": "3",
        "ability": "berserker",
        "filename": "young_berserker_1",
        "count": "1",
        "target": "sk_transformed_young_berserker",
        "quote": "Want some?"
    },
    "sk_young_berserker_2": {
        "name": "Young Berserker",
        "id": 2,
        "deck": "skellige",
        "row": "agile_cr",
        "strength": "3",
        "ability": "berserker",
        "filename": "young_berserker_2",
        "count": "1",
        "target": "sk_transformed_young_berserker",
        "quote": "Blood for Svalblod! Skulls for his throne!"
    },
    "sk_young_berserker_3": {
        "name": "Young Berserker",
        "id": 3,
        "deck": "skellige",
        "row": "agile_cr",
        "strength": "3",
        "ability": "berserker",
        "filename": "young_berserker_3",
        "count": "1",
        "target": "sk_transformed_young_berserker",
        "quote": "Strike me! C'mon, harder! You call this pain?"
    },
    "sk_transformed_young_berserker": {
        "name": "Transformed Young Berserker",
        "id": 1,
        "deck": "skellige",
        "row": "agile_cr",
        "strength": "9",
        "ability": "bond",
        "filename": "transformed_young_berserker",
        "count": "0",
        "target": "sk_transformed_young_berserker",
        "quote": "Rooaaar!"
    },
    "sk_vildkaarl": {
        "name": "Vildkaarl",
        "deck": "skellige",
        "row": "agile_cr",
        "strength": "4",
        "ability": "berserker",
        "filename": "vildkaarl",
        "count": "1",
        "target": "sk_transformed_vildkaarl",
        "quote": "Kill, crush, cleave!"
    },
    "sk_berserker": {
        "name": "Berserker",
        "deck": "skellige",
        "row": "agile_cr",
        "strength": "5",
        "ability": "berserker",
        "filename": "berserker",
        "count": "1",
        "target": "sk_transformed_berserker",
        "quote": "Mercenaries fight for coin. Knights duel for honor. He kills for blood."
    },
    "sk_transformed_vildkaarl": {
        "name": "Transformed Vildkaarl",
        "deck": "skellige",
        "row": "agile_cr",
        "strength": "14",
        "ability": "scorch",
        "filename": "transformed_vildkaarl",
        "count": "0",
        "quote": "Saw them fight once in my life... and once was enough."
    },
    "sk_transformed_berserker": {
        "name": "Transformed Berserker",
        "deck": "skellige",
        "row": "agile_cr",
        "strength": "16",
        "ability": "morale",
        "filename": "transformed_berserker",
        "count": "0",
        "quote": "This bear taste funny to you? "
    },
    "sk_blueboy": {
        "name": "Blueboy Lugos",
        "deck": "skellige",
        "row": "agile_cr",
        "strength": "6",
        "ability": "",
        "filename": "blueboy",
        "count": "1",
        "quote": "I'm damn near ready to puke from boredom."
    },
    "sk_gremist": {
        "name": "Gremist",
        "deck": "skellige",
        "row": "ranged",
        "strength": "3",
        "ability": "medic",
        "filename": "gremist",
        "count": "1",
        "quote": "An archdruid, a master of alchemy, and the grumpiest old fart in the Isles."
    },
    "sk_brokva_archer": {
        "name": "Clan Brokvar Archer",
        "deck": "skellige",
        "row": "ranged",
        "strength": "8",
        "ability": "",
        "filename": "brokva_archer",
        "count": "1",
        "quote": "So ye can hit a movin' target at two hundred paces. Me, too. In a storm."
    },
    "sk_ermion": {
        "name": "Ermion",
        "deck": "skellige",
        "row": "ranged",
        "strength": "7",
        "ability": "hero mardroeme",
        "filename": "ermion",
        "count": "1",
        "quote": "Only the ignorant dismiss the importance of myths."
    },
    "sk_longship_1": {
        "name": "Longship: Black Helga",
        "id": 1,
        "deck": "skellige",
        "row": "siege",
        "strength": "6",
        "ability": "bond",
        "filename": "longship_1",
        "count": "1",
        "target": "sk_longship",
        "quote": "You can't take it upriver, but you can certainly take it to the cahse of the imperial fleet."
    },
    "sk_longship_2": {
        "name": "Longship: Ulfhedinn",
        "id": 2,
        "deck": "skellige",
        "row": "siege",
        "strength": "6",
        "ability": "bond",
        "filename": "longship_2",
        "count": "1",
        "target": "sk_longship",
        "quote": "Ulfhedinn? Is it a fish? Oh, no, no... this is something far, far worse."
    },
    "sk_longship_3": {
        "name": "Longship: Ragnarök",
        "id": 3,
        "deck": "skellige",
        "row": "siege",
        "strength": "6",
        "ability": "bond",
        "filename": "longship_3",
        "count": "1",
        "target": "sk_longship",
        "quote": "The sea's ours, along with everythin' that floats, swims or sails in it!"
    },
    "sk_war_longship": {
        "name": "War Longship: Sea Terror",
        "deck": "skellige",
        "row": "siege",
        "strength": "8",
        "ability": "",
        "filename": "war_longship",
        "count": "1",
        "quote": "Merely mention this name to a Nilfgaardian, and they'll feel a spreading warmth in their knickers."
    },
    "sk_light_longship_1": {
        "name": "Light Longship: Sail Hound",
        "id": 1,
        "deck": "skellige",
        "row": "siege",
        "strength": "4",
        "ability": "muster",
        "filename": "light_longship_1",
        "count": "1",
        "target": "sk_light_longship",
        "quote": "They are light and fast, perfect for racing down slow merchant frigates."
    },
    "sk_light_longship_2": {
        "name": "Light Longship: Sea Vulture",
        "id": 2,
        "deck": "skellige",
        "row": "siege",
        "strength": "4",
        "ability": "muster",
        "filename": "light_longship_2",
        "count": "1",
        "target": "sk_light_longship",
        "quote": "Escape them? In the waters of Skellige? Good luck."
    },
    "sk_light_longship_3": {
        "name": "Light Longship: Wave Horse",
        "id": 3,
        "deck": "skellige",
        "row": "siege",
        "strength": "4",
        "ability": "muster",
        "filename": "light_longship_3",
        "count": "1",
        "target": "sk_light_longship",
        "quote": "All it takes is a small hole for the largest ship to sink."
    }
};

var ext_re_cards = {
    "spe_execution": {
        "name": "Execution",
        "deck": "special redania",
        "row": "",
        "strength": "",
        "ability": "scorch",
        "filename": "execution",
        "count": "3",
        "quote": "I can't bloody breathe! Won't they burn the wretches someplace else?"
    },
    "spe_royal_decree": {
        "name": "Royal Decree",
        "deck": "special redania",
        "row": "",
        "strength": "",
        "ability": "royal_decree",
        "filename": "royal_decree",
        "count": "3",
        "quote": "...do hereby decree the following..."
    },
    "re_radovid_king_redania": {
        "name": "Radovid: King of Redania",
        "deck": "redania",
        "row": "leader",
        "strength": "",
        "ability": "radovid_king_redania",
        "filename": "radovid_king_redania",
        "count": "1",
        "quote": "Judge. Jury. Excecutioner. King."
    },
    "re_radovid_mad_king": {
        "name": "Radovid: Mad King",
        "deck": "redania",
        "row": "leader",
        "strength": "",
        "ability": "radovid_mad_king",
        "filename": "radovid_mad_king",
        "count": "1",
        "quote": "A king should be merciless towards his enemies and generous to his friends."
    },
    "re_radovid_strategist": {
        "name": "Radovid: Strategist",
        "deck": "redania",
        "row": "leader",
        "strength": "",
        "ability": "radovid_strategist",
        "filename": "radovid_strategist",
        "count": "1",
        "quote": "They say chess teaches one ot think strategically. What a load of rubbish!"
    },
    "re_redanian_knight_1": {
        "name": "Redanian Knight",
        "id": 1,
        "deck": "redania",
        "row": "close",
        "strength": "6",
        "ability": "bond",
        "filename": "redanian_knight_1",
        "target": "re_redanian_knight",
        "count": "1",
        "quote": "For glory! For Radovid!"
    },
    "re_redanian_knight_2": {
        "name": "Redanian Knight",
        "id": 2,
        "deck": "redania",
        "row": "close",
        "strength": "6",
        "ability": "bond",
        "filename": "redanian_knight_2",
        "target": "re_redanian_knight",
        "count": "1",
        "quote": "You can't stop a galloping cavalry horse!"
    },
    "re_priscilla": {
        "name": "Priscilla",
        "deck": "redania",
        "row": "close",
        "strength": "2",
        "ability": "horn",
        "filename": "priscilla",
        "count": "1",
        "quote": "Picture Dandelion in a dress and you've got the general idea."
    },
    "re_redanian_elite": {
        "name": "Redanian Elite",
        "deck": "redania",
        "row": "close",
        "strength": "8",
        "ability": "",
        "filename": "redanian_elite",
        "count": "1",
        "quote": "I'll die for Redania, I'll kill for Redania… I'll even eat worms for Redania!"
    },
    "re_kurt": {
        "name": "Kurt",
        "deck": "redania",
        "row": "close",
        "strength": "5",
        "ability": "witch_hunt",
        "filename": "kurt",
        "count": "1",
        "quote": "Oy, Kurt, find out what Merigold's hollerin' about, if she needs anything. A hot iron to the tongue, maybe?"
    },
    "re_witch_hunter": {
        "name": "Witch Hunter",
        "deck": "redania",
        "row": "close",
        "strength": "5",
        "ability": "witch_hunt",
        "filename": "witch_hunter",
        "count": "1",
        "quote": "Long coats, wide-brimmed hats, and crooked grins – witch hunters are hard to miss."
    },
    "re_olgierd": {
        "name": "Olgierd von Everec",
        "deck": "redania",
        "row": "close",
        "strength": "4",
        "ability": "immortal",
        "filename": "olgierd",
        "count": "1",
        "quote": "At least you now know I don't easily lose my head."
    },
    "re_cyprian_wiley": {
        "name": "Cyprian Wiley: Whoreson Junior",
        "deck": "redania",
        "row": "close",
        "strength": "10",
        "ability": "hero",
        "filename": "cyprian_wiley",
        "count": "1",
        "quote": "A war with Whoreson will see Novigrad's gutters run red with blood."
    },
    "re_carlo_varese": {
        "name": "Carlo Varese: Cleaver",
        "deck": "redania",
        "row": "close",
        "strength": "10",
        "ability": "hero",
        "filename": "carlo_varese",
        "count": "1",
        "quote": "Me hogs willnae go hungry th' day thanks to ye."
    },
    "re_trollololo": {
        "name": "Trollololo",
        "deck": "redania",
        "row": "agile_cs",
        "strength": "7",
        "ability": "",
        "filename": "trollololo",
        "count": "1",
        "quote": "Join me King Ravodid army. Order got – guard boatses."
    },
    "re_caleb_menge": {
        "name": "Caleb Menge",
        "deck": "redania",
        "row": "agile_crs",
        "strength": "0",
        "ability": "hero witch_hunt",
        "filename": "caleb_menge",
        "count": "1",
        "quote": "Deceivers, heretics, witches! They flood our city, corrupt our virtue, and threaten our very way of life!"
    },
    "re_gaunter_odimm": {
        "name": "Gaunter O'Dimm",
        "id": 1,
        "deck": "redania",
        "row": "ranged",
        "strength": "3",
        "ability": "muster",
        "filename": "gaunter_odimm",
        "count": "1",
        "target": "ne_gaunter_odimm",
        "quote": "He always grants exactly what you wish for. That's the problem."
    },
    "re_gaunter_odimm_darkness": {
        "name": "Gaunter O'Dimm - Darkness",
        "id": 2,
        "deck": "redania",
        "row": "ranged",
        "strength": "2",
        "ability": "muster",
        "filename": "gaunter_odimm_darkness",
        "count": "3",
        "target": "ne_gaunter_odimm",
        "quote": "Fear not the shadows, but the light."
    },
    "re_black_cat_dog": {
        "name": "Black Cat and Dog",
        "deck": "redania",
        "row": "ranged",
        "strength": "8",
        "ability": "spy",
        "filename": "black_cat_dog",
        "count": "1",
        "quote": "We'd rather keep our names to ourselves. Think of us as… friends of the house."
    },
    "re_vlodimir_von_everec": {
        "name": "Vlodimir von Everec",
        "deck": "redania",
        "row": "ranged",
        "strength": "4",
        "ability": "immortal",
        "filename": "vlodimir_von_everec",
        "count": "1",
        "quote": "Vlodimir liked to have a good time when he was alive and greatly missed having fun after his death."
    },
    "re_caretaker": {
        "name": "Caretaker",
        "deck": "redania",
        "row": "ranged",
        "strength": "6",
        "ability": "medic",
        "filename": "caretaker",
        "count": "1",
        "quote": "There are more things in heaven and earth than all the world's philosophers have dreamt."
    },
    "re_rico_meiersdorf": {
        "name": "Rico Meiersdorf",
        "deck": "redania",
        "row": "ranged",
        "strength": "7",
        "ability": "spy",
        "filename": "rico_meiersdorf",
        "count": "1",
        "quote": "I never did much like bees."
    },
    "re_moreelse": {
        "name": "Moreelse",
        "deck": "redania",
        "row": "ranged",
        "strength": "5",
        "ability": "witch_hunt",
        "filename": "moreelse",
        "count": "1",
        "quote": "Some witch hunters truly believed the eradication of mages and sorceresses would make the world a better place. Some did not require such justification."
    },
    "re_graden": {
        "name": "Graden",
        "deck": "redania",
        "row": "ranged",
        "strength": "5",
        "ability": "witch_hunt",
        "filename": "graden",
        "count": "1",
        "quote": "Initially, we burned any tomes on black magic we found.Recently we decided it might be wise to read them first."
    },
    "re_shani": {
        "name": "Shani",
        "deck": "redania",
        "row": "ranged",
        "strength": "5",
        "ability": "hero medic",
        "filename": "shani",
        "count": "1",
        "quote": "I'm a medic. I tend to know what I'm doing when I prescribe something."
    },
    "re_iris_von_everec": {
        "name": "Iris von Everec",
        "deck": "redania",
        "row": "ranged",
        "strength": "0",
        "ability": "hero summon_one_of",
        "filename": "iris_von_everec",
        "target": ["re_black_cat_dog","re_caretaker"],
        "count": "1",
        "quote": "I remember so little... Yet when I think of my rose, I begin to recall what was."
    },
    "re_ewald_borsodi": {
        "name": "Ewald Borsodi",
        "deck": "redania",
        "row": "agile_rs",
        "strength": "7",
        "ability": "",
        "filename": "ewald_borsodi",
        "count": "1",
        "quote": "I've crafted this plan for over a year, but now the time's come for action. Can I count on your help?"
    },
    "re_horst_borsodi": {
        "name": "Horst Borsodi",
        "deck": "redania",
        "row": "agile_rs",
        "strength": "7",
        "ability": "",
        "filename": "horst_borsodi",
        "count": "1",
        "quote": "My auction house is, above all, a gathering place for the elite of the elite."
    },
    "re_eternal_fire_priest": {
        "name": "Eternal Fire Priest",
        "deck": "redania",
        "row": "siege",
        "strength": "5",
        "ability": "witch_hunt",
        "filename": "eternal_fire_priest",
        "count": "1",
        "quote": "Closer, my sheep, gather closer. May the Eternal Fire warm your souls!"
    },
    "re_nathaniel_pastodi": {
        "name": "Nathaniel Pastodi",
        "deck": "redania",
        "row": "siege",
        "strength": "5",
        "ability": "witch_hunt",
        "filename": "nathaniel_pastodi",
        "count": "1",
        "quote": "Novigrad – where the impossible becomes possible. A professional torturer turned reverend, for instance."
    },
    "re_sigi_reuven": {
        "name": "Sigi Reuven",
        "deck": "redania",
        "row": "siege",
        "strength": "10",
        "ability": "hero",
        "filename": "sigi_reuven",
        "count": "1",
        "quote": "You sure he don't look the least bit familar...?"
    },
    "re_francis_bedlam": {
        "name": "Francis Bedlam: King of Beggars",
        "deck": "redania",
        "row": "siege",
        "strength": "10",
        "ability": "hero",
        "filename": "francis_bedlam",
        "count": "1",
        "quote": "You say tribute, I say taxes."
    },
    "re_cyrus_hemmelfart": {
        "name": "Cyrus Hemmelfart: Hierarch of Novigrad",
        "deck": "redania",
        "row": "siege",
        "strength": "2",
        "ability": "hero scorch",
        "filename": "cyrus_hemmelfart",
        "count": "1",
        "quote": "Beneath all that lust, greed, and vanity, stands an honorable man."
    },
};

var ext_to_cards = {
    "spe_toussaint_wine": {
        "name": "Toussaint Wine",
        "deck": "special toussaint",
        "row": "",
        "strength": "",
        "ability": "toussaint_wine",
        "filename": "toussaint_wine",
        "count": "3",
        "quote": "To honour our fair knights, we shall feast from eve till dawn's first light!"
    },
    "to_anna_henrietta_duchess": {
        "name": "Anna Henrietta: Duchess of Toussaint",
        "deck": "toussaint",
        "row": "leader",
        "strength": "",
        "ability": "anna_henrietta_duchess",
        "filename": "anna_henrietta_duchess",
        "count": "1",
        "quote": "Fair knights I salute you."
    },
    "to_anna_henrietta_ladyship": {
        "name": "Anna Henrietta: Her Enlightened Ladyship",
        "deck": "toussaint",
        "row": "leader",
        "strength": "",
        "ability": "anna_henrietta_ladyship",
        "filename": "anna_henrietta_ladyship",
        "count": "1",
        "quote": "Impertinence is the one thing I cannot abide."
    },
    "to_anna_henrietta_little_weasel": {
        "name": "Anna Henrietta: Little Weasel",
        "deck": "toussaint",
        "row": "leader",
        "strength": "",
        "ability": "anna_henrietta_little_weasel",
        "filename": "anna_henrietta_little_weasel",
        "count": "1",
        "quote": "You have sworn your vows, you have readied body and soul. The time has come to test them."
    },
    "to_gregoire_gorgon": {
        "name": "Gregoire de Gorgon",
        "deck": "toussaint",
        "row": "close",
        "strength": "8",
        "ability": "",
        "filename": "gregoire_gorgon",
        "count": "1",
        "quote": "Gregoire? That mountain o' muscle wrapped in armor? Course, I 'eard of 'im! Who hasn't?"
    },
    "to_knight_errant_1": {
        "name": "Knights-Errant",
        "id": 1,
        "deck": "toussaint",
        "row": "close",
        "strength": "4",
        "ability": "muster",
        "filename": "knight_errant_1",
        "count": "1",
        "target": "to_knight_errant",
        "quote": "Abandon the path of shame and we will spare you."
    },
    "to_knight_errant_2": {
        "name": "Knights-Errant",
        "id": 2,
        "deck": "toussaint",
        "row": "close",
        "strength": "4",
        "ability": "muster",
        "filename": "knight_errant_2",
        "count": "1",
        "target": "to_knight_errant",
        "quote": "Abandon the path of shame and we will spare you."
    },
    "to_bootblack": {
        "name": "Bootblack",
        "deck": "toussaint",
        "row": "close",
        "strength": "5",
        "ability": "spy",
        "filename": "bootblack",
        "count": "1",
        "quote": "Wouldn't be looking for work, would you? We'd make a fine duo."
    },
    "to_toussaint_knight_1": {
        "name": "Toussaint Knight",
        "id": 1,
        "deck": "toussaint",
        "row": "close",
        "strength": "3",
        "ability": "muster",
        "filename": "toussaint_knight_1",
        "count": "1",
        "target": "to_toussaint_knight",
        "quote": "I swear upon the heron you will pay with your own blood."
    },
    "to_toussaint_knight_2": {
        "name": "Toussaint Knight",
        "id": 2,
        "deck": "toussaint",
        "row": "close",
        "strength": "3",
        "ability": "muster",
        "filename": "toussaint_knight_2",
        "count": "1",
        "target": "to_toussaint_knight",
        "quote": "I swear upon the heron you will pay with your own blood."
    },
    "to_toussaint_knight_3": {
        "name": "Toussaint Knight",
        "id": 3,
        "deck": "toussaint",
        "row": "close",
        "strength": "3",
        "ability": "muster",
        "filename": "toussaint_knight_3",
        "count": "1",
        "target": "to_toussaint_knight",
        "quote": "I swear upon the heron you will pay with your own blood."
    },
    "to_minstrel": {
        "name": "Minstrel",
        "deck": "toussaint",
        "row": "close",
        "strength": "1",
        "ability": "horn",
        "filename": "minstrel",
        "count": "1",
        "quote": "There was a knight who drunk with wine. A ridding along the way sir; And there he met with a lady fine, Among the cocks of hay, sir..."
    },
    "to_regis": {
        "name": "Regis",
        "deck": "toussaint",
        "row": "close",
        "strength": "4",
        "ability": "monster_toussaint",
        "filename": "regis",
        "count": "1",
        "target": "to_regis_higher_vampire",
        "meta": ["toussaint_monster_level_1"],
        "quote": "Some consider me a monster. A blood-crazed, savage monster."
    },
    "to_regis_higher_vampire": {
        "name": "Regis: Higher Vampire",
        "deck": "toussaint",
        "row": "close",
        "strength": "4",
        "ability": "scorch_c",
        "filename": "regis_higher_vampire",
        "count": "0",
        "target": "to_regis",
        "meta": ["toussaint_monster_level_2"],
        "quote": "His glance hypnotizes into a deep sleep. He then drinks his fill, turns into a bat and flies off."
    },
    "to_damien_tour": {
        "name": "Damien de la Tour",
        "deck": "toussaint",
        "row": "close",
        "strength": "9",
        "ability": "hero morale",
        "filename": "damien_tour",
        "count": "1",
        "quote": "I served Beauclair well. At least... I hope I did."
    },
    "to_dettlaff": {
        "name": "Dettlaff",
        "deck": "toussaint",
        "row": "close",
        "strength": "5",
        "ability": "hero monster_toussaint",
        "filename": "dettlaff",
        "count": "1",
        "target": "to_dettlaff_higher_vampire",
        "meta": ["toussaint_monster_level_1"],
        "quote": "He did not love like a man, but like an animal. Madly, deeply, unconditionally. Wildly."
    },
    "to_dettlaff_higher_vampire": {
        "name": "Dettlaff: Higher Vampire",
        "deck": "toussaint",
        "row": "close",
        "strength": "8",
        "ability": "hero scorch",
        "filename": "dettlaff_higher_vampire",
        "count": "0",
        "target": "to_dettlaff",
        "meta": ["toussaint_monster_level_2"],
        "quote": "He did not love like a man, but like an animal. Madly, deeply, unconditionally. Wildly."
    },
    "to_champion": {
        "name": "Tournament Champion",
        "deck": "toussaint",
        "row": "agile_cr",
        "strength": "7",
        "ability": "",
        "filename": "champion",
        "count": "1",
        "quote": "Your presence at this tourney is an affront to my honor!"
    },
    "to_milton": {
        "name": "Milton de Peyrac-Peyran",
        "id": 1,
        "deck": "toussaint",
        "row": "agile_cr",
        "strength": "7",
        "ability": "",
        "filename": "milton",
        "count": "1",
        "quote": "Glinting under the rays of the Beauclair sun, there was no mistaking this knight-errant who bore the head of a great, white bull on his shield."
    },
    "to_lui_alberni": {
        "name": "Lui Alberni",
        "deck": "toussaint",
        "row": "agile_cr",
        "strength": "4",
        "ability": "monster_toussaint",
        "filename": "lui_alberni",
        "count": "1",
        "target": "to_lui_alberni_golyat",
        "meta": ["toussaint_monster_level_1"],
        "quote": "Some claim Golyat was once a famous knight..."
    },
    "to_lui_alberni_golyat": {
        "name": "Lui Alberni: Golyat",
        "deck": "toussaint",
        "row": "agile_cr",
        "strength": "4",
        "ability": "decoy",
        "filename": "lui_alberni_golyat",
        "count": "0",
        "target": "to_lui_alberni",
        "meta": ["toussaint_monster_level_2"],
        "quote": "Some claim Golyat was once a famous knight..."
    },
    "to_barnabas": {
        "name": "Barnabas Basil-Foulty",
        "deck": "toussaint",
        "row": "ranged",
        "strength": "0",
        "ability": "toussaint_wine",
        "filename": "barnabas",
        "count": "1",
        "quote": "I shall serve you as majordomo of Corvo Bianco."
    },
    "to_vivienne": {
        "name": "Vivienne",
        "deck": "toussaint",
        "row": "ranged",
        "strength": "0",
        "ability": "monster_toussaint",
        "filename": "vivienne",
        "count": "1",
        "target": "to_vivienne_oriole",
        "meta": ["toussaint_monster_level_1"],
        "quote": "Vivienne's a bit of an odd duck for a lady-in-waitin'. But by the Gods, ye can't deny her beauty an' grace!"
    },
    "to_vivienne_oriole": {
        "name": "Vivienne: Oriole",
        "deck": "toussaint",
        "row": "ranged",
        "strength": "7",
        "ability": "spy",
        "filename": "vivienne_oriole",
        "count": "0",
        "target": "to_vivienne",
        "meta": ["toussaint_monster_level_2"],
        "quote": "Who'd not like to live free as a bird? Well, just ask Vivienne de Tabris."
    },
    "to_marlene": {
        "name": "Marlene: Wight",
        "deck": "toussaint",
        "row": "ranged",
        "strength": "6",
        "ability": "",
        "filename": "marlene",
        "count": "1",
        "quote": "None shall sit and dine with you at your table, no spoon you have shall sate you, never again shall you wish to spy your reflection in the mirror."
    },
    "to_orianna": {
        "name": "Orianna",
        "deck": "toussaint",
        "row": "ranged",
        "strength": "4",
        "ability": "monster_toussaint",
        "filename": "orianna",
        "count": "1",
        "target": "to_orianna_bruxa",
        "meta": ["toussaint_monster_level_1"],
        "quote": "Wolves asleep amidst the trees, Bats all swaying in the breeze..."
    },
    "to_orianna_bruxa": {
        "name": "Orianna",
        "deck": "toussaint",
        "row": "ranged",
        "strength": "4",
        "ability": "scorch_r",
        "filename": "orianna_bruxa",
        "count": "0",
        "target": "to_orianna",
        "meta": ["toussaint_monster_level_2"],
        "quote": "...but one soul lies anxious, wide awake, fearing the manner of ghouls, hags and wraiths."
    },
    "to_artorius_vigo": {
        "name": "Artorius Vigo",
        "deck": "toussaint",
        "row": "ranged",
        "strength": "0",
        "ability": "medic",
        "filename": "artorius_vigo",
        "count": "1",
        "quote": "It is said he created an illusion so realistic that he began to believe it himself..."
    },
    "to_witch_lynx_crag": {
        "name": "Witch of Lynx Crag",
        "deck": "toussaint",
        "row": "ranged",
        "strength": "8",
        "ability": "",
        "filename": "witch_lynx_crag",
        "count": "1",
        "quote": "Lives in a hut atop Lynx Crag and is feared by many of the locals."
    },
    "to_guillaume": {
        "name": "Guillaume de Launfal",
        "id": 1,
        "deck": "toussaint",
        "row": "ranged",
        "strength": "3",
        "ability": "muster",
        "filename": "guillaume",
        "count": "1",
        "target": "to_guillaume_palmerin",
        "quote": "Guillaume was the very model of a knight-errant - the placard boy for Toussaint."
    },
    "to_palmerin": {
        "name": "Palmerin de Launfal",
        "id": 2,
        "deck": "toussaint",
        "row": "close",
        "strength": "4",
        "ability": "muster",
        "filename": "palmerin",
        "count": "1",
        "target": "to_guillaume_palmerin",
        "quote": "Rumor had it the esteemed baron Palmerin de Launfal had fallen into a profane affair with a succubus."
    },
    "to_duchess_informant": {
        "name": "Duchess Informant",
        "deck": "toussaint",
        "row": "ranged",
        "strength": "6",
        "ability": "spy",
        "filename": "duchess_informant",
        "count": "1",
        "quote": "Anna Henrietta wakes every morn to the tune of her songbirds."
    },
    "to_prophet_lebioda": {
        "name": "Prophet Lebioda",
        "deck": "toussaint",
        "row": "ranged",
        "strength": "3",
        "ability": "medic",
        "filename": "prophet_lebioda",
        "count": "1",
        "quote": "To thine own self be judge and ruler for thou alone shalt answer for thine deeds before thee."
    },
    "to_roderick": {
        "name": "Roderick of Dun Tynne",
        "deck": "toussaint",
        "row": "ranged",
        "strength": "9",
        "ability": "hero morale",
        "filename": "roderick",
        "count": "1",
        "quote": "Roderick lived as a recluse, avoiding society at large."
    },
    "to_unseen_elder": {
        "name": "Unseen Elder",
        "deck": "toussaint",
        "row": "ranged",
        "strength": "12",
        "ability": "hero",
        "filename": "unseen_elder",
        "count": "1",
        "quote": "No one, not even among the higher vampires, knows exactly how old the Unseen Elder is."
    },
    "to_syanna": {
        "name": "Sylvia Anna",
        "deck": "toussaint",
        "row": "siege",
        "strength": "6",
        "ability": "hero spy",
        "filename": "syanna",
        "count": "1",
        "quote": "Your Majesty... The princess has been touched by the curse o' the Black Sun. There's no hope, I'm afraid..."
    },
    "to_lady_lake": {
        "name": "Lade of the Lake",
        "deck": "toussaint",
        "row": "siege",
        "strength": "0",
        "ability": "hero aerondight",
        "filename": "lady_lake",
        "count": "1",
        "quote": "Take this sword as a sign of my favor. For centuries it lay in these depths, waiting... for you."
    },
};

var ext_ve_cards = {
    "spe_curse": {
        "name": "Curse",
        "deck": "special velen",
        "row": "",
        "strength": "",
        "ability": "curse",
        "filename": "curse",
        "count": "3",
        "quote": "Anyone who comes here will die in terrible agony."
    },
   "ve_lady_wood_whispess": {
        "name": "Ladies of the Wood: Whispess",
        "deck": "velen",
        "row": "leader",
        "strength": "",
        "ability": "lady_wood_whispess",
        "filename": "lady_wood_whispess",
        "count": "1",
        "quote": "I'll be your best - and last."
    },
    "ve_lady_wood_brewess": {
        "name": "Ladies of the Wood: Brewess",
        "deck": "velen",
        "row": "leader",
        "strength": "",
        "ability": "lady_wood_brewess",
        "filename": "lady_wood_brewess",
        "count": "1",
        "quote": "We'll cut you up, boy. A fina broth you will make."
    },
    "ve_lady_wood_weavess": {
        "name": "Ladies of the Wood: Weavess",
        "deck": "velen",
        "row": "leader",
        "strength": "",
        "ability": "lady_wood_weavess",
        "filename": "lady_wood_weavess",
        "count": "1",
        "quote": "I sense your pain. I see your fear..."
    },
     "ve_ghost_tree": {
        "name": "The Ghost in the Tree",
        "deck": "velen",
        "row": "leader",
        "strength": "0",
        "ability": "ghost_tree",
        "filename": "ghost_tree",
        "count": "1",
        "quote": "A lot of mystery surrounds the spirit but one thing appears to be certain: the Crones killed her, then captured her spirit and imprisoned it in the tree."
    },
    "ve_cutthroat": {
        "name": "Cutthroat",
        "deck": "velen",
        "row": "close",
        "strength": "6",
        "ability": "",
        "filename": "cutthroat",
        "count": "1",
        "quote": "Ahhh, nothin' so soothin' as the sound of gurglin' blood."
    },
    "ve_angry_peasants": {
        "name": "Angry peasants",
        "deck": "velen",
        "row": "close",
        "strength": "3",
        "ability": "scorch_c",
        "filename": "angry_peasants",
        "count": "1",
        "quote": "Wanna know their problem? They are always hungry."
    },
    "ve_deserter_1": {
        "name": "Deserter",
        "id": 1,
        "deck": "velen",
        "row": "close",
        "strength": "4",
        "ability": "bond",
        "filename": "deserter_1",
        "count": "1",
        "target": "ve_deserter",
        "quote": "Fuck the army."
    },
    "ve_deserter_2": {
        "name": "Deserter",
        "id":2,
        "deck": "velen",
        "row": "close",
        "strength": "4",
        "ability": "bond",
        "filename": "deserter_2",
        "count": "1",
        "target": "ve_deserter",
        "quote": "Fuck the king!"
    },
    "ve_marauder_1": {
        "name": "Marauder",
        "id": 1,
        "deck": "velen",
        "row": "close",
        "strength": "4",
        "ability": "bond",
        "filename": "marauder_1",
        "count": "1",
        "target": "ve_marauder",
        "quote": "We'll torture the merchant and sell the horses."
    },
    "ve_marauder_2": {
        "name": "Marauder",
        "id": 2,
        "deck": "velen",
        "row": "close",
        "strength": "4",
        "ability": "bond",
        "filename": "marauder_2",
        "count": "1",
        "target": "ve_marauder",
        "quote": "It's because we're free to do whatever we want! Ha, ha ha!"
    },
    "ve_abandoned_girl": {
        "name": "Abandoned Girl",
        "deck": "velen",
        "row": "close",
        "strength": "0",
        "ability": "bait",
        "filename": "abandoned_girl",
        "count": "1",
        "quote": "Local peasants leave children in the forest as a gift to the Ladies of the Wood."
    },
    "ve_bloody_baron": {
        "name": "Bloody Baron",
        "deck": "velen",
        "row": "close",
        "strength": "8",
        "ability": "hero morale",
        "filename": "bloody_baron",
        "count": "1",
        "quote": "I've not been a good father. But I've certainly been a good warrior!"
    },
        "ve_water_hag": {
        "name": "Water Hag",
        "deck": "velen",
        "row": "agile_cr",
        "strength": "5",
        "ability": "",
        "filename": "water_hag",
        "count": "1",
        "quote": "Folk say water hags are drowner's wives. If that be true, 'tain't no wonder why they're such ornery bitches."
    },
    "ve_allgod": {
        "name": "Allgod",
        "deck": "velen",
        "row": "agile_cr",
        "strength": "4",
        "ability": "morale",
        "filename": "allgod",
        "count": "1",
        "quote": "Make your sacrifices or face divine anger! The food better be good or prepare to face my wrath nonetheless."
    },
    "ve_drowner": {
        "name": "Drowner",
        "deck": "velen",
        "row": "agile_cr",
        "strength": "5",
        "ability": "",
        "filename": "drowner",
        "count": "1",
        "quote": "Though the witchman lusts for gold, for the smiting of a drowner thou shalt give him but a silver penny, or three halfpence, at most."
    },
    "ve_ghoul_1": {
        "name": "Ghoul",
        "id": 1,
        "deck": "velen",
        "row": "ranged",
        "strength": "4",
        "ability": "bond",
        "filename": "ghoul_1",
        "count": "1",
        "target": "ve_ghoul",
        "quote": "If ghouls are part of the Circle of Life... then it's a damn vicious circle."
    },
    "ve_ghoul_2": {
        "name": "Ghoul",
        "id": 2,
        "deck": "velen",
        "row": "ranged",
        "strength": "4",
        "ability": "bond",
        "filename": "ghoul_2",
        "count": "1",
        "target": "ve_ghoul",
        "quote": "A frequent visitor of the battlefields."
    },
    "ve_hungry_wolves_1": {
        "name": "Hungry Wolves",
        "id": 1,
        "deck": "velen",
        "row": "ranged",
        "strength": "2",
        "ability": "muster",
        "filename": "hungry_wolves_1",
        "count": "1",
        "target": "ve_hungry_wolves",
        "quote": "Surrounded by that pack of wolves, we felt like three little pigs."
    },
    "ve_hungry_wolves_2": {
        "name": "Hungry Wolves",
        "id": 2,
        "deck": "velen",
        "row": "ranged",
        "strength": "2",
        "ability": "muster",
        "filename": "hungry_wolves_2",
        "count": "1",
        "target": "ve_hungry_wolves",
        "quote": "Wolves came out of the forest, ate the cattle and then surrounded the house. They were howling madly."
    },
    "ve_hungry_wolves_3": {
        "name": "Hungry Wolves",
        "id": 3,
        "deck": "velen",
        "row": "ranged",
        "strength": "2",
        "ability": "muster",
        "filename": "hungry_wolves_3",
        "count": "1",
        "target": "ve_hungry_wolves",
        "quote": "'Relax, I know how to tame wolves...' - Dunbar the Hunter's last words."
    },
    "ve_hungry_wolves_4": {
        "name": "Hungry Wolves",
        "id": 4,
        "deck": "velen",
        "row": "ranged",
        "strength": "3",
        "ability": "muster",
        "filename": "hungry_wolves_4",
        "count": "1",
        "target": "ve_hungry_wolves",
        "quote": "Just like any beast, he deals with them swiftly and carefully."
    },
    "ve_noonwraith": {
        "name": "Noonwraith",
        "deck": "velen",
        "row": "ranged",
        "strength": "6",
        "ability": "",
        "filename": "noonwraith",
        "count": "1",
        "quote": "They are born of some horrible tragedy tied to ill-fated love."
    },
    "ve_penitent": {
        "name": "Penitent",
        "deck": "velen",
        "row": "ranged",
        "strength": "6",
        "ability": "",
        "filename": "penitent",
        "count": "1",
        "quote": "The places this monster haunts are quickly covered by fog and darkness. Those that get lost in it usually don't return to the living."
    },
    "ve_nightwraith": {
        "name": "Nightwraith",
        "deck": "velen",
        "row": "ranged",
        "strength": "6",
        "ability": "",
        "filename": "nightwraith",
        "count": "1",
        "quote": "How much damage can a pale, emaciated woman, entangled in a ripped dress, do? A lot, it turns out."
    },

    "ve_fiend": {
        "name": "Fiend",
        "deck": "velen",
        "row": "siege",
        "strength": "6",
        "ability": "bond",
        "filename": "fiend",
        "count": "1",
        "quote": "A fiend looks like a deer. An enormous, evil deer."
    },
    "ve_chort": {
        "name": "Chort",
        "deck": "velen",
        "row": "siege",
        "strength": "6",
        "ability": "bond",
        "filename": "chort",
        "count": "1",
        "quote": "Chorts are smaller than fiends, true. But still big enough to kill."
    },
    "ve_fugas": {
        "name": "Fugas",
        "deck": "velen",
        "row": "siege",
        "strength": "7",
        "ability": "",
        "filename": "fugas",
        "count": "1",
        "quote": "Heh, givin' me orders? You? A human?"
    },
    "ve_tamara_strenger": {
        "name": "Tamara Strenger",
        "deck": "velen",
        "row": "siege",
        "strength": "4",
        "ability": "hero medic",
        "filename": "tamara_strenger",
        "count": "1",
        "quote": "Once the heat of the Fire has set your heart aflame, it gives you strength and leads you down the path of truth for the rest of your life."
    },
    "ve_johnny": {
        "name": "Johnny",
        "deck": "velen",
        "row": "siege",
        "strength": "8",
        "ability": "hero spy",
        "filename": "johnny",
        "count": "1",
        "quote": "Peter Piper picked Prince Proximo a peck of pickled peppers by the Pontar."
    },
    "ve_thecla": {
        "name": "Thecla",
        "deck": "velen",
        "row": "siege",
        "strength": "4",
        "ability": "hero soothsayer",
        "filename": "thecla",
        "count": "1",
        "quote": "She was a very old, blind woman that was considered to be wise by the locals."
    },
    "ve_anna_strenger": {
        "name": "Anna Strenger",
        "deck": "velen",
        "row": "siege",
        "strength": "4",
        "ability": "hero soothsayer",
        "filename": "anna_strenger",
        "count": "1",
        "quote": "Anna hated her husband so much that she was ready to do anything in order to be free of the man — and the child he had put inside her."
    },
    "ve_pellar": {
        "name": "Pellar",
        "deck": "velen",
        "row": "siege",
        "strength": "4",
        "ability": "hero soothsayer",
        "filename": "pellar",
        "count": "1",
        "quote": "Gather spirits for this wake, A passing soul ne'er forsake, Hear my call, my humble plea, Unbind his chains, set him free."
    },
};

var ext_wh_cards = {
    "spe_dimensional_door": {
        "name": "Dimensional Door",
        "deck": "special wild_hunt",
        "row": "",
        "strength": "",
        "ability": "door",
        "filename": "dimensional_door",
        "count": "0",
        "quote": "Very useful for travels to other dimensions and bringing apocalypse upon the world."
    },
    "spe_white_frost_1": {
        "name": "White Frost",
        "deck": "weather wild_hunt",
        "row": "agile_cr",
        "strength": "",
        "ability": "white_frost",
        "filename": "white_frost",
        "count": "1",
        "quote": "It is the beginning of the end!"
    },
    "spe_white_frost_2": {
        "name": "White Frost",
        "deck": "weather wild_hunt",
        "row": "agile_cs",
        "strength": "",
        "ability": "white_frost",
        "filename": "white_frost",
        "count": "1",
        "quote": "It is the beginning of the end!"
    },
    "spe_white_frost_3": {
        "name": "White Frost",
        "deck": "weather wild_hunt",
        "row": "agile_rs",
        "strength": "",
        "ability": "white_frost",
        "filename": "white_frost",
        "count": "1",
        "quote": "It is the beginning of the end!"
    },
    "wh_eredin_commander": {
        "name": "Eredin Bréacc Glas: Commander of Dearg Ruadhri",
        "deck": "wild_hunt",
        "row": "leader",
        "strength": "",
        "ability": "eredin_commander",
        "filename": "eredin_commander",
        "count": "1",
        "quote": "Any last words?"
    },
    "wh_auberon_king": {
        "name": "Auberon Muirketah: King of Aen Elle",
        "deck": "wild_hunt",
        "row": "leader",
        "strength": "",
        "ability": "auberon_king",
        "filename": "auberon_king",
        "count": "1",
        "quote": "After having lived over six hundred and fifty years, little remains to excite."
    },
    "wh_winter_queen": {
        "name": "Winter Queen: Destroyer of the Worlds",
        "deck": "wild_hunt",
        "row": "leader",
        "strength": "",
        "ability": "winter_queen",
        "filename": "winter_queen",
        "count": "1",
        "quote": "Truth is but a shard of ice."
    },
    "wh_caranthir_navigator": {
        "name": "Caranthir Ar-Feiniel: Sorcerer-Navigator",
        "deck": "wild_hunt",
        "row": "leader",
        "strength": "",
        "ability": "caranthir_navigator",
        "filename": "caranthir_navigator",
        "count": "1",
        "quote": "A favorite son who chose a life of villainy."
    },
    "wh_imlerith_general": {
        "name": "Imlerith: General of the Wild Hunt",
        "deck": "wild_hunt",
        "row": "leader",
        "strength": "",
        "ability": "imlerith_general",
        "filename": "imlerith_general",
        "count": "1",
        "quote": "The sisters said you would come. They saw you arrive in the water's surface."
    },
    "wh_wild_hunt_warrior_1": {
        "name": "Wild Hunt Warrior",
        "id": 1,
        "deck": "wild_hunt",
        "row": "close",
        "strength": "3",
        "ability": "bond",
        "filename": "wild_hunt_warrior_1",
        "count": "3",
        "target": "wh_wild_hunt_warrior",
        "quote": "The White Frost is coming."
    },
    "wh_wild_hunt_warrior_2": {
        "name": "Wild Hunt Warrior",
        "id": 2,
        "deck": "wild_hunt",
        "row": "close",
        "strength": "4",
        "ability": "bond",
        "filename": "wild_hunt_warrior_2",
        "count": "1",
        "target": "wh_wild_hunt_warrior",
        "quote": "THe considers it an excellent joke - to split the skulls of the living with the skulls of the dead. "
    },
    "wh_imlerith": {
        "name": "Imlerith",
        "deck": "wild_hunt",
        "row": "close",
        "strength": "7",
        "ability": "scorch_c",
        "filename": "imlerith",
        "count": "1",
        "quote": "He boasted that no weapon would ever pierce his armor. And he was right — even in death."
    },
    "wh_cirilla": {
        "name": "Cirilla",
        "deck": "wild_hunt",
        "row": "close",
        "strength": "0",
        "ability": "hero zirael",
        "filename": "cirilla",
        "count": "1",
        "quote": "Zireael possesses a great power she cannot control."
    },
    "wh_avallach": {
        "name": "Avallac'h",
        "deck": "wild_hunt",
        "row": "close",
        "strength": "6",
        "ability": "hero sage",
        "filename": "avallach",
        "count": "1",
        "quote": "You humans have… unusual tastes."
    },
    "wh_wild_hunt_rider_1": {
        "name": "Wild Hunt Rider",
        "deck": "wild_hunt",
        "row": "agile_cr",
        "strength": "5",
        "ability": "",
        "filename": "wild_hunt_rider_1",
        "count": "2",
        "quote": "First the buffalo horns atop their helms penetrate one's view, then the crest betwixt them."
    },
    "wh_wild_hunt_rider_2": {
        "name": "Wild Hunt Rider",
        "deck": "wild_hunt",
        "row": "agile_rs",
        "strength": "5",
        "ability": "",
        "filename": "wild_hunt_rider_2",
        "count": "2",
        "quote": "The cavalcade of wraiths on undead horses galloping accross the sky."
    },
    "wh_wild_hunt_rider_3": {
        "name": "Wild Hunt Rider",
        "deck": "wild_hunt",
        "row": "agile_cs",
        "strength": "5",
        "ability": "",
        "filename": "wild_hunt_rider_3",
        "count": "2",
        "quote": "They paint the sky with snow and the earth with fire."
    },
    "wh_aen_elle_conqueror_1": {
        "name": "Aen Elle Conqueror",
        "id": 1,
        "deck": "wild_hunt",
        "row": "ranged",
        "strength": "4",
        "ability": "bond",
        "filename": "aen_elle_conqueror_1",
        "count": "1",
        "quote": "The end of one world can be the beginning of another."
    },
    "wh_aen_elle_conqueror_2": {
        "name": "Aen Elle Conqueror",
        "id": 2,
        "deck": "wild_hunt",
        "row": "ranged",
        "strength": "4",
        "ability": "bond",
        "filename": "aen_elle_conqueror_2",
        "count": "1",
        "quote": "If they will not submit, they shall be driven out!"
    },
    "wh_aen_elle_conqueror_3": {
        "name": "Aen Elle Conqueror",
        "id": 3,
        "deck": "wild_hunt",
        "row": "ranged",
        "strength": "4",
        "ability": "bond",
        "filename": "aen_elle_conqueror_3",
        "count": "1",
        "quote": "For his noble kind morality is but a whim enjoyed by others. More specifically, those who lose."
    },
    "wh_wild_hunt_hound_1": {
        "name": "Wild Hunt Hound",
        "deck": "wild_hunt",
        "row": "ranged",
        "strength": "7",
        "ability": "",
        "filename": "wild_hunt_hound_1",
        "count": "1",
        "quote": "Cry 'Havoc!', and let slip the dogs of war."
    },
    "wh_wild_hunt_hound_2": {
        "name": "Wild Hunt Hound",
        "deck": "wild_hunt",
        "row": "ranged",
        "strength": "7",
        "ability": "",
        "filename": "wild_hunt_hound_2",
        "count": "1",
        "quote": "Who's a good boy? Well, surely not him."
    },
    "wh_nithral": {
        "name": "Nithral",
        "deck": "wild_hunt",
        "row": "ranged",
        "strength": "7",
        "ability": "hero morale",
        "filename": "nithral",
        "count": "1",
        "quote": "Eredin's personal cavalcade includes only the most brutal and most ferocious of the Aen Elle."
    },
    "wh_geels": {
        "name": "Ge'els",
        "deck": "wild_hunt",
        "row": "ranged",
        "strength": "6",
        "ability": "hero sage",
        "filename": "geels",
        "count": "1",
        "quote": "Paintings should convey emotion, not words."
    },
    "wh_naglfar_taskmaster": {
        "name": "Naglfar's Taskmaster",
        "deck": "wild_hunt",
        "row": "siege",
        "strength": "4",
        "ability": "medic",
        "filename": "naglfar_taskmaster",
        "count": "1",
        "quote": "She ensures the ship is sustained by squeezing the life essence from those insignificant human vermin."
    },
    "wh_naglfar_crew": {
        "name": "Naglfar's Crew",
        "deck": "wild_hunt",
        "row": "siege",
        "strength": "3",
        "ability": "bond",
        "filename": "naglfar_crew",
        "count": "4",
        "quote": "Humans don’t know what powers the Naglfar. For those that discover the truth... Well, it’s already too late for them."
    },
    "wh_naglfar_cartographer": {
        "name": "Naglfar's Cartographer",
        "deck": "wild_hunt",
        "row": "siege",
        "strength": "4",
        "ability": "sage",
        "filename": "naglfar_cartographer",
        "count": "1",
        "quote": "We're almost there, my lord!"
    },
    "wh_naglfar": {
        "name": "Naglfar",
        "deck": "wild_hunt",
        "row": "siege",
        "strength": "0",
        "ability": "hero naglfar",
        "filename": "naglfar",
        "count": "1",
        "quote": "Naglfar will wage the final battle of good and evil known as Ragh nar Roog."
    },
    "wh_navigator_1": {
        "name": "Navigator",
        "deck": "wild_hunt",
        "row": "agile_crs",
        "strength": "3",
        "ability": "door_o",
        "filename": "navigator_1",
        "count": "1",
        "quote": "They are powerful mages who had the ability to manipulate space and to open portals between different worlds."
    },
    "wh_navigator_2": {
        "name": "Navigator",
        "deck": "wild_hunt",
        "row": "agile_crs",
        "strength": "4",
        "ability": "door_o",
        "filename": "navigator_2",
        "count": "1",
        "quote": "They would guide the Riders of the Hunt along mystic pathways through time and space in order to reach other worlds."
    },
    "wh_navigator_3": {
        "name": "Navigator",
        "deck": "wild_hunt",
        "row": "agile_crs",
        "strength": "5",
        "ability": "door_o",
        "filename": "navigator_3",
        "count": "1",
        "quote": "All of them are apprentices of Avallac'h"
    },
};

var ext_wu_cards = {
    "wu_vilgefortz_magician_kovir": {
        "name": "Vilgefortz: Magician of Kovir",
        "deck": "witcher_universe",
        "row": "leader",
        "strength": "",
        "ability": "vilgefortz_magician_kovir",
        "filename": "vilgefortz_magician_kovir",
        "count": "1",
        "quote": "The nature does not have the knowledge of the philosophical thought."
    },
    "wu_tissaia": {
        "name": "Tissaia de Vries",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "6",
        "ability": "medic",
        "filename": "tissaia",
        "count": "1",
        "quote": "They will not enter here. No one invited those royalist lackeys, who carry out the orders of their short-sighted kings!"
    },
    "wu_rats_giselher": {
        "name": "The Rats: Giselher",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "4",
        "ability": "muster",
        "filename": "rats_giselher",
        "count": "1",
        "target": "wu_rats",
        "quote": "He wants to make us angry? Let the bastard talk."
    },
    "wu_rats_asse": {
        "name": "The Rats: Asse",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "3",
        "ability": "muster",
        "filename": "rats_asse",
        "count": "1",
        "target": "wu_rats",
        "quote": "He had been hunting the Nilfgaardians for three days, insane with the desire for revenge for what the marauders had done to his familly."
    },
    "wu_rats_iskra": {
        "name": "The Rats: Iskra",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "3",
        "ability": "muster",
        "filename": "rats_iskra",
        "count": "1",
        "target": "wu_rats",
        "quote": "The speed blew her beautiful, dark hair around, revealing a small, pointed ear decorated with a filigree earring."
    },
    "wu_rats_kayleigh": {
        "name": "The Rats: Kayleigh",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "3",
        "ability": "muster",
        "filename": "rats_kayleigh",
        "count": "1",
        "target": "wu_rats",
        "quote": "He had woken up in smoke, fire and blood, lying among the corpses of his adoptive parents and siblings."
    },
    "wu_rats_mistle": {
        "name": "The Rats: Mistle",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "3",
        "ability": "muster",
        "filename": "rats_mistle",
        "count": "1",
        "target": "wu_rats",
        "quote": "The tree stump was followed by a young woman with close-cropped fair hair in a red doublet and high, shiny boots reaching above the knee."
    },
    "wu_rats_reef": {
        "name": "The Rats: Reef",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "3",
        "ability": "muster",
        "filename": "rats_reef",
        "count": "1",
        "target": "wu_rats",
        "quote": "Caring for the wounded was not a custom among the killers of the Nilfgaardian special squads."
    },
    "wu_ralf_blunden": {
        "name": "Ralf Blunden",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "7",
        "ability": "spy",
        "filename": "ralf_blunden",
        "count": "1",
        "quote": "The Professor's trademark is his sophisticated choice of words, and witty comments."
    },
    "wu_bomb_heaver": {
        "name": "Bomb Heaver",
        "deck": "witcher_universe",
        "row": "siege",
        "strength": "3",
        "ability": "scorch",
        "filename": "bomb_heaver",
        "count": "1",
        "quote": "Watch your heads!"
    },
    "wu_gascon_light_cavalry": {
        "name": "Gascon's Light Cavalry",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "5",
        "ability": "muster",
        "filename": "gascon_light_cavalry",
        "count": "1",
        "target": "wu_gascon_troops",
        "quote": "The chase is on!"
    },
    "wu_gascon_slinger": {
        "name": "Gascon's Slingers",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "4",
        "ability": "muster",
        "filename": "gascon_slinger",
        "count": "1",
        "target": "wu_gascon_troops",
        "quote": "Bigger they are, easier they are to target."
    },
    "wu_gascon_infiltrator": {
        "name": "Gascon's Infiltrator",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "4",
        "ability": "muster",
        "filename": "gascon_infiltrator",
        "count": "1",
        "target": "wu_gascon_troops",
        "quote": "We got a job to do."
    },
    "wu_gascon": {
        "name": "Gascon",
        "deck": "witcher_universe",
        "row": "siege",
        "strength": "7",
        "ability": "hero muster",
        "filename": "gascon",
        "count": "1",
        "target": "wu_gascon_troops",
        "quote": "Th' Strays of Spalla – 'tis you who lead them? 'Tis you they call the Duke of Dogs?"
    },
    "wu_dorregaray": {
        "name": "Dorregaray of Vole",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "10",
        "ability": "hero",
        "filename": "dorregaray",
        "count": "1",
        "quote": "Dorregaray is a monster aficionado, though he's developed his own classification system."
    },
    "wu_ortolan": {
        "name": "Grandmaster Ortolan",
        "deck": "witcher_universe",
        "row": "siege",
        "strength": "5",
        "ability": "medic",
        "filename": "ortolan",
        "count": "1",
        "quote": "He was a legendary mage who was in charge of the experiments done at Rissberg Castle."
    },
    "wu_coral": {
        "name": "Coral",
        "deck": "witcher_universe",
        "row": "siege",
        "strength": "6",
        "ability": "",
        "filename": "coral",
        "count": "1",
        "quote": "Her true name's Astrid Lyttneyd Ásgeirrfinnbjornsdottir, but that never fit on any forms."
    },
    "wu_leo_bonhart": {
        "name": "Leo Bonhart",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "11",
        "ability": "hero",
        "filename": "leo_bonhart",
        "count": "1",
        "quote": "So you do not fear death? Then look at that little Rat. This is death."
    },
    "wu_azar_javed": {
        "name": "Azar Javed",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "7",
        "ability": "",
        "filename": "azar_javed",
        "count": "1",
        "quote": "This time you pissed into a tornado."
    },
    "wu_strays_spalla": {
        "name": "Strays of Spalla",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "8",
        "ability": "",
        "filename": "strays_spalla",
        "count": "1",
        "quote": "I'll release ye o' that pouch."
    },
    "wu_gerhart_aelle": {
        "name": "Gerhart of Aelle",
        "deck": "witcher_universe",
        "row": "siege",
        "strength": "10",
        "ability": "hero",
        "filename": "gerhart_aelle",
        "count": "1",
        "quote": "Gerhart of Aelle, otherwise known as Hen Gedymdeith, was the oldest living sorcerer. That is, until his death on Thanedd Island during the coup."
    },
    "wu_lydia_bredevoort": {
        "name": "Lydia van Bredevoort",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "5",
        "ability": "medic",
        "filename": "lydia_bredevoort",
        "count": "1",
        "quote": "Whether by brush or by sorcery, there was no event, emotion, or scene beyond Lydia's power to depict. Apart from joy."
    },
    "wu_dana_meadbh": {
        "name": "Dana Meadbh",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "8",
        "ability": "hero morale",
        "filename": "dana_meadbh",
        "count": "1",
        "quote": "Through the grasses covering the glade floated a golden-haired queen. Queen of the Fields."
    },
    "wu_rience": {
        "name": "Rience",
        "deck": "witcher_universe",
        "row": "siege",
        "strength": "5",
        "ability": "",
        "filename": "rience",
        "count": "1",
        "quote": "I love watching people suffer."
    },
    "wu_visenna": {
        "name": "Visenna",
        "deck": "witcher_universe",
        "row": "siege",
        "strength": "3",
        "ability": "medic",
        "filename": "visenna",
        "count": "1",
        "quote": "The scar will remain, of course. A new one for your collection."
    },
    "wu_operator": {
        "name": "Operator",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "5",
        "ability": "scorch_c",
        "filename": "operator",
        "count": "1",
        "quote": "As time and space collapse before us, they expand behind us..."
    },
    "wu_cosimo_malaspina": {
        "name": "Cosimo Malaspina: Master of Mutations",
        "deck": "witcher_universe",
        "row": "leader",
        "strength": "",
        "ability": "cosimo_malaspina",
        "filename": "cosimo_malaspina",
        "count": "1",
        "quote": "Children keep asking him for gifts. He doesn’t know why, but it really helps with finding subjects for his experiments."
    },
    "wu_coen": {
        "name": "Coën",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "8",
        "ability": "witcher_griffin_school",
        "filename": "coen",
        "count": "1",
        "quote": "There is no such thing as a fair fight. Every advantage and every opportunity that arises is used in combat."
    },
    "wu_stygga_castle": {
        "name": "Stygga Castle",
        "deck": "witcher_universe",
        "row": "siege",
        "strength": "8",
        "ability": "hero resilience witcher_cat_school",
        "filename": "stygga_castle",
        "count": "1",
        "quote": "The Feline witchers did not stay in Stygga Castle for long. Nor anywhere else, actually."
    },
"wu_vesemir": {
        "name": "Vesemir",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "6",
        "ability": "witcher_wolf_school",
        "filename": "vesemir",
        "count": "1",
        "quote": "If you're to be hanged, ask for water. Anything can happen before they fetch it."
    },
    "wu_haern_caduch": {
        "name": "Haern Caduch",
        "deck": "witcher_universe",
        "row": "siege",
        "strength": "8",
        "ability": "hero resilience witcher_bear_school",
        "filename": "haern_caduch",
        "count": "1",
        "quote": "Carved into the icy rock of the Amell Mountains, the location of the long-abandoned School of the Bear remains a well-kept secret."
    },
    "wu_ivo_belhaven": {
        "name": "Ivo of Belhaven",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "6",
        "ability": "witcher_bear_school",
        "filename": "ivo_belhaven",
        "count": "1",
        "quote": "It's not reason I'm devoid of, just emotion."
    },
    "wu_lambert": {
        "name": "Lambert",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "7",
        "ability": "witcher_wolf_school",
        "filename": "lambert",
        "count": "1",
        "quote": "Now that's the kind of negotiating I understand."
    },
    "wu_keldar": {
        "name": "Keldar",
        "deck": "witcher_universe",
        "row": "siege",
        "strength": "6",
        "ability": "medic witcher_griffin_school",
        "filename": "keldar",
        "count": "1",
        "quote": "You blunt, brainless humanoids! What do you mean by 'I don't know?'. You would go hunt the vampires with the Lebioda idol, smeared in garlic!"
    },
    "wu_ivar": {
        "name": "Ivar Evil-Eye",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "8",
        "ability": "witcher_viper_school",
        "filename": "ivar",
        "count": "1",
        "quote": "There’s a terrible tale behind each and every scar⁠—you’d be surprised just how many are true."
    },
    "wu_gorthur_gvaed": {
        "name": "Gorthur Gvaed",
        "deck": "witcher_universe",
        "row": "siege",
        "strength": "8",
        "ability": "hero resilience witcher_viper_school",
        "filename": "gorthur_gvaed",
        "count": "1",
        "quote": "There were many scrolls and manuscripts about the legend of the Wild Hunt in the stronghold—and for a good reason."
    },
    "wu_kaer_morhen": {
        "name": "Kaer Morhen",
        "deck": "witcher_universe",
        "row": "siege",
        "strength": "8",
        "ability": "hero resilience witcher_wolf_school",
        "filename": "kaer_morhen",
        "count": "1",
        "quote": "The bones of the dead remain at the bottom of the moat surrounding the stronghold, left there as a reminder of the massacre that was born from hatred."
    },
    "wu_kaer_seren": {
        "name": "Kaer Seren",
        "deck": "witcher_universe",
        "row": "siege",
        "strength": "8",
        "ability": "hero resilience witcher_griffin_school",
        "filename": "kaer_seren",
        "count": "1",
        "quote": "Kaer Seren’s literary collection was its greatest treasure and the envy of a group of overzealous mages."
    },
    "wu_gezras": {
        "name": "Gezras of Leyda",
        "deck": "witcher_universe",
        "row": "siege",
        "strength": "9",
        "ability": "witcher_cat_school",
        "filename": "gezras",
        "count": "1",
        "quote": "Take a contract from Aen Seidhe over a dh'oine any day, as you’re far less likely to receive a knife between the ribs in place of coin."
    },
"wu_geralt_1": {
        "name": "Geralt of Rivia",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "9",
        "ability": "scorch_c witcher_wolf_school",
        "filename": "geralt_1",
        "count": "1",
        "quote": "If that's what it takes to save the world, it's better to let that world die."
    },
    "wu_gaetan": {
        "name": "Gaetan",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "7",
        "ability": "witcher_cat_school",
        "filename": "gaetan",
        "count": "1",
        "quote": "Murder me just to save few crowns? I’m supposed to protect whoresons like that?"
    },
    "wu_brehen": {
        "name": "Brehen",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "6",
        "ability": "scorch_c witcher_cat_school",
        "filename": "brehen",
        "count": "1",
        "quote": "Known as the Cat of Iello. A moniker earned not from origins, but as a result of slaughtering peasants there. More of a massacre, really."
    },
    "wu_gerd": {
        "name": "Gerd",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "8",
        "ability": "scorch_c witcher_bear_school",
        "filename": "gerd",
        "count": "1",
        "quote": "He was contracted to slay a dragon, a siren, and a striga. He was also being pursued by a vengeful knight, bounty hunters, and bandits."
    },
    "wu_warrit": {
        "name": "Warrit the All-Seeing",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "7",
        "ability": "witcher_viper_school",
        "filename": "warrit",
        "count": "1",
        "quote": "By slightly modifying the Supirre sign, Warritt gained the ability to see... everything."
    },
    "wu_erland": {
        "name": "Erland of Larvik",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "9",
        "ability": "witcher_griffin_school",
        "filename": "erland",
        "count": "1",
        "quote": "Erland founded the School of the Griffin, and hoped his emphasis on knightly values would help elevate the reputation of witchers among the common folk."
    },
    "wu_arnaghad": {
        "name": "Arnaghad",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "9",
        "ability": "witcher_bear_school",
        "filename": "arnaghad",
        "count": "1",
        "quote": "A witcher’s job is to kill monsters and collect coin. No more, no less."
    },
    "wu_letho": {
        "name": "Letho of Gulet",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "9",
        "ability": "scorch_c witcher_viper_school",
        "filename": "letho",
        "count": "1",
        "quote": "Witchers never die in their beds."
    },
    "wu_eskel": {
        "name": "Eskel",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "8",
        "ability": "witcher_wolf_school",
        "filename": "eskel",
        "count": "1",
        "quote": "I'm a simple witcher, Wolf. Don't fight dragons, don't fraternize with kings and don't sleep with sorceresses..."
    },
    "wu_kolgrim": {
        "name": "Kolgrim",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "6",
        "ability": "witcher_viper_school",
        "filename": "kolgrim",
        "count": "1",
        "quote": "Fortune only smiled upon him if it was accompanied by a stroke of very bad luck."
    },
    "wu_swallow_potion": {
        "name": "Swallow Potion",
        "deck": "witcher_universe",
        "row": "agile_cr",
        "strength": "2",
        "ability": "horn",
        "filename": "swallow_potion",
        "count": "1",
        "quote": "Symbolizing spring and rejuvenation, the swallow lent its name to this potion that accelerates the rate at which wounds scab over and heal."
    },
    "spe_sign_igni": {
        "name": "Sign: Igni",
        "deck": "special witcher_universe",
        "row": "",
        "strength": "",
        "ability": "scorch",
        "filename": "sign_igni",
        "count": "3",
        "quote": "A twist of a witcher's fingers can light a lamp… or incinerate a foe."
    },
    "spe_sign_quen": {
        "name": "Sign: Quen",
        "deck": "special witcher_universe",
        "row": "",
        "strength": "",
        "ability": "shield",
        "filename": "sign_quen",
        "count": "3",
        "quote": "Geralt, feeling the iron taste of blood in his mouth, shouted a spell, with his fingers open in the Quen Sign."
    },
    "spe_sign_axii": {
        "name": "Sign: Axii",
        "deck": "special witcher_universe",
        "row": "",
        "strength": "",
        "ability": "seize",
        "filename": "sign_axii",
        "count": "3",
        "quote": "Geralt makes the Axii sign with the fingers of his right hand above the steed's head and whispers the incantation."
    },
    "spe_sign_aard": {
        "name": "Sign: Aard",
        "deck": "special witcher_universe",
        "row": "",
        "strength": "",
        "ability": "knockback",
        "filename": "sign_aard",
        "count": "3",
        "quote": "A blast of concentrated energy that pummels everything in its path. Great for when you forget your keys."
    },
    "spe_sign_yrden": {
        "name": "Sign: Yrden",
        "deck": "special witcher_universe",
        "row": "",
        "strength": "",
        "ability": "lock",
        "filename": "sign_yrden",
        "count": "3",
        "quote": "He lay down next to Adda's mummified remains, drawing the Yrden Sign on the inner side of her sarcophagus' lid."
    },
    "wu_alzur_maker": {
        "name": "Alzur: The Maker of Spells",
        "deck": "witcher_universe",
        "row": "leader",
        "strength": "",
        "ability": "alzur_maker",
        "filename": "alzur_maker",
        "count": "1",
        "quote": "A rebel… outcast... knight… even sorcerer if you can believe that."
    },
    "wu_koshchey": {
        "name": "Koshchey",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "9",
        "ability": "scorch_c",
        "filename": "koshchey",
        "count": "0",
        "quote": "If I tell you koshchey is death, you'll go to the creek anyway, right?"
    },
    "wu_doppler_1": {
        "name": "Doppler",
        "deck": "witcher_universe",
        "row": "agile_cr",
        "strength": "4",
        "ability": "spy",
        "filename": "doppler_1",
        "count": "1",
        "quote": "I'll be on my way and lose myself in the crowd."
    },
    "wu_idr": {
        "name": "Idr",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "10",
        "ability": "",
        "filename": "idr",
        "count": "1",
        "quote": "Who's a good boy? ⁠— Idarran"
    },
    "wu_iris_von_everec": {
        "name": "Iris von Everec",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "9",
        "ability": "hero",
        "filename": "iris_von_everec",
        "count": "1",
        "quote": "I remember so little... Yet when I think of my rose, I begin to recall what was."
    },
    "wu_sarah": {
        "name": "Sarah",
        "deck": "witcher_universe",
        "row": "siege",
        "strength": "7",
        "ability": "spy",
        "filename": "sarah",
        "count": "1",
        "quote": "Little Sarah wants to play!"
    },
    "wu_djinn": {
        "name": "Djinn",
        "deck": "witcher_universe",
        "row": "siege",
        "strength": "6",
        "ability": "hero scorch_c",
        "filename": "djinn",
        "count": "1",
        "quote": "A djinn, good sirs, fulfills but three wishes. Thus freed, it flees to dimensions unknown."
    },
    "wu_myrgtabrakke": {
        "name": "Myrgtabrakke",
        "deck": "witcher_universe",
        "row": "siege",
        "strength": "10",
        "ability": "",
        "filename": "myrgtabrakke",
        "count": "1",
        "quote": "Never get between a mother dragon and her young."
    },
    "wu_vincent_meis": {
        "name": "Vincent Meis",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "5",
        "ability": "scorch_c",
        "filename": "vincent_meis",
        "count": "1",
        "quote": "By day, Captain of the Vizima City Guard. By night, merciless avenger and defender of the downtrodden."
    },
    "wu_raging_bear": {
        "name": "Raging Bear",
        "deck": "witcher_universe",
        "row": "agile_cr",
        "strength": "6",
        "ability": "scorch",
        "filename": "raging_bear",
        "count": "1",
        "quote": "Tame? Och, lad, people might train bears but that don't at all mean they tame 'em..."
    },
    "wu_iris_companions_1": {
        "name": "Iris Companions: Black Dog",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "4",
        "ability": "muster",
        "filename": "iris_companions",
        "count": "1",
        "target": "wu_iris_companions",
        "quote": "We'd rather keep our names to ourselves. Think of us as… friends of the house."
    },
    "wu_iris_companions_2": {
        "name": "Iris Companions: Black Cat",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "4",
        "ability": "muster",
        "filename": "iris_companions",
        "count": "1",
        "target": "wu_iris_companions",
        "quote": "We'd rather keep our names to ourselves. Think of us as… friends of the house."
    },
    "wu_vlodimir_von_everec": {
        "name": "Vlodimir von Everec",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "7",
        "ability": "",
        "filename": "vlodimir_von_everec",
        "count": "1",
        "quote": "Vlodimir liked to have a good time when he was alive and greatly missed having fun after his death."
    },
    "wu_phoenix": {
        "name": "Phoenix",
        "deck": "witcher_universe",
        "row": "agile_cr",
        "strength": "10",
        "ability": "hero",
        "filename": "phoenix",
        "count": "1",
        "quote": "What came first, the chicken or the egg? Compared to the conundrum that is the phoenix, that question seems downright trivial."
    },
    "wu_boris": {
        "name": "Boris",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "10",
        "ability": "hero",
        "filename": "boris",
        "count": "1",
        "quote": "After getting a taste of human flesh, he won't eat anything else."
    },
    "wu_marlene_trastamara": {
        "name": "Marlene de Trastamara",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "6",
        "ability": "",
        "filename": "marlene_trastamara",
        "count": "1",
        "quote": "None shall sit and dine with you at your table, no spoon you have shall sate you, never again shall you wish to spy your reflection in the mirror."
    },
    "wu_idarran_ulivo": {
        "name": "Idarran of Ulivo",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "8",
        "ability": "hero avenger",
        "filename": "idarran_ulivo",
        "count": "1",
        "target": "wu_idr",
        "quote": "After getting a taste of human flesh, he won't eat anything else."
    },
    "wu_mad_kiyan": {
        "name": "Mad Kiyan",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "7",
        "ability": "witcher_cat_school",
        "filename": "mad_kiyan",
        "count": "1",
        "quote": "We live on a placid island of ignorance in the midst of black seas of infinity, and it was not meant that we should voyage far."
    },
    "wu_cicada": {
        "name": "Cicada",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "7",
        "ability": "",
        "filename": "cicada",
        "count": "1",
        "quote": "Ivo Mierce, better known by his nickname Cicada, war a criminal and bodyguard."
    },
    "wu_nivellen": {
        "name": "Nivellen",
        "deck": "witcher_universe",
        "row": "agile_cr",
        "strength": "8",
        "ability": "",
        "filename": "nivellen",
        "count": "1",
        "quote": "Flee mortal man! I'll devour you! Tear you to pieces!"
    },
    "wu_vilgefortz_sorcerer": {
        "name": "Vilgefortz: Sorcerer of Roggeveen",
        "deck": "witcher_universe",
        "row": "leader",
        "strength": "",
        "ability": "vilgefortz_sorcerer",
        "filename": "vilgefortz_sorcerer",
        "count": "1",
        "quote": "You've mistaken the stars reflected on the surface of the lake at night for the heavens."
    },
    "wu_doppler_2": {
        "name": "Doppler",
        "deck": "witcher_universe",
        "row": "agile_cr",
        "strength": "6",
        "ability": "spy",
        "filename": "doppler_2",
        "count": "1",
        "quote": "I'll be on my way and lose myself in the crowd."
    },
    "wu_pellar": {
        "name": "Pellar",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "2",
        "ability": "medic",
        "filename": "pellar",
        "count": "1",
        "quote": "Gather spirits for this wake, A passing soul ne'er forsake, Hear my call, my humble plea, Unbind his chains, set him free."
    },
    "wu_kelpie": {
        "name": "Kelpie",
        "deck": "witcher_universe",
        "row": "siege",
        "strength": "0",
        "ability": "avenger",
        "filename": "kelpie",
        "count": "1",
        "target": "ntr_ciri",
        "quote": "In the north 'Kelpie' was a sea monster..."
    },
    "wu_vysogota": {
        "name": "Vysogota of Corvo",
        "deck": "witcher_universe",
        "row": "siege",
        "strength": "2",
        "ability": "medic",
        "filename": "vysogota",
        "count": "1",
        "quote": "I, Vysogota of Corvo, do not believe in the existence of the gods."
    },
    "wu_angouleme": {
        "name": "Angouleme",
        "deck": "witcher_universe",
        "row": "agile_cr",
        "strength": "5",
        "ability": "",
        "filename": "angouleme",
        "count": "1",
        "quote": "You damned tricksters! Nothing but swindlers!"
    },
    "wu_tea_vea_1": {
        "name": "Tea & Vea",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "5",
        "ability": "muster",
        "filename": "tea_vea_1",
        "count": "1",
        "target": "wu_tea_vea",
        "quote": "Her sabre, drawn faster than they eye could see, cut through the air."
    },
    "wu_tea_vea_2": {
        "name": "Tea & Vea",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "5",
        "ability": "muster",
        "filename": "tea_vea_2",
        "count": "1",
        "target": "wu_tea_vea",
        "quote": "Her sabre, drawn faster than they eye could see, cut through the air."
    },
    "wu_iola": {
        "name": "Iola",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "0",
        "ability": "medic",
        "filename": "iola",
        "count": "1",
        "quote": "The priestess slowly shook her head, sniffed and wiped a tear away."
    },
    "wu_rhapsodic_melody": {
        "name": "Rhapsodic Melody",
        "deck": "witcher_universe",
        "row": "agile_cr",
        "strength": "2",
        "ability": "horn",
        "filename": "rhapsodic_melody",
        "count": "1",
        "quote": "War's not so horrific when you put a catchy tune to it."
    },
    "wu_nenneke": {
        "name": "Nenneke",
        "deck": "witcher_universe",
        "row": "siege",
        "strength": "1",
        "ability": "medic",
        "filename": "nenneke",
        "count": "1",
        "quote": "Few know more about healing than Nenneke."
    },
    "wu_roach": {
        "name": "Roach",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "0",
        "ability": "avenger",
        "filename": "roach",
        "count": "1",
        "target": "ntr_geralt",
        "quote": "Geralt, we gotta have a man–to–horse talk. No offense, but your riding skills? They leave a bit to be desired, buddy."
    },
    "wu_kalkstein": {
        "name": "Adalbertus Kalkstein",
        "deck": "witcher_universe",
        "row": "siege",
        "strength": "4",
        "ability": "morale",
        "filename": "kalkstein",
        "count": "1",
        "quote": "Before Kalkstein departed this world, he left us with some rather unflattering words about our gracious king..."
    },
    "wu_gerd_2": {
        "name": "Gerd",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "11",
        "ability": "hero",
        "filename": "gerd_2",
        "count": "1",
        "quote": "Righteous and brave, of death never scared. Such a man had we in the witcher Gerd."
    },
    "wu_lambert_2": {
        "name": "Lambert",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "10",
        "ability": "hero",
        "filename": "lambert_2",
        "count": "1",
        "quote": "Lambert, Lambert, what a prick."
    },
    "wu_eskel_2": {
        "name": "Eskel",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "10",
        "ability": "hero morale",
        "filename": "eskel_2",
        "count": "1",
        "quote": "Heard you panting from three miles away. Just didn't wanna give up that vantage point."
    },
    "wu_sheenaz": {
        "name": "Sh'eenaz",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "5",
        "ability": "hero morale",
        "filename": "sheenaz",
        "count": "1",
        "quote": "The excuses, the stupid and naive excuses: not the slightest bit of dedication!"
    },
    "wu_george_kagen": {
        "name": "George of Kagen",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "6",
        "ability": "witcher_griffin_school",
        "filename": "george_kagen",
        "count": "1",
        "quote": "Instead of monsters, he only found villagers lighting fake fires to sink and loot all arriving ships."
    },
    "wu_leo": {
        "name": "Leo",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "6",
        "ability": "witcher_wolf_school",
        "filename": "leo",
        "count": "1",
        "quote": "He would have caught the arrow if he only had some heads-up."
    },
    "wu_renfri": {
        "name": "Renfri",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "7",
        "ability": "",
        "filename": "renfri",
        "count": "1",
        "quote": "In this fairytale, the princess and the monster are the same person."
    },
    "wu_gimpy_gerwin": {
        "name": "Gimpy Gerwin",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "6",
        "ability": "",
        "filename": "gimpy_gerwin",
        "count": "1",
        "quote": "Keep the vermin on a short leash. And don't be afraid to use that whip!"
    },
    "wu_fugas": {
        "name": "Fugas",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "7",
        "ability": "",
        "filename": "fugas",
        "count": "1",
        "quote": "Heh, givin' me orders? You? A human?"
    },
    "wu_barnabas": {
        "name": "Barnabas Beckenbauer",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "1",
        "ability": "medic",
        "filename": "barnabas",
        "count": "1",
        "quote": "I think you'll really like this one!"
    },
    "wu_torque": {
        "name": "Torque",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "6",
        "ability": "",
        "filename": "torque",
        "count": "1",
        "quote": "Where an elf cannot go himself, he sends a devil."
    },
    "wu_deserter_1": {
        "name": "Deserter",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "4",
        "ability": "muster",
        "filename": "deserter_1",
        "count": "1",
        "target": "wu_deserter",
        "quote": "It is interesting that every second deserter is a volunteer."
    },
    "wu_deserter_2": {
        "name": "Deserter",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "3",
        "ability": "muster",
        "filename": "deserter_2",
        "count": "1",
        "target": "wu_deserter",
        "quote": "It is interesting that every second deserter is a volunteer."
    },
    "wu_deserter_3": {
        "name": "Deserter",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "3",
        "ability": "muster",
        "filename": "deserter_3",
        "count": "1",
        "target": "wu_deserter",
        "quote": "It is interesting that every second deserter is a volunteer."
    },
    "wu_bloody_baron": {
        "name": "Bloody Baron",
        "deck": "witcher_universe",
        "row": "close",
        "strength": "5",
        "ability": "",
        "filename": "bloody_baron",
        "count": "1",
        "quote": "I've not been a good father, I know, but… perhaps it's not too late."
    },
    "wu_essi_daven": {
        "name": "Essi Daven",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "2",
        "ability": "horn",
        "filename": "essi_daven",
        "count": "1",
        "quote": "When you have no talent, you don't have the luxury of choosing your audience."
    },
    "wu_fercart": {
        "name": "Fercart",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "5",
        "ability": "",
        "filename": "fercart",
        "count": "1",
        "quote": "Pawns will never know of the unseen hands, maneuvering them toward certain doom."
    },
    "wu_artaud_terranova": {
        "name": "Artaud Terranova",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "5",
        "ability": "",
        "filename": "artaud_terranova",
        "count": "1",
        "quote": "Ambition can be blinding."
    },
    "wu_auckes": {
        "name": "Auckes",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "6",
        "ability": "witcher_viper_school",
        "filename": "auckes",
        "count": "1",
        "quote": "Letho's got a plan… what could go wrong?"
    },
    "wu_serrit": {
        "name": "Serrit",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "6",
        "ability": "witcher_viper_school",
        "filename": "serrit",
        "count": "1",
        "quote": "We do what we must. I am not ashamed of that."
    },
    "wu_junod": {
        "name": "Junod of Belhaven",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "6",
        "ability": "witcher_bear_school",
        "filename": "junod",
        "count": "1",
        "quote": "Rumour has it he was born of an unusual love between a lady giant and one VERY brave dwarf."
    },
    "wu_berengar": {
        "name": "Berengar",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "6",
        "ability": "witcher_wolf_school",
        "filename": "berengar",
        "count": "1",
        "quote": "Talking the vodyanoi out of sacrificing the prize-winning cow wasn’t an easy task."
    },
    "wu_stregobor": {
        "name": "Stregobor",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "4",
        "ability": "",
        "filename": "stregobor",
        "count": "1",
        "quote": "I'll be honest, although for my own sake I shouldn't."
    },
    "wu_renew": {
        "name": "Renew",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "2",
        "ability": "medic",
        "filename": "renew",
        "count": "1",
        "quote": "Medicus curat, magicae sanat."
    },
    "wu_prophet_lebioda": {
        "name": "Prophet Lebioda",
        "deck": "witcher_universe",
        "row": "ranged",
        "strength": "8",
        "ability": "",
        "filename": "prophet_lebioda",
        "count": "1",
        "quote": "To thine own self be judge and ruler for thou alone shalt answer for thine deeds before thee."
    },
    "wu_johnny": {
        "name": "Johnny",
        "deck": "witcher_universe",
        "row": "siege",
        "strength": "8",
        "ability": "spy",
        "filename": "johnny",
        "count": "1",
        "quote": "Peter Piper picked Prince Proximo a peck of pickled peppers by the Pontar."
    },
    "wu_istredd": {
        "name": "Istredd",
        "deck": "witcher_universe",
        "row": "siege",
        "strength": "5",
        "ability": "",
        "filename": "istredd",
        "count": "1",
        "quote": "Love can make one do crazy things. The loss of love, even more so."
    },
    "wu_salma": {
        "name": "Salma",
        "deck": "witcher_universe",
        "row": "siege",
        "strength": "4",
        "ability": "",
        "filename": "salma",
        "count": "1",
        "quote": "I'm not one to lie. Nor do I kill without reason."
    },
    "wu_field_marshal_duda": {
        "name": "Field Marshal Duda",
        "deck": "witcher_universe",
        "row": "siege",
        "strength": "1",
        "ability": "morale",
        "filename": "field_marshal_duda",
        "count": "1",
        "quote": "Brilliants! Brilliants!"
    }
};



var ext_lr_cards = {
    "spe_lyria_rivia_morale": {
        "name": "Lyria & Rivia: Morale Boost",
        "deck": "special lyria_rivia",
        "row": "",
        "strength": "",
        "ability": "morale",
        "filename": "lyria_rivia_morale",
        "count": "0",
        "quote": "For Lyria and Rivia!"
    },
    "lr_meve_princess": {
        "name": "Meve: The Princess of Lyria",
        "deck": "lyria_rivia",
        "row": "leader",
        "strength": "",
        "ability": "meve_princess",
        "filename": "meve_princess",
        "count": "1",
        "quote": "The Gods watch over us, we'll come through the fray unharmed."
    },
    "lr_rivian_mauler": {
        "name": "Rivia Mauler",
        "deck": "lyria_rivia",
        "row": "close",
        "strength": "7",
        "ability": "",
        "filename": "rivian_mauler",
        "count": "1",
        "quote": "Ugh, these guys can be a real headache."
    },
    "lr_grey_rider": {
        "name": "Grey Rider",
        "deck": "lyria_rivia",
        "row": "ranged",
        "strength": "4",
        "ability": "muster",
        "filename": "grey_rider",
        "count": "2",
        "target": "lr_grey_rider",
        "quote": "This is not steel and blood that win wars, but information."
    },
    "lr_prince_anseis": {
        "name": "Prince Anséis",
        "deck": "lyria_rivia",
        "row": "close",
        "strength": "10",
        "ability": "hero",
        "filename": "prince_anseis",
        "count": "1",
        "quote": "Your presence at this tourney is an affront to my honor!"
    },
    "lr_royal_guard": {
        "name": "Royal Guard",
        "deck": "lyria_rivia",
        "row": "close",
        "strength": "9",
        "ability": "",
        "filename": "royal_guard",
        "count": "1",
        "quote": "Each must serve with unconditionnal loyalty and possess a devilishly handsome jawline."
    },
    "lr_landsknecht": {
        "name": "Lyrian Landsknecht",
        "deck": "lyria_rivia",
        "row": "close",
        "strength": "3",
        "ability": "muster",
        "filename": "landsknecht",
        "count": "3",
        "target": "lr_landsknecht",
        "quote": "Best not laugh at their silly-arse hats. Believe me."
    },
    "lr_knighthood": {
        "name": "Knighthood",
        "deck": "lyria_rivia",
        "row": "close",
        "strength": "10",
        "ability": "",
        "filename": "knighthood",
        "count": "1",
        "quote": "Kneel an everyman, arise a knight."
    },
    "lr_reynard_odo": {
        "name": "Reynard Odo",
        "deck": "lyria_rivia",
        "row": "close",
        "strength": "10",
        "ability": "hero morale",
        "filename": "reynard_odo",
        "count": "1",
        "quote": "Under your husband I served ten years, under you another eight."
    },
    "lr_war_wagon": {
        "name": "War Wagon",
        "deck": "lyria_rivia",
        "row": "ranged",
        "strength": "4",
        "ability": "avenger",
        "filename": "war_wagon",
        "count": "1",
        "target": "lr_wagenburg",
        "quote": "Hay out, archersin! Go, go go!"
    },
    "lr_wagenburg": {
        "name": "Wagenburg",
        "deck": "lyria_rivia",
        "row": "ranged",
        "strength": "3",
        "ability": "muster",
        "filename": "wagenburg",
        "count": "3",
        "target": "lr_wagenburg_muster",
        "quote": "Dh'oine can turn anything into a weapon. Even a simple wagon..."
    },
    "lr_gascon": {
        "name": "Gascon",
        "deck": "lyria_rivia",
        "row": "ranged",
        "strength": "10",
        "ability": "hero",
        "filename": "gascon",
        "count": "1",
        "quote": "I'm doing what I used to do and they're paying me for it!"
    },
    "lr_pikeman": {
        "name": "Rivian Pikeman",
        "deck": "lyria_rivia",
        "row": "close",
        "strength": "6",
        "ability": "",
        "filename": "pikeman",
        "count": "1",
        "quote": "Get off your high horse and face me!"
    },
    "lr_light_cavalry": {
        "name": "Light Cavalry",
        "deck": "lyria_rivia",
        "row": "close",
        "strength": "5",
        "ability": "muster",
        "filename": "light_cavalry",
        "count": "2",
        "target": "lr_light_cavalry",
        "quote": "Stay calm, everyone. And be alert."
    },
    "lr_rayla": {
        "name": "Rayla",
        "deck": "lyria_rivia",
        "row": "close",
        "strength": "10",
        "ability": "hero",
        "filename": "rayla",
        "count": "1",
        "quote": "Exceptions are a clear road to human blood spilt. All Scoia'tael must die."
    },
    "lr_wagon": {
        "name": "Wagon",
        "deck": "lyria_rivia",
        "row": "agile_cr",
        "strength": "1",
        "ability": "medic",
        "filename": "wagon",
        "count": "1",
        "quote": "The driver swore he was carrying seeds. But seeds don't clank on bumps in the road..."
    },
    "lr_lyrian_cavalry": {
        "name": "Lyrian Cavalry",
        "deck": "lyria_rivia",
        "row": "close",
        "strength": "8",
        "ability": "",
        "filename": "lyrian_cavalry",
        "count": "1",
        "quote": "A horseman's worth no less than his steed. And Lyrian horses are among the Continent's best."
    },
    "lr_isbel_hagge": {
        "name": "Isbel of Hagge",
        "deck": "lyria_rivia",
        "row": "ranged",
        "strength": "4",
        "ability": "medic",
        "filename": "isbel_hagge",
        "count": "1",
        "quote": "I promised I would never again use magic to harm others."
    },
    "lr_hajduk": {
        "name": "Lyrian Hajduk",
        "deck": "lyria_rivia",
        "row": "agile_cr",
        "strength": "3",
        "ability": "horn",
        "filename": "hajduk",
        "count": "1",
        "quote": "War, war... What's it bloody good for..."
    },
    "spe_wyvern_shield": {
        "name": "Wyvern Scale Shield",
        "deck": "special lyria_rivia",
        "row": "",
        "strength": "",
        "ability": "shield_c",
        "filename": "wyvern_shield",
        "count": "1",
        "quote": "Stronger than your average shield and far more stylish."
    },
    "spe_mantlet": {
        "name": "Mantlet",
        "deck": "special lyria_rivia",
        "row": "",
        "strength": "",
        "ability": "shield_r",
        "filename": "mantlet",
        "count": "1",
        "quote": "Something like the bastard child of a shield and a palisade."
    },
    "spe_watchman": {
        "name": "Watchman",
        "deck": "special lyria_rivia",
        "row": "",
        "strength": "",
        "ability": "shield_r",
        "filename": "watchman",
        "count": "1",
        "quote": "I can't even see over this bloody thing."
    },
    "spe_garrison": {
        "name": "Garrison",
        "deck": "special lyria_rivia",
        "row": "",
        "strength": "",
        "ability": "shield_s",
        "filename": "garrison",
        "count": "1",
        "quote": "Knock, knock… anybody home?"
    },
    "lr_meve_white_queen": {
        "name": "Meve: The White Queen",
        "deck": "lyria_rivia",
        "row": "leader",
        "strength": "",
        "ability": "meve_white_queen",
        "filename": "meve_white_queen",
        "count": "1",
        "quote": "I've made my choice. Time you made yours."
    },
    "lr_piercing_missile": {
        "name": "Piercing Missile",
        "deck": "lyria_rivia",
        "row": "ranged",
        "strength": "3",
        "ability": "scorch_c",
        "filename": "piercing_missile",
        "count": "1",
        "quote": "There's no armor that can't be pierced."
    },
    "lr_eavesdrop": {
        "name": "Eavesdrop",
        "deck": "lyria_rivia",
        "row": "ranged",
        "strength": "6",
        "ability": "spy",
        "filename": "eavesdrop",
        "count": "1",
        "quote": "There are always more ears in the room than those you can count."
    },
    "lr_trebuchet": {
        "name": "Lyrian Trebuchet",
        "deck": "lyria_rivia",
        "row": "siege",
        "strength": "9",
        "ability": "",
        "filename": "trebuchet",
        "count": "1",
        "quote": "Feel that? The earth trembles each time Big Bertha loose a stone."
    },
    "lr_arbalest": {
        "name": "Lyrian Arbalest",
        "deck": "lyria_rivia",
        "row": "ranged",
        "strength": "4",
        "ability": "muster",
        "filename": "arbalest",
        "count": "3",
        "target": "lr_arbalest",
        "quote": "I can find the bull's-eye from a hundred paces! Perhaps not with my first shot, mind you..."
    },
    "lr_spellweaver": {
        "name": "Spellweaver",
        "deck": "lyria_rivia",
        "row": "ranged",
        "strength": "7",
        "ability": "",
        "filename": "spellweaver",
        "count": "1",
        "quote": "Reality is so terribly tedious..."
    },
    "lr_forager": {
        "name": "Forager",
        "deck": "lyria_rivia",
        "row": "ranged",
        "strength": "5",
        "ability": "",
        "filename": "forager",
        "count": "1",
        "quote": "If you'll not be needin' it, I'm willin' to take it off your hands..."
    },
    "lr_sapper": {
        "name": "Rivian Sapper",
        "deck": "lyria_rivia",
        "row": "ranged",
        "strength": "4",
        "ability": "scorch",
        "filename": "sapper",
        "count": "1",
        "quote": "First Nilfgaardian who tried to slip 'cross our line was a right sneaky bastard."
    },
    "lr_villem": {
        "name": "Prince Villem",
        "deck": "lyria_rivia",
        "row": "siege",
        "strength": "8",
        "ability": "hero",
        "filename": "villem",
        "count": "1",
        "quote": "The boy's not fit to wear the crown. Hasn't sufficient wit nor valor."
    },
    "lr_scout": {
        "name": "Scout",
        "deck": "lyria_rivia",
        "row": "siege",
        "strength": "5",
        "ability": "spy",
        "filename": "scout",
        "count": "1",
        "quote": "If our scouts don't come back, we turn around."
    },
    "lr_winch": {
        "name": "Winch",
        "deck": "lyria_rivia",
        "row": "siege",
        "strength": "5",
        "ability": "morale",
        "filename": "winch",
        "count": "1",
        "quote": "It's a winch. Not much to flap your jaw about."
    },
    "lr_banner": {
        "name": "Lyrian Banner",
        "deck": "lyria_rivia",
        "row": "siege",
        "strength": "2",
        "ability": "horn",
        "filename": "banner",
        "count": "1",
        "quote": "Our emblem? A black eagle. Fate of our foes? Pure misery."
    },
    "lr_scytheman_1": {
        "name": "Lyrian Scytheman",
        "deck": "lyria_rivia",
        "row": "close",
        "strength": "3",
        "ability": "decoy",
        "filename": "scytheman",
        "count": "1",
        "quote": "Our folk they feed, and our foes they bleed."
    },
    "lr_scytheman_2": {
        "name": "Lyrian Scytheman",
        "deck": "lyria_rivia",
        "row": "ranged",
        "strength": "3",
        "ability": "decoy",
        "filename": "scytheman",
        "count": "1",
        "quote": "Our folk they feed, and our foes they bleed."
    },
    "lr_scytheman_3": {
        "name": "Lyrian Scytheman",
        "deck": "lyria_rivia",
        "row": "siege",
        "strength": "3",
        "ability": "decoy",
        "filename": "scytheman",
        "count": "1",
        "quote": "Our folk they feed, and our foes they bleed."
    },
    "lr_caldwell": {
        "name": "Count Caldwell",
        "deck": "lyria_rivia",
        "row": "ranged",
        "strength": "9",
        "ability": "hero spy",
        "filename": "caldwell",
        "count": "1",
        "quote": "Your Majesty... For the queen to question commoners, why, it's simply not proper..."
    },
    "lr_physician": {
        "name": "Physician",
        "deck": "lyria_rivia",
        "row": "siege",
        "strength": "3",
        "ability": "medic",
        "filename": "physician",
        "count": "1",
        "quote": "Do not twitch, lie still..."
    },
    "lr_pyrokinesis": {
        "name": "Pyrokinesis",
        "deck": "lyria_rivia",
        "row": "ranged",
        "strength": "8",
        "ability": "",
        "filename": "pyrokinesis",
        "count": "1",
        "quote": "I really hope that's boot leather I smell burning..."
    },
    "lr_carroballista": {
        "name": "Carroballista",
        "deck": "lyria_rivia",
        "row": "siege",
        "strength": "10",
        "ability": "",
        "filename": "carroballista",
        "count": "1",
        "quote": "This ballista's on the wagon."
    },
    "lr_artificer": {
        "name": "Artificer",
        "deck": "lyria_rivia",
        "row": "ranged",
        "strength": "2",
        "ability": "medic",
        "filename": "artificer",
        "count": "1",
        "quote": "What shall I call it? Perhaps Andúril..."
    },
    "lr_siege": {
        "name": "Siege",
        "deck": "lyria_rivia",
        "row": "siege",
        "strength": "6",
        "ability": "scorch",
        "filename": "siege",
        "count": "1",
        "quote": "There's no fortress that can't be taken. There are just fortresses not worth taking."
    },
    "lr_onager": {
        "name": "Rivian Onager",
        "deck": "lyria_rivia",
        "row": "siege",
        "strength": "6",
        "ability": "",
        "filename": "onager",
        "count": "1",
        "quote": "For Riviaaa!"
    },
    "lr_blacksmith": {
        "name": "Lyrian Blacksmith",
        "deck": "lyria_rivia",
        "row": "close",
        "strength": "4",
        "ability": "morale",
        "filename": "blacksmith",
        "count": "1",
        "quote": "Somethin' from nothin'... my speciality."
    },
    "lr_peasant_militia": {
        "name": "Peasant Militia",
        "deck": "lyria_rivia",
        "row": "close",
        "strength": "4",
        "ability": "",
        "filename": "peasant_militia",
        "count": "1",
        "quote": "We's the militia. We keep the peace."
    }
};

var ext_sy_cards = {
    "sy_carlo_varese": {
        "name": "Carlo Varese: Cleaver",
        "deck": "syndicate",
        "row": "leader",
        "strength": "",
        "ability": "carlo_varese",
        "filename": "carlo_varese",
        "count": "1",
        "quote": "Me hogs willnae go hungry th' day thanks to ye."
    },
    "sy_francis_bedlam": {
        "name": "Francis Bedlam: King of Beggars",
        "deck": "syndicate",
        "row": "leader",
        "strength": "",
        "ability": "francis_bedlam",
        "filename": "francis_bedlam",
        "count": "1",
        "quote": "You say tribute, I say taxes."
    },
    "sy_cyprian_wiley": {
        "name": "Cyprian Wiley: Whoreson Junior",
        "deck": "syndicate",
        "row": "leader",
        "strength": "",
        "ability": "cyprian_wiley",
        "filename": "cyprian_wiley",
        "count": "1",
        "quote": "A war with Whoreson will see Novigrad's gutters run red with blood."
    },
    "sy_gudrun_bjornsdottir": {
        "name": "Gudrun Bjornsdottir: Pirate Queen",
        "deck": "syndicate",
        "row": "leader",
        "strength": "",
        "ability": "gudrun_bjornsdottir",
        "filename": "gudrun_bjornsdottir",
        "count": "1",
        "quote": "She found her freedom among blue waters and salty wind."
    },
    "sy_cyrus_hemmelfart": {
        "name": "Cyrus Hemmelfart: Hierarch of Novigrad",
        "deck": "syndicate",
        "row": "leader",
        "strength": "",
        "ability": "cyrus_hemmelfart",
        "filename": "cyrus_hemmelfart",
        "count": "1",
        "quote": "Beneath all that lust, greed, and vanity, stands an honorable man."
    },
    "sy_sigi_reuven": {
        "name": "Sigi Reuven",
        "deck": "syndicate",
        "row": "close",
        "strength": "8",
        "ability": "hero morale",
        "filename": "sigi_reuven",
        "count": "0",
        "quote": "You sure he don't look the least bit familar...?"
    },
    "sy_flyndr_crew": {
        "name": "Flyndr' Crew",
        "deck": "syndicate",
        "row": "close",
        "strength": "4",
        "ability": "horn",
        "filename": "flyndr_crew",
        "count": "0",
        "quote": "Wretches and thieves drunk on grog, bloodshed and booty - could you ever hope for a better crew?"
    },
    "spe_dimeritium_shackles": {
        "name": "Dimeritium Shackles",
        "deck": "special syndicate",
        "row": "",
        "strength": "",
        "ability": "lock",
        "filename": "dimeritium_shackles",
        "count": "3",
        "quote": "Terranova cried out, lurched, bent backwards, bowed forward, then retched and groaned. It was clear of what his manacles were made."
    },
    "sy_flaming_rose_footman": {
        "name": "Flaming Rose Footman",
        "deck": "syndicate",
        "row": "close",
        "strength": "6",
        "ability": "",
        "filename": "flaming_rose_footman",
        "count": "1",
        "quote": "Anyone can join The Order – a knight, a peasant, even a witcher. "
    },
    "sy_bare_knuckle_brawler": {
        "name": "Bare Knuckle Brawler",
        "deck": "syndicate",
        "row": "close",
        "strength": "8",
        "ability": "hero",
        "filename": "bare_knuckle_brawler",
        "count": "1",
        "quote": "Is tha' all that's left of 'im? Think I'm goin' tae boak..."
    },
    "sy_eibhear_hattori": {
        "name": "Eibhear Hattori",
        "deck": "syndicate",
        "row": "ranged",
        "strength": "2",
        "ability": "medic",
        "filename": "eibhear_hattori",
        "count": "1",
        "quote": "Only thing that can rival his swords? His dumplings."
    },
    "sy_witch_hunter": {
        "name": "Witch Hunter",
        "deck": "syndicate",
        "row": "close",
        "strength": "2",
        "ability": "witch_hunt",
        "filename": "witch_hunter",
        "count": "1",
        "quote": "Long coats, wide-brimmed hats, and crooked grins – witch hunters are hard to miss."
    },
    "sy_witch_hunter_executioner": {
        "name": "Witch Hunter Executioner",
        "deck": "syndicate",
        "row": "close",
        "strength": "3",
        "ability": "witch_hunt",
        "filename": "witch_hunter_executioner",
        "count": "1",
        "quote": "It'd be a right shame if I cut any of your beautiful hair."
    },
    "sy_casino_bouncers": {
        "name": "Casino Bouncers",
        "deck": "syndicate",
        "row": "close",
        "strength": "7",
        "ability": "",
        "filename": "casino_bouncers",
        "count": "1",
        "quote": "Junior said our nasty mugs was frightenin' off all the coin. Don't rightly see 'ow this helps any..."
    },
    "sy_caleb_menge": {
        "name": "Caleb Menge",
        "deck": "syndicate",
        "row": "agile_cr",
        "strength": "7",
        "ability": "hero witch_hunt",
        "filename": "caleb_menge",
        "count": "1",
        "quote": "Deceivers, heretics, witches! They flood our city, corrupt our virtue, and threaten our very way of life!"
    },
    "sy_greater_brothers": {
        "name": "Greater Brothers",
        "deck": "syndicate",
        "row": "close",
        "strength": "10",
        "ability": "hero",
        "filename": "greater_brothers",
        "count": "1",
        "quote": "A battering ram? No need, we'll handle it another way."
    },
    "sy_eternal_fire_inquisitor": {
        "name": "Eternal Fire Inquisitor",
        "deck": "syndicate",
        "row": "agile_cr",
        "strength": "2",
        "ability": "witch_hunt",
        "filename": "eternal_fire_inquisitor",
        "count": "1",
        "quote": "The burning light of the Eternal Fire reveals all!"
    },
    "sy_eternal_fire_priest_1": {
        "name": "Eternal Fire Priest",
        "id": 1,
        "deck": "syndicate",
        "row": "ranged",
        "strength": "3",
        "ability": "muster",
        "filename": "eternal_fire_priest_1",
        "count": "1",
        "target": "sy_eternal_fire_priest",
        "quote": "Closer, my sheep, gather closer. May the Eternal Fire warm your souls!"
    },
    "sy_eternal_fire_priest_2": {
        "name": "Eternal Fire Priest",
        "id": 2,
        "deck": "syndicate",
        "row": "ranged",
        "strength": "3",
        "ability": "muster",
        "filename": "eternal_fire_priest_2",
        "count": "1",
        "target": "sy_eternal_fire_priest",
        "quote": "Closer, my sheep, gather closer. May the Eternal Fire warm your souls!"
    },
    "sy_eternal_fire_priest_3": {
        "name": "Eternal Fire Priest",
        "id": 3,
        "deck": "syndicate",
        "row": "ranged",
        "strength": "3",
        "ability": "muster",
        "filename": "eternal_fire_priest_3",
        "count": "1",
        "target": "sy_eternal_fire_priest",
        "quote": "Closer, my sheep, gather closer. May the Eternal Fire warm your souls!"
    },
    "sy_roderick_wett": {
        "name": "Roderick de Wett",
        "deck": "syndicate",
        "row": "close",
        "strength": "7",
        "ability": "",
        "filename": "roderick_wett",
        "count": "1",
        "quote": "Count de Wett is exceptionally loathsome and arrogant, but at least he enjoys a little dice poker on the side."
    },
    "sy_ulrich": {
        "name": "Ulrich",
        "deck": "syndicate",
        "row": "agile_cr",
        "strength": "8",
        "ability": "",
        "filename": "ulrich",
        "count": "1",
        "quote": "When the Order was disbanded, those who didn't join the witch hunters formed the Fallen Knights, of which Ulrich became the Grand Master."
    },
    "sy_inquisitional_pyres": {
        "name": "Inquisitional Pyres",
        "deck": "syndicate",
        "row": "agile_cr",
        "strength": "4",
        "ability": "witch_hunt",
        "filename": "inquisitional_pyres",
        "count": "0",
        "quote": "Fire cleanses."
    },
    "sy_imke": {
        "name": "Imke",
        "deck": "syndicate",
        "row": "ranged",
        "strength": "5",
        "ability": "spy",
        "filename": "imke",
        "count": "1",
        "quote": "No sooner had she caught Gudrun's attention than sought to exploit it."
    },
    "sy_professor": {
        "name": "Professor",
        "deck": "syndicate",
        "row": "ranged",
        "strength": "8",
        "ability": "hero",
        "filename": "professor",
        "count": "1",
        "quote": "I fear our conventicle may end disastrously for you."
    },
    "sy_salamandra_assassin": {
        "name": "Salamandra Assassin",
        "deck": "syndicate",
        "row": "ranged",
        "strength": "5",
        "ability": "scorch_c",
        "filename": "salamandra_assassin",
        "count": "1",
        "quote": "A name and bag full of gold. That's all I need."
    },
    "sy_salamandra_assassin_2": {
        "name": "Salamandra Assassin",
        "deck": "syndicate",
        "row": "ranged",
        "strength": "5",
        "ability": "scorch_c",
        "filename": "salamandra_assassin_2",
        "count": "1",
        "quote": "A name and bag full of gold. That's all I need."
    },
    "sy_walter_veritas": {
        "name": "Walter Veritas",
        "deck": "syndicate",
        "row": "ranged",
        "strength": "7",
        "ability": "spy",
        "filename": "walter_veritas",
        "count": "1",
        "quote": "In a city that feeds on lies, truth can be a weapon."
    },
    "sy_passiflora": {
        "name": "Passiflora",
        "deck": "syndicate",
        "row": "ranged",
        "strength": "3",
        "ability": "horn",
        "filename": "passiflora",
        "count": "1",
        "quote": "More pilgrims come here than to the Temple of the Eternal Fire..."
    },
    "sy_fence": {
        "name": "Fence",
        "deck": "syndicate",
        "row": "ranged",
        "strength": "5",
        "ability": "",
        "filename": "fence",
        "count": "1",
        "quote": "I prefer the term curator."
    },
    "sy_sly_seductress": {
        "name": "Sly Seductress",
        "deck": "syndicate",
        "row": "ranged",
        "strength": "8",
        "ability": "spy",
        "filename": "sly_seductress",
        "count": "1",
        "quote": "The sweeter her words, the more bitter your losses."
    },
    "sy_azar_javed": {
        "name": "Azar Javed: Renegade",
        "deck": "syndicate",
        "row": "leader",
        "strength": "",
        "ability": "azar_javed",
        "filename": "azar_javed",
        "count": "1",
        "quote": "The sorcerer not only deftly manipulates the power of fire, it can be said that fire has become a part of his very being."
    },
    "sy_fisstech_trafficker": {
        "name": "Fisstech Trafficker",
        "deck": "syndicate",
        "row": "ranged",
        "strength": "2",
        "ability": "avenger",
        "filename": "fisstech_trafficker",
        "count": "1",
        "target": "sy_fisstech",
        "quote": "Addictive? Why, not at all! I've quit several times before!"
    },
    "sy_fisstech": {
        "name": "Fisstech",
        "deck": "syndicate",
        "row": "siege",
        "strength": "8",
        "ability": "spy",
        "filename": "fisstech",
        "count": "1",
        "target": "sy_fisstech",
        "quote": "Large pupils, chattering teeth, a mad cackle... Aye, that's fisstech for ye."
    },
    "sy_savolla": {
        "name": "Savolla",
        "deck": "syndicate",
        "row": "siege",
        "strength": "6",
        "ability": "hero scorch",
        "filename": "savolla",
        "count": "1",
        "quote": "Witcher mutagens are a forgotten treasure. It's time the world learned of their potential."
    },
    "sy_madame_luiza": {
        "name": "Madame Luiza",
        "deck": "syndicate",
        "row": "siege",
        "strength": "8",
        "ability": "hero",
        "filename": "madame_luiza",
        "count": "1",
        "quote": "We've bedded more men than all Redania's army barracks combined."
    },
    "sy_saul_navarette": {
        "name": "Saul de Navarette",
        "deck": "syndicate",
        "row": "siege",
        "strength": "5",
        "ability": "",
        "filename": "saul_navarette",
        "count": "1",
        "quote": "A connoisseur with bottomless pockets and a soul black as tar."
    },
    "sy_cleaver_gang_1": {
        "name": "Cleaver's Gang",
        "id": 1,
        "deck": "syndicate",
        "row": "agile_cr",
        "strength": "3",
        "ability": "bond",
        "filename": "cleaver_gang_1",
        "count": "1",
        "target": "sy_cleaver_gang",
        "quote": "With both arms tied behind me back, recall ye said. So feel free to start kickin' me in the arse when the mood strikes ye."
    },
    "sy_cleaver_gang_2": {
        "name": "Cleaver's Gang",
        "id": 2,
        "deck": "syndicate",
        "row": "agile_cr",
        "strength": "3",
        "ability": "bond",
        "filename": "cleaver_gang_2",
        "count": "1",
        "target": "sy_cleaver_gang",
        "quote": "Frilly frock or Mahakam steel breastplate – wouldn't have mattered."
    },
    "sy_cleaver_gang_3": {
        "name": "Cleaver's Gang",
        "id": 3,
        "deck": "syndicate",
        "row": "agile_cr",
        "strength": "3",
        "ability": "bond",
        "filename": "cleaver_gang_3",
        "count": "1",
        "target": "sy_cleaver_gang",
        "quote": "Those who try to cheat Cleaver are in for a rude awakening... And a rough landing."
    },
    "sy_cleaver_gang_4": {
        "name": "Cleaver's Gang",
        "id": 4,
        "deck": "syndicate",
        "row": "agile_cr",
        "strength": "3",
        "ability": "bond",
        "filename": "cleaver_gang_4",
        "count": "1",
        "target": "sy_cleaver_gang",
        "quote": "Nae need to be stingy, pal. There's plenty to go 'round. "
    },
    "sy_mutant_killer": {
        "name": "Mutant Killer",
        "deck": "syndicate",
        "row": "ranged",
        "strength": "7",
        "ability": "",
        "filename": "mutant_killer",
        "count": "1",
        "quote": "You have to keep him on a leash, muzzled and with blinders on, otherwise it'll be trouble."
    },
    "sy_moreelse": {
        "name": "Moreelse",
        "deck": "syndicate",
        "row": "ranged",
        "strength": "7",
        "ability": "",
        "filename": "moreelse",
        "count": "1",
        "quote": "Some witch hunters truly believed the eradication of mages and sorceresses would make the world a better place. Some did not require such justification."
    },
    "sy_graden": {
        "name": "Graden",
        "deck": "syndicate",
        "row": "ranged",
        "strength": "6",
        "ability": "morale",
        "filename": "graden",
        "count": "1",
        "quote": "Initially, we burned any tomes on black magic we found.Recently we decided it might be wise to read them first."
    },
    "sy_robber_1": {
        "name": "Robber",
        "id": 1,
        "deck": "syndicate",
        "row": "ranged",
        "strength": "4",
        "ability": "bond",
        "filename": "robber_1",
        "count": "1",
        "target": "sy_robber",
        "quote": "I-I already gave ye all me coin!"
    },
    "sy_robber_2": {
        "name": "Robber",
        "id": 2,
        "deck": "syndicate",
        "row": "ranged",
        "strength": "4",
        "ability": "bond",
        "filename": "robber_2",
        "count": "1",
        "target": "sy_robber",
        "quote": "I-I already gave ye all me coin!"
    },
    "sy_robber_3": {
        "name": "Robber",
        "id": 3,
        "deck": "syndicate",
        "row": "ranged",
        "strength": "4",
        "ability": "bond",
        "filename": "robber_3",
        "count": "1",
        "target": "sy_robber",
        "quote": "I-I already gave ye all me coin!"
    },
    "sy_robber_4": {
        "name": "Robber",
        "id": 4,
        "deck": "syndicate",
        "row": "ranged",
        "strength": "4",
        "ability": "bond",
        "filename": "robber_4",
        "count": "1",
        "target": "sy_robber",
        "quote": "I-I already gave ye all me coin!"
    },
    "sy_dudu_biberveldt": {
        "name": "Dudu Biberveldt",
        "deck": "syndicate",
        "row": "ranged",
        "strength": "1",
        "ability": "spy",
        "filename": "dudu_biberveldt",
        "count": "1",
        "quote": "A mimic, among the many other names for his sort: changelings, doublings, vexlings… or dopplers."
    },
    "sy_tamara_strenger": {
        "name": "Tamara Strenger",
        "deck": "syndicate",
        "row": "siege",
        "strength": "5",
        "ability": "",
        "filename": "tamara_strenger",
        "count": "1",
        "quote": "Once the heat of the Fire has set your heart aflame, it gives you strength and leads you down the path of truth for the rest of your life."
    },
    "sy_nathaniel_pastodi": {
        "name": "Nathaniel Pastodi",
        "deck": "syndicate",
        "row": "siege",
        "strength": "6",
        "ability": "",
        "filename": "nathaniel_pastodi",
        "count": "1",
        "quote": "Novigrad – where the impossible becomes possible. A professional torturer turned reverend, for instance."
    },
    "sy_jacques_aldersberg": {
        "name": "Jacques de Aldersberg",
        "deck": "syndicate",
        "row": "siege",
        "strength": "10",
        "ability": "hero",
        "filename": "jacques_aldersberg",
        "count": "1",
        "quote": "Knowledge is my burden. Only I can prevent a calamity."
    },
    "sy_jacques_aldersberg": {
        "name": "Jacques de Aldersberg",
        "deck": "syndicate",
        "row": "siege",
        "strength": "10",
        "ability": "hero",
        "filename": "jacques_aldersberg",
        "count": "1",
        "quote": "Knowledge is my burden. Only I can prevent a calamity."
    },
    "sy_igor_hook": {
        "name": "Igor the Hook",
        "deck": "syndicate",
        "row": "siege",
        "strength": "10",
        "ability": "hero",
        "filename": "igor_hook",
        "count": "1",
        "quote": "In the left corner, a bloodthirsty shaelmaar, and in the right co--oh bollocks... Fight's over, hold your bets!"
    },
    "sy_fallen_rayla": {
        "name": "Fallen Rayla",
        "deck": "syndicate",
        "row": "siege",
        "strength": "10",
        "ability": "hero",
        "filename": "fallen_rayla",
        "count": "1",
        "quote": "Slain by the arrows of those she had hunted. Or so many thought. The Salamandra had different plans for her."
    },
    "sy_sausage_maker": {
        "name": "Sausage Maker",
        "deck": "syndicate",
        "row": "close",
        "strength": "5",
        "ability": "morale",
        "filename": "sausage_maker",
        "count": "1",
        "quote": "Body disposal and sausage makin', that's what I do."
    },
    "sy_octavia_hale": {
        "name": "Vigilantes: Octavia Hale",
        "id": 1,
        "deck": "syndicate",
        "row": "siege",
        "strength": "8",
        "ability": "hero muster",
        "filename": "octavia_hale",
        "count": "1",
        "target": "sy_hale_brothers",
        "quote": "Woe to all those who find themselves on the wrong side of Octavia Hale, the self-proclaimed world-renowned finder⁠—and punisher⁠."
    },
    "sy_fabian_hale": {
        "name": "Vigilantes: Fabian Hale",
        "id": 2,
        "deck": "syndicate",
        "row": "ranged",
        "strength": "6",
        "ability": "",
        "filename": "fabian_hale",
        "count": "1",
        "target": "sy_hale_brothers",
        "quote": "Fabian takes great pride in his work, with each “victory” etched upon his skin as a permanent reminder of memories most pleasant."
    },
    "sy_ignatius_hale": {
        "name": "Vigilantes: Ignatius Hale",
        "id": 3,
        "deck": "syndicate",
        "row": "close",
        "strength": "6",
        "ability": "",
        "filename": "ignatius_hale",
        "count": "1",
        "target": "sy_hale_brothers",
        "quote": "He’s a good boy."
    },
    "sy_gellert_bleinheim": {
        "name": "Bleinheim Brothers: Gellert",
        "id": 1,
        "deck": "syndicate",
        "row": "ranged",
        "strength": "7",
        "ability": "bond",
        "filename": "gellert_bleinheim",
        "count": "1",
        "target": "sy_bleinheim_brothers",
        "quote": "How's my brother doing in the woods, I wonder..."
    },
    "sy_roland_bleinheim": {
        "name": "Bleinheim Brothers: Roland",
        "id": 1,
        "deck": "syndicate",
        "row": "ranged",
        "strength": "7",
        "ability": "bond",
        "filename": "roland_bleinheim",
        "count": "1",
        "target": "sy_bleinheim_brothers",
        "quote": "How's my brother doing in the sewers, I wonder..."
    },
    "sy_caesar_bilzen": {
        "name": "Caesar Bilzen",
        "deck": "syndicate",
        "row": "ranged",
        "strength": "3",
        "ability": "morale",
        "filename": "caesar_bilzen",
        "count": "1",
        "quote": "Avid angler, meticulous collector, and a real piece of work."
    },
    "sy_rico_meiersdorf": {
        "name": "Rico Meiersdorf",
        "deck": "syndicate",
        "row": "agile_cr",
        "strength": "7",
        "ability": "spy",
        "filename": "rico_meiersdorf",
        "count": "1",
        "quote": "I never did much like bees."
    },
    "sy_cleric_flaming_rose": {
        "name": "Cleric of the Flaming Rose",
        "id": 1,
        "deck": "syndicate",
        "row": "ranged",
        "strength": "5",
        "ability": "muster",
        "filename": "cleric_flaming_rose",
        "count": "1",
        "target": "sy_eternal_fire_disciple",
        "quote": "We have two eyes, two ears, but only one tongue, so that we would look and listen twice more than we speak. "
    },
    "sy_eternal_fire_disciple": {
        "name": "Eternal Fire Disciple",
        "id": 2,
        "deck": "syndicate",
        "row": "ranged",
        "strength": "3",
        "ability": "",
        "filename": "eternal_fire_disciple",
        "count": "2",
        "target": "sy_eternal_fire_disciple",
        "quote": "Look into your hearts, dear brethen. Does a contempt for injustice not burn within it?"
    },
    "sy_tidecloack_ransacker": {
        "name": "Tidecloack Ransacker",
        "deck": "syndicate",
        "row": "close",
        "strength": "3",
        "ability": "scorch_c",
        "filename": "tidecloack_ransacker",
        "count": "1",
        "quote": "There's more wealth in Novigrad than in all of Skellige – and the number of poor saps to match."
    },
    "sy_salamandra_lackey": {
        "name": "Salamandra Lackey",
        "deck": "syndicate",
        "row": "close",
        "strength": "5",
        "ability": "",
        "filename": "salamandra_lackey",
        "count": "1",
        "quote": "Lackeys are expected to perform their first five jobs for no pay, demonstrating their passion for the gig."
    },
    "sy_mutant": {
        "name": "Mutant",
        "deck": "syndicate",
        "row": "close",
        "strength": "4",
        "ability": "muster",
        "filename": "mutant",
        "count": "3",
        "target": "sy_mutant",
        "quote": "With the right tools you can shape the human body like wet clay."
    },
    "sy_salamandra_mage": {
        "name": "Salamandra Mage",
        "deck": "syndicate",
        "row": "ranged",
        "strength": "6",
        "ability": "",
        "filename": "salamandra_mage",
        "count": "1",
        "quote": "Building a fire warms people for a day, but setting them on fire..."
    },
    "sy_sewer_raider": {
        "name": "Sewer Raider",
        "deck": "syndicate",
        "row": "ranged",
        "strength": "8",
        "ability": "spy",
        "filename": "sewer_raider",
        "count": "1",
        "quote": "Built for movin' shite, but it moves coin just as well."
    },
    "sy_inquisitor_helveed": {
        "name": "Grand Inquisitor Helveed",
        "deck": "syndicate",
        "row": "siege",
        "strength": "10",
        "ability": "hero",
        "filename": "inquisitor_helveed",
        "count": "1",
        "quote": "No sinful wretch shall escape his fate in the Fire. Of that, I will make sure."
    },
    "sy_boris": {
        "name": "Boris",
        "deck": "syndicate",
        "row": "close",
        "strength": "9",
        "ability": "",
        "filename": "boris",
        "count": "1",
        "quote": "After getting a taste of human flesh, he won't eat anything else."
    },
    "sy_halfling_safecracker": {
        "name": "Halfling Safecracker",
        "deck": "syndicate",
        "row": "ranged",
        "strength": "8",
        "ability": "spy",
        "filename": "halfling_safecracker",
        "count": "1",
        "quote": "With ears sharp as his, he could've been a musician. Alas, one cannot get rich as quickly from applause."
    },
    "sy_hammond": {
        "name": "Hammond",
        "deck": "syndicate",
        "row": "close",
        "strength": "7",
        "ability": "",
        "filename": "hammond",
        "count": "1",
        "quote": "Once mistaken for a whale calf and nearly harpooned. He's avoided swimming ever since."
    },
    "sy_sir_skewertooth": {
        "name": "Sir Skewertooth",
        "deck": "syndicate",
        "row": "close",
        "strength": "6",
        "ability": "",
        "filename": "sir_skewertooth",
        "count": "1",
        "quote": "Here he is! My knight in swining armor!"
    },
    "sy_ferko": {
        "name": "Ferko the Sculptor",
        "deck": "syndicate",
        "row": "close",
        "strength": "5",
        "ability": "scorch",
        "filename": "ferko",
        "count": "1",
        "quote": "Some call it base thuggery. But me, I consider it the highest art form."
    },
    "sy_hvitr_aelydia": {
        "name": "Hvitr and Aelydia",
        "deck": "syndicate",
        "row": "close",
        "strength": "8",
        "ability": "hero",
        "filename": "hvitr_aelydia",
        "count": "1",
        "quote": "Inseparable. Invincible. Irresponsible."
    },
    "sy_bincy_blumerholdt": {
        "name": "Bincy_Blumerholdt",
        "deck": "syndicate",
        "row": "close",
        "strength": "7",
        "ability": "spy",
        "filename": "bincy_blumerholdt",
        "count": "1",
        "quote": "In all Novigrad, she has the hairiest feet and the stickiest hands."
    },
    "sy_freak_show_1": {
        "name": "Freak Show",
        "id": 1,
        "deck": "syndicate",
        "row": "close",
        "strength": "3",
        "ability": "muster",
        "filename": "freak_show_1",
        "count": "1",
        "target": "sy_freak_show",
        "quote": "What do ye mean, Why? The game was beginnin' to drag!"
    },
    "sy_freak_show_2": {
        "name": "Freak Show",
        "id": 2,
        "deck": "syndicate",
        "row": "close",
        "strength": "3",
        "ability": "muster",
        "filename": "freak_show_2",
        "count": "1",
        "target": "sy_freak_show",
        "quote": "The boss always gets to have the most fun. Truth be told, I prefer to watch anyway."
    },
    "sy_freak_show_3": {
        "name": "Freak Show",
        "id": 3,
        "deck": "syndicate",
        "row": "close",
        "strength": "3",
        "ability": "muster",
        "filename": "freak_show_3",
        "count": "1",
        "target": "sy_freak_show",
        "quote": "A game where good aim is considered subjective."
    },
    "sy_freak_show_4": {
        "name": "Freak Show",
        "id": 4,
        "deck": "syndicate",
        "row": "close",
        "strength": "3",
        "ability": "muster",
        "filename": "freak_show_4",
        "count": "1",
        "target": "sy_freak_show",
        "quote": "Why the long face, friend?"
    },
    "sy_mutated_hound_1": {
        "name": "Mutated Hounds",
        "id": 1,
        "deck": "syndicate",
        "row": "close",
        "strength": "5",
        "ability": "muster",
        "filename": "mutated_hound_1",
        "count": "1",
        "target": "sy_mutated_hound",
        "quote": "We couldn't decide what to name him and it just kind of came up..."
    },
    "sy_mutated_hound_2": {
        "name": "Mutated Hounds",
        "id": 2,
        "deck": "syndicate",
        "row": "close",
        "strength": "5",
        "ability": "muster",
        "filename": "mutated_hound_2",
        "count": "1",
        "target": "sy_mutated_hound",
        "quote": "Out of man's best friend we made his worst enemy."
    },
    "sy_adriano_mink": {
        "name": "Adriano the Mink",
        "deck": "syndicate",
        "row": "close",
        "strength": "6",
        "ability": "",
        "filename": "adriano_mink",
        "count": "1",
        "quote": "Right here, beautiful. Have a sit on daddy's lap."
    },
    "sy_beggar": {
        "name": "Beggar",
        "deck": "syndicate",
        "row": "close",
        "strength": "3",
        "ability": "avenger",
        "filename": "beggar",
        "count": "1",
        "target": "sy_beggar",
        "quote": "Say what you will about his technique, I think he captured your good side."
    },
    "sy_payroll_specialist": {
        "name": "Payroll Specialist",
        "deck": "syndicate",
        "row": "close",
        "strength": "3",
        "ability": "morale",
        "filename": "payroll_specialist",
        "count": "1",
        "quote": "Guards in Novigrad work for very little money, yet live like kings. Just another paradox of the Free City..."
    },
    "sy_arena_endrega": {
        "name": "Arena Endrega",
        "deck": "syndicate",
        "row": "close",
        "strength": "6",
        "ability": "",
        "filename": "arena_endrega",
        "count": "1",
        "quote": "Strong as an ox, dumb as a box."
    },
    "sy_arena_ghoul": {
        "name": "Arena Ghoul",
        "deck": "syndicate",
        "row": "close",
        "strength": "6",
        "ability": "",
        "filename": "arena_ghoul",
        "count": "1",
        "quote": "He'll be a perfect fit for your arena. Just like a mutt lickin' your plate after dinner."
    },
    "sy_tatterwing": {
        "name": "Tatterwing",
        "deck": "syndicate",
        "row": "close",
        "strength": "6",
        "ability": "",
        "filename": "tatterwing",
        "count": "1",
        "quote": "She seems a bit sluggish. A few quick jabs to the ribs oughta liven her up."
    },
    "sy_temple_guard": {
        "name": "Temple Guard",
        "deck": "syndicate",
        "row": "close",
        "strength": "5",
        "ability": "",
        "filename": "temple_guard",
        "count": "1",
        "quote": "Halt! Who goes there?! Firesworn or heretic?"
    },
    "sy_passiflora_peaches": {
        "name": "Passiflora Peaches",
        "deck": "syndicate",
        "row": "close",
        "strength": "9",
        "ability": "spy",
        "filename": "passiflora_peaches",
        "count": "1",
        "quote": "They'll mess with your head, break your heart and empty your purse."
    },
    "sy_lieutenant_herst": {
        "name": "Lieutenant von Herst",
        "deck": "syndicate",
        "row": "close",
        "strength": "5",
        "ability": "",
        "filename": "lieutenant_herst",
        "count": "1",
        "quote": "The fall of the Order wasn’t so hard for him like for the others."
    },
    "sy_mutant_maker": {
        "name": "Mutant Maker",
        "deck": "syndicate",
        "row": "close",
        "strength": "5",
        "ability": "avenger",
        "filename": "mutant_maker",
        "count": "1",
        "target": "sy_failed_experiment",
        "quote": "I’m a scientist, truly. I can’t help it if the Oxenfurt professors were just too narrow-sighted to appreciate my particular research methods."
    },
    "sy_sea_jackal": {
        "name": "Sea Jackal",
        "deck": "syndicate",
        "row": "close",
        "strength": "5",
        "ability": "",
        "filename": "sea_jackal",
        "count": "1",
        "quote": "You ever lift rings off a body that's been left to soak for two weeks? No? Then don't complain."
    },
    "sy_fallen_knight": {
        "name": "Fallen Knight",
        "deck": "syndicate",
        "row": "close",
        "strength": "6",
        "ability": "",
        "filename": "fallen_knight",
        "count": "1",
        "quote": "He abandoned the righteous fight and the flame in him has long gone."
    },
    "sy_sukrus": {
        "name": "Sukrus",
        "deck": "syndicate",
        "row": "close",
        "strength": "6",
        "ability": "",
        "filename": "sukrus",
        "count": "1",
        "quote": "One of many who sought fortune in Novigrad. And one of many more who never found it. "
    },
    "sy_kurt": {
        "name": "Kurt",
        "deck": "syndicate",
        "row": "close",
        "strength": "6",
        "ability": "",
        "filename": "kurt",
        "count": "1",
        "quote": "Oy, Kurt, find out what Merigold's hollerin' about, if she needs anything. A hot iron to the tongue, maybe?"
    },
    "sy_whoreson_senior": {
        "name": "Whoreson Senior",
        "deck": "syndicate",
        "row": "close",
        "strength": "9",
        "ability": "hero",
        "filename": "whoreson_senior",
        "count": "1",
        "quote": "Like father, like son."
    },
    "sy_lonely_champion": {
        "name": "Lonely Champion",
        "deck": "syndicate",
        "row": "close",
        "strength": "10",
        "ability": "",
        "filename": "lonely_champion",
        "count": "1",
        "quote": "So long as he continues the righteous fight, the Order and its flame endure."
    },
    "sy_failed_experiment": {
        "name": "Failed Experiment",
        "deck": "syndicate",
        "row": "close",
        "strength": "8",
        "ability": "",
        "filename": "failed_experiment",
        "count": "1",
        "quote": "Even failed experiments can serve a purpose. How else would one be expected to push the boundaries of knowledge?"
    },
    "sy_frightener": {
        "name": "Savolla's Frightener",
        "deck": "syndicate",
        "row": "close",
        "strength": "9",
        "ability": "hero scorch_c",
        "filename": "frightener",
        "count": "1",
        "quote": "The witchers thought the Salamandra thugs wouldn't get through Kaer Morhen's walls. The witchers were wrong."
    },
    "sy_stolen_mutagens": {
        "name": "Stolen Mutagens",
        "deck": "syndicate",
        "row": "close",
        "strength": "1",
        "ability": "horn",
        "filename": "stolen_mutagens",
        "count": "1",
        "quote": "Like organ harvesting—but far more lucrative."
    },
    "spe_vivaldi_bank": {
        "name": "Vivaldi Bank",
        "deck": "special syndicate",
        "row": "",
        "strength": "",
        "ability": "bank",
        "filename": "vivaldi_bank",
        "count": "2",
        "quote": "We're sorry to lose your business, but we wish ye well!"
    }
};

var ext_ze_cards = {
    "ze_zerrikanterment": {
        "name": "Zerrikanterment",
        "deck": "zerrikania",
        "row": "leader",
        "strength": "",
        "ability": "zerrikanterment",
        "filename": "zerrikanterment",
        "count": "1",
        "quote": "Legend says he burned the forests around Zerrikania making it isolated from the world by deserts and wastelands."
    },
    "ze_baal_zebuth": {
        "name": "Ball-Zebuth",
        "deck": "zerrikania",
        "row": "leader",
        "strength": "",
        "ability": "baal_zebuth",
        "filename": "baal_zebuth",
        "count": "1",
        "quote": "God of moist and dark sky, it is believed to be the polar opposite of Raróg."
    },
    "ze_rarog": {
        "name": "Raróg",
        "deck": "zerrikania",
        "row": "leader",
        "strength": "",
        "ability": "rarog",
        "filename": "rarog",
        "count": "1",
        "quote": "Fierce deity of fire and warm sky, it is believed to be the polar opposite of Baal-Zebuth."
    },
    "ze_villentretenmerth": {
        "name": "Villentretenmerth",
        "deck": "zerrikania",
        "row": "close",
        "strength": "9",
        "ability": "whorshipped",
        "filename": "villentretenmerth",
        "count": "1",
        "quote": "Also calls himself Borkh Three Jackdaws... he's not the best at names."
    },
    "ze_myrgtabrakke": {
        "name": "Myrgtabrakke",
        "deck": "zerrikania",
        "row": "siege",
        "strength": "8",
        "ability": "whorshipped medic",
        "filename": "myrgtabrakke",
        "count": "1",
        "quote": "Never get between a mother dragon and her young."
    },
    "ze_merineaevelth": {
        "name": "Merineaevelth",
        "deck": "zerrikania",
        "row": "close",
        "strength": "10",
        "ability": "hero",
        "filename": "merineaevelth",
        "count": "1",
        "quote": "Queen of Zerrikania and founder of the Faithel."
    },
    "ze_saulrenith": {
        "name": "Saulrenith",
        "deck": "zerrikania",
        "row": "ranged",
        "strength": "8",
        "ability": "hero medic",
        "filename": "saulrenith",
        "count": "1",
        "quote": "Impulsive and violent - not the mixture of traits one would trifle with."
    },
    "ze_tea_vea_1": {
        "name": "Tea & Vea",
        "deck": "zerrikania",
        "row": "close",
        "strength": "5",
        "ability": "muster whorshipper",
        "filename": "tea_vea_1",
        "count": "1",
        "target": "wu_tea_vea",
        "quote": "Her sabre, drawn faster than they eye could see, cut through the air."
    },
    "ze_tea_vea_2": {
        "name": "Tea & Vea",
        "deck": "zerrikania",
        "row": "close",
        "strength": "5",
        "ability": "muster whorshipper",
        "filename": "tea_vea_2",
        "count": "1",
        "target": "wu_tea_vea",
        "quote": "Her sabre, drawn faster than they eye could see, cut through the air."
    },
    "ze_faithel_1": {
        "name": "Faithel",
        "deck": "zerrikania",
        "row": "close",
        "strength": "4",
        "ability": "whorshipper",
        "filename": "faithel_1",
        "count": "1",
        "quote": "Their goal is to find a dragon, honour it and swear their allegiance."
    },
    "ze_faithel_2": {
        "name": "Faithel",
        "deck": "zerrikania",
        "row": "close",
        "strength": "4",
        "ability": "whorshipper",
        "filename": "faithel_2",
        "count": "1",
        "quote": "Their goal is to find a dragon, honour it and swear their allegiance."
    },
    "ze_faithel_3": {
        "name": "Faithel",
        "deck": "zerrikania",
        "row": "close",
        "strength": "4",
        "ability": "whorshipper",
        "filename": "faithel_3",
        "count": "1",
        "quote": "Their goal is to find a dragon, honour it and swear their allegiance."
    },
    "ze_myrgot": {
        "name": "Myrgot",
        "deck": "zerrikania",
        "row": "close",
        "strength": "6",
        "ability": "",
        "filename": "myrgot",
        "count": "1",
        "quote": "Scarred with shame, Myrgot never again returned to Caingorn after his disgraceful lost in the jouting with the pious knight Eyck of Denesle."
    },
    "ze_lilit_niya": {
        "name": "Lilit-Niya",
        "deck": "zerrikania",
        "row": "ranged",
        "strength": "11",
        "ability": "hero",
        "filename": "lilit_niya",
        "count": "1",
        "quote": "The Black Sun was to announce the imminent return of Lilit, still honoured in the East under the name of Niya, and the extermination of the human race."
    },
    "ze_ocvist": {
        "name": "Ocvist",
        "deck": "zerrikania",
        "row": "ranged",
        "strength": "7",
        "ability": "whorshipped",
        "filename": "ocvist",
        "count": "1",
        "quote": "The Master of Quartz Mountain, the Destroyer, Trajan's Slayer. In his free time, he likes long walks and candlelight dinners."
    },
    "ze_keltullis": {
        "name": "Keltullis",
        "deck": "zerrikania",
        "row": "close",
        "strength": "6",
        "ability": "whorshipped scorch_c",
        "filename": "keltullis",
        "count": "1",
        "quote": "They fought 'er for near a century and they realized she weren't goin' nowheres, so... they cut a deal.She dinnae bother 'em, they give 'er what she needs."
    },
    "ze_ostreverg": {
        "name": "Ostreverg",
        "deck": "zerrikania",
        "row": "siege",
        "strength": "7",
        "ability": "whorshipped",
        "filename": "ostreverg",
        "count": "1",
        "quote": "A long time ago the dragon Ostreverg ravaged and plundered the sacred Temple of Freya on the Skellige Islands."
    },
    "ze_germinus": {
        "name": "Germinus",
        "deck": "zerrikania",
        "row": "ranged",
        "strength": "8",
        "ability": "whorshipped",
        "filename": "germinus",
        "count": "1",
        "quote": "The dragon valued its treasures above all else, unleashing its wrath on anything threatening it."
    },
    "ze_azar_javed": {
        "name": "Azar Javed",
        "deck": "zerrikania",
        "row": "ranged",
        "strength": "7",
        "ability": "scorch",
        "filename": "azar_javed",
        "count": "1",
        "quote": "The sorcerer not only deftly manipulates the power of fire, it can be said that fire has become a part of his very being."
    },
    "ze_bart": {
        "name": "Bart",
        "deck": "zerrikania",
        "row": "close",
        "strength": "4",
        "ability": "morale",
        "filename": "bart",
        "count": "1",
        "quote": "A good watchman should be brainless enough to render any thought of betraying his master impossible."
    },
    "ze_venomous_basilisk": {
        "name": "Venomous Basilisk",
        "deck": "zerrikania",
        "row": "ranged",
        "strength": "6",
        "ability": "scorch_c",
        "filename": "venomous_basilisk",
        "count": "1",
        "quote": "The Basilisk is the most venomous creature in the world! For the basilisk is the king of all serpents!"
    },
    "ze_giant_spotted_spider": {
        "name": "Giant Spotted Spider",
        "deck": "zerrikania",
        "row": "ranged",
        "strength": "10",
        "ability": "hero",
        "filename": "giant_spotted_spider",
        "count": "1",
        "quote": "Every beast roaming the forest is its prey, even elephants."
    },
    "ze_emetouka": {
        "name": "Emetouka",
        "deck": "zerrikania",
        "row": "close",
        "strength": "6",
        "ability": "",
        "filename": "emetouka",
        "count": "1",
        "quote": "Their horn have immense value, mostly because many died trying to hunt them."
    },
    "ze_leopard_1": {
        "name": "Leopard",
        "deck": "zerrikania",
        "row": "close",
        "strength": "4",
        "ability": "bond",
        "filename": "leopard_1",
        "count": "1",
        "target": "ze_leopard",
        "quote": "Many their preys have mistaken their relaxed state for safety, leopards simply know they will quickly catch up on them."
    },
    "ze_leopard_2": {
        "name": "Leopard",
        "deck": "zerrikania",
        "row": "close",
        "strength": "4",
        "ability": "bond",
        "filename": "leopard_2",
        "count": "1",
        "target": "ze_leopard",
        "quote": "Many their preys have mistaken their relaxed state for safety, leopards simply know they will quickly catch up on them."
    },
    "ze_tiger_1": {
        "name": "Tiger",
        "deck": "zerrikania",
        "row": "close",
        "strength": "5",
        "ability": "bond",
        "filename": "tiger_1",
        "count": "1",
        "target": "ze_tiger",
        "quote": "The queen favourite beast. After dragons obviously."
    },
    "ze_tiger_2": {
        "name": "Tiger",
        "deck": "zerrikania",
        "row": "close",
        "strength": "5",
        "ability": "bond",
        "filename": "tiger_2",
        "count": "1",
        "target": "ze_tiger",
        "quote": "The queen favourite beast. After dragons obviously."
    },
    "ze_jackals": {
        "name": "Jackals",
        "deck": "zerrikania",
        "row": "ranged",
        "strength": "3",
        "ability": "muster",
        "filename": "jackals",
        "count": "3",
        "target": "ze_jackals",
        "quote": "Not the most dangerous but surprisingly one of the most hated wild beasts around."
    },
    "ze_boa": {
        "name": "Boa",
        "deck": "zerrikania",
        "row": "close",
        "strength": "4",
        "ability": "",
        "filename": "boa",
        "count": "1",
        "quote": "Living choking hazard."
    },
    "ze_python": {
        "name": "Python",
        "deck": "zerrikania",
        "row": "close",
        "strength": "4",
        "ability": "",
        "filename": "python",
        "count": "1",
        "quote": "'Look at this weird fallen tree! Oh shit, it's moving towards us!'"
    },
    "ze_viper": {
        "name": "Viper",
        "deck": "zerrikania",
        "row": "close",
        "strength": "4",
        "ability": "",
        "filename": "viper",
        "count": "1",
        "quote": "'Had to flee me home, some damn viper had made it its den.'"
    },
    "ze_hyenas": {
        "name": "Hyenas",
        "deck": "zerrikania",
        "row": "close",
        "strength": "5",
        "ability": "",
        "filename": "hyenas",
        "count": "1",
        "quote": "'Those ploughin' wretches always hunt in packs. They killed all my hens and I couldn't do nothin'.'"
    },
    "ze_collective_trance": {
        "name": "Collective Trance",
        "deck": "zerrikania",
        "row": "siege",
        "strength": "4",
        "ability": "medic",
        "filename": "collective_trance",
        "count": "1",
        "quote": "Zerrikanians have this old tradition to join together, share a strong psychedelic decoction and escape the harsh reality."
    },
    "ze_hippotoxotai_1": {
        "name": "Hippotoxotai",
        "deck": "zerrikania",
        "row": "ranged",
        "strength": "4",
        "ability": "muster",
        "filename": "hippotoxotai_1",
        "count": "1",
        "target": "ze_hippotoxotai",
        "quote": "Only dust clouds, arrows and death."
    },
    "ze_hippotoxotai_2": {
        "name": "Hippotoxotai",
        "deck": "zerrikania",
        "row": "ranged",
        "strength": "4",
        "ability": "muster",
        "filename": "hippotoxotai_2",
        "count": "1",
        "target": "ze_hippotoxotai",
        "quote": "Only dust clouds, arrows and death."
    },
    "ze_hippotoxotai_3": {
        "name": "Hippotoxotai",
        "deck": "zerrikania",
        "row": "ranged",
        "strength": "4",
        "ability": "muster",
        "filename": "hippotoxotai_3",
        "count": "1",
        "target": "ze_hippotoxotai",
        "quote": "Only dust clouds, arrows and death."
    },
    "ze_skuda_amazon_1": {
        "name": "Skuda Amazon",
        "deck": "zerrikania",
        "row": "ranged",
        "strength": "6",
        "ability": "bond",
        "filename": "skuda_amazon_1",
        "count": "1",
        "target": "ze_skuda_amazon",
        "quote": "Their legendary markswomanship is very real."
    },
    "ze_skuda_amazon_2": {
        "name": "Skuda Amazon",
        "deck": "zerrikania",
        "row": "ranged",
        "strength": "6",
        "ability": "bond",
        "filename": "skuda_amazon_2",
        "count": "1",
        "target": "ze_skuda_amazon",
        "quote": "'I don't need to cut my breast to hit a bull's eye at full speed.'"
    },
    "ze_bomb_maker_1": {
        "name": "Zerrikanian Bomb Maker",
        "deck": "zerrikania",
        "row": "ranged",
        "strength": "3",
        "ability": "scorch",
        "filename": "bomb_maker_1",
        "count": "1",
        "quote": "Business of Zerrikanian bombs is... booming."
    },
    "ze_bomb_maker_2": {
        "name": "Zerrikanian Bomb Maker",
        "deck": "zerrikania",
        "row": "ranged",
        "strength": "3",
        "ability": "scorch",
        "filename": "bomb_maker_2",
        "count": "1",
        "quote": "Business of Zerrikanian bombs is... booming."
    },
    "ze_heavy_fire_scorpion": {
        "name": "Heavy Zerrikanian Fire Scorprion",
        "deck": "zerrikania",
        "row": "siege",
        "strength": "10",
        "ability": "",
        "filename": "heavy_fire_scorpion",
        "count": "1",
        "quote": "Not the best for taking cities, but great for razing them to the ground."
    },
    "ze_free_warrior_1": {
        "name": "Free Warrior",
        "deck": "zerrikania",
        "row": "close",
        "strength": "4",
        "ability": "inspire",
        "filename": "free_warrior_1",
        "count": "1",
        "quote": "'Hmm, that feeling of freedom after defeating your foe!'"
    },
    "ze_free_warrior_2": {
        "name": "Free Warrior",
        "deck": "zerrikania",
        "row": "close",
        "strength": "5",
        "ability": "inspire",
        "filename": "free_warrior_2",
        "count": "1",
        "quote": "She first lets her prey get lost in the jungle, then she starts the hunt."
    },
    "ze_free_warrior_3": {
        "name": "Free Warrior",
        "deck": "zerrikania",
        "row": "close",
        "strength": "8",
        "ability": "inspire",
        "filename": "free_warrior_3",
        "count": "1",
        "quote": "Few in the northern realms can afford his sword."
    },
    "ze_free_warrior_4": {
        "name": "Free Warrior",
        "deck": "zerrikania",
        "row": "ranged",
        "strength": "6",
        "ability": "inspire",
        "filename": "free_warrior_4",
        "count": "1",
        "quote": "'See that thing running over there, I'll make it stop.'"
    },
    "ze_free_warrior_5": {
        "name": "Free Warrior",
        "deck": "zerrikania",
        "row": "ranged",
        "strength": "7",
        "ability": "inspire",
        "filename": "free_warrior_5",
        "count": "1",
        "quote": "'At first I thought it was one o' those leopards, ye know? Till I saw the spear and realized 'twas in fact a woman.'"
    },
    "ze_first_faithel_kia": {
        "name": "First Faithel Kia",
        "deck": "zerrikania",
        "row": "close",
        "strength": "9",
        "ability": "hero whorshipper",
        "filename": "first_faithel_kia",
        "count": "1",
        "quote": "Once a close friend of Merineaevelth, she was the first tasked to find and protect the devine dragons of the world."
    },
    "ze_apucunpture_healer": {
        "name": "Apucunpture Healer",
        "deck": "zerrikania",
        "row": "siege",
        "strength": "6",
        "ability": "medic",
        "filename": "apucunpture_healer",
        "count": "1",
        "quote": "You might find it surprising, but these needles soothe pain."
    },
    "ze_canyon_herbalist": {
        "name": "Canyon Herbalist",
        "deck": "zerrikania",
        "row": "ranged",
        "strength": "5",
        "ability": "morale",
        "filename": "canyon_herbalist",
        "count": "1",
        "quote": "It is easy to get lost in the canyon, but knowing its herbs is a rare gift."
    },
    "ze_high_priestess_nia": {
        "name": "High Priestess Nia",
        "deck": "zerrikania",
        "row": "ranged",
        "strength": "10",
        "ability": "hero",
        "filename": "high_priestess_nia",
        "count": "1",
        "quote": "Battles have been fought in her name. Each bloodier than the last."
    },
    "ze_dragon_priestess_lua": {
        "name": "Dragon Priestess Lua",
        "deck": "zerrikania",
        "row": "siege",
        "strength": "8",
        "ability": "hero whorshipper",
        "filename": "dragon_priestess_lua",
        "count": "1",
        "quote": "Mastering the arcana of dragon magic is no small feat."
    },
    "ze_rainforest_pathfinder": {
        "name": "Rainforest Pathfinder",
        "deck": "zerrikania",
        "row": "ranged",
        "strength": "8",
        "ability": "spy",
        "filename": "rainforest_pathfinder",
        "count": "1",
        "quote": "How to cross the Sar'gaedd forest? Take a map, see where the nearest tribal village is, then hire a local guide."
    },
    "ze_steppes_nomad_1": {
        "name": "Steppes Nomad",
        "id": 1,
        "deck": "zerrikania",
        "row": "siege",
        "strength": "5",
        "ability": "muster",
        "filename": "steppes_nomad_1",
        "count": "1",
        "target": "ze_steppes_nomad",
        "quote": "It takes robustness and unity to survive in these vast steppes."
    },
    "ze_steppes_nomad_2": {
        "name": "Steppes Nomad",
        "id": 2,
        "deck": "zerrikania",
        "row": "siege",
        "strength": "5",
        "ability": "muster",
        "filename": "steppes_nomad_2",
        "count": "1",
        "target": "ze_steppes_nomad",
        "quote": "It takes robustness and unity to survive in these vast steppes."
    },
    "ze_war_elephant": {
        "name": "War Elephant",
        "deck": "zerrikania",
        "row": "close",
        "strength": "9",
        "ability": "",
        "filename": "war_elephant",
        "count": "1",
        "quote": "It's hard to find journals of what it is like to see a Zerrikanian elephant battalion charging towards you, for it requires survivors."
    },
    "ze_behemoth": {
        "name": "Behemoth",
        "deck": "zerrikania",
        "row": "close",
        "strength": "10",
        "ability": "hero",
        "filename": "behemoth",
        "count": "1",
        "quote": "A beast so huge its turd piles were big enough to provide housing for whole families. If it wasn't for the stench that is."
    },
    "ze_balladeer": {
        "name": "Balladeer",
        "deck": "zerrikania",
        "row": "ranged",
        "strength": "1",
        "ability": "horn",
        "filename": "balladeer",
        "count": "1",
        "quote": "It is known the Zerrikanian queen was a tought woman and that only the mellifluous voice of a deft singer could penetrate the hard shell around her heart."
    },
    "ze_alchemist": {
        "name": "Zerrikanian Alchemist",
        "deck": "zerrikania",
        "row": "siege",
        "strength": "1",
        "ability": "medic",
        "filename": "alchemist",
        "count": "1",
        "quote": "'What if I put some of this too...'"
    },
    "ze_yellow_witch_korath": {
        "name": "Yellow Witch Korath",
        "deck": "zerrikania",
        "row": "ranged",
        "strength": "10",
        "ability": "hero",
        "filename": "yellow_witch_korath",
        "count": "1",
        "quote": "A man once forgot her full title is mistakenly called her a 'sand witch'. Now is lacquered skull decorates her staff."
    },
    "ze_sandworm": {
        "name": "Sandworm",
        "deck": "zerrikania",
        "row": "close",
        "strength": "11",
        "ability": "hero",
        "filename": "sandworm",
        "count": "1",
        "quote": "Despite its massive size, many sense it coming only too late."
    },
    "spe_giant_spider_web": {
        "name": "Giant Spider Webs",
        "deck": "weather zerrikania",
        "row": "",
        "strength": "",
        "ability": "spider_web",
        "filename": "giant_spider_web",
        "count": "2",
        "quote": "Zerrikania hosts spiders so large they can trap elephants in their webs."
    },
    "spe_tse_tse_flies": {
        "name": "Tse Tse Flies",
        "deck": "weather zerrikania",
        "row": "",
        "strength": "",
        "ability": "tse_tse",
        "filename": "tse_tse_flies",
        "count": "2",
        "quote": "The flies are especially repulsive, laying their eggs in the human body, the resulting larvae maturing within the host's head."
    },
    "spe_dragon_wrath": {
        "name": "Dragon Wrath",
        "deck": "weather zerrikania",
        "row": "",
        "strength": "",
        "ability": "dragon_wrath",
        "filename": "dragon_wrath",
        "count": "2",
        "quote": "Blackened skies from wisps of smoke, the greenery's vanished in a fiery stroke."
    },
};

var ext_ofir_cards = {
    // Leader Cards
"ofir_nibras": {
        "name": "Nibras, Malliq of Ofir",
        "deck": "ofir",
        "row": "leader",
        "strength": "",
        "ability": "nibras",
        "filename": "nibras",
        "count": "1",
        "quote": "A majestic ruler of a distant and exotic land, famed for its wealth, scientific discoveries, and powerful army."
    },    
"ofir_aamad_wise": {
        "name": "Aamad, the Wise",
        "deck": "ofir",
        "row": "leader",
        "strength": "",
        "ability": "ofir_aamad",
        "filename": "aamad",
        "count": "1",
        "quote": "The royal mage to the malliq of Ofir"
    },
"ofir_nibras_gale": {
        "name": "Nibras, the Gale",
        "deck": "ofir",
        "row": "leader",
        "strength": "",
        "ability": "nibras_gale",
        "filename": "nibras_gale",
        "count": "1",
        "quote": "The Gale that Sweeps the Dunes"
    },
    "ofir_aamad": {
        "name": "Aamad, the Crown Mage",
        "deck": "ofir",
        "row": "leader",
        "strength": "",
        "ability": "ofir_aamad_crown",
        "filename": "aamad1",
        "count": "1",
        "quote": "Quiet, dog. You killed our prince and you'll pay for that."
    },
    "ofir_caravan_guard": {
        "name": "Caravan Guard",
        "deck": "ofir",
        "row": "ranged",
        "strength": "4",
        "ability": "adaptive bond",
        "filename": "caravan_guard",
        "count": "2",
        "target": "ofir_caravan_guard",
        "quote": "There's a lot of ways you can die in the desert. Not just from thirst."
    },
    "ofir_fortuneteller": {
        "name": "Fortune Teller",
        "deck": "ofir",
        "row": "ranged",
        "strength": "2",
        "ability": "clairvoyance",
        "filename": "fortuneteller",
        "count": "1",
        "quote": "The stars whisper to her; she whispers back in prophecy."
    },
    "ofir_cavalry": {
        "name": "Immortal Cavalry",
        "deck": "ofir",
        "row": "agile_cs",
        "strength": "7",
        "ability": "",
        "filename": "cavalry",
        "count": "1",
        "quote": "Maybe camels aren't as swift as horses… but at least they don't die after two days in the desert."
    },
"ofir_cataphract_1": {
        "name": "Cataphract",
        "deck": "ofir",
        "row": "siege",
        "strength": "6",
        "ability": "",
        "filename": "cataphract_1",
        "count": "1",
        "quote": "Heavy shock cavalry whose charge can sweep away entire infantry formations in a matter of seconds."
    },
"ofir_cataphract_2": {
        "name": "Cataphract",
        "deck": "ofir",
        "row": "siege",
        "strength": "6",
        "ability": "",
        "filename": "cataphract_2",
        "count": "1",
        "quote": "Many fools believed that Ofieri armor was made of pure gold, and they paid for it with their lives trying to seize a piece of that supposedly easy gold."
    },
"ofir_cataphract_3": {
        "name": "Cataphract",
        "deck": "ofir",
        "row": "siege",
        "strength": "6",
        "ability": "",
        "filename": "cataphract_3",
        "count": "1",
        "quote": "The swift onslaught of these riders shatters infantry formations like fragile earthenware."
    },
    "ofir_vanguard": {
        "name": "Caravan Vanguard",
        "deck": "ofir",
        "row": "agile_cr",
        "strength": "3",
        "ability": "adaptive bond",
        "filename": "vanguard",
        "count": "2",
        "target": "ofir_vanguard",
        "quote": "It's not easy to find one's way among the shifting dunes…"
    },
        "ofir_king_cobra": {
        "name": "King Cobra",
        "deck": "ofir",
        "row": "close",
        "strength": "3",
        "ability": "",
        "filename": "king_cobra",
        "count": "1",
        "quote": "As long as I play it'll dance. But when I stop…"
    },
     "ofir_merchant": {
        "name": "Merchant",
        "deck": "ofir",
        "row": "ranged",
        "strength": "4",
        "ability": "trade",
        "filename": "merchant",
        "count": "1",
        "quote": "I have that which you desire. As well as that which you have never seen before…"
    },
       "ofir_radeyah": {
        "name": "Radeyah",
        "deck": "ofir",
        "row": "ranged",
        "strength": "7",
        "ability": "hero clairvoyance",
        "filename": "radeyah",
        "count": "1",
        "quote": "You can hide a lot behind a beautiful smile."
    },
    "ofir_war_chariot": {
        "name": "War Chariot",
        "deck": "ofir",
        "row": "close",
        "strength": "6",
        "ability": "adaptive",
        "filename": "war_chariot",
        "count": "1",
        "quote": "The chariot drove into the crowd and its enemies fell to the ground like wheat before the scythe…"
    },
    "ofir_traveling_merchant": {
        "name": "Traveling Merchant",
        "deck": "ofir",
        "row": "siege",
        "strength": "5",
        "ability": "trade",
        "filename": "traveling_merchant",
        "count": "1",
        "quote": "My wares? Finest under the sun. Just don't ask how I got 'em."
    },
     "ofir_sunsetwanderers": {
        "name": "Sunset Wanderers",
        "deck": "ofir",
        "row": "agile_crs",
        "strength": "5",
        "ability": "",
        "filename": "sunsetwanderers",
        "count": "1",
        "quote": "It seemed like Dandelion meant to journey with the Witcher, even to the edge of the world."
    },
    "ofir_saer_quan": {
        "name": "Saer Quan",
        "deck": "ofir",
        "row": "agile_cs",
        "strength": "3",
        "ability": "hero",
        "filename": "saer_quan",
        "count": "1",
        "quote": "Every tiger is dangerous. Especially one that has taken a liking to human flesh…"
    },
    "ofir_assassin": {
        "name": "Maraal, Crown Assassin",
        "deck": "ofir",
        "row": "close",
        "strength": "5",
        "ability": "adaptive",
        "filename": "assassin",
        "count": "1",
        "quote": "He who knows too much, dies too soon."
    },    
     "ofir_war_elephant": {
        "name": "Ofieri War Elephant",
        "deck": "ofir",
        "row": "siege",
        "strength": "8",
        "ability": "",
        "filename": "war_elephant",
        "count": "1",
        "quote": "It's kind of like a fiend, but bald and with a nose that hangs to the ground. What? No, you're making things up!"
    },
    "ofir_desert_banshee": {
        "name": "Desert Banshee",
        "deck": "ofir",
        "row": "close",
        "strength": "5",
        "ability": "adaptive scorch_c",
        "filename": "desert_banshee",
        "count": "1",
        "quote": "You're worried you'll die of thirst in the sands? Relax. You won't make it that long."
    },
    "ofir_runewright": {
        "name": "Runewright",
        "deck": "ofir",
        "row": "close",
        "strength": "7",
        "ability": "rune_call",
        "filename": "runewright",
        "target": "ofir_runestone",
        "count": "1",
        "quote": "Great power lies in words. But it's not easy to enchant it into steel."
    },
    "ofir_dulla": {
        "name": "Dulla kh'Amanni",
        "deck": "ofir",
        "row": "agile_cr",
        "strength": "6",
        "ability": "hero trade",
        "filename": "dulla",
        "count": "1",
        "quote": "My wares are priceless. Luckily for you, I accept contracts as payment."
    },
"spe_ofir_sandstorm": {
        "name": "Sandstorm",
        "deck": "weather ofir",
        "row": "",
        "strength": "",
        "ability": "sandstorm",
        "filename": "sandstorm",
        "count": "3",
        "quote": "Best case – sand in your teeth. Worst case – buried alive."
    },
"ofir_fathaa": {
        "name": "Old Fathaa",
        "deck": "ofir",
        "row": "siege",
        "strength": "1",
        "ability": "medic",
        "filename": "fathaa",
        "count": "1",
        "quote": "..."
    },
"ofir_djinn1": {
        "name": "Djinn",
        "deck": "ofir",
        "row": "close",
        "strength": "5",
        "ability": "wish1",
        "filename": "djinn1",
        "count": "1",
        "quote": "A djinn, good sirs, fulfills but three wishes. Thus freed, it flees to dimensions unknown."
    },
"ofir_djinn2": {
        "name": "Djinn",
        "deck": "ofir",
        "row": "ranged",
        "strength": "5",
        "ability": "wish2",
        "filename": "djinn2",
        "count": "1",
        "quote": "They say a djinn can grant any wish. Well, maybe so. But only after it destroys you first."
    },
"ofir_djinn3": {
        "name": "Djinn",
        "deck": "ofir",
        "row": "siege",
        "strength": "5",
        "ability": "wish3",
        "filename": "djinn3",
        "count": "1",
        "quote": "I lived in a bottle once, but I prefer Ofiri lamps, they're much more comfortable."
    },
"spe_ofir_horn": {
        "name": "Commander's Horn",
        "deck": "special ofir",
        "row": "",
        "strength": "",
        "ability": "horn",
        "filename": "ofir_horn",
        "count": "3",
        "quote": "Plus one to morale, minus three to hearing."
    },
"ofir_desert_serpent": {
        "name": "Desert Serpent",
        "deck": "ofir",
        "row": "siege",
        "strength": "4",
        "ability": "morale",
        "filename": "desert_serpent",
        "count": "1",
        "quote": "The shrewdest commander of the Ofieri cavalry. They say he could set up an ambush even in a barren desert."
    },
"ofir_ofieri_prince": {
        "name": "Ofieri Prince",
        "deck": "ofir",
        "row": "siege",
        "strength": "9",
        "ability": "hero avenger",
        "filename": "ofieri_prince",
        "count": "1",
        "target": "ofir_toad_prince",
        "quote": "Once, he compared himself to the frog from the fairy tale, the one that must be kissed to become a prince. A fatal mistake..."
    },
"ofir_toad_prince": {
        "name": "Ofieri Toad Prince",
        "deck": "ofir",
        "row": "close",
        "strength": "10",
        "ability": "hero",
        "filename": "toad_prince",
        "count": "0",
        "quote": "Big, bad, ugly. Squats in the sewers."
    },
"ofir_rider_1": {
        "name": "Ofieri Rider",
        "id": 1,
        "deck": "ofir",
        "row": "siege",
        "strength": "3",
        "ability": "muster",
        "filename": "rider_1",
        "count": "1",
        "target": "ofir_rider",
        "quote": "Even the smallest of our children ride, and our horses outwit most men."
    },
    "ofir_rider_2": {
        "name": "Ofieri Rider",
        "id": 2,
        "deck": "ofir",
        "row": "siege",
        "strength": "3",
        "ability": "muster",
        "filename": "rider_2",
        "count": "1",
        "target": "ofir_rider",
        "quote": "I thought Ofieri rode camels! It's your thick skull that's camel-like, just shoot already!"
    },
"ofir_ofieri_mage": {
        "name": "Aamad",
        "id": 1,
        "deck": "ofir",
        "row": "close",
        "strength": "5",
        "ability": "hero muster",
        "filename": "ofieri_mage",
        "count": "1",
        "target": "ofir_aamads_guard",
        "quote": "A court mage. Eagerly took the lead in the search for the prince... who mysteriously vanished somewhere in Redania."
    },
    "ofir_aamads_guard_1": {
        "name": "Aamad's Guard",
        "id": 2,
        "deck": "ofir",
        "row": "close",
        "strength": "2",
        "ability": "bond",
        "filename": "aamads_guard_1",
        "count": "1",
        "target": "ofir_aamads_guard",
        "quote": "My father taught me that loyalty is above all else. One who cannot keep their word is no better than a wild beast."
    },
"ofir_aamads_guard_2": {
        "name": "Aamad's Guard",
        "id": 3,
        "deck": "ofir",
        "row": "close",
        "strength": "2",
        "ability": "bond",
        "filename": "aamads_guard_2",
        "count": "2",
        "target": "ofir_aamads_guard",
        "quote": "The mage selects his guards personally for executing the ruler's most important assignments."
    },
 "ofir_warrior_1": {
        "name": "Ofieri Warrior",
        "id": 1,
        "deck": "ofir",
        "row": "close",
        "strength": "4",
        "ability": "bond",
        "filename": "warrior_1",
        "count": "1",
        "target": "ofir_warrior",
        "quote": "The backbone of the Ofieri army – lethal, highly-disciplined infantry capable of taking the main blow."
    },
"ofir_warrior_2": {
        "name": "Ofieri Warrior",
        "id": 2,
        "deck": "ofir",
        "row": "close",
        "strength": "4",
        "ability": "bond",
        "filename": "warrior_2",
        "count": "1",
        "target": "ofir_warrior",
        "quote": "With their courage and furious onslaught, they immediately intimidate enemies."
    },
"ofir_matta": {
        "name": "Matta Hu'uri",
        "deck": "ofir",
        "row": "ranged",
        "strength": "6",
        "ability": "spy",
        "filename": "matta",
        "count": "1",
        "quote": "Sorceresses use magic to hypnotize. I use dance."
    },
 "ofir_envoy_1": {
        "name": "Ofieri Envoy",
        "deck": "ofir",
        "row": "close",
        "strength": "6",
        "ability": "ofiri_envoy",
        "filename": "envoy_1",
        "count": "1",
        "quote": "We have come from distant lands, bringing generous gifts from our ruler."
    },
"ofir_envoy_2": {
        "name": "Ofieri Envoy",
        "deck": "ofir",
        "row": "close",
        "strength": "7",
        "ability": "ofiri_envoy",
        "filename": "envoy_2",
        "count": "1",
        "quote": "Even regular Ofieri envoys are dressed more lavishly than the North's kings."
    },
"ofir_envoy_3": {
        "name": "Ofieri Envoy",
        "deck": "ofir",
        "row": "close",
        "strength": "8",
        "ability": "ofiri_envoy",
        "filename": "envoy_3",
        "count": "1",
        "quote": "He loves expensive wine, political talk, and stabbing people in the back."
    },
"ofir_ifrit_1": {
        "name": "Ifrit",
        "deck": "ofir",
        "row": "ranged",
        "strength": "5",
        "ability": "sandstorm_immunity",
        "filename": "ifrit_1",
        "count": "1",
        "target": "ofir_ifrit",
        "quote": "If the dunes start moving, pray it’s just the wind."
    },
"ofir_ifrit_2": {
        "name": "Ifrit",
        "deck": "ofir",
        "row": "ranged",
        "strength": "5",
        "ability": "sandstorm_immunity",
        "filename": "ifrit_2",
        "count": "1",
        "target": "ofir_ifrit",
        "quote": "If the dunes start moving, pray it’s just the wind."
    },
"ofir_ifrit_3": {
        "name": "Ifrit",
        "deck": "ofir",
        "row": "ranged",
        "strength": "5",
        "ability": "sandstorm_immunity",
        "filename": "ifrit_3",
        "count": "1",
        "target": "ofir_ifrit",
        "quote": "If the dunes start moving, pray it’s just the wind."
    },
   "ofir_archmage_1": {
        "name": "Archmage",
        "deck": "ofir",
        "row": "ranged",
        "strength": "4",
        "ability": "invoke",
        "filename": "archmage_1",
        "count": "1",
        "target": "ofir_ifrit",
        "quote": "There are many wizards in the world, but only a few possess the knowledge to control magical creatures."
    },
"ofir_archmage_2": {
        "name": "Archmage",
        "deck": "ofir",
        "row": "ranged",
        "strength": "4",
        "ability": "invoke",
        "filename": "archmage_2",
        "count": "1",
        "target": "ofir_ifrit",
        "quote": "In the South, magic and science are one. The sages are both sorcerers and scholars."
    },
"spe_ofir_horn": {
        "name": "Commander's Horn",
        "deck": "special ofir",
        "row": "",
        "strength": "",
        "ability": "horn",
        "filename": "ofir_horn",
        "count": "3",
        "quote": "Plus one to morale, minus three to hearing."
    },
"ofir_chernobog": {
        "name": "Chernobog runestone",
        "deck": "special ofir",
        "row": "",
        "strength": "",
        "ability": "chernobog",
        "filename": "chernobog",
        "count": "1",
        "quote": ""
    },
"ofir_perun": {
        "name": "Perun runestone",
        "deck": "special ofir",
        "row": "",
        "strength": "",
        "ability": "perun",
        "filename": "perun",
        "count": "1",
        "quote": ""
    },
"ofir_svarog": {
        "name": "Svarog runestone",
        "deck": "special ofir",
        "row": "",
        "strength": "",
        "ability": "svarog",
        "filename": "svarog",
        "count": "1",
        "quote": ""
    },
"ofir_triglav": {
        "name": "Triglav runestone",
        "deck": "special ofir",
        "row": "",
        "strength": "",
        "ability": "triglav",
        "filename": "triglav",
        "count": "1",
        "quote": "Under the sands of Ofir, we learn that even gods can be stripped of their armor."
    },
"ofir_veles": {
        "name": "Veles runestone",
        "deck": "special ofir",
        "row": "",
        "strength": "",
        "ability": "veles",
        "filename": "veles",
        "count": "1",
        "quote": "Boost sign intensity and augment magic-heavy builds."
    },
"ofir_dazhbog": {
        "name": "Dazhbog runestone",
        "deck": "special ofir",
        "row": "",
        "strength": "",
        "ability": "scorch",
        "filename": "dazhbog",
        "count": "1",
        "quote": "Careful. Still hot."
    },
"ofir_morana": {
        "name": "Morana runestone",
        "deck": "special ofir",
        "row": "",
        "strength": "",
        "ability": "morana",
        "filename": "morana",
        "count": "1",
        "quote": "I grow faint at the very sight of it…"
    },
"ofir_devana": {
        "name": "Devana runestone",
        "deck": "special ofir",
        "row": "",
        "strength": "",
        "ability": "devana",
        "filename": "devana",
        "count": "1",
        "quote": "My blades're so sharp, they can cut paper!"
    },
"ofir_zoria": {
        "name": "Zoria runestone",
        "deck": "special ofir",
        "row": "",
        "strength": "",
        "ability": "zoria",
        "filename": "zoria",
        "count": "1",
        "quote": "I'm getting a palpable chill from this runestone… did I do something to hurt its feelings?"
    },
"ofir_stribog": {
        "name": "Stribog runestone",
        "deck": "special ofir",
        "row": "",
        "strength": "",
        "ability": "stribog",
        "filename": "stribog",
        "count": "1",
        "quote": "Ofieri runemasters can combine these into runewords of incredible power."
    },
"ofir_zaira": {
        "name": "Zaira",
        "deck": "ofir",
        "row": "ranged",
        "strength": "7",
        "ability": "avenger cull",
        "filename": "zaira",
        "count": "1",
        "target": "ofir_quareen",
        "quote": "Her health, her beauty, more radiant than ever, she regained, but... she had changed."
    },
"ofir_quareen": {
        "name": "Quareen",
        "deck": "ofir",
        "row": "close",
        "strength": "8",
        "ability": "",
        "filename": "quareen",
        "count": "0",
        "quote": "The mage who wishes to force a quareen into a deceased form must be exceptionally skilled in illusions."
    },
};

var ext_nv_cards = {
"nv_sigismund": {
        "name": "Sigismund Dijkstra, the Shrewd",
        "deck": "novigrad",
        "row": "leader",
        "strength": "",
        "ability": "novigrad_sigismund",
        "filename": "sigismund",
        "count": "1",
        "quote": "Novigrad is a free city. And I intend to keep it that way."
    },
    "nv_sigismund2": {
        "name": "Sigismund Dijkstra, the Politician",
        "deck": "novigrad",
        "row": "leader",
        "strength": "",
        "ability": "novigrad_sigismund2",
        "filename": "sigismund2",
        "count": "1",
        "quote": "Gwent's a lot like politics, just more honest."
    },
    "nv_cyrus_hemmelfart": {
        "name": "Cyrus Hemmelfart: Hierarch of Novigrad",
        "deck": "novigrad",
        "row": "leader",
        "strength": "",
        "ability": "cyrus_hemmelfart1",
        "filename": "cyrus_hemmelfart",
        "count": "1",
        "quote": "Beneath all that lust, greed, and vanity, stands an honorable man."
    },
"nv_philippa": {
        "name": "Philippa Eilhart",
        "deck": "novigrad",
        "row": "ranged",
        "strength": "10",
        "ability": "hero clear",
        "filename": "philippa",
        "count": "1",
        "quote": "Soon the power of kings will wither, and the Lodge shall seize its rightful place."
    },
    "nv_dijkstra": {
        "name": "Sigismund Dijkstra",
        "deck": "novigrad",
        "row": "close",
        "strength": "8",
        "ability": "spy",
        "filename": "dijkstra",
        "count": "1",
        "quote": "Gwent's like politics, just more honest."
    },
    "nv_priscilla": {
        "name": "Priscilla",
        "deck": "novigrad",
        "row": "close",
        "strength": "2",
        "ability": "medic",
        "filename": "priscilla",
        "count": "1",
        "quote": "Picture Dandelion in a dress and you've got the general idea."
    },
    "nv_margarita": {
        "name": "Margarita Laux",
        "deck": "novigrad",
        "row": "close",
        "strength": "6",
        "ability": "clear",
        "filename": "margarita_laux",
        "count": "1",
        "quote": "I care only about what's good for Aretuza and my pupils."
    },
    "nv_eibhear_hattori": {
        "name": "Eibhear Hattori",
        "deck": "novigrad",
        "row": "ranged",
        "strength": "2",
        "ability": "morale",
        "filename": "eibhear_hattori",
        "count": "1",
        "quote": "Only thing that can rival his swords? His dumplings."
    },
    "nv_cleaver": {
        "name": "Cleaver",
        "deck": "novigrad",
        "row": "close",
        "strength": "6",
        "ability": "hero",
        "filename": "cleaver",
        "count": "1",
        "quote": "Those who try to cheat Cleaver are in for a rude awakening... And a rough landing."
    },
    "nv_francis_bedlam": {
        "name": "Francis Bedlam: King of Beggars",
        "deck": "novigrad",
        "row": "siege",
        "strength": "6",
        "ability": "hero morale",
        "filename": "francis",
        "count": "1",
        "quote": "I might just discover I look great without ears… or hands. Apparently the King of Beggars accepts both as partial payment."
    },
    "nv_whoreson_jr": {
        "name": "Whoreson Junior",
        "deck": "novigrad",
        "row": "close",
        "strength": "4",
        "ability": "hero",
        "filename": "whoresonjr",
        "count": "1",
        "quote": "A war with Whoreson will see Novigrad's gutters run red with blood."
    },
    "nv_thaler": {
        "name": "Thaler",
        "deck": "novigrad",
        "row": "siege",
        "strength": "7",
        "ability": "spy",
        "filename": "thaler",
        "count": "1",
        "quote": "Fuck off! We aren't all ploughin' philanderers. Some of us have depth..."
    },
    "nv_vernon": {
        "name": "Vernon Roche",
        "deck": "novigrad",
        "row": "close",
        "strength": "10",
        "ability": "hero",
        "filename": "vernon",
        "count": "1",
        "quote": "A partiot... and a real son of a bitch."
    },
    "nv_ves": {
        "name": "Ves",
        "deck": "novigrad",
        "row": "close",
        "strength": "7",
        "ability": "",
        "filename": "ves",
        "count": "1",
        "quote": "Better to live one day as a king than a whole life as a beggar."
    },
    "nv_novigrad": {
        "name": "Novigrad",
        "deck": "novigrad",
        "row": "siege",
        "strength": "10",
        "ability": "",
        "filename": "novigrad",
        "count": "1",
        "quote": "Novigrad's taken too kindly to all manner of urchin, shame, really."
    },
    "nv_inquisitional_pyres": {
        "name": "Inquisitional pyres",
        "deck": "novigrad",
        "row": "agile_cr",
        "strength": "3",
        "ability": "witch_hunt",
        "filename": "damnation",
        "count": "0",
        "quote": "I can't bloody breathe! Won't they burn the wretches someplace else?"
    },
    "nv_flaming_rose_footman": {
        "name": "Flaming Rose Footman",
        "deck": "novigrad",
        "row": "close",
        "strength": "5",
        "ability": "",
        "filename": "flaming_rose_footman",
        "count": "1",
        "quote": "Anyone can join The Order – a knight, a peasant, even a witcher. "
    },
    "nv_caleb_menge": {
        "name": "Caleb Menge",
        "deck": "novigrad",
        "row": "agile_cr",
        "strength": "7",
        "ability": "hero witch_hunt",
        "filename": "caleb_menge",
        "count": "1",
        "quote": "Deceivers, heretics, witches! They flood our city, corrupt our virtue, and threaten our very way of life!"
    },
    "nv_eternal_fire_inquisitor": {
        "name": "Eternal Fire Inquisitor",
        "deck": "novigrad",
        "row": "close",
        "strength": "4",
        "ability": "witch_hunt",
        "filename": "eternal_fire_inquisitor",
        "count": "1",
        "quote": "The burning light of the Eternal Fire reveals all!"
    },
    "nv_kurt": {
        "name": "Kurt",
        "deck": "novigrad",
        "row": "agile_crs",
        "strength": "6",
        "ability": "",
        "filename": "kurt",
        "count": "1",
        "quote": "Oy, Kurt, find out what Merigold's hollerin' about, if she needs anything. A hot iron to the tongue, maybe?"
    },
    "nv_inquisitor_helveed": {
        "name": "Grand Inquisitor Helveed",
        "deck": "novigrad",
        "row": "siege",
        "strength": "6",
        "ability": "hero scorch",
        "filename": "inquisitor_helveed",
        "count": "1",
        "quote": "When mercy fails, fire prevails."
    },
    "nv_eternal_fire_priest_1": {
        "name": "Eternal Fire Priest",
        "id": 1,
        "deck": "novigrad",
        "row": "ranged",
        "strength": "2",
        "ability": "bond",
        "filename": "eternal_fire_priest_1",
        "count": "1",
        "target": "nv_eternal_fire_priest",
        "quote": "Closer, my sheep, gather closer. May the Eternal Fire warm your souls!"
    },
    "nv_eternal_fire_priest_2": {
        "name": "Eternal Fire Priest",
        "id": 2,
        "deck": "novigrad",
        "row": "ranged",
        "strength": "3",
        "ability": "bond",
        "filename": "eternal_fire_priest_2",
        "count": "1",
        "target": "nv_eternal_fire_priest",
        "quote": "Closer, my sheep, gather closer. May the Eternal Fire warm your souls!"
    },
    "nv_eternal_fire_priest_3": {
        "name": "Eternal Fire Priest",
        "id": 3,
        "deck": "novigrad",
        "row": "ranged",
        "strength": "4",
        "ability": "bond",
        "filename": "eternal_fire_priest_3",
        "count": "1",
        "target": "nv_eternal_fire_priest",
        "quote": "Closer, my sheep, gather closer. May the Eternal Fire warm your souls!"
    },
    "nv_roderick_wett": {
        "name": "Roderick de Wett",
        "deck": "novigrad",
        "row": "close",
        "strength": "6",
        "ability": "hero",
        "filename": "roderick_wett",
        "count": "1",
        "quote": "Count de Wett is exceptionally loathsome and arrogant, but at least he enjoys a little dice poker on the side."
    },
    "nv_moreelse": {
        "name": "Moreelse",
        "deck": "novigrad",
        "row": "ranged",
        "strength": "6",
        "ability": "witch_hunt",
        "filename": "moreelse",
        "count": "1",
        "quote": "Some witch hunters truly believed the eradication of mages and sorceresses would make the world a better place. Some did not require such justification."
    },
    "nv_nathaniel_pastodi": {
        "name": "Nathaniel Pastodi",
        "deck": "novigrad",
        "row": "agile_rs",
        "strength": "3",
        "ability": "hero morale",
        "filename": "nathaniel_pastodi",
        "count": "1",
        "quote": "Novigrad – where the impossible becomes possible. A professional torturer turned reverend, for instance."
    },
    "nv_cleric_flaming_rose": {
        "name": "Cleric of the Flaming Rose",
        "id": 1,
        "deck": "novigrad",
        "row": "ranged",
        "strength": "4",
        "ability": "muster",
        "filename": "cleric_flaming_rose",
        "count": "1",
        "target": "sy_eternal_fire_disciple",
        "quote": "We have two eyes, two ears, but only one tongue, so that we would look and listen twice more than we speak. "
    },
    "nv_eternal_fire_disciple": {
        "name": "Eternal Fire Disciple",
        "deck": "novigrad",
        "row": "ranged",
        "strength": "3",
        "ability": "muster",
        "filename": "eternal_fire_disciple",
        "count": "1",
        "target": "nv_firesworn_zealot",
        "quote": "Look into your hearts, dear brethen. Does a contempt for injustice not burn within it?"
    },
"nv_firesworn_zealot": {
        "name": "Firesworn Zealot",
        "deck": "novigrad",
        "row": "ranged",
        "strength": "2",
        "ability": "",
        "filename": "firesworn_zealot",
        "count": "1",
        "quote": "Great is my faith, and great is my ire!"
    },
    "nv_temple_guard": {
        "name": "Temple Guard",
        "deck": "novigrad",
        "row": "close",
        "strength": "5",
        "ability": "",
        "filename": "temple_guard",
        "count": "1",
        "quote": "Halt! Who goes there?! Firesworn or heretic?"
    },
    "nv_field_marshal_duda": {
        "name": "Duda",
        "deck": "novigrad",
        "row": "agile_crs",
        "strength": "2",
        "ability": "morale",
        "filename": "marshal_duda",
        "count": "1",
        "quote": "Knows one hundred words – eighty of them curses, the rest, connectors."
    },
    "nv_iris": {
        "name": "Iris von Everec",
        "deck": "novigrad",
        "row": "agile_crs",
        "strength": "0",
        "ability": "omen",
        "filename": "iris",
        "count": "1",
        "quote": "Love endures beyond the veil."
    },
"nv_catanddog": {
        "name": "Cat and Dog",
        "deck": "novigrad",
        "row": "agile_crs",
        "strength": "0",
        "ability": "spy",
        "filename": "catanddog",
        "count": "1",
        "quote": "..."
    },
    "nv_bomb_heaver": {
        "name": "Bomb Heaver",
        "deck": "novigrad",
        "row": "siege",
        "strength": "3",
        "ability": "scorch_c",
        "filename": "bomb_heaver",
        "count": "1",
        "quote": "Watch your heads!"
    },
    "nv_corinne": {
        "name": "Corinne",
        "deck": "novigrad",
        "row": "ranged",
        "strength": "3",
        "ability": "clairvoyance",
        "filename": "corinne",
        "count": "1",
        "quote": "Know when a legend turns into prophecy? When it gains believers."
    },
    "nv_adriano_mink": {
        "name": "Adriano the Mink",
        "deck": "novigrad",
        "row": "close",
        "strength": "6",
        "ability": "",
        "filename": "adriano_mink",
        "count": "1",
        "quote": "Right here, beautiful. Have a sit on daddy's lap."
    },
 "nv_renegade_mage": {
        "name": "Renegade Mage",
        "deck": "novigrad",
        "row": "close",
        "strength": "4",
        "ability": "cull",
        "filename": "renegade_mage",
        "count": "1",
        "quote": "I really hope that's boot leather I smell burning..."
    },
 "nv_cantarella": {
        "name": "Cantarella",
        "deck": "novigrad",
        "row": "close",
        "strength": "1",
        "ability": "ambush",
        "filename": "cantarella",
        "count": "1",
        "quote": "Men require constant alluring. Mystique and refinement do the job quite well."
    },
 "nv_hubert_rejk": {
        "name": "Hubert Rejk",
        "deck": "novigrad",
        "row": "ranged",
        "strength": "5",
        "ability": "avenger",
        "filename": "hubert_rejk",
        "count": "1",
        "target": "nv_katakan",
        "quote": "The coroner is a calm, peaceful person. He even treats corpses with the utmost delicacy."
    },
"nv_katakan": {
        "name": "Katakan",
        "deck": "novigrad",
        "row": "ranged",
        "strength": "7",
        "ability": "",
        "filename": "katakan",
        "count": "0",
        "quote": "Novigrad requires rejuvenation – a rebirth!"
    },
  "nv_saul_navarette": {
        "name": "Saul de Navarette",
        "deck": "novigrad",
        "row": "siege",
        "strength": "4",
        "ability": "",
        "filename": "saul_navarette",
        "count": "1",
        "quote": "A connoisseur with bottomless pockets and a soul black as tar."
    },
 "nv_gudrun_bjornsdottir": {
        "name": "Gudrun Bjornsdottir",
        "deck": "novigrad",
        "row": "siege",
        "strength": "4",
        "ability": "hero",
        "filename": "gudrun_bjornsdottir",
        "count": "1",
        "quote": "She found her freedom among blue waters and salty wind."
    },
    "nv_imke": {
        "name": "Imke",
        "deck": "novigrad",
        "row": "ranged",
        "strength": "6",
        "ability": "spy",
        "filename": "imke",
        "count": "1",
        "quote": "No sooner had she caught Gudrun's attention than sought to exploit it."
    },
    "nv_dudu_biberveldt": {
        "name": "Dudu Biberveldt",
        "deck": "novigrad",
        "row": "ranged",
        "strength": "1",
        "ability": "spy",
        "filename": "dudu_biberveldt",
        "count": "1",
        "quote": "A mimic, among the many other names for his sort: changelings, doublings, vexlings… or dopplers."
    },
    "nv_aphotecary": {
        "name": "Blindeye Apothecary",
        "deck": "novigrad",
        "row": "close",
        "strength": "2",
        "ability": "medic",
        "filename": "apothecary",
        "count": "1",
        "quote": "After her husband died in a tragic carriage accident, she threw herself completely into her work."
    },
    "nv_madame_luiza": {
        "name": "Madame Luiza",
        "deck": "novigrad",
        "row": "siege",
        "strength": "6",
        "ability": "morale",
        "filename": "madame_luiza",
        "count": "1",
        "quote": "We've bedded more men than all Redania's army barracks combined."
    },
    "nv_caesar_bilzen": {
        "name": "Caesar Bilzen",
        "deck": "novigrad",
        "row": "ranged",
        "strength": "5",
        "ability": "comrade",
        "filename": "caesar_bilzen",
        "count": "1",
        "quote": "Avid angler, meticulous collector, and a real piece of work."
    },
    "nv_rico_meiersdorf": {
        "name": "Rico Meiersdorf",
        "deck": "novigrad",
        "row": "agile_cr",
        "strength": "1",
        "ability": "morale",
        "filename": "rico_meiersdorf",
        "count": "1",
        "quote": "I never did much like bees."
    },
    "nv_marquise_serenity": {
        "name": "Madam Marquise Serenity",
        "deck": "novigrad",
        "row": "agile_cr",
        "strength": "3",
        "ability": "invoke",
        "filename": "marquise",
        "count": "1",
        "target": "nv_passiflora",
        "quote": "If you're looking for something different, perhaps a round of Gwent?"
    },
  "nv_passiflora_1": {
        "name": "Sly Seductress",
        "deck": "novigrad",
        "row": "agile_crs",
        "strength": "4",
        "ability": "ambush",
        "filename": "sly_seductress",
        "count": "1",
        "quote": "The sweeter her words, the more bitter your losses."
    },
    "nv_passiflora_2": {
        "name": "Passiflora Peaches",
        "deck": "novigrad",
        "row": "close",
        "strength": "4",
        "ability": "spy",
        "filename": "passiflora_peaches",
        "count": "1",
        "quote": "They'll mess with your head, break your heart and empty your purse."
    },
    "nv_passiflora_3": {
        "name": "One night at the Passiflora",
        "deck": "novigrad",
        "row": "ranged",
        "strength": "4",
        "ability": "horn",
        "filename": "passiflora",
        "count": "1",
        "quote": "More pilgrims come here than to the Temple of the Eternal Fire..."
    },
    "nv_ferko": {
        "name": "Ferko the Sculptor",
        "deck": "novigrad",
        "row": "close",
        "strength": "1",
        "ability": "scorch",
        "filename": "ferko",
        "count": "1",
        "quote": "Some call it base thuggery. But me, I consider it the highest art form."
    },
    "nv_igor_hook": {
        "name": "Igor the Hook",
        "deck": "novigrad",
        "row": "siege",
        "strength": "6",
        "ability": "",
        "filename": "igor_hook",
        "count": "1",
        "quote": "In the left corner, a bloodthirsty shaelmaar, and in the right co--oh bollocks... Fight's over, hold your bets!"
    },
    "nv_sausage_maker": {
        "name": "Sausage Maker",
        "deck": "novigrad",
        "row": "close",
        "strength": "6",
        "ability": "morale",
        "filename": "sausage_maker",
        "count": "1",
        "quote": "Body disposal and sausage makin', that's what I do."
    },
    "nv_zoltan": {
        "name": "Zoltan Chivay",
        "deck": "novigrad",
        "row": "close",
        "strength": "5",
        "ability": "comrade",
        "filename": "zoltan",
        "count": "1",
        "quote": "Life without old mates and booze is like a woman without a rump."
    },
    "nv_sarah": {
        "name": "Sarah",
        "deck": "novigrad",
        "row": "siege",
        "strength": "7",
        "ability": "spy",
        "filename": "sarah",
        "count": "1",
        "quote": "Little Sarah wants to play!"
    },
    "nv_djinn": {
        "name": "Djinn",
        "deck": "novigrad",
        "row": "siege",
        "strength": "6",
        "ability": "wish1",
        "filename": "djinn",
        "count": "1",
        "quote": "A djinn, good sirs, fulfills but three wishes. Thus freed, it flees to dimensions unknown."
    },
   "nv_kelpie": {
        "name": "Kelpie",
        "deck": "novigrad",
        "row": "siege",
        "strength": "0",
        "ability": "avenger",
        "filename": "kelpie",
        "count": "1",
        "target": "ntr_ciri",
        "quote": "In the north 'Kelpie' was a sea monster..."
    },
    "nv_witch_hunter": {
        "name": "Witch Hunter",
        "deck": "novigrad",
        "row": "agile_cs",
        "strength": "1",
        "ability": "witch_hunt",
        "filename": "witch_hunter",
        "count": "1",
        "quote": "Long coats, wide-brimmed hats, and crooked grins – witch hunters are hard to miss."
    },
    "nv_kalkstein": {
        "name": "Adalbertus Kalkstein",
        "deck": "novigrad",
        "row": "siege",
        "strength": "4",
        "ability": "morale",
        "filename": "kalkstein",
        "count": "1",
        "quote": "Before Kalkstein departed this world, he left us with some rather unflattering words about our gracious king..."
    },
    "nv_deserter_1": {
        "name": "Deserter",
        "deck": "novigrad",
        "row": "close",
        "strength": "4",
        "ability": "muster",
        "filename": "deserter_1",
        "count": "1",
        "target": "nv_deserter",
        "quote": "It is interesting that every second deserter is a volunteer."
    },
    "nv_deserter_2": {
        "name": "Deserter",
        "deck": "novigrad",
        "row": "close",
        "strength": "3",
        "ability": "muster",
        "filename": "deserter_2",
        "count": "1",
        "target": "nv_deserter",
        "quote": "It is interesting that every second deserter is a volunteer."
    },
    "nv_deserter_3": {
        "name": "Deserter",
        "deck": "novigrad",
        "row": "close",
        "strength": "3",
        "ability": "muster",
        "filename": "deserter_3",
        "count": "1",
        "target": "nv_deserter",
        "quote": "It is interesting that every second deserter is a volunteer."
    },
    "nv_salma": {
        "name": "Salma",
        "deck": "novigrad",
        "row": "siege",
        "strength": "4",
        "ability": "",
        "filename": "salma",
        "count": "1",
        "quote": "I'm not one to lie. Nor do I kill without reason."
    },
};


/*
 * Selecting cards to use
 */
var card_dict = default_cards;

card_dict = Object.assign({}, card_dict, ext_nr_cards);
card_dict = Object.assign({}, card_dict, ext_ne_cards);
card_dict = Object.assign({}, card_dict, ext_mo_cards);
card_dict = Object.assign({}, card_dict, ext_st_cards);
card_dict = Object.assign({}, card_dict, ext_sk_cards);
card_dict = Object.assign({}, card_dict, ext_re_cards);
card_dict = Object.assign({}, card_dict, ext_to_cards);
card_dict = Object.assign({}, card_dict, ext_ve_cards);
card_dict = Object.assign({}, card_dict, ext_wh_cards);

card_dict = Object.assign({}, card_dict, ext_wu_cards);
card_dict = Object.assign({}, card_dict, ext_lr_cards);
card_dict = Object.assign({}, card_dict, ext_sy_cards);
card_dict = Object.assign({}, card_dict, ext_ze_cards);
card_dict = Object.assign({}, card_dict, ext_ofir_cards);
card_dict = Object.assign({}, card_dict, ext_nv_cards);
