// Extended Strong's v4 — Aramaic terms, covenant vocabulary, wisdom literature, eschatological terms
export const EXTENDED_STRONGS_V4 = [
  // Aramaic — key Daniel/Ezra terms
  { id: 'H4437', original: 'מַלְכוּ', transliteration: 'malku', definition: 'Kingdom, dominion, reign (Aramaic) — used in Daniel\'s apocalyptic visions', language: 'hebrew' },
  { id: 'H7236', original: 'רְבָה', transliteration: 'rebah', definition: 'To grow great, become great (Aramaic) — Nebuchadnezzar\'s greatness', language: 'hebrew' },
  { id: 'H6050', original: 'עֲנָן', transliteration: 'anan', definition: 'Cloud (Aramaic) — "one like a son of man coming with clouds"', language: 'hebrew' },
  { id: 'H7972', original: 'שְׁלַח', transliteration: 'shelach', definition: 'To send (Aramaic) — divine commission and authority', language: 'hebrew' },
  // Hebrew — covenant and Torah vocabulary
  { id: 'H8451', original: 'תּוֹרָה', transliteration: 'torah', definition: 'Law, instruction, teaching — God\'s revealed will and guidance', language: 'hebrew' },
  { id: 'H5715', original: 'עֵדוּת', transliteration: 'edut', definition: 'Testimony, witness, ordinance — the tablets of the covenant', language: 'hebrew' },
  { id: 'H2706', original: 'חֹק', transliteration: 'choq', definition: 'Statute, decree, ordinance — an engraved/inscribed law', language: 'hebrew' },
  { id: 'H4941', original: 'מִשְׁפָּט', transliteration: 'mishpat', definition: 'Judgment, justice, ordinance — God\'s just decisions', language: 'hebrew' },
  { id: 'H6680', original: 'צָוָה', transliteration: 'tsavah', definition: 'To command, charge, commission — divine directive', language: 'hebrew' },
  // Hebrew — creation and nature
  { id: 'H8415', original: 'תְּהוֹם', transliteration: 'tehom', definition: 'Deep, abyss, primordial waters — the great deep of creation', language: 'hebrew' },
  { id: 'H7549', original: 'רָקִיעַ', transliteration: 'raqia', definition: 'Firmament, expanse — the vault of heaven', language: 'hebrew' },
  { id: 'H3556', original: 'כּוֹכָב', transliteration: 'kokab', definition: 'Star — celestial body, also used figuratively for rulers', language: 'hebrew' },
  // Hebrew — wisdom literature
  { id: 'H998', original: 'בִּינָה', transliteration: 'binah', definition: 'Understanding, discernment, insight — the ability to distinguish', language: 'hebrew' },
  { id: 'H4148', original: 'מוּסָר', transliteration: 'musar', definition: 'Discipline, instruction, correction — formative chastening', language: 'hebrew' },
  { id: 'H8394', original: 'תָּבוּן', transliteration: 'tabun', definition: 'Understanding, intelligence, skillfulness — applied wisdom', language: 'hebrew' },
  // Greek — Johannine theology
  { id: 'G3875', original: 'παράκλητος', transliteration: 'paraklētos', definition: 'Helper, Advocate, Comforter — the Holy Spirit (John 14-16)', language: 'greek' },
  { id: 'G3474b', original: 'μονογενής', transliteration: 'monogenēs', definition: 'Only begotten, unique, one of a kind — Christ\'s unique sonship', language: 'greek' },
  { id: 'G2889', original: 'κόσμος', transliteration: 'kosmos', definition: 'World, universe, world-system — the created order or fallen world', language: 'greek' },
  { id: 'G5457', original: 'φῶς', transliteration: 'phōs', definition: 'Light — both physical and spiritual illumination', language: 'greek' },
  { id: 'G4655', original: 'σκότος', transliteration: 'skotos', definition: 'Darkness — spiritual blindness, realm of evil', language: 'greek' },
  // Greek — Pauline soteriology
  { id: 'G1344', original: 'δικαιόω', transliteration: 'dikaioō', definition: 'To justify, declare righteous, vindicate — legal acquittal', language: 'greek' },
  { id: 'G3049', original: 'λογίζομαι', transliteration: 'logizomai', definition: 'To reckon, count, impute — crediting righteousness (Rom 4)', language: 'greek' },
  { id: 'G5485b', original: 'χαρίζομαι', transliteration: 'charizomai', definition: 'To freely give, forgive, bestow grace — gracious gift-giving', language: 'greek' },
  { id: 'G525', original: 'ἀπαλλάσσω', transliteration: 'apallassō', definition: 'To release, set free, deliver — liberation from bondage', language: 'greek' },
  // Greek — eschatology
  { id: 'G3952', original: 'παρουσία', transliteration: 'parousia', definition: 'Coming, arrival, presence — Christ\'s second coming', language: 'greek' },
  { id: 'G386b', original: 'ἀνάστασις', transliteration: 'anastasis', definition: 'Resurrection, rising — standing up from the dead', language: 'greek' },
  { id: 'G2250', original: 'ἡμέρα', transliteration: 'hēmera', definition: 'Day — often "the Day of the Lord" in eschatological contexts', language: 'greek' },
  { id: 'G3563b', original: 'νοῦς', transliteration: 'nous', definition: 'Mind, understanding, intellect — the renewed mind (Rom 12:2)', language: 'greek' },
  // Greek — ecclesiology
  { id: 'G1985', original: 'ἐπίσκοπος', transliteration: 'episkopos', definition: 'Overseer, bishop, guardian — church leadership role', language: 'greek' },
  { id: 'G1249', original: 'διάκονος', transliteration: 'diakonos', definition: 'Servant, minister, deacon — one who serves', language: 'greek' },
  { id: 'G4245', original: 'πρεσβύτερος', transliteration: 'presbyteros', definition: 'Elder — senior leader in the church community', language: 'greek' },
  { id: 'G5486', original: 'χάρισμα', transliteration: 'charisma', definition: 'Gift of grace, spiritual gift — divine endowment for ministry', language: 'greek' },
];

