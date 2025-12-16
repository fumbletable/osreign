---
title: Character Generator
layout: default
parent: Dev Tools
nav_order: 1
---

# Character Generator

Create characters and manage them during play. Characters auto-save to your browser.

<div id="generator-app">
  <!-- My Characters Section -->
  <div id="my-characters" class="generator-step">
    <h2>My Characters</h2>
    <div id="character-list"></div>
    <div id="character-actions" style="margin-top: 1rem;">
      <button id="new-character-btn" class="btn-primary">New Character</button>
      <button id="import-btn" class="btn-secondary" style="margin-left: 0.5rem;">Import JSON</button>
      <input type="file" id="import-file" accept=".json" style="display: none;">
    </div>
  </div>

  <!-- Generator Steps (hidden when editing existing character) -->
  <div id="generator-steps" style="display: none;">
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

    <!-- Step 6: Name Your Character -->
    <div id="step-name" class="generator-step" style="display: none;">
      <h2>Step 6: Name Your Character</h2>
      <input type="text" id="character-name-input" placeholder="Enter character name..." style="font-size: 1.1rem; padding: 0.5rem; width: 100%; max-width: 300px;">
      <button id="create-character-btn" class="btn-primary" style="margin-left: 0.5rem;">Create Character</button>
    </div>

    <div id="cancel-creation" style="margin-top: 1rem; display: none;">
      <button id="cancel-btn" class="btn-secondary">Cancel</button>
    </div>
  </div>

  <!-- Editable Character Sheet -->
  <div id="character-sheet" style="display: none;"></div>

  <div id="sheet-actions" style="display: none; margin-top: 1rem;">
    <button id="export-btn" class="btn-secondary">Export JSON</button>
    <button id="delete-btn" class="btn-secondary btn-danger" style="margin-left: 0.5rem;">Delete Character</button>
    <button id="back-to-list-btn" class="btn-secondary" style="margin-left: 0.5rem;">Back to List</button>
  </div>
</div>

