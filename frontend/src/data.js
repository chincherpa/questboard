// Tile reference (tilemap_packed.png, 16x16 grid):
//   8=faucet  29=heart  43=wooden crate  44=glowing crate  53=monitor  55=coin
//   63=dresser  64=cross  67=barrel  68=barrel2  72=treasure chest  75=bookshelf
//   89=travel bag  91=backpack  113=spray bottle  114=green potion  115=red potion
//   116=blue potion  117=double axe  118=silver axe  128=staff/stick  131=torch

export const ALL_CHORES = [
  // Daily - everyone
  { id: 'dishes',      name: 'Geschirr spülen',        icon: '🍽️', pts: 3, who: 'all',    freq: 'daily',   mode: 'party' },
  { id: 'wipedown',    name: 'Flächen wischen', icon: '🧽', pts: 2, who: 'all',    freq: 'daily',   mode: 'party' },
  { id: 'toys',        name: 'Spielzeug aufräumen',    icon: '🧸', pts: 2, who: 'all',    freq: 'daily',   mode: 'party' },
  { id: 'feedpet',     name: 'Tiere füttern',          icon: '🐾', pts: 2, who: 'all',    freq: 'daily',   mode: 'party' },
  { id: 'setatable',   name: 'Tisch decken',           icon: '🍴', pts: 2, who: 'all',    freq: 'daily',   mode: 'party' },
  { id: 'makebeds',    name: 'Betten machen',          icon: '🛏️', pts: 2, who: 'all',    freq: 'daily',   mode: 'solo'  },
  { id: 'walkdog',     name: 'Hund ausführen',         icon: '🐕', pts: 3, who: 'all',    freq: 'daily',   mode: 'party' },
  { id: 'sweep',       name: 'Boden fegen',            icon: '🧹', pts: 2, who: 'all',    freq: 'daily',   mode: 'party' },
  { id: 'unloaddw',    name: 'Spülmaschine leeren',    icon: '🥣', pts: 2, who: 'all',    freq: 'daily',   mode: 'party' },
  { id: 'clearclutter',name: 'Kram wegräumen',         icon: '📦', pts: 2, who: 'all',    freq: 'daily',   mode: 'party' },

  // Daily - adults
  { id: 'cook',        name: 'Abendessen kochen',      icon: '🍲', pts: 4, who: 'adults', freq: 'daily',   mode: 'party' },
  { id: 'laundry',     name: 'Wäsche waschen',         icon: '🫧', pts: 4, who: 'adults', freq: 'daily',   mode: 'party' },
  { id: 'catbox',      name: 'Katzenklo reinigen',     icon: '🐱', pts: 3, who: 'adults', freq: 'daily',   mode: 'party' },
  { id: 'foldlaundry', name: 'Wäsche zusammenlegen',   icon: '👕', pts: 3, who: 'adults', freq: 'daily',   mode: 'party' },
  { id: 'packlunch',   name: 'Lunchpakete machen',     icon: '🥪', pts: 3, who: 'adults', freq: 'daily',   mode: 'party' },
  { id: 'wipestove',   name: 'Herd abwischen',         icon: '🔥', pts: 2, who: 'adults', freq: 'daily',   mode: 'party' },

  // Weekly - everyone
  { id: 'water',       name: 'Pflanzen gießen',        icon: '🌱', pts: 2, who: 'all',    freq: 'weekly',  mode: 'party' },

  // Weekly - adults
  { id: 'vacuum',      name: 'Staubsaugen',            icon: '🌀', pts: 4, who: 'adults', freq: 'weekly',  mode: 'party' },
  { id: 'mop',         name: 'Boden wischen',          icon: '🪣', pts: 4, who: 'adults', freq: 'weekly',  mode: 'party' },
  { id: 'trash',       name: 'Müll rausbringen',       icon: '🗑️', pts: 3, who: 'adults', freq: 'weekly',  mode: 'party', dow: 2 },
  { id: 'recycling',   name: 'Recycling',              icon: '♻️', pts: 3, who: 'adults', freq: 'weekly',  mode: 'party', dow: 5 },
  { id: 'groceries',   name: 'Einkaufen',              icon: '🛒', pts: 4, who: 'adults', freq: 'weekly',  mode: 'party' },
  { id: 'dogpoop',     name: 'Hundehaufen wegmachen',  icon: '💩', pts: 3, who: 'adults', freq: 'weekly',  mode: 'party' },
  { id: 'bathroom',    name: 'Bad putzen',             icon: '🚿', pts: 4, who: 'adults', freq: 'weekly',  mode: 'party' },
  { id: 'compost',     name: 'Kompost leeren',         icon: '🍃', pts: 2, who: 'adults', freq: 'weekly',  mode: 'party' },
  { id: 'microwave',   name: 'Mikrowelle reinigen',    icon: '♨️', pts: 3, who: 'adults', freq: 'weekly',  mode: 'party' },
  { id: 'yardwork',    name: 'Gartenarbeit',           icon: '🌿', pts: 4, who: 'adults', freq: 'weekly',  mode: 'party' },
  { id: 'sheets',      name: 'Bettwäsche wechseln',    icon: '🛌', pts: 3, who: 'adults', freq: 'weekly',  mode: 'party' },
  { id: 'windows',     name: 'Fenster putzen',         icon: '🪟', pts: 3, who: 'adults', freq: 'weekly',  mode: 'party' },
  { id: 'bathdog',     name: 'Hund baden',             icon: '🐶', pts: 3, who: 'adults', freq: 'weekly',  mode: 'party' },

  // Weekly - kids
  { id: 'homework',    name: 'Hausaufgaben gemacht',   icon: '📚', pts: 3, who: 'kids',   freq: 'weekly',  mode: 'solo'  },

  // Daily - kids
  { id: 'brushteeth',  name: 'Zähne putzen',           icon: '🦷', pts: 2, who: 'kids',   freq: 'daily',   mode: 'solo'  },
  { id: 'getdressed',  name: 'Anziehen',               icon: '🧢', pts: 2, who: 'kids',   freq: 'daily',   mode: 'solo'  },
  { id: 'reading',     name: 'Buch lesen',             icon: '📖', pts: 3, who: 'kids',   freq: 'daily',   mode: 'solo'  },
  { id: 'backpack',    name: 'Schulranzen packen',     icon: '🎒', pts: 2, who: 'kids',   freq: 'daily',   mode: 'solo'  },
  { id: 'pjamas',      name: 'Schlafanzug anziehen',   icon: '🌙', pts: 2, who: 'kids',   freq: 'daily',   mode: 'solo'  },
  { id: 'tidyroom',    name: 'Zimmer aufräumen',       icon: '🛋️', pts: 2, who: 'kids',   freq: 'daily',   mode: 'solo'  },

  // Monthly - adults
  { id: 'deepclean',   name: 'Küche gründlich putzen', icon: '🧼', pts: 6, who: 'adults', freq: 'monthly', mode: 'party' },
  { id: 'carwash',     name: 'Auto waschen',           icon: '🚗', pts: 4, who: 'adults', freq: 'monthly', mode: 'party' },
  { id: 'deepvac',     name: 'Gründlich saugen & wischen', icon: '✨', pts: 5, who: 'adults', freq: 'monthly', mode: 'party' },
  { id: 'oilchange',   name: 'Auto warten',            icon: '🔧', pts: 6, who: 'adults', freq: 'monthly', mode: 'party' },
  { id: 'gardening',   name: 'Gärtnern',               icon: '🌻', pts: 5, who: 'adults', freq: 'monthly', mode: 'party' },

  // Monthly - everyone
  { id: 'organize',    name: 'Zimmer organisieren',    icon: '🗂️', pts: 5, who: 'all',    freq: 'monthly', mode: 'party' },
  { id: 'donate',      name: 'Spenden & ausmisten',    icon: '💝', pts: 4, who: 'all',    freq: 'monthly', mode: 'party' },

  // Monthly - kids
  { id: 'closetclean', name: 'Schrank aufräumen',      icon: '👗', pts: 4, who: 'kids',   freq: 'monthly', mode: 'solo'  },
  { id: 'toybox',      name: 'Spielzeugkiste sortieren', icon: '🪀', pts: 3, who: 'kids',   freq: 'monthly', mode: 'solo'  },
];

