---
title: Character Generator
layout: default
parent: Dev Tools
nav_order: 1
---

# Character Generator

Roll your abilities, then build your character step by step. Print the page (Ctrl+P) when done.

<div id="generator-app">
  <!-- Step 1: Roll Abilities -->
  <div id="step-abilities" class="generator-step">
    <h2>Step 1: Roll Abilities</h2>
    <p>Roll 3d6 for each ability, converted to modifiers.</p>
    <button id="roll-abilities-btn" class="btn-primary">Roll Abilities</button>
    <button id="roll-random-btn" class="btn-secondary" style="margin-left: 0.5rem;">Full Random Character</button>

    <div id="abilities-display" style="display: none;">
      <div class="stat-grid" id="stat-boxes"></div>
      <button id="reroll-btn" class="btn-small">Re-roll All</button>
      <p style="margin-top: 1rem;">Happy with these? Choose your ancestry below.</p>
    </div>
  </div>

  <!-- Step 2: Choose Ancestry -->
  <div id="step-ancestry" class="generator-step" style="display: none;">
    <h2>Step 2: Choose Ancestry</h2>
    <div id="ancestry-options" class="option-grid"></div>
  </div>

  <!-- Step 3: Choose Class -->
  <div id="step-class" class="generator-step" style="display: none;">
    <h2>Step 3: Choose Class</h2>
    <p id="class-restriction-note" style="color: #c44; display: none;"></p>
    <div id="class-options" class="option-grid"></div>
  </div>

  <!-- Step 4: Choose Background -->
  <div id="step-background" class="generator-step" style="display: none;">
    <h2>Step 4: Choose Background</h2>
    <button id="random-background-btn" class="btn-secondary" style="margin-bottom: 1rem;">Random (d50)</button>
    <div id="background-options" class="background-grid"></div>
  </div>

  <!-- Step 5: Choose Kit -->
  <div id="step-kit" class="generator-step" style="display: none;">
    <h2>Step 5: Choose Starting Kit</h2>
    <div id="kit-options" class="option-grid"></div>
  </div>

  <!-- Final Character Sheet -->
  <div id="character-sheet" style="display: none;"></div>

  <div id="final-actions" style="display: none; margin-top: 1rem;">
    <button id="start-over-btn" class="btn-secondary">Start Over</button>
  </div>
</div>

