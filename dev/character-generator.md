---
title: Character Generator
layout: default
parent: Dev Tools
nav_order: 1
---

# Random Character Generator

Generate a complete Level 1 OSwR character with one click. Print the page (Ctrl+P) for a paper copy.

<div id="generator-controls" style="margin-bottom: 1.5rem;">
  <button id="generate-btn" style="font-size: 1.1rem; padding: 0.5rem 1.5rem; cursor: pointer; background: #2c5282; color: white; border: none; border-radius: 4px;">Generate Character</button>
  <button id="reroll-abilities-btn" style="font-size: 0.9rem; padding: 0.4rem 1rem; cursor: pointer; margin-left: 0.5rem;" disabled>Re-roll Abilities</button>
</div>

<div id="character-sheet" style="display: none; border: 2px solid #333; padding: 1.5rem; background: #fefefe; max-width: 700px;">
  <!-- Character content inserted by JavaScript -->
</div>

<style>
  @media print {
    #generator-controls { display: none !important; }
    .site-nav, .site-header, .site-footer, .search, nav, .breadcrumb-nav { display: none !important; }
    #character-sheet {
      border: 1px solid #000 !important;
      max-width: 100% !important;
      box-shadow: none !important;
    }
    body { background: white !important; }
    .main-content { padding: 0 !important; margin: 0 !important; }
  }

  #character-sheet h2 {
    margin-top: 0;
    border-bottom: 2px solid #333;
    padding-bottom: 0.5rem;
    font-size: 1.5rem;
  }
  #character-sheet h3 {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    color: #2c5282;
  }
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.5rem;
    text-align: center;
    margin: 1rem 0;
  }
  .stat-box {
    border: 1px solid #666;
    padding: 0.5rem;
    background: #f8f8f8;
  }
  .stat-box .label { font-size: 0.75rem; font-weight: bold; }
  .stat-box .value { font-size: 1.25rem; font-weight: bold; }
  .derived-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    margin: 1rem 0;
  }
  .derived-box {
    border: 1px solid #999;
    padding: 0.4rem;
    text-align: center;
    background: #f0f0f0;
    font-size: 0.85rem;
  }
  .derived-box strong { display: block; font-size: 1rem; }
  .trait-list { margin: 0.5rem 0; padding-left: 1.25rem; }
  .trait-list li { margin-bottom: 0.25rem; }
  .equipment-list { columns: 2; margin: 0.5rem 0; padding-left: 1.25rem; }
  .equipment-list li { margin-bottom: 0.25rem; break-inside: avoid; }
  .saves-proficiencies {
    display: flex;
    gap: 2rem;
    margin: 0.5rem 0;
  }
  .saves-proficiencies div { flex: 1; }
  .class-feature {
    background: #e8f0fe;
    padding: 0.5rem 0.75rem;
    margin: 0.5rem 0;
    border-left: 3px solid #2c5282;
    font-size: 0.9rem;
  }
  .ancestry-trait {
    background: #f0f8e8;
    padding: 0.5rem 0.75rem;
    margin: 0.25rem 0;
    border-left: 3px solid #4a7c23;
    font-size: 0.9rem;
  }
  .feat-box {
    background: #fff8e8;
    padding: 0.5rem 0.75rem;
    margin: 0.25rem 0;
    border-left: 3px solid #b8860b;
    font-size: 0.9rem;
  }
</style>

<script>
// ============ DATA ============

const ABILITY_TABLE = [
  { min: 3, max: 3, mod: -4 },
  { min: 4, max: 5, mod: -3 },
  { min: 6, max: 7, mod: -2 },
  { min: 8, max: 9, mod: -1 },
  { min: 10, max: 11, mod: 0 },
  { min: 12, max: 13, mod: 1 },
  { min: 14, max: 15, mod: 2 },
  { min: 16, max: 17, mod: 3 },
  { min: 18, max: 18, mod: 4 }
];

