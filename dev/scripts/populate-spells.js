#!/usr/bin/env node

/**
 * Populates the OSWR character sheet Spells tab with all spell data
 */

const { google } = require('googleapis');
const path = require('path');

async function getAuth() {
  const { authorize } = require(path.join('d:/Documents/8020Brain/brain', 'code', 'google', 'auth.js'));
  return await authorize();
}

async function populateSpells() {
  const auth = await getAuth();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1Z139dqlmht6WfHWbGjNxVWBq6fQ_a8kIe9QKmIbsR1Q';

  console.log('Building spell data...');

  // Build spell data - columns: Tier, Class, Name, Casting Time, Range, Duration, Effect, Boost
  const spellData = [
    ['Tier', 'Class', 'Name', 'Casting Time', 'Range', 'Duration', 'Effect', 'Boost'],

    // ========== TIER 1 ==========
    // TIER 1 - CLERIC
    ['1', 'Cleric', 'Bless', '1 Action', 'Near (30 ft)', '1 Turn (10 minutes)', 'Allies in area gain +1 to attack rolls and saves vs fear.', 'Bonuses increase to +2.'],
    ['1', 'Cleric', 'Command', '1 Action', 'Near (30 ft)', 'PB rounds', 'Speak one word; target obeys if it fails a WIS spell save. Examples: Halt, Flee, Drop, Approach.', 'Target suffers SETBACK on save.'],
    ['1', 'Cleric', 'Cure Light Wounds', '1 Action', 'Touch', 'Instant', 'Heal 1 creature for 1d6 + PB HP.', '+1d6 HP.'],
    ['1', 'Cleric', 'Detect Evil', '1 Action or Ritual', 'Self (Near radius)', 'PB Turns', 'Sense hostile intent, unholy creatures, or cursed items within area.', 'Duration +1 Turn.'],
    ['1', 'Cleric', 'Detect Magic', '1 Action or Ritual', 'Self (Near radius)', 'PB Turns', 'Magical items, spells, or glyphs glow faintly.', 'Duration +1 Turn.'],
    ['1', 'Cleric', 'Light', '1 Action or Ritual', 'Near (30 ft)', '1 hour', 'Cast on object: glows like a torch. Cast on creature eyes: blinds if CON spell save fails.', 'Duration +1 hour.'],
    ['1', 'Cleric', 'Protection from Evil', '1 Action', 'Touch', 'PB Turns', 'Target gains +1 AC and saves vs evil creatures; cannot be magically charmed/controlled.', 'Affect 1 additional ally.'],
    ['1', 'Cleric', 'Purify Food & Drink', '1 Action or Ritual', 'Touch', 'Instant', 'Cleanse food/drink for up to PB creatures for one day. Spoiled or poisoned items become safe.', 'Double the amount affected.'],
    ['1', 'Cleric', 'Remove Fear', '1 Action', 'Touch', 'Instant', 'Calms one frightened creature. If target is under magical fear, they get a new save with EDGE.', 'Affect +1 creature.'],

    // TIER 1 - MAGIC-USER
    ['1', 'Magic-User', 'Charm Person', '1 Action', 'Near (30 ft)', 'Special', 'One humanoid that fails WIS spell save regards caster as trusted ally. Hostile acts end effect. Target repeats save: daily (INT 13+), weekly (INT 9-12), or monthly (INT 8-).', 'Target has SETBACK on initial save.'],
    ['1', 'Magic-User', 'Detect Magic', '1 Action or Ritual', 'Self (Near radius)', 'PB Turns', 'Magical items, spells, or glyphs glow faintly.', 'Duration +1 Turn.'],
    ['1', 'Magic-User', 'Floating Disc', '1 Action', 'Self', '1 hour', 'A 3-ft disc follows caster, carrying up to 500 lb. Moves at walking pace.', 'Duration +1 hour.'],
    ['1', 'Magic-User', 'Hold Portal', '1 Action', 'Near (30 ft)', '1 Turn (10 minutes)', 'Keeps 1 door/gate shut; STR 18 or magic required to open.', 'Duration +1 Turn.'],
    ['1', 'Magic-User', 'Light', '1 Action or Ritual', 'Near (30 ft)', '1 hour', 'Cast on object: glows like a torch. Cast on creature eyes: blinds if CON spell save fails.', 'Duration +1 hour.'],
    ['1', 'Magic-User', 'Magic Missile', '1 Action', 'Far (120 ft)', 'Instant', 'Fire PB darts of force, each dealing 1d4+1 damage (auto-hit). Darts can target one creature or several.', '+1 dart.'],
    ['1', 'Magic-User', 'Protection from Evil', '1 Action', 'Touch', 'PB Turns', 'Target gains +1 AC and saves vs evil creatures; cannot be magically charmed/controlled.', 'Affect 1 additional ally.'],
    ['1', 'Magic-User', 'Read Languages', '1 Action or Ritual', 'Self', '1 Turn (10 minutes)', 'Understand written languages (not magical script).', 'Duration +1 Turn.'],
    ['1', 'Magic-User', 'Read Magic', '1 Action or Ritual', 'Self', '1 Turn (10 minutes)', 'Read scrolls, glyphs, or spellbooks. Required to learn spells.', 'Duration +1 Turn.'],
    ['1', 'Magic-User', 'Shield', '1 Action', 'Self', '1 Turn (10 minutes)', '+4 AC vs missiles, +2 AC vs melee. Negates Magic Missile.', 'Duration +1 Turn.'],
    ['1', 'Magic-User', 'Sleep', '1 Action', 'Near (30 ft)', '1 Turn or until harmed/shaken', 'Puts creatures with total HD = 2d8 to sleep (lowest HD first). Creatures with 5+ HD are immune. No save.', '+1d4 HD affected.'],
    ['1', 'Magic-User', 'Ventriloquism', '1 Action', 'Near (30 ft)', '1 Turn (10 minutes)', 'Project your voice from an object/location.', 'Duration +1 Turn.'],

    // TIER 1 - DRUID
    ['1', 'Druid', 'Animal Friendship', '1 Action', 'Near (30 ft)', 'Until broken', 'One natural animal that fails WIS spell save becomes friendly, obeying simple requests. Bond lasts until caster mistreats the animal.', 'Affect 1 additional animal.'],
    ['1', 'Druid', 'Cure Light Wounds', '1 Action', 'Touch', 'Instant', 'Heal 1 creature for 1d6 + PB HP.', '+1d6 HP.'],
    ['1', 'Druid', 'Detect Magic', '1 Action or Ritual', 'Self (Near radius)', 'PB Turns', 'Magical items, spells, or glyphs glow faintly.', 'Duration +1 Turn.'],
    ['1', 'Druid', 'Entangle', '1 Action', 'Near (30 ft)', 'Concentration, 1 Turn', 'Plants restrain creatures in a 20-ft area. DEX spell save or Speed = 0.', 'Expand to 30 ft or add SETBACK to escape.'],
    ['1', 'Druid', 'Faerie Fire', '1 Action', 'Near (30 ft)', '1 Turn (10 minutes)', 'Outline creatures/objects in light. Attacks vs outlined targets gain EDGE.', 'Duration +1 Turn.'],
    ['1', 'Druid', 'Pass Without Trace', '1 Action or Ritual', 'Touch', '1 Turn', 'Up to PB creatures leave no tracks, scent, or trail. Tracking attempts automatically fail.', 'Duration +1 Turn.'],
    ['1', 'Druid', 'Shillelagh', '1 Action', 'Touch', '1 Turn', 'A wooden club or staff becomes magical (+1 to hit, deals 1d8 damage).', 'Duration +1 Turn.'],
    ['1', 'Druid', 'Speak with Animals', '1 Action or Ritual', 'Self (Near)', '1 Turn (10 minutes)', 'Communicate simple ideas with beasts.', 'Duration +1 Turn.'],

    // ========== TIER 2 ==========
    // TIER 2 - CLERIC
    ['2', 'Cleric', 'Augury', '1 Turn or Ritual', 'Self', 'Instant', 'Ask your deity about a specific course of action within the next hour. Receive: weal (good), woe (bad), weal and woe (both), or nothing (unclear).', 'Ask about a second action.'],
    ['2', 'Cleric', 'Bless Water', '1 Turn or Ritual', 'Touch', 'Permanent', 'Convert 1 flask of water into holy water.', '+1 flask.'],
    ['2', 'Cleric', 'Find Traps', '1 Action or Ritual', 'Self (cone, Near)', 'PB Turns', 'Detects traps (mechanical or magical) in area. Exact nature not revealed.', '+1 Turn duration.'],
    ['2', 'Cleric', 'Hold Person', '1 Action', 'Near (30 ft)', '1 Turn (10 minutes)', 'Up to 3 humanoids must make WIS spell save or be paralysed. Target may repeat save at end of each round.', '+1 target.'],
    ['2', 'Cleric', 'Resist Elements', '1 Action', 'Touch', '1 Turn (10 minutes)', 'Choose fire or cold when preparing. Target gains EDGE on saves and takes half damage from that element.', 'Affect +1 additional creature.'],
    ['2', 'Cleric', 'Silence 15 ft Radius', '1 Action', 'Near (30 ft)', '1 Turn (10 minutes)', 'Cast on point or object: 15-ft sphere of total silence. No sound, speech, or spellcasting within.', 'Radius increases to 20 ft.'],
    ['2', 'Cleric', 'Speak with Animals', '1 Action or Ritual', 'Self (Near)', 'PB Turns', 'Communicate simple ideas with animals.', '+1 Turn duration.'],
    ['2', 'Cleric', 'Spiritual Hammer', '1 Action', 'Near (30 ft)', 'Concentration, 1 Turn', 'Spectral weapon attacks one target per round. Uses caster attack bonus, deals 1d6+PB force damage. Magical.', '+1d6 damage on one hit.'],

    // TIER 2 - MAGIC-USER
    ['2', 'Magic-User', 'Continual Light', '1 Action or Ritual', 'Near (30 ft)', 'Permanent until dispelled', 'Object shines like daylight (Far radius). Can blind a creature if CON spell save fails.', 'Affects 2 objects.'],
    ['2', 'Magic-User', 'Darkness 15 ft Radius', '1 Action', 'Near (30 ft)', '1 Turn (10 minutes)', 'Creates a sphere of magical darkness. Normal vision and darkvision fail.', 'Radius increases to 20 ft.'],
    ['2', 'Magic-User', 'Detect Evil', '1 Action or Ritual', 'Self (Near radius)', 'PB Turns', 'Sense hostile intent, unholy creatures, or cursed items within area.', 'Duration +1 Turn.'],
    ['2', 'Magic-User', 'Detect Invisibility', '1 Action', 'Self', 'PB Turns', 'Invisible creatures/objects within Near glow faintly.', '+1 Turn duration.'],
    ['2', 'Magic-User', 'ESP', '1 Action', 'Near (30 ft)', 'Concentration, up to 1 Turn', 'Read surface thoughts of 1 creature. WIS spell save resists.', '+1 creature.'],
    ['2', 'Magic-User', 'Invisibility', '1 Action', 'Touch', 'Until broken (attacking/casting ends it)', 'Target becomes invisible; objects carried vanish too.', 'Affect +1 target.'],
    ['2', 'Magic-User', 'Knock', '1 Action', 'Near (30 ft)', 'Instant', 'Opens 1 locked/stuck door, chest, or portal.', 'Range extends to Far.'],
    ['2', 'Magic-User', 'Levitate', '1 Action', 'Near (30 ft)', '1 Turn (10 minutes)', 'Caster or 1 creature rises/descends 15 ft per round. Cannot move horizontally.', '+1 Turn duration.'],
    ['2', 'Magic-User', 'Locate Object', '1 Action or Ritual', 'Self', 'Concentration, PB Turns', 'Sense direction of a familiar object within 60 ft.', 'Range doubles.'],
    ['2', 'Magic-User', 'Mirror Image', '1 Action', 'Self', '1 Turn (10 minutes)', 'Creates 1d4 illusory duplicates. Attacks hit images before caster.', 'Create +1 image.'],
    ['2', 'Magic-User', 'Phantasmal Force', '1 Action', 'Near (30 ft)', 'Concentration, up to 1 Turn', 'Creates visual illusion up to 15-ft cube. No sound, smell, or texture. WIS spell save to disbelieve on interaction.', 'Expand to 30-ft cube.'],
    ['2', 'Magic-User', 'Web', '1 Action', 'Near (30 ft)', '1 Turn (10 minutes)', 'Fill 15-ft cube with sticky webs. DEX spell save or Speed = 0. Fire destroys webs instantly.', 'Expand to 30-ft cube.'],

    // TIER 2 - DRUID
    ['2', 'Druid', 'Barkskin', '1 Action', 'Touch', '1 Turn (10 minutes)', 'Target AC = 16 if armor is lower.', 'Duration +1 Turn.'],
    ['2', 'Druid', 'Flame Blade', '1 Action', 'Self', '1 Turn (10 minutes)', 'Creates fiery blade (1d6 fire damage, Finesse). Counts as magical.', 'Damage increases to 1d8.'],
    ['2', 'Druid', 'Heat Metal', '1 Action', 'Near (30 ft)', 'Concentration, 1 Turn', '1 metal object glows red-hot. Creature holding/wearing it takes 2d6 fire damage initially, then 1d6 each round.', '+1 item.'],
    ['2', 'Druid', 'Obscuring Mist', '1 Action', 'Self (Near radius)', '1 Turn (10 minutes)', 'Fog fills area; attacks beyond Close have SETBACK.', 'Duration +1 Turn.'],
    ['2', 'Druid', 'Produce Flame', '1 Action', 'Self', '1 Turn', 'A flame appears in your hand (sheds light as torch). Can be thrown (Near range, 1d6 fire damage, ends spell).', 'Damage increases to 2d6 when thrown.'],
    ['2', 'Druid', 'Resist Elements', '1 Action', 'Touch', '1 Turn (10 minutes)', 'Choose fire or cold when preparing. Target gains EDGE on saves and takes half damage from that element.', 'Affect +1 additional creature.'],
    ['2', 'Druid', 'Speak with Plants', '1 Action or Ritual', 'Self (Near)', 'PB Turns', 'Communicate simple ideas with plants. Learn about terrain, water, or dangers.', '+1 Turn duration.'],
    ['2', 'Druid', 'Warp Wood', '1 Action', 'Near (30 ft)', 'Instant', 'Warps wooden object (door, spear, bow) into useless shape.', '+1 object.'],

    // ========== TIER 3 ==========
    // TIER 3 - CLERIC
    ['3', 'Cleric', 'Continual Light', '1 Action or Ritual', 'Near (30 ft)', 'Permanent until dispelled', 'Object glows like daylight (Far radius). Can blind 1 creature if CON spell save fails.', 'Affect +1 object.'],
    ['3', 'Cleric', 'Cure Disease', '1 Action', 'Touch', 'Instant', 'Ends one disease or poison affliction.', 'Heal 1d6 HP as well.'],
    ['3', 'Cleric', 'Locate Object', '1 Action or Ritual', 'Far (120 ft)', 'Concentration, PB Turns', 'Sense direction of familiar object within range.', 'Range doubles.'],
    ['3', 'Cleric', 'Prayer', '1 Action', 'Near (30 ft)', '1 Turn', 'Allies within range gain +1 to attacks/saves; enemies within range suffer -1.', 'Duration +1 Turn.'],
    ['3', 'Cleric', 'Protection from Evil 10 ft', '1 Action', 'Self', 'PB Turns', 'Allies within 10 ft gain +1 AC/saves vs evil creatures; cannot be magically charmed/controlled.', 'Radius expands to 15 ft.'],
    ['3', 'Cleric', 'Remove Curse', '1 Action', 'Touch', 'Instant', 'Lifts 1 curse from creature or object.', 'Affect +1 target.'],
    ['3', 'Cleric', 'Speak with Dead', '1 Action or Ritual', 'Near (corpse)', 'PB questions', 'Ask a corpse questions; answers limited by what it knew in life.', '+1 question.'],
    ['3', 'Cleric', 'Striking', '1 Action', 'Touch (weapon)', '1 Turn', 'Weapon becomes magical; +1 to hit/damage.', 'Duration +1 Turn.'],

    // TIER 3 - MAGIC-USER
    ['3', 'Magic-User', 'Clairsentience', '1 Action or Ritual', 'Far (120 ft)', 'PB Turns', 'See or hear a known location within range, even through barriers. Cannot see and hear simultaneously.', 'Duration +1 Turn.'],
    ['3', 'Magic-User', 'Darkvision', '1 Action', 'Touch', '1 hour', 'Target sees in darkness up to 60 ft.', 'Duration +1 hour.'],
    ['3', 'Magic-User', 'Dispel Magic', '1 Action', 'Near (30 ft)', 'Instant', 'End 1 ongoing spell or magical effect.', 'Affect +1 target effect.'],
    ['3', 'Magic-User', 'Fireball', '1 Action', 'Far (120 ft)', 'Instant', '15-ft radius blast deals caster level x d6 fire damage (DEX spell save for half).', '+1d6 damage.'],
    ['3', 'Magic-User', 'Fly', '1 Action', 'Touch', '1 Turn', 'Target flies at normal speed.', '+1 target.'],
    ['3', 'Magic-User', 'Haste', '1 Action', 'Near (30 ft)', '1 Turn', 'Target gains +1 attack each round, doubled movement. Afterward, 1 Fatigue.', '+1 target.'],
    ['3', 'Magic-User', 'Hold Person', '1 Action', 'Near (30 ft)', '1 Turn (10 minutes)', 'Up to 3 humanoids must make WIS spell save or be paralysed. Target may repeat save at end of each round.', '+1 target.'],
    ['3', 'Magic-User', 'Invisibility 10 ft Radius', '1 Action', 'Self', 'Until broken (attacking/casting ends)', 'All creatures within 10 ft become invisible.', 'Radius increases to 20 ft.'],
    ['3', 'Magic-User', 'Lightning Bolt', '1 Action', 'Self (60-ft line)', 'Instant', '5-ft wide line deals caster level x d6 lightning damage (DEX spell save for half). Bounces off solid surfaces.', '+1d6 damage.'],
    ['3', 'Magic-User', 'Protection from Evil 10 ft', '1 Action', 'Self', 'PB Turns', 'Allies within 10 ft gain +1 AC/saves vs evil creatures; cannot be magically charmed/controlled.', 'Radius expands to 15 ft.'],
    ['3', 'Magic-User', 'Slow', '1 Action', 'Near (30 ft)', '1 Turn', 'Up to 6 creatures move at half speed, only 1 attack per round. WIS spell save negates.', '+1 target.'],
    ['3', 'Magic-User', 'Water Breathing', '1 Action', 'Touch', '1 hour', 'Target breathes underwater.', 'Affect +1 creature.'],

    // TIER 3 - DRUID
    ['3', 'Druid', 'Call Lightning', '1 Action', 'Far (120 ft) outdoors only', 'Concentration, up to 1 Turn', 'Summon 1 lightning bolt per round (2d6 damage, DEX spell save for half).', '+1d6 damage.'],
    ['3', 'Druid', 'Hold Animal', '1 Action', 'Near (30 ft)', '1 Turn', 'Up to 3 natural animals must make WIS spell save or be paralysed. Target may repeat save at end of each round.', '+1 target.'],
    ['3', 'Druid', 'Plant Growth', '1 Action', 'Near (30 ft)', 'Permanent', 'Create up to 60 ft of thorny overgrowth, 15 ft wide. Difficult terrain. Creatures moving through take 1d6 damage per 15 ft traveled.', '+30 ft length.'],
    ['3', 'Druid', 'Protection from Elements', '1 Action', 'Touch', '1 Turn', 'Choose fire or cold when preparing. Target immune to normal damage of that type, half damage from magical sources.', '+1 creature.'],
    ['3', 'Druid', 'Speak with Dead Animals', '1 Action or Ritual', 'Touch (corpse)', 'PB questions', 'Ask a dead animal questions about what it sensed in life.', '+1 question.'],
    ['3', 'Druid', 'Summon Swarm', '1 Action', 'Near (30 ft)', 'Concentration, 1 Turn', 'Summon a swarm of insects, bats, or rats (10-ft radius). Creatures in the swarm take 1d6 damage per round and have SETBACK on attacks.', 'Swarm expands to 15-ft radius.'],
    ['3', 'Druid', 'Water Walk', '1 Action', 'Touch', '1 Turn', 'Up to PB creatures can walk on water as solid ground.', 'Duration +1 Turn.'],
    ['3', 'Druid', 'Wind Wall', '1 Action', 'Near (30 ft)', '1 Turn', '30-ft wall of wind deflects missiles, small flyers, and gas.', 'Extend wall by 10 ft.'],

    // ========== TIER 4 ==========
    // TIER 4 - CLERIC
    ['4', 'Cleric', 'Animate Dead', '1 Turn', 'Near (30 ft)', 'Permanent until destroyed', 'Raise 1d6 skeletons or 1d4 zombies from corpses. Undead obey simple verbal commands. Control up to PB x 2 HD of undead at once.', '+1d4 creatures.'],
    ['4', 'Cleric', 'Create Food & Water', '1 Turn (10 minutes)', 'Self', 'Instant', 'Creates enough food & water for 12 people (or mounts) for 1 day.', 'Double the amount created.'],
    ['4', 'Cleric', 'Cure Serious Wounds', '1 Action', 'Touch', 'Instant', 'Heals PB x d6 + PB HP.', '+1d6 HP.'],
    ['4', 'Cleric', 'Dispel Magic', '1 Action', 'Near (30 ft)', 'Instant', 'End 1 ongoing spell or magical effect.', 'Affect +1 target effect.'],
    ['4', 'Cleric', 'Divination', '1 Turn or Ritual', 'Self', 'Instant', 'Ask your deity about an event, location, or creature. Receive a short truthful answer (1-2 sentences). Concerns events within one week.', 'Receive additional detail.'],
    ['4', 'Cleric', 'Neutralize Poison', '1 Action', 'Touch', 'Instant', 'Ends poison on 1 creature or object.', 'Also restores 1d6 HP.'],
    ['4', 'Cleric', 'Speak with Plants', '1 Action or Ritual', 'Self (Near)', 'PB Turns', 'Communicate simple ideas with plants. Learn about terrain, water, or dangers.', '+1 Turn duration.'],
    ['4', 'Cleric', 'Tongues', '1 Action or Ritual', 'Self', '1 Turn', 'Speak and understand any language.', 'Duration +1 Turn.'],

    // TIER 4 - MAGIC-USER
    ['4', 'Magic-User', 'Charm Monster', '1 Action', 'Near (30 ft)', 'Until dispelled or broken', 'Monster must make WIS spell save or become charmed as if Charm Person.', 'Affect +1 target.'],
    ['4', 'Magic-User', 'Confusion', '1 Action', 'Near (30 ft)', '1 Turn', '3d6 creatures in a 15-ft radius must make WIS spell save or act randomly each round. Roll d6: 1 act normally, 2 do nothing, 3-4 flee, 5-6 attack nearest creature.', 'Duration +1 Turn.'],
    ['4', 'Magic-User', 'Dimension Door', '1 Action', 'Self + 1 ally', 'Instant', 'Teleport up to 360 ft to a visible or known location.', 'Bring +1 creature.'],
    ['4', 'Magic-User', 'Growth of Plants', '1 Action or Ritual', 'Near (30 ft)', 'Permanent', 'Vegetation in 30-ft radius grows thick, halving speed.', 'Radius doubles.'],
    ['4', 'Magic-User', 'Hallucinatory Terrain', '1 Action or Ritual', 'Far (120 ft)', 'Concentration, up to 1 day', 'Creates illusory terrain (forest, swamp, desert). Interaction or INT spell save disbelieves.', 'Area doubles.'],
    ['4', 'Magic-User', 'Massmorph', '1 Action or Ritual', 'Near (30 ft)', 'Concentration, 1 Turn', 'Up to 100 humanoids appear as trees.', 'Duration +1 Turn.'],
    ['4', 'Magic-User', 'Monster Summoning I', '1 Action', 'Near (30 ft)', '1 Turn', 'Summons 1d6 monsters of 2 HD or less (Referee decides).', '+1d6 monsters.'],
    ['4', 'Magic-User', 'Polymorph Other', '1 Action', 'Near (30 ft)', 'Permanent (until dispelled)', 'Transform 1 creature into another form (+-2 HD). Target gains new form physical stats but keeps mind. WIS spell save resists.', 'Target suffers SETBACK on save.'],
    ['4', 'Magic-User', 'Polymorph Self', '1 Action', 'Self', 'Concentration, 1 Turn', 'Caster takes form of another creature (+-2 HD). Gains physical abilities but not magical powers or breath weapons.', 'Duration +1 Turn.'],
    ['4', 'Magic-User', 'Remove Curse', '1 Action', 'Touch', 'Instant', 'Lifts 1 curse from creature or object.', 'Affect +1 target.'],
    ['4', 'Magic-User', 'Wall of Fire', '1 Action', 'Near (30 ft)', 'Concentration, 1 Turn', '20-ft long, 10-ft high wall inflicts 2d6 fire damage crossing/adjacent (CON spell save for half).', 'Extend wall by 10 ft or +1d6 damage.'],
    ['4', 'Magic-User', 'Wizard Eye', '1 Action or Ritual', 'Self (eye, Far)', 'Concentration, 1 Turn', 'Invisible eye scouts up to 120 ft, relaying vision.', 'Duration +1 Turn.'],

    // TIER 4 - DRUID
    ['4', 'Druid', 'Animal Growth', '1 Action', 'Near (30 ft)', '1 Turn', 'Up to 2d6 normal animals grow to double size (HD doubled).', '+1d6 animals.'],
    ['4', 'Druid', 'Call Woodland Beings', '1 Turn (10 minutes)', 'Near (30 ft)', '1 Turn', 'Summon fey creatures (roll d6): 1-2 Sprites (2d4), 3-4 Pixies (1d4), 5 Satyrs (1d2), 6 Dryad (1). Creatures are friendly and will aid the caster.', 'Roll twice, choose result.'],
    ['4', 'Druid', 'Dispel Magic', '1 Action', 'Near (30 ft)', 'Instant', 'End 1 ongoing spell or magical effect.', 'Affect +1 target effect.'],
    ['4', 'Druid', 'Hallucinatory Terrain', '1 Action or Ritual', 'Far (120 ft)', 'Concentration, up to 1 day', 'Creates illusory terrain (forest, swamp, desert). Interaction or INT spell save disbelieves.', 'Area doubles.'],
    ['4', 'Druid', 'Ice Storm', '1 Action', 'Far (120 ft)', 'Instant', '20-ft radius hailstorm deals caster level x d6 damage (half bludgeoning, half cold). DEX spell save for half.', '+1d6 damage.'],
    ['4', 'Druid', 'Sticks to Snakes', '1 Action', 'Near (30 ft)', '1 Turn', '2d6 sticks animate into poisonous snakes (1 HD each).', '+1d6 snakes.'],
    ['4', 'Druid', 'Wall of Thorns', '1 Action', 'Near (30 ft)', 'Concentration, 1 Turn', 'Creates 60-ft long, 10-ft high hedge of thorns. Moving through deals 2d6 damage (no save).', 'Wall extends +20 ft.'],

    // ========== TIER 5 ==========
    // TIER 5 - CLERIC
    ['5', 'Cleric', 'Commune', '1 Turn', 'Self', 'PB questions', 'Ask your deity yes/no questions. Answers may be cryptic.', '+1 question.'],
    ['5', 'Cleric', 'Dispel Evil', '1 Action', 'Near (30 ft)', '1 Turn', 'Ends possession/charm, banishes extraplanar creatures within 30 ft.', 'Affect +1 target.'],
    ['5', 'Cleric', 'Flame Strike', '1 Action', 'Far (120 ft)', 'Instant', 'A 10-ft radius column of divine fire strikes from above. Creatures take caster level x d6 damage (half fire, half divine). DEX spell save for half.', '+1d6 damage.'],
    ['5', 'Cleric', 'Insect Plague', '1 Action', 'Far (120 ft)', 'Concentration, 1 Turn', 'Swarm fills 30-ft radius, causing fear and 2d6 damage per round.', 'Radius expands to 40 ft.'],
    ['5', 'Cleric', 'Mass Cure Wounds', '1 Action', 'Near (30 ft)', 'Instant', 'Heal up to PB creatures within range for 1d6 + PB HP each.', '+1 target or +1d6 to all targets.'],
    ['5', 'Cleric', 'Quest', '1 Action', 'Near (30 ft)', 'Until completed', 'One creature must undertake a quest; WIS spell save resists.', 'Target suffers SETBACK on save.'],
    ['5', 'Cleric', 'Raise Dead', '1 Turn', 'Touch', 'Instant', 'Revives 1 creature dead no more than caster level days (body mostly intact). Target permanently loses 1 level. Returns at 1 HP, 2 Fatigue.', 'Heal extra 2d6 HP on return.'],
    ['5', 'Cleric', 'True Seeing', '1 Action', 'Touch', '1 Turn', 'See things as they truly are (illusions, invisibility, polymorph).', 'Duration +1 Turn.'],

    // TIER 5 - MAGIC-USER
    ['5', 'Magic-User', 'Animate Dead', '1 Action', 'Near (30 ft)', 'Permanent until destroyed', 'Raise 2d6 skeletons or 1d6 zombies from corpses. Undead obey simple verbal commands.', '+1d6 creatures.'],
    ['5', 'Magic-User', 'Cloudkill', '1 Action', 'Far (120 ft)', 'Concentration, 1 Turn', '30-ft moving cloud; living creatures <=4 HD die (no save). Creatures above 4 HD take 2d6 poison damage (CON spell save for half).', 'Radius expands to 40 ft.'],
    ['5', 'Magic-User', 'Conjure Elemental', '1 Action', 'Near (30 ft)', 'Concentration, up to 1 Turn', 'Summon 1 elemental (8 HD). Loses control if concentration breaks.', 'Summon +1 HD stronger elemental.'],
    ['5', 'Magic-User', 'Contact Other Plane', '1 Turn', 'Self', 'PB questions', 'Contact an otherworldly entity for answers. Each question risks madness: INT spell save or be confused for 1d6 weeks (no spellcasting).', 'One question is answered without risk.'],
    ['5', 'Magic-User', 'Feeblemind', '1 Action', 'Near (30 ft)', 'Permanent until cured', 'One caster target INT spell save or INT reduced to 1, cannot cast spells.', 'Target suffers SETBACK on save.'],
    ['5', 'Magic-User', 'Hold Monster', '1 Action', 'Near (30 ft)', '1 Turn', 'Up to 3 creatures paralyzed unless WIS spell save. Target may repeat save at end of each round.', 'Affect +1 target.'],
    ['5', 'Magic-User', 'Magic Jar', '1 Action', 'Near (30 ft)', 'Special', 'Soul transfers to container (body falls inert). From jar, may possess creature within Far (WIS spell save resists). If jar destroyed while occupied, caster dies.', 'Possessed body gains +2 to all saves.'],
    ['5', 'Magic-User', 'Passwall', '1 Action', 'Near (30 ft)', '1 Turn', 'Creates a tunnel (10 ft wide, 20 ft deep) through stone/wood.', 'Extend by +10 ft.'],
    ['5', 'Magic-User', 'Telekinesis', '1 Action', 'Near (30 ft)', 'Concentration, 1 Turn', 'Move 250 lb object at will.', 'Weight limit doubles.'],
    ['5', 'Magic-User', 'Teleport', '1 Action', 'Touch', 'Instant', 'Caster + touched allies travel instantly to known location. Risk depends on familiarity: well-known (safe), visited few times (10% off-target), described only (25% off-target or worse).', 'Reduce risk by one category.'],
    ['5', 'Magic-User', 'Wall of Iron', '1 Action', 'Near (30 ft)', 'Permanent', 'Creates iron wall (30x30 ft, 1 in thick).', 'Increase size to 40x40 ft.'],
    ['5', 'Magic-User', 'Wall of Stone', '1 Action', 'Near (30 ft)', 'Permanent', 'Creates stone wall (30x30 ft, 1 ft thick).', 'Increase size to 40x40 ft.'],

    // TIER 5 - DRUID
    ['5', 'Druid', 'Animal Summoning', '1 Action', 'Near (30 ft)', '1 Turn', 'Summons 2d6 animals of 4 HD or less (Referee decides).', '+1d6 animals.'],
    ['5', 'Druid', 'Commune with Nature', '1 Turn or Ritual', 'Self', 'PB questions', 'Ask the land/spirits about terrain, animals, plants, or dangers within 1 mile.', '+1 question.'],
    ['5', 'Druid', 'Control Winds', '1 Action', 'Far (120 ft)', 'Concentration, 1 Turn', 'Alter wind direction and strength in 40-ft radius. Can hinder flyers or aid ships.', 'Radius increases to 60 ft.'],
    ['5', 'Druid', 'Insect Plague', '1 Action', 'Far (120 ft)', 'Concentration, 1 Turn', 'Swarm fills 30-ft radius, causing fear and 2d6 damage per round.', 'Radius expands to 40 ft.'],
    ['5', 'Druid', 'Transmute Rock to Mud', '1 Action', 'Near (30 ft)', 'Permanent until dispelled', '20-ft cube of rock turns to mud (or vice versa). Traps/immobilizes creatures.', 'Cube expands to 30 ft.'],
    ['5', 'Druid', 'Wall of Fire (Greater)', '1 Action', 'Near (30 ft)', 'Concentration, 1 Turn', '20-ft long, 10-ft high wall inflicts 4d6 fire damage crossing/adjacent (CON spell save for half).', '+1d6 damage or extend wall 10 ft.'],

    // ========== TIER 6 ==========
    // TIER 6 - CLERIC
    ['6', 'Cleric', 'Animate Object', '1 Action', 'Near (30 ft)', 'Concentration, 1 Turn', 'Animate 1d6 objects (chairs, statues, weapons) as allies (HD by size).', '+1 animated object.'],
    ['6', 'Cleric', 'Blade Barrier', '1 Action', 'Near (30 ft)', 'Concentration, 1 Turn', '20-ft radius barrier of spinning blades; passing through = 6d6 damage.', 'Radius expands to 30 ft.'],
    ['6', 'Cleric', 'Find the Path', '1 Turn', 'Self', 'Concentration, 1 Turn', 'Reveals the most direct route to a known location.', 'Duration +1 Turn.'],
    ['6', 'Cleric', 'Heal', '1 Action', 'Touch', 'Instant', 'Restores all HP, removes blindness, disease, fatigue, poison.', '+1 target.'],
    ['6', 'Cleric', 'Part Water', '1 Action', 'Near (30 ft)', 'Concentration, 1 Turn', 'Opens a 30-ft path through water, holding it back.', 'Path expands to 50 ft.'],
    ['6', 'Cleric', 'Regenerate', '1 Action', 'Touch', 'Instant', 'Regrows severed limbs, mends broken bones, and restores ruined organs. Also heals 3d6 HP. Does not affect undead or constructs.', 'Heal +2d6 HP.'],
    ['6', 'Cleric', 'Restoration', '1 Action', 'Touch', 'Instant', 'Removes one negative level caused by energy drain, or restores 1d4 points to a single ability score drained by magic or monsters.', ''],
    ['6', 'Cleric', 'Stone Tell', '1 Action', 'Touch', '1 Turn', 'Speak with stone about past events, builders, or creatures that passed.', 'Duration +1 Turn.'],
    ['6', 'Cleric', 'Word of Recall', '1 Action', 'Self + carried gear', 'Instant', 'Instantly transports caster to a sanctified temple or location prepared earlier.', 'Bring +1 ally.'],

    // TIER 6 - MAGIC-USER
    ['6', 'Magic-User', 'Anti-Magic Shell', '1 Action', 'Self (10-ft radius)', 'Concentration, 1 Turn', 'No magic can function within the shell (both hostile and friendly).', 'Radius expands to 15 ft.'],
    ['6', 'Magic-User', 'Control Weather', '1 Turn', 'Sight', '1 day', 'Alters local weather: storms, calm, fog, heat. Extreme changes take hours.', 'Duration +1 day.'],
    ['6', 'Magic-User', 'Death Spell', '1 Action', 'Far (120 ft)', 'Instant', 'Kills up to 3d12 HD of creatures (8+ HD immune). CON spell save resists.', '+1d6 HD affected.'],
    ['6', 'Magic-User', 'Disintegrate', '1 Action', 'Far (120 ft)', 'Instant', 'One target turns to dust. CON spell save negates. If object, destroyed.', 'Target suffers SETBACK on save.'],
    ['6', 'Magic-User', 'Geas', '1 Action', 'Near (30 ft)', 'Until fulfilled', 'Command one creature to complete a task. WIS spell save resists. Breaking command causes 2d6 damage/day.', 'Target has SETBACK on save.'],
    ['6', 'Magic-User', 'Invisible Stalker', '1 Action', 'Near (30 ft)', 'Until task complete', 'Summons an invisible stalker (8 HD, AC 3, 4d4 damage) bound to complete one mission. Simple tasks are obeyed faithfully; complex or lengthy tasks may be twisted.', 'Stalker gains +2 HD.'],
    ['6', 'Magic-User', 'Legend Lore', '1 Turn', 'Self', 'Instant', 'Gain lore about a person, place, or object of renown. Referee decides detail.', 'Provide an additional detail.'],
    ['6', 'Magic-User', 'Lower Water', '1 Action', 'Near (30 ft)', 'Concentration, 1 Turn', 'Lowers water level by half in a 30-ft square area. Reveals submerged objects/passages.', 'Area doubles.'],
    ['6', 'Magic-User', 'Move Earth', '1 Turn', 'Near (30 ft)', 'Concentration, 1 Turn', 'Reshape terrain (ditches, hills, embankments) in 40-ft cube.', 'Cube expands to 60 ft.'],
    ['6', 'Magic-User', 'Reincarnation', '1 Turn', 'Touch', 'Instant', 'Dead creature returns in a new body. Spirit must be willing. Body forms over 1 hour. Roll d6 for new race: 1 Dwarf, 2 Elf, 3 Halfling, 4-6 Human. Returns at 1 HP, 2 Fatigue.', 'Reroll once on table.'],
    ['6', 'Magic-User', 'Stone to Flesh', '1 Action', 'Near (30 ft)', 'Instant', 'Restores one petrified creature to life.', '+1 target.'],
    ['6', 'Magic-User', 'Wall of Ice', '1 Action', 'Near (30 ft)', 'Concentration, 1 Turn', '30-ft wall of ice blocks movement. Shattering deals 6d6 cold damage to adjacent creatures (DEX spell save for half).', 'Wall extends 10 ft.'],

    // TIER 6 - DRUID
    ['6', 'Druid', 'Anti-Animal Shell', '1 Action', 'Self (10-ft radius)', 'Concentration, 1 Turn', 'Creates barrier animals cannot enter.', 'Radius expands to 15 ft.'],
    ['6', 'Druid', 'Conjure Fire Elemental', '1 Action', 'Near (30 ft)', 'Concentration, up to 1 Turn', 'Summon fire elemental (8 HD). If concentration breaks, elemental turns hostile.', 'Elemental gains +2 HD.'],
    ['6', 'Druid', 'Control Weather', '1 Turn', 'Sight', '1 day', 'Alters local weather: storms, calm, fog, heat. Extreme changes take hours.', 'Duration +1 day.'],
    ['6', 'Druid', 'Earthquake', '1 Action', 'Far (120 ft)', 'Instant', '60-ft radius quake collapses structures, opens fissures, deals 6d6 damage (DEX spell save for half).', 'Radius expands to 80 ft.'],
    ['6', 'Druid', 'Reincarnation', '1 Turn', 'Touch', 'Instant', 'Dead creature returns in a new body. Spirit must be willing. Body forms over 1 hour. Roll d6 for new race: 1 Dwarf, 2 Elf, 3 Halfling, 4-6 Human. Returns at 1 HP, 2 Fatigue.', 'Reroll once on table.'],
    ['6', 'Druid', 'Transport via Plants', '1 Action', 'Self', 'Instant', 'Step into one tree and emerge from another of same kind anywhere on the same plane.', 'May bring +1 ally.'],
  ];

  console.log('Total spells: ' + (spellData.length - 1));

  // Clear existing data first
  console.log('Clearing existing Spells tab...');
  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: 'Spells!A:H'
  });

  // Write all spell data
  console.log('Writing spell data...');
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Spells!A1',
    valueInputOption: 'RAW',
    requestBody: { values: spellData }
  });

  console.log('Done! Wrote ' + spellData.length + ' rows to Spells tab.');
  console.log('Spreadsheet: https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/edit#gid=720616649');
}

populateSpells().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
