// Extended Strong's v11 — Prayer/Worship, Kingship/Authority, Wisdom/Instruction, Judgment/Justice, Healing/Miracles
export const EXTENDED_STRONGS_V11 = [
  // Hebrew — Prayer / Worship
  { id: 'H8605', original: 'תְּפִלָּה', transliteration: 'tephillah', definition: 'Prayer, intercession — a formal or personal appeal to God', language: 'hebrew' as const },
  { id: 'H7812', original: 'שָׁחָה', transliteration: 'shachah', definition: 'To bow down, worship, prostrate oneself — an act of reverence or homage', language: 'hebrew' as const },
  { id: 'H1984', original: 'הָלַל', transliteration: 'halal', definition: 'To praise, celebrate, glorify — root of Hallelujah, to shine forth praise', language: 'hebrew' as const },
  { id: 'H2167', original: 'זָמַר', transliteration: 'zamar', definition: 'To sing praise, make music — to celebrate with instruments and song', language: 'hebrew' as const },
  { id: 'H7440', original: 'רִנָּה', transliteration: 'rinnah', definition: 'Joyful cry, shout of joy, singing — exuberant vocal praise', language: 'hebrew' as const },
  // Hebrew — Kingship / Authority
  { id: 'H4428', original: 'מֶלֶךְ', transliteration: 'melek', definition: 'King, ruler, sovereign — one who reigns with authority', language: 'hebrew' as const },
  { id: 'H4467', original: 'מַמְלָכָה', transliteration: 'mamlakah', definition: 'Kingdom, reign, dominion — the realm or rule of a king', language: 'hebrew' as const },
  { id: 'H4910', original: 'מָשַׁל', transliteration: 'mashal', definition: 'To rule, have dominion, govern — to exercise authority over', language: 'hebrew' as const },
  { id: 'H7626', original: 'שֵׁבֶט', transliteration: 'shebet', definition: 'Rod, scepter, tribe — symbol of authority and tribal identity', language: 'hebrew' as const },
  { id: 'H3678', original: 'כִּסֵּא', transliteration: 'kisse', definition: 'Throne, seat of honor — the chair of royal or divine authority', language: 'hebrew' as const },
  // Hebrew — Wisdom / Instruction
  { id: 'H998', original: 'בִּינָה', transliteration: 'binah', definition: 'Understanding, discernment, insight — the ability to distinguish and comprehend', language: 'hebrew' as const },
  { id: 'H8394', original: 'תָּבוּן', transliteration: 'tabun', definition: 'Intelligence, understanding, discretion — applied wisdom and judgment', language: 'hebrew' as const },
  { id: 'H4148', original: 'מוּסָר', transliteration: 'musar', definition: 'Discipline, instruction, correction — moral training and chastening', language: 'hebrew' as const },
  { id: 'H6098', original: 'עֵצָה', transliteration: 'etsah', definition: 'Counsel, advice, purpose — guidance from wisdom or deliberation', language: 'hebrew' as const },
  { id: 'H1847', original: 'דַּעַת', transliteration: 'daath', definition: 'Knowledge, perception, skill — experiential knowing of God and truth', language: 'hebrew' as const },
  // Hebrew — Judgment / Justice
  { id: 'H6664', original: 'צֶדֶק', transliteration: 'tsedeq', definition: 'Righteousness, justice, rightness — conformity to an ethical standard', language: 'hebrew' as const },
  { id: 'H8199', original: 'שָׁפַט', transliteration: 'shaphat', definition: 'To judge, govern, vindicate — to act as arbiter and deliver justice', language: 'hebrew' as const },
  { id: 'H4941', original: 'מִשְׁפָּט', transliteration: 'mishpat', definition: 'Judgment, justice, ordinance — a legal decision or the process of adjudication', language: 'hebrew' as const },
  // Greek — Prayer / Worship
  { id: 'G4335', original: 'προσευχή', transliteration: 'proseuche', definition: 'Prayer — earnest communication addressed to God', language: 'greek' as const },
  { id: 'G4352', original: 'προσκυνέω', transliteration: 'proskuneo', definition: 'To worship, bow down, do obeisance — to express reverence', language: 'greek' as const },
  { id: 'G1189', original: 'δέομαι', transliteration: 'deomai', definition: 'To beseech, pray, beg — to make an urgent personal request', language: 'greek' as const },
  { id: 'G5215', original: 'ὕμνος', transliteration: 'humnos', definition: 'Hymn, song of praise — a sacred song directed to God', language: 'greek' as const },
  // Greek — Kingship / Authority
  { id: 'G935', original: 'βασιλεύς', transliteration: 'basileus', definition: 'King — a sovereign ruler, applied to Christ and earthly monarchs', language: 'greek' as const },
  { id: 'G1849', original: 'ἐξουσία', transliteration: 'exousia', definition: 'Authority, power, right — delegated or inherent power to act', language: 'greek' as const },
  { id: 'G2362', original: 'θρόνος', transliteration: 'thronos', definition: 'Throne — the seat of authority, divine or royal', language: 'greek' as const },
  { id: 'G1203', original: 'δεσπότης', transliteration: 'despotes', definition: 'Master, Lord, sovereign — one with absolute ownership and authority', language: 'greek' as const },
  // Greek — Wisdom / Instruction
  { id: 'G4678', original: 'σοφία', transliteration: 'sophia', definition: 'Wisdom — broad and full intelligence, divine or human insight', language: 'greek' as const },
  { id: 'G1108', original: 'γνῶσις', transliteration: 'gnosis', definition: 'Knowledge — a seeking to know, inquiry, investigation', language: 'greek' as const },
  { id: 'G5428', original: 'φρόνησις', transliteration: 'phronesis', definition: 'Prudence, practical wisdom — understanding leading to right action', language: 'greek' as const },
  { id: 'G3809', original: 'παιδεία', transliteration: 'paideia', definition: 'Training, discipline, instruction — the rearing and education of a child', language: 'greek' as const },
  // Greek — Judgment / Justice
  { id: 'G2920', original: 'κρίσις', transliteration: 'krisis', definition: 'Judgment, decision, condemnation — a separating, a trial, divine verdict', language: 'greek' as const },
  { id: 'G1343', original: 'δικαιοσύνη', transliteration: 'dikaiosune', definition: 'Righteousness, justice — the quality of being right and just before God', language: 'greek' as const },
  { id: 'G2917', original: 'κρίμα', transliteration: 'krima', definition: 'Judgment, verdict, sentence — the result of divine or human adjudication', language: 'greek' as const },
  // Greek — Healing / Miracles
  { id: 'G2323', original: 'θεραπεύω', transliteration: 'therapeuo', definition: 'To heal, cure, serve — to restore health, to attend to medically', language: 'greek' as const },
  { id: 'G4592', original: 'σημεῖον', transliteration: 'semeion', definition: 'Sign, miracle, wonder — a distinguishing mark or supernatural token', language: 'greek' as const },
  { id: 'G1411', original: 'δύναμις', transliteration: 'dunamis', definition: 'Power, miracle, mighty work — inherent ability, miraculous force', language: 'greek' as const },
  { id: 'G5059', original: 'τέρας', transliteration: 'teras', definition: 'Wonder, portent, marvel — an extraordinary phenomenon inspiring awe', language: 'greek' as const },
];