const ANCESTRIES = [
  {
    name: "Dwarf",
    size: "Medium",
    languages: ["Common", "Dwarvish"],
    traits: [
      { name: "Stone Sense", desc: "Detect unusual stonework. EDGE when actively searching stonework.", essential: true },
      { name: "Darkvision", desc: "See in darkness up to 30 ft." },
      { name: "Resist Spells", desc: "EDGE on saves vs spells and spell-like effects." }
    ],
    restriction: "Cannot be a Magic-User"
  },
  {
    name: "Elf",
    size: "Medium",
    languages: ["Common", "Elvish"],
    traits: [
      { name: "Ghoul Immunity", desc: "Immune to ghoul paralysis.", essential: true },
      { name: "Keen Senses", desc: "EDGE on sight and hearing checks." },
      { name: "Secret Door Sense", desc: "EDGE when searching for hidden doors." }
    ]
  },
  {
    name: "Halfling",
    size: "Small",
    languages: ["Common", "Halfling"],
    traits: [
      { name: "Fearless", desc: "EDGE on saves vs fear and morale effects.", essential: true },
      { name: "Small & Quiet", desc: "EDGE to Hide in wilderness." },
      { name: "Sling Training", desc: "EDGE on attacks with slings." }
    ],
    restriction: "Cannot use Heavy weapons"
  },
  {
    name: "Human",
    size: "Medium",
    languages: ["Common"],
    traits: [
      { name: "Versatile", desc: "+1 to any one ability.", essential: true },
      { name: "Broad Training", desc: "Choose one General Feat you qualify for." }
    ],
    bonusAbility: true,
    bonusFeat: "general"
  }
];

const CLASSES = [
  {
    name: "Fighter",
    hd: 8,
    saves: ["STR", "CON"],
    abilityBoost: "STR",
    weapons: "Light, Medium, Heavy",
    armor: "Light, Medium, Heavy, Shields",
    feats: { type: "fighter", count: 2 },
    boostHook: "Extra Attack: Spend 1 Boost Die to make one additional weapon attack.",
    kits: [
      { name: "Shieldwall", items: ["Chain Armor", "Shield", "Melee weapon (your choice)", "Light Crossbow", "30 Bolts"] },
      { name: "Skirmisher", items: ["Leather Armor", "Longbow", "20 Arrows", "Two Medium melee weapons"] }
    ]
  },
  {
    name: "Expert",
    hd: 6,
    saves: ["DEX", "INT"],
    abilityBoost: "DEX",
    weapons: "Light, Medium",
    armor: "Light",
    feats: { type: "expert", count: 6 },
    boostHook: "Precision: When you spend a Boost Die, roll 2d6 and keep the higher result.",
    kits: [
      { name: "Cutpurse", items: ["Leather Armor", "Shortsword", "Shortbow", "20 Arrows", "Thieves' Tools", "2 Daggers"] },
      { name: "Scout", items: ["Leather Armor", "Spear or Short Sword", "Sling", "20 Stones", "Climbing Kit"] },
      { name: "Face", items: ["Leather Armor", "Rapier", "Fine Clothes", "Disguise Kit", "2 Daggers"] }
    ]
  },
  {
    name: "Cleric (Hallowed)",
    hd: 6,
    saves: ["WIS", "CHA"],
    abilityBoost: "WIS",
    weapons: "Light, Medium (bludgeoning only)",
    armor: "Light, Medium, Shields",
    feats: null,
    boostHook: "Spell Enhancement: Spend Boost Die to trigger Boostable spell effects.",
    spellcasting: { stat: "WIS", type: "Cleric" },
    feature: "Turn Undead: Present holy symbol, DC 12 WIS check. Success: affect 2d6+PB HD of undead.",
    kits: [
      { name: "Hallowed", items: ["Chain Armor", "Shield", "Mace", "Holy Symbol", "Holy Water", "Sling", "20 Stones"] }
    ]
  },
  {
    name: "Cleric (Druidic)",
    hd: 6,
    saves: ["WIS", "CHA"],
    abilityBoost: "WIS",
    weapons: "Sickles, Staves, Spears, Slings",
    armor: "Light, Wooden Shields",
    feats: null,
    boostHook: "Spell Enhancement: Spend Boost Die to trigger Boostable spell effects.",
    spellcasting: { stat: "WIS", type: "Druidic" },
    feature: "Wild Shape: Expend Hit Dice to assume beast form for 1d6 rounds.",
    kits: [
      { name: "Druidic", items: ["Leather Armor", "Staff", "Sickle", "Sling", "Herbalist's Kit", "Holy Symbol"] }
    ]
  },
  {
    name: "Magic-User",
    hd: 4,
    saves: ["INT", "WIS"],
    abilityBoost: "INT",
    weapons: "Light",
    armor: "None",
    feats: null,
    boostHook: "Spell Enhancement: Spend Boost Die to trigger Boostable spell effects (e.g., Magic Missile adds extra dart).",
    spellcasting: { stat: "INT", type: "Arcane" },
    feature: "Cantrips: Wizard Bolt (1d3 force, NEAR range) and Prestidigitation.",
    kits: [
      { name: "Scholar", items: ["Dagger", "Arcane Staff", "Spellbook", "Ink & Quill", "Scroll Case"] },
      { name: "Apprentice", items: ["Dagger", "Arcane Focus", "Spellbook", "Chalk", "Charcoal", "Component Pouch"] }
    ]
  }
];