<style>
  @media print {
    #my-characters, #generator-steps, #sheet-actions, .btn-primary, .btn-secondary, .btn-small, .no-print { display: none !important; }
    .site-nav, .site-header, .site-footer, .search, nav, .breadcrumb-nav { display: none !important; }
    #character-sheet {
      border: 1px solid #000 !important;
      max-width: 100% !important;
      box-shadow: none !important;
    }
    body { background: white !important; }
    .main-content { padding: 0 !important; margin: 0 !important; }
    .editable-field { border: none !important; background: transparent !important; }
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
  .btn-secondary.btn-danger { color: #c44; border-color: #c44; }
  .btn-secondary.btn-danger:hover { background: #fee; }
  .btn-small {
    font-size: 0.85rem;
    padding: 0.25rem 0.75rem;
    cursor: pointer;
    background: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-top: 0.5rem;
  }

  /* Character List */
  .character-card {
    border: 2px solid #ccc;
    padding: 1rem;
    border-radius: 6px;
    margin-bottom: 0.75rem;
    cursor: pointer;
    transition: all 0.15s;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .character-card:hover {
    border-color: #2c5282;
    background: #f0f4f8;
  }
  .character-card .char-info h3 {
    margin: 0 0 0.25rem 0;
    color: #2c5282;
  }
  .character-card .char-info .char-details {
    font-size: 0.85rem;
    color: #666;
  }
  .character-card .char-hp {
    font-size: 1.25rem;
    font-weight: bold;
    color: #333;
  }
  .no-characters {
    color: #666;
    font-style: italic;
    padding: 1rem 0;
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

  /* Editable fields */
  .editable-field {
    border: 1px dashed #ccc;
    background: #fafafa;
    padding: 2px 4px;
    border-radius: 3px;
    min-width: 30px;
    display: inline-block;
  }
  .editable-field:hover {
    border-color: #2c5282;
    background: #f0f4f8;
  }
  .editable-field:focus {
    outline: none;
    border-color: #2c5282;
    border-style: solid;
    background: white;
  }
  .editable-number {
    width: 40px;
    text-align: center;
  }

  /* Resource trackers */
  .resource-tracker {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0.5rem 0;
  }
  .resource-tracker label {
    font-weight: bold;
    min-width: 100px;
  }
  .tracker-boxes {
    display: flex;
    gap: 4px;
  }
  .tracker-box {
    width: 24px;
    height: 24px;
    border: 2px solid #666;
    border-radius: 3px;
    cursor: pointer;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
  }
  .tracker-box.checked {
    background: #2c5282;
    color: white;
  }
  .tracker-box:hover {
    border-color: #2c5282;
  }

  /* Fatigue tracker */
  .fatigue-level {
    padding: 0.25rem 0.5rem;
    border: 1px solid #ddd;
    border-radius: 3px;
    margin-right: 0.25rem;
    cursor: pointer;
    font-size: 0.8rem;
  }
  .fatigue-level.active {
    background: #c44;
    color: white;
    border-color: #c44;
  }
  .fatigue-level:hover {
    border-color: #c44;
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
  .derived-box.editable-box {
    cursor: pointer;
  }
  .derived-box.editable-box:hover {
    background: #e0e8f0;
  }

  /* Equipment list */
  .equipment-section {
    margin: 0.5rem 0;
  }
  .equipment-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0;
    border-bottom: 1px solid #eee;
  }
  .equipment-item .item-name {
    flex: 1;
  }
  .equipment-item .item-slots {
    width: 30px;
    text-align: center;
    color: #666;
    font-size: 0.85rem;
  }
  .equipment-item .remove-item {
    color: #c44;
    cursor: pointer;
    font-size: 0.8rem;
    padding: 0 0.25rem;
  }
  .equipment-item .remove-item:hover {
    background: #fee;
  }
  .add-item-row {
    margin-top: 0.5rem;
  }
  .add-item-row input {
    padding: 0.25rem 0.5rem;
    border: 1px solid #ccc;
    border-radius: 3px;
    width: 200px;
  }
  .add-item-row button {
    margin-left: 0.5rem;
  }

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

  /* Weapons table */
  .weapons-table {
    width: 100%;
    border-collapse: collapse;
    margin: 0.5rem 0;
    font-size: 0.9rem;
  }
  .weapons-table th {
    background: #e8f0fe;
    padding: 0.4rem;
    text-align: left;
    border-bottom: 2px solid #2c5282;
    font-size: 0.8rem;
    color: #2c5282;
  }
  .weapons-table td {
    padding: 0.4rem;
    border-bottom: 1px solid #eee;
  }
  .weapons-table .weapon-name {
    font-weight: bold;
  }
  .weapons-table .weapon-attack {
    color: #2c5282;
    font-weight: bold;
  }
  .weapons-table .weapon-damage {
    font-family: monospace;
  }
  .weapons-table .weapon-tags {
    font-size: 0.8rem;
    color: #666;
  }
  .weapons-table .remove-weapon {
    color: #c44;
    cursor: pointer;
    padding: 0 0.25rem;
  }
  .add-weapon-row {
    margin-top: 0.5rem;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    align-items: center;
  }
  .add-weapon-row input, .add-weapon-row select {
    padding: 0.25rem 0.5rem;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .add-weapon-row input[type="text"] {
    width: 120px;
  }
  .add-weapon-row select {
    width: 100px;
  }

  /* Spell slots grid */
  .spell-slots-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.5rem;
    margin: 0.5rem 0;
  }
  .spell-slot-tier {
    text-align: center;
    padding: 0.25rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #fafafa;
  }
  .spell-slot-tier.disabled {
    opacity: 0.4;
    background: #eee;
  }
  .spell-slot-tier .tier-label {
    font-size: 0.7rem;
    font-weight: bold;
    color: #666;
  }
  .spell-slot-tier .slot-tracker {
    font-size: 1rem;
    font-weight: bold;
  }
  .spell-slot-tier input {
    width: 30px;
    text-align: center;
    border: 1px dashed #ccc;
    border-radius: 3px;
    padding: 2px;
  }

  /* Prepared spells */
  .prepared-spells-list {
    margin: 0.5rem 0;
  }
  .prepared-spell {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0;
    border-bottom: 1px solid #eee;
  }
  .prepared-spell .spell-tier-badge {
    background: #2c5282;
    color: white;
    padding: 0.1rem 0.4rem;
    border-radius: 3px;
    font-size: 0.7rem;
    font-weight: bold;
    min-width: 20px;
    text-align: center;
  }
  .prepared-spell .spell-name {
    flex: 1;
  }
  .prepared-spell .remove-spell {
    color: #c44;
    cursor: pointer;
    padding: 0 0.25rem;
  }
  .add-spell-row {
    margin-top: 0.5rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  .add-spell-row input {
    padding: 0.25rem 0.5rem;
    border: 1px solid #ccc;
    border-radius: 3px;
    width: 180px;
  }
  .add-spell-row select {
    padding: 0.25rem;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  /* Editable feats */
  .feats-section {
    margin: 0.5rem 0;
  }
  .feat-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #fff8e8;
    padding: 0.5rem 0.75rem;
    margin: 0.25rem 0;
    border-left: 3px solid #b8860b;
  }
  .feat-item .feat-name {
    flex: 1;
    font-size: 0.9rem;
  }
  .feat-item .feat-source {
    font-size: 0.75rem;
    color: #888;
  }
  .feat-item .remove-feat {
    color: #c44;
    cursor: pointer;
    font-size: 0.8rem;
    padding: 0 0.25rem;
  }
  .add-feat-row {
    margin-top: 0.5rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  .add-feat-row select {
    padding: 0.25rem 0.5rem;
    border: 1px solid #ccc;
    border-radius: 3px;
    width: 200px;
  }

  /* Feat tooltips */
  .feat-item {
    position: relative;
    cursor: help;
  }
  .feat-item .feat-tooltip {
    display: none;
    position: absolute;
    left: 0;
    top: 100%;
    z-index: 100;
    background: #333;
    color: #fff;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    font-size: 0.8rem;
    width: max-content;
    max-width: 300px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    margin-top: 4px;
    line-height: 1.4;
  }
  .feat-item:hover .feat-tooltip {
    display: block;
  }
  .feat-item .feat-tooltip::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 12px;
    border: 6px solid transparent;
    border-bottom-color: #333;
  }

  /* Coins section */
  .coins-row {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin: 0.5rem 0;
  }
  .coin-group {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  .coin-group label {
    font-weight: bold;
    font-size: 0.9rem;
  }
  .coin-input {
    width: 50px;
    text-align: center;
    padding: 0.25rem;
    border: 1px dashed #ccc;
    border-radius: 3px;
  }

  /* Notes section */
  .notes-area {
    width: 100%;
    min-height: 100px;
    padding: 0.5rem;
    border: 1px dashed #ccc;
    border-radius: 4px;
    font-family: inherit;
    font-size: 0.9rem;
    resize: vertical;
  }
  .notes-area:focus {
    outline: none;
    border-color: #2c5282;
    border-style: solid;
  }

  /* Auto-save indicator */
  .save-indicator {
    font-size: 0.8rem;
    color: #4a7c23;
    margin-left: 1rem;
  }
</style>

<script>
// ============ DATA ============

const STORAGE_KEY = 'oswr-characters';

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

// Feat descriptions database
const FEAT_DESCRIPTIONS = {
  // General Feats
  "Alchemist": "EDGE to craft or identify potions.",
  "Ancient Lore": "EDGE on history and arcane knowledge checks.",
  "Animal Companion": "Gain a loyal 1 HD animal companion.",
  "Animal Whisperer": "EDGE to calm, ride, or direct animals.",
  "Armor Proficiency": "Gain proficiency with the next armor tier (Light \u2192 Medium \u2192 Heavy).",
  "Attractive": "EDGE on CHA checks when looks would matter.",
  "Aura of Courage": "Allies within NEAR gain EDGE on saves vs fear.",
  "Beast Bond": "Your animal companion gains +1 HD and +1 to attack. Requires Animal Companion.",
  "Brawler": "Add PB to unarmed attacks and grapple checks. Unarmed strikes deal 1d4 (1d6 at level 5, 1d8 at level 9).",
  "Centered Mind": "Once per rest, end one charm or fear effect on yourself.",
  "Countercharm": "While you perform, allies within NEAR gain EDGE vs charm and fear.",
  "Cutting Words": "Spend a Boost Die to impose SETBACK on one enemy's next roll.",
  "Disease Immunity": "You are immune to non-magical diseases.",
  "Divine Sense": "You can sense undead and fiendish presence within NEAR.",
  "Dual Wielder": "EDGE on attacks when fighting with two weapons.",
  "Empath": "You can sense surface emotions in others.",
  "Endurance": "EDGE on saves vs fatigue and exhaustion, once per day.",
  "Escape Artist": "EDGE to escape bonds, grapples, and restraints.",
  "Fast Healer": "When you spend Hit Dice to heal, add +1 HP per die.",
  "Favored Enemy": "Choose a creature type. EDGE to track, recall lore, and attack that type.",
  "Fearless": "Auto-succeed vs mundane fear; EDGE vs magical fear.",
  "Fleet of Foot": "+5 ft to your Speed.",
  "Gift of Tongues": "Learn 2 additional languages.",
  "Healer": "Spend 1 Supply to heal an ally for 1d6 + your CON.",
  "Heavy Armor Master": "While wearing heavy armor, reduce non-magical physical damage by 2.",
  "Herbalist": "EDGE to identify and craft herbal remedies. Herbs count as Supply for healing.",
  "Hold Breath": "You can hold your breath for CON minutes instead of CON rounds.",
  "Hunter's Mark": "Mark one target. You have EDGE on attacks against that target until it dies or you rest.",
  "Improved Initiative": "+2 to Initiative rolls.",
  "Jack of All Trades": "Once per scene, add PB to any check you're not proficient in.",
  "Keen Senses": "Pick one sense (hearing, sight, or smell). EDGE on checks using that sense. Can take multiple times.",
  "Leadership": "Spend a Boost Die to grant an ally EDGE on their next roll.",
  "Linguist": "Learn 2 additional languages.",
  "Lucky": "Once per session, reroll any die. Halflings only.",
  "Magic Resistance": "EDGE on saves vs spells and magical effects.",
  "Martial Adept": "Take one Fighter Feat (you must meet any requirements).",
  "Mentor": "Once per session, grant a PC you've trained +1 to a roll.",
  "Mounted Combatant": "EDGE on melee attacks against creatures smaller than your mount.",
  "Natural Explorer": "Ignore difficult terrain. You can sense weather changes 24 hours ahead.",
  "Opportunist": "When an adjacent enemy misses you, make a free attack against them.",
  "Poison Resistance": "EDGE on saves vs poison.",
  "Polearm Master": "Your reach with polearms extends to 10 ft.",
  "Quick Draw": "Swap weapons as a free action.",
  "Resilience": "Once per day, reroll a failed save.",
  "Resilient": "+1 to saves of one type (choose when you take this feat).",
  "Rider": "You never fall from your mount involuntarily.",
  "Shield Master": "Add PB to DEX saves while wielding a shield.",
  "Strong Back": "+5 item slots to your carrying capacity.",
  "Survivalist": "EDGE on checks to track or forage.",
  "Tactician": "Allies within NEAR gain EDGE on Initiative rolls.",
  "Tough": "+2 HP per level (retroactive).",
  "Unarmored Defense": "When unarmored, AC = 10 + DEX + CON.",
  "Weapon Mastery": "Gain proficiency with one weapon category (Light, Medium, or Heavy).",
  // Fighter Feats
  "Adaptive Fighter": "Choose one damage type. Reduce damage of that type by 1. Can take multiple times.",
  "Adrenaline Rush": "Once per combat, take one additional action on your turn.",
  "Ambush Hunter": "On the first round of combat, deal +1d6 damage on a hit.",
  "Armor Master": "+1 AC. Heavy armor no longer imposes Stealth penalties.",
  "Battlecry": "As an action, all enemies within NEAR must make a WIS save or be Frightened for 1 round.",
  "Blind Fighting": "No attack penalties in darkness or against invisible foes in melee.",
  "Bodyguard": "Once per round, redirect an attack against an adjacent ally to yourself.",
  "Cavalry Charge": "When you charge while mounted, deal +1d6 damage. Target must pass STR save or fall prone.",
  "Cutting Edge": "Once per turn, reroll your damage dice. You must take the new result.",
  "Death Strike": "When you drop a foe to 0 HP, immediately make another melee attack.",
  "Debilitating Blow": "On a hit, reduce the target's Speed to half for 1 round.",
  "Deflect Missiles": "+3 AC against ranged attacks.",
  "Duelist": "+2 AC when wielding a one-handed weapon and no shield. Light or medium armor only.",
  "Eagle Eye": "Mark one target. EDGE on ranged attacks against that target until you mark another.",
  "Feint": "After taking the Dodge action, your next melee attack gains EDGE and +1d6 damage.",
  "Heavy Hitter": "On a critical hit with a two-handed weapon, roll one additional damage die.",
  "Hold the Line": "When an enemy moves into your reach, make a free attack against them.",
  "Hurl Weapon": "Throw any melee weapon to NEAR range without penalty.",
  "Iron Grip": "You cannot be disarmed.",
  "Last Stand": "When reduced to 0 HP, you may continue fighting for 1 round before falling.",
  "Overpower": "EDGE on grapple and shove attempts.",
  "Quick Reflexes": "Add PB to Initiative rolls.",
  "Second Wind": "Once per combat, heal 1d6 + CON as a bonus action.",
  "Shield Bash": "Make an attack with your shield. On a hit, push the target 5 ft or knock them prone.",
  "Skirmisher": "Move up to half your Speed without provoking opportunity attacks.",
  "Stalwart": "EDGE on saves vs fear and charm while wearing armor.",
  "Weapon Specialization": "+1 damage with one chosen weapon type. Can take multiple times.",
  "Whirlwind Attack": "Once per day, attack all enemies within CLOSE range.",
  // Expert Feats
  "Backstab": "From hidden: EDGE on the attack, +2 \u00d7 your level damage. Once per target per combat.",
  "Contacts (High)": "You have connections among nobles, merchants, and guild leaders.",
  "Contacts (Low)": "You have connections in the underworld\u2014thieves, fences, smugglers.",
  "Disguise": "EDGE on checks to pass yourself off as someone else.",
  "Forgery Master": "EDGE to forge documents or spot forgeries.",
  "Gambit": "Take SETBACK on your current roll. Your next roll this turn gains +2 dice (roll 3, keep best).",
  "Garrote": "From behind: restrain and silence your target. They escape on a STR save (DC 12).",
  "Hide in Shadows": "After breaking line of sight, EDGE to remain hidden.",
  "Infiltrator": "EDGE on stealth and deception checks against guards and sentries.",
  "Innate Tracker": "EDGE to track creatures (numbers, size, time elapsed).",
  "Master of Disguise": "Allies using your disguises also gain EDGE.",
  "Pick Locks": "Open non-magical locks with thieves' tools. No check required for mundane locks.",
  "Pick Pockets": "Attempt theft unnoticed. Your DEX vs their WIS.",
  "Poisoner": "Craft and apply poisons. Immune to your own poisons.",
  "Silver Tongue": "EDGE on checks to deceive, lie, or misdirect.",
  "Sleight of Hand": "Conceal or palm small items without being noticed.",
  "Trap Expert": "EDGE to find, disable, or set traps.",
  "Winning Smile": "EDGE on checks to persuade, charm, or negotiate."
};

// Weapons database
const WEAPONS = {
  // Light weapons
  "Dagger": { damage: "1d4", stat: "DEX", tags: ["Light", "Finesse", "Thrown (Close)"] },
  "Club": { damage: "1d4", stat: "STR", tags: ["Light"] },
  "Sickle": { damage: "1d4", stat: "STR", tags: ["Light"] },
  "Handaxe": { damage: "1d6", stat: "STR", tags: ["Light", "Thrown (Close)"] },
  "Light Hammer": { damage: "1d4", stat: "STR", tags: ["Light", "Thrown (Close)"] },
  // Medium weapons
  "Shortsword": { damage: "1d6", stat: "DEX", tags: ["Finesse"] },
  "Rapier": { damage: "1d8", stat: "DEX", tags: ["Finesse"] },
  "Scimitar": { damage: "1d6", stat: "DEX", tags: ["Finesse"] },
  "Mace": { damage: "1d6", stat: "STR", tags: ["Bludgeoning"] },
  "Flail": { damage: "1d8", stat: "STR", tags: ["Bludgeoning"] },
  "Morningstar": { damage: "1d8", stat: "STR", tags: ["Bludgeoning"] },
  "Warhammer": { damage: "1d8", stat: "STR", tags: ["Versatile (1d10)", "Bludgeoning"] },
  "Longsword": { damage: "1d8", stat: "STR", tags: ["Versatile (1d10)"] },
  "Battleaxe": { damage: "1d8", stat: "STR", tags: ["Versatile (1d10)"] },
  "Spear": { damage: "1d6", stat: "STR", tags: ["Versatile (1d8)", "Thrown (Close)"] },
  "Quarterstaff": { damage: "1d6", stat: "STR", tags: ["Versatile (1d8)"] },
  // Heavy weapons
  "Greatsword": { damage: "2d6", stat: "STR", tags: ["Heavy", "Two-Handed"] },
  "Greataxe": { damage: "1d12", stat: "STR", tags: ["Heavy", "Two-Handed"] },
  "Maul": { damage: "2d6", stat: "STR", tags: ["Heavy", "Two-Handed", "Bludgeoning"] },
  "Halberd": { damage: "1d10", stat: "STR", tags: ["Heavy", "Two-Handed", "Reach"] },
  "Pike": { damage: "1d10", stat: "STR", tags: ["Heavy", "Two-Handed", "Reach"] },
  "Glaive": { damage: "1d10", stat: "STR", tags: ["Heavy", "Two-Handed", "Reach"] },
  // Ranged
  "Shortbow": { damage: "1d6", stat: "DEX", tags: ["Ranged (Near/Far)", "Two-Handed"] },
  "Longbow": { damage: "1d8", stat: "DEX", tags: ["Ranged (Near/Far)", "Two-Handed", "Heavy"] },
  "Light Crossbow": { damage: "1d8", stat: "DEX", tags: ["Ranged (Near/Far)", "Loading", "Two-Handed"] },
  "Heavy Crossbow": { damage: "1d10", stat: "DEX", tags: ["Ranged (Near/Far)", "Loading", "Heavy", "Two-Handed"] },
  "Sling": { damage: "1d4", stat: "DEX", tags: ["Ranged (Close/Near)"] },
  "Javelin": { damage: "1d6", stat: "STR", tags: ["Thrown (Close/Near)"] },
  // Special
  "Unarmed": { damage: "1d4", stat: "STR", tags: ["Light"] },
  "Staff (Arcane)": { damage: "1d6", stat: "STR", tags: ["Versatile (1d8)", "Focus"] }
};

// Spell slots by level (max slots per tier)
const SPELL_SLOTS_BY_LEVEL = {
  1: { t1: 2, t2: 0, t3: 0, t4: 0, t5: 0, t6: 0 },
  2: { t1: 3, t2: 0, t3: 0, t4: 0, t5: 0, t6: 0 },
  3: { t1: 4, t2: 2, t3: 0, t4: 0, t5: 0, t6: 0 },
  4: { t1: 4, t2: 3, t3: 0, t4: 0, t5: 0, t6: 0 },
  5: { t1: 4, t2: 3, t3: 2, t4: 0, t5: 0, t6: 0 },
  6: { t1: 4, t2: 3, t3: 3, t4: 0, t5: 0, t6: 0 },
  7: { t1: 4, t2: 3, t3: 3, t4: 2, t5: 0, t6: 0 },
  8: { t1: 4, t2: 3, t3: 3, t4: 3, t5: 0, t6: 0 },
  9: { t1: 4, t2: 3, t3: 3, t4: 3, t5: 2, t6: 0 },
  10: { t1: 4, t2: 3, t3: 3, t4: 3, t5: 3, t6: 1 }
};

// ============ STATE ============

let characters = []; // Array of saved characters
let currentCharacterId = null; // ID of character being edited
let generatorState = {
  abilities: null,
  ancestry: null,
  charClass: null,
  background: null,
  kit: null,
  humanBonusAbility: null,
  feats: [],
  humanFeat: null
};

// ============ STORAGE ============

function loadCharacters() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    characters = data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load characters:', e);
    characters = [];
  }
}

function saveCharacters() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
  } catch (e) {
    console.error('Failed to save characters:', e);
  }
}

function saveCurrentCharacter() {
  if (!currentCharacterId) return;
  const idx = characters.findIndex(c => c.id === currentCharacterId);
  if (idx >= 0) {
    saveCharacters();
    showSaveIndicator();
  }
}

function showSaveIndicator() {
  const existing = document.querySelector('.save-indicator');
  if (existing) existing.remove();

  const indicator = document.createElement('span');
  indicator.className = 'save-indicator';
  indicator.textContent = 'Saved';
  document.querySelector('#character-sheet h2')?.appendChild(indicator);

  setTimeout(() => indicator.remove(), 1500);
}

// ============ UTILITIES ============

function generateId() {
  return 'char_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

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

function getFinalAbilities(state) {
  const final = { ...state.abilities };
  if (state.charClass) {
    const classData = typeof state.charClass === 'string'
      ? CLASSES.find(c => c.name === state.charClass)
      : state.charClass;
    if (classData) {
      final[classData.abilityBoost] = Math.min(4, final[classData.abilityBoost] + 1);
    }
  }
  if (state.humanBonusAbility) {
    final[state.humanBonusAbility] = Math.min(4, final[state.humanBonusAbility] + 1);
  }
  return final;
}

// ============ CHARACTER LIST ============

function renderCharacterList() {
  const container = document.getElementById('character-list');

  if (characters.length === 0) {
    container.innerHTML = '<p class="no-characters">No characters yet. Create one to get started!</p>';
    return;
  }

  container.innerHTML = characters.map(char => `
    <div class="character-card" data-id="${char.id}">
      <div class="char-info">
        <h3>${char.name}</h3>
        <div class="char-details">
          Level ${char.level || 1} ${char.ancestry} ${char.className} | ${char.background}
        </div>
      </div>
      <div class="char-hp">${char.currentHp}/${char.maxHp} HP</div>
    </div>
  `).join('');

  container.querySelectorAll('.character-card').forEach(card => {
    card.addEventListener('click', () => loadCharacter(card.dataset.id));
  });
}

function loadCharacter(id) {
  const char = characters.find(c => c.id === id);
  if (!char) return;

  currentCharacterId = id;
  document.getElementById('my-characters').style.display = 'none';
  document.getElementById('generator-steps').style.display = 'none';
  renderEditableSheet(char);
}

// ============ EDITABLE CHARACTER SHEET ============

function renderEditableSheet(char) {
  const sheet = document.getElementById('character-sheet');
  const classData = CLASSES.find(c => c.name === char.className);
  const ancestryData = ANCESTRIES.find(a => a.name === char.ancestry);

  // Calculate derived stats
  const pb = char.level <= 4 ? 2 : (char.level <= 8 ? 3 : 4);
  const startingBoost = Math.floor(pb / 2);

  // Build traits HTML
  let traitsHtml = '';
  if (ancestryData) {
    traitsHtml = ancestryData.traits.map(t =>
      `<div class="ancestry-trait"><strong>${t.name}${t.essential ? ' (Essential)' : ''}:</strong> ${t.desc}</div>`
    ).join('');
    if (ancestryData.restriction) {
      traitsHtml += `<div class="ancestry-trait" style="background: #fee; border-color: #c44;"><strong>Restriction:</strong> ${ancestryData.restriction}</div>`;
    }
  }

  // Build editable feats HTML
  let featsHtml = '';
  const allFeats = char.feats || [];
  if (allFeats.length > 0 || char.humanFeat) {
    featsHtml = `<div class="feats-section">`;
    featsHtml += allFeats.map((f, idx) => `
      <div class="feat-item">
        <span class="feat-name">${f}</span>
        <span class="remove-feat" data-idx="${idx}">&times;</span>
        <span class="feat-tooltip">${FEAT_DESCRIPTIONS[f] || 'No description available.'}</span>
      </div>
    `).join('');
    if (char.humanFeat) {
      featsHtml += `
        <div class="feat-item">
          <span class="feat-name">${char.humanFeat}</span>
          <span class="feat-source">(Human)</span>
          <span class="feat-tooltip">${FEAT_DESCRIPTIONS[char.humanFeat] || 'No description available.'}</span>
        </div>
      `;
    }
    const excludedFeats = [...allFeats, char.humanFeat].filter(Boolean);
    featsHtml += `
      <div class="add-feat-row">
        <select id="add-feat-select">
          <option value="">Add feat...</option>
          <optgroup label="General Feats">
            ${GENERAL_FEATS.filter(f => !excludedFeats.includes(f)).map(f => `<option value="${f}">${f}</option>`).join('')}
          </optgroup>
          <optgroup label="Fighter Feats">
            ${FIGHTER_FEATS.filter(f => !excludedFeats.includes(f)).map(f => `<option value="${f}">${f}</option>`).join('')}
          </optgroup>
          <optgroup label="Expert Feats">
            ${EXPERT_FEATS.filter(f => !excludedFeats.includes(f)).map(f => `<option value="${f}">${f}</option>`).join('')}
          </optgroup>
        </select>
        <button class="btn-small" id="add-feat-btn">Add</button>
      </div>
    </div>`;
  } else {
    featsHtml = `<div class="feats-section">
      <p style="color: #666; font-style: italic;">No feats</p>
      <div class="add-feat-row">
        <select id="add-feat-select">
          <option value="">Add feat...</option>
          <optgroup label="General Feats">
            ${GENERAL_FEATS.map(f => `<option value="${f}">${f}</option>`).join('')}
          </optgroup>
          <optgroup label="Fighter Feats">
            ${FIGHTER_FEATS.map(f => `<option value="${f}">${f}</option>`).join('')}
          </optgroup>
          <optgroup label="Expert Feats">
            ${EXPERT_FEATS.map(f => `<option value="${f}">${f}</option>`).join('')}
          </optgroup>
        </select>
        <button class="btn-small" id="add-feat-btn">Add</button>
      </div>
    </div>`;
  }

  // Build weapons HTML
  const weapons = char.weapons || [];
  const weaponsHtml = `
    <table class="weapons-table">
      <thead>
        <tr>
          <th>Weapon</th>
          <th>Attack</th>
          <th>Damage</th>
          <th>Tags</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${weapons.map((w, idx) => {
          const weaponData = WEAPONS[w.name] || { damage: w.damage || "1d6", stat: "STR", tags: [] };
          const statMod = char.finalAbilities[weaponData.stat] || 0;
          const attackBonus = pb + statMod;
          const damageBonus = statMod;
          return `
            <tr>
              <td class="weapon-name">${w.name}</td>
              <td class="weapon-attack">${formatMod(attackBonus)}</td>
              <td class="weapon-damage">${weaponData.damage}${damageBonus >= 0 ? '+' : ''}${damageBonus}</td>
              <td class="weapon-tags">${weaponData.tags.join(', ')}</td>
              <td><span class="remove-weapon" data-idx="${idx}">&times;</span></td>
            </tr>
          `;
        }).join('')}
        ${weapons.length === 0 ? '<tr><td colspan="5" style="color: #666; font-style: italic;">No weapons added</td></tr>' : ''}
      </tbody>
    </table>
    <div class="add-weapon-row">
      <select id="add-weapon-select">
        <option value="">Add weapon...</option>
        ${Object.keys(WEAPONS).sort().map(w => `<option value="${w}">${w}</option>`).join('')}
      </select>
      <button class="btn-small" id="add-weapon-btn">Add</button>
    </div>
  `;

  // Spellcasting (full 6 tiers)
  let spellHtml = '';
  if (classData?.spellcasting) {
    const stat = classData.spellcasting.stat;
    const mod = char.finalAbilities[stat];
    const dc = 8 + pb + mod;
    const attack = pb + mod;
    const charLevel = char.level || 1;
    const prepared = Math.max(1, charLevel + mod);
    const maxSlots = SPELL_SLOTS_BY_LEVEL[Math.min(charLevel, 10)] || SPELL_SLOTS_BY_LEVEL[1];

    // Initialize spell slots if needed
    if (!char.spellSlots) {
      char.spellSlots = {};
    }
    for (let t = 1; t <= 6; t++) {
      const key = `t${t}`;
      if (!char.spellSlots[key]) {
        char.spellSlots[key] = { current: maxSlots[key], max: maxSlots[key] };
      }
      // Update max based on level
      char.spellSlots[key].max = maxSlots[key];
    }

    const preparedSpells = char.preparedSpells || [];

    spellHtml = `
      <h3>Spellcasting (${classData.spellcasting.type})</h3>
      <div class="derived-stats" style="grid-template-columns: repeat(3, 1fr);">
        <div class="derived-box"><strong>${dc}</strong>Spell DC</div>
        <div class="derived-box"><strong>${formatMod(attack)}</strong>Spell Attack</div>
        <div class="derived-box"><strong>${prepared}</strong>Prepared</div>
      </div>

      <h4 style="margin: 0.75rem 0 0.25rem; font-size: 0.95rem;">Spell Slots</h4>
      <div class="spell-slots-grid">
        ${[1,2,3,4,5,6].map(tier => {
          const key = `t${tier}`;
          const max = char.spellSlots[key].max;
          const current = char.spellSlots[key].current;
          const disabled = max === 0;
          return `
            <div class="spell-slot-tier ${disabled ? 'disabled' : ''}">
              <div class="tier-label">Tier ${tier}</div>
              <div class="slot-tracker">
                ${disabled ? '-' : `<input type="number" min="0" max="${max}" value="${current}" data-slot-tier="${key}"> / ${max}`}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <h4 style="margin: 0.75rem 0 0.25rem; font-size: 0.95rem;">Prepared Spells <span style="font-weight: normal; color: #666;">(${preparedSpells.length}/${prepared})</span></h4>
      <div class="prepared-spells-list">
        ${preparedSpells.map((spell, idx) => `
          <div class="prepared-spell">
            <span class="spell-tier-badge">T${spell.tier}</span>
            <span class="spell-name">${spell.name}</span>
            <span class="remove-spell" data-idx="${idx}">&times;</span>
          </div>
        `).join('')}
        ${preparedSpells.length === 0 ? '<p style="color: #666; font-style: italic; margin: 0.25rem 0;">No spells prepared</p>' : ''}
      </div>
      <div class="add-spell-row">
        <input type="text" id="new-spell-name" placeholder="Spell name...">
        <select id="new-spell-tier">
          ${[1,2,3,4,5,6].map(t => `<option value="${t}" ${maxSlots[`t${t}`] === 0 ? 'disabled' : ''}>Tier ${t}</option>`).join('')}
        </select>
        <button class="btn-small" id="add-spell-btn">Add</button>
      </div>
    `;
  }

  // Equipment list
  const equipmentHtml = (char.equipment || []).map((item, idx) => `
    <div class="equipment-item" data-idx="${idx}">
      <span class="editable-field item-name" contenteditable="true" data-field="equipment.${idx}">${item}</span>
      <span class="item-slots">1</span>
      <span class="remove-item" data-idx="${idx}">&times;</span>
    </div>
  `).join('');

  sheet.innerHTML = `
    <h2>${char.name}</h2>
    <p style="font-size: 1rem; margin-bottom: 1rem;">
      <strong>Ancestry:</strong> ${char.ancestry} |
      <strong>Class:</strong> ${char.className} |
      <strong>Background:</strong> ${char.background} |
      <strong>Level:</strong> <span class="editable-field editable-number" contenteditable="true" data-field="level">${char.level || 1}</span> |
      <strong>PB:</strong> +${pb}
    </p>

    <h3>Abilities</h3>
    <div class="stat-grid" style="max-width: 100%;">
      ${['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].map(stat => `
        <div class="stat-box">
          <div class="label">${stat}</div>
          <div class="value">${formatMod(char.finalAbilities[stat])}</div>
        </div>
      `).join('')}
    </div>

    <h3>Combat</h3>
    <div class="derived-stats">
      <div class="derived-box editable-box">
        <strong><span class="editable-field editable-number" contenteditable="true" data-field="currentHp">${char.currentHp}</span>/<span class="editable-field editable-number" contenteditable="true" data-field="maxHp">${char.maxHp}</span></strong>
        HP
      </div>
      <div class="derived-box"><strong>${char.ac}</strong>AC</div>
      <div class="derived-box"><strong>1d${classData?.hd || 8}</strong>Hit Die</div>
      <div class="derived-box"><strong>${char.slots}</strong>Slots</div>
    </div>

    <div class="resource-tracker">
      <label>Fatigue:</label>
      <div class="tracker-boxes">
        ${[1,2,3,4,5].map(level => `
          <span class="fatigue-level ${(char.fatigue || 0) >= level ? 'active' : ''}" data-level="${level}">${level}</span>
        `).join('')}
      </div>
      <span style="font-size: 0.8rem; color: #666; margin-left: 0.5rem;">
        ${char.fatigue >= 5 ? 'Incapacitated!' : char.fatigue >= 3 ? 'Speed: Slow' : ''}
        ${char.fatigue > 0 && char.fatigue < 5 ? `-${char.fatigue} to checks/saves` : ''}
      </span>
    </div>

    <div class="resource-tracker">
      <label>Boost Dice:</label>
      <div class="tracker-boxes">
        ${Array(Math.max(startingBoost, char.boostDice || 0) + 2).fill(0).map((_, i) => `
          <div class="tracker-box ${i < (char.boostDice ?? startingBoost) ? 'checked' : ''}" data-boost="${i}"></div>
        `).join('')}
      </div>
      <span style="font-size: 0.8rem; color: #666; margin-left: 0.5rem;">(Session start: ${startingBoost})</span>
    </div>

    <div class="saves-proficiencies">
      <div><strong>Proficient Saves:</strong> ${classData?.saves.join(', ') || 'None'}</div>
      <div><strong>Languages:</strong> ${ancestryData?.languages.join(', ') || 'Common'}</div>
    </div>

    <h3>Proficiencies</h3>
    <p><strong>Weapons:</strong> ${classData?.weapons || 'None'}<br>
    <strong>Armor:</strong> ${classData?.armor || 'None'}</p>

    <h3>Weapons</h3>
    ${weaponsHtml}

    ${spellHtml}

    <h3>Feats</h3>
    ${featsHtml}

    <h3>Ancestry Traits (${char.ancestry})</h3>
    ${traitsHtml}

    <h3>Class Features</h3>
    <div class="class-feature"><strong>Boost Hook:</strong> ${classData?.boostHook || 'None'}</div>
    ${classData?.feature ? `<div class="class-feature"><strong>${classData.feature}</strong></div>` : ''}

    <h3>Equipment <span style="font-size: 0.8rem; color: #666;">(${(char.equipment || []).length} items)</span></h3>
    <div class="equipment-section">
      ${equipmentHtml}
      <div class="add-item-row">
        <input type="text" id="new-item-input" placeholder="Add item...">
        <button class="btn-small" id="add-item-btn">Add</button>
      </div>
    </div>

    <h3>Coins</h3>
    <div class="coins-row">
      <div class="coin-group">
        <label>GP:</label>
        <input type="number" class="coin-input" data-field="coins.gp" value="${char.coins?.gp ?? 25}">
      </div>
      <div class="coin-group">
        <label>SP:</label>
        <input type="number" class="coin-input" data-field="coins.sp" value="${char.coins?.sp ?? 0}">
      </div>
      <div class="coin-group">
        <label>CP:</label>
        <input type="number" class="coin-input" data-field="coins.cp" value="${char.coins?.cp ?? 0}">
      </div>
    </div>

    <h3>Notes</h3>
    <textarea class="notes-area" data-field="notes" placeholder="Session notes, backstory, reminders...">${char.notes || ''}</textarea>
  `;

  sheet.style.display = 'block';
  document.getElementById('sheet-actions').style.display = 'block';

  // Attach event listeners
  attachSheetListeners(char);
}

function attachSheetListeners(char) {
  // Editable fields
  document.querySelectorAll('.editable-field').forEach(field => {
    field.addEventListener('blur', () => {
      const fieldPath = field.dataset.field;
      const value = field.textContent.trim();
      updateCharacterField(char, fieldPath, value);
    });
    field.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        field.blur();
      }
    });
  });

  // Coin inputs
  document.querySelectorAll('.coin-input').forEach(input => {
    input.addEventListener('change', () => {
      const fieldPath = input.dataset.field;
      updateCharacterField(char, fieldPath, parseInt(input.value) || 0);
    });
  });

  // Notes
  const notesArea = document.querySelector('.notes-area');
  if (notesArea) {
    notesArea.addEventListener('blur', () => {
      char.notes = notesArea.value;
      saveCurrentCharacter();
    });
  }

  // Fatigue levels
  document.querySelectorAll('.fatigue-level').forEach(btn => {
    btn.addEventListener('click', () => {
      const level = parseInt(btn.dataset.level);
      char.fatigue = (char.fatigue === level) ? level - 1 : level;
      saveCurrentCharacter();
      renderEditableSheet(char);
    });
  });

  // Boost dice
  document.querySelectorAll('.tracker-box[data-boost]').forEach(box => {
    box.addEventListener('click', () => {
      const idx = parseInt(box.dataset.boost);
      char.boostDice = box.classList.contains('checked') ? idx : idx + 1;
      saveCurrentCharacter();
      renderEditableSheet(char);
    });
  });

  // Remove equipment item
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.idx);
      char.equipment.splice(idx, 1);
      saveCurrentCharacter();
      renderEditableSheet(char);
    });
  });

  // Add equipment item
  document.getElementById('add-item-btn')?.addEventListener('click', () => {
    const input = document.getElementById('new-item-input');
    const itemName = input.value.trim();
    if (itemName) {
      char.equipment = char.equipment || [];
      char.equipment.push(itemName);
      saveCurrentCharacter();
      renderEditableSheet(char);
    }
  });

  document.getElementById('new-item-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('add-item-btn').click();
    }
  });

  // Weapons
  document.querySelectorAll('.remove-weapon').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.idx);
      char.weapons = char.weapons || [];
      char.weapons.splice(idx, 1);
      saveCurrentCharacter();
      renderEditableSheet(char);
    });
  });

  document.getElementById('add-weapon-btn')?.addEventListener('click', () => {
    const select = document.getElementById('add-weapon-select');
    const weaponName = select.value;
    if (weaponName) {
      char.weapons = char.weapons || [];
      char.weapons.push({ name: weaponName });
      saveCurrentCharacter();
      renderEditableSheet(char);
    }
  });

  // Feats
  document.querySelectorAll('.remove-feat').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.idx);
      char.feats = char.feats || [];
      char.feats.splice(idx, 1);
      saveCurrentCharacter();
      renderEditableSheet(char);
    });
  });

  document.getElementById('add-feat-btn')?.addEventListener('click', () => {
    const select = document.getElementById('add-feat-select');
    const featName = select.value;
    if (featName) {
      char.feats = char.feats || [];
      char.feats.push(featName);
      saveCurrentCharacter();
      renderEditableSheet(char);
    }
  });

  // Spell slots
  document.querySelectorAll('[data-slot-tier]').forEach(input => {
    input.addEventListener('change', () => {
      const tier = input.dataset.slotTier;
      char.spellSlots = char.spellSlots || {};
      char.spellSlots[tier] = char.spellSlots[tier] || {};
      char.spellSlots[tier].current = parseInt(input.value) || 0;
      saveCurrentCharacter();
    });
  });

  // Prepared spells
  document.querySelectorAll('.remove-spell').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.idx);
      char.preparedSpells = char.preparedSpells || [];
      char.preparedSpells.splice(idx, 1);
      saveCurrentCharacter();
      renderEditableSheet(char);
    });
  });

  document.getElementById('add-spell-btn')?.addEventListener('click', () => {
    const nameInput = document.getElementById('new-spell-name');
    const tierSelect = document.getElementById('new-spell-tier');
    const spellName = nameInput?.value.trim();
    const tier = parseInt(tierSelect?.value) || 1;
    if (spellName) {
      char.preparedSpells = char.preparedSpells || [];
      char.preparedSpells.push({ name: spellName, tier: tier });
      saveCurrentCharacter();
      renderEditableSheet(char);
    }
  });

  document.getElementById('new-spell-name')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('add-spell-btn').click();
    }
  });
}

