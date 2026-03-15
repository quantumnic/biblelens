// Extended Strong's v15 — Music/Worship, Law/Torah, Family/Community, Nature/Agriculture, Prophecy/Dreams
export const EXTENDED_STRONGS_V15 = [
  // Hebrew — Music & Worship
  { id: 'H2167', original: 'זָמַר', transliteration: 'zamar', definition: 'To sing praises, make music — to celebrate with instruments and voice in worship', language: 'hebrew' as const },
  { id: 'H7891', original: 'שִׁיר', transliteration: 'shir', definition: 'To sing — singing a new song unto the LORD, poetic praise', language: 'hebrew' as const },
  { id: 'H8416', original: 'תְּהִלָּה', transliteration: 'tehillah', definition: 'Praise, song of praise — the root of Tehillim (Psalms), laudatory hymn', language: 'hebrew' as const },
  { id: 'H3658', original: 'כִּנּוֹר', transliteration: 'kinnor', definition: 'Harp, lyre — David\'s instrument, used in temple worship', language: 'hebrew' as const },
  { id: 'H7782', original: 'שׁוֹפָר', transliteration: 'shophar', definition: 'Ram\'s horn, trumpet — sounded for assembly, battle, and sacred occasions', language: 'hebrew' as const },
  { id: 'H1984', original: 'הָלַל', transliteration: 'halal', definition: 'To praise, boast, shine — root of Hallelujah, to radiate praise', language: 'hebrew' as const },
  // Hebrew — Law & Torah
  { id: 'H8451', original: 'תּוֹרָה', transliteration: 'torah', definition: 'Law, instruction, teaching — divine instruction, the five books of Moses', language: 'hebrew' as const },
  { id: 'H4687', original: 'מִצְוָה', transliteration: 'mitsvah', definition: 'Commandment, precept — a divine command, an obligation to God', language: 'hebrew' as const },
  { id: 'H2706', original: 'חֹק', transliteration: 'choq', definition: 'Statute, decree, ordinance — an engraved, permanent regulation', language: 'hebrew' as const },
  { id: 'H4941', original: 'מִשְׁפָּט', transliteration: 'mishpat', definition: 'Justice, judgment, ordinance — a legal decision, righteous ruling', language: 'hebrew' as const },
  { id: 'H5715', original: 'עֵדוּת', transliteration: 'eduth', definition: 'Testimony, witness — the covenant testimony, the tablets of the law', language: 'hebrew' as const },
  // Hebrew — Family & Community
  { id: 'H1004', original: 'בַּיִת', transliteration: 'bayith', definition: 'House, household, family — dwelling place, dynasty, temple of God', language: 'hebrew' as const },
  { id: 'H4940', original: 'מִשְׁפָּחָה', transliteration: 'mishpachah', definition: 'Family, clan, kind — extended family unit, tribal division', language: 'hebrew' as const },
  { id: 'H1121', original: 'בֵּן', transliteration: 'ben', definition: 'Son, child, descendant — used of physical and spiritual offspring', language: 'hebrew' as const },
  { id: 'H517', original: 'אֵם', transliteration: 'em', definition: 'Mother — matriarch, a bond-point of family and nation', language: 'hebrew' as const },
  { id: 'H251', original: 'אָח', transliteration: 'ach', definition: 'Brother, kinsman — sibling and fellow countryman, covenantal bond', language: 'hebrew' as const },
  // Hebrew — Nature & Agriculture
  { id: 'H2233', original: 'זֶרַע', transliteration: 'zera', definition: 'Seed, offspring, sowing — both agricultural seed and human descendants', language: 'hebrew' as const },
  { id: 'H7105', original: 'קָצִיר', transliteration: 'qatsir', definition: 'Harvest, crop — the reaping of grain, used metaphorically for judgment', language: 'hebrew' as const },
  { id: 'H1612', original: 'גֶּפֶן', transliteration: 'gephen', definition: 'Vine, grapevine — Israel as God\'s vine, symbol of fruitfulness', language: 'hebrew' as const },
  { id: 'H8384', original: 'תְּאֵנָה', transliteration: 'teenah', definition: 'Fig tree — symbol of peace and prosperity, prophetic marker', language: 'hebrew' as const },
  { id: 'H4325', original: 'מַיִם', transliteration: 'mayim', definition: 'Water, waters — life-giving waters, chaos waters, living water', language: 'hebrew' as const },
  // Hebrew — Dreams & Prophecy
  { id: 'H2472', original: 'חֲלוֹם', transliteration: 'chalom', definition: 'Dream — divine communication through dreams, prophetic visions', language: 'hebrew' as const },
  { id: 'H5030', original: 'נָבִיא', transliteration: 'nabi', definition: 'Prophet — one called to speak for God, a mouthpiece of divine will', language: 'hebrew' as const },
  { id: 'H4853', original: 'מַשָּׂא', transliteration: 'massa', definition: 'Burden, oracle — a weighty prophetic utterance, divine pronouncement', language: 'hebrew' as const },
  // Greek — Music & Worship
  { id: 'G5568', original: 'ψαλμός', transliteration: 'psalmos', definition: 'Psalm, song of praise — a sacred song sung to instrumental accompaniment', language: 'greek' as const },
  { id: 'G5214', original: 'ὑμνέω', transliteration: 'hymneō', definition: 'To sing a hymn, praise — singing worship to God', language: 'greek' as const },
  { id: 'G4352', original: 'προσκυνέω', transliteration: 'proskyneō', definition: 'To worship, bow down — prostration before God in reverence', language: 'greek' as const },
  { id: 'G2999', original: 'λατρεία', transliteration: 'latreia', definition: 'Service, worship — cultic service, spiritual worship as living sacrifice', language: 'greek' as const },
  // Greek — Law & Righteousness
  { id: 'G3551', original: 'νόμος', transliteration: 'nomos', definition: 'Law — the Mosaic law, principle, or rule governing conduct', language: 'greek' as const },
  { id: 'G1785', original: 'ἐντολή', transliteration: 'entolē', definition: 'Commandment, order — a divine injunction, the new commandment of love', language: 'greek' as const },
  { id: 'G1343', original: 'δικαιοσύνη', transliteration: 'dikaiosynē', definition: 'Righteousness, justice — God\'s righteous standard, imputed righteousness through faith', language: 'greek' as const },
  // Greek — Family & Community
  { id: 'G1577', original: 'ἐκκλησία', transliteration: 'ekklēsia', definition: 'Church, assembly, congregation — the called-out ones, the body of Christ', language: 'greek' as const },
  { id: 'G80', original: 'ἀδελφός', transliteration: 'adelphos', definition: 'Brother, fellow believer — sibling or spiritual brother in Christ', language: 'greek' as const },
  { id: 'G2842', original: 'κοινωνία', transliteration: 'koinōnia', definition: 'Fellowship, communion, sharing — intimate participation in community', language: 'greek' as const },
  { id: 'G3624', original: 'οἶκος', transliteration: 'oikos', definition: 'House, household, family — dwelling, the house of God, domestic community', language: 'greek' as const },
  // Greek — Nature & Agriculture
  { id: 'G4690', original: 'σπέρμα', transliteration: 'sperma', definition: 'Seed, offspring, posterity — agricultural and genealogical seed, the seed of Abraham', language: 'greek' as const },
  { id: 'G2326', original: 'θερισμός', transliteration: 'therismos', definition: 'Harvest — the reaping of souls, the end-times harvest', language: 'greek' as const },
  { id: 'G288', original: 'ἄμπελος', transliteration: 'ampelos', definition: 'Vine — Jesus as the true vine (John 15), symbol of spiritual life', language: 'greek' as const },
  { id: 'G5204', original: 'ὕδωρ', transliteration: 'hydōr', definition: 'Water — baptismal water, living water, water of life', language: 'greek' as const },
  // Greek — Prophecy & Revelation
  { id: 'G4396', original: 'προφήτης', transliteration: 'prophētēs', definition: 'Prophet — one who speaks forth God\'s message, a foreteller', language: 'greek' as const },
  { id: 'G602', original: 'ἀποκάλυψις', transliteration: 'apokalypsis', definition: 'Revelation, unveiling, disclosure — the uncovering of divine truth', language: 'greek' as const },
  { id: 'G3705', original: 'ὅραμα', transliteration: 'horama', definition: 'Vision, sight — a divinely granted vision, supernatural sight', language: 'greek' as const },
];