const BACKGROUNDS = [
  "Farmer", "Herdsman", "Fisher", "Hunter", "Trapper", "Woodcutter", "Miner", "Laborer", "Servant", "Beggar",
  "Sailor", "Riverhand", "Caravan Guard", "Mercenary", "Militia", "Squire", "Archer", "Gladiator", "Brawler", "Outlaw",
  "Smuggler", "Poacher", "Scout", "Nomad", "Pilgrim", "Hermit", "Exile", "Street Urchin", "Artisan", "Blacksmith",
  "Mason", "Weaver", "Tanner", "Cook", "Brewer", "Merchant", "Innkeeper", "Performer", "Charlatan", "Acolyte",
  "Cult Initiate", "Scribe", "Scholar", "Alchemist's Apprentice", "Astrologer", "Wise Folk", "Noble Scion", "Courtier", "Spy", "Gravedigger"
];

const GENERAL_FEATS = [
  "Alchemist", "Ancient Lore", "Animal Companion", "Animal Whisperer", "Armor Proficiency", "Attractive",
  "Aura of Courage", "Beast Bond", "Brawler", "Centered Mind", "Countercharm", "Cutting Words",
  "Disease Immunity", "Divine Sense", "Dual Wielder", "Empath", "Endurance", "Escape Artist",
  "Fast Healer", "Favored Enemy", "Fearless", "Fleet of Foot", "Gift of Tongues", "Healer",
  "Heavy Armor Master", "Herbalist", "Hold Breath", "Hunter's Mark", "Improved Initiative",
  "Jack of All Trades", "Keen Senses", "Leadership", "Linguist", "Magic Resistance", "Martial Adept",
  "Mentor", "Mounted Combatant", "Natural Explorer", "Opportunist", "Poison Resistance", "Polearm Master",
  "Quick Draw", "Resilience", "Resilient", "Rider", "Shield Master", "Strong Back", "Survivalist",
  "Tactician", "Tough", "Unarmored Defense", "Weapon Mastery"
];

const FIGHTER_FEATS = [
  "Adaptive Fighter", "Adrenaline Rush", "Ambush Hunter", "Armor Master", "Battlecry", "Blind Fighting",
  "Bodyguard", "Cavalry Charge", "Cutting Edge", "Death Strike", "Debilitating Blow", "Deflect Missiles",
  "Duelist", "Eagle Eye", "Feint", "Heavy Hitter", "Hold the Line", "Hurl Weapon", "Iron Grip",
  "Last Stand", "Overpower", "Quick Reflexes", "Second Wind", "Shield Bash", "Skirmisher",
  "Stalwart", "Weapon Specialization", "Whirlwind Attack"
];

