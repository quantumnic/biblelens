import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

const ARMOR_PIECES = [
  {
    piece: 'Belt of Truth',
    greek: 'ζώνη (zōnē) + ἀλήθεια (alētheia)',
    verse: 'Stand therefore, having your loins girt about with truth',
    reference: 'Ephesians 6:14a',
    strongsIds: ['G2223', 'G225'],
    romanAnalogy: 'The Roman cingulum militare — a heavy leather belt that held the tunic tight and anchored the sword scabbard. Without it, a soldier could not fight.',
    spiritualMeaning: 'Truth is foundational — it holds everything together. Living in honesty and integrity before God and others. The belt also represents doctrinal truth that anchors all other spiritual equipment.',
    otEcho: 'Isaiah 11:5 — "Righteousness shall be the girdle of his loins, and faithfulness the girdle of his reins."',
    emoji: '🔗',
  },
  {
    piece: 'Breastplate of Righteousness',
    greek: 'θώραξ (thōrax) + δικαιοσύνη (dikaiosynē)',
    verse: 'and having on the breastplate of righteousness',
    reference: 'Ephesians 6:14b',
    strongsIds: ['G2382', 'G1343'],
    romanAnalogy: 'The lorica — segmented armor protecting the heart and vital organs. A direct hit without it was fatal.',
    spiritualMeaning: "Both imputed righteousness (Christ's righteousness credited to us) and practical righteousness (holy living). It guards the heart — the center of spiritual life.",
    otEcho: 'Isaiah 59:17 — "He put on righteousness as a breastplate, and an helmet of salvation upon his head."',
    emoji: '🛡️',
  },
  {
    piece: 'Shoes of the Gospel of Peace',
    greek: 'ὑπόδημα (hypodēma) + εἰρήνη (eirēnē)',
    verse: 'And your feet shod with the preparation of the gospel of peace',
    reference: 'Ephesians 6:15',
    strongsIds: ['G5266', 'G1515'],
    romanAnalogy: 'The caligae — hobnailed military sandals that provided sure footing on any terrain. Roman legions conquered the world on these boots.',
    spiritualMeaning: 'Readiness and stability. The gospel of peace gives firm footing in spiritual battle and readiness to advance with the good news. Peace with God enables warfare against evil.',
    otEcho: 'Isaiah 52:7 — "How beautiful upon the mountains are the feet of him that bringeth good tidings, that publisheth peace."',
    emoji: '👟',
  },
  {
    piece: 'Shield of Faith',
    greek: 'θυρεός (thyreos) + πίστις (pistis)',
    verse: 'Above all, taking the shield of faith, wherewith ye shall be able to quench all the fiery darts of the wicked',
    reference: 'Ephesians 6:16',
    strongsIds: ['G2375', 'G4102'],
    romanAnalogy: 'The scutum — a large, door-shaped shield (thyreos comes from thyra, "door") soaked in water before battle to extinguish flaming arrows. Soldiers interlocked shields in the testudo formation.',
    spiritualMeaning: 'Faith as active trust in God that extinguishes Satan\'s attacks — doubts, temptations, accusations, fears. "Above all" suggests this is the most critical piece.',
    otEcho: 'Psalm 91:4 — "His truth shall be thy shield and buckler." Psalm 3:3 — "Thou, O LORD, art a shield for me."',
    emoji: '🛡️',
  },
  {
    piece: 'Helmet of Salvation',
    greek: 'περικεφαλαία (perikephalaia) + σωτηρία (sōtēria)',
    verse: 'And take the helmet of salvation',
    reference: 'Ephesians 6:17a',
    strongsIds: ['G4030', 'G4991'],
    romanAnalogy: 'The galea — a bronze or iron helmet with cheek guards and a neck protector. It absorbed blows that would otherwise be fatal.',
    spiritualMeaning: 'Salvation protects the mind — the battlefield where most spiritual warfare occurs. The assurance of salvation guards against despair, doubt, and deceptive thinking.',
    otEcho: 'Isaiah 59:17 — "an helmet of salvation upon his head." 1 Thess 5:8 — "for an helmet, the hope of salvation."',
    emoji: '⛑️',
  },
  {
    piece: 'Sword of the Spirit',
    greek: 'μάχαιρα (machaira) + πνεῦμα (pneuma)',
    verse: 'and the sword of the Spirit, which is the word of God',
    reference: 'Ephesians 6:17b',
    strongsIds: ['G3162', 'G4151'],
    romanAnalogy: 'The gladius — a short, double-edged sword for close combat. Not a broadsword but a precise, thrusting weapon. Devastating in skilled hands.',
    spiritualMeaning: 'The only offensive weapon in the armor. "Word" here is rhēma (G4487) — a specific, spoken word, not logos. Jesus modeled this in the wilderness, answering each temptation with specific Scripture.',
    otEcho: 'Hebrews 4:12 — "For the word of God is quick, and powerful, and sharper than any twoedged sword."',
    emoji: '⚔️',
  },
  {
    piece: 'Prayer',
    greek: 'προσευχή (proseuchē) + δέησις (deēsis)',
    verse: 'Praying always with all prayer and supplication in the Spirit, and watching thereunto with all perseverance',
    reference: 'Ephesians 6:18',
    strongsIds: ['G4335', 'G1162'],
    romanAnalogy: 'Not a piece of armor but the atmosphere in which the soldier operates — like military communications. An army without communication is defeated.',
    spiritualMeaning: 'Prayer is the power source for all the armor. "All prayer" (proseuche — general) and "supplication" (deesis — specific requests). "In the Spirit" — empowered and directed by the Holy Spirit.',
    otEcho: 'Zechariah 4:6 — "Not by might, nor by power, but by my spirit, saith the LORD of hosts."',
    emoji: '🙏',
  },
];

