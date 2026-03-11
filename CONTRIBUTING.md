# Contributing to BibleLens

Thank you for your interest in contributing to BibleLens! This project aims to be the most powerful open-source Bible research platform, and we welcome contributions of all kinds.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR-USERNAME/biblelens.git`
3. Install dependencies: `npm install`
4. Seed the database: `npm run seed`
5. Start dev server: `npm run dev`

## Development

- **Tech stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS, SQLite (better-sqlite3)
- **Code style**: TypeScript strict mode, functional components, Tailwind for styling
- **Testing**: We welcome test contributions! Jest + React Testing Library preferred.

## Areas Where Help Is Needed

- **📖 Data**: Expanding Strong's concordance to full coverage (8,674 Hebrew + 5,624 Greek entries)
- **🗺️ Maps**: Biblical geography dataset and Leaflet.js integration
- **📊 Analytics**: More NLP and text analysis features
- **🎨 Design**: UI/UX improvements and accessibility (WCAG 2.1 AA)
- **📜 Manuscripts**: Expanding the textual variant database
- **🌍 Translations**: Adding more public domain Bible translations
- **📝 Documentation**: Tutorials, API documentation, examples

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes with clear commit messages
3. Ensure `npm run build` passes
4. Submit a PR with a clear description of what changed and why

## Code of Conduct

Be respectful, constructive, and kind. BibleLens is a research tool — we welcome contributors of all backgrounds and beliefs.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