<style>
  @media print {
    .generator-step, #final-actions, .btn-primary, .btn-secondary, .btn-small { display: none !important; }
    .site-nav, .site-header, .site-footer, .search, nav, .breadcrumb-nav { display: none !important; }
    #character-sheet {
      border: 1px solid #000 !important;
      max-width: 100% !important;
      box-shadow: none !important;
    }
    body { background: white !important; }
    .main-content { padding: 0 !important; margin: 0 !important; }
  }

  .generator-step {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #ddd;
  }
  .generator-step h2 {
    color: #2c5282;
    margin-bottom: 0.75rem;
  }
  .btn-primary {
    font-size: 1.1rem;
    padding: 0.5rem 1.5rem;
    cursor: pointer;
    background: #2c5282;
    color: white;
    border: none;
    border-radius: 4px;
  }
  .btn-primary:hover { background: #1e3a5f; }
  .btn-secondary {
    font-size: 0.95rem;
    padding: 0.4rem 1rem;
    cursor: pointer;
    background: #e2e8f0;
    border: 1px solid #999;
    border-radius: 4px;
  }
  .btn-secondary:hover { background: #cbd5e0; }
  .btn-small {
    font-size: 0.85rem;
    padding: 0.25rem 0.75rem;
    cursor: pointer;
    background: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-top: 0.5rem;
  }

  .stat-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.5rem;
    text-align: center;
    margin: 1rem 0;
    max-width: 500px;
  }
  .stat-box {
    border: 2px solid #666;
    padding: 0.75rem 0.5rem;
    background: #f8f8f8;
    border-radius: 4px;
  }
  .stat-box .label { font-size: 0.75rem; font-weight: bold; color: #555; }
  .stat-box .value { font-size: 1.5rem; font-weight: bold; }

  .option-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
  .option-card {
    border: 2px solid #ccc;
    padding: 1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.15s;
  }
  .option-card:hover {
    border-color: #2c5282;
    background: #f0f4f8;
  }
  .option-card.selected {
    border-color: #2c5282;
    background: #e8f0fe;
    box-shadow: 0 0 0 2px #2c5282;
  }
  .option-card.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .option-card h3 {
    margin: 0 0 0.5rem 0;
    color: #2c5282;
  }
  .option-card .details {
    font-size: 0.85rem;
    color: #555;
    margin-top: 0.5rem;
  }
  .option-card .traits {
    font-size: 0.8rem;
    color: #666;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid #ddd;
  }

  .background-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 0.5rem;
    margin-top: 1rem;
  }
  .background-option {
    border: 1px solid #ccc;
    padding: 0.5rem;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    font-size: 0.9rem;
    transition: all 0.1s;
  }
  .background-option:hover {
    border-color: #2c5282;
    background: #f0f4f8;
  }
  .background-option.selected {
    border-color: #2c5282;
    background: #e8f0fe;
    font-weight: bold;
  }

  /* Character Sheet Styles */
  #character-sheet {
    border: 2px solid #333;
    padding: 1.5rem;
    background: #fefefe;
    max-width: 700px;
    margin-top: 2rem;
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
      { name: "Stone Sense", desc: "Detect unusual stonework. EDGE when actively searching.", essential: true },
      { name: "Darkvision", desc: "See in darkness up to 30 ft." },
      { name: "Resist Spells", desc: "EDGE on saves vs spells." }
    ],
    restriction: "Cannot be a Magic-User",
    restrictedClass: "Magic-User"
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
      { name: "Fearless", desc: "EDGE on saves vs fear.", essential: true },
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
      { name: "Versatile", desc: "+1 to any one ability (you choose).", essential: true },
      { name: "Broad Training", desc: "One bonus General Feat." }
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
    boostHook: "Extra Attack: Spend 1 Boost Die for one additional weapon attack.",
    desc: "Masters of combat. High HP, all weapons and armor.",
    kits: [
      { name: "Shieldwall", items: ["Chain Armor", "Shield", "Melee weapon (choice)", "Light Crossbow", "30 Bolts"] },
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
    boostHook: "Precision: Roll 2d6 keep higher when spending Boost Die.",
    desc: "Skilled specialists. Start with 6 feats to customize.",
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
    boostHook: "Spell Enhancement: Trigger Boostable spell effects.",
    spellcasting: { stat: "WIS", type: "Cleric" },
    feature: "Turn Undead",
    desc: "Divine caster with Turn Undead. Solid in combat.",
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
    boostHook: "Spell Enhancement: Trigger Boostable spell effects.",
    spellcasting: { stat: "WIS", type: "Druidic" },
    feature: "Wild Shape",
    desc: "Nature caster with Wild Shape. Different spell list.",
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
    boostHook: "Spell Enhancement: Trigger Boostable spell effects.",
    spellcasting: { stat: "INT", type: "Arcane" },
    feature: "Cantrips (Wizard Bolt, Prestidigitation)",
    desc: "Arcane caster. Fragile but powerful spells.",
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
  "Cult Initiate", "Scribe", "Scholar", "Alchemist's Appr.", "Astrologer", "Wise Folk", "Noble Scion", "Courtier", "Spy", "Gravedigger"
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

// ============ STATE ============

let state = {
  abilities: null,      // { STR: mod, DEX: mod, ... } - BASE values before boosts
  ancestry: null,
  charClass: null,
  background: null,
  kit: null,
  humanBonusAbility: null,
  feats: [],
  humanFeat: null
};

// ============ UTILITIES ============

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

function getFinalAbilities() {
  // Start with base abilities
  const final = { ...state.abilities };

  // Apply class boost
  if (state.charClass) {
    final[state.charClass.abilityBoost] = Math.min(4, final[state.charClass.abilityBoost] + 1);
  }

  // Apply human bonus
  if (state.ancestry?.bonusAbility && state.humanBonusAbility) {
    final[state.humanBonusAbility] = Math.min(4, final[state.humanBonusAbility] + 1);
  }

  return final;
}

// ============ RENDER FUNCTIONS ============

function renderAbilities() {
  const container = document.getElementById('stat-boxes');
  const abilities = state.abilities;
  const names = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];

  container.innerHTML = names.map(name => `
    <div class="stat-box">
      <div class="label">${name}</div>
      <div class="value">${formatMod(abilities[name])}</div>
    </div>
  `).join('');

  document.getElementById('abilities-display').style.display = 'block';
  document.getElementById('step-ancestry').style.display = 'block';
  renderAncestryOptions();
}

