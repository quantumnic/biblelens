'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ThemeCategory {
  name: string;
  icon: string;
  description: string;
  themes: ThemeEntry[];
}

interface ThemeEntry {
  name: string;
  hebrew?: string;
  greek?: string;
  strongsIds: string[];
  keyVerses: { ref: string; slug: string; ch: number; v: number }[];
  summary: string;
}

const THEME_CATEGORIES: ThemeCategory[] = [
  {
    name: 'Salvation & Redemption',
    icon: '✝️',
    description: 'The central narrative of rescue, atonement, and new life',
    themes: [
      {
        name: 'Redemption',
        hebrew: 'גָּאַל (gaal)',
        greek: 'ἀπολύτρωσις (apolytrōsis)',
        strongsIds: ['H1350', 'G629'],
        keyVerses: [
          { ref: 'Eph 1:7', slug: 'ephesians', ch: 1, v: 7 },
          { ref: 'Isa 44:22', slug: 'isaiah', ch: 44, v: 22 },
        ],
        summary: 'God buying back His people from slavery to sin — the kinsman-redeemer pattern from Ruth fulfilled in Christ.',
      },
      {
        name: 'Justification',
        greek: 'δικαίωσις (dikaiōsis)',
        strongsIds: ['G1347'],
        keyVerses: [
          { ref: 'Rom 5:1', slug: 'romans', ch: 5, v: 1 },
          { ref: 'Rom 3:24', slug: 'romans', ch: 3, v: 24 },
        ],
        summary: 'Being declared righteous before God — not earned by works but received through faith in Christ.',
      },
      {
        name: 'Sanctification',
        hebrew: 'קָדַשׁ (qadash)',
        greek: 'ἁγιασμός (hagiasmos)',
        strongsIds: ['H6942', 'G38'],
        keyVerses: [
          { ref: '1 Thess 4:3', slug: '1-thessalonians', ch: 4, v: 3 },
          { ref: 'Lev 20:8', slug: 'leviticus', ch: 20, v: 8 },
        ],
        summary: 'The process of being made holy — set apart for God\'s purpose, both positional and progressive.',
      },
    ],
  },
  {
    name: 'God\'s Character',
    icon: '👑',
    description: 'The attributes and nature of the divine',
    themes: [
      {
        name: 'Hesed (Lovingkindness)',
        hebrew: 'חֶסֶד (chesed)',
        greek: 'ἔλεος (eleos)',
        strongsIds: ['H2617', 'G1656'],
        keyVerses: [
          { ref: 'Ps 136:1', slug: 'psalms', ch: 136, v: 1 },
          { ref: 'Lam 3:22', slug: 'lamentations', ch: 3, v: 22 },
        ],
        summary: 'Covenant faithfulness, loyal love — the untranslatable word at the heart of God\'s character. Steadfast love that endures forever.',
      },
      {
        name: 'Holiness',
        hebrew: 'קָדוֹשׁ (qadosh)',
        greek: 'ἅγιος (hagios)',
        strongsIds: ['H6918', 'G40'],
        keyVerses: [
          { ref: 'Isa 6:3', slug: 'isaiah', ch: 6, v: 3 },
          { ref: '1 Pet 1:16', slug: '1-peter', ch: 1, v: 16 },
        ],
        summary: 'Absolute moral purity and transcendent otherness — God is wholly set apart from creation.',
      },
      {
        name: 'Sovereignty',
        hebrew: 'מָלַךְ (malak)',
        greek: 'παντοκράτωρ (pantokratōr)',
        strongsIds: ['H4427', 'G3841'],
        keyVerses: [
          { ref: 'Ps 93:1', slug: 'psalms', ch: 93, v: 1 },
          { ref: 'Rev 19:6', slug: 'revelation', ch: 19, v: 6 },
        ],
        summary: 'God\'s absolute rule over all creation — He reigns as King of kings with supreme authority.',
      },
    ],
  },
  {
    name: 'Human Condition',
    icon: '🫀',
    description: 'Sin, suffering, and the human predicament',
    themes: [
      {
        name: 'Sin (Missing the Mark)',
        hebrew: 'חַטָּאת (chattat)',
        greek: 'ἁμαρτία (hamartia)',
        strongsIds: ['H2403', 'G266'],
        keyVerses: [
          { ref: 'Rom 3:23', slug: 'romans', ch: 3, v: 23 },
          { ref: 'Ps 51:5', slug: 'psalms', ch: 51, v: 5 },
        ],
        summary: 'Hamartia literally means "missing the mark" — falling short of God\'s standard of perfection.',
      },
      {
        name: 'Suffering & Trials',
        hebrew: 'עָנִי (ani)',
        greek: 'θλῖψις (thlipsis)',
        strongsIds: ['H6041', 'G2347'],
        keyVerses: [
          { ref: 'Rom 5:3-4', slug: 'romans', ch: 5, v: 3 },
          { ref: 'Ps 34:18', slug: 'psalms', ch: 34, v: 18 },
        ],
        summary: 'Tribulation that produces perseverance — God draws near to the brokenhearted and uses suffering for growth.',
      },
    ],
  },
  {
    name: 'Eschatology',
    icon: '🌅',
    description: 'Last things — prophecy, return, and eternal hope',
    themes: [
      {
        name: 'Parousia (Second Coming)',
        greek: 'παρουσία (parousia)',
        strongsIds: ['G3952'],
        keyVerses: [
          { ref: '1 Thess 4:15', slug: '1-thessalonians', ch: 4, v: 15 },
          { ref: 'Matt 24:27', slug: 'matthew', ch: 24, v: 27 },
        ],
        summary: 'The "arrival" or "presence" — Christ\'s glorious return, the blessed hope of the church.',
      },
      {
        name: 'New Creation',
        greek: 'καινός (kainos)',
        strongsIds: ['G2537'],
        keyVerses: [
          { ref: 'Rev 21:1', slug: 'revelation', ch: 21, v: 1 },
          { ref: '2 Cor 5:17', slug: '2-corinthians', ch: 5, v: 17 },
        ],
        summary: 'Not merely new in time (neos) but new in kind (kainos) — qualitatively different, the renewal of all things.',
      },
    ],
  },
];

