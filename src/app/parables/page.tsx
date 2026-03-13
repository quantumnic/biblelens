import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

interface Parable {
  name: string;
  theme: string;
  matthew?: string;
  mark?: string;
  luke?: string;
  john?: string;
  link: string;
  description: string;
}

const PARABLES: Parable[] = [
  { name: 'The Sower', theme: 'Kingdom', matthew: '13:1-23', mark: '4:1-20', luke: '8:4-15', link: '/reader/matthew/13#v1', description: 'Seeds falling on different soils represent responses to God\'s word' },
  { name: 'The Mustard Seed', theme: 'Kingdom', matthew: '13:31-32', mark: '4:30-32', luke: '13:18-19', link: '/reader/matthew/13#v31', description: 'The Kingdom grows from the smallest beginnings' },
  { name: 'The Leaven', theme: 'Kingdom', matthew: '13:33', luke: '13:20-21', link: '/reader/matthew/13#v33', description: 'The Kingdom permeates and transforms everything it touches' },
  { name: 'The Hidden Treasure', theme: 'Kingdom', matthew: '13:44', link: '/reader/matthew/13#v44', description: 'The Kingdom is worth giving up everything to obtain' },
  { name: 'The Pearl of Great Price', theme: 'Kingdom', matthew: '13:45-46', link: '/reader/matthew/13#v45', description: 'A merchant sells all for one priceless pearl — the Kingdom' },
  { name: 'The Dragnet', theme: 'Judgment', matthew: '13:47-50', link: '/reader/matthew/13#v47', description: 'Final separation of the righteous and the wicked' },
  { name: 'The Lost Sheep', theme: 'Grace', matthew: '18:12-14', luke: '15:3-7', link: '/reader/luke/15#v3', description: 'God pursues even one who is lost' },
  { name: 'The Lost Coin', theme: 'Grace', luke: '15:8-10', link: '/reader/luke/15#v8', description: 'God diligently seeks what is lost and rejoices when it\'s found' },
  { name: 'The Prodigal Son', theme: 'Grace', luke: '15:11-32', link: '/reader/luke/15#v11', description: 'A father\'s extravagant welcome for a returning son' },
  { name: 'The Good Samaritan', theme: 'Love', luke: '10:25-37', link: '/reader/luke/10#v25', description: 'True neighborliness transcends ethnic and religious boundaries' },
  { name: 'The Rich Fool', theme: 'Wealth', luke: '12:16-21', link: '/reader/luke/12#v16', description: 'Storing up treasures for oneself vs. being rich toward God' },
  { name: 'The Unforgiving Servant', theme: 'Forgiveness', matthew: '18:21-35', link: '/reader/matthew/18#v21', description: 'Those forgiven much should forgive others' },
  { name: 'The Workers in the Vineyard', theme: 'Grace', matthew: '20:1-16', link: '/reader/matthew/20#v1', description: 'God\'s generosity defies human notions of fairness' },
  { name: 'The Two Sons', theme: 'Obedience', matthew: '21:28-32', link: '/reader/matthew/21#v28', description: 'Actions speak louder than promises' },
  { name: 'The Wicked Tenants', theme: 'Judgment', matthew: '21:33-46', mark: '12:1-12', luke: '20:9-19', link: '/reader/matthew/21#v33', description: 'Rejection of God\'s messengers and His Son' },
  { name: 'The Wedding Banquet', theme: 'Kingdom', matthew: '22:1-14', link: '/reader/matthew/22#v1', description: 'The invitation to the Kingdom and the cost of refusal' },
  { name: 'The Ten Virgins', theme: 'Readiness', matthew: '25:1-13', link: '/reader/matthew/25#v1', description: 'Be prepared for the Bridegroom\'s coming' },
  { name: 'The Talents', theme: 'Stewardship', matthew: '25:14-30', link: '/reader/matthew/25#v14', description: 'Faithful use of what God entrusts to us' },
  { name: 'The Sheep and the Goats', theme: 'Judgment', matthew: '25:31-46', link: '/reader/matthew/25#v31', description: 'Final judgment based on compassion to "the least of these"' },
  { name: 'The Rich Man and Lazarus', theme: 'Wealth', luke: '16:19-31', link: '/reader/luke/16#v19', description: 'Eternal consequences of ignoring the poor' },
  { name: 'The Pharisee and the Tax Collector', theme: 'Humility', luke: '18:9-14', link: '/reader/luke/18#v9', description: 'Humility before God vs. self-righteous pride' },
  { name: 'The Fig Tree', theme: 'Readiness', matthew: '24:32-35', mark: '13:28-31', luke: '21:29-33', link: '/reader/matthew/24#v32', description: 'Read the signs of the times' },
  { name: 'The Growing Seed', theme: 'Kingdom', mark: '4:26-29', link: '/reader/mark/4#v26', description: 'The Kingdom grows mysteriously by God\'s power' },
  { name: 'The Persistent Widow', theme: 'Prayer', luke: '18:1-8', link: '/reader/luke/18#v1', description: 'Persevere in prayer and never give up' },
  { name: 'The Friend at Midnight', theme: 'Prayer', luke: '11:5-13', link: '/reader/luke/11#v5', description: 'Bold persistence in asking God' },
  { name: 'The Vine and the Branches', theme: 'Discipleship', john: '15:1-8', link: '/reader/john/15#v1', description: 'Abiding in Christ produces fruit; apart from Him we can do nothing' },
];

