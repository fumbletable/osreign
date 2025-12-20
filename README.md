# Olde Swords Reign

**Four classes. Infinite archetypes. Real danger.**

This repository contains the website for Olde Swords Reign, an OSR tabletop RPG.

## Website

- **Live site:** [osreign.com](https://osreign.com) (or [fumbletable.github.io/osreign](https://fumbletable.github.io/osreign))
- **Built with:** Jekyll + [Just the Docs](https://just-the-docs.com) theme
- **Hosted on:** GitHub Pages

## Local Development

```bash
# Install dependencies
bundle install

# Serve locally
bundle exec jekyll serve

# View at http://localhost:4000
```

## Ebook Generation

The EPUB is automatically generated via GitHub Actions when `second-edition/` content changes.

To build locally (requires [Pandoc](https://pandoc.org/installing.html)):

```bash
node scripts/generate-ebook.js
# Output: downloads/olde-swords-reign.epub
```

## License

Game content is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

Website theme ([Just the Docs](https://github.com/just-the-docs/just-the-docs)) is MIT licensed.