export default function ArmorOfGodPage() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-5xl">
        <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">⚔️ The Armor of God</h1>
        <p className="text-parchment-400 mb-2">
          Paul&apos;s spiritual warfare metaphor from Ephesians 6:10–18 — each piece of Roman armor representing divine provision for the believer.
        </p>
        <Link href="/reader/ephesians/6#v10" className="inline-block text-sm text-gold-400 hover:text-gold-300 mb-6">
          📖 Read Ephesians 6:10–18 →
        </Link>

        <div className="bg-parchment-900 border border-gold-500/20 rounded-xl p-4 mb-6">
          <blockquote className="text-parchment-200 italic text-center font-serif">
            &ldquo;Put on the whole armour of God, that ye may be able to stand against the wiles of the devil.&rdquo;
          </blockquote>
          <p className="text-xs text-gold-400 text-center mt-2">— Ephesians 6:11 (KJV)</p>
        </div>

        <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-4 mb-6">
          <h2 className="text-sm font-semibold text-gold-400 mb-2">🎯 The Enemy</h2>
          <p className="text-sm text-parchment-400">
            &ldquo;For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world, against spiritual wickedness in high places.&rdquo; (Eph 6:12)
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {['Principalities (ἀρχή)', 'Powers (ἐξουσία)', 'World Rulers (κοσμοκράτωρ)', 'Spiritual Wickedness (πνευματικά)'].map(e => (
              <span key={e} className="text-xs px-2 py-1 bg-red-900/30 text-red-400 rounded-full">{e}</span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {ARMOR_PIECES.map((item, i) => (
            <div key={item.piece} className="bg-parchment-900 border border-parchment-800 rounded-xl p-5 hover:border-gold-500/20 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-600/20 flex items-center justify-center text-2xl flex-shrink-0">
                  {item.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h2 className="text-lg font-semibold text-parchment-100">{i + 1}. {item.piece}</h2>
                    {item.strongsIds.map(id => (
                      <Link key={id} href={`/word/${id}`} className="text-xs px-2 py-0.5 bg-parchment-800 text-gold-400 rounded-full hover:bg-parchment-700">
                        {id}
                      </Link>
                    ))}
                  </div>
                  <p className="text-xs text-parchment-500 mb-2">{item.greek}</p>

                  <blockquote className="text-parchment-300 italic border-l-2 border-gold-500/30 pl-3 mb-3 text-sm">
                    &ldquo;{item.verse}&rdquo;
                    <span className="text-xs text-gold-400 ml-2 not-italic">— {item.reference}</span>
                  </blockquote>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                    <div className="bg-parchment-800/50 rounded-lg p-2">
                      <span className="text-gold-500 uppercase tracking-wider">Roman Armor</span>
                      <p className="text-parchment-300 mt-1">{item.romanAnalogy}</p>
                    </div>
                    <div className="bg-parchment-800/50 rounded-lg p-2">
                      <span className="text-gold-500 uppercase tracking-wider">Spiritual Meaning</span>
                      <p className="text-parchment-300 mt-1">{item.spiritualMeaning}</p>
                    </div>
                    <div className="bg-parchment-800/50 rounded-lg p-2">
                      <span className="text-gold-500 uppercase tracking-wider">OT Echo</span>
                      <p className="text-parchment-300 mt-1">{item.otEcho}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-8 bg-parchment-900 border border-parchment-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-parchment-200 mb-3 font-serif">📚 Key Observations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-parchment-400">
            <div>
              <h3 className="text-gold-400 font-semibold mb-1">Defensive + Offensive</h3>
              <p>Six pieces are defensive (belt, breastplate, shoes, shield, helmet, prayer). Only one is offensive — the sword. The Christian posture is primarily to &ldquo;stand&rdquo; (mentioned 4x), not to attack.</p>
            </div>
            <div>
              <h3 className="text-gold-400 font-semibold mb-1">Isaiah&apos;s Warrior God</h3>
              <p>Paul draws from Isaiah 59:17 where God Himself puts on armor. The believer now wears God&apos;s own equipment — divine provision, not human effort.</p>
            </div>
            <div>
              <h3 className="text-gold-400 font-semibold mb-1">&ldquo;The Whole Armour&rdquo;</h3>
              <p>Panoplia (πανοπλία) — the complete set. Partial armor leaves gaps. Paul insists on every piece because spiritual warfare targets every area of life.</p>
            </div>
            <div>
              <h3 className="text-gold-400 font-semibold mb-1">Prison Context</h3>
              <p>Paul wrote Ephesians while chained to a Roman guard (Eph 6:20). He was literally looking at a soldier&apos;s armor as he dictated this passage — theology born from lived experience.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