const THEMES = [...new Set(PARABLES.map(p => p.theme))].sort();

export default function ParablesPage() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">🌾 Parables of Jesus</h1>
          <p className="text-parchment-400">
            {PARABLES.length} parables cataloged across the four Gospels with synoptic cross-references.
          </p>
        </div>

        {/* Theme summary */}
        <div className="flex flex-wrap gap-2 mb-8">
          {THEMES.map(theme => {
            const count = PARABLES.filter(p => p.theme === theme).length;
            return (
              <span key={theme} className="px-3 py-1.5 bg-parchment-900 border border-parchment-700 rounded-full text-xs text-parchment-300">
                {theme} <span className="text-gold-400 font-semibold ml-1">{count}</span>
              </span>
            );
          })}
        </div>

        {/* Parables list */}
        <div className="space-y-4">
          {PARABLES.map((p, i) => (
            <Link key={i} href={p.link} className="block group">
              <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-5 hover:border-gold-500/30 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-lg font-semibold text-parchment-100 group-hover:text-gold-400 transition-colors font-serif">
                        {p.name}
                      </h2>
                      <span className="px-2 py-0.5 bg-gold-600/20 text-gold-400 text-xs rounded-full font-medium">
                        {p.theme}
                      </span>
                    </div>
                    <p className="text-sm text-parchment-400 mb-3">{p.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      {p.matthew && (
                        <span className="text-parchment-500">
                          <span className="text-parchment-300 font-medium">Matthew</span> {p.matthew}
                        </span>
                      )}
                      {p.mark && (
                        <span className="text-parchment-500">
                          <span className="text-parchment-300 font-medium">Mark</span> {p.mark}
                        </span>
                      )}
                      {p.luke && (
                        <span className="text-parchment-500">
                          <span className="text-parchment-300 font-medium">Luke</span> {p.luke}
                        </span>
                      )}
                      {p.john && (
                        <span className="text-parchment-500">
                          <span className="text-parchment-300 font-medium">John</span> {p.john}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-parchment-700 group-hover:text-gold-500 transition-colors flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gold-400">{PARABLES.length}</div>
            <div className="text-xs text-parchment-500 mt-1">Total Parables</div>
          </div>
          <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gold-400">{PARABLES.filter(p => p.matthew).length}</div>
            <div className="text-xs text-parchment-500 mt-1">In Matthew</div>
          </div>
          <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gold-400">{PARABLES.filter(p => p.luke).length}</div>
            <div className="text-xs text-parchment-500 mt-1">In Luke</div>
          </div>
          <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gold-400">{THEMES.length}</div>
            <div className="text-xs text-parchment-500 mt-1">Themes</div>
          </div>
        </div>
      </main>
    </>
  );
}
