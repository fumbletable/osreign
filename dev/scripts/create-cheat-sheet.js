#!/usr/bin/env node

/**
 * Creates an OSWR 2e Cheat Sheet tab in the character sheet spreadsheet
 */

const { google } = require('googleapis');
const path = require('path');

async function getAuth() {
  const { authorize } = require(path.join('d:/Documents/8020Brain/brain', 'code', 'google', 'auth.js'));
  return await authorize();
}

async function createCheatSheet() {
  const auth = await getAuth();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1Z139dqlmht6WfHWbGjNxVWBq6fQ_a8kIe9QKmIbsR1Q';

  // First check if Cheat Sheet tab exists
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const existingTab = meta.data.sheets.find(s => s.properties.title === 'Cheat Sheet');

  if (!existingTab) {
    console.log('Creating Cheat Sheet tab...');
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{
          addSheet: {
            properties: { title: 'Cheat Sheet' }
          }
        }]
      }
    });
  } else {
    console.log('Cheat Sheet tab already exists, clearing...');
    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: 'Cheat Sheet!A:G'
    });
  }

  // Build cheat sheet data - two columns of content side by side
  const data = [
    // Row 1: Title
    ['OSWR 2e CHEAT SHEET', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],

    // CORE MECHANIC + COMBAT ACTIONS
    ['CORE MECHANIC', '', '', 'COMBAT ACTIONS', '', '', ''],
    ['d20 + Ability + PB vs DC or AC', '', '', 'Action', 'Description', '', ''],
    ['', '', '', 'Attack', 'Melee (STR) or Ranged (DEX) + PB vs AC', '', ''],
    ['EDGE / SETBACK', '', '', 'Cast Spell', 'See spell for casting time', '', ''],
    ['+1d6 / -1d6 to roll', '', '', 'Dash', 'Double movement this turn', '', ''],
    ['Stack with each other', '', '', 'Disengage', 'Move without provoking opportunity attacks', '', ''],
    ['Cancel each other out', '', '', 'Dodge', 'Attacks against you have SETBACK', '', ''],
    ['', '', '', 'Help', 'Give ally EDGE on next check', '', ''],
    ['ATTACK ROLLS', '', '', 'Hide', 'DEX check vs passive WIS', '', ''],
    ['Melee: d20 + STR + PB vs AC', '', '', 'Ready', 'Prepare action with trigger', '', ''],
    ['Ranged: d20 + DEX + PB vs AC', '', '', 'Use Object', 'Interact with item/environment', '', ''],
    ['Natural 20 = Critical (double damage dice)', '', '', '', '', '', ''],
    ['', '', '', 'BONUS ACTIONS', '', '', ''],
    ['INITIATIVE', '', '', 'Two-Weapon Fighting', 'Offhand attack (no ability mod to dmg)', '', ''],
    ['d20 + DEX vs DC 12', '', '', 'Some class abilities', 'Check your feats', '', ''],
    ['Pass = Act before enemies', '', '', '', '', '', ''],
    ['Fail = Act after enemies', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],

    // DEATH & DYING + FATIGUE
    ['DEATH & DYING (at 0 HP)', '', '', 'FATIGUE', '', '', ''],
    ['Roll 2d6 - Fatigue', 'Result', '', 'Level', 'Effect', '', ''],
    ['11+', 'Back up (CON or 1 HD of HP)', '', '1-2', '-1 per level to all checks & saves', '', ''],
    ['10', 'Stable, wake at 1 HP next turn', '', '3-4', 'Also: Speed becomes Slow', '', ''],
    ['5-9', 'Still dying (roll again next turn)', '', '5', 'Incapacitated (cannot act)', '', ''],
    ['4', 'Dead (one heroic action first)', '', '', '', '', ''],
    ['3 or less', 'Dead outright', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],

    // RESTS & RECOVERY + DCs
    ['RESTS & RECOVERY', '', '', 'DIFFICULTY CLASS (DC)', '', '', ''],
    ['', '', '', 'Difficulty', 'DC', '', ''],
    ['Breather (10 min)', '', '', 'Trivial', '5', '', ''],
    ['Spend 1 Supply = heal 1d4 + CON HP', '', '', 'Easy', '8', '', ''],
    ['OR CON save to remove 1 Fatigue', '', '', 'Medium', '12', '', ''],
    ['', '', '', 'Hard', '15', '', ''],
    ['Night\'s Rest (8 hours)', '', '', 'Very Hard', '18', '', ''],
    ['Spend Hit Dice to heal', '', '', 'Nearly Impossible', '21', '', ''],
    ['Remove 2 Fatigue', '', '', '', '', '', ''],
    ['Restore all spell slots', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],

    // BOOST DICE + CONDITIONS
    ['BOOST DICE', '', '', 'CONDITIONS (Quick Ref)', '', '', ''],
    ['Start: half PB (min 1) per session', '', '', 'Blinded', 'Auto-fail sight checks, attacks have SETBACK', '', ''],
    ['', '', '', 'Charmed', 'Can\'t attack charmer, charmer has EDGE social', '', ''],
    ['Class', 'Boost Use', '', 'Frightened', 'SETBACK while source visible, can\'t approach', '', ''],
    ['Any', '+1d6 to any roll', '', 'Paralyzed', 'Can\'t move/act, auto-fail STR/DEX, crits melee', '', ''],
    ['Fighter', 'Extra attack', '', 'Poisoned', 'SETBACK on attacks and ability checks', '', ''],
    ['Expert', 'Roll 2d6, keep best', '', 'Prone', 'SETBACK attacks, melee vs you has EDGE', '', ''],
    ['Cleric', 'Boost spell (see spell)', '', 'Restrained', 'Speed 0, SETBACK attacks, EDGE vs you', '', ''],
    ['Magic-User', 'Boost spell (see spell)', '', 'Stunned', 'Can\'t move/act, auto-fail STR/DEX saves', '', ''],
    ['', '', '', 'Unconscious', 'As paralyzed + unaware of surroundings', '', ''],
    ['', '', '', '', '', '', ''],

    // ENCUMBRANCE + RANGES/MOVEMENT
    ['ENCUMBRANCE', '', '', 'RANGES', '', '', ''],
    ['Base slots: 10 + STR modifier', '', '', 'Close', '5 ft (melee range)', '', ''],
    ['With backpack: +10 slots', '', '', 'Near', '30 ft', '', ''],
    ['100 coins = 1 slot', '', '', 'Far', '120 ft', '', ''],
    ['Bulky items = 2 slots', '', '', '', '', '', ''],
    ['Over limit = Slow + SETBACK physical', '', '', 'MOVEMENT', '', '', ''],
    ['', '', '', 'Normal', '30 ft per round', '', ''],
    ['ARMOR', '', '', 'Slow', '15 ft per round', '', ''],
    ['Type', 'AC', 'DEX Cap', 'Difficult terrain', 'Costs double movement', '', ''],
    ['None', '10 + DEX', 'Full', '', '', '', ''],
    ['Light (Leather)', '11 + DEX', 'Full', 'LIGHT SOURCES', '', '', ''],
    ['Medium (Chain)', '13 + DEX', '+2 max', 'Torch/Lantern', 'Near radius (30 ft)', '', ''],
    ['Heavy (Plate)', '16', 'None', 'Daylight spell', 'Far radius (120 ft)', '', ''],
    ['Shield', '+1 AC', '-', 'Darkvision', '60 ft (no color)', '', ''],

    ['', '', '', '', '', '', ''],
    ['SPELLCASTING QUICK REF', '', '', 'OPPORTUNITY ATTACKS', '', '', ''],
    ['Spell DC = 8 + PB + INT or WIS', '', '', 'When enemy leaves your reach', '', '', ''],
    ['Spell Attack = d20 + PB + INT or WIS', '', '', 'Use your Reaction', '', '', ''],
    ['Prepared = Level + casting ability', '', '', 'One melee attack', '', '', ''],
    ['Concentration: 1 spell at a time', '', '', 'Disengage prevents this', '', '', ''],
    ['If hit while concentrating: CON save DC 10', '', '', '', '', '', ''],
    ['or half damage taken (whichever higher)', '', '', '', '', '', ''],
  ];

  console.log('Writing cheat sheet data (' + data.length + ' rows)...');
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Cheat Sheet!A1',
    valueInputOption: 'RAW',
    requestBody: { values: data }
  });

  // Get the sheet ID for formatting
  const updatedMeta = await sheets.spreadsheets.get({ spreadsheetId });
  const cheatSheetTab = updatedMeta.data.sheets.find(s => s.properties.title === 'Cheat Sheet');
  const sheetId = cheatSheetTab.properties.sheetId;

  console.log('Applying formatting...');

  // Colors
  const darkHeader = { red: 0.102, green: 0.102, blue: 0.180 };
  const white = { red: 1, green: 1, blue: 1 };
  const lightGray = { red: 0.95, green: 0.95, blue: 0.95 };

  // Section header rows (0-indexed): 0 (title), 2, 20, 28, 39, 50, 57, 64
  const leftHeaderRows = [2, 20, 28, 39, 50, 57, 64];
  const rightHeaderRows = [2, 14, 20, 28, 39, 50, 54, 57, 60, 64];

  const formatRequests = [
    // Title row formatting
    {
      repeatCell: {
        range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 7 },
        cell: {
          userEnteredFormat: {
            backgroundColor: darkHeader,
            textFormat: { foregroundColor: white, bold: true, fontSize: 16 },
            horizontalAlignment: 'CENTER'
          }
        },
        fields: 'userEnteredFormat'
      }
    },
    // Merge title row
    {
      mergeCells: {
        range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 7 },
        mergeType: 'MERGE_ALL'
      }
    },
    // Column widths
    { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 200 }, fields: 'pixelSize' } },
    { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 1, endIndex: 2 }, properties: { pixelSize: 220 }, fields: 'pixelSize' } },
    { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 2, endIndex: 3 }, properties: { pixelSize: 70 }, fields: 'pixelSize' } },
    { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 3, endIndex: 4 }, properties: { pixelSize: 160 }, fields: 'pixelSize' } },
    { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 4, endIndex: 5 }, properties: { pixelSize: 280 }, fields: 'pixelSize' } },
    // Freeze first row
    { updateSheetProperties: { properties: { sheetId, gridProperties: { frozenRowCount: 1 } }, fields: 'gridProperties.frozenRowCount' } },
  ];

  // Add left section headers
  for (const row of leftHeaderRows) {
    formatRequests.push({
      repeatCell: {
        range: { sheetId, startRowIndex: row, endRowIndex: row + 1, startColumnIndex: 0, endColumnIndex: 3 },
        cell: {
          userEnteredFormat: {
            backgroundColor: darkHeader,
            textFormat: { foregroundColor: white, bold: true, fontSize: 11 }
          }
        },
        fields: 'userEnteredFormat'
      }
    });
  }

  // Add right section headers
  for (const row of rightHeaderRows) {
    formatRequests.push({
      repeatCell: {
        range: { sheetId, startRowIndex: row, endRowIndex: row + 1, startColumnIndex: 3, endColumnIndex: 6 },
        cell: {
          userEnteredFormat: {
            backgroundColor: darkHeader,
            textFormat: { foregroundColor: white, bold: true, fontSize: 11 }
          }
        },
        fields: 'userEnteredFormat'
      }
    });
  }

  // Alternating row colors for readability in some sections
  // Death table rows 22-26
  for (let row = 22; row <= 26; row++) {
    if (row % 2 === 0) {
      formatRequests.push({
        repeatCell: {
          range: { sheetId, startRowIndex: row, endRowIndex: row + 1, startColumnIndex: 0, endColumnIndex: 3 },
          cell: { userEnteredFormat: { backgroundColor: lightGray } },
          fields: 'userEnteredFormat'
        }
      });
    }
  }

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: { requests: formatRequests }
  });

  console.log('Done!');
  console.log('View: https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/edit#gid=' + sheetId);
}

createCheatSheet().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
