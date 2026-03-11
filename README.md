<div align="center">

# 📖 BibleLens

### The world's most powerful open-source Bible research platform.

[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://typescriptlang.org)

**Multi-translation comparison · Cross-references · Strong's concordance · Data science analytics · Academic research integration · Historical context · Manuscript sources**

[Getting Started](#-getting-started) · [Features](#-features) · [Architecture](#-architecture) · [Data Sources](#-data-sources) · [Roadmap](#-roadmap) · [Contributing](#-contributing)

---

</div>

## 🔭 Why BibleLens?

The Bible is the most studied text in human history — yet most digital tools treat it like a static book. BibleLens treats it like what it is: **a living dataset of 31,102 verses, 783,137 words, spanning 1,500+ years of authorship**, connected by 340,000+ cross-references, with millennia of scholarship behind every line.

BibleLens brings **data science, academic research, and textual analysis** to Bible study. It's not a devotional app. It's an **analytical research platform** — built for scholars, students, linguists, historians, and anyone who believes the text deserves rigorous investigation.

**What makes it different:**

- 🔬 **Data science layer** — word frequency analysis, sentiment tracking, authorship statistics, network graphs
- 🎓 **Academic integration** — live queries to Semantic Scholar, PubMed, JSTOR, Google Scholar
- 📜 **Manuscript awareness** — which ancient codices attest each passage, textual variants between manuscripts
- 🗺️ **Historical context** — interactive timelines, geographic mapping, archaeological evidence
- 🤖 **AI research links** — one-click queries to Perplexity, ChatGPT, Claude for deeper analysis
- ⚖️ **Multi-translation comparison** — up to 6 translations side-by-side with diff highlighting
- 🔗 **340,000+ cross-references** — bidirectional verse connections with categories
- 📖 **Strong's concordance** — click any word for Hebrew/Greek originals, definitions, all occurrences

## ✨ Features

### 📖 Multi-Translation Reader

Read any chapter with multiple translations displayed simultaneously. Navigate the full Bible — Genesis to Revelation — with an intuitive book/chapter sidebar.

- **4 translations**: KJV, ASV, BBE (WEB), YLT — loaded from public domain sources
- **31,102 verses** fully indexed and searchable
- Verse-by-verse parallel display
- Responsive: works on mobile and desktop

### ⚖️ Translation Comparison

Place up to 6 translations side-by-side for any verse. Words that differ between translations are **highlighted in gold**, making textual divergence immediately visible.

### 🔗 Cross-References

Click any verse to reveal its web of connections — **340,000+ cross-references** from the OpenBible dataset:

- **Bidirectional**: finds references both FROM and TO the selected verse
- **Ranked by votes**: community-validated relevance scoring
- Categories: Direct quotes, Thematic connections, Prophecy/Fulfillment

### 📖 Strong's Concordance

Click highlighted words to access the original Hebrew (H####) or Greek (G####):

- Original script (אֱלֹהִים, θεός)
- Transliteration and pronunciation
- Full definition and semantic range
- Every occurrence across the Bible
- 50 key terms seeded (expandable)

### 🔬 Data Science & Analytics

> *"Apply the tools of modern data science to ancient texts."*

- **Word Frequency Analysis** — most common words per book, per author, per testament (interactive charts)
- **Sentiment Analysis** — positive/negative/neutral scoring per chapter using lexicon-based analysis
- **Authorship Statistics** — vocabulary richness, average sentence length, hapax legomena per author
- **Writing Style Comparison** — compare Paul's letters vs. Johannine writings vs. Synoptic Gospels
- **Book Timeline** — when each book was written, with historical events overlay
- **Network Graph** — connections between books, people, places, and themes

### 🎓 Academic Research Integration

Every verse and topic has a **"Research" button** that queries live academic databases:

- **Semantic Scholar** — free API, no key required. Returns papers with titles, abstracts, citation counts
- **PubMed** — archaeological, medical, and historical studies related to biblical passages
- **Google Scholar** — deep links for broader academic search
- **JSTOR** — links to humanities and theology journals

Search for: archaeology, textual criticism, historical analysis, linguistic studies, manuscript evidence.

### 🤖 AI Research Assistant

One-click AI queries for any verse:

- *"Find archaeological evidence for this passage"*
- *"What do scholars say about this verse?"*
- *"Historical context of this period"*
- *"Linguistic analysis of key terms"*

Opens pre-filled queries in:
- [Perplexity.ai](https://perplexity.ai) — AI-powered research
- [ChatGPT](https://chat.openai.com) — conversational analysis
- [Claude.ai](https://claude.ai) — nuanced reasoning

### 📜 Manuscript Sources

See which ancient manuscripts attest each passage:

- **Codex Sinaiticus** (א, 4th century)
- **Codex Vaticanus** (B, 4th century)
- **Codex Alexandrinus** (A, 5th century)
- **Dead Sea Scrolls** (3rd century BCE – 1st century CE)
- **Textus Receptus** and critical text variants

Direct links to digital manuscript collections:
- [CSNTM](https://csntm.org) — Center for the Study of New Testament Manuscripts
- [Codex Sinaiticus Project](https://codexsinaiticus.org)
- [Leon Levy Dead Sea Scrolls Digital Library](https://deadseascrolls.org.il)

### 🗺️ Historical Context

- **Interactive timeline** alongside each passage — what was happening in world history
- **Geographic context** — where events took place, powered by Leaflet.js maps
- **Archaeological evidence** — discoveries that illuminate the text
- **Cultural background** — customs, laws, and social structures of the ancient world

### 🔍 Full-Text Search

Search across all translations with:
- Instant full-text search (FTS5)
- Filter by book, testament, translation
- Results with surrounding context
- Highlighted matches

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    BibleLens Web App                     │
│                   Next.js 14 (App Router)                │
├────────────┬────────────┬───────────┬───────────────────┤
│   Reader   │  Compare   │  Search   │    Analytics      │
│   Page     │  Page      │  Page     │    Dashboard      │
├────────────┴────────────┴───────────┴───────────────────┤
│                    React Components                      │
│  Sidebar · VerseDisplay · CrossRefs · StrongsPanel      │
│  CompareView · SearchResults · Charts · Maps · Timeline │
├─────────────────────────────────────────────────────────┤
│                     API Routes                           │
│  /api/verses · /api/search · /api/crossrefs · /api/word │
│  /api/analytics · /api/research                         │
├─────────────────────────────────────────────────────────┤
│                  Data Layer (SQLite)                     │
│  better-sqlite3 · FTS5 · 120,000+ verses                │
│  340,000+ cross-refs · Strong's concordance             │
├─────────────────────────────────────────────────────────┤
│               External Integrations                      │
│  Semantic Scholar API · PubMed · Google Scholar          │
│  Perplexity · ChatGPT · Claude · JSTOR                  │
│  Leaflet.js Maps · Recharts Visualizations              │
└─────────────────────────────────────────────────────────┘
```

## 📊 Data Sources

| Source | Content | Records |
|--------|---------|---------|
| [scrollmapper/bible_databases](https://github.com/scrollmapper/bible_databases) | KJV, ASV, BBE, YLT verse texts | ~124,000 verses |
| [OpenBible.info](https://www.openbible.info/labs/cross-references/) | Cross-reference dataset | 340,000+ refs |
| Strong's Concordance | Hebrew/Greek lexicon | 50 key entries (demo) |
| [Semantic Scholar](https://api.semanticscholar.org/) | Academic papers API | Live queries |
| [PubMed](https://pubmed.ncbi.nlm.nih.gov/) | Medical/archaeological studies | Live queries |
| Manuscript metadata | Codex coverage data | Curated dataset |

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **npm** or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/quantumnic/biblelens.git
cd biblelens

# Install dependencies
npm install

# Seed the database (downloads Bible texts + cross-references)
npm run seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you're in.

### Production Build

```bash
npm run build
npm start
```

The app uses `output: 'standalone'` for easy deployment to Docker, Vercel, or any Node.js host.

### Database

BibleLens uses **SQLite** via `better-sqlite3` — no external database server needed. The seed script downloads all data from public sources and builds the database locally (~50MB).

```bash
# Re-seed (drops and recreates)
npm run seed

# Database location
data/bible.db
```

## 🗺️ Roadmap

- [x] Multi-translation reader (KJV, ASV, BBE, YLT)
- [x] Cross-reference explorer (340k+ refs)
- [x] Strong's concordance (50 demo entries)
- [x] Full-text search with FTS5
- [x] Translation comparison with diff highlighting
- [x] Academic research integration (Semantic Scholar, PubMed)
- [x] AI research assistant links
- [x] Manuscript source panel
- [x] Data analytics dashboard
- [x] Historical context timeline
- [ ] Complete Strong's concordance (8,674 Hebrew + 5,624 Greek entries)
- [ ] Interlinear Hebrew/Greek text
- [ ] Morphological parsing (verb tenses, noun cases)
- [ ] Full Leaflet.js map integration with biblical locations
- [ ] User annotations and bookmarks
- [ ] Collaborative study groups
- [ ] Audio Bible playback
- [ ] Original language text (BHS, NA28)
- [ ] Textual apparatus with full manuscript variants
- [ ] Citation export (BibTeX, RIS, Chicago)
- [ ] API for third-party integrations
- [ ] Plugin system for custom analyses
- [ ] Offline PWA support

## 🤝 Contributing

BibleLens is open source and contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Areas where help is needed:**

- 📖 **Data**: Expanding Strong's concordance to full coverage
- 🗺️ **Maps**: Biblical geography dataset and Leaflet integration
- 📊 **Analytics**: More sophisticated NLP and text analysis
- 🎨 **Design**: UI/UX improvements and accessibility
- 📜 **Manuscripts**: Expanding textual variant database
- 🌍 **Translations**: Adding more Bible translations (public domain)
- 📝 **Documentation**: Tutorials, API docs, examples

## 📄 License

MIT — free to use, modify, and distribute. See [LICENSE](LICENSE) for details.

---

<div align="center">

**Built with conviction that ancient texts deserve modern tools.**

*BibleLens is a research tool, not a theological statement. It presents data and lets you draw conclusions.*

</div>
