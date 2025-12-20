/**
 * OSWR Character Sheet Generator (2nd Edition)
 * Generates a form-fillable PDF character sheet for Olde Swords Reign
 * Single-page portrait layout optimized for online play
 *
 * Usage: node generate-character-sheet.js
 * Output: character-sheet-v4.pdf
 */

const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');

// Page dimensions (A4 Portrait)
const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const MARGIN = 20;

// Colors
const BLACK = rgb(0, 0, 0);
const GRAY = rgb(0.4, 0.4, 0.4);

async function generateCharacterSheet() {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  const form = pdfDoc.getForm();

  const contentWidth = PAGE_WIDTH - (2 * MARGIN);
  let y = PAGE_HEIGHT - MARGIN;

  // === HEADER ===
  page.drawText('OLDE SWORDS REIGN', { x: MARGIN, y: y - 5, size: 16, font: fontBold, color: BLACK });
  page.drawText('2nd Edition', { x: MARGIN + 175, y: y - 5, size: 10, font: font, color: GRAY });

  page.drawText('Character', { x: PAGE_WIDTH - MARGIN - 250, y: y - 5, size: 9, font: font, color: GRAY });
  const nameField = form.createTextField('character_name');
  nameField.addToPage(page, { x: PAGE_WIDTH - MARGIN - 200, y: y - 12, width: 200, height: 18, borderWidth: 1 });

  y -= 30;

  // === IDENTITY ROW ===
  page.drawText('Ancestry', { x: MARGIN, y: y, size: 8, font: font, color: GRAY });
  const ancestryField = form.createTextField('ancestry');
  ancestryField.addToPage(page, { x: MARGIN, y: y - 16, width: 100, height: 14, borderWidth: 1 });

  page.drawText('Class', { x: MARGIN + 110, y: y, size: 8, font: font, color: GRAY });
  const classField = form.createTextField('class');
  classField.addToPage(page, { x: MARGIN + 110, y: y - 16, width: 100, height: 14, borderWidth: 1 });

  page.drawText('Level', { x: MARGIN + 220, y: y, size: 8, font: font, color: GRAY });
  const levelField = form.createTextField('level');
  levelField.addToPage(page, { x: MARGIN + 220, y: y - 16, width: 40, height: 14, borderWidth: 1 });

  page.drawText('PB', { x: MARGIN + 270, y: y, size: 8, font: font, color: GRAY });
  const pbField = form.createTextField('prof_bonus');
  pbField.addToPage(page, { x: MARGIN + 270, y: y - 16, width: 30, height: 14, borderWidth: 1 });

  page.drawText('Background', { x: MARGIN + 310, y: y, size: 8, font: font, color: GRAY });
  const bgField = form.createTextField('background');
  bgField.addToPage(page, { x: MARGIN + 310, y: y - 16, width: 130, height: 14, borderWidth: 1 });

  page.drawText('XP', { x: MARGIN + 450, y: y, size: 8, font: font, color: GRAY });
  const xpField = form.createTextField('xp');
  xpField.addToPage(page, { x: MARGIN + 450, y: y - 16, width: 85, height: 14, borderWidth: 1 });

  y -= 35;

  page.drawText('Languages', { x: MARGIN, y: y, size: 8, font: font, color: GRAY });
  const langField = form.createTextField('languages');
  langField.addToPage(page, { x: MARGIN + 55, y: y - 4, width: contentWidth - 55, height: 14, borderWidth: 1 });

  y -= 25;

  // === MAIN CONTENT - THREE COLUMNS ===
  const leftColWidth = 95;
  const midColWidth = 230;
  const rightColWidth = contentWidth - leftColWidth - midColWidth - 20;
  const leftX = MARGIN;
  const midX = MARGIN + leftColWidth + 10;
  const rightX = MARGIN + leftColWidth + midColWidth + 20;

  // ============================================
  // LEFT COLUMN: Abilities, Fatigue, Boost, Death
  // ============================================
  let leftY = y;

  page.drawText('ABILITIES', { x: leftX, y: leftY, size: 10, font: fontBold, color: BLACK });
  leftY -= 18;

  page.drawText('Ability', { x: leftX, y: leftY, size: 7, font: font, color: GRAY });
  page.drawText('Save?', { x: leftX + 55, y: leftY, size: 7, font: font, color: GRAY });
  leftY -= 14;

  const abilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];

  for (const ab of abilities) {
    page.drawText(ab, { x: leftX, y: leftY, size: 10, font: fontBold, color: BLACK });
    const modField = form.createTextField(`ability_${ab.toLowerCase()}`);
    modField.addToPage(page, { x: leftX + 28, y: leftY - 4, width: 24, height: 16, borderWidth: 1 });
    const saveProf = form.createCheckBox(`save_${ab.toLowerCase()}_prof`);
    saveProf.addToPage(page, { x: leftX + 60, y: leftY - 2, width: 14, height: 14 });
    leftY -= 22;
  }

  leftY -= 10;

  // FATIGUE
  page.drawText('FATIGUE', { x: leftX, y: leftY, size: 9, font: fontBold, color: BLACK });
  leftY -= 10;
  page.drawText('(-1 each, 3+=Slow, 5=Down)', { x: leftX, y: leftY, size: 6, font: font, color: GRAY });
  leftY -= 14;

  for (let i = 1; i <= 5; i++) {
    const fatBox = form.createCheckBox(`fatigue_${i}`);
    fatBox.addToPage(page, { x: leftX + ((i - 1) * 18), y: leftY - 2, width: 14, height: 14 });
  }
  for (let i = 1; i <= 5; i++) {
    page.drawText(`${i}`, { x: leftX + 3 + ((i - 1) * 18), y: leftY - 14, size: 7, font: font, color: GRAY });
  }

  leftY -= 28;

  // BOOST DICE
  page.drawText('BOOST DICE', { x: leftX, y: leftY, size: 9, font: fontBold, color: BLACK });
  leftY -= 14;

  for (let i = 1; i <= 4; i++) {
    const boostBox = form.createCheckBox(`boost_${i}`);
    boostBox.addToPage(page, { x: leftX + ((i - 1) * 18), y: leftY - 2, width: 14, height: 14 });
  }

  leftY -= 22;

  page.drawText('Hook:', { x: leftX, y: leftY, size: 7, font: font, color: GRAY });
  const hookField = form.createTextField('boost_hook');
  hookField.addToPage(page, { x: leftX, y: leftY - 16, width: 90, height: 14, borderWidth: 1 });

  leftY -= 38;

  // DEATH & DYING
  page.drawText('DEATH (2d6 - Fatigue)', { x: leftX, y: leftY, size: 8, font: fontBold, color: BLACK });
  leftY -= 11;
  page.drawText('11+ Up | 10 Stable', { x: leftX, y: leftY, size: 7, font: font, color: GRAY });
  leftY -= 9;
  page.drawText('5-9 Dying | 4 Hero', { x: leftX, y: leftY, size: 7, font: font, color: GRAY });
  leftY -= 9;
  page.drawText('3- Dead', { x: leftX, y: leftY, size: 7, font: font, color: GRAY });

  leftY -= 18;

  // RULES REFERENCE
  page.drawText('QUICK RULES', { x: leftX, y: leftY, size: 8, font: fontBold, color: BLACK });
  leftY -= 12;

  page.drawText('Checks & Attacks', { x: leftX, y: leftY, size: 7, font: fontBold, color: GRAY });
  leftY -= 9;
  page.drawText('d20 + Ability + PB', { x: leftX, y: leftY, size: 7, font: font, color: GRAY });
  leftY -= 9;
  page.drawText('vs DC or AC', { x: leftX, y: leftY, size: 7, font: font, color: GRAY });

  leftY -= 12;

  page.drawText('EDGE / SETBACK', { x: leftX, y: leftY, size: 7, font: fontBold, color: GRAY });
  leftY -= 9;
  page.drawText('+1d6 / -1d6 to roll', { x: leftX, y: leftY, size: 7, font: font, color: GRAY });

  leftY -= 12;

  page.drawText('Rests', { x: leftX, y: leftY, size: 7, font: fontBold, color: GRAY });
  leftY -= 9;
  page.drawText('Breather (10min):', { x: leftX, y: leftY, size: 6, font: font, color: GRAY });
  leftY -= 8;
  page.drawText('1 Supply = 1d4+CON HP', { x: leftX, y: leftY, size: 6, font: font, color: GRAY });
  leftY -= 8;
  page.drawText('or CON save to -1 Fatigue', { x: leftX, y: leftY, size: 6, font: font, color: GRAY });
  leftY -= 10;
  page.drawText('Night (8hr):', { x: leftX, y: leftY, size: 6, font: font, color: GRAY });
  leftY -= 8;
  page.drawText('Spend HD to heal, -2 Fatigue', { x: leftX, y: leftY, size: 6, font: font, color: GRAY });
  leftY -= 8;
  page.drawText('Restore spell slots', { x: leftX, y: leftY, size: 6, font: font, color: GRAY });

  // ============================================
  // MIDDLE COLUMN: Combat, Armor, Weapons, Equipment
  // ============================================
  let midY = y;

  // COMBAT - at the top
  page.drawText('COMBAT', { x: midX, y: midY, size: 10, font: fontBold, color: BLACK });
  midY -= 18;

  // AC circle
  page.drawCircle({ x: midX + 22, y: midY - 15, size: 20, borderColor: BLACK, borderWidth: 1.5 });
  page.drawText('AC', { x: midX + 15, y: midY - 30, size: 8, font: font, color: GRAY });
  const acField = form.createTextField('ac');
  acField.addToPage(page, { x: midX + 8, y: midY - 22, width: 28, height: 16, borderWidth: 0 });

  // HP
  page.drawText('HP', { x: midX + 55, y: midY, size: 8, font: font, color: GRAY });
  const hpField = form.createTextField('hp_current');
  hpField.addToPage(page, { x: midX + 55, y: midY - 18, width: 28, height: 16, borderWidth: 1 });
  page.drawText('/', { x: midX + 85, y: midY - 13, size: 10, font: font, color: BLACK });
  const hpMaxField = form.createTextField('hp_max');
  hpMaxField.addToPage(page, { x: midX + 92, y: midY - 18, width: 28, height: 16, borderWidth: 1 });

  // Hit Dice
  page.drawText('Hit Dice', { x: midX + 130, y: midY, size: 8, font: font, color: GRAY });
  const hdField = form.createTextField('hit_dice');
  hdField.addToPage(page, { x: midX + 130, y: midY - 18, width: 50, height: 16, borderWidth: 1 });

  // Speed
  page.drawText('Speed', { x: midX + 190, y: midY, size: 8, font: font, color: GRAY });
  const speedSlow = form.createCheckBox('speed_slow');
  speedSlow.addToPage(page, { x: midX + 190, y: midY - 16, width: 10, height: 10 });
  page.drawText('Slow', { x: midX + 202, y: midY - 14, size: 6, font: font, color: BLACK });
  const speedNorm = form.createCheckBox('speed_normal');
  speedNorm.addToPage(page, { x: midX + 190, y: midY - 28, width: 10, height: 10 });
  page.drawText('Norm', { x: midX + 202, y: midY - 26, size: 6, font: font, color: BLACK });

  midY -= 45;

  // ARMOR
  page.drawText('ARMOR', { x: midX, y: midY, size: 10, font: fontBold, color: BLACK });
  midY -= 15;

  page.drawText('Type', { x: midX, y: midY, size: 7, font: font, color: GRAY });
  const armorType = form.createTextField('armor_type');
  armorType.addToPage(page, { x: midX + 25, y: midY - 4, width: 130, height: 14, borderWidth: 1 });

  page.drawText('DEX cap', { x: midX + 165, y: midY, size: 7, font: font, color: GRAY });
  const dexCap = form.createTextField('armor_dex_cap');
  dexCap.addToPage(page, { x: midX + 200, y: midY - 4, width: 25, height: 14, borderWidth: 1 });

  midY -= 25;

  // WEAPONS
  page.drawText('WEAPONS', { x: midX, y: midY, size: 10, font: fontBold, color: BLACK });
  midY -= 12;

  page.drawText('Name', { x: midX, y: midY, size: 7, font: font, color: GRAY });
  page.drawText('Atk', { x: midX + 95, y: midY, size: 7, font: font, color: GRAY });
  page.drawText('Dmg', { x: midX + 130, y: midY, size: 7, font: font, color: GRAY });
  page.drawText('Range', { x: midX + 175, y: midY, size: 7, font: font, color: GRAY });
  midY -= 12;

  for (let i = 1; i <= 3; i++) {
    const wName = form.createTextField(`weapon_${i}_name`);
    wName.addToPage(page, { x: midX, y: midY - 12, width: 90, height: 14, borderWidth: 1 });

    const wAtk = form.createTextField(`weapon_${i}_atk`);
    wAtk.addToPage(page, { x: midX + 93, y: midY - 12, width: 32, height: 14, borderWidth: 1 });

    const wDmg = form.createTextField(`weapon_${i}_dmg`);
    wDmg.addToPage(page, { x: midX + 128, y: midY - 12, width: 42, height: 14, borderWidth: 1 });

    const wRange = form.createTextField(`weapon_${i}_range`);
    wRange.addToPage(page, { x: midX + 173, y: midY - 12, width: 50, height: 14, borderWidth: 1 });

    midY -= 18;
  }

  midY -= 3;

  // Ammo
  page.drawText('Ammo:', { x: midX, y: midY, size: 8, font: font, color: BLACK });
  for (let i = 0; i < 10; i++) {
    const ammoBox = form.createCheckBox(`ammo_${i + 1}`);
    ammoBox.addToPage(page, { x: midX + 38 + (i * 14), y: midY - 3, width: 12, height: 12 });
  }
  midY -= 15;
  for (let i = 10; i < 20; i++) {
    const ammoBox = form.createCheckBox(`ammo_${i + 1}`);
    ammoBox.addToPage(page, { x: midX + 38 + ((i - 10) * 14), y: midY - 3, width: 12, height: 12 });
  }

  midY -= 22;

  // EQUIPMENT
  page.drawText('EQUIPMENT', { x: midX, y: midY, size: 10, font: fontBold, color: BLACK });
  page.drawText('Slots:', { x: midX + 80, y: midY, size: 7, font: font, color: GRAY });
  const slotsUsed = form.createTextField('slots_used');
  slotsUsed.addToPage(page, { x: midX + 105, y: midY - 4, width: 22, height: 12, borderWidth: 1 });
  page.drawText('/', { x: midX + 129, y: midY - 2, size: 10, font: font, color: BLACK });
  const slotsMax = form.createTextField('slots_max');
  slotsMax.addToPage(page, { x: midX + 135, y: midY - 4, width: 22, height: 12, borderWidth: 1 });
  page.drawText('(10+STR, +10 pack)', { x: midX + 160, y: midY, size: 5, font: font, color: GRAY });

  midY -= 18;

  // Equipment list - fills remaining space (no notes, just coins at bottom)
  const equipBottom = MARGIN + 22;  // Just room for coins
  const equipHeight = midY - equipBottom;
  const equipField = form.createTextField('equipment');
  equipField.addToPage(page, { x: midX, y: equipBottom, width: midColWidth - 5, height: equipHeight, borderWidth: 1 });
  equipField.enableMultiline();

  // Coins at bottom of middle column
  const coinsY = MARGIN + 5;
  page.drawText('Coins:', { x: midX, y: coinsY, size: 8, font: fontBold, color: BLACK });

  page.drawText('GP', { x: midX + 40, y: coinsY, size: 7, font: font, color: GRAY });
  const gpField = form.createTextField('coins_gp');
  gpField.addToPage(page, { x: midX + 55, y: coinsY - 4, width: 45, height: 12, borderWidth: 1 });

  page.drawText('SP', { x: midX + 105, y: coinsY, size: 7, font: font, color: GRAY });
  const spField = form.createTextField('coins_sp');
  spField.addToPage(page, { x: midX + 118, y: coinsY - 4, width: 45, height: 12, borderWidth: 1 });

  page.drawText('CP', { x: midX + 168, y: coinsY, size: 7, font: font, color: GRAY });
  const cpField = form.createTextField('coins_cp');
  cpField.addToPage(page, { x: midX + 182, y: coinsY - 4, width: 45, height: 12, borderWidth: 1 });

  // ============================================
  // RIGHT COLUMN: Feats, Hindrances, Spellcasting
  // ============================================
  let rightY = y;

  // FEATS - bigger
  page.drawText('FEATS & ABILITIES', { x: rightX, y: rightY, size: 10, font: fontBold, color: BLACK });
  rightY -= 15;

  const featsHeight = 140;
  const featsField = form.createTextField('feats');
  featsField.addToPage(page, { x: rightX, y: rightY - featsHeight, width: rightColWidth, height: featsHeight, borderWidth: 1 });
  featsField.enableMultiline();

  rightY -= featsHeight + 12;

  // HINDRANCES
  page.drawText('HINDRANCES', { x: rightX, y: rightY, size: 10, font: fontBold, color: BLACK });
  rightY -= 15;

  const hindrancesField = form.createTextField('hindrances');
  hindrancesField.addToPage(page, { x: rightX, y: rightY - 35, width: rightColWidth, height: 35, borderWidth: 1 });
  hindrancesField.enableMultiline();

  rightY -= 52;

  // SPELLCASTING
  page.drawText('SPELLCASTING', { x: rightX, y: rightY, size: 10, font: fontBold, color: BLACK });
  rightY -= 18;

  page.drawText('DC', { x: rightX, y: rightY, size: 8, font: font, color: GRAY });
  const spellDC = form.createTextField('spell_dc');
  spellDC.addToPage(page, { x: rightX + 18, y: rightY - 4, width: 28, height: 14, borderWidth: 1 });

  page.drawText('Atk', { x: rightX + 55, y: rightY, size: 8, font: font, color: GRAY });
  const spellAtk = form.createTextField('spell_atk');
  spellAtk.addToPage(page, { x: rightX + 75, y: rightY - 4, width: 28, height: 14, borderWidth: 1 });

  page.drawText('Prep', { x: rightX + 112, y: rightY, size: 8, font: font, color: GRAY });
  const spellPrep = form.createTextField('spells_prepared_count');
  spellPrep.addToPage(page, { x: rightX + 135, y: rightY - 4, width: 28, height: 14, borderWidth: 1 });

  rightY -= 25;

  // Spell slots - two rows
  page.drawText('Slots:', { x: rightX, y: rightY, size: 8, font: font, color: GRAY });
  const tiers = ['1st', '2nd', '3rd', '4th', '5th', '6th'];
  for (let i = 0; i < 3; i++) {
    const tierX = rightX + 35 + (i * 45);
    page.drawText(tiers[i], { x: tierX, y: rightY, size: 7, font: font, color: GRAY });
    const slotField = form.createTextField(`spell_slot_${i + 1}`);
    slotField.addToPage(page, { x: tierX + 18, y: rightY - 4, width: 22, height: 14, borderWidth: 1 });
  }
  rightY -= 20;
  for (let i = 3; i < 6; i++) {
    const tierX = rightX + 35 + ((i - 3) * 45);
    page.drawText(tiers[i], { x: tierX, y: rightY, size: 7, font: font, color: GRAY });
    const slotField = form.createTextField(`spell_slot_${i + 1}`);
    slotField.addToPage(page, { x: tierX + 18, y: rightY - 4, width: 22, height: 14, borderWidth: 1 });
  }

  rightY -= 25;

  // Prepared spells - fills to bottom (no notes section)
  page.drawText('Prepared Spells:', { x: rightX, y: rightY, size: 8, font: font, color: GRAY });
  rightY -= 12;

  const preparedBottom = MARGIN;
  const preparedHeight = rightY - preparedBottom;
  const preparedField = form.createTextField('prepared_spells');
  preparedField.addToPage(page, { x: rightX, y: preparedBottom, width: rightColWidth, height: preparedHeight, borderWidth: 1 });
  preparedField.enableMultiline();

  // Save PDF
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('character-sheet-v5.pdf', pdfBytes);
  console.log('Character sheet generated: character-sheet-v5.pdf');
}

generateCharacterSheet().catch(console.error);