// Word-to-verse mappings for the new entries
export const EXTENDED_WORD_MAPPINGS_V4: [number, number, number, string, string, number][] = [
  // Genesis 1:2 (creation vocabulary)
  [1,1,2,'deep','H8415',4],
  [1,1,2,'Spirit','H7307',8],
  // Genesis 1:6 (firmament)
  [1,1,6,'firmament','H7549',4],
  // Genesis 15:6 (Abrahamic faith — credited)
  [1,15,6,'counted','H2803',5],
  [1,15,6,'righteousness','H6666',8],
  // Genesis 37:9 (Joseph's dream)
  [1,37,9,'stars','H3556',5],
  // Deuteronomy 4:1 (statutes)
  [5,4,1,'statutes','H2706',5],
  [5,4,1,'judgments','H4941',7],
  // Deuteronomy 6:1 (commandments)
  [5,6,1,'commandments','H4687',3],
  [5,6,1,'statutes','H2706',5],
  [5,6,1,'judgments','H4941',7],
  // Joshua 1:8 (Torah meditation)
  [6,1,8,'law','H8451',4],
  // Psalm 1:2 (Torah delight)
  [19,1,2,'law','H8451',4],
  [19,1,2,'LORD','H3068',6],
  // Psalm 19:7-8 (Torah psalm)
  [19,19,7,'law','H8451',2],
  [19,19,7,'LORD','H3068',4],
  [19,19,7,'testimony','H5715',7],
  [19,19,8,'statutes','H6490',2],
  [19,19,8,'commandment','H4687',6],
  // Psalm 111:10 (wisdom)
  [19,111,10,'fear','H3374',2],
  [19,111,10,'LORD','H3068',4],
  [19,111,10,'understanding','H7922',8],
  // Psalm 119:105
  [19,119,105,'word','H1697',3],
  [19,119,105,'light','H216',7],
  // Proverbs 2:6
  [20,2,6,'LORD','H3068',2],
  [20,2,6,'wisdom','H2451',4],
  [20,2,6,'understanding','H998',8],
  // Proverbs 3:13
  [20,3,13,'wisdom','H2451',4],
  [20,3,13,'understanding','H8394',8],
  // Proverbs 4:13 (discipline)
  [20,4,13,'instruction','H4148',3],
  // Daniel 2:44 (kingdom)
  [27,2,44,'kingdom','H4437',5],
  [27,2,44,'God','H426',3],
  // Daniel 4:3 (greatness)
  [27,4,3,'kingdom','H4437',3],
  // Daniel 7:13 (clouds)
  [27,7,13,'clouds','H6050',5],
  // Daniel 7:14 (dominion)
  [27,7,14,'dominion','H7985',3],
  [27,7,14,'kingdom','H4437',8],
  // John 1:1-5 (prologue)
  [43,1,1,'Word','G3056',3],
  [43,1,1,'God','G2316',6],
  [43,1,3,'made','G1096',5],
  [43,1,4,'life','G2222',3],
  [43,1,4,'light','G5457',6],
  [43,1,5,'light','G5457',2],
  [43,1,5,'darkness','G4655',5],
  // John 1:14 (incarnation)
  [43,1,14,'Word','G3056',2],
  [43,1,14,'glory','G1391',8],
  // John 1:18 (monogenes)
  [43,1,18,'begotten','G3474b',3],
  [43,1,18,'Son','G5207',4],
  [43,1,18,'God','G2316',6],
  // John 3:16 (kosmos)
  [43,3,16,'God','G2316',2],
  [43,3,16,'world','G2889',5],
  [43,3,16,'begotten','G3474b',8],
  [43,3,16,'Son','G5207',9],
  [43,3,16,'life','G2222',16],
  // John 14:16 (Paraclete)
  [43,14,16,'Comforter','G3875',6],
  // John 14:26 (Paraclete)
  [43,14,26,'Comforter','G3875',3],
  [43,14,26,'Spirit','G4151',5],
  // John 15:26 (Paraclete)
  [43,15,26,'Comforter','G3875',3],
  [43,15,26,'Spirit','G4151',6],
  // John 16:7 (Paraclete)
  [43,16,7,'Comforter','G3875',8],
  // Romans 3:24 (justification)
  [45,3,24,'justified','G1344',3],
  [45,3,24,'grace','G5485',5],
  // Romans 4:3 (imputation)
  [45,4,3,'counted','G3049',6],
  [45,4,3,'righteousness','G1343',9],
  // Romans 4:5 (justification of ungodly)
  [45,4,5,'justified','G1344',3],
  [45,4,5,'faith','G4102',5],
  [45,4,5,'righteousness','G1343',10],
  // Romans 12:2 (mind renewal)
  [45,12,2,'world','G165',5],
  [45,12,2,'mind','G3563b',10],
  // 1 Corinthians 12:4-5 (spiritual gifts)
  [46,12,4,'gifts','G5486',4],
  [46,12,4,'Spirit','G4151',7],
  [46,12,5,'Lord','G2962',6],
  // 1 Corinthians 12:28 (church offices)
  [46,12,28,'God','G2316',2],
  // 1 Thessalonians 4:15 (parousia)
  [52,4,15,'coming','G3952',7],
  [52,4,15,'Lord','G2962',9],
  // 1 Thessalonians 4:16 (resurrection)
  [52,4,16,'Lord','G2962',3],
  [52,4,16,'dead','G3498',10],
  [52,4,16,'Christ','G5547',12],
  // 1 Timothy 3:1 (overseer)
  [54,3,1,'bishop','G1985',6],
  // 1 Timothy 3:8 (deacons)
  [54,3,8,'deacons','G1249',3],
  // 1 Timothy 3:13 (deacons)
  [54,3,13,'deacon','G1249',4],
  // Titus 1:5 (elders)
  [56,1,5,'elders','G4245',5],
  // 1 Peter 5:2 (overseers)
  [60,5,2,'oversight','G1985',6],
  // 2 Peter 3:10 (day of the Lord)
  [61,3,10,'day','G2250',2],
  [61,3,10,'Lord','G2962',5],
  // Revelation 1:7 (coming with clouds)
  [66,1,7,'clouds','G3507',4],
  // Revelation 19:11 (parousia imagery)
  [66,19,11,'heaven','G3772',3],
  [66,19,11,'righteousness','G1343',10],
  // Revelation 22:12 (parousia)
  [66,22,12,'coming','G2064',4],
];
