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
      <button id="enter-manually-btn" class="btn-secondary" style="margin-left: 0.5rem;">Enter Manually</button>

      <div id="abilities-display" style="display: none;">
        <div class="stat-grid" id="stat-boxes"></div>
        <button id="reroll-btn" class="btn-small">Re-roll All</button>
        <p style="margin-top: 1rem;">Happy with these? Choose your ancestry below.</p>
      </div>
    </div>

    <!-- Manual Entry Form (hidden by default) -->
    <div id="step-manual-entry" class="generator-step" style="display: none;">
      <h2>Import Existing Character</h2>
      <p>Enter your character's stats from paper or PDF.</p>

      <div class="manual-entry-form">
        <div class="manual-row">
          <label>Name:</label>
          <input type="text" id="manual-name" placeholder="Character name">
        </div>

        <div class="manual-section">
          <label>Ability Modifiers:</label>
          <div class="manual-abilities">
            <div class="manual-ability">
              <span>STR</span>
              <input type="number" id="manual-str" value="0" min="-3" max="4">
            </div>
            <div class="manual-ability">
              <span>DEX</span>
              <input type="number" id="manual-dex" value="0" min="-3" max="4">
            </div>
            <div class="manual-ability">
              <span>CON</span>
              <input type="number" id="manual-con" value="0" min="-3" max="4">
            </div>
            <div class="manual-ability">
              <span>INT</span>
              <input type="number" id="manual-int" value="0" min="-3" max="4">
            </div>
            <div class="manual-ability">
              <span>WIS</span>
              <input type="number" id="manual-wis" value="0" min="-3" max="4">
            </div>
            <div class="manual-ability">
              <span>CHA</span>
              <input type="number" id="manual-cha" value="0" min="-3" max="4">
            </div>
          </div>
        </div>

        <div class="manual-row">
          <label>Ancestry:</label>
          <select id="manual-ancestry"></select>
        </div>

        <div class="manual-row">
          <label>Primary Class:</label>
          <select id="manual-class"></select>
          <input type="number" id="manual-class-levels" value="1" min="1" max="10" style="width: 50px; margin-left: 0.5rem;">
          <span style="font-size: 0.85rem; color: #666; margin-left: 0.25rem;">levels</span>
        </div>

        <div class="manual-row" id="manual-second-class-row">
          <label>Second Class:</label>
          <select id="manual-class-2">
            <option value="">(None - single class)</option>
          </select>
          <input type="number" id="manual-class-2-levels" value="0" min="0" max="10" style="width: 50px; margin-left: 0.5rem;">
          <span style="font-size: 0.85rem; color: #666; margin-left: 0.25rem;">levels</span>
        </div>
        <p id="multiclass-note" style="font-size: 0.8rem; color: #888; margin: 0 0 0.75rem 0; display: none;">
          Note: Dual-caster multiclassing not supported. One class must be Fighter or Expert.
        </p>

        <div class="manual-row">
          <label>Background:</label>
          <select id="manual-background"></select>
        </div>

        <div class="manual-row">
          <label>Max HP:</label>
          <input type="number" id="manual-maxhp" value="8" min="1" max="100" style="width: 60px;">
          <span style="font-size: 0.85rem; color: #666; margin-left: 0.5rem;">(Current HP will match)</span>
        </div>

        <div id="manual-feats-section" class="manual-section" style="display: none;">
          <label id="manual-feats-label">Select Feats:</label>
          <div id="manual-feats-list"></div>
        </div>

        <div class="manual-actions">
          <button id="manual-create-btn" class="btn-primary">Create Character</button>
          <button id="manual-back-btn" class="btn-secondary" style="margin-left: 0.5rem;">Back</button>
        </div>
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
  .weapons-table tr.not-proficient {
    opacity: 0.6;
    background: #fff5f5;
  }
  .weapons-table tr.not-proficient .weapon-name {
    color: #999;
  }
  .weapons-table tr.not-proficient .weapon-attack {
    color: #c44;
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

  /* Spellbook section */
  .spellbook-section {
    margin: 0.75rem 0;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 0.75rem;
    background: #fafafa;
  }
  .spellbook-section h4 {
    margin: 0 0 0.5rem 0;
    font-size: 0.95rem;
    color: #2c5282;
  }
  .spellbook-tier {
    margin-bottom: 0.75rem;
  }
  .spellbook-tier-header {
    font-weight: bold;
    font-size: 0.85rem;
    color: #555;
    border-bottom: 1px solid #ddd;
    padding-bottom: 0.25rem;
    margin-bottom: 0.25rem;
  }
  .spellbook-spell {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.5rem;
    border-radius: 3px;
    cursor: help;
    position: relative;
  }
  .spellbook-spell:hover {
    background: #e8f0fe;
  }
  .spellbook-spell input[type="checkbox"] {
    margin: 0;
    cursor: pointer;
  }
  .spellbook-spell .spell-name {
    flex: 1;
    font-size: 0.9rem;
  }
  .spellbook-spell .spell-name.prepared {
    font-weight: bold;
    color: #2c5282;
  }
  .spellbook-spell .remove-known-spell {
    color: #c44;
    cursor: pointer;
    font-size: 0.8rem;
    padding: 0 0.25rem;
    opacity: 0.6;
  }
  .spellbook-spell .remove-known-spell:hover {
    opacity: 1;
    background: #fee;
  }

  /* Spell tooltips */
  .spellbook-spell .spell-tooltip {
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
    max-width: 350px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    margin-top: 4px;
    line-height: 1.4;
    font-weight: normal;
  }
  .spellbook-spell:hover .spell-tooltip {
    display: block;
  }
  .spellbook-spell .spell-tooltip::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 12px;
    border: 6px solid transparent;
    border-bottom-color: #333;
  }

  /* Add spell to spellbook */
  .add-spellbook-row {
    margin-top: 0.5rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    flex-wrap: wrap;
  }
  .add-spellbook-row select {
    padding: 0.25rem 0.5rem;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 0.9rem;
  }
  .add-spellbook-row select.spell-tier-select {
    width: 80px;
  }
  .add-spellbook-row select.spell-name-select {
    width: 180px;
  }

  /* Prepared count badge */
  .prepared-count {
    font-size: 0.85rem;
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
    margin-left: 0.5rem;
  }
  .prepared-count.at-limit {
    background: #c44;
    color: white;
  }
  .prepared-count.under-limit {
    background: #4a7c23;
    color: white;
  }

  /* Class feature tooltips */
  .class-feature {
    position: relative;
    cursor: help;
  }
  .class-feature .feature-tooltip {
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
    max-width: 350px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    margin-top: 4px;
    line-height: 1.4;
    font-weight: normal;
  }
  .class-feature:hover .feature-tooltip {
    display: block;
  }
  .class-feature .feature-tooltip::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 12px;
    border: 6px solid transparent;
    border-bottom-color: #333;
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

  /* Manual Entry Form */
  .manual-entry-form {
    max-width: 500px;
  }
  .manual-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 0.75rem 0;
  }
  .manual-row label {
    min-width: 100px;
    font-weight: bold;
  }
  .manual-row input[type="text"],
  .manual-row select {
    flex: 1;
    padding: 0.4rem 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
  .manual-row input[type="number"] {
    padding: 0.4rem 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
  .manual-section {
    margin: 1rem 0;
    padding: 0.75rem;
    background: #f8f8f8;
    border-radius: 6px;
    border: 1px solid #ddd;
  }
  .manual-section > label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  .manual-abilities {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.5rem;
  }
  .manual-ability {
    text-align: center;
  }
  .manual-ability span {
    display: block;
    font-size: 0.75rem;
    font-weight: bold;
    color: #555;
    margin-bottom: 0.25rem;
  }
  .manual-ability input {
    width: 45px;
    text-align: center;
    padding: 0.4rem;
    border: 2px solid #666;
    border-radius: 4px;
    font-size: 1.1rem;
    font-weight: bold;
  }
  .manual-actions {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #ddd;
  }
  .manual-feat-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0.5rem 0;
  }
  .manual-feat-row select {
    flex: 1;
    padding: 0.4rem 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .manual-feat-row .remove-manual-feat {
    color: #c44;
    cursor: pointer;
    padding: 0 0.25rem;
    font-size: 0.9rem;
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
      { name: "Stone Sense", desc: "Detect unusual stonework. EDGE when actively searching." },
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
      { name: "Ghoul Immunity", desc: "Immune to ghoul paralysis." },
      { name: "Keen Senses", desc: "EDGE on sight and hearing checks." },
      { name: "Secret Door Sense", desc: "EDGE when searching for hidden doors." }
    ]
  },
  {
    name: "Halfling",
    size: "Small",
    languages: ["Common", "Halfling"],
    traits: [
      { name: "Fearless", desc: "EDGE on saves vs fear." },
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
      { name: "Versatile", desc: "+1 to any one ability (you choose)." },
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

// Helper: Get weapon category (Light, Medium, or Heavy)
function getWeaponCategory(weaponName, weaponData) {
  if (weaponData.tags.includes("Light")) return "Light";
  if (weaponData.tags.includes("Heavy")) return "Heavy";
  return "Medium";
}

// Helper: Check if character is proficient with a weapon
function isWeaponProficient(weaponName, weaponData, classProficiencies) {
  if (!classProficiencies) return false;

  // Druid has specific weapon list (not categories)
  if (classProficiencies.includes("Sickles")) {
    // Druid proficiency: Sickles, Staves, Spears, Slings
    const druidWeapons = ["Sickle", "Quarterstaff", "Staff (Arcane)", "Spear", "Sling"];
    return druidWeapons.includes(weaponName);
  }

  // Standard category-based proficiency
  const category = getWeaponCategory(weaponName, weaponData);

  // Check if class has this category
  if (classProficiencies.includes(category)) {
    // Cleric (Hallowed) restriction: Medium must be bludgeoning
    if (classProficiencies.includes("bludgeoning only") && category === "Medium") {
      return weaponData.tags.includes("Bludgeoning");
    }
    return true;
  }

  return false;
}

// Class feature descriptions
const CLASS_FEATURE_DESCRIPTIONS = {
  "Turn Undead": "As an action, present your holy symbol. Undead within NEAR must make a WIS save (DC = your Spell DC) or flee for 1 Turn. Undead with HD ≤ half your level (round down) are destroyed instead. You can use this a number of times equal to your PB per long rest.",
  "Wild Shape": "As an action, transform into a beast you have seen with HD ≤ half your level (minimum 1). You gain the beast's physical stats and abilities but retain your mental stats. You can stay in beast form for 1 hour per level. When you drop to 0 HP in beast form, you revert to your normal form. You can use this PB times per long rest.",
  "Cantrips (Wizard Bolt, Prestidigitation)": "Wizard Bolt: As an action, make a ranged spell attack (Far range). On hit, deal 1d6 force damage (+1d6 at levels 5 and 9). Prestidigitation: Minor magical tricks—light a candle, clean an object, create a small illusion, etc. No combat effect."
};

// Spell descriptions database - organized by class type
const SPELL_DESCRIPTIONS = {
  // ========== CLERIC SPELLS ==========
  // Tier 1
  "Bless": "1 Action, Near, 1 Turn. Allies in area gain +1 to attack rolls and saves vs fear. Boost: +2 bonuses.",
  "Command": "1 Action, Near, PB rounds. Speak one word; target obeys if WIS save fails. Examples: Halt, Flee, Drop. Boost: SETBACK on save.",
  "Cure Light Wounds": "1 Action, Touch, Instant. Heal 1 creature for 1d6 + PB HP. Boost: +1d6 HP.",
  "Detect Evil": "1 Action/Ritual, Self (Near), PB Turns. Sense hostile intent, unholy creatures, or cursed items. Boost: +1 Turn.",
  "Detect Magic": "1 Action/Ritual, Self (Near), PB Turns. Magical items, spells, or glyphs glow faintly. Boost: +1 Turn.",
  "Light": "1 Action/Ritual, Near, 1 hour. Object glows like torch, OR blinds creature (CON save). Boost: +1 hour.",
  "Protection from Evil": "1 Action, Touch, PB Turns. +1 AC/saves vs evil; immune to charm/control. Boost: +1 ally.",
  "Remove Fear": "1 Action, Touch, Instant. End fear on one creature. Magical fear: new save with EDGE. Boost: +1 creature.",
  "Purify Food & Drink": "1 Action/Ritual, Touch, Instant. Cleanse food/drink for PB creatures. Boost: Double amount.",
  // Tier 2
  "Bless Water": "1 Turn/Ritual, Touch, Permanent. Convert 1 flask to holy water. Boost: +1 flask.",
  "Find Traps": "1 Action/Ritual, Self (Near cone), PB Turns. Detect traps in area. Boost: +1 Turn.",
  "Hold Person": "1 Action, Near, 1 Turn. Up to 3 humanoids paralyzed (WIS save). Repeat save each round. Boost: +1 target.",
  "Resist Elements": "1 Action, Touch, 1 Turn. Choose fire/cold when preparing. EDGE on saves, half damage. Boost: +1 creature.",
  "Spiritual Hammer": "1 Action, Near, Conc 1 Turn. Spectral weapon attacks once/round, 1d6+PB force. Boost: +1d6 on one hit.",
  "Silence, 15 ft Radius": "1 Action, Near, 1 Turn. 15-ft sphere of silence. No sound or spellcasting. Boost: 20 ft radius.",
  "Speak with Animals": "1 Action/Ritual, Self (Near), PB Turns. Communicate simple ideas with beasts. Boost: +1 Turn.",
  "Augury": "1 Turn/Ritual, Self, Instant. Ask deity about action in next hour: weal, woe, both, or nothing. Boost: Ask about second action.",
  // Tier 3
  "Continual Light": "1 Action/Ritual, Near, Permanent. Object glows like daylight. Can blind (CON save). Boost: +1 object.",
  "Cure Disease": "1 Action, Touch, Instant. End one disease or poison. Boost: Heal 1d6 HP.",
  "Locate Object": "1 Action/Ritual, Far, Conc PB Turns. Sense direction of familiar object. Boost: Double range.",
  "Prayer": "1 Action, Near, 1 Turn. Allies +1 attacks/saves; enemies -1. Boost: +1 Turn.",
  "Protection from Evil, 10 ft Radius": "1 Action, Self, PB Turns. Allies within 10 ft: +1 AC/saves vs evil, immune to charm. Boost: 15 ft.",
  "Remove Curse": "1 Action, Touch, Instant. Lift 1 curse from creature or object. Boost: +1 target.",
  "Speak with Dead": "1 Action/Ritual, Near, PB questions. Ask corpse questions (limited by what it knew). Boost: +1 question.",
  "Striking": "1 Action, Touch, 1 Turn. Weapon becomes magical: +1 to hit/damage. Boost: +1 Turn.",
  // Tier 4
  "Create Food & Water": "1 Turn, Self, Instant. Food & water for 12 people for 1 day. Boost: Double amount.",
  "Cure Serious Wounds": "1 Action, Touch, Instant. Heal PB×d6 + PB HP. Boost: +1d6 HP.",
  "Neutralize Poison": "1 Action, Touch, Instant. End poison on 1 creature/object. Boost: +1d6 HP.",
  "Tongues": "1 Action/Ritual, Self, 1 Turn. Speak and understand any language. Boost: +1 Turn.",
  "Animate Dead": "1 Turn, Near, Permanent. Raise 1d6 skeletons or 1d4 zombies. Control up to PB×2 HD. Boost: +1d4 creatures.",
  "Dispel Magic": "1 Action, Near, Instant. End 1 ongoing spell or magical effect. Boost: +1 target.",
  "Divination": "1 Turn/Ritual, Self, Instant. Ask deity about event within 1 week. Short truthful answer. Boost: More detail.",
  // Tier 5
  "Commune": "1 Turn, Self, PB questions. Ask deity yes/no questions. Answers may be cryptic. Boost: +1 question.",
  "Mass Cure Wounds": "1 Action, Near, Instant. Heal PB creatures for 1d6 + PB HP each. Boost: +1 target or +1d6 to all.",
  "Dispel Evil": "1 Action, Near, 1 Turn. End possession/charm, banish extraplanar creatures. Boost: +1 target.",
  "Insect Plague": "1 Action, Far, Conc 1 Turn. 30-ft swarm causes fear and 2d6 damage/round. Boost: 40 ft radius.",
  "Quest": "1 Action, Near, Until completed. One creature must undertake quest (WIS save). Boost: SETBACK on save.",
  "Raise Dead": "1 Turn, Touch, Instant. Revive creature dead ≤ level days. Loses 1 level. Returns at 1 HP, 2 Fatigue. Boost: +2d6 HP.",
  "True Seeing": "1 Action, Touch, 1 Turn. See through illusions, invisibility, polymorph. Boost: +1 Turn.",
  "Flame Strike": "1 Action, Far, Instant. 10-ft column: level×d6 damage (half fire, half divine). DEX half. Boost: +1d6.",
  // Tier 6
  "Animate Object": "1 Action, Near, Conc 1 Turn. Animate 1d6 objects as allies (HD by size). Boost: +1 object.",
  "Blade Barrier": "1 Action, Near, Conc 1 Turn. 20-ft barrier of blades: 6d6 damage to pass. Boost: 30 ft radius.",
  "Find the Path": "1 Turn, Self, Conc 1 Turn. Reveals most direct route to known location. Boost: +1 Turn.",
  "Heal": "1 Action, Touch, Instant. Restore all HP, remove blindness, disease, fatigue, poison. Boost: +1 target.",
  "Part Water": "1 Action, Near, Conc 1 Turn. Open 30-ft path through water. Boost: 50 ft path.",
  "Regenerate": "1 Action, Touch, Instant. Regrow limbs, mend bones, restore organs. Heal 3d6 HP. Boost: +2d6 HP.",
  "Restoration": "1 Action, Touch, Instant. Remove negative level or restore 1d4 ability points.",
  "Stone Tell": "1 Action, Touch, 1 Turn. Speak with stone about past events, builders, creatures. Boost: +1 Turn.",
  "Word of Recall": "1 Action, Self, Instant. Teleport to sanctified location. Boost: +1 ally.",

  // ========== MAGIC-USER SPELLS ==========
  // Tier 1
  "Charm Person": "1 Action, Near, Special. Humanoid (WIS save) regards you as ally. Hostile acts end it. Repeat save based on INT. Boost: SETBACK on save.",
  "Floating Disc": "1 Action, Self, 1 hour. 3-ft disc follows, carries 500 lb. Boost: +1 hour.",
  "Hold Portal": "1 Action, Near, 1 Turn. Door stays shut; STR 18 or magic to open. Boost: +1 Turn.",
  "Magic Missile": "1 Action, Far, Instant. PB darts of 1d4+1 force (auto-hit). Boost: +1 dart.",
  "Read Languages": "1 Action/Ritual, Self, 1 Turn. Understand written languages (not magical). Boost: +1 Turn.",
  "Read Magic": "1 Action/Ritual, Self, 1 Turn. Read scrolls, glyphs, spellbooks. Required to learn spells. Boost: +1 Turn.",
  "Shield": "1 Action, Self, 1 Turn. +4 AC vs missiles, +2 vs melee. Negates Magic Missile. Boost: +1 Turn.",
  "Sleep": "1 Action, Near, 1 Turn. Put 2d8 HD of creatures to sleep (lowest HD first). 5+ HD immune. Boost: +1d4 HD.",
  "Ventriloquism": "1 Action, Near, 1 Turn. Project voice from object/location. Boost: +1 Turn.",
  // Tier 2
  "Continual Light (MU)": "1 Action/Ritual, Near, Permanent. Object shines like daylight. Can blind (CON save). Boost: 2 objects.",
  "Darkness, 15 ft Radius": "1 Action, Near, 1 Turn. Magical darkness; normal vision and darkvision fail. Boost: 20 ft radius.",
  "Detect Invisibility": "1 Action, Self, PB Turns. Invisible creatures/objects glow faintly. Boost: +1 Turn.",
  "ESP": "1 Action, Near, Conc 1 Turn. Read surface thoughts (WIS save resists). Boost: +1 creature.",
  "Invisibility": "1 Action, Touch, Until broken. Target invisible. Attacking/casting ends it. Boost: +1 target.",
  "Knock": "1 Action, Near, Instant. Open 1 locked door/chest/portal. Boost: Far range.",
  "Levitate": "1 Action, Near, 1 Turn. Rise/descend 15 ft/round. No horizontal movement. Boost: +1 Turn.",
  "Locate Object (MU)": "1 Action/Ritual, Self, Conc PB Turns. Sense familiar object within 60 ft. Boost: Double range.",
  "Mirror Image": "1 Action, Self, 1 Turn. Create 1d4 duplicates. Attacks hit images first. Boost: +1 image.",
  "Phantasmal Force": "1 Action, Near, Conc 1 Turn. Visual illusion up to 15-ft cube. WIS save to disbelieve. Boost: 30-ft cube.",
  "Web": "1 Action, Near, 1 Turn. 15-ft cube of webs. DEX save or Speed=0. Fire destroys. Boost: 30-ft cube.",
  // Tier 3
  "Clairsentience": "1 Action/Ritual, Far, PB Turns. See OR hear known location through barriers. Boost: +1 Turn.",
  "Fireball": "1 Action, Far, Instant. 15-ft blast: level×d6 fire (DEX half). Boost: +1d6.",
  "Fly": "1 Action, Touch, 1 Turn. Target flies at normal speed. Boost: +1 target.",
  "Haste": "1 Action, Near, 1 Turn. +1 attack/round, double movement. 1 Fatigue after. Boost: +1 target.",
  "Hold Person (MU)": "1 Action, Near, 1 Turn. Up to 3 humanoids paralyzed (WIS save). Repeat save each round. Boost: +1 target.",
  "Darkvision": "1 Action, Touch, 1 hour. See in darkness up to 60 ft. Boost: +1 hour.",
  "Invisibility, 10 ft Radius": "1 Action, Self, Until broken. All within 10 ft invisible. Boost: 20 ft radius.",
  "Lightning Bolt": "1 Action, Self (60-ft line), Instant. 5-ft wide: level×d6 lightning (DEX half). Bounces. Boost: +1d6.",
  "Protection from Evil, 10 ft Radius (MU)": "1 Action, Self, PB Turns. Allies within 10 ft: +1 AC/saves vs evil. Boost: 15 ft.",
  "Slow": "1 Action, Near, 1 Turn. Up to 6 creatures: half speed, 1 attack/round (WIS save). Boost: +1 target.",
  "Water Breathing": "1 Action, Touch, 1 hour. Target breathes underwater. Boost: +1 creature.",
  // Tier 4
  "Charm Monster": "1 Action, Near, Until dispelled. Monster charmed as Charm Person (WIS save). Boost: +1 target.",
  "Confusion": "1 Action, Near, 1 Turn. 3d6 creatures in 15-ft: random actions (WIS save). Boost: +1 Turn.",
  "Dimension Door": "1 Action, Self +1, Instant. Teleport 360 ft to visible/known location. Boost: +1 creature.",
  "Growth of Plants": "1 Action/Ritual, Near, Permanent. 30-ft radius vegetation grows thick, halves speed. Boost: Double radius.",
  "Hallucinatory Terrain": "1 Action/Ritual, Far, Conc 1 day. Illusory terrain (INT save disbelieves). Boost: Double area.",
  "Massmorph": "1 Action/Ritual, Near, Conc 1 Turn. Up to 100 humanoids appear as trees. Boost: +1 Turn.",
  "Monster Summoning I": "1 Action, Near, 1 Turn. Summon 1d6 monsters of 2 HD or less. Boost: +1d6 monsters.",
  "Polymorph Other": "1 Action, Near, Permanent. Transform creature into another form ±2 HD (WIS save). Boost: SETBACK on save.",
  "Polymorph Self": "1 Action, Self, Conc 1 Turn. Take another creature's form ±2 HD. Gain physical abilities. Boost: +1 Turn.",
  "Remove Curse (MU)": "1 Action, Touch, Instant. Lift 1 curse from creature or object. Boost: +1 target.",
  "Wall of Fire": "1 Action, Near, Conc 1 Turn. 20×10 ft wall: 2d6 fire crossing/adjacent (CON half). Boost: +10 ft or +1d6.",
  "Wizard Eye": "1 Action/Ritual, Self, Conc 1 Turn. Invisible eye scouts 120 ft, relays vision. Boost: +1 Turn.",
  // Tier 5
  "Animate Dead (MU)": "1 Action, Near, Permanent. Raise 2d6 skeletons or 1d6 zombies. Boost: +1d6 creatures.",
  "Cloudkill": "1 Action, Far, Conc 1 Turn. 30-ft moving cloud. ≤4 HD die (no save). >4 HD: 2d6 poison (CON half). Boost: 40 ft.",
  "Conjure Elemental": "1 Action, Near, Conc 1 Turn. Summon 8 HD elemental. Loses control if concentration breaks. Boost: +1 HD.",
  "Contact Other Plane": "1 Turn, Self, PB questions. Ask entity questions. Each risks madness (INT save). Boost: 1 safe question.",
  "Feeblemind": "1 Action, Near, Permanent. Target's INT=1, can't cast (INT save). Boost: SETBACK on save.",
  "Hold Monster": "1 Action, Near, 1 Turn. Up to 3 creatures paralyzed (WIS save). Repeat each round. Boost: +1 target.",
  "Magic Jar": "1 Action, Near, Special. Soul to container; possess creatures (WIS save). Jar destroyed = death. Boost: +2 saves.",
  "Passwall": "1 Action, Near, 1 Turn. Tunnel 10×20 ft through stone/wood. Boost: +10 ft.",
  "Telekinesis": "1 Action, Near, Conc 1 Turn. Move 250 lb object at will. Boost: Double weight.",
  "Teleport": "1 Action, Touch, Instant. Instant travel to known location. Risk by familiarity. Boost: Reduce risk.",
  "Wall of Iron": "1 Action, Near, Permanent. 30×30 ft, 1 inch thick iron wall. Boost: 40×40 ft.",
  "Wall of Stone": "1 Action, Near, Permanent. 30×30 ft, 1 ft thick stone wall. Boost: 40×40 ft.",
  // Tier 6
  "Anti-Magic Shell": "1 Action, Self (10-ft), Conc 1 Turn. No magic functions within. Boost: 15 ft radius.",
  "Control Weather": "1 Turn, Sight, 1 day. Alter local weather. Extreme changes take hours. Boost: +1 day.",
  "Death Spell": "1 Action, Far, Instant. Kill up to 3d12 HD of creatures (8+ HD immune, CON save). Boost: +1d6 HD.",
  "Disintegrate": "1 Action, Far, Instant. Target turns to dust (CON save negates). Boost: SETBACK on save.",
  "Geas": "1 Action, Near, Until fulfilled. Command one task (WIS save). Breaking: 2d6 damage/day. Boost: SETBACK on save.",
  "Invisible Stalker": "1 Action, Near, Until done. Summon 8 HD stalker for one mission. Complex tasks may be twisted. Boost: +2 HD.",
  "Legend Lore": "1 Turn, Self, Instant. Gain lore about person, place, or object of renown. Boost: More detail.",
  "Lower Water": "1 Action, Near, Conc 1 Turn. Lower water by half in 30-ft square. Boost: Double area.",
  "Move Earth": "1 Turn, Near, Conc 1 Turn. Reshape terrain in 40-ft cube. Boost: 60 ft cube.",
  "Reincarnation": "1 Turn, Touch, Instant. Dead returns in new body (d6: 1 Dwarf, 2 Elf, 3 Halfling, 4-6 Human). Boost: Reroll once.",
  "Stone to Flesh": "1 Action, Near, Instant. Restore one petrified creature. Boost: +1 target.",
  "Wall of Ice": "1 Action, Near, Conc 1 Turn. 30-ft wall. Shattering: 6d6 cold to adjacent (DEX half). Boost: +10 ft.",

  // ========== DRUID SPELLS ==========
  // Tier 1
  "Animal Friendship": "1 Action, Near, Until broken. Natural animal (WIS save) becomes friendly. Boost: +1 animal.",
  "Entangle": "1 Action, Near, Conc 1 Turn. Plants restrain in 20-ft area (DEX save or Speed=0). Boost: 30 ft or SETBACK.",
  "Faerie Fire": "1 Action, Near, 1 Turn. Outline creatures in light. Attacks gain EDGE. Boost: +1 Turn.",
  "Pass Without Trace": "1 Action/Ritual, Touch, 1 Turn. PB creatures leave no tracks. Tracking fails. Boost: +1 Turn.",
  "Shillelagh": "1 Action, Touch, 1 Turn. Club/staff becomes +1 magical, 1d8 damage. Boost: +1 Turn.",
  // Tier 2
  "Barkskin": "1 Action, Touch, 1 Turn. Target's AC = 16 if armor is lower. Boost: +1 Turn.",
  "Flame Blade": "1 Action, Self, 1 Turn. Fiery blade: 1d6 fire, Finesse, magical. Boost: 1d8 damage.",
  "Heat Metal": "1 Action, Near, Conc 1 Turn. Metal object red-hot: 2d6 then 1d6/round. Boost: +1 item.",
  "Obscuring Mist": "1 Action, Self (Near), 1 Turn. Fog; attacks beyond Close have SETBACK. Boost: +1 Turn.",
  "Speak with Plants": "1 Action/Ritual, Self (Near), PB Turns. Communicate with plants about terrain, dangers. Boost: +1 Turn.",
  "Produce Flame": "1 Action, Self, 1 Turn. Flame in hand (torch light). Throw: Near, 1d6 fire (ends spell). Boost: 2d6 thrown.",
  "Warp Wood": "1 Action, Near, Instant. Warp wooden object into useless shape. Boost: +1 object.",
  // Tier 3
  "Call Lightning": "1 Action, Far (outdoors), Conc 1 Turn. 1 bolt/round: 2d6 (DEX half). Boost: +1d6.",
  "Plant Growth": "1 Action, Near, Permanent. 60×15 ft thorny overgrowth. Difficult terrain, 1d6/15 ft. Boost: +30 ft.",
  "Protection from Elements": "1 Action, Touch, 1 Turn. Choose fire/cold. Immune to normal, half magical. Boost: +1 creature.",
  "Speak with Dead Animals": "1 Action/Ritual, Touch, PB questions. Ask dead animal about what it sensed. Boost: +1 question.",
  "Water Walk": "1 Action, Touch, 1 Turn. PB creatures walk on water. Boost: +1 Turn.",
  "Hold Animal": "1 Action, Near, 1 Turn. Up to 3 animals paralyzed (WIS save). Repeat each round. Boost: +1 target.",
  "Summon Swarm": "1 Action, Near, Conc 1 Turn. 10-ft swarm: 1d6/round, SETBACK on attacks. Boost: 15 ft radius.",
  "Wind Wall": "1 Action, Near, 1 Turn. 30-ft wall deflects missiles, small flyers, gas. Boost: +10 ft.",
  // Tier 4
  "Animal Growth": "1 Action, Near, 1 Turn. 2d6 animals double size (HD doubled). Boost: +1d6 animals.",
  "Call Woodland Beings": "1 Turn, Near, 1 Turn. Summon fey (d6): 1-2 Sprites, 3-4 Pixies, 5 Satyrs, 6 Dryad. Boost: Roll twice.",
  "Ice Storm": "1 Action, Far, Instant. 20-ft hail: level×d6 (half bludgeoning, half cold). DEX half. Boost: +1d6.",
  "Sticks to Snakes": "1 Action, Near, 1 Turn. 2d6 sticks become poisonous snakes (1 HD each). Boost: +1d6 snakes.",
  "Wall of Thorns": "1 Action, Near, Conc 1 Turn. 60×10 ft hedge. 2d6 damage to pass (no save). Boost: +20 ft.",
  // Tier 5
  "Animal Summoning": "1 Action, Near, 1 Turn. Summon 2d6 animals of 4 HD or less. Boost: +1d6 animals.",
  "Commune with Nature": "1 Turn/Ritual, Self, PB questions. Ask land about terrain, animals, dangers within 1 mile. Boost: +1 question.",
  "Control Winds": "1 Action, Far, Conc 1 Turn. Alter wind in 40-ft radius. Hinder flyers, aid ships. Boost: 60 ft radius.",
  "Transmute Rock to Mud": "1 Action, Near, Permanent. 20-ft cube rock↔mud. Traps creatures. Boost: 30 ft cube.",
  "Wall of Fire (Greater)": "1 Action, Near, Conc 1 Turn. 20×10 ft wall: 4d6 fire crossing/adjacent. Boost: +1d6 or +10 ft.",
  // Tier 6
  "Anti-Animal Shell": "1 Action, Self (10-ft), Conc 1 Turn. Animals cannot enter barrier. Boost: 15 ft radius.",
  "Conjure Fire Elemental": "1 Action, Near, Conc 1 Turn. Summon 8 HD fire elemental. Hostile if concentration breaks. Boost: +2 HD.",
  "Earthquake": "1 Action, Far, Instant. 60-ft quake: collapse structures, 6d6 damage (DEX half). Boost: 80 ft radius.",
  "Transport via Plants": "1 Action, Self, Instant. Step into tree, emerge from same kind anywhere on plane. Boost: +1 ally."
};

// Spell lists by class type
const SPELL_LISTS = {
  "Cleric": {
    1: ["Bless", "Command", "Cure Light Wounds", "Detect Evil", "Detect Magic", "Light", "Protection from Evil", "Remove Fear", "Purify Food & Drink"],
    2: ["Bless Water", "Find Traps", "Hold Person", "Resist Elements", "Spiritual Hammer", "Silence, 15 ft Radius", "Speak with Animals", "Augury"],
    3: ["Continual Light", "Cure Disease", "Locate Object", "Prayer", "Protection from Evil, 10 ft Radius", "Remove Curse", "Speak with Dead", "Striking"],
    4: ["Create Food & Water", "Cure Serious Wounds", "Neutralize Poison", "Speak with Plants", "Tongues", "Animate Dead", "Dispel Magic", "Divination"],
    5: ["Commune", "Mass Cure Wounds", "Dispel Evil", "Insect Plague", "Quest", "Raise Dead", "True Seeing", "Flame Strike"],
    6: ["Animate Object", "Blade Barrier", "Find the Path", "Heal", "Part Water", "Regenerate", "Restoration", "Stone Tell", "Word of Recall"]
  },
  "Arcane": {
    1: ["Charm Person", "Detect Magic", "Floating Disc", "Hold Portal", "Light", "Magic Missile", "Protection from Evil", "Read Languages", "Read Magic", "Shield", "Sleep", "Ventriloquism"],
    2: ["Continual Light (MU)", "Darkness, 15 ft Radius", "Detect Evil", "Detect Invisibility", "ESP", "Invisibility", "Knock", "Levitate", "Locate Object (MU)", "Mirror Image", "Phantasmal Force", "Web"],
    3: ["Clairsentience", "Dispel Magic", "Fireball", "Fly", "Haste", "Hold Person (MU)", "Darkvision", "Invisibility, 10 ft Radius", "Lightning Bolt", "Protection from Evil, 10 ft Radius (MU)", "Slow", "Water Breathing"],
    4: ["Charm Monster", "Confusion", "Dimension Door", "Growth of Plants", "Hallucinatory Terrain", "Massmorph", "Monster Summoning I", "Polymorph Other", "Polymorph Self", "Remove Curse (MU)", "Wall of Fire", "Wizard Eye"],
    5: ["Animate Dead (MU)", "Cloudkill", "Conjure Elemental", "Contact Other Plane", "Feeblemind", "Hold Monster", "Magic Jar", "Passwall", "Telekinesis", "Teleport", "Wall of Iron", "Wall of Stone"],
    6: ["Anti-Magic Shell", "Control Weather", "Death Spell", "Disintegrate", "Geas", "Invisible Stalker", "Legend Lore", "Lower Water", "Move Earth", "Reincarnation", "Stone to Flesh", "Wall of Ice"]
  },
  "Druidic": {
    1: ["Animal Friendship", "Cure Light Wounds", "Detect Magic", "Entangle", "Faerie Fire", "Pass Without Trace", "Shillelagh", "Speak with Animals"],
    2: ["Barkskin", "Flame Blade", "Heat Metal", "Obscuring Mist", "Speak with Plants", "Resist Elements", "Produce Flame", "Warp Wood"],
    3: ["Call Lightning", "Plant Growth", "Protection from Elements", "Speak with Dead Animals", "Water Walk", "Hold Animal", "Summon Swarm", "Wind Wall"],
    4: ["Animal Growth", "Call Woodland Beings", "Dispel Magic", "Hallucinatory Terrain", "Ice Storm", "Sticks to Snakes", "Wall of Thorns"],
    5: ["Animal Summoning", "Commune with Nature", "Control Winds", "Insect Plague", "Transmute Rock to Mud", "Wall of Fire (Greater)"],
    6: ["Anti-Animal Shell", "Conjure Fire Elemental", "Control Weather", "Earthquake", "Reincarnation", "Transport via Plants"]
  }
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
  10: { t1: 4, t2: 3, t3: 3, t4: 3, t5: 3, t6: 1 },
  11: { t1: 4, t2: 3, t3: 3, t4: 3, t5: 3, t6: 2 },
  12: { t1: 4, t2: 3, t3: 3, t4: 3, t5: 3, t6: 3 }
};

// XP thresholds by level (cumulative XP needed to reach each level)
const XP_THRESHOLDS = [
  0,       // Level 0 (unused)
  0,       // Level 1
  1500,    // Level 2
  4500,    // Level 3
  9000,    // Level 4
  18000,   // Level 5
  36000,   // Level 6
  60000,   // Level 7
  100000,  // Level 8
  150000,  // Level 9
  225000,  // Level 10
  300000,  // Level 11
  375000   // Level 12
];

// Helper: Get XP needed to reach a specific level
function getXpForLevel(level) {
  return XP_THRESHOLDS[level] || 0;
}

// Helper: Get XP remaining to next level
function getXpToNextLevel(currentXp, currentLevel) {
  if (currentLevel >= 12) return 0; // Max level
  return Math.max(0, XP_THRESHOLDS[currentLevel + 1] - currentXp);
}

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

// ============ MULTICLASSING SUPPORT (v4) ============

// Migration function: converts old className to new classes array
function migrateCharacter(char) {
  // Skip if already migrated
  if (char.classes && !char.className) {
    return char;
  }

  // Migrate className → classes array
  if (char.className && !char.classes) {
    char.classes = [{ name: char.className, levels: char.level || 1 }];
    char.totalLevel = char.level || 1;
    delete char.className;
  }

  // Migrate feats to include source
  if (char.feats && char.feats.length > 0 && typeof char.feats[0] === 'string') {
    const primaryClass = char.classes?.[0]?.name || 'Unknown';
    char.feats = char.feats.map(f => ({ name: f, source: primaryClass }));
  }

  return char;
}

// Helper: Get display string for class (e.g., "Fighter 2 / Magic-User 3")
function getClassDisplayString(char) {
  if (!char.classes || char.classes.length === 0) {
    return char.className || 'Unknown';
  }
  return char.classes.map(c => `${c.name} ${c.levels}`).join(' / ');
}

// Helper: Get primary class (first class in array)
function getPrimaryClass(char) {
  if (char.classes && char.classes.length > 0) {
    return CLASSES.find(c => c.name === char.classes[0].name);
  }
  return CLASSES.find(c => c.name === char.className);
}

// Helper: Get all class data for a multiclass character
function getAllClassData(char) {
  if (!char.classes || char.classes.length === 0) {
    const classData = CLASSES.find(c => c.name === char.className);
    return classData ? [classData] : [];
  }
  return char.classes.map(c => CLASSES.find(cl => cl.name === c.name)).filter(Boolean);
}

// Helper: Get class levels for a specific class
function getClassLevels(char, className) {
  if (char.classes) {
    const classEntry = char.classes.find(c => c.name === className);
    return classEntry ? classEntry.levels : 0;
  }
  return char.className === className ? char.level : 0;
}

// Helper: Get total level
function getTotalLevel(char) {
  if (char.totalLevel) return char.totalLevel;
  if (char.classes) {
    return char.classes.reduce((sum, c) => sum + c.levels, 0);
  }
  return char.level || 1;
}

// Helper: Get union of save proficiencies from all classes
function getSaveProficiencies(char) {
  const allClasses = getAllClassData(char);
  const saves = new Set();
  allClasses.forEach(c => {
    if (c.saves) c.saves.forEach(s => saves.add(s));
  });
  return Array.from(saves);
}

// Helper: Get union of weapon proficiencies from all classes
function getWeaponProficiencies(char) {
  const allClasses = getAllClassData(char);
  const profs = [];

  allClasses.forEach(c => {
    if (c.weapons) {
      // Parse weapon proficiency string
      const parts = c.weapons.split(', ');
      parts.forEach(p => {
        if (!profs.includes(p)) profs.push(p);
      });
    }
  });

  return profs.join(', ');
}

// Helper: Get union of armor proficiencies from all classes
function getArmorProficiencies(char) {
  const allClasses = getAllClassData(char);
  const profs = new Set();

  allClasses.forEach(c => {
    if (c.armor) {
      c.armor.split(', ').forEach(a => profs.add(a));
    }
  });

  return Array.from(profs).join(', ');
}

// Helper: Check weapon proficiency considering all classes
function isWeaponProficientMulticlass(weaponName, weaponData, char) {
  const allClasses = getAllClassData(char);

  for (const classData of allClasses) {
    if (isWeaponProficient(weaponName, weaponData, classData?.weapons)) {
      return true;
    }
  }
  return false;
}

// Helper: Get spellcasting class (only one caster class allowed per design)
function getSpellcastingClass(char) {
  const allClasses = getAllClassData(char);
  return allClasses.find(c => c.spellcasting);
}

// Helper: Get caster level for spell slot calculation
function getCasterLevel(char) {
  const casterClass = getSpellcastingClass(char);
  if (!casterClass) return 0;

  if (char.classes) {
    const classEntry = char.classes.find(c => c.name === casterClass.name);
    return classEntry ? classEntry.levels : 0;
  }
  return char.level || 1;
}

// Helper: Get hit dice by type for multiclass
function getHitDice(char) {
  const allClasses = getAllClassData(char);
  const dice = {};

  if (char.classes) {
    char.classes.forEach(c => {
      const classData = CLASSES.find(cl => cl.name === c.name);
      if (classData) {
        const dieType = `d${classData.hd}`;
        dice[dieType] = (dice[dieType] || 0) + c.levels;
      }
    });
  } else {
    const classData = CLASSES.find(c => c.name === char.className);
    if (classData) {
      dice[`d${classData.hd}`] = char.level || 1;
    }
  }

  return dice;
}

// Helper: Format hit dice for display (e.g., "2d8 + 3d4")
function formatHitDice(char) {
  const dice = getHitDice(char);
  const parts = Object.entries(dice)
    .sort((a, b) => parseInt(b[0].slice(1)) - parseInt(a[0].slice(1))) // Sort by die size desc
    .map(([die, count]) => `${count}${die}`);
  return parts.join(' + ') || '0';
}

// Helper: Initialize or update hit dice tracking structure
function initializeHitDice(char) {
  const maxDice = getHitDice(char);
  if (!char.hitDiceTracking) {
    char.hitDiceTracking = {};
  }
  // Update max values and ensure current exists
  Object.keys(maxDice).forEach(die => {
    if (!char.hitDiceTracking[die]) {
      char.hitDiceTracking[die] = { current: maxDice[die], max: maxDice[die] };
    } else {
      char.hitDiceTracking[die].max = maxDice[die];
      // Cap current at new max if levels decreased
      if (char.hitDiceTracking[die].current > maxDice[die]) {
        char.hitDiceTracking[die].current = maxDice[die];
      }
    }
  });
  // Remove dice types no longer present (class changed)
  Object.keys(char.hitDiceTracking).forEach(die => {
    if (!maxDice[die]) {
      delete char.hitDiceTracking[die];
    }
  });
  return char.hitDiceTracking;
}

// Helper: Format hit dice with current/max for display
function formatHitDiceWithCurrent(char) {
  initializeHitDice(char);
  const parts = Object.entries(char.hitDiceTracking)
    .sort((a, b) => parseInt(b[0].slice(1)) - parseInt(a[0].slice(1)))
    .map(([die, data]) => `${data.current}/${data.max}${die}`);
  return parts.join(' + ') || '0';
}

function loadCharacters() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    characters = data ? JSON.parse(data) : [];
    // Migrate all characters to new format
    characters = characters.map(migrateCharacter);
    // Save migrated data
    saveCharacters();
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
          Level ${getTotalLevel(char)} ${char.ancestry} ${getClassDisplayString(char)} | ${char.background}
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
  const primaryClass = getPrimaryClass(char);
  const allClasses = getAllClassData(char);
  const ancestryData = ANCESTRIES.find(a => a.name === char.ancestry);

  // Calculate derived stats (based on total level for multiclass)
  const totalLevel = getTotalLevel(char);
  const pb = totalLevel <= 4 ? 2 : (totalLevel <= 8 ? 3 : 4);
  const startingBoost = Math.floor(pb / 2);

  // Build traits HTML
  let traitsHtml = '';
  if (ancestryData) {
    traitsHtml = ancestryData.traits.map(t =>
      `<div class="ancestry-trait"><strong>${t.name}:</strong> ${t.desc}</div>`
    ).join('');
    if (ancestryData.restriction) {
      traitsHtml += `<div class="ancestry-trait" style="background: #fee; border-color: #c44;"><strong>Restriction:</strong> ${ancestryData.restriction}</div>`;
    }
  }

  // Build editable feats HTML (feats are now objects with name and source)
  let featsHtml = '';
  const allFeats = char.feats || [];
  // Helper to get feat name (handles both old string format and new object format)
  const getFeatName = (f) => typeof f === 'string' ? f : f.name;
  const getFeatSource = (f) => typeof f === 'string' ? null : f.source;

  if (allFeats.length > 0 || char.humanFeat) {
    featsHtml = `<div class="feats-section">`;
    featsHtml += allFeats.map((f, idx) => {
      const featName = getFeatName(f);
      const featSource = getFeatSource(f);
      return `
      <div class="feat-item">
        <span class="feat-name">${featName}</span>
        ${featSource ? `<span class="feat-source">(${featSource})</span>` : ''}
        <span class="remove-feat" data-idx="${idx}">&times;</span>
        <span class="feat-tooltip">${FEAT_DESCRIPTIONS[featName] || 'No description available.'}</span>
      </div>
    `}).join('');
    if (char.humanFeat) {
      featsHtml += `
        <div class="feat-item">
          <span class="feat-name">${char.humanFeat}</span>
          <span class="feat-source">(Human)</span>
          <span class="feat-tooltip">${FEAT_DESCRIPTIONS[char.humanFeat] || 'No description available.'}</span>
        </div>
      `;
    }
    const excludedFeatNames = [...allFeats.map(getFeatName), char.humanFeat].filter(Boolean);
    featsHtml += `
      <div class="add-feat-row">
        <select id="add-feat-select">
          <option value="">Add feat...</option>
          <optgroup label="General Feats">
            ${GENERAL_FEATS.filter(f => !excludedFeatNames.includes(f)).map(f => `<option value="${f}">${f}</option>`).join('')}
          </optgroup>
          <optgroup label="Fighter Feats">
            ${FIGHTER_FEATS.filter(f => !excludedFeatNames.includes(f)).map(f => `<option value="${f}">${f}</option>`).join('')}
          </optgroup>
          <optgroup label="Expert Feats">
            ${EXPERT_FEATS.filter(f => !excludedFeatNames.includes(f)).map(f => `<option value="${f}">${f}</option>`).join('')}
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

  // Build weapons HTML (uses multiclass proficiency check)
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
          const proficient = isWeaponProficientMulticlass(w.name, weaponData, char);
          const attackBonus = (proficient ? pb : 0) + statMod;
          const damageBonus = statMod;
          return `
            <tr class="${proficient ? '' : 'not-proficient'}">
              <td class="weapon-name">${w.name}${proficient ? '' : ' *'}</td>
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
    <p style="font-size: 0.75rem; color: #888; margin: 0.25rem 0 0.5rem;">* Not proficient (no PB to attack)</p>
    <div class="add-weapon-row">
      <select id="add-weapon-select">
        <option value="">Add weapon...</option>
        ${Object.keys(WEAPONS).sort().map(w => `<option value="${w}">${w}</option>`).join('')}
      </select>
      <button class="btn-small" id="add-weapon-btn">Add</button>
    </div>
  `;

  // Spellcasting (full 6 tiers with Spellbook/Prepared distinction)
  // For multiclass: spell slots based on caster class levels only, not total level
  let spellHtml = '';
  const spellcastingClass = getSpellcastingClass(char);
  if (spellcastingClass?.spellcasting) {
    const stat = spellcastingClass.spellcasting.stat;
    const spellType = spellcastingClass.spellcasting.type; // "Cleric", "Arcane", or "Druidic"
    const mod = char.finalAbilities[stat];
    const dc = 8 + pb + mod;
    const attack = pb + mod;
    const casterLevel = getCasterLevel(char); // Uses caster class levels for multiclass
    const preparedLimit = Math.max(1, casterLevel + mod);
    const maxSlots = SPELL_SLOTS_BY_LEVEL[Math.min(casterLevel, 10)] || SPELL_SLOTS_BY_LEVEL[1];
    const spellList = SPELL_LISTS[spellType] || {};

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

    // Initialize spellbook (known spells) if needed
    if (!char.spellbook) {
      char.spellbook = [];
    }
    // Initialize prepared spells if needed
    if (!char.preparedSpells) {
      char.preparedSpells = [];
    }

    // Count prepared spells
    const preparedCount = char.preparedSpells.length;
    const atLimit = preparedCount >= preparedLimit;

    // Group known spells by tier
    const spellsByTier = {};
    for (let t = 1; t <= 6; t++) {
      spellsByTier[t] = char.spellbook.filter(s => s.tier === t);
    }

    // Generate spellbook HTML with checkboxes for prepared
    let spellbookHtml = '';
    for (let tier = 1; tier <= 6; tier++) {
      const tierSpells = spellsByTier[tier];
      const tierAvailable = maxSlots[`t${tier}`] > 0;

      if (tierSpells.length > 0 || tierAvailable) {
        spellbookHtml += `<div class="spellbook-tier">`;
        spellbookHtml += `<div class="spellbook-tier-header">Tier ${tier}${!tierAvailable ? ' (locked)' : ''}</div>`;

        if (tierSpells.length > 0) {
          tierSpells.forEach(spell => {
            const isPrepared = char.preparedSpells.some(p => p.name === spell.name && p.tier === spell.tier);
            const canPrepare = !atLimit || isPrepared;
            const spellDesc = SPELL_DESCRIPTIONS[spell.name] || 'No description available.';

            spellbookHtml += `
              <div class="spellbook-spell">
                <input type="checkbox"
                       data-spell-name="${spell.name}"
                       data-spell-tier="${spell.tier}"
                       ${isPrepared ? 'checked' : ''}
                       ${!canPrepare ? 'disabled' : ''}
                       class="prepare-spell-checkbox">
                <span class="spell-name ${isPrepared ? 'prepared' : ''}">${spell.name}</span>
                <span class="remove-known-spell" data-spell-name="${spell.name}" data-spell-tier="${spell.tier}">&times;</span>
                <span class="spell-tooltip">${spellDesc}</span>
              </div>
            `;
          });
        } else if (tierAvailable) {
          spellbookHtml += `<p style="color: #999; font-style: italic; font-size: 0.85rem; margin: 0.25rem 0;">No spells known</p>`;
        }
        spellbookHtml += `</div>`;
      }
    }

    // Get available spells for adding (not already in spellbook)
    const knownSpellNames = char.spellbook.map(s => `${s.name}-${s.tier}`);

    spellHtml = `
      <h3>Spellcasting (${spellType})</h3>
      <div class="derived-stats" style="grid-template-columns: repeat(3, 1fr);">
        <div class="derived-box"><strong>${dc}</strong>Spell DC</div>
        <div class="derived-box"><strong>${formatMod(attack)}</strong>Spell Attack</div>
        <div class="derived-box"><strong>${preparedLimit}</strong>Max Prepared</div>
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

      <div class="spellbook-section">
        <h4>
          Spellbook
          <span class="prepared-count ${atLimit ? 'at-limit' : 'under-limit'}">${preparedCount}/${preparedLimit} prepared</span>
        </h4>
        <p style="font-size: 0.8rem; color: #666; margin: 0 0 0.5rem 0;">Check spells to prepare them for the day. Hover for descriptions.</p>

        ${spellbookHtml || '<p style="color: #666; font-style: italic;">No spells in spellbook yet. Add spells below.</p>'}

        <div class="add-spellbook-row">
          <select id="add-spell-tier-select" class="spell-tier-select">
            ${[1,2,3,4,5,6].map(t => `<option value="${t}" ${maxSlots[`t${t}`] === 0 ? 'disabled' : ''}>Tier ${t}</option>`).join('')}
          </select>
          <select id="add-spell-name-select" class="spell-name-select">
            <option value="">Select spell...</option>
          </select>
          <button class="btn-small" id="add-known-spell-btn">Add to Spellbook</button>
        </div>
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

  // Build class features HTML for all classes
  const classFeatures = allClasses.map(classData => {
    let html = `<div class="class-feature"><strong>${classData.name} Boost Hook:</strong> ${classData?.boostHook || 'None'}</div>`;
    if (classData?.feature) {
      html += `<div class="class-feature"><strong>${classData.feature}</strong>${CLASS_FEATURE_DESCRIPTIONS[classData.feature] ? `<span class="feature-tooltip">${CLASS_FEATURE_DESCRIPTIONS[classData.feature]}</span>` : ''}</div>`;
    }
    return html;
  }).join('');

  sheet.innerHTML = `
    <h2>${char.name}</h2>
    <p style="font-size: 1rem; margin-bottom: 0.5rem;">
      <strong>Ancestry:</strong> ${char.ancestry} |
      <strong>Background:</strong> ${char.background} |
      <strong>Total Level:</strong> ${totalLevel} |
      <strong>PB:</strong> +${pb}
    </p>
    <div class="class-levels-editor" style="margin-bottom: 1rem;">
      <strong>Classes:</strong>
      ${char.classes.map((c, idx) => `
        <span class="class-level-item" style="margin-left: 0.5rem;">
          ${c.name}
          <input type="number" class="class-level-input" data-class-idx="${idx}" value="${c.levels}" min="1" max="10" style="width: 40px; margin: 0 0.25rem;">
          ${char.classes.length > 1 ? `<span class="remove-class" data-class-idx="${idx}" style="cursor: pointer; color: #c44;">&times;</span>` : ''}
        </span>
      `).join(' / ')}
      ${char.classes.length < 2 ? `<button id="add-class-btn" class="btn-small" style="margin-left: 0.75rem;">+ Add Class</button>` : ''}
    </div>

    <div class="xp-tracker" style="margin-bottom: 1rem; padding: 0.5rem; background: #f8f8f8; border-radius: 4px; display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
      <div>
        <strong>XP:</strong>
        <input type="number" id="xp-current" value="${char.xp || 0}" min="0" style="width: 80px; margin: 0 0.25rem;">
        <span style="color: #666;">/ ${getXpForLevel(totalLevel + 1).toLocaleString()} for level ${Math.min(totalLevel + 1, 12)}</span>
      </div>
      <div style="color: #666; font-size: 0.9rem;">
        ${totalLevel >= 12 ? '<em>Max level reached!</em>' : `<em>${getXpToNextLevel(char.xp || 0, totalLevel).toLocaleString()} XP to next level</em>`}
      </div>
    </div>

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
      <div class="derived-box"><strong>${formatHitDiceWithCurrent(char)}</strong>Hit Dice</div>
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

    <div class="rest-buttons" style="margin: 1rem 0; display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <button id="nights-rest-btn" class="btn-secondary" style="padding: 0.5rem 1rem;">Night's Rest</button>
      <button id="safe-haven-btn" class="btn-secondary" style="padding: 0.5rem 1rem;">Safe Haven</button>
    </div>

    <div class="saves-proficiencies">
      <div><strong>Proficient Saves:</strong> ${getSaveProficiencies(char).join(', ') || 'None'}</div>
      <div><strong>Languages:</strong> ${ancestryData?.languages.join(', ') || 'Common'}</div>
    </div>

    <h3>Proficiencies</h3>
    <p><strong>Weapons:</strong> ${getWeaponProficiencies(char) || 'None'}<br>
    <strong>Armor:</strong> ${getArmorProficiencies(char) || 'None'}</p>

    <h3>Weapons</h3>
    ${weaponsHtml}

    ${spellHtml}

    <h3>Feats</h3>
    ${featsHtml}

    <h3>Ancestry Traits (${char.ancestry})</h3>
    ${traitsHtml}

    <h3>Class Features</h3>
    ${classFeatures}

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

// Show modal to add a second class (multiclassing)
function showAddClassModal(char) {
  // Get current class to filter options
  const currentClassName = char.classes[0]?.name;
  const currentClassData = CLASSES.find(c => c.name === currentClassName);
  const currentIsCaster = currentClassData?.spellcasting;

  // Build available classes (exclude current, handle dual-caster restriction)
  const availableClasses = CLASSES.filter(c => {
    if (c.name === currentClassName) return false;
    // No dual-caster multiclassing
    if (currentIsCaster && c.spellcasting) return false;
    return true;
  });

  // Create modal
  const modal = document.createElement('div');
  modal.className = 'add-class-modal';
  modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;';
  modal.innerHTML = `
    <div style="background: white; padding: 1.5rem; border-radius: 8px; max-width: 400px; width: 90%;">
      <h3 style="margin-top: 0;">Add Second Class</h3>
      <p style="font-size: 0.9rem; color: #666;">Choose a class to multiclass into:</p>
      ${currentIsCaster ? '<p style="font-size: 0.85rem; color: #c44; margin: 0.5rem 0;">Note: Dual-caster multiclassing not supported.</p>' : ''}
      <select id="new-class-select" style="width: 100%; padding: 0.5rem; margin: 0.5rem 0;">
        ${availableClasses.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
      </select>
      <div style="margin-top: 1rem; display: flex; gap: 0.5rem; justify-content: flex-end;">
        <button id="cancel-add-class" class="btn-secondary">Cancel</button>
        <button id="confirm-add-class" class="btn-primary">Add Class</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Event listeners
  document.getElementById('cancel-add-class').addEventListener('click', () => {
    modal.remove();
  });

  document.getElementById('confirm-add-class').addEventListener('click', () => {
    const newClassName = document.getElementById('new-class-select').value;
    if (newClassName) {
      char.classes.push({ name: newClassName, levels: 1 });
      char.totalLevel = char.classes.reduce((sum, c) => sum + c.levels, 0);
      saveCurrentCharacter();
      modal.remove();
      renderEditableSheet(char);
    }
  });

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

// Show Night's Rest modal
function showNightsRestModal(char) {
  initializeHitDice(char);
  const conMod = char.finalAbilities?.CON || 0;
  const spellcastingClass = getSpellcastingClass(char);

  // Restore spell slots immediately
  if (spellcastingClass && char.spellSlots) {
    const casterLevel = getCasterLevel(char);
    const maxSlots = SPELL_SLOTS_BY_LEVEL[Math.min(casterLevel, 12)] || SPELL_SLOTS_BY_LEVEL[1];
    Object.keys(char.spellSlots).forEach(key => {
      char.spellSlots[key].current = maxSlots[key] || 0;
    });
    saveCurrentCharacter();
  }

  const modal = document.createElement('div');
  modal.className = 'rest-modal';
  modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;';

  function renderModalContent() {
    const hitDiceHtml = Object.entries(char.hitDiceTracking)
      .sort((a, b) => parseInt(b[0].slice(1)) - parseInt(a[0].slice(1)))
      .map(([die, data]) => `
        <div style="display: flex; align-items: center; gap: 0.5rem; margin: 0.5rem 0;">
          <span style="font-weight: bold; min-width: 80px;">${die}: ${data.current}/${data.max}</span>
          <button class="spend-die-btn btn-small" data-die="${die}" ${data.current <= 0 ? 'disabled' : ''}>
            Spend ${die}
          </button>
          ${data.current <= 0 ? '<span style="color: #999; font-size: 0.85rem;">(none left)</span>' : ''}
        </div>
      `).join('');

    return `
      <div style="background: white; padding: 1.5rem; border-radius: 8px; max-width: 450px; width: 90%;">
        <h3 style="margin-top: 0;">Night's Rest</h3>

        <p style="color: #28a745; margin: 0.5rem 0;">✓ Spell slots restored</p>

        <div style="margin: 1rem 0; padding: 1rem; background: #f8f9fa; border-radius: 4px;">
          <p style="margin: 0 0 0.5rem 0; font-weight: bold;">Spend Hit Dice to heal:</p>
          <p style="margin: 0 0 0.75rem 0; font-size: 0.9rem; color: #666;">
            Roll each die + CON (${conMod >= 0 ? '+' : ''}${conMod}), add result to HP
          </p>
          ${hitDiceHtml}
        </div>

        <div style="margin: 1rem 0; padding: 0.75rem; background: #fff3cd; border-radius: 4px;">
          <p style="margin: 0; font-size: 0.9rem;">
            <strong>Fatigue:</strong> Reduce by 2 (with shelter) or 1 (roughing it)<br>
            <span style="color: #666;">Current: ${char.fatigue || 0} — adjust manually</span>
          </p>
        </div>

        <div style="margin-top: 1rem; display: flex; justify-content: flex-end;">
          <button id="close-rest-modal" class="btn-primary">Done</button>
        </div>
      </div>
    `;
  }

  modal.innerHTML = renderModalContent();
  document.body.appendChild(modal);

  function attachModalListeners() {
    // Spend die buttons
    modal.querySelectorAll('.spend-die-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const die = btn.dataset.die;
        if (char.hitDiceTracking[die] && char.hitDiceTracking[die].current > 0) {
          char.hitDiceTracking[die].current--;
          saveCurrentCharacter();
          modal.querySelector('div > div').outerHTML = renderModalContent().match(/<div style="background: white;[\s\S]*<\/div>\s*$/)[0];
          attachModalListeners();
        }
      });
    });

    // Close button
    modal.querySelector('#close-rest-modal')?.addEventListener('click', () => {
      modal.remove();
      renderEditableSheet(char);
    });
  }

  attachModalListeners();

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
      renderEditableSheet(char);
    }
  });
}