function renderAncestryOptions() {
  const container = document.getElementById('ancestry-options');

  container.innerHTML = ANCESTRIES.map((a, i) => `
    <div class="option-card" data-index="${i}">
      <h3>${a.name}</h3>
      <div class="details">
        <strong>Size:</strong> ${a.size} | <strong>Languages:</strong> ${a.languages.join(', ')}
      </div>
      <div class="traits">
        ${a.traits.map(t => `<strong>${t.name}:</strong> ${t.desc}`).join('<br>')}
        ${a.restriction ? `<br><em style="color: #c44;">${a.restriction}</em>` : ''}
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', () => selectAncestry(parseInt(card.dataset.index)));
  });
}

function selectAncestry(index) {
  state.ancestry = ANCESTRIES[index];
  state.charClass = null;
  state.background = null;
  state.kit = null;
  state.humanBonusAbility = null;

  // Update selection UI
  document.querySelectorAll('#ancestry-options .option-card').forEach((card, i) => {
    card.classList.toggle('selected', i === index);
  });

  // Show class step
  document.getElementById('step-class').style.display = 'block';
  document.getElementById('step-background').style.display = 'none';
  document.getElementById('step-kit').style.display = 'none';
  document.getElementById('character-sheet').style.display = 'none';
  document.getElementById('final-actions').style.display = 'none';

  renderClassOptions();
}

function renderClassOptions() {
  const container = document.getElementById('class-options');
  const restrictionNote = document.getElementById('class-restriction-note');

  if (state.ancestry.restrictedClass) {
    restrictionNote.textContent = `${state.ancestry.name}s ${state.ancestry.restriction}`;
    restrictionNote.style.display = 'block';
  } else {
    restrictionNote.style.display = 'none';
  }

  container.innerHTML = CLASSES.map((c, i) => {
    const isDisabled = state.ancestry.restrictedClass && c.name === state.ancestry.restrictedClass;
    return `
      <div class="option-card ${isDisabled ? 'disabled' : ''}" data-index="${i}" ${isDisabled ? '' : ''}>
        <h3>${c.name}</h3>
        <div class="details">
          <strong>HD:</strong> d${c.hd} | <strong>Saves:</strong> ${c.saves.join(', ')} | <strong>+1 ${c.abilityBoost}</strong>
        </div>
        <p style="margin: 0.5rem 0; font-size: 0.9rem;">${c.desc}</p>
        <div class="traits">
          <strong>Weapons:</strong> ${c.weapons}<br>
          <strong>Armor:</strong> ${c.armor}
          ${c.feats ? `<br><strong>Starting Feats:</strong> ${c.feats.count} ${c.feats.type}` : ''}
          ${c.feature ? `<br><strong>Feature:</strong> ${c.feature}` : ''}
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.option-card:not(.disabled)').forEach(card => {
    card.addEventListener('click', () => selectClass(parseInt(card.dataset.index)));
  });
}

function selectClass(index) {
  state.charClass = CLASSES[index];
  state.background = null;
  state.kit = null;

  // Generate feats for this class
  state.feats = [];
  if (state.charClass.feats) {
    if (state.charClass.feats.type === 'fighter') {
      state.feats = pickRandomN(FIGHTER_FEATS, state.charClass.feats.count);
    } else if (state.charClass.feats.type === 'expert') {
      const combined = [...EXPERT_FEATS, ...GENERAL_FEATS];
      state.feats = pickRandomN(combined, state.charClass.feats.count);
    }
  }

  // Human bonus feat
  if (state.ancestry.bonusFeat === 'general') {
    const available = GENERAL_FEATS.filter(f => !state.feats.includes(f));
    state.humanFeat = pickRandom(available);
  } else {
    state.humanFeat = null;
  }

  // Human bonus ability - random for now (could add picker later)
  if (state.ancestry.bonusAbility) {
    const abilityNames = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
    state.humanBonusAbility = pickRandom(abilityNames);
  }

  // Update selection UI
  document.querySelectorAll('#class-options .option-card').forEach((card, i) => {
    card.classList.toggle('selected', i === index);
  });

  // Show background step
  document.getElementById('step-background').style.display = 'block';
  document.getElementById('step-kit').style.display = 'none';
  document.getElementById('character-sheet').style.display = 'none';
  document.getElementById('final-actions').style.display = 'none';

  renderBackgroundOptions();
}

