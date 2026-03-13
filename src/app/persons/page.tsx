'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

interface Person {
  name: string;
  hebrew?: string;
  greek?: string;
  meaning: string;
  testament: 'OT' | 'NT' | 'Both';
  category: string;
  description: string;
  keyVerses: { ref: string; slug: string; chapter: number; verse: number }[];
}

const PERSONS: Person[] = [
  { name: 'Abraham', hebrew: 'אַבְרָהָם', meaning: 'Father of many nations', testament: 'Both', category: 'Patriarch', description: 'Called by God from Ur of the Chaldees. Father of faith, given the covenant of circumcision. Willing to sacrifice Isaac on Mount Moriah.', keyVerses: [{ ref: 'Genesis 12:1', slug: 'genesis', chapter: 12, verse: 1 }, { ref: 'Genesis 22:2', slug: 'genesis', chapter: 22, verse: 2 }, { ref: 'Hebrews 11:8', slug: 'hebrews', chapter: 11, verse: 8 }] },
  { name: 'Moses', hebrew: 'מֹשֶׁה', meaning: 'Drawn out (of water)', testament: 'Both', category: 'Prophet / Lawgiver', description: 'Led Israel out of Egypt. Received the Torah on Sinai. Spoke with God "face to face." Could not enter the Promised Land.', keyVerses: [{ ref: 'Exodus 3:14', slug: 'exodus', chapter: 3, verse: 14 }, { ref: 'Deuteronomy 34:10', slug: 'deuteronomy', chapter: 34, verse: 10 }] },
  { name: 'David', hebrew: 'דָּוִד', meaning: 'Beloved', testament: 'Both', category: 'King', description: 'Shepherd boy who slew Goliath. King of Israel, "a man after God\'s own heart." Psalmist and ancestor of the Messiah.', keyVerses: [{ ref: '1 Samuel 16:7', slug: '1-samuel', chapter: 16, verse: 7 }, { ref: '2 Samuel 7:16', slug: '2-samuel', chapter: 7, verse: 16 }, { ref: 'Psalm 23:1', slug: 'psalms', chapter: 23, verse: 1 }] },
  { name: 'Elijah', hebrew: 'אֵלִיָּהוּ', meaning: 'My God is YHWH', testament: 'Both', category: 'Prophet', description: 'Confronted the prophets of Baal on Mount Carmel. Taken to heaven in a chariot of fire. Expected to return before the Messiah.', keyVerses: [{ ref: '1 Kings 18:21', slug: '1-kings', chapter: 18, verse: 21 }, { ref: '2 Kings 2:11', slug: '2-kings', chapter: 2, verse: 11 }, { ref: 'Malachi 4:5', slug: 'malachi', chapter: 4, verse: 5 }] },
  { name: 'Isaiah', hebrew: 'יְשַׁעְיָהוּ', meaning: 'YHWH is salvation', testament: 'Both', category: 'Prophet', description: 'The "Prince of Prophets." Prophesied the virgin birth, the Suffering Servant, and the new heavens and earth. Called in a throne-room vision.', keyVerses: [{ ref: 'Isaiah 6:8', slug: 'isaiah', chapter: 6, verse: 8 }, { ref: 'Isaiah 7:14', slug: 'isaiah', chapter: 7, verse: 14 }, { ref: 'Isaiah 53:5', slug: 'isaiah', chapter: 53, verse: 5 }] },
  { name: 'Daniel', hebrew: 'דָּנִיֵּאל', meaning: 'God is my judge', testament: 'OT', category: 'Prophet', description: 'Exiled to Babylon as a youth. Interpreter of dreams, visionary of four kingdoms. Survived the lion\'s den.', keyVerses: [{ ref: 'Daniel 2:44', slug: 'daniel', chapter: 2, verse: 44 }, { ref: 'Daniel 6:22', slug: 'daniel', chapter: 6, verse: 22 }] },
  { name: 'Mary (mother of Jesus)', greek: 'Μαριάμ', meaning: 'Beloved / Bitter', testament: 'NT', category: 'Mother of Christ', description: 'Chosen to bear the Messiah. Her Magnificat (Luke 1:46-55) is one of the great hymns of Scripture. Present at the cross and Pentecost.', keyVerses: [{ ref: 'Luke 1:38', slug: 'luke', chapter: 1, verse: 38 }, { ref: 'Luke 1:46', slug: 'luke', chapter: 1, verse: 46 }] },
  { name: 'Peter', greek: 'Πέτρος', meaning: 'Rock, Stone', testament: 'NT', category: 'Apostle', description: 'Fisherman called by Jesus. Confessed Christ, denied Christ, restored by Christ. Leader of the early church. Preached at Pentecost.', keyVerses: [{ ref: 'Matthew 16:16', slug: 'matthew', chapter: 16, verse: 16 }, { ref: 'John 21:17', slug: 'john', chapter: 21, verse: 17 }, { ref: 'Acts 2:14', slug: 'acts', chapter: 2, verse: 14 }] },
  { name: 'Paul', greek: 'Παῦλος', meaning: 'Small, Humble', testament: 'NT', category: 'Apostle', description: 'Pharisee turned apostle after encountering the risen Christ on the Damascus road. Wrote 13 epistles. Missionary to the Gentiles.', keyVerses: [{ ref: 'Acts 9:4', slug: 'acts', chapter: 9, verse: 4 }, { ref: 'Philippians 3:8', slug: 'philippians', chapter: 3, verse: 8 }, { ref: 'Galatians 2:20', slug: 'galatians', chapter: 2, verse: 20 }] },
  { name: 'John', greek: 'Ἰωάννης', meaning: 'YHWH is gracious', testament: 'NT', category: 'Apostle', description: 'The "beloved disciple." Author of the Gospel of John, three epistles, and Revelation. Exiled to Patmos. Theologian of love and light.', keyVerses: [{ ref: 'John 1:1', slug: 'john', chapter: 1, verse: 1 }, { ref: '1 John 4:8', slug: '1-john', chapter: 4, verse: 8 }, { ref: 'Revelation 1:9', slug: 'revelation', chapter: 1, verse: 9 }] },
  { name: 'Ruth', hebrew: 'רוּת', meaning: 'Friend, companion', testament: 'OT', category: 'Ancestor of David', description: 'Moabite woman who chose to follow Naomi and the God of Israel. Her loyalty is legendary: "Where you go, I will go." Grandmother of King David.', keyVerses: [{ ref: 'Ruth 1:16', slug: 'ruth', chapter: 1, verse: 16 }, { ref: 'Ruth 4:17', slug: 'ruth', chapter: 4, verse: 17 }] },
  { name: 'Esther', hebrew: 'אֶסְתֵּר', meaning: 'Star / Hidden', testament: 'OT', category: 'Queen', description: 'Jewish queen of Persia who risked her life to save her people from genocide. "For such a time as this."', keyVerses: [{ ref: 'Esther 4:14', slug: 'esther', chapter: 4, verse: 14 }, { ref: 'Esther 7:3', slug: 'esther', chapter: 7, verse: 3 }] },
];