export const EXTENDED_WORD_STRONGS_V11 = [
  // Prayer — Psalm 17:1
  { book: 19, chapter: 17, verse: 1, word: 'prayer', strongs_id: 'H8605' },
  // Worship — Psalm 95:6
  { book: 19, chapter: 95, verse: 6, word: 'worship', strongs_id: 'H7812' },
  // Praise — Psalm 150:1
  { book: 19, chapter: 150, verse: 1, word: 'Praise', strongs_id: 'H1984' },
  // Sing praises — Psalm 47:6
  { book: 19, chapter: 47, verse: 6, word: 'praises', strongs_id: 'H2167' },
  // Joy — Psalm 30:5
  { book: 19, chapter: 30, verse: 5, word: 'joy', strongs_id: 'H7440' },
  // King — Psalm 47:7
  { book: 19, chapter: 47, verse: 7, word: 'King', strongs_id: 'H4428' },
  // Kingdom — 1 Chronicles 29:11
  { book: 13, chapter: 29, verse: 11, word: 'kingdom', strongs_id: 'H4467' },
  // Rule — Genesis 1:16
  { book: 1, chapter: 1, verse: 16, word: 'rule', strongs_id: 'H4910' },
  // Sceptre — Genesis 49:10
  { book: 1, chapter: 49, verse: 10, word: 'sceptre', strongs_id: 'H7626' },
  // Throne — Psalm 45:6
  { book: 19, chapter: 45, verse: 6, word: 'throne', strongs_id: 'H3678' },
  // Understanding — Proverbs 4:7
  { book: 20, chapter: 4, verse: 7, word: 'understanding', strongs_id: 'H998' },
  // Discretion — Proverbs 2:11
  { book: 20, chapter: 2, verse: 11, word: 'discretion', strongs_id: 'H8394' },
  // Instruction — Proverbs 1:2
  { book: 20, chapter: 1, verse: 2, word: 'instruction', strongs_id: 'H4148' },
  // Counsel — Isaiah 9:6
  { book: 23, chapter: 9, verse: 6, word: 'Counsellor', strongs_id: 'H6098' },
  // Knowledge — Proverbs 1:7
  { book: 20, chapter: 1, verse: 7, word: 'knowledge', strongs_id: 'H1847' },
  // Righteousness — Psalm 89:14
  { book: 19, chapter: 89, verse: 14, word: 'righteousness', strongs_id: 'H6664' },
  // Judge — Psalm 96:13
  { book: 19, chapter: 96, verse: 13, word: 'judge', strongs_id: 'H8199' },
  // Judgment — Deuteronomy 32:4
  { book: 5, chapter: 32, verse: 4, word: 'judgment', strongs_id: 'H4941' },
  // Prayer — Matthew 21:13
  { book: 40, chapter: 21, verse: 13, word: 'prayer', strongs_id: 'G4335' },
  // Worship — John 4:24
  { book: 43, chapter: 4, verse: 24, word: 'worship', strongs_id: 'G4352' },
  // Pray — Luke 22:32
  { book: 42, chapter: 22, verse: 32, word: 'prayed', strongs_id: 'G1189' },
  // Hymn — Colossians 3:16
  { book: 51, chapter: 3, verse: 16, word: 'hymns', strongs_id: 'G5215' },
  // King — Matthew 2:2
  { book: 40, chapter: 2, verse: 2, word: 'King', strongs_id: 'G935' },
  // Authority — Matthew 28:18
  { book: 40, chapter: 28, verse: 18, word: 'power', strongs_id: 'G1849' },
  // Throne — Revelation 4:2
  { book: 66, chapter: 4, verse: 2, word: 'throne', strongs_id: 'G2362' },
  // Master — 2 Peter 2:1
  { book: 61, chapter: 2, verse: 1, word: 'Lord', strongs_id: 'G1203' },
  // Wisdom — 1 Corinthians 1:24
  { book: 46, chapter: 1, verse: 24, word: 'wisdom', strongs_id: 'G4678' },
  // Knowledge — 1 Corinthians 8:1
  { book: 46, chapter: 8, verse: 1, word: 'knowledge', strongs_id: 'G1108' },
  // Prudence — Ephesians 1:8
  { book: 49, chapter: 1, verse: 8, word: 'prudence', strongs_id: 'G5428' },
  // Instruction — 2 Timothy 3:16
  { book: 55, chapter: 3, verse: 16, word: 'instruction', strongs_id: 'G3809' },
  // Judgment — John 5:22
  { book: 43, chapter: 5, verse: 22, word: 'judgment', strongs_id: 'G2920' },
  // Righteousness — Romans 3:22
  { book: 45, chapter: 3, verse: 22, word: 'righteousness', strongs_id: 'G1343' },
  // Condemnation — Romans 8:1
  { book: 45, chapter: 8, verse: 1, word: 'condemnation', strongs_id: 'G2917' },
  // Heal — Matthew 4:23
  { book: 40, chapter: 4, verse: 23, word: 'healing', strongs_id: 'G2323' },
  // Sign — John 2:11
  { book: 43, chapter: 2, verse: 11, word: 'miracle', strongs_id: 'G4592' },
  // Power — Acts 1:8
  { book: 44, chapter: 1, verse: 8, word: 'power', strongs_id: 'G1411' },
  // Wonders — Acts 2:19
  { book: 44, chapter: 2, verse: 19, word: 'wonders', strongs_id: 'G5059' },
];