function updateCharacterField(char, fieldPath, value) {
  const parts = fieldPath.split('.');
  let obj = char;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!obj[parts[i]]) obj[parts[i]] = {};
    obj = obj[parts[i]];
  }

  // Handle numeric fields
  const lastPart = parts[parts.length - 1];
  if (['level', 'currentHp', 'maxHp', 'current', 'max', 'gp', 'sp', 'cp'].includes(lastPart)) {
    obj[lastPart] = parseInt(value) || 0;
  } else {
    obj[lastPart] = value;
  }

  // Re-render when level changes (updates PB display, spell slots, etc.)
  // Note: Max HP is NOT auto-calculated - players roll their HD manually
  if (fieldPath === 'level') {
    saveCurrentCharacter();
    renderEditableSheet(char);
    return;
  }

  saveCurrentCharacter();
}

// ============ GENERATOR FUNCTIONS ============

function showGenerator() {
  document.getElementById('my-characters').style.display = 'none';
  document.getElementById('generator-steps').style.display = 'block';
  document.getElementById('character-sheet').style.display = 'none';
  document.getElementById('sheet-actions').style.display = 'none';
  document.getElementById('cancel-creation').style.display = 'block';

  // Reset generator state
  generatorState = {
    abilities: null,
    ancestry: null,
    charClass: null,
    background: null,
    kit: null,
    humanBonusAbility: null,
    feats: [],
    humanFeat: null
  };

  // Reset UI
  document.getElementById('abilities-display').style.display = 'none';
  document.getElementById('step-abilities').style.display = 'block';
  document.getElementById('step-ancestry').style.display = 'none';
  document.getElementById('step-class').style.display = 'none';
  document.getElementById('step-background').style.display = 'none';
  document.getElementById('step-kit').style.display = 'none';
  document.getElementById('step-name').style.display = 'none';
}