function renderBackgroundOptions() {
  const container = document.getElementById('background-options');

  container.innerHTML = BACKGROUNDS.map((b, i) => `
    <div class="background-option" data-index="${i}">${b}</div>
  `).join('');

  container.querySelectorAll('.background-option').forEach(option => {
    option.addEventListener('click', () => selectBackground(parseInt(option.dataset.index)));
  });
}

function selectBackground(index) {
  state.background = BACKGROUNDS[index];

  // Update selection UI
  document.querySelectorAll('#background-options .background-option').forEach((opt, i) => {
    opt.classList.toggle('selected', i === index);
  });

  // Show kit step
  document.getElementById('step-kit').style.display = 'block';
  document.getElementById('character-sheet').style.display = 'none';
  document.getElementById('final-actions').style.display = 'none';

  renderKitOptions();
}

function renderKitOptions() {
  const container = document.getElementById('kit-options');
  const kits = state.charClass.kits;

  container.innerHTML = kits.map((k, i) => `
    <div class="option-card" data-index="${i}">
      <h3>${k.name} Kit</h3>
      <ul style="margin: 0.5rem 0; padding-left: 1.25rem; font-size: 0.9rem;">
        ${k.items.map(item => `<li>${item}</li>`).join('')}
      </ul>
      <p style="font-size: 0.8rem; color: #666; margin: 0;">+ Backpack, 6 Torches, 6 Supply, Wineskin, 25 gp</p>
    </div>
  `).join('');

  container.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', () => selectKit(parseInt(card.dataset.index)));
  });
}

function selectKit(index) {
  state.kit = state.charClass.kits[index];

  // Update selection UI
  document.querySelectorAll('#kit-options .option-card').forEach((card, i) => {
    card.classList.toggle('selected', i === index);
  });

  // Render final character sheet
  renderCharacterSheet();
}

