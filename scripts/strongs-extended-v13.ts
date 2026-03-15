// Extended Strong's v13 — Priesthood, Kingship, Covenant Law, Temple/Tabernacle, Wisdom Literature
export const EXTENDED_STRONGS_V13 = [
  // Hebrew — Priesthood
  { id: 'H3548', original: 'כֹּהֵן', transliteration: 'kohen', definition: 'Priest — one who serves God in a mediating role, especially of the Levitical order', language: 'hebrew' as const },
  { id: 'H3550', original: 'כְּהֻנָּה', transliteration: 'kehunnah', definition: 'Priesthood — the office and function of priestly service', language: 'hebrew' as const },
  { id: 'H4196', original: 'מִזְבֵּחַ', transliteration: 'mizbeach', definition: 'Altar — place of sacrifice, from the root "to slaughter"', language: 'hebrew' as const },
  { id: 'H7004', original: 'קְטֹרֶת', transliteration: 'qetoreth', definition: 'Incense — fragrant offering symbolizing prayer ascending to God', language: 'hebrew' as const },
  { id: 'H3722', original: 'כָּפַר', transliteration: 'kaphar', definition: 'To atone, cover, make reconciliation — the basis of Yom Kippur', language: 'hebrew' as const },
  // Hebrew — Kingship
  { id: 'H4428', original: 'מֶלֶךְ', transliteration: 'melek', definition: 'King, ruler — sovereign authority, title of God and human rulers', language: 'hebrew' as const },
  { id: 'H4438', original: 'מַלְכוּת', transliteration: 'malkuth', definition: 'Kingdom, reign, sovereignty — dominion and royal authority', language: 'hebrew' as const },
  { id: 'H3678', original: 'כִּסֵּא', transliteration: 'kisse', definition: 'Throne, seat — the seat of royal and divine authority', language: 'hebrew' as const },
  { id: 'H4886', original: 'מָשַׁח', transliteration: 'mashach', definition: 'To anoint — to consecrate a king, priest, or prophet; root of Messiah', language: 'hebrew' as const },
  { id: 'H7626', original: 'שֵׁבֶט', transliteration: 'shebet', definition: 'Scepter, rod, tribe — symbol of authority and tribal identity', language: 'hebrew' as const },
  // Hebrew — Covenant Law
  { id: 'H2706', original: 'חֹק', transliteration: 'choq', definition: 'Statute, decree, ordinance — an appointed law or boundary', language: 'hebrew' as const },
  { id: 'H4941', original: 'מִשְׁפָּט', transliteration: 'mishpat', definition: 'Justice, judgment, ordinance — divine justice and legal ruling', language: 'hebrew' as const },
  { id: 'H5715', original: 'עֵדוּת', transliteration: 'eduth', definition: 'Testimony, witness — the tablets of the law, God\'s covenant witness', language: 'hebrew' as const },
  { id: 'H6680', original: 'צָוָה', transliteration: 'tsavah', definition: 'To command, charge, give orders — divine commandment', language: 'hebrew' as const },
  // Hebrew — Temple/Tabernacle
  { id: 'H4908', original: 'מִשְׁכָּן', transliteration: 'mishkan', definition: 'Tabernacle, dwelling place — God\'s portable sanctuary in the wilderness', language: 'hebrew' as const },
  { id: 'H1964', original: 'הֵיכָל', transliteration: 'heykal', definition: 'Temple, palace — the house of God, Solomon\'s Temple', language: 'hebrew' as const },
  { id: 'H6944', original: 'קֹדֶשׁ', transliteration: 'qodesh', definition: 'Holy, sacred, set apart — holiness, the Holy of Holies', language: 'hebrew' as const },
  { id: 'H3727', original: 'כַּפֹּרֶת', transliteration: 'kapporeth', definition: 'Mercy seat — the golden lid of the Ark of the Covenant', language: 'hebrew' as const },
  // Hebrew — Wisdom
  { id: 'H998', original: 'בִּינָה', transliteration: 'binah', definition: 'Understanding, insight, discernment — the ability to distinguish', language: 'hebrew' as const },
  { id: 'H1847', original: 'דַּעַת', transliteration: 'daath', definition: 'Knowledge — experiential knowledge, knowing God intimately', language: 'hebrew' as const },
  { id: 'H4912', original: 'מָשָׁל', transliteration: 'mashal', definition: 'Proverb, parable, saying — a wise comparison or pithy saying', language: 'hebrew' as const },
  { id: 'H8394', original: 'תָּבוּן', transliteration: 'tabun', definition: 'Intelligence, understanding, skill — wisdom applied practically', language: 'hebrew' as const },
  // Greek — Priesthood
  { id: 'G749', original: 'ἀρχιερεύς', transliteration: 'archiereus', definition: 'High priest, chief priest — the supreme religious authority', language: 'greek' as const },
  { id: 'G2409', original: 'ἱερεύς', transliteration: 'hiereus', definition: 'Priest — one who offers sacrifices and serves in the temple', language: 'greek' as const },
  { id: 'G2405', original: 'ἱερατεία', transliteration: 'hierateia', definition: 'Priesthood, priestly office — the function of serving as priest', language: 'greek' as const },
  { id: 'G2378', original: 'θυσία', transliteration: 'thysia', definition: 'Sacrifice, offering — a gift offered to God, Christ as sacrifice', language: 'greek' as const },
  // Greek — Kingship
  { id: 'G935', original: 'βασιλεύς', transliteration: 'basileus', definition: 'King — sovereign ruler, Christ as King of Kings', language: 'greek' as const },
  { id: 'G932', original: 'βασιλεία', transliteration: 'basileia', definition: 'Kingdom — the reign and realm of God, the Kingdom of Heaven', language: 'greek' as const },
  { id: 'G2362', original: 'θρόνος', transliteration: 'thronos', definition: 'Throne — seat of authority, the throne of God and the Lamb', language: 'greek' as const },
  { id: 'G1849', original: 'ἐξουσία', transliteration: 'exousia', definition: 'Authority, power, right — delegated authority, freedom of choice', language: 'greek' as const },
  // Greek — Wisdom / Knowledge
  { id: 'G4678', original: 'σοφία', transliteration: 'sophia', definition: 'Wisdom — divine wisdom, the wisdom of God vs. worldly wisdom', language: 'greek' as const },
  { id: 'G1108', original: 'γνῶσις', transliteration: 'gnōsis', definition: 'Knowledge — spiritual insight and understanding', language: 'greek' as const },
  { id: 'G5428', original: 'φρόνησις', transliteration: 'phronēsis', definition: 'Prudence, practical wisdom — understanding applied to life', language: 'greek' as const },
  { id: 'G4907', original: 'σύνεσις', transliteration: 'synesis', definition: 'Understanding, intelligence — the ability to put facts together', language: 'greek' as const },
  // Greek — Temple / Worship
  { id: 'G3485', original: 'ναός', transliteration: 'naos', definition: 'Temple, sanctuary — the inner shrine, believers as God\'s temple', language: 'greek' as const },
  { id: 'G2411', original: 'ἱερόν', transliteration: 'hieron', definition: 'Temple (complex) — the entire sacred area including courts', language: 'greek' as const },
  { id: 'G4352', original: 'προσκυνέω', transliteration: 'proskyneō', definition: 'To worship, bow down — to prostrate in reverence and adoration', language: 'greek' as const },
  { id: 'G3000', original: 'λατρεύω', transliteration: 'latreuō', definition: 'To serve, worship — sacred service and priestly ministry', language: 'greek' as const },
];

