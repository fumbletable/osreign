#!/usr/bin/env node
/**
 * OSWR Ebook Generator
 *
 * Combines all Second Edition markdown files into a single EPUB.
 * Run via: node scripts/generate-ebook.js
 *
 * Requires: pandoc installed (winget install pandoc / brew install pandoc)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SITE_ROOT = path.join(__dirname, '..');
const SECOND_EDITION = path.join(SITE_ROOT, 'second-edition');
const OUTPUT_DIR = path.join(SITE_ROOT, 'assets', 'downloads');
const TEMP_FILE = path.join(SITE_ROOT, '_combined.md'); // Temp file in root, not output dir

// Book structure - defines the reading order
const BOOK_STRUCTURE = [
  // Introduction
  { file: 'second-edition.md', title: 'Introduction' },

  // Players section
  { file: 'second-edition/players.md', title: 'Player\'s Guide' },
  { file: 'second-edition/players/rolling-dice.md' },
  { file: 'second-edition/players/key-terms.md' },
  { file: 'second-edition/players/character-creation.md' },
  { file: 'second-edition/players/character.md' },
  { file: 'second-edition/players/ancestry.md' },
  { file: 'second-edition/players/build-an-ancestry.md' },
  { file: 'second-edition/players/backgrounds.md' },
  { file: 'second-edition/players/hindrances.md' },
  { file: 'second-edition/players/classes.md' },
  { file: 'second-edition/players/fighter.md' },
  { file: 'second-edition/players/expert.md' },
  { file: 'second-edition/players/cleric.md' },
  { file: 'second-edition/players/magic-user.md' },
  { file: 'second-edition/players/feats.md' },
  { file: 'second-edition/players/general-feats.md' },
  { file: 'second-edition/players/fighter-feats.md' },
  { file: 'second-edition/players/expert-feats.md' },
  { file: 'second-edition/players/advancement.md' },
  { file: 'second-edition/players/economy.md' },
  { file: 'second-edition/players/weapons.md' },
  { file: 'second-edition/players/armor.md' },
  { file: 'second-edition/players/equipment.md' },
  { file: 'second-edition/players/adventuring-gear.md' },
  { file: 'second-edition/players/encumbrance.md' },
  { file: 'second-edition/players/magic.md' },
  { file: 'second-edition/players/spellbooks-and-research.md' },
  { file: 'second-edition/players/build-a-spell.md' },
  { file: 'second-edition/players/spell-index.md' },
  { file: 'second-edition/players/tier-1-spells.md' },
  { file: 'second-edition/players/tier-2-spells.md' },
  { file: 'second-edition/players/tier-3-spells.md' },
  { file: 'second-edition/players/tier-4-spells.md' },
  { file: 'second-edition/players/tier-5-spells.md' },
  { file: 'second-edition/players/tier-6-spells.md' },
  { file: 'second-edition/players/adventuring.md' },
  { file: 'second-edition/players/time-and-movement.md' },
  { file: 'second-edition/players/rests-recovery-fatigue.md' },
  { file: 'second-edition/players/combat.md' },
  { file: 'second-edition/players/exploration.md' },
  { file: 'second-edition/players/downtime.md' },
  { file: 'second-edition/players/hiring-help.md' },
  { file: 'second-edition/players/carousing.md' },

  // Refereeing section
  { file: 'second-edition/refereeing.md', title: 'Referee\'s Guide' },
  { file: 'second-edition/refereeing/principles.md' },
  { file: 'second-edition/refereeing/designer-commentary.md' },
  { file: 'second-edition/refereeing/dungeon-exploration.md' },
  { file: 'second-edition/refereeing/wilderness-exploration.md' },
  { file: 'second-edition/refereeing/doors-and-barriers.md' },
  { file: 'second-edition/refereeing/traps-and-hazards.md' },
  { file: 'second-edition/refereeing/reaction-rolls.md' },
  { file: 'second-edition/refereeing/retainers.md' },
  { file: 'second-edition/refereeing/bestiary.md' },
  { file: 'second-edition/refereeing/bestiary/monster-rules.md' },
  { file: 'second-edition/refereeing/bestiary/monsters-a.md' },
  { file: 'second-edition/refereeing/bestiary/monsters-b.md' },
  { file: 'second-edition/refereeing/bestiary/monsters-c.md' },
  { file: 'second-edition/refereeing/bestiary/monsters-d.md' },
  { file: 'second-edition/refereeing/bestiary/monsters-e.md' },
  { file: 'second-edition/refereeing/bestiary/monsters-f.md' },
  { file: 'second-edition/refereeing/bestiary/monsters-g.md' },
  { file: 'second-edition/refereeing/bestiary/monsters-h.md' },
  { file: 'second-edition/refereeing/bestiary/monsters-i.md' },
  { file: 'second-edition/refereeing/bestiary/monsters-j.md' },
  { file: 'second-edition/refereeing/bestiary/monsters-k.md' },
  { file: 'second-edition/refereeing/bestiary/monsters-l.md' },
  { file: 'second-edition/refereeing/bestiary/monsters-m.md' },
  { file: 'second-edition/refereeing/bestiary/monsters-n.md' },
  { file: 'second-edition/refereeing/bestiary/monsters-o.md' },
  { file: 'second-edition/refereeing/bestiary/monsters-p.md' },
  { file: 'second-edition/refereeing/bestiary/monsters-r.md' },
  { file: 'second-edition/refereeing/bestiary/monsters-s.md' },
  { file: 'second-edition/refereeing/bestiary/monsters-t.md' },
  { file: 'second-edition/refereeing/bestiary/monsters-u.md' },
  { file: 'second-edition/refereeing/bestiary/monsters-v.md' },
  { file: 'second-edition/refereeing/bestiary/monsters-w.md' },
  { file: 'second-edition/refereeing/bestiary/monsters-x.md' },
  { file: 'second-edition/refereeing/bestiary/monsters-y.md' },
  { file: 'second-edition/refereeing/bestiary/monsters-z.md' },
  { file: 'second-edition/refereeing/treasure.md' },
  { file: 'second-edition/refereeing/treasure/treasure-tables.md' },
  { file: 'second-edition/refereeing/generators.md' },
  { file: 'second-edition/refereeing/generators/npcs.md' },
  { file: 'second-edition/refereeing/generators/items.md' },
  { file: 'second-edition/refereeing/domain-play.md' },

  // Appendix
  { file: 'second-edition/appendix.md', title: 'Appendix' },
  { file: 'second-edition/appendix/terminology.md' },
];

/**
 * Strip YAML frontmatter from markdown content
 */