function renderCharacterSheet() {
  const sheet = document.getElementById('character-sheet');
  const abilities = getFinalAbilities();

  // Calculate stats
  const hp = state.charClass.hd + abilities.CON;
  const carryingCapacity = 10 + abilities.STR;

  // Calculate AC with armor
  let armorAC = 10 + abilities.DEX;
  let armorNote = "Unarmored";
  if (state.kit.items.some(i => i.includes("Chain"))) {
    armorAC = 14 + abilities.DEX;
    armorNote = "Chain";
  } else if (state.kit.items.some(i => i.includes("Leather"))) {
    armorAC = 11 + abilities.DEX;
    armorNote = "Leather";
  }
  if (state.kit.items.some(i => i.includes("Shield"))) {
    armorAC += 2;
    armorNote += " + Shield";
  }

  // Build traits HTML
  let traitsHtml = state.ancestry.traits.map(t =>
    `<div class="ancestry-trait"><strong>${t.name}${t.essential ? ' (Essential)' : ''}:</strong> ${t.desc}</div>`
  ).join('');
  if (state.ancestry.restriction) {
    traitsHtml += `<div class="ancestry-trait" style="background: #fee; border-color: #c44;"><strong>Restriction:</strong> ${state.ancestry.restriction}</div>`;
  }

  // Build feats HTML
  let featsHtml = '';
  if (state.feats.length > 0) {
    featsHtml = state.feats.map(f => `<div class="feat-box">${f}</div>`).join('');
  }
  if (state.humanFeat) {
    featsHtml += `<div class="feat-box"><strong>Human Bonus:</strong> ${state.humanFeat}</div>`;
  }

  // Spellcasting info
  let spellHtml = '';
  if (state.charClass.spellcasting) {
    const stat = state.charClass.spellcasting.stat;
    const mod = abilities[stat];
    const dc = 8 + 2 + mod; // PB is 2 at level 1
    const attack = 2 + mod;
    const prepared = Math.max(1, 1 + mod);
    spellHtml = `
      <h3>Spellcasting (${state.charClass.spellcasting.type})</h3>
      <div class="derived-stats" style="grid-template-columns: repeat(3, 1fr);">
        <div class="derived-box"><strong>${dc}</strong>Spell DC</div>
        <div class="derived-box"><strong>${formatMod(attack)}</strong>Spell Attack</div>
        <div class="derived-box"><strong>${prepared}</strong>Spells Prepared</div>
      </div>
      <p style="font-size: 0.85rem; color: #666;">Tier 1 Slots: 2 | Casting Stat: ${stat}</p>
    `;
  }

  // Ability boost notes
  let boostNote = `Class: +1 ${state.charClass.abilityBoost}`;
  if (state.humanBonusAbility) {
    boostNote += ` | Human: +1 ${state.humanBonusAbility}`;
  }

  sheet.innerHTML = `
    <h2>${state.ancestry.name} ${state.charClass.name}</h2>
    <p style="font-size: 1rem; margin-bottom: 1rem;"><strong>Background:</strong> ${state.background} | <strong>Level:</strong> 1 | <strong>PB:</strong> +2</p>

    <h3>Abilities</h3>
    <div class="stat-grid" style="max-width: 100%;">
      <div class="stat-box"><div class="label">STR</div><div class="value">${formatMod(abilities.STR)}</div></div>
      <div class="stat-box"><div class="label">DEX</div><div class="value">${formatMod(abilities.DEX)}</div></div>
      <div class="stat-box"><div class="label">CON</div><div class="value">${formatMod(abilities.CON)}</div></div>
      <div class="stat-box"><div class="label">INT</div><div class="value">${formatMod(abilities.INT)}</div></div>
      <div class="stat-box"><div class="label">WIS</div><div class="value">${formatMod(abilities.WIS)}</div></div>
      <div class="stat-box"><div class="label">CHA</div><div class="value">${formatMod(abilities.CHA)}</div></div>
    </div>
    <p style="font-size: 0.8rem; color: #666;">${boostNote} (applied above)</p>

    <h3>Combat Stats</h3>
    <div class="derived-stats">
      <div class="derived-box"><strong>${Math.max(1, hp)}</strong>HP</div>
      <div class="derived-box"><strong>${armorAC}</strong>AC (${armorNote})</div>
      <div class="derived-box"><strong>1d${state.charClass.hd}</strong>Hit Die</div>
      <div class="derived-box"><strong>${Math.max(5, carryingCapacity)}</strong>Slots</div>
    </div>

    <div class="saves-proficiencies">
      <div><strong>Proficient Saves:</strong> ${state.charClass.saves.join(', ')}</div>
      <div><strong>Languages:</strong> ${state.ancestry.languages.join(', ')}</div>
    </div>

    <h3>Proficiencies</h3>
    <p><strong>Weapons:</strong> ${state.charClass.weapons}<br>
    <strong>Armor:</strong> ${state.charClass.armor}</p>

    <h3>Ancestry Traits (${state.ancestry.name})</h3>
    ${traitsHtml}

    <h3>Class Features</h3>
    <div class="class-feature"><strong>Boost Hook:</strong> ${state.charClass.boostHook}</div>
    ${state.charClass.feature ? `<div class="class-feature"><strong>${state.charClass.feature}</strong></div>` : ''}

    ${spellHtml}

    ${featsHtml ? `<h3>Feats (${state.feats.length + (state.humanFeat ? 1 : 0)})</h3>${featsHtml}` : ''}

    <h3>Starting Equipment (${state.kit.name} Kit)</h3>
    <ul class="equipment-list">
      ${state.kit.items.map(i => `<li>${i}</li>`).join('')}
      <li>Backpack</li>
      <li>6 Torches</li>
      <li>6 Supply</li>
      <li>Wineskin</li>
      <li>25 gp</li>
    </ul>
  `;

  sheet.style.display = 'block';
  document.getElementById('final-actions').style.display = 'block';
}