function renderAbilities() {
  const container = document.getElementById('stat-boxes');
  const abilities = generatorState.abilities;
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
  generatorState.ancestry = ANCESTRIES[index];
  generatorState.charClass = null;
  generatorState.background = null;
  generatorState.kit = null;
  generatorState.humanBonusAbility = null;

  document.querySelectorAll('#ancestry-options .option-card').forEach((card, i) => {
    card.classList.toggle('selected', i === index);
  });

  document.getElementById('step-class').style.display = 'block';
  document.getElementById('step-background').style.display = 'none';
  document.getElementById('step-kit').style.display = 'none';
  document.getElementById('step-name').style.display = 'none';

  renderClassOptions();
}

function renderClassOptions() {
  const container = document.getElementById('class-options');
  const restrictionNote = document.getElementById('class-restriction-note');

  if (generatorState.ancestry.restrictedClass) {
    restrictionNote.textContent = `${generatorState.ancestry.name}s ${generatorState.ancestry.restriction}`;
    restrictionNote.style.display = 'block';
  } else {
    restrictionNote.style.display = 'none';
  }

  container.innerHTML = CLASSES.map((c, i) => {
    const isDisabled = generatorState.ancestry.restrictedClass && c.name === generatorState.ancestry.restrictedClass;
    return `
      <div class="option-card ${isDisabled ? 'disabled' : ''}" data-index="${i}">
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
  generatorState.charClass = CLASSES[index];
  generatorState.background = null;
  generatorState.kit = null;

  // Generate feats
  generatorState.feats = [];
  if (generatorState.charClass.feats) {
    if (generatorState.charClass.feats.type === 'fighter') {
      generatorState.feats = pickRandomN(FIGHTER_FEATS, generatorState.charClass.feats.count);
    } else if (generatorState.charClass.feats.type === 'expert') {
      const combined = [...EXPERT_FEATS, ...GENERAL_FEATS];
      generatorState.feats = pickRandomN(combined, generatorState.charClass.feats.count);
    }
  }

  // Human bonuses
  if (generatorState.ancestry.bonusFeat === 'general') {
    const available = GENERAL_FEATS.filter(f => !generatorState.feats.includes(f));
    generatorState.humanFeat = pickRandom(available);
  } else {
    generatorState.humanFeat = null;
  }
  if (generatorState.ancestry.bonusAbility) {
    generatorState.humanBonusAbility = pickRandom(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']);
  }

  document.querySelectorAll('#class-options .option-card').forEach((card, i) => {
    card.classList.toggle('selected', i === index);
  });

  document.getElementById('step-background').style.display = 'block';
  document.getElementById('step-kit').style.display = 'none';
  document.getElementById('step-name').style.display = 'none';

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
  generatorState.background = BACKGROUNDS[index];

  document.querySelectorAll('#background-options .background-option').forEach((opt, i) => {
    opt.classList.toggle('selected', i === index);
  });

  document.getElementById('step-kit').style.display = 'block';
  document.getElementById('step-name').style.display = 'none';

  renderKitOptions();
}

function renderKitOptions() {
  const container = document.getElementById('kit-options');
  const kits = generatorState.charClass.kits;

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
  generatorState.kit = generatorState.charClass.kits[index];

  document.querySelectorAll('#kit-options .option-card').forEach((card, i) => {
    card.classList.toggle('selected', i === index);
  });

  // Show name step
  document.getElementById('step-name').style.display = 'block';
  document.getElementById('character-name-input').focus();
}

function createCharacter() {
  const nameInput = document.getElementById('character-name-input');
  const name = nameInput.value.trim() || `${generatorState.ancestry.name} ${generatorState.charClass.name}`;

  const finalAbilities = getFinalAbilities(generatorState);
  const maxHp = Math.max(1, generatorState.charClass.hd + finalAbilities.CON);

  // Calculate AC
  let ac = 10 + finalAbilities.DEX;
  if (generatorState.kit.items.some(i => i.includes("Chain"))) {
    ac = 14 + Math.min(2, finalAbilities.DEX);
  } else if (generatorState.kit.items.some(i => i.includes("Leather"))) {
    ac = 11 + finalAbilities.DEX;
  }
  if (generatorState.kit.items.some(i => i.includes("Shield"))) {
    ac += 2;
  }

  // Build equipment list
  const equipment = [
    ...generatorState.kit.items,
    "Backpack",
    "6 Torches",
    "6 Supply",
    "Wineskin"
  ];

  const character = {
    id: generateId(),
    name: name,
    ancestry: generatorState.ancestry.name,
    className: generatorState.charClass.name,
    background: generatorState.background,
    level: 1,
    abilities: generatorState.abilities,
    finalAbilities: finalAbilities,
    humanBonusAbility: generatorState.humanBonusAbility,
    feats: generatorState.feats,
    humanFeat: generatorState.humanFeat,
    maxHp: maxHp,
    currentHp: maxHp,
    ac: ac,
    slots: Math.max(5, 10 + finalAbilities.STR),
    fatigue: 0,
    boostDice: 1, // PB/2 rounded down at level 1
    equipment: equipment,
    coins: { gp: 25, sp: 0, cp: 0 },
    spellSlots: generatorState.charClass.spellcasting ? { t1: { current: 2, max: 2 } } : null,
    notes: '',
    createdAt: new Date().toISOString()
  };

  characters.push(character);
  saveCharacters();

  currentCharacterId = character.id;
  document.getElementById('generator-steps').style.display = 'none';
  document.getElementById('cancel-creation').style.display = 'none';
  renderEditableSheet(character);
}

function generateFullRandom() {
  generatorState.abilities = {
    STR: rollToMod(roll3d6()),
    DEX: rollToMod(roll3d6()),
    CON: rollToMod(roll3d6()),
    INT: rollToMod(roll3d6()),
    WIS: rollToMod(roll3d6()),
    CHA: rollToMod(roll3d6())
  };

  generatorState.ancestry = pickRandom(ANCESTRIES);

  let availableClasses = [...CLASSES];
  if (generatorState.ancestry.restrictedClass) {
    availableClasses = availableClasses.filter(c => c.name !== generatorState.ancestry.restrictedClass);
  }
  generatorState.charClass = pickRandom(availableClasses);

  generatorState.feats = [];
  if (generatorState.charClass.feats) {
    if (generatorState.charClass.feats.type === 'fighter') {
      generatorState.feats = pickRandomN(FIGHTER_FEATS, generatorState.charClass.feats.count);
    } else if (generatorState.charClass.feats.type === 'expert') {
      const combined = [...EXPERT_FEATS, ...GENERAL_FEATS];
      generatorState.feats = pickRandomN(combined, generatorState.charClass.feats.count);
    }
  }

  if (generatorState.ancestry.bonusFeat === 'general') {
    const available = GENERAL_FEATS.filter(f => !generatorState.feats.includes(f));
    generatorState.humanFeat = pickRandom(available);
  } else {
    generatorState.humanFeat = null;
  }
  if (generatorState.ancestry.bonusAbility) {
    generatorState.humanBonusAbility = pickRandom(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']);
  } else {
    generatorState.humanBonusAbility = null;
  }

  generatorState.background = pickRandom(BACKGROUNDS);
  generatorState.kit = pickRandom(generatorState.charClass.kits);

  // Go straight to name step
  document.getElementById('step-abilities').style.display = 'none';
  document.getElementById('step-ancestry').style.display = 'none';
  document.getElementById('step-class').style.display = 'none';
  document.getElementById('step-background').style.display = 'none';
  document.getElementById('step-kit').style.display = 'none';
  document.getElementById('step-name').style.display = 'block';
  document.getElementById('character-name-input').focus();
}

// ============ IMPORT/EXPORT ============

function exportCharacter() {
  const char = characters.find(c => c.id === currentCharacterId);
  if (!char) return;

  const data = JSON.stringify(char, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${char.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.json`;
  a.click();

  URL.revokeObjectURL(url);
}

function importCharacter(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const char = JSON.parse(e.target.result);

      // Validate basic structure
      if (!char.name || !char.ancestry || !char.className) {
        alert('Invalid character file');
        return;
      }

      // Generate new ID to avoid conflicts
      char.id = generateId();
      char.importedAt = new Date().toISOString();

      characters.push(char);
      saveCharacters();
      renderCharacterList();

      // Load the imported character
      loadCharacter(char.id);
    } catch (err) {
      console.error('Import error:', err);
      alert('Failed to import character. Make sure the file is valid JSON.');
    }
  };
  reader.readAsText(file);
}