// Gold economy (kids earn ~3/kill tier1, adults ~6/kill tier1)
// Target: 2-3 kills for cheapest reward in each mode
// Rewards: quick (2-3 kills) | mid (5-8 kills) | big (2-3 weeks) | dream (1+ month)
export const REWARDS = [
  // Quick treats
  { id: 'extracandy',   name: 'Süßigkeitentüte',     icon: '🍬', cost:  8, desc: 'Such dir Süßigkeiten aus',          who: 'kids'   },
  { id: 'screentime',   name: 'Extra Bildschirmzeit', icon: '📱', cost:  8, desc: '1 Stunde extra',                   who: 'kids'   },
  { id: 'cocktails',    name: 'Cocktail-Abend',      icon: '🍹', cost: 15, desc: 'Edle Drinks zu Hause',              who: 'adults' },
  { id: 'dessert',      name: 'Besonderer Nachtisch', icon: '🎂', cost: 18, desc: 'Leckerei aus dem Laden',           who: 'all'    },

  // Mid rewards
  { id: 'latenight',    name: 'Länger aufbleiben',   icon: '⭐', cost: 18, desc: '1 Stunde länger wach',              who: 'kids'   },
  { id: 'choosemeal',   name: 'Abendessen wählen',   icon: '🍜', cost: 20, desc: 'Du bestimmst das Abendessen',       who: 'all'    },
  { id: 'bookshop',     name: 'Neues Buch',          icon: '📘', cost: 22, desc: 'Such dir ein Buch aus',             who: 'all'    },
  { id: 'craft',        name: 'Bastelprojekt',       icon: '✂️', cost: 24, desc: 'Such dir ein Bastelset aus',        who: 'kids'   },
  { id: 'cookwithme',   name: 'Rezept kochen',       icon: '👨‍🍳', cost: 28, desc: 'Such ein Rezept zum gemeinsamen Kochen', who: 'kids' },
  { id: 'choosemovie',  name: 'Film aussuchen',      icon: '🎬', cost: 28, desc: 'Du bestimmst, was wir schauen',     who: 'all'    },
  { id: 'icecream',     name: 'Eis essen gehen',     icon: '🍦', cost: 30, desc: 'Such dir jede Sorte aus',           who: 'all'    },
  { id: 'gamenight',    name: 'Spieleabend',         icon: '🎲', cost: 35, desc: 'Such das Brettspiel aus',           who: 'all'    },
  { id: 'nochore',      name: 'Heute keine Aufgaben', icon: '🏖️', cost: 40, desc: 'Ganzer Tag frei von Aufgaben',     who: 'all'    },

  // Big rewards
  { id: 'hike',         name: 'Wandern oder Parktag', icon: '🥾', cost: 45, desc: 'Such einen Weg in der Nähe',       who: 'adults' },
  { id: 'picnic',       name: 'Picknick im Park',    icon: '🧺', cost: 45, desc: 'Gemeinsam ein Picknick packen',     who: 'all'    },
  { id: 'videogameday', name: 'Den ganzen Tag zocken', icon: '🎮', cost: 45, desc: 'Heute keine Bildschirmzeit-Grenze', who: 'kids' },
  { id: 'sleepover',    name: 'Übernachtungsparty',  icon: '🌛', cost: 45, desc: 'Ein Freund darf übernachten',       who: 'kids'   },
  { id: 'movie',        name: 'Filmabend',           icon: '🍿', cost: 55, desc: 'Familie wählt Film + Popcorn',      who: 'all'    },
  { id: 'brunch',       name: 'Edler Brunch',        icon: '🥐', cost: 55, desc: 'Brunch in einem schönen Café',      who: 'adults' },
  { id: 'spa',          name: 'Entspannungstag',     icon: '🛁', cost: 60, desc: 'Keine Aufgaben, Massage, chillen',  who: 'adults' },
  { id: 'toyshop',      name: 'Spielzeugladen-Tour', icon: '🎪', cost: 65, desc: '10 € Budget, deine Wahl',           who: 'kids'   },
  { id: 'arcade',       name: 'Spielhalle oder Bowling', icon: '🕹️', cost: 70, desc: 'Lustiger Familienausflug',     who: 'all'    },

  // Dream rewards
  { id: 'dinner',       name: 'Essen gehen',         icon: '🥂', cost: 90, desc: 'Restaurant deiner Wahl',            who: 'all'    },
  { id: 'waterpark',    name: 'Tag im Erlebnisbad',  icon: '🌊', cost:160, desc: 'Ganzer Tag im Erlebnisbad',         who: 'all'    },
  { id: 'camping',      name: 'Campingausflug',      icon: '🏕️', cost:220, desc: 'Wochenende in den Bergen',          who: 'all'    },
];