function stripFrontmatter(content) {
  const frontmatterRegex = /^---\n[\s\S]*?\n---\n/;
  return content.replace(frontmatterRegex, '');
}

/**
 * Convert Jekyll-style links to work in EPUB
 * e.g., [Combat](combat.md) or [Combat](../combat/)
 */
function convertLinks(content) {
  // Convert relative .md links
  content = content.replace(/\]\(([^)]+)\.md\)/g, '](#$1)');
  // Convert directory-style links (ending in /)
  content = content.replace(/\]\(\.\.\/([^)]+)\/\)/g, '](#$1)');
  content = content.replace(/\]\(([^)]+)\/\)/g, '](#$1)');
  return content;
}

/**
 * Extract title from frontmatter or first heading
 */
function extractTitle(content) {
  // Try frontmatter title
  const frontmatterMatch = content.match(/^---\n[\s\S]*?title:\s*(.+)\n[\s\S]*?---/);
  if (frontmatterMatch) {
    return frontmatterMatch[1].trim();
  }

  // Try first heading
  const headingMatch = content.match(/^#\s+(.+)$/m);
  if (headingMatch) {
    return headingMatch[1].trim();
  }

  return 'Untitled';
}

/**
 * Main build function
 */
function buildEbook() {
  console.log('Building OSWR Ebook...\n');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let combinedContent = '';
  let processedCount = 0;
  let skippedFiles = [];

  for (const entry of BOOK_STRUCTURE) {
    const filePath = path.join(SITE_ROOT, entry.file);

    if (!fs.existsSync(filePath)) {
      skippedFiles.push(entry.file);
      continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    const title = entry.title || extractTitle(content);

    // Process content
    content = stripFrontmatter(content);
    content = convertLinks(content);

    // Add page break before each chapter (except first)
    if (processedCount > 0) {
      combinedContent += '\n\n<div style="page-break-before: always;"></div>\n\n';
    }

    combinedContent += content + '\n\n';
    processedCount++;

    console.log(`  ✓ ${entry.file}`);
  }

  if (skippedFiles.length > 0) {
    console.log('\n  Skipped (not found):');
    skippedFiles.forEach(f => console.log(`    - ${f}`));
  }

  // Write combined markdown
  fs.writeFileSync(TEMP_FILE, combinedContent);
  console.log(`\n  Combined ${processedCount} files into temporary markdown`);

  // Generate EPUB with Pandoc
  const epubPath = path.join(OUTPUT_DIR, 'olde-swords-reign.epub');

  try {
    const cmd = `pandoc "${TEMP_FILE}" -o "${epubPath}" --metadata title="Olde Swords Reign" --metadata subtitle="Second Edition" --metadata author="Fumble Table" --metadata lang=en-GB --metadata rights="CC BY-SA 4.0" --toc --toc-depth=2`;
    console.log('\n  Running Pandoc...');
    execSync(cmd, { stdio: 'inherit' });
    console.log(`\n  ✓ Created: ${epubPath}`);

    // Clean up temp file
    fs.unlinkSync(TEMP_FILE);

    // Get file size
    const stats = fs.statSync(epubPath);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`  Size: ${sizeMB} MB`);

  } catch (error) {
    console.error('\n  ✗ Pandoc failed. Is it installed?');
    console.error('    Install with: winget install pandoc');
    console.error('    Or: https://pandoc.org/installing.html');
    process.exit(1);
  }

  console.log('\nDone!');
}

// Run
buildEbook();