export const EXTENDED_WORD_STRONGS_V15 = [
  // Music & Worship — Hebrew
  { book: 19, chapter: 147, verse: 1, word: 'sing praises', strongs_id: 'H2167' },
  { book: 19, chapter: 96, verse: 1, word: 'sing', strongs_id: 'H7891' },
  { book: 19, chapter: 22, verse: 3, word: 'praises', strongs_id: 'H8416' },
  { book: 19, chapter: 33, verse: 2, word: 'harp', strongs_id: 'H3658' },
  { book: 19, chapter: 150, verse: 3, word: 'trumpet', strongs_id: 'H7782' },
  { book: 19, chapter: 150, verse: 1, word: 'Praise', strongs_id: 'H1984' },
  // Law & Torah — Hebrew
  { book: 19, chapter: 119, verse: 1, word: 'law', strongs_id: 'H8451' },
  { book: 5, chapter: 6, verse: 1, word: 'commandments', strongs_id: 'H4687' },
  { book: 19, chapter: 119, verse: 5, word: 'statutes', strongs_id: 'H2706' },
  { book: 19, chapter: 119, verse: 7, word: 'judgments', strongs_id: 'H4941' },
  { book: 19, chapter: 119, verse: 14, word: 'testimonies', strongs_id: 'H5715' },
  // Family — Hebrew
  { book: 1, chapter: 7, verse: 1, word: 'house', strongs_id: 'H1004' },
  { book: 1, chapter: 10, verse: 5, word: 'families', strongs_id: 'H4940' },
  { book: 1, chapter: 4, verse: 25, word: 'son', strongs_id: 'H1121' },
  { book: 1, chapter: 3, verse: 20, word: 'mother', strongs_id: 'H517' },
  { book: 1, chapter: 4, verse: 2, word: 'brother', strongs_id: 'H251' },
  // Nature — Hebrew
  { book: 1, chapter: 1, verse: 11, word: 'seed', strongs_id: 'H2233' },
  { book: 1, chapter: 8, verse: 22, word: 'harvest', strongs_id: 'H7105' },
  { book: 1, chapter: 40, verse: 9, word: 'vine', strongs_id: 'H1612' },
  { book: 1, chapter: 3, verse: 7, word: 'fig', strongs_id: 'H8384' },
  { book: 1, chapter: 1, verse: 2, word: 'waters', strongs_id: 'H4325' },
  // Dreams — Hebrew
  { book: 1, chapter: 37, verse: 5, word: 'dream', strongs_id: 'H2472' },
  { book: 5, chapter: 18, verse: 15, word: 'Prophet', strongs_id: 'H5030' },
  { book: 23, chapter: 13, verse: 1, word: 'burden', strongs_id: 'H4853' },
  // Music & Worship — Greek
  { book: 49, chapter: 5, verse: 19, word: 'psalms', strongs_id: 'G5568' },
  { book: 40, chapter: 26, verse: 30, word: 'sung an hymn', strongs_id: 'G5214' },
  { book: 43, chapter: 4, verse: 24, word: 'worship', strongs_id: 'G4352' },
  { book: 45, chapter: 12, verse: 1, word: 'service', strongs_id: 'G2999' },
  // Law — Greek
  { book: 45, chapter: 3, verse: 31, word: 'law', strongs_id: 'G3551' },
  { book: 43, chapter: 13, verse: 34, word: 'commandment', strongs_id: 'G1785' },
  { book: 45, chapter: 3, verse: 22, word: 'righteousness', strongs_id: 'G1343' },
  // Family — Greek
  { book: 40, chapter: 16, verse: 18, word: 'church', strongs_id: 'G1577' },
  { book: 40, chapter: 12, verse: 50, word: 'brother', strongs_id: 'G80' },
  { book: 44, chapter: 2, verse: 42, word: 'fellowship', strongs_id: 'G2842' },
  { book: 40, chapter: 12, verse: 4, word: 'house', strongs_id: 'G3624' },
  // Nature — Greek
  { book: 40, chapter: 13, verse: 24, word: 'seed', strongs_id: 'G4690' },
  { book: 40, chapter: 9, verse: 37, word: 'harvest', strongs_id: 'G2326' },
  { book: 43, chapter: 15, verse: 1, word: 'vine', strongs_id: 'G288' },
  { book: 43, chapter: 4, verse: 14, word: 'water', strongs_id: 'G5204' },
  // Prophecy — Greek
  { book: 40, chapter: 1, verse: 22, word: 'prophet', strongs_id: 'G4396' },
  { book: 66, chapter: 1, verse: 1, word: 'Revelation', strongs_id: 'G602' },
  { book: 44, chapter: 10, verse: 3, word: 'vision', strongs_id: 'G3705' },
];