// Monster roster - level-gated tiers with normalized gold/HP ratios
// Tier assignment: HP 7-8 → T1, HP 9 → T2, HP 10 atk≤3 → T2, HP 10 atk≥4 → T3,
//   HP 11 atk≤4 → T3, HP 11 atk≥5 → T4, HP 12 gold<16(old) → T4, HP 12 gold≥16(old) → T5
// Gold ratios: T1=0.80/0.70, T2=0.85/0.75, T3=0.90/0.80, T4=0.95/0.85, T5=1.00/0.90
export const MONSTERS = [
  // Tier 1: HP 7-8, gold/HP ratio 0.80 (adults), 0.70 (kids)
  { id: 'green_slime',    name: 'Grüner Schleim',    adultHP:  7, kidHP:  5, atk:  2, gold:  6, kidGold:  4, tier: 1 },
  { id: 'rat',            name: 'Kanalratte',        adultHP:  7, kidHP:  5, atk:  2, gold:  6, kidGold:  4, tier: 1 },
  { id: 'tiny_spider',    name: 'Winzige Spinne',    adultHP:  8, kidHP:  5, atk:  2, gold:  6, kidGold:  4, tier: 1 },
  { id: 'forest_imp',     name: 'Waldkobold',        adultHP:  8, kidHP:  5, atk:  2, gold:  6, kidGold:  4, tier: 1 },
  { id: 'wisp',           name: 'Irrlicht',          adultHP:  8, kidHP:  5, atk:  2, gold:  6, kidGold:  4, tier: 1 },
  { id: 'evil_shroom',    name: 'Böser Pilz',        adultHP:  8, kidHP:  5, atk:  2, gold:  6, kidGold:  4, tier: 1 },

  // Tier 2: HP 9, or HP 10 with atk ≤ 3; gold/HP ratio 0.85/0.75
  { id: 'goblin',         name: 'Goblin',            adultHP:  9, kidHP:  6, atk:  3, gold:  8, kidGold:  5, tier: 2 },
  { id: 'night_imp',      name: 'Nachtkobold',       adultHP:  9, kidHP:  6, atk:  3, gold:  8, kidGold:  5, tier: 2 },
  { id: 'plaguebearer',   name: 'Seuchenträger',     adultHP:  9, kidHP:  6, atk:  3, gold:  8, kidGold:  5, tier: 2 },
  { id: 'spectral_hound', name: 'Geisterhund',       adultHP:  9, kidHP:  6, atk:  3, gold:  8, kidGold:  5, tier: 2 },
  { id: 'cave_bat',       name: 'Höhlenfledermaus',  adultHP: 10, kidHP:  7, atk:  3, gold:  9, kidGold:  5, tier: 2 },
  { id: 'shadow_man',     name: 'Schattenpirscher',  adultHP: 10, kidHP:  7, atk:  3, gold:  9, kidGold:  5, tier: 2 },
  { id: 'wild_buck',      name: 'Wilder Hirsch',     adultHP: 10, kidHP:  7, atk:  3, gold:  9, kidGold:  5, tier: 2 },

  // Tier 3: HP 10 atk ≥ 4, or HP 11 atk ≤ 4; gold/HP ratio 0.90/0.80
  { id: 'skeleton',       name: 'Skelett',           adultHP: 10, kidHP:  7, atk:  4, gold:  9, kidGold:  6, tier: 3 },
  { id: 'chaos_imp',      name: 'Chaoskobold',       adultHP: 10, kidHP:  7, atk:  4, gold:  9, kidGold:  6, tier: 3 },
  { id: 'large_snake',    name: 'Riesenschlange',    adultHP: 10, kidHP:  8, atk:  4, gold:  9, kidGold:  6, tier: 3 },
  { id: 'reaper',         name: 'Sensenmann',        adultHP: 11, kidHP:  8, atk:  4, gold: 10, kidGold:  6, tier: 3 },
  { id: 'frost_yetling',  name: 'Frostyeti',         adultHP: 11, kidHP:  8, atk:  4, gold: 10, kidGold:  6, tier: 3 },
  { id: 'toxic_slime',    name: 'Giftschleim',       adultHP: 10, kidHP:  7, atk:  4, gold:  9, kidGold:  6, tier: 3 },
  { id: 'cyber_drone',    name: 'Cyber-Drohne',      adultHP: 10, kidHP:  7, atk:  4, gold:  9, kidGold:  6, tier: 3 },

  // Tier 4: HP 11 atk ≥ 5, or HP 12 (non-boss); gold/HP ratio 0.95/0.85
  { id: 'void_devil',     name: 'Leerenteufel',      adultHP: 11, kidHP:  8, atk:  5, gold: 10, kidGold:  7, tier: 4 },
  { id: 'mimic',          name: 'Mimik',             adultHP: 11, kidHP:  8, atk:  5, gold: 10, kidGold:  7, tier: 4 },
  { id: 'skeleton_warrior',name: 'Skelettkrieger',   adultHP: 11, kidHP:  8, atk:  5, gold: 10, kidGold:  7, tier: 4 },
  { id: 'molten_golem',   name: 'Lavagolem',         adultHP: 11, kidHP:  8, atk:  5, gold: 10, kidGold:  7, tier: 4 },
  { id: 'mirrorfiend',    name: 'Spiegelunhold',     adultHP: 11, kidHP:  9, atk:  5, gold: 10, kidGold:  8, tier: 4 },
  { id: 'fire_elemental', name: 'Feuerelementar',    adultHP: 12, kidHP:  9, atk:  5, gold: 11, kidGold:  8, tier: 4 },
  { id: 'phantom_minotaur',name: 'Phantom-Minotaurus', adultHP: 12, kidHP:  9, atk:  6, gold: 11, kidGold:  8, tier: 4 },
  { id: 'rock_golem',     name: 'Felsgolem',         adultHP: 11, kidHP:  8, atk:  5, gold: 10, kidGold:  7, tier: 4 },
  { id: 'cyber_walker',   name: 'Cyberzahn',         adultHP: 12, kidHP:  9, atk:  6, gold: 11, kidGold:  8, tier: 4 },

  // Tier 5: boss monsters (HP 12, high gold); gold/HP ratio 1.00/0.90
  { id: 'frost_golem',    name: 'Frostgolem',        adultHP: 12, kidHP:  9, atk:  6, gold: 12, kidGold:  8, tier: 5 },
  { id: 'giant_spider',   name: 'Riesenspinne',      adultHP: 12, kidHP: 10, atk:  7, gold: 12, kidGold:  9, tier: 5 },
  { id: 'cave_troll',     name: 'Höhlentroll',       adultHP: 12, kidHP: 10, atk:  7, gold: 12, kidGold:  9, tier: 5 },
  { id: 'sandworm',       name: 'Sandwurm',          adultHP: 12, kidHP: 10, atk:  7, gold: 12, kidGold:  9, tier: 5 },
  { id: 'jrpg_ogre',      name: 'Oger-Häuptling',    adultHP: 12, kidHP: 10, atk:  7, gold: 12, kidGold:  9, tier: 5 },
  { id: 'happy_blob',     name: 'Uralter Blob',      adultHP: 12, kidHP:  9, atk:  6, gold: 12, kidGold:  8, tier: 5 },
  { id: 'volcano_drake',  name: 'Vulkandrache',      adultHP: 12, kidHP: 10, atk:  8, gold: 12, kidGold:  9, tier: 5 },

  // Monster Creatures Fantasy — animated
  { id: 'flying_eye',   name: 'Fliegendes Auge', adultHP:  9, kidHP:  6, atk:  3, gold:  8, kidGold:  5, tier: 2 },
  { id: 'wild_goblin',  name: 'Wilder Goblin',   adultHP: 10, kidHP:  7, atk:  4, gold:  9, kidGold:  6, tier: 3 },
  { id: 'spore_beast',  name: 'Sporenbestie',    adultHP:  8, kidHP:  5, atk:  2, gold:  6, kidGold:  4, tier: 1 },
  { id: 'bone_walker',  name: 'Knochenwandler',  adultHP: 11, kidHP:  8, atk:  4, gold: 10, kidGold:  6, tier: 3 },

  // st04 Tier 1 — small creatures
  { id: 'cursed_doll',  name: 'Verfluchte Puppe', adultHP:  7, kidHP:  5, atk:  2, gold:  6, kidGold:  4, tier: 1 },
  { id: 'toy_soldier',  name: 'Spielzeugsoldat',  adultHP:  7, kidHP:  5, atk:  2, gold:  6, kidGold:  4, tier: 1 },
  { id: 'white_snake',  name: 'Weiße Schlange',   adultHP:  8, kidHP:  5, atk:  2, gold:  6, kidGold:  4, tier: 1 },
  { id: 'mad_hand',     name: 'Wahnsinnshand',    adultHP:  7, kidHP:  5, atk:  2, gold:  6, kidGold:  4, tier: 1 },
  { id: 'mandrake',     name: 'Alraune',          adultHP:  8, kidHP:  5, atk:  2, gold:  6, kidGold:  4, tier: 1 },
  { id: 'cait_sith',    name: 'Cait Sith',        adultHP:  8, kidHP:  5, atk:  2, gold:  6, kidGold:  4, tier: 1 },

  // st04 Tier 2
  { id: 'headless_chicken',  name: 'Kopfloses Huhn',    adultHP:  8, kidHP:  5, atk:  2, gold:  6, kidGold:  4, tier: 1 },
  { id: 'dark_crow',         name: 'Dunkle Krähe',      adultHP:  9, kidHP:  6, atk:  3, gold:  8, kidGold:  5, tier: 2 },
  { id: 'bugbear',           name: 'Bugbär',            adultHP:  9, kidHP:  6, atk:  2, gold:  8, kidGold:  5, tier: 2 },
  { id: 'dead_soldier',      name: 'Toter Soldat',      adultHP:  9, kidHP:  6, atk:  3, gold:  8, kidGold:  5, tier: 2 },
  { id: 'nymph',             name: 'Nymphe',            adultHP:  9, kidHP:  6, atk:  2, gold:  8, kidGold:  5, tier: 2 },
  { id: 'arcane_soldieress', name: 'Arkane Soldatin',   adultHP: 10, kidHP:  7, atk:  3, gold:  9, kidGold:  5, tier: 2 },
  { id: 'dullahan',          name: 'Dullahan',          adultHP: 10, kidHP:  7, atk:  3, gold:  9, kidGold:  5, tier: 2 },

  // st04 Tier 3
  { id: 'grave_robber',   name: 'Grabräuber',     adultHP: 10, kidHP:  7, atk:  3, gold:  9, kidGold:  5, tier: 2 },
  { id: 'evil_shaman',    name: 'Böser Schamane', adultHP: 10, kidHP:  7, atk:  4, gold:  9, kidGold:  6, tier: 3 },
  { id: 'gravekeeper',    name: 'Totengräber',    adultHP: 10, kidHP:  7, atk:  3, gold:  9, kidGold:  5, tier: 2 },
  { id: 'corpse_hound',   name: 'Leichenhund',    adultHP: 10, kidHP:  7, atk:  4, gold:  9, kidGold:  6, tier: 3 },
  { id: 'gorgon',         name: 'Gorgone',        adultHP: 11, kidHP:  8, atk:  4, gold: 10, kidGold:  6, tier: 3 },
  { id: 'jack_o_lantern', name: 'Kürbisgeist',    adultHP: 11, kidHP:  8, atk:  4, gold: 10, kidGold:  6, tier: 3 },
  { id: 'fanatic',        name: 'Fanatiker',      adultHP: 10, kidHP:  7, atk:  4, gold:  9, kidGold:  6, tier: 3 },
  { id: 'kelpie',         name: 'Kelpie',         adultHP: 11, kidHP:  8, atk:  4, gold: 10, kidGold:  6, tier: 3 },
  { id: 'cursed_archer',  name: 'Verfluchter Bogenschütze', adultHP: 10, kidHP:  7, atk:  3, gold:  9, kidGold:  5, tier: 2 },

  // st04 Tier 4
  { id: 'arcane_cannon',         name: 'Arkane Kanone',         adultHP: 11, kidHP:  8, atk:  5, gold: 10, kidGold:  7, tier: 4 },
  { id: 'goat_man',              name: 'Ziegenmensch',          adultHP: 11, kidHP:  8, atk:  5, gold: 10, kidGold:  7, tier: 4 },
  { id: 'hollow_soldier',        name: 'Hohler Soldat',         adultHP: 12, kidHP:  9, atk:  5, gold: 11, kidGold:  8, tier: 4 },
  { id: 'incubus',               name: 'Inkubus',               adultHP: 11, kidHP:  8, atk:  5, gold: 10, kidGold:  7, tier: 4 },
  { id: 'scarecrow',             name: 'Vogelscheuche',         adultHP: 11, kidHP:  8, atk:  5, gold: 10, kidGold:  7, tier: 4 },
  { id: 'devil_well',            name: 'Teufelsbrunnen',        adultHP: 12, kidHP:  9, atk:  5, gold: 11, kidGold:  8, tier: 4 },
  { id: 'death_machine',         name: 'Todesmaschine',         adultHP: 12, kidHP:  9, atk:  5, gold: 11, kidGold:  8, tier: 4 },
  { id: 'arcane_core',           name: 'Arkaner Kern',          adultHP: 11, kidHP:  8, atk:  5, gold: 10, kidGold:  7, tier: 4 },
  { id: 'machine_golem',         name: 'Maschinengolem',        adultHP: 12, kidHP:  9, atk:  5, gold: 11, kidGold:  8, tier: 4 },
  { id: 'fallen_kingdom_knight', name: 'Ritter des gefallenen Königreichs', adultHP: 12, kidHP:  9, atk:  6, gold: 11, kidGold:  8, tier: 4 },
  { id: 'calamity_priest',       name: 'Unheilspriester',       adultHP: 12, kidHP:  9, atk:  5, gold: 11, kidGold:  8, tier: 4 },
  { id: 'royal_tomb_guardian',   name: 'Königlicher Grabwächter', adultHP: 12, kidHP:  9, atk:  6, gold: 11, kidGold:  8, tier: 4 },
  { id: 'judgement_soldier',     name: 'Richtspruch-Soldat',    adultHP: 12, kidHP:  9, atk:  5, gold: 11, kidGold:  8, tier: 4 },
  { id: 'gem_thief',             name: 'Edelsteindieb',         adultHP: 11, kidHP:  8, atk:  5, gold: 10, kidGold:  7, tier: 4 },
  { id: 'cursed_king',           name: 'Verfluchter König',     adultHP: 12, kidHP:  9, atk:  6, gold: 11, kidGold:  8, tier: 4 },
  { id: 'evil_pudding',          name: 'Böser Pudding',         adultHP: 11, kidHP:  8, atk:  5, gold: 10, kidGold:  7, tier: 4 },
  { id: 'godblight_parasite',    name: 'Götterfäule-Parasit',   adultHP: 12, kidHP:  9, atk:  5, gold: 11, kidGold:  8, tier: 4 },

  // st04 Tier 5 — bosses
  { id: 'dark_drake',              name: 'Dunkeldrache',             adultHP: 12, kidHP: 10, atk:  7, gold: 12, kidGold:  9, tier: 5 },
  { id: 'scylla',                  name: 'Skylla',                   adultHP: 12, kidHP: 10, atk:  7, gold: 12, kidGold:  9, tier: 5 },
  { id: 'stone_troll',             name: 'Steintroll',               adultHP: 12, kidHP: 10, atk:  7, gold: 12, kidGold:  9, tier: 5 },
  { id: 'fat_beast',               name: 'Fettes Biest',             adultHP: 12, kidHP: 10, atk:  7, gold: 12, kidGold:  9, tier: 5 },
  { id: 'war_ogre',                name: 'Kriegsoger',               adultHP: 12, kidHP: 10, atk:  7, gold: 12, kidGold:  9, tier: 5 },
  { id: 'manticore',               name: 'Mantikor',                 adultHP: 12, kidHP: 10, atk:  8, gold: 12, kidGold:  9, tier: 5 },
  { id: 'stone_colossus',          name: 'Steinkoloss',              adultHP: 12, kidHP: 10, atk:  8, gold: 12, kidGold:  9, tier: 5 },
  { id: 'divine_beast_young',      name: 'Götterbestie',             adultHP: 12, kidHP: 10, atk:  7, gold: 12, kidGold:  9, tier: 5 },
  { id: 'divine_beast_adult',      name: 'Götterbestie (Älter)',     adultHP: 12, kidHP: 10, atk:  8, gold: 12, kidGold:  9, tier: 5 },
  { id: 'cursed_king_second_form', name: 'Verfluchter König (Wahre Form)', adultHP: 12, kidHP: 10, atk:  8, gold: 12, kidGold:  9, tier: 5 },
  { id: 'divine_beast_perfect',    name: 'Götterbestie (Perfekt)',   adultHP: 12, kidHP: 10, atk:  8, gold: 12, kidGold:  9, tier: 5 },
];