export const EXTENDED_WORD_STRONGS_V13 = [
  // Priest — Exodus 28:1
  { book: 2, chapter: 28, verse: 1, word: 'priest', strongs_id: 'H3548' },
  // Altar — Genesis 8:20
  { book: 1, chapter: 8, verse: 20, word: 'altar', strongs_id: 'H4196' },
  // Incense — Exodus 30:7
  { book: 2, chapter: 30, verse: 7, word: 'incense', strongs_id: 'H7004' },
  // Atonement — Leviticus 16:30
  { book: 3, chapter: 16, verse: 30, word: 'atonement', strongs_id: 'H3722' },
  // King — 1 Samuel 8:5
  { book: 9, chapter: 8, verse: 5, word: 'king', strongs_id: 'H4428' },
  // Kingdom — 1 Chronicles 29:11
  { book: 13, chapter: 29, verse: 11, word: 'kingdom', strongs_id: 'H4438' },
  // Throne — Psalm 45:6
  { book: 19, chapter: 45, verse: 6, word: 'throne', strongs_id: 'H3678' },
  // Anointed — Psalm 2:2
  { book: 19, chapter: 2, verse: 2, word: 'anointed', strongs_id: 'H4886' },
  // Sceptre — Genesis 49:10
  { book: 1, chapter: 49, verse: 10, word: 'sceptre', strongs_id: 'H7626' },
  // Statute — Deuteronomy 4:1
  { book: 5, chapter: 4, verse: 1, word: 'statutes', strongs_id: 'H2706' },
  // Judgment — Psalm 19:9
  { book: 19, chapter: 19, verse: 9, word: 'judgments', strongs_id: 'H4941' },
  // Testimony — Psalm 119:2
  { book: 19, chapter: 119, verse: 2, word: 'testimonies', strongs_id: 'H5715' },
  // Command — Deuteronomy 6:6
  { book: 5, chapter: 6, verse: 6, word: 'command', strongs_id: 'H6680' },
  // Tabernacle — Exodus 25:9
  { book: 2, chapter: 25, verse: 9, word: 'tabernacle', strongs_id: 'H4908' },
  // Temple — 1 Kings 6:1
  { book: 11, chapter: 6, verse: 1, word: 'temple', strongs_id: 'H1964' },
  // Holy — Leviticus 19:2
  { book: 3, chapter: 19, verse: 2, word: 'holy', strongs_id: 'H6944' },
  // Mercy seat — Exodus 25:17
  { book: 2, chapter: 25, verse: 17, word: 'mercy seat', strongs_id: 'H3727' },
  // Understanding — Proverbs 4:7
  { book: 20, chapter: 4, verse: 7, word: 'understanding', strongs_id: 'H998' },
  // Knowledge — Proverbs 1:7
  { book: 20, chapter: 1, verse: 7, word: 'knowledge', strongs_id: 'H1847' },
  // Proverb — Proverbs 1:1
  { book: 20, chapter: 1, verse: 1, word: 'proverbs', strongs_id: 'H4912' },
  // High priest — Hebrews 4:14
  { book: 58, chapter: 4, verse: 14, word: 'high priest', strongs_id: 'G749' },
  // Priest — Hebrews 5:6
  { book: 58, chapter: 5, verse: 6, word: 'priest', strongs_id: 'G2409' },
  // Sacrifice — Hebrews 10:12
  { book: 58, chapter: 10, verse: 12, word: 'sacrifice', strongs_id: 'G2378' },
  // King — Matthew 2:2
  { book: 40, chapter: 2, verse: 2, word: 'King', strongs_id: 'G935' },
  // Kingdom — Matthew 6:33
  { book: 40, chapter: 6, verse: 33, word: 'kingdom', strongs_id: 'G932' },
  // Throne — Revelation 4:2
  { book: 66, chapter: 4, verse: 2, word: 'throne', strongs_id: 'G2362' },
  // Authority — Matthew 28:18
  { book: 40, chapter: 28, verse: 18, word: 'power', strongs_id: 'G1849' },
  // Wisdom — 1 Corinthians 1:24
  { book: 46, chapter: 1, verse: 24, word: 'wisdom', strongs_id: 'G4678' },
  // Knowledge — 1 Corinthians 8:1
  { book: 46, chapter: 8, verse: 1, word: 'knowledge', strongs_id: 'G1108' },
  // Temple — 1 Corinthians 3:16
  { book: 46, chapter: 3, verse: 16, word: 'temple', strongs_id: 'G3485' },
  // Worship — John 4:24
  { book: 43, chapter: 4, verse: 24, word: 'worship', strongs_id: 'G4352' },
];