export default function ThemeExplorer() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(THEME_CATEGORIES[0].name);
  const [expandedTheme, setExpandedTheme] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {THEME_CATEGORIES.map(cat => (
        <div key={cat.name} className="border border-parchment-800 rounded-xl overflow-hidden">
          <button
            onClick={() => setExpandedCategory(expandedCategory === cat.name ? null : cat.name)}
            className="w-full text-left p-4 flex items-center gap-3 hover:bg-parchment-800/50 transition-colors"
          >
            <span className="text-xl">{cat.icon}</span>
            <div className="flex-1">
              <span className="text-parchment-200 font-semibold">{cat.name}</span>
              <span className="text-parchment-500 text-xs block">{cat.description}</span>
            </div>
            <span className="text-parchment-500 text-sm">{expandedCategory === cat.name ? '▼' : '▶'}</span>
          </button>
          {expandedCategory === cat.name && (
            <div className="border-t border-parchment-800 p-3 space-y-2">
              {cat.themes.map(theme => (
                <div key={theme.name} className="bg-parchment-900/50 rounded-lg">
                  <button
                    onClick={() => setExpandedTheme(expandedTheme === theme.name ? null : theme.name)}
                    className="w-full text-left p-3 flex items-center justify-between hover:bg-parchment-800/30 rounded-lg transition-colors"
                  >
                    <span className="text-parchment-200 text-sm font-medium">{theme.name}</span>
                    <div className="flex gap-1">
                      {theme.strongsIds.map(id => (
                        <span key={id} className="text-xs bg-gold-600/20 text-gold-400 px-1.5 py-0.5 rounded">{id}</span>
                      ))}
                    </div>
                  </button>
                  {expandedTheme === theme.name && (
                    <div className="px-3 pb-3 space-y-2">
                      <div className="flex flex-wrap gap-3 text-sm">
                        {theme.hebrew && (
                          <span className="text-parchment-300">
                            <span className="text-parchment-500 text-xs">Hebrew: </span>{theme.hebrew}
                          </span>
                        )}
                        {theme.greek && (
                          <span className="text-parchment-300">
                            <span className="text-parchment-500 text-xs">Greek: </span>{theme.greek}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-parchment-400 leading-relaxed">{theme.summary}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {theme.keyVerses.map(v => (
                          <Link
                            key={v.ref}
                            href={`/reader/${v.slug}/${v.ch}#v${v.v}`}
                            className="text-xs bg-parchment-800 text-gold-400 hover:text-gold-300 px-2 py-1 rounded-full transition-colors"
                          >
                            {v.ref}
                          </Link>
                        ))}
                        {theme.strongsIds.map(id => (
                          <Link
                            key={id}
                            href={`/word/${id}`}
                            className="text-xs bg-gold-600/10 text-gold-400 hover:text-gold-300 px-2 py-1 rounded-full transition-colors"
                          >
                            {id} →
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