export const POWER_UPS = [
  { id: 'gold_rush',       name: 'Goldrausch',       icon: 'gold_rush',       desc: '2x Gold von besiegten Monstern',     effectType: 'timed'   },
  { id: 'forge_reward',    name: 'Belohnung schmieden', icon: 'forge_reward', desc: 'Erstelle eine kostenlose eigene Belohnung', effectType: 'instant' },
  { id: 'shield_aura',     name: 'Schildaura',       icon: 'shield_aura',     desc: 'Immun gegen Monster-Angriffsstrafen', effectType: 'timed'   },
  { id: 'double_damage',   name: 'Doppelschaden',    icon: 'double_damage',   desc: '2x Aufgaben-Schaden an Monstern',    effectType: 'timed'   },
  { id: 'treasure_magnet', name: 'Schatzmagnet',     icon: 'treasure_magnet', desc: '3x Beute- und Glücks-Chance',        effectType: 'timed'   },
];

export const OVERKILL_CHARGE_GOAL = 4;
export const POWER_TOKEN_CAP = 2;
export const POWER_TOKEN_CHOICES = ['gold_rush', 'double_damage', 'treasure_magnet', 'shield_aura'];

export const DEFAULT_POWER_UP_SETTINGS = {
  gold_rush:        { enabled: true, trigger: 'daily_chores',     count: 5,  durationHours: 24 },
  forge_reward:     { enabled: true, trigger: 'weekly_chores',    count: 15, durationHours: 0  },
  shield_aura:      { enabled: true, trigger: 'kill_streak',      count: 3,  durationHours: 24 },
  double_damage:    { enabled: true, trigger: 'weekly_chores',    count: 10, durationHours: 24 },
  treasure_magnet:  { enabled: true, trigger: 'all_dailies_done', count: 1,  durationHours: 24 },
};