const EXPERT_FEATS = [
  "Backstab", "Contacts (High)", "Contacts (Low)", "Deflect Missiles", "Disguise", "Forgery Master",
  "Gambit", "Garrote", "Hide in Shadows", "Infiltrator", "Innate Tracker", "Master of Disguise",
  "Pick Locks", "Pick Pockets", "Poisoner", "Silver Tongue", "Sleight of Hand", "Trap Expert", "Winning Smile"
];

// ============ DICE & UTILITIES ============

function roll(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function roll3d6() {
  return roll(6) + roll(6) + roll(6);
}

function rollToMod(total) {
  for (const row of ABILITY_TABLE) {
    if (total >= row.min && total <= row.max) return row.mod;
  }
  return 0;
}

function formatMod(mod) {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandomN(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

// ============ CHARACTER GENERATION ============

let currentCharacter = null;

function generateAbilities() {
  return {
    STR: rollToMod(roll3d6()),
    DEX: rollToMod(roll3d6()),
    CON: rollToMod(roll3d6()),
    INT: rollToMod(roll3d6()),
    WIS: rollToMod(roll3d6()),
    CHA: rollToMod(roll3d6())
  };
}

function generateCharacter() {
  const abilities = generateAbilities();

  // Pick ancestry first (affects class options)
  let ancestry = pickRandom(ANCESTRIES);

  // Pick class (respecting ancestry restrictions)
  let availableClasses = [...CLASSES];
  if (ancestry.restriction === "Cannot be a Magic-User") {
    availableClasses = availableClasses.filter(c => c.name !== "Magic-User");
  }
  const charClass = pickRandom(availableClasses);

  // Apply class ability boost
  abilities[charClass.abilityBoost] += 1;
  if (abilities[charClass.abilityBoost] > 4) abilities[charClass.abilityBoost] = 4;

  // Apply Human versatile bonus (+1 to any ability)
  let humanBonusAbility = null;
  if (ancestry.bonusAbility) {
    const abilityNames = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
    humanBonusAbility = pickRandom(abilityNames);
    abilities[humanBonusAbility] += 1;
    if (abilities[humanBonusAbility] > 4) abilities[humanBonusAbility] = 4;
  }

  // Pick background
  const background = pickRandom(BACKGROUNDS);

  // Calculate derived stats
  const hp = charClass.hd + abilities.CON;
  const ac = 10 + abilities.DEX; // Base, armor will modify
  const carryingCapacity = 10 + abilities.STR;

  // Pick feats
  let feats = [];
  if (charClass.feats) {
    if (charClass.feats.type === "fighter") {
      feats = pickRandomN(FIGHTER_FEATS, charClass.feats.count);
    } else if (charClass.feats.type === "expert") {
      // Experts can pick from Expert OR General
      const combined = [...EXPERT_FEATS, ...GENERAL_FEATS];
      feats = pickRandomN(combined, charClass.feats.count);
    }
  }

  // Human bonus feat
  let humanFeat = null;
  if (ancestry.bonusFeat === "general") {
    // Pick one that isn't already chosen
    const available = GENERAL_FEATS.filter(f => !feats.includes(f));
    humanFeat = pickRandom(available);
  }

  // Pick starting kit
  const kit = pickRandom(charClass.kits);

  // Languages
  const languages = [...ancestry.languages];
  if (abilities.INT > 0) {
    // Could add bonus languages here
  }

  return {
    abilities,
    ancestry,
    charClass,
    background,
    hp,
    ac,
    carryingCapacity,
    feats,
    humanFeat,
    humanBonusAbility,
    kit,
    languages,
    level: 1,
    pb: 2
  };
}

function renderCharacter(char) {
  const sheet = document.getElementById('character-sheet');

  // Build ancestry traits HTML
  let traitsHtml = char.ancestry.traits.map(t =>
    `<div class="ancestry-trait"><strong>${t.name}${t.essential ? ' (Essential)' : ''}:</strong> ${t.desc}</div>`
  ).join('');

  if (char.ancestry.restriction) {
    traitsHtml += `<div class="ancestry-trait" style="background: #fee; border-color: #c44;"><strong>Restriction:</strong> ${char.ancestry.restriction}</div>`;
  }

  // Build feats HTML
  let featsHtml = '';
  if (char.feats.length > 0) {
    featsHtml = char.feats.map(f => `<div class="feat-box">${f}</div>`).join('');
  }
  if (char.humanFeat) {
    featsHtml += `<div class="feat-box"><strong>Human Bonus:</strong> ${char.humanFeat}</div>`;
  }

  // Calculate actual AC with armor
  let armorAC = char.ac;
  let armorNote = "Unarmored";
  if (char.kit.items.some(i => i.includes("Chain"))) {
    armorAC = 14 + char.abilities.DEX; // Chain = AC 14
    armorNote = "Chain";
  } else if (char.kit.items.some(i => i.includes("Leather"))) {
    armorAC = 11 + char.abilities.DEX; // Leather = AC 11
    armorNote = "Leather";
  }
  if (char.kit.items.some(i => i.includes("Shield"))) {
    armorAC += 2;
    armorNote += " + Shield";
  }

  // Spellcasting info
  let spellHtml = '';
  if (char.charClass.spellcasting) {
    const stat = char.charClass.spellcasting.stat;
    const mod = char.abilities[stat];
    const dc = 8 + char.pb + mod;
    const attack = char.pb + mod;
    const prepared = 1 + mod;
    spellHtml = `
      <h3>Spellcasting (${char.charClass.spellcasting.type})</h3>
      <div class="derived-stats" style="grid-template-columns: repeat(3, 1fr);">
        <div class="derived-box"><strong>${dc}</strong>Spell DC</div>
        <div class="derived-box"><strong>${formatMod(attack)}</strong>Spell Attack</div>
        <div class="derived-box"><strong>${Math.max(1, prepared)}</strong>Spells Prepared</div>
      </div>
      <p style="font-size: 0.85rem; color: #666;">Tier 1 Slots: 2 | Casting Stat: ${stat}</p>
    `;
  }

  sheet.innerHTML = `
    <h2>${char.ancestry.name} ${char.charClass.name}</h2>
    <p style="font-size: 1rem; margin-bottom: 1rem;"><strong>Background:</strong> ${char.background} | <strong>Level:</strong> ${char.level} | <strong>PB:</strong> +${char.pb}</p>

    <h3>Abilities</h3>
    <div class="stat-grid">
      <div class="stat-box"><div class="label">STR</div><div class="value">${formatMod(char.abilities.STR)}</div></div>
      <div class="stat-box"><div class="label">DEX</div><div class="value">${formatMod(char.abilities.DEX)}</div></div>
      <div class="stat-box"><div class="label">CON</div><div class="value">${formatMod(char.abilities.CON)}</div></div>
      <div class="stat-box"><div class="label">INT</div><div class="value">${formatMod(char.abilities.INT)}</div></div>
      <div class="stat-box"><div class="label">WIS</div><div class="value">${formatMod(char.abilities.WIS)}</div></div>
      <div class="stat-box"><div class="label">CHA</div><div class="value">${formatMod(char.abilities.CHA)}</div></div>
    </div>
    <p style="font-size: 0.8rem; color: #666;">Class Boost: +1 ${char.charClass.abilityBoost}${char.humanBonusAbility ? ` | Human Versatile: +1 ${char.humanBonusAbility}` : ''} (already applied)</p>

    <h3>Combat Stats</h3>
    <div class="derived-stats">
      <div class="derived-box"><strong>${Math.max(1, char.hp)}</strong>HP</div>
      <div class="derived-box"><strong>${armorAC}</strong>AC (${armorNote})</div>
      <div class="derived-box"><strong>1d${char.charClass.hd}</strong>Hit Die</div>
      <div class="derived-box"><strong>${Math.max(5, char.carryingCapacity)}</strong>Slots</div>
    </div>

    <div class="saves-proficiencies">
      <div>
        <strong>Proficient Saves:</strong> ${char.charClass.saves.join(', ')}
      </div>
      <div>
        <strong>Languages:</strong> ${char.languages.join(', ')}
      </div>
    </div>

    <h3>Proficiencies</h3>
    <p><strong>Weapons:</strong> ${char.charClass.weapons}<br>
    <strong>Armor:</strong> ${char.charClass.armor}</p>

    <h3>Ancestry Traits (${char.ancestry.name})</h3>
    ${traitsHtml}

    <h3>Class Feature</h3>
    <div class="class-feature"><strong>Boost Hook:</strong> ${char.charClass.boostHook}</div>
    ${char.charClass.feature ? `<div class="class-feature">${char.charClass.feature}</div>` : ''}

    ${spellHtml}

    ${featsHtml ? `<h3>Feats (${char.feats.length + (char.humanFeat ? 1 : 0)})</h3>${featsHtml}` : ''}

    <h3>Starting Equipment (${char.kit.name} Kit)</h3>
    <ul class="equipment-list">
      ${char.kit.items.map(i => `<li>${i}</li>`).join('')}
      <li>Backpack</li>
      <li>6 Torches</li>
      <li>6 Supply</li>
      <li>Wineskin</li>
      <li>25 gp</li>
    </ul>
  `;

  sheet.style.display = 'block';
  document.getElementById('reroll-abilities-btn').disabled = false;
}

// ============ EVENT HANDLERS ============

document.getElementById('generate-btn').addEventListener('click', function() {
  currentCharacter = generateCharacter();
  renderCharacter(currentCharacter);
});

document.getElementById('reroll-abilities-btn').addEventListener('click', function() {
  if (!currentCharacter) return;

  // Re-roll abilities but keep everything else
  currentCharacter.abilities = generateAbilities();

  // Re-apply class boost
  currentCharacter.abilities[currentCharacter.charClass.abilityBoost] += 1;
  if (currentCharacter.abilities[currentCharacter.charClass.abilityBoost] > 4) {
    currentCharacter.abilities[currentCharacter.charClass.abilityBoost] = 4;
  }

  // Re-apply human bonus if applicable
  if (currentCharacter.ancestry.bonusAbility && currentCharacter.humanBonusAbility) {
    currentCharacter.abilities[currentCharacter.humanBonusAbility] += 1;
    if (currentCharacter.abilities[currentCharacter.humanBonusAbility] > 4) {
      currentCharacter.abilities[currentCharacter.humanBonusAbility] = 4;
    }
  }

  // Recalculate derived stats
  currentCharacter.hp = currentCharacter.charClass.hd + currentCharacter.abilities.CON;
  currentCharacter.ac = 10 + currentCharacter.abilities.DEX;
  currentCharacter.carryingCapacity = 10 + currentCharacter.abilities.STR;

  renderCharacter(currentCharacter);
});
</script>

---

## Notes

- **Abilities** are rolled 3d6 and converted to modifiers (-4 to +4)
- **Class ability boost** (+1) is automatically applied
- **Human Versatile** (+1 to random ability) is automatically applied for Humans
- **AC** is calculated based on the starting kit's armor
- **Dwarf restriction** (no Magic-User) is enforced
- **Halfling restriction** (no Heavy weapons) is noted but kit selection handles it

## What's Not Included (Yet)

- Specific spell selection for casters (just shows slots/DC)
- Detailed feat descriptions
- Name generator
- Portrait/token

---

*This is a dev tool in testing. [Report issues](https://github.com/fumbletable/osreign/issues) or suggest improvements.*