// Show Safe Haven modal
function showSafeHavenModal(char) {
  initializeHitDice(char);
  const spellcastingClass = getSpellcastingClass(char);

  // Restore everything
  char.currentHp = char.maxHp;
  char.fatigue = 0;

  // Restore all hit dice
  Object.keys(char.hitDiceTracking).forEach(die => {
    char.hitDiceTracking[die].current = char.hitDiceTracking[die].max;
  });

  // Restore spell slots
  if (spellcastingClass && char.spellSlots) {
    const casterLevel = getCasterLevel(char);
    const maxSlots = SPELL_SLOTS_BY_LEVEL[Math.min(casterLevel, 12)] || SPELL_SLOTS_BY_LEVEL[1];
    Object.keys(char.spellSlots).forEach(key => {
      char.spellSlots[key].current = maxSlots[key] || 0;
    });
  }

  saveCurrentCharacter();

  const modal = document.createElement('div');
  modal.className = 'rest-modal';
  modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;';

  modal.innerHTML = `
    <div style="background: white; padding: 1.5rem; border-radius: 8px; max-width: 400px; width: 90%;">
      <h3 style="margin-top: 0;">Safe Haven</h3>
      <p style="font-size: 0.9rem; color: #666; margin-bottom: 1rem;">1d4+1 days of rest in a safe location</p>

      <div style="margin: 1rem 0;">
        <p style="color: #28a745; margin: 0.25rem 0;">✓ HP restored to maximum (${char.maxHp})</p>
        <p style="color: #28a745; margin: 0.25rem 0;">✓ All Hit Dice restored (${formatHitDice(char)})</p>
        ${spellcastingClass ? '<p style="color: #28a745; margin: 0.25rem 0;">✓ Spell slots restored</p>' : ''}
        <p style="color: #28a745; margin: 0.25rem 0;">✓ Fatigue cleared</p>
      </div>

      <p style="font-size: 0.95rem; margin: 1rem 0; padding: 0.75rem; background: #e7f3ff; border-radius: 4px;">
        You're fully rested and ready to adventure.
      </p>

      <div style="margin-top: 1rem; display: flex; justify-content: flex-end;">
        <button id="close-rest-modal" class="btn-primary">Done</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('#close-rest-modal').addEventListener('click', () => {
    modal.remove();
    renderEditableSheet(char);
  });

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
      renderEditableSheet(char);
    }
  });
}

function attachSheetListeners(char) {
  // Class level inputs (for leveling up)
  document.querySelectorAll('.class-level-input').forEach(input => {
    input.addEventListener('change', () => {
      const idx = parseInt(input.dataset.classIdx);
      const newLevel = parseInt(input.value) || 1;
      char.classes[idx].levels = Math.max(1, Math.min(10, newLevel));
      char.totalLevel = char.classes.reduce((sum, c) => sum + c.levels, 0);
      saveCurrentCharacter();
      renderEditableSheet(char);
    });
  });

  // Remove class button (for multiclass)
  document.querySelectorAll('.remove-class').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.classIdx);
      if (char.classes.length > 1) {
        char.classes.splice(idx, 1);
        char.totalLevel = char.classes.reduce((sum, c) => sum + c.levels, 0);
        saveCurrentCharacter();
        renderEditableSheet(char);
      }
    });
  });

  // Add class button (for multiclassing)
  document.getElementById('add-class-btn')?.addEventListener('click', () => {
    showAddClassModal(char);
  });

  // XP input
  document.getElementById('xp-current')?.addEventListener('change', (e) => {
    char.xp = Math.max(0, parseInt(e.target.value) || 0);
    saveCurrentCharacter();
    renderEditableSheet(char);
  });

  // Rest buttons
  document.getElementById('nights-rest-btn')?.addEventListener('click', () => {
    showNightsRestModal(char);
  });
  document.getElementById('safe-haven-btn')?.addEventListener('click', () => {
    showSafeHavenModal(char);
  });

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
      // Determine source based on feat type
      let source = 'General';
      if (FIGHTER_FEATS.includes(featName)) {
        source = 'Fighter';
      } else if (EXPERT_FEATS.includes(featName)) {
        source = 'Expert';
      }
      char.feats.push({ name: featName, source: source });
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

  // Spellbook management - prepare/unprepare spells via checkbox
  document.querySelectorAll('.prepare-spell-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const spellName = checkbox.dataset.spellName;
      const spellTier = parseInt(checkbox.dataset.spellTier);

      char.preparedSpells = char.preparedSpells || [];

      if (checkbox.checked) {
        // Add to prepared
        if (!char.preparedSpells.some(p => p.name === spellName && p.tier === spellTier)) {
          char.preparedSpells.push({ name: spellName, tier: spellTier });
        }
      } else {
        // Remove from prepared
        char.preparedSpells = char.preparedSpells.filter(p => !(p.name === spellName && p.tier === spellTier));
      }

      saveCurrentCharacter();
      renderEditableSheet(char);
    });
  });

  // Remove spell from spellbook
  document.querySelectorAll('.remove-known-spell').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const spellName = btn.dataset.spellName;
      const spellTier = parseInt(btn.dataset.spellTier);

      char.spellbook = char.spellbook || [];
      char.spellbook = char.spellbook.filter(s => !(s.name === spellName && s.tier === spellTier));

      // Also remove from prepared if it was prepared
      char.preparedSpells = char.preparedSpells || [];
      char.preparedSpells = char.preparedSpells.filter(p => !(p.name === spellName && p.tier === spellTier));

      saveCurrentCharacter();
      renderEditableSheet(char);
    });
  });

  // Populate spell name dropdown when tier changes
  const tierSelect = document.getElementById('add-spell-tier-select');
  const spellSelect = document.getElementById('add-spell-name-select');

  function updateSpellDropdown() {
    if (!tierSelect || !spellSelect) return;

    const selectedTier = parseInt(tierSelect.value);
    // Use getSpellcastingClass for multiclass support (v4)
    const spellcastingClass = getSpellcastingClass(char);
    const spellType = spellcastingClass?.spellcasting?.type;

    if (!spellType || !SPELL_LISTS[spellType]) {
      spellSelect.innerHTML = '<option value="">No spells available</option>';
      return;
    }

    const tierSpells = SPELL_LISTS[spellType][selectedTier] || [];
    const knownSpells = (char.spellbook || []).filter(s => s.tier === selectedTier).map(s => s.name);
    const availableSpells = tierSpells.filter(spell => !knownSpells.includes(spell));

    spellSelect.innerHTML = '<option value="">Select spell...</option>';
    availableSpells.forEach(spell => {
      const opt = document.createElement('option');
      opt.value = spell;
      opt.textContent = spell;
      spellSelect.appendChild(opt);
    });
  }

  tierSelect?.addEventListener('change', updateSpellDropdown);
  // Initialize on load
  updateSpellDropdown();

  // Add spell to spellbook
  document.getElementById('add-known-spell-btn')?.addEventListener('click', () => {
    const tier = parseInt(tierSelect?.value) || 1;
    const spellName = spellSelect?.value;

    if (spellName) {
      char.spellbook = char.spellbook || [];
      // Avoid duplicates
      if (!char.spellbook.some(s => s.name === spellName && s.tier === tier)) {
        char.spellbook.push({ name: spellName, tier: tier });
        saveCurrentCharacter();
        renderEditableSheet(char);
      }
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

  // Convert feats to new format with source (v4)
  const featsWithSource = (generatorState.feats || []).map(f => ({
    name: f,
    source: generatorState.charClass.name
  }));

  // Build character object (v4 format with classes array)
  const character = {
    id: generateId(),
    name: name,
    ancestry: generatorState.ancestry.name,
    classes: [{ name: generatorState.charClass.name, levels: 1 }], // New v4 format
    totalLevel: 1,
    background: generatorState.background,
    abilities: generatorState.abilities,
    finalAbilities: finalAbilities,
    humanBonusAbility: generatorState.humanBonusAbility,
    feats: featsWithSource, // New v4 format with source
    humanFeat: generatorState.humanFeat,
    maxHp: maxHp,
    currentHp: maxHp,
    ac: ac,
    slots: Math.max(5, 10 + finalAbilities.STR),
    fatigue: 0,
    boostDice: 1, // PB/2 rounded down at level 1
    equipment: equipment,
    coins: { gp: 25, sp: 0, cp: 0 },
    xp: 0,
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
      let char = JSON.parse(e.target.result);

      // Validate basic structure (support both old className and new classes format)
      if (!char.name || !char.ancestry || (!char.className && !char.classes)) {
        alert('Invalid character file');
        return;
      }

      // Generate new ID to avoid conflicts
      char.id = generateId();
      char.importedAt = new Date().toISOString();

      // Migrate to v4 format if needed
      char = migrateCharacter(char);

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

// ============ MANUAL ENTRY FUNCTIONS ============

function showManualEntry() {
  // Hide roll steps, show manual entry
  document.getElementById('step-abilities').style.display = 'none';
  document.getElementById('step-ancestry').style.display = 'none';
  document.getElementById('step-class').style.display = 'none';
  document.getElementById('step-background').style.display = 'none';
  document.getElementById('step-kit').style.display = 'none';
  document.getElementById('step-name').style.display = 'none';
  document.getElementById('step-manual-entry').style.display = 'block';

  // Populate dropdowns
  populateManualDropdowns();
}

function hideManualEntry() {
  document.getElementById('step-manual-entry').style.display = 'none';
  document.getElementById('step-abilities').style.display = 'block';
}

function populateManualDropdowns() {
  // Ancestry dropdown
  const ancestrySelect = document.getElementById('manual-ancestry');
  ancestrySelect.innerHTML = ANCESTRIES.map(a =>
    `<option value="${a.name}">${a.name}${a.restriction ? ' (' + a.restriction + ')' : ''}</option>`
  ).join('');

  // Class dropdowns (primary and secondary)
  const classSelect = document.getElementById('manual-class');
  const class2Select = document.getElementById('manual-class-2');
  updateManualClassOptions();

  // Background dropdown
  const bgSelect = document.getElementById('manual-background');
  bgSelect.innerHTML = BACKGROUNDS.map(b =>
    `<option value="${b}">${b}</option>`
  ).join('');

  // Set up ancestry change handler for class restrictions
  ancestrySelect.addEventListener('change', updateManualClassOptions);

  // Set up class change handler for feats and second class options
  classSelect.addEventListener('change', () => {
    updateManualSecondClassOptions();
    updateManualFeats();
  });
  class2Select.addEventListener('change', updateManualFeats);

  // Set up level change handlers to update total level display
  document.getElementById('manual-class-levels').addEventListener('change', updateManualTotalLevel);
  document.getElementById('manual-class-2-levels').addEventListener('change', updateManualTotalLevel);
}

// Helper: Check if a class is a caster
function isCasterClass(className) {
  const classData = CLASSES.find(c => c.name === className);
  return classData && classData.spellcasting;
}

function updateManualSecondClassOptions() {
  const primaryClass = document.getElementById('manual-class').value;
  const class2Select = document.getElementById('manual-class-2');
  const multiclassNote = document.getElementById('multiclass-note');
  const ancestryName = document.getElementById('manual-ancestry').value;
  const ancestry = ANCESTRIES.find(a => a.name === ancestryName);
  const primaryIsCaster = isCasterClass(primaryClass);

  // Build options for second class
  let options = '<option value="">(None - single class)</option>';

  CLASSES.forEach(c => {
    // Can't pick same class
    if (c.name === primaryClass) return;

    // Ancestry restriction
    if (ancestry && ancestry.restrictedClass === c.name) return;

    // Dual-caster restriction
    const secondIsCaster = isCasterClass(c.name);
    if (primaryIsCaster && secondIsCaster) {
      options += `<option value="${c.name}" disabled>${c.name} (dual-caster not allowed)</option>`;
    } else {
      options += `<option value="${c.name}">${c.name}</option>`;
    }
  });

  class2Select.innerHTML = options;

  // Show/hide multiclass note
  multiclassNote.style.display = primaryIsCaster ? 'block' : 'none';
}

function updateManualTotalLevel() {
  const level1 = parseInt(document.getElementById('manual-class-levels').value) || 1;
  const level2 = parseInt(document.getElementById('manual-class-2-levels').value) || 0;
  // Total level is just informational - we track separately
}

function updateManualClassOptions() {
  const ancestryName = document.getElementById('manual-ancestry').value;
  const ancestry = ANCESTRIES.find(a => a.name === ancestryName);
  const classSelect = document.getElementById('manual-class');
  const currentClass = classSelect.value;

  classSelect.innerHTML = CLASSES.map(c => {
    const disabled = ancestry && ancestry.restrictedClass === c.name;
    return `<option value="${c.name}" ${disabled ? 'disabled' : ''}>${c.name}${disabled ? ' (not available)' : ''}</option>`;
  }).join('');

  // Try to keep current selection if still valid
  if (currentClass && !CLASSES.find(c => c.name === currentClass && ancestry && ancestry.restrictedClass === c.name)) {
    classSelect.value = currentClass;
  }

  // Also update second class options
  updateManualSecondClassOptions();
  updateManualFeats();
}

function updateManualFeats() {
  const className = document.getElementById('manual-class').value;
  const classData = CLASSES.find(c => c.name === className);
  const featsSection = document.getElementById('manual-feats-section');
  const featsList = document.getElementById('manual-feats-list');
  const featsLabel = document.getElementById('manual-feats-label');

  // Check ancestry for Human bonus feat
  const ancestryName = document.getElementById('manual-ancestry').value;
  const ancestry = ANCESTRIES.find(a => a.name === ancestryName);
  const hasHumanFeat = ancestry && ancestry.bonusFeat === 'general';

  if (!classData || (!classData.feats && !hasHumanFeat)) {
    featsSection.style.display = 'none';
    return;
  }

  featsSection.style.display = 'block';

  // Calculate total feats needed
  let featCount = classData.feats ? classData.feats.count : 0;
  if (hasHumanFeat) featCount += 1;

  featsLabel.textContent = `Select ${featCount} Feat${featCount > 1 ? 's' : ''}:`;

  // Get available feats based on class
  let availableFeats = [...GENERAL_FEATS];
  if (classData.feats) {
    if (classData.feats.type === 'fighter') {
      availableFeats = [...FIGHTER_FEATS, ...GENERAL_FEATS];
    } else if (classData.feats.type === 'expert') {
      availableFeats = [...EXPERT_FEATS, ...GENERAL_FEATS];
    }
  }
  availableFeats.sort();

  // Build feat selection rows
  featsList.innerHTML = '';
  for (let i = 0; i < featCount; i++) {
    const row = document.createElement('div');
    row.className = 'manual-feat-row';
    row.innerHTML = `
      <select class="manual-feat-select">
        <option value="">-- Select Feat ${i + 1} --</option>
        ${availableFeats.map(f => `<option value="${f}">${f}</option>`).join('')}
      </select>
    `;
    featsList.appendChild(row);
  }
}

function createManualCharacter() {
  // Gather form data
  const name = document.getElementById('manual-name').value.trim();
  const maxHp = parseInt(document.getElementById('manual-maxhp').value) || 8;

  // Get class levels for multiclass support
  const className = document.getElementById('manual-class').value;
  const classLevels = parseInt(document.getElementById('manual-class-levels').value) || 1;
  const class2Name = document.getElementById('manual-class-2').value;
  const class2Levels = parseInt(document.getElementById('manual-class-2-levels').value) || 0;

  // Build classes array (new v4 format)
  const classes = [{ name: className, levels: classLevels }];
  if (class2Name && class2Levels > 0) {
    classes.push({ name: class2Name, levels: class2Levels });
  }
  const totalLevel = classes.reduce((sum, c) => sum + c.levels, 0);

  const abilities = {
    STR: parseInt(document.getElementById('manual-str').value) || 0,
    DEX: parseInt(document.getElementById('manual-dex').value) || 0,
    CON: parseInt(document.getElementById('manual-con').value) || 0,
    INT: parseInt(document.getElementById('manual-int').value) || 0,
    WIS: parseInt(document.getElementById('manual-wis').value) || 0,
    CHA: parseInt(document.getElementById('manual-cha').value) || 0
  };

  const ancestryName = document.getElementById('manual-ancestry').value;
  const ancestry = ANCESTRIES.find(a => a.name === ancestryName);
  const classData = CLASSES.find(c => c.name === className);
  const background = document.getElementById('manual-background').value;

  // Gather selected feats (now stored with source)
  const featSelects = document.querySelectorAll('.manual-feat-select');
  const feats = [];
  featSelects.forEach(select => {
    if (select.value) {
      // Determine source based on feat type
      let source = className; // Default to primary class
      if (FIGHTER_FEATS.includes(select.value)) {
        source = classes.find(c => c.name === 'Fighter')?.name || className;
      } else if (EXPERT_FEATS.includes(select.value)) {
        source = classes.find(c => c.name === 'Expert')?.name || className;
      }
      feats.push({ name: select.value, source: source });
    }
  });

  // Check for human bonus ability
  const hasHumanBonus = ancestry && ancestry.bonusAbility;
  let humanBonusAbility = null;
  if (hasHumanBonus) {
    // For manual entry, we'll just note it - they've already included it in their stats
    humanBonusAbility = 'included'; // Marker that human bonus was applied
  }

  // Check for human bonus feat
  const hasHumanFeat = ancestry && ancestry.bonusFeat === 'general';
  let humanFeat = null;
  if (hasHumanFeat && feats.length > 0) {
    humanFeat = feats.pop().name; // Last feat is the human one (remove from array)
  }

  // Calculate derived values (based on total level)
  const pb = Math.floor((totalLevel + 3) / 4) + 1; // PB by level
  const boostDice = Math.floor(pb / 2);

  // Calculate AC (default to 10 + DEX, player can edit later)
  const ac = 10 + abilities.DEX;

  // Calculate slots
  const slots = Math.max(5, 10 + abilities.STR);

  // Find spellcasting class (if any) for spell slots
  const allClassData = classes.map(c => CLASSES.find(cl => cl.name === c.name)).filter(Boolean);
  const casterClass = allClassData.find(c => c.spellcasting);
  const casterLevels = casterClass ? classes.find(c => c.name === casterClass.name)?.levels || 0 : 0;

  // Build character object (new v4 format)
  const character = {
    id: generateId(),
    name: name || `${ancestryName} ${className}`,
    ancestry: ancestryName,
    classes: classes, // New v4 format
    totalLevel: totalLevel,
    background: background,
    abilities: abilities, // For manual entry, base = final
    finalAbilities: abilities,
    humanBonusAbility: humanBonusAbility,
    feats: feats, // Now array of {name, source} objects
    humanFeat: humanFeat,
    maxHp: maxHp,
    currentHp: maxHp,
    ac: ac,
    slots: slots,
    fatigue: 0,
    boostDice: boostDice,
    equipment: [], // Start empty, player adds their own
    coins: { gp: 0, sp: 0, cp: 0 },
    xp: 0,
    spellSlots: casterClass ? calculateSpellSlots(casterLevels, casterClass) : null,
    spellbook: casterClass ? [] : null,
    notes: 'Imported from paper/PDF',
    createdAt: new Date().toISOString()
  };

  characters.push(character);
  saveCharacters();

  currentCharacterId = character.id;
  document.getElementById('generator-steps').style.display = 'none';
  document.getElementById('step-manual-entry').style.display = 'none';
  document.getElementById('cancel-creation').style.display = 'none';
  renderEditableSheet(character);
}

function calculateSpellSlots(level, classData) {
  // Calculate max slots per tier based on level
  // Tier 1 available at level 1, Tier 2 at level 3, etc.
  const slots = {};
  const maxTier = Math.min(6, Math.ceil(level / 2));

  for (let tier = 1; tier <= maxTier; tier++) {
    const tierKey = `t${tier}`;
    // Rough approximation: 2 slots per tier, +1 at higher levels
    const maxSlots = 2 + Math.floor((level - (tier * 2 - 1)) / 3);
    slots[tierKey] = { current: Math.max(1, maxSlots), max: Math.max(1, maxSlots) };
  }

  return slots;
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

// Manual entry event listeners
document.getElementById('enter-manually-btn').addEventListener('click', showManualEntry);
document.getElementById('manual-back-btn').addEventListener('click', hideManualEntry);
document.getElementById('manual-create-btn').addEventListener('click', createManualCharacter);

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