export const TRIGGER_TYPES = [
  { id: 'daily_chores',     label: 'Tägliche Aufgaben erledigt' },
  { id: 'weekly_chores',    label: 'Wöchentliche Aufgaben erledigt' },
  { id: 'monthly_chores',   label: 'Monatliche Aufgaben erledigt' },
  { id: 'kill_streak',      label: 'Tägliche Siegesserie' },
  { id: 'all_dailies_done', label: 'Alle Tagesaufgaben erledigt' },
];

export const DURATION_OPTIONS = [12, 24, 48];

export const LOOT_TABLE = [
  { id: 'gold_pouch',   name: 'Goldbeutel',      icon: '👝', gold: 5,  xp: 0 },
  { id: 'silver_coin',  name: 'Silbermünze',     icon: '🪙', gold: 3,  xp: 0 },
  { id: 'treasure_gem', name: 'Schatzedelstein', icon: '💎', gold: 10, xp: 0 },
  { id: 'xp_scroll',    name: 'EP-Schriftrolle', icon: '📜', gold: 0,  xp: 3 },
  { id: 'elixir',       name: 'Elixier',         icon: '🧪', gold: 4,  xp: 1 },
];

export const BADGES = [
  { id: 'first_blood',    name: 'Erstes Blut',     icon: '🩸', desc: 'Besiege dein erstes Monster' },
  { id: 'streak_3',       name: 'Im Lauf',         icon: '🔥', desc: '3-Tage-Siegesserie' },
  { id: 'streak_7',       name: 'Serienmeister',   icon: '⚡', desc: '7-Tage-Siegesserie' },
  { id: 'streak_14',      name: 'Unaufhaltsam',    icon: '👑', desc: '14-Tage-Siegesserie' },
  { id: 'big_spender',    name: 'Großzügig',       icon: '💸', desc: 'Löse 5 Belohnungen ein' },
  { id: 'gold_hoarder',   name: 'Goldhamster',     icon: '💰', desc: 'Halte 100+ Gold auf einmal' },
  { id: 'monster_slayer', name: 'Monsterschlächter', icon: '⚔️', desc: 'Besiege insgesamt 10 Monster' },
  { id: 'lucky_charm',    name: 'Glücksbringer',   icon: '🍀', desc: '3x Glücksfund' },
  { id: 'untouchable',    name: 'Unberührbar',     icon: '🛡️', desc: '7 Tage ohne Strafen' },
  { id: 'prestige_1',     name: 'Prestige',        icon: '🌟', desc: 'Erreiche Level 10 und mache Prestige' },
];