function generateFullRandom() {
  // Roll abilities
  state.abilities = {
    STR: rollToMod(roll3d6()),
    DEX: rollToMod(roll3d6()),
    CON: rollToMod(roll3d6()),
    INT: rollToMod(roll3d6()),
    WIS: rollToMod(roll3d6()),
    CHA: rollToMod(roll3d6())
  };

  // Pick random ancestry
  state.ancestry = pickRandom(ANCESTRIES);

  // Pick random class (respecting restrictions)
  let availableClasses = [...CLASSES];
  if (state.ancestry.restrictedClass) {
    availableClasses = availableClasses.filter(c => c.name !== state.ancestry.restrictedClass);
  }
  state.charClass = pickRandom(availableClasses);

  // Generate feats
  state.feats = [];
  if (state.charClass.feats) {
    if (state.charClass.feats.type === 'fighter') {
      state.feats = pickRandomN(FIGHTER_FEATS, state.charClass.feats.count);
    } else if (state.charClass.feats.type === 'expert') {
      const combined = [...EXPERT_FEATS, ...GENERAL_FEATS];
      state.feats = pickRandomN(combined, state.charClass.feats.count);
    }
  }

  // Human bonuses
  if (state.ancestry.bonusFeat === 'general') {
    const available = GENERAL_FEATS.filter(f => !state.feats.includes(f));
    state.humanFeat = pickRandom(available);
  } else {
    state.humanFeat = null;
  }
  if (state.ancestry.bonusAbility) {
    state.humanBonusAbility = pickRandom(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']);
  } else {
    state.humanBonusAbility = null;
  }

  // Pick random background and kit
  state.background = pickRandom(BACKGROUNDS);
  state.kit = pickRandom(state.charClass.kits);

  // Hide the step-by-step UI and show final sheet
  document.getElementById('step-abilities').style.display = 'none';
  document.getElementById('step-ancestry').style.display = 'none';
  document.getElementById('step-class').style.display = 'none';
  document.getElementById('step-background').style.display = 'none';
  document.getElementById('step-kit').style.display = 'none';

  renderCharacterSheet();
}

function startOver() {
  state = {
    abilities: null,
    ancestry: null,
    charClass: null,
    background: null,
    kit: null,
    humanBonusAbility: null,
    feats: [],
    humanFeat: null
  };

  document.getElementById('abilities-display').style.display = 'none';
  document.getElementById('step-abilities').style.display = 'block';
  document.getElementById('step-ancestry').style.display = 'none';
  document.getElementById('step-class').style.display = 'none';
  document.getElementById('step-background').style.display = 'none';
  document.getElementById('step-kit').style.display = 'none';
  document.getElementById('character-sheet').style.display = 'none';
  document.getElementById('final-actions').style.display = 'none';
}

// ============ EVENT LISTENERS ============

document.getElementById('roll-abilities-btn').addEventListener('click', function() {
  state.abilities = {
    STR: rollToMod(roll3d6()),
    DEX: rollToMod(roll3d6()),
    CON: rollToMod(roll3d6()),
    INT: rollToMod(roll3d6()),
    WIS: rollToMod(roll3d6()),
    CHA: rollToMod(roll3d6())
  };
  renderAbilities();
});

document.getElementById('reroll-btn').addEventListener('click', function() {
  state.abilities = {
    STR: rollToMod(roll3d6()),
    DEX: rollToMod(roll3d6()),
    CON: rollToMod(roll3d6()),
    INT: rollToMod(roll3d6()),
    WIS: rollToMod(roll3d6()),
    CHA: rollToMod(roll3d6())
  };

  // Reset downstream choices
  state.ancestry = null;
  state.charClass = null;
  state.background = null;
  state.kit = null;

  document.getElementById('step-ancestry').style.display = 'none';
  document.getElementById('step-class').style.display = 'none';
  document.getElementById('step-background').style.display = 'none';
  document.getElementById('step-kit').style.display = 'none';
  document.getElementById('character-sheet').style.display = 'none';
  document.getElementById('final-actions').style.display = 'none';

  renderAbilities();
});

document.getElementById('roll-random-btn').addEventListener('click', generateFullRandom);

document.getElementById('random-background-btn').addEventListener('click', function() {
  const randomIndex = Math.floor(Math.random() * BACKGROUNDS.length);
  selectBackground(randomIndex);
});

document.getElementById('start-over-btn').addEventListener('click', startOver);
</script>

---

## How It Works

1. **Roll Abilities** - Click to roll 3d6 for each stat, converted to modifiers
2. **Choose Ancestry** - Pick your people (restrictions shown)
3. **Choose Class** - Pick your role (class boost applied automatically)
4. **Choose Background** - Pick or roll randomly from d50 table
5. **Choose Kit** - Pick your starting equipment
6. **Print** - Ctrl+P to save as PDF or print

---

*Dev tool in testing. [Report issues](https://github.com/fumbletable/osreign/issues)*