function deleteCharacter() {
  if (!currentCharacterId) return;

  const char = characters.find(c => c.id === currentCharacterId);
  if (!confirm(`Delete ${char?.name || 'this character'}? This cannot be undone.`)) return;

  characters = characters.filter(c => c.id !== currentCharacterId);
  saveCharacters();
  currentCharacterId = null;

  document.getElementById('character-sheet').style.display = 'none';
  document.getElementById('sheet-actions').style.display = 'none';
  document.getElementById('my-characters').style.display = 'block';
  renderCharacterList();
}

function backToList() {
  currentCharacterId = null;
  document.getElementById('character-sheet').style.display = 'none';
  document.getElementById('sheet-actions').style.display = 'none';
  document.getElementById('generator-steps').style.display = 'none';
  document.getElementById('my-characters').style.display = 'block';
  renderCharacterList();
}

// ============ EVENT LISTENERS ============

document.addEventListener('DOMContentLoaded', () => {
  loadCharacters();
  renderCharacterList();
});

document.getElementById('new-character-btn').addEventListener('click', showGenerator);

document.getElementById('roll-abilities-btn').addEventListener('click', function() {
  generatorState.abilities = {
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
  generatorState.abilities = {
    STR: rollToMod(roll3d6()),
    DEX: rollToMod(roll3d6()),
    CON: rollToMod(roll3d6()),
    INT: rollToMod(roll3d6()),
    WIS: rollToMod(roll3d6()),
    CHA: rollToMod(roll3d6())
  };

  generatorState.ancestry = null;
  generatorState.charClass = null;
  generatorState.background = null;
  generatorState.kit = null;

  document.getElementById('step-ancestry').style.display = 'none';
  document.getElementById('step-class').style.display = 'none';
  document.getElementById('step-background').style.display = 'none';
  document.getElementById('step-kit').style.display = 'none';
  document.getElementById('step-name').style.display = 'none';

  renderAbilities();
});

document.getElementById('roll-random-btn').addEventListener('click', generateFullRandom);

document.getElementById('random-background-btn').addEventListener('click', function() {
  const randomIndex = Math.floor(Math.random() * BACKGROUNDS.length);
  selectBackground(randomIndex);
});

document.getElementById('create-character-btn').addEventListener('click', createCharacter);

document.getElementById('character-name-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    createCharacter();
  }
});

document.getElementById('cancel-btn').addEventListener('click', backToList);

document.getElementById('export-btn').addEventListener('click', exportCharacter);

document.getElementById('import-btn').addEventListener('click', () => {
  document.getElementById('import-file').click();
});

document.getElementById('import-file').addEventListener('change', function(e) {
  if (e.target.files.length > 0) {
    importCharacter(e.target.files[0]);
    e.target.value = ''; // Reset for next import
  }
});

document.getElementById('delete-btn').addEventListener('click', deleteCharacter);

document.getElementById('back-to-list-btn').addEventListener('click', backToList);
</script>

---

## How It Works

**Creating Characters:**
1. Click "New Character" to start the generator
2. Roll abilities, pick ancestry, class, background, and kit
3. Name your character and click Create

**During Play:**
- Click any character to open their sheet
- Edit HP, fatigue, boost dice, equipment, coins, and notes
- Changes save automatically to your browser

**Managing Characters:**
- Export to JSON for backup or sharing
- Import JSON files from others
- Delete characters you no longer need
- Print the sheet (Ctrl+P) for paper play

---

*Dev tool in testing. [Report issues](https://github.com/fumbletable/osreign/issues)*