export const TITLES = [
  { badge: 'prestige_1',     title: 'der/die Angesehene' },
  { badge: 'streak_14',      title: 'der/die Unaufhaltsame' },
  { badge: 'monster_slayer', title: 'Monsterschlächter' },
  { badge: 'untouchable',    title: 'Unberührbar' },
  { badge: 'streak_7',       title: 'der/die Unerbittliche' },
  { badge: 'gold_hoarder',   title: 'Goldhamster' },
  { badge: 'lucky_charm',    title: 'Glücksbringer' },
  { badge: 'big_spender',    title: 'der/die Wohlhabende' },
  { badge: 'streak_3',       title: 'Im Lauf' },
  { badge: 'first_blood',    title: 'Monsterjäger' },
];

export const MONSTER_TAUNTS = {
  green_slime:      "Der Schleim gluckert triumphierend.",
  rat:              "Die Ratte nagt sich durch deine Münzen!",
  tiny_spider:      "Winzig, aber rachsüchtig...",
  forest_imp:       "Der Kobold kichert, als das Gold verschwindet!",
  wisp:             "Das Irrlicht raubt dir Willen und Gold.",
  evil_shroom:      "Überall Sporen! Das kostet dich.",
  goblin:           "Der Goblin plündert deinen Schatz!",
  night_imp:        "Die Dunkelheit kostet dich teuer.",
  plaguebearer:     "Die Seuche breitet sich auf deine Geldbörse aus.",
  spectral_hound:   "Sein Heulen friert dein Gold weg.",
  cave_bat:         "Kratzer und gestohlene Münzen!",
  shadow_man:       "Der Schatten nimmt, was er will.",
  wild_buck:        "Niedergetrampelt! Und dein Gold gleich mit.",
  skeleton:         "Klappernde Knochen, klappernde Münzen!",
  chaos_imp:        "Reines Chaos! Gold überall... weg.",
  large_snake:      "Das Gold aus dir herausgepresst.",
  reaper:           "Der Sensenmann fordert seinen Tribut.",
  frost_yetling:    "Vor Angst erstarrt, das Gold gefroren!",
  void_devil:       "Die Leere verschlingt deine Einnahmen.",
  toxic_slime:      "Deine Goldreserven aufgelöst!",
  mimic:            "Es war keine Truhe. Teurer Fehler.",
  cyber_drone:      "ALARM: Goldguthaben wird abgezogen.",
  skeleton_warrior: "Der Tribut eines Kriegers muss gezahlt werden.",
  molten_golem:     "Brennt durch deinen Goldvorrat!",
  mirrorfiend:      "Deine Faulheit zurückgespiegelt.",
  fire_elemental:   "Verbrannte Erde, verbrannte Ersparnisse.",
  phantom_minotaur: "Im Labyrinth verirrt, Gold verloren.",
  rock_golem:       "Dein Sparschwein zerquetscht.",
  cyber_walker:     "KNIRSCH! Der Cyberzahn verschlingt deine Münzen.",
  frost_golem:      "Dein Gold ist jetzt eine Eisskulptur.",
  giant_spider:     "Fest eingesponnen, Gold ausgesaugt!",
  cave_troll:       "WEGZOLL! Der Troll kassiert immer.",
  sandworm:         "Mit Haut und Haar verschlungen... und dein Gold.",
  jrpg_ogre:        "FI FA FO FUM! Das Gold ist weg.",
  happy_blob:       "Der Blob sieht zufrieden aus. Du nicht.",
  volcano_drake:    "Drachensteuer: extrem schmerzhaft.",
  // MCF
  flying_eye:       "Das Auge sieht alles – und nimmt alles.",
  wild_goblin:      "Der Goblin schlägt wild nach deinen Münzen!",
  spore_beast:      "Sporen trüben deinen Blick und deine Geldbörse.",
  bone_walker:      "Das Klappern des Skeletts schüttelt dein Gold los.",
  // st04 Tier 1
  cursed_doll:      "Die Puppe sticht dich mit einer verfluchten Nadel.",
  toy_soldier:      "Klein, aber wild! Der Soldat fordert seinen Tribut.",
  white_snake:      "Die weiße Schlange windet sich um deine Einnahmen.",
  mad_hand:         "Eine körperlose Hand schnappt sich dein Gold!",
  mandrake:         "Der Schrei der Alraune kostet dich teuer.",
  cait_sith:        "Der Katzengeist pfötelt dein Gold weg.",
  // st04 Tier 2
  headless_chicken: "Es rennt herum und verstreut deine Münzen!",
  dark_crow:        "Die Krähe fliegt mit einem Goldstück davon.",
  bugbear:          "Der Bugbär fordert seinen Tribut.",
  dead_soldier:     "Der untote Soldat erhebt eine Grabsteuer.",
  nymph:            "Eine schöne Falle – sie nimmt dein Gold.",
  arcane_soldieress:"Ihre Magie zapft deine Goldreserven an.",
  dullahan:         "Der kopflose Reiter prescht durch deine Ersparnisse!",
  // st04 Tier 3
  grave_robber:     "Der Räuber durchwühlt dein Gold!",
  evil_shaman:      "Dunkle Geister tragen dein Gold davon.",
  gravekeeper:      "Tribut für die Toten: in Gold bezahlt.",
  corpse_hound:     "Der Hund vergräbt dein Gold wie einen Knochen.",
  gorgon:           "Ein Blick und dein Gold wird zu Stein.",
  jack_o_lantern:   "Die Flammen der Laterne versengen deinen Geldbeutel!",
  fanatic:          "Fanatische Wut leert deine Geldbörse!",
  kelpie:           "Das Wasserpferd zieht dein Gold in die Tiefe.",
  cursed_archer:    "Ein verfluchter Pfeil durchbohrt deinen Geldbeutel!",
  // st04 Tier 4
  arcane_cannon:         "BUMM! Die Explosion verstreut dein Gold!",
  goat_man:              "Der Ziegenmensch rammt deine Ersparnisse mit dem Kopf.",
  hollow_soldier:        "Der hohle Soldat füllt sich mit deinem Gold.",
  incubus:               "Der Inkubus stiehlt mehr als deinen Schlaf.",
  scarecrow:             "Es hat auch dein Gold verscheucht!",
  devil_well:            "Der Brunnen verlangt eine sehr große Münze.",
  death_machine:         "FEHLER: Goldguthaben wird abgezogen.",
  arcane_core:           "Der arkane Kern saugt deinen Reichtum auf.",
  machine_golem:         "Zahnräder mahlen durch deine Goldreserven!",
  fallen_kingdom_knight: "Der gefallene Ritter erhebt die Schuld eines Königreichs.",
  calamity_priest:       "Der Priester segnet deine Feinde mit deinem Gold.",
  royal_tomb_guardian:   "Der Tribut des Wächters ist wahrlich hoch.",
  judgement_soldier:     "Schuldig gesprochen: zu Armut verurteilt.",
  gem_thief:             "Den Dieb erwischt – aber trotzdem Gold verloren.",
  cursed_king:           "Eine verfluchte Krone verlangt verfluchte Münzen.",
  evil_pudding:          "Der Pudding quillt durch deinen Geldbeutel!",
  godblight_parasite:    "Der Parasit ernährt sich von deinen Goldreserven.",
  // st04 Tier 5
  dark_drake:              "Das Feuer des Drachen schmilzt deinen Goldvorrat!",
  scylla:                  "In Skyllas Tentakeln gefangen – Gold entgleitet!",
  stone_troll:             "WEGZOLL! Der Steintroll kassiert immer.",
  fat_beast:               "Das Biest setzt sich auf dein Gold. Auf alles.",
  war_ogre:                "ZERSCHMETTERT! Der Oger fordert seinen Kriegstribut.",
  manticore:               "Der Stachel des Mantikors kostet alles!",
  stone_colossus:          "Der Koloss zerquetscht deine Münzkammer!",
  divine_beast_young:      "Selbst jung nimmt die Götterbestie alles.",
  divine_beast_adult:      "Die alte Götterbestie fordert Tribut!",
  cursed_king_second_form: "Die wahre Form des Königs ist noch teurer.",
  divine_beast_perfect:    "PERFEKTE Zerstörung. Dein Gold ist weg.",
};

// ─── Player Classes ───────────────────────────────────────────────────────────
// To add a new class:
//   1. Add an entry here — that's it. Both SetupWizard and PlayerCard read from this list.
//   2. For a tilemap tile: set tile to the numeric index (see tile reference at top of file).
//   3. For a custom sprite: drop a 16×16 PNG at frontend/public/sprites/icons/<id>.png
//      and set tile to the string id (e.g. 'frost_knight').
// ─────────────────────────────────────────────────────────────────────────────
export const CLASSES = [
  { id: 'warrior',      label: 'Krieger',      tile: 87             },
  { id: 'mage',         label: 'Magier',       tile: 84             },
  { id: 'witch',        label: 'Hexe',         tile: 99             },
  { id: 'rogue',        label: 'Schurke',      tile: 88             },
  { id: 'paladin',      label: 'Paladin',      tile: 96             },
  { id: 'ranger',       label: 'Waldläufer',   tile: 'ranger'       },
  { id: 'frost_knight', label: 'Frostritter',  tile: 'frost_knight' },
];