const CATEGORIES = ['All', ...new Set(PERSONS.map(p => p.category))];

export default function PersonsPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = PERSONS.filter(p => {
    if (filter !== 'All' && p.category !== filter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-parchment-500 mb-2">
          <Link href="/" className="hover:text-gold-400">Home</Link>
          <span>/</span>
          <span className="text-gold-400">Persons</span>
        </div>

        <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">👤 Key Persons of the Bible</h1>
        <p className="text-parchment-400 mb-6">
          Major figures whose stories shape the biblical narrative, with name etymology and key references.
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name…"
            className="bg-parchment-800 border border-parchment-700 rounded-lg px-3 py-2 text-sm text-parchment-100 placeholder-parchment-500 focus:outline-none focus:border-gold-500/50"
          />
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                filter === cat
                  ? 'bg-gold-600 text-parchment-950 border-gold-500'
                  : 'bg-parchment-900 text-parchment-400 border-parchment-700 hover:border-gold-500/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map(p => (
            <div key={p.name} className="bg-parchment-900 border border-parchment-800 rounded-xl p-5 hover:border-gold-500/20 transition-colors">
              <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                <div>
                  <h2 className="text-lg font-bold text-parchment-100 font-serif">{p.name}</h2>
                  <div className="flex gap-2 mt-0.5">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gold-600/20 text-gold-400">{p.category}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-parchment-800 text-parchment-400">{p.testament}</span>
                  </div>
                </div>
                <div className="text-right">
                  {p.hebrew && <span className="text-xl font-serif text-gold-500/70 block">{p.hebrew}</span>}
                  {p.greek && <span className="text-lg font-serif text-gold-500/70 block">{p.greek}</span>}
                  <p className="text-xs text-parchment-500 italic">&ldquo;{p.meaning}&rdquo;</p>
                </div>
              </div>
              <p className="text-sm text-parchment-300 leading-relaxed mb-3">{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.keyVerses.map(kv => (
                  <Link
                    key={kv.ref}
                    href={`/reader/${kv.slug}/${kv.chapter}#v${kv.verse}`}
                    className="text-xs px-2 py-1 rounded bg-parchment-800 text-gold-400 hover:text-gold-300 hover:bg-parchment-700 transition-colors"
                  >
                    📖 {kv.ref}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
