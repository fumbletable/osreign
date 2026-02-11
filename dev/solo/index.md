---
title: Solo Play Tools
layout: default
parent: Dev Tools
nav_order: 2
---

# Solo Play Tools

Dice roller and oracle for solo OSWR play. Load a character or use standalone.

<div id="solo-app">
  <!-- Character Header -->
  <div id="character-header">
    <div id="no-character">
      <span>No character loaded</span>
      <button id="load-character-btn" class="btn-small">Load Character</button>
    </div>
    <div id="active-character" style="display: none;">
      <div class="char-row">
        <div class="char-summary">
          <strong id="char-name">Character Name</strong>
          <span id="char-level">Level 1</span>
        </div>
        <div class="char-stats">
          <div class="stat-editable" id="hp-display">
            <span class="stat-label-mini">HP</span>
            <span class="stat-value" id="char-hp-current">8</span>/<span class="stat-max" id="char-hp-max">8</span>
            <div class="stat-edit-btns" id="hp-edit-btns" style="display: none;">
              <button class="edit-btn" data-action="hp-minus">−</button>
              <button class="edit-btn" data-action="hp-plus">+</button>
            </div>
          </div>
          <div class="stat-editable" id="fatigue-display">
            <span class="stat-label-mini">Fatigue</span>
            <span class="stat-value" id="char-fatigue">0</span>
            <div class="stat-edit-btns" id="fatigue-edit-btns" style="display: none;">
              <button class="edit-btn" data-action="fatigue-minus">−</button>
              <button class="edit-btn" data-action="fatigue-plus">+</button>
            </div>
          </div>
          <div class="stat-editable" id="boost-display">
            <span class="stat-label-mini">Boost</span>
            <span class="stat-value" id="char-boost-current">2</span>/<span class="stat-max" id="char-boost-max">2</span>
            <div class="stat-edit-btns" id="boost-edit-btns" style="display: none;">
              <button class="edit-btn" data-action="boost-minus">−</button>
              <button class="edit-btn" data-action="boost-plus">+</button>
            </div>
          </div>
        </div>
        <button id="unload-character-btn" class="btn-small">Unload</button>
      </div>
      <!-- Rest Buttons -->
      <div id="rest-buttons" style="display: none;">
        <button id="breather-btn" class="rest-btn" title="10 min: Heal OR remove Fatigue (spend 1 Supply)">Breather</button>
        <button id="night-rest-btn" class="rest-btn" title="8 hrs: Spend Hit Dice to heal, remove 1-2 Fatigue, restore spells">Night's Rest</button>
        <button id="safe-haven-btn" class="rest-btn rest-btn-full" title="1d4+1 days: Full reset (HP, Hit Dice, spells, Fatigue)">Safe Haven</button>
      </div>
      <!-- Collapsible Inventory -->
      <div id="inventory-toggle" style="display: none;">
        <button id="toggle-inventory-btn" class="btn-small">▼ Gear</button>
      </div>
      <div id="inventory-panel" style="display: none;">
        <div class="inventory-header">
          <span class="slot-count">Slots: <span id="slots-used">0</span>/<span id="slots-max">10</span></span>
          <span class="coins" id="coin-display">0 gp</span>
        </div>
        <div id="equipment-list"></div>
        <div id="add-item-row">
          <input type="text" id="add-item-input" placeholder="Add item..." maxlength="50">
          <button id="add-item-btn" class="btn-small">+</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Last Result (persistent feedback) -->
  <div id="last-result">
    <span id="last-result-text">-</span>
  </div>

  <!-- Tab Bar -->
  <div id="tab-bar">
    <button class="tab-btn active" data-tab="dice">Dice</button>
    <button class="tab-btn" data-tab="oracle">Oracle</button>
    <button class="tab-btn" data-tab="history">History</button>
  </div>

  <!-- Character Selection Modal -->
  <div id="character-modal" class="modal" style="display: none;">
    <div class="modal-content">
      <h3>Select Character</h3>
      <div id="character-select-list"></div>
      <button id="close-modal-btn" class="btn-secondary">Cancel</button>
    </div>
  </div>

  <!-- TAB: Dice -->
  <div id="dice-section" class="tab-panel active">

    <!-- Big D20 Button -->
    <div id="d20-zone">
      <button id="roll-d20-btn" class="d20-button">
        <span class="d20-label">d20</span>
        <span class="d20-result" id="d20-result">-</span>
      </button>
    </div>

    <!-- Result Display -->
    <div id="result-display">
      <div id="roll-breakdown">-</div>
      <div id="roll-total">-</div>
      <div id="roll-vs-target">
        <!-- DC mode (for checks/saves) -->
        <div id="dc-mode">
          <span>vs DC</span>
          <div class="dc-buttons">
            <button class="dc-btn" data-dc="8">8</button>
            <button class="dc-btn selected" data-dc="12">12</button>
            <button class="dc-btn" data-dc="16">16</button>
            <button class="dc-btn" data-dc="20">20</button>
          </div>
        </div>
        <!-- AC mode (for attacks) -->
        <div id="ac-mode" style="display: none;">
          <span>vs AC</span>
          <input type="number" id="ac-input" value="12" min="1" max="30">
        </div>
        <span id="target-result"></span>
      </div>
    </div>

    <!-- Modifiers Panel -->
    <div id="modifiers-panel">
      <!-- Ability Selector - switches between generic and character-specific -->
      <div class="mod-group" id="ability-group">
        <label>Ability</label>
        <!-- Generic selector (shown when no character loaded) -->
        <div class="mod-selector" id="ability-selector-generic">
          <button class="mod-btn" data-value="-3">-3</button>
          <button class="mod-btn" data-value="-2">-2</button>
          <button class="mod-btn" data-value="-1">-1</button>
          <button class="mod-btn selected" data-value="0">+0</button>
          <button class="mod-btn" data-value="1">+1</button>
          <button class="mod-btn" data-value="2">+2</button>
          <button class="mod-btn" data-value="3">+3</button>
        </div>
        <!-- Character-specific selector (shown when character loaded) -->
        <div class="stat-grid" id="ability-selector-character" style="display: none;"></div>
      </div>

      <!-- Proficiency Toggle -->
      <div class="mod-group" id="pb-group">
        <label>Proficiency <span id="pb-value">(+2)</span></label>
        <div class="pb-toggle">
          <button id="pb-toggle-btn" class="toggle-btn active">Add PB</button>
          <span id="pb-status">+2 PB included</span>
        </div>
      </div>

      <div class="mod-group edge-setback">
        <div class="edge-control">
          <label>Edge</label>
          <div class="counter-control">
            <button class="counter-btn" id="edge-minus">-</button>
            <span id="edge-count">0</span>
            <button class="counter-btn" id="edge-plus">+</button>
          </div>
        </div>
        <div class="setback-control">
          <label>Setback</label>
          <div class="counter-control">
            <button class="counter-btn" id="setback-minus">-</button>
            <span id="setback-count">0</span>
            <button class="counter-btn" id="setback-plus">+</button>
          </div>
        </div>
      </div>

      <div class="mod-group">
        <label>Boost Dice <span id="boost-available"></span></label>
        <div class="boost-control">
          <button id="spend-boost-btn" class="btn-small">Spend 1 Boost (+1d6)</button>
          <span id="boost-spent">0 spent</span>
        </div>
      </div>
    </div>

    <!-- Quick Roll Buttons -->
    <div id="quick-rolls">
      <h3>Quick Rolls</h3>
      <div class="quick-roll-grid">
        <button class="quick-btn d20-roll" data-type="check">Check</button>
        <button class="quick-btn d20-roll" data-type="attack">Attack</button>
        <button class="quick-btn d20-roll" data-type="save">Save</button>
        <button class="quick-btn special-roll" data-type="death">Death (2d6)</button>
        <button class="quick-btn special-roll" data-type="reaction">Reaction (2d6)</button>
        <button class="quick-btn special-roll" data-type="morale">Morale (2d6)</button>
      </div>
    </div>

    <!-- Weapons Section (only shown with character) -->
    <div id="weapons-section" style="display: none;">
      <h3>Weapons</h3>
      <div id="weapons-list"></div>
    </div>

    <!-- Damage Roller -->
    <div id="damage-section">
      <h3>Damage</h3>
      <div class="damage-grid">
        <button class="damage-btn" data-dice="1d4">1d4</button>
        <button class="damage-btn" data-dice="1d6">1d6</button>
        <button class="damage-btn" data-dice="1d8">1d8</button>
        <button class="damage-btn" data-dice="1d10">1d10</button>
        <button class="damage-btn" data-dice="1d12">1d12</button>
        <button class="damage-btn" data-dice="2d6">2d6</button>
      </div>
      <div id="damage-result"></div>
    </div>
  </div>

  <!-- TAB: Oracle + Generators -->
  <div id="oracle-tab" class="tab-panel">
    <!-- Oracle Section -->
    <div id="oracle-section">
      <h3>Oracle</h3>
    <p class="oracle-help">Ask a yes/no question, set likelihood, and consult the oracle.</p>

    <!-- Likelihood Selector -->
    <div id="likelihood-selector">
      <button class="likelihood-btn" data-likelihood="unlikely">Unlikely</button>
      <button class="likelihood-btn selected" data-likelihood="neutral">50/50</button>
      <button class="likelihood-btn" data-likelihood="likely">Likely</button>
    </div>

    <!-- Oracle Button -->
    <div id="oracle-zone">
      <button id="ask-oracle-btn" class="oracle-button">
        <span class="oracle-label">Ask</span>
        <span class="oracle-dice" id="oracle-dice">?</span>
      </button>
    </div>

    <!-- Oracle Result -->
    <div id="oracle-result">
      <div id="oracle-answer">-</div>
      <div id="oracle-breakdown">-</div>
    </div>

    <!-- Scene Check (Optional) -->
    <div id="scene-check">
      <h3>Scene Check</h3>
      <p class="scene-help">Roll at scene start to see if something unexpected happens.</p>
      <button id="scene-check-btn" class="btn-secondary">Check Scene</button>
      <div id="scene-result"></div>
    </div>
  </div>

  <!-- Generators Section -->
  <div id="generators-section">
    <h3>Generators</h3>
    <p class="gen-help">Roll on d66 tables to generate NPCs, items, and names.</p>

    <!-- Quick Formulas -->
    <div id="quick-formulas">
      <h3>Quick Rolls</h3>
      <div class="formula-grid">
        <button class="formula-btn" data-formula="quick_npc">Quick NPC</button>
        <button class="formula-btn" data-formula="full_npc">Full NPC</button>
        <button class="formula-btn" data-formula="quick_item">Quick Item</button>
        <button class="formula-btn" data-formula="magic_weapon">Magic Weapon</button>
        <button class="formula-btn" data-formula="human_name">Human Name</button>
        <button class="formula-btn" data-formula="dwarf_name">Dwarf Name</button>
        <button class="formula-btn" data-formula="elf_name">Elf Name</button>
        <button class="formula-btn" data-formula="halfling_name">Halfling Name</button>
      </div>
    </div>

    <!-- Generator Result -->
    <div id="generator-result">
      <div id="gen-output">-</div>
      <div id="gen-breakdown">-</div>
    </div>

    <!-- Individual Table Rolling -->
    <div id="table-roller">
      <h3>Individual Tables</h3>
      <div class="table-controls">
        <select id="table-category">
          <option value="">Category...</option>
        </select>
        <select id="table-select" disabled>
          <option value="">Table...</option>
        </select>
        <button id="roll-table-btn" class="btn-secondary" disabled>Roll d66</button>
      </div>
      <div id="table-result"></div>
    </div>
  </div>
  </div>

  <!-- TAB: History -->
  <div id="history-tab" class="tab-panel">
    <div id="history-section">
      <h3>Roll History <button id="clear-history-btn" class="btn-small">Clear</button></h3>
      <div id="roll-history"></div>
    </div>
  </div>
</div>

<style>
  #solo-app {
    max-width: 600px;
    margin: 0 auto;
  }

  /* Character Header */
  #character-header {
    background: #f0f4f8;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    margin-bottom: 0.5rem;
  }

  /* Last Result (persistent feedback - sticky on scroll) */
  #last-result {
    position: sticky;
    top: 0;
    z-index: 100;
    background: #1a202c;
    color: #e2e8f0;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    font-family: monospace;
    font-size: 0.9rem;
    text-align: center;
    min-height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #last-result-text {
    opacity: 0.8;
  }
  #last-result.has-result #last-result-text {
    opacity: 1;
    font-weight: bold;
  }
  #last-result.success {
    background: #276749;
  }
  #last-result.failure {
    background: #9b2c2c;
  }

  /* Tab Bar */
  #tab-bar {
    display: flex;
    gap: 0.25rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 0;
  }
  .tab-btn {
    flex: 1;
    padding: 0.75rem 1rem;
    border: none;
    background: transparent;
    cursor: pointer;
    font-weight: bold;
    font-size: 0.95rem;
    color: #718096;
    border-bottom: 3px solid transparent;
    margin-bottom: -2px;
    transition: all 0.15s;
  }
  .tab-btn:hover {
    color: #2c5282;
    background: #f7fafc;
  }
  .tab-btn.active {
    color: #2c5282;
    border-bottom-color: #2c5282;
  }

  /* Tab Panels */
  .tab-panel {
    display: none;
  }
  .tab-panel.active {
    display: block;
  }
  #no-character {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #666;
  }
  #active-character {
    width: 100%;
  }
  .char-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .char-summary {
    display: flex;
    flex-direction: column;
  }
  .char-summary strong {
    color: #2c5282;
  }
  .char-stats {
    display: flex;
    gap: 0.75rem;
    font-size: 0.85rem;
    flex-wrap: wrap;
  }

  /* Editable stat blocks */
  .stat-editable {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    background: #e2e8f0;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.15s;
    position: relative;
  }
  .stat-editable:hover {
    background: #cbd5e0;
  }
  .stat-editable.editing {
    background: #bee3f8;
  }
  .stat-label-mini {
    font-size: 0.7rem;
    color: #555;
    text-transform: uppercase;
  }
  .stat-value {
    font-weight: bold;
    color: #2c5282;
  }
  .stat-max {
    color: #718096;
  }
  #boost-display .stat-value {
    color: #c9a227;
  }
  #fatigue-display .stat-value {
    font-weight: bold;
  }
  #fatigue-display.fatigue-0 .stat-value { color: #38a169; }
  #fatigue-display.fatigue-1 .stat-value { color: #68d391; }
  #fatigue-display.fatigue-2 .stat-value { color: #ecc94b; }
  #fatigue-display.fatigue-3 .stat-value { color: #ed8936; }
  #fatigue-display.fatigue-4 .stat-value { color: #e53e3e; }
  #fatigue-display.fatigue-5 .stat-value { color: #9b2c2c; }

  /* Edit buttons */
  .stat-edit-btns {
    display: flex;
    gap: 0.2rem;
    margin-left: 0.25rem;
  }
  .edit-btn {
    width: 22px;
    height: 22px;
    border: 1px solid #999;
    background: white;
    border-radius: 3px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1rem;
    line-height: 1;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .edit-btn:hover {
    background: #f0f0f0;
  }
  .edit-btn:active {
    background: #e0e0e0;
  }

  /* Rest Buttons */
  #rest-buttons {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
    width: 100%;
  }
  .rest-btn {
    flex: 1;
    padding: 0.4rem 0.75rem;
    border: 2px solid #38a169;
    background: #f0fff4;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: bold;
    color: #276749;
    transition: all 0.15s;
  }
  .rest-btn:hover {
    background: #c6f6d5;
  }
  .rest-btn:active {
    transform: scale(0.98);
  }
  .rest-btn-full {
    flex-basis: 100%;
    background: #e6fffa;
    border-color: #319795;
    color: #234e52;
  }
  .rest-btn-full:hover {
    background: #b2f5ea;
  }

  /* Inventory Panel */
  #inventory-toggle {
    width: 100%;
    margin-top: 0.5rem;
  }
  #toggle-inventory-btn {
    width: 100%;
    text-align: left;
    background: #e2e8f0;
    border: 1px solid #cbd5e0;
  }
  #toggle-inventory-btn.expanded {
    background: #cbd5e0;
  }
  #inventory-panel {
    width: 100%;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    margin-top: 0.25rem;
    padding: 0.5rem;
    font-size: 0.85rem;
  }
  .inventory-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid #e2e8f0;
  }
  .slot-count {
    color: #555;
  }
  .slot-count span {
    font-weight: bold;
    color: #2c5282;
  }
  .coins {
    color: #c9a227;
    font-weight: bold;
  }
  #equipment-list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .equipment-item {
    display: flex;
    justify-content: space-between;
    padding: 0.25rem 0.5rem;
    background: white;
    border-radius: 3px;
    border: 1px solid #e2e8f0;
  }
  .equipment-name {
    color: #2c5282;
  }
  .equipment-slots {
    color: #718096;
    font-size: 0.8rem;
  }
  .no-equipment {
    color: #999;
    font-style: italic;
    padding: 0.25rem;
  }
  .equipment-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .equipment-name {
    flex: 1;
  }
  .remove-item-btn {
    width: 20px;
    height: 20px;
    border: none;
    background: #fed7d7;
    color: #c53030;
    border-radius: 3px;
    cursor: pointer;
    font-size: 0.9rem;
    line-height: 1;
    padding: 0;
    opacity: 0.6;
    transition: opacity 0.15s;
  }
  .remove-item-btn:hover {
    opacity: 1;
    background: #fc8181;
  }
  #add-item-row {
    display: flex;
    gap: 0.25rem;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid #e2e8f0;
  }
  #add-item-input {
    flex: 1;
    padding: 0.25rem 0.5rem;
    border: 1px solid #cbd5e0;
    border-radius: 3px;
    font-size: 0.85rem;
  }
  #add-item-input:focus {
    outline: none;
    border-color: #38a169;
  }
  #add-item-btn {
    padding: 0.25rem 0.5rem;
    background: #c6f6d5;
    border: 1px solid #38a169;
    color: #276749;
    font-weight: bold;
  }
  #add-item-btn:hover {
    background: #9ae6b4;
  }

  /* Modal */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .modal-content {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    max-width: 400px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
  }
  .modal-content h3 {
    margin-top: 0;
  }
  .char-select-card {
    border: 2px solid #ccc;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    margin-bottom: 0.5rem;
    cursor: pointer;
    transition: all 0.15s;
  }
  .char-select-card:hover {
    border-color: #2c5282;
    background: #f0f4f8;
  }
  .char-select-card h4 {
    margin: 0 0 0.25rem 0;
    color: #2c5282;
  }
  .char-select-card .details {
    font-size: 0.85rem;
    color: #666;
  }

  /* D20 Zone - Icosahedron Shape */
  #d20-zone {
    display: flex;
    justify-content: center;
    margin: 1.5rem 0;
  }
  .d20-button {
    width: 130px;
    height: 150px;
    /* D20 icosahedron silhouette using clip-path */
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    background: linear-gradient(135deg, #2c5282 0%, #1e3a5f 100%);
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    position: relative;
  }
  .d20-button::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    right: 3px;
    bottom: 3px;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    background: linear-gradient(135deg, #3d6a9f 0%, #2c5282 100%);
    z-index: 0;
  }
  .d20-button > * {
    position: relative;
    z-index: 1;
  }
  .d20-button:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0,0,0,0.4);
  }
  .d20-button:active {
    transform: scale(0.98);
  }
  .d20-label {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-bottom: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .d20-result {
    font-size: 2.5rem;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }
  .d20-button.rolling {
    animation: shake 0.3s ease-in-out;
  }
  @keyframes shake {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-8deg) scale(1.02); }
    75% { transform: rotate(8deg) scale(1.02); }
  }
  .d20-button.crit {
    background: linear-gradient(135deg, #c9a227 0%, #9a7b1a 100%);
  }
  .d20-button.crit::before {
    background: linear-gradient(135deg, #e0b82e 0%, #c9a227 100%);
  }
  .d20-button.fumble {
    background: linear-gradient(135deg, #c44 0%, #922 100%);
  }
  .d20-button.fumble::before {
    background: linear-gradient(135deg, #d66 0%, #c44 100%);
  }

  /* Result Display */
  #result-display {
    text-align: center;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: #fafafa;
    border-radius: 6px;
  }
  #roll-breakdown {
    font-size: 1rem;
    color: #666;
    margin-bottom: 0.5rem;
  }
  #roll-total {
    font-size: 2rem;
    font-weight: bold;
    color: #2c5282;
  }
  #roll-vs-dc {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 0.75rem;
    font-size: 0.9rem;
  }
  .dc-buttons {
    display: flex;
    gap: 0.25rem;
  }
  .dc-btn {
    width: 36px;
    height: 32px;
    border: 2px solid #ccc;
    background: white;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.1s;
  }
  .dc-btn:hover {
    border-color: #2c5282;
  }
  .dc-btn.selected {
    background: #2c5282;
    color: white;
    border-color: #2c5282;
  }
  #roll-vs-target {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 0.75rem;
    font-size: 0.9rem;
  }
  #dc-mode, #ac-mode {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  #ac-input {
    width: 50px;
    padding: 0.25rem;
    border: 2px solid #c44;
    border-radius: 4px;
    font-weight: bold;
    font-size: 1rem;
    text-align: center;
  }
  #target-result {
    font-weight: bold;
    min-width: 60px;
  }
  #target-result.success {
    color: #2a7;
  }
  #target-result.failure {
    color: #c44;
  }

  /* Modifiers Panel */
  #modifiers-panel {
    background: #f8f8f8;
    padding: 1rem;
    border-radius: 6px;
    margin-bottom: 1.5rem;
  }
  .mod-group {
    margin-bottom: 1rem;
  }
  .mod-group:last-child {
    margin-bottom: 0;
  }
  .mod-group > label {
    display: block;
    font-weight: bold;
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
    color: #555;
  }
  .mod-selector {
    display: flex;
    gap: 0.25rem;
    flex-wrap: wrap;
  }
  .mod-btn {
    min-width: 40px;
    height: 36px;
    border: 2px solid #ccc;
    background: white;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.1s;
  }
  .mod-btn:hover {
    border-color: #2c5282;
  }
  .mod-btn.selected {
    background: #2c5282;
    color: white;
    border-color: #2c5282;
  }

  /* Character Stat Grid (like character sheet) */
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.4rem;
    text-align: center;
  }
  .stat-box {
    border: 2px solid #666;
    padding: 0.4rem 0.2rem;
    background: #f8f8f8;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.15s;
  }
  .stat-box:hover {
    border-color: #2c5282;
    background: #e8f0fe;
  }
  .stat-box.selected {
    background: #2c5282;
    border-color: #2c5282;
  }
  .stat-box.selected .stat-label,
  .stat-box.selected .stat-mod {
    color: white;
  }
  /* Gold border for proficient saves */
  .stat-box.save-proficient {
    border-color: #c9a227;
    border-width: 3px;
    background: #fefdf5;
  }
  .stat-box.save-proficient:hover {
    background: #fef8e0;
  }
  .stat-box.save-proficient.selected {
    background: #c9a227;
    border-color: #c9a227;
  }
  .stat-label {
    font-size: 0.65rem;
    font-weight: bold;
    color: #555;
    display: block;
  }
  .stat-mod {
    font-size: 1.1rem;
    font-weight: bold;
    color: #2c5282;
  }
  .stat-box.save-proficient .stat-mod {
    color: #997a1a;
  }

  /* PB Toggle */
  .pb-toggle {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .toggle-btn {
    padding: 0.4rem 1rem;
    border: 2px solid #2c5282;
    background: white;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    color: #2c5282;
    transition: all 0.1s;
  }
  .toggle-btn:hover {
    background: #f0f4f8;
  }
  .toggle-btn.active {
    background: #2c5282;
    color: white;
  }
  #pb-status {
    font-size: 0.85rem;
    color: #666;
  }
  #pb-value {
    font-weight: normal;
    color: #2c5282;
  }

  /* Edge/Setback */
  .edge-setback {
    display: flex;
    gap: 2rem;
  }
  .edge-control, .setback-control {
    flex: 1;
  }
  .counter-control {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .counter-btn {
    width: 36px;
    height: 36px;
    border: 2px solid #ccc;
    background: white;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.25rem;
    font-weight: bold;
    transition: all 0.1s;
  }
  .counter-btn:hover {
    border-color: #2c5282;
    background: #f0f4f8;
  }
  .counter-control > span {
    font-size: 1.5rem;
    font-weight: bold;
    min-width: 2rem;
    text-align: center;
  }
  .edge-control .counter-control > span {
    color: #2a7;
  }
  .setback-control .counter-control > span {
    color: #c44;
  }

  /* Boost */
  .boost-control {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  #boost-spent {
    color: #c9a227;
    font-weight: bold;
  }
  #boost-available {
    font-weight: normal;
    color: #c9a227;
  }

  /* Quick Rolls */
  #quick-rolls {
    margin-bottom: 1.5rem;
  }
  #quick-rolls h3 {
    font-size: 1rem;
    margin-bottom: 0.75rem;
    color: #555;
  }
  .quick-roll-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
  .quick-btn {
    padding: 0.75rem;
    border: 2px solid #ccc;
    background: white;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.1s;
  }
  .quick-btn:hover {
    border-color: #2c5282;
    background: #f0f4f8;
  }
  .quick-btn:active {
    transform: scale(0.98);
  }
  .quick-btn.d20-roll {
    background: #e8f0fe;
    border-color: #2c5282;
    color: #2c5282;
  }
  .quick-btn.special-roll {
    background: #fef8e8;
    border-color: #c9a227;
    color: #9a7b1a;
  }

  /* Weapons Section */
  #weapons-section {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: #f8f8f8;
    border-radius: 6px;
  }
  #weapons-section h3 {
    font-size: 1rem;
    margin: 0 0 0.75rem 0;
    color: #555;
  }
  .weapon-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 0.8rem;
    border: 2px solid #2c5282;
    background: #e8f0fe;
    border-radius: 6px;
    cursor: pointer;
    margin-bottom: 0.5rem;
    transition: all 0.1s;
  }
  .weapon-btn:hover {
    background: #d8e4f8;
  }
  .weapon-btn.selected {
    background: #2c5282;
    border-color: #1e3a5f;
  }
  .weapon-btn.selected .weapon-name,
  .weapon-btn.selected .weapon-stats {
    color: white;
  }
  .weapon-btn:last-child {
    margin-bottom: 0;
  }
  .weapon-name {
    font-weight: bold;
    color: #2c5282;
  }
  .weapon-stats {
    font-size: 0.85rem;
    color: #555;
  }

  /* Damage Section */
  #damage-section {
    margin-bottom: 1.5rem;
  }
  #damage-section h3 {
    font-size: 1rem;
    margin-bottom: 0.75rem;
    color: #555;
  }
  .damage-grid {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .damage-btn {
    padding: 0.5rem 1rem;
    border: 2px solid #c44;
    background: #fee;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    color: #922;
    transition: all 0.1s;
  }
  .damage-btn:hover {
    background: #fcc;
  }
  #damage-result {
    margin-top: 0.75rem;
    font-size: 1.25rem;
    font-weight: bold;
    color: #c44;
    min-height: 1.5rem;
  }

  /* Oracle Section */
  #oracle-section {
    margin-bottom: 2rem;
  }
  #oracle-section h3 {
    color: #2c5282;
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
  }
  .oracle-help, .scene-help {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  /* Likelihood Selector */
  #likelihood-selector {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    margin-bottom: 1.5rem;
  }
  .likelihood-btn {
    padding: 0.6rem 1.2rem;
    border: 2px solid #2c5282;
    background: white;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    color: #2c5282;
    transition: all 0.15s;
  }
  .likelihood-btn:hover {
    background: #f0f4f8;
  }
  .likelihood-btn.selected {
    background: #2c5282;
    color: white;
  }

  /* Oracle Button - D6 Cube Style (matches d20) */
  #oracle-zone {
    display: flex;
    justify-content: center;
    margin: 1.5rem 0;
  }
  .oracle-button {
    width: 120px;
    height: 120px;
    /* Rotated square suggests a d6 cube face */
    transform: rotate(45deg);
    background: linear-gradient(135deg, #2c5282 0%, #1e3a5f 100%);
    border: none;
    border-radius: 12px;
    color: white;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    position: relative;
  }
  .oracle-button::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    right: 3px;
    bottom: 3px;
    background: linear-gradient(135deg, #3d6a9f 0%, #2c5282 100%);
    border-radius: 10px;
    z-index: 0;
  }
  .oracle-button > * {
    position: relative;
    z-index: 1;
    transform: rotate(-45deg);
  }
  .oracle-button:hover {
    transform: rotate(45deg) scale(1.05);
    box-shadow: 0 6px 16px rgba(0,0,0,0.4);
  }
  .oracle-button:active {
    transform: rotate(45deg) scale(0.98);
  }
  .oracle-label {
    font-size: 0.9rem;
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.25rem;
  }
  .oracle-dice {
    font-size: 2.5rem;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }
  .oracle-button.thinking {
    animation: oracle-shake 0.3s ease-in-out;
  }
  @keyframes oracle-shake {
    0%, 100% { transform: rotate(45deg); }
    25% { transform: rotate(37deg) scale(1.02); }
    75% { transform: rotate(53deg) scale(1.02); }
  }

  /* Oracle Result */
  #oracle-result {
    text-align: center;
    padding: 1rem;
    background: #f0f4f8;
    border-radius: 8px;
    margin-bottom: 1.5rem;
  }
  #oracle-answer {
    font-size: 1.8rem;
    font-weight: bold;
    color: #2c5282;
    margin-bottom: 0.5rem;
  }
  #oracle-answer.strong-yes {
    color: #2f855a;
  }
  #oracle-answer.yes {
    color: #38a169;
  }
  #oracle-answer.no {
    color: #c53030;
  }
  #oracle-answer.strong-no {
    color: #9b2c2c;
  }
  #oracle-breakdown {
    font-size: 0.9rem;
    color: #666;
  }

  /* Scene Check */
  #scene-check {
    background: #f8f8f8;
    padding: 1rem;
    border-radius: 6px;
    text-align: center;
  }
  #scene-check h3 {
    font-size: 1rem;
    margin: 0 0 0.5rem 0;
    color: #555;
  }
  #scene-check-btn {
    margin-top: 0.5rem;
  }
  #scene-result {
    margin-top: 0.75rem;
    font-weight: bold;
    min-height: 1.5rem;
  }
  #scene-result.interrupt {
    color: #c53030;
  }
  #scene-result.normal {
    color: #555;
  }
  #scene-result.opportunity {
    color: #2f855a;
  }

  /* Generators Section */
  #generators-section {
    border-top: 2px solid #38a169;
    padding-top: 1.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  #generators-section h3 {
    color: #38a169;
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
  }
  .gen-help {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  /* Quick Formulas */
  #quick-formulas {
    margin-bottom: 1.5rem;
  }
  #quick-formulas h3 {
    font-size: 1rem;
    margin-bottom: 0.75rem;
    color: #555;
  }
  .formula-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
  .formula-btn {
    padding: 0.75rem 0.5rem;
    border: 2px solid #38a169;
    background: #f0fff4;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    color: #276749;
    transition: all 0.15s;
    font-size: 0.9rem;
  }
  .formula-btn:hover {
    background: #c6f6d5;
  }
  .formula-btn:active {
    transform: scale(0.98);
  }

  /* Generator Result */
  #generator-result {
    text-align: center;
    padding: 1rem;
    background: #f0fff4;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    min-height: 80px;
  }
  #gen-output {
    font-size: 1.4rem;
    font-weight: bold;
    color: #276749;
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }
  #gen-breakdown {
    font-size: 0.85rem;
    color: #666;
  }

  /* Table Roller */
  #table-roller {
    background: #f8f8f8;
    padding: 1rem;
    border-radius: 6px;
  }
  #table-roller h3 {
    font-size: 1rem;
    margin: 0 0 0.75rem 0;
    color: #555;
  }
  .table-controls {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .table-controls select {
    flex: 1;
    min-width: 100px;
    padding: 0.5rem;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 0.9rem;
    background: white;
  }
  .table-controls select:focus {
    border-color: #38a169;
    outline: none;
  }
  #roll-table-btn {
    padding: 0.5rem 1rem;
    white-space: nowrap;
  }
  #roll-table-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  #table-result {
    margin-top: 0.75rem;
    font-size: 1.1rem;
    font-weight: bold;
    color: #276749;
    min-height: 1.5rem;
  }

  /* Mobile responsive for generators */
  @media (max-width: 480px) {
    .formula-grid {
      grid-template-columns: 1fr;
    }
    .table-controls {
      flex-direction: column;
    }
    .table-controls select {
      width: 100%;
    }
  }

  /* History Section (now in its own tab) */
  #history-section {
    padding-top: 0;
  }
  #history-section h3 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: #555;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  #roll-history {
    max-height: 60vh;
    overflow-y: auto;
  }
  .history-entry {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    border-bottom: 1px solid #eee;
    font-size: 0.9rem;
  }
  .history-entry:last-child {
    border-bottom: none;
  }
  .history-type {
    font-weight: bold;
    color: #2c5282;
    min-width: 80px;
  }
  .history-detail {
    color: #666;
    flex: 1;
    text-align: center;
  }
  .history-result {
    font-weight: bold;
    min-width: 40px;
    text-align: right;
  }
  .history-entry.success .history-result {
    color: #2a7;
  }
  .history-entry.failure .history-result {
    color: #c44;
  }
  .no-history {
    color: #999;
    font-style: italic;
    padding: 0.5rem;
  }

  /* Buttons */
  .btn-small {
    font-size: 0.8rem;
    padding: 0.25rem 0.75rem;
    cursor: pointer;
    background: #e2e8f0;
    border: 1px solid #999;
    border-radius: 4px;
  }
  .btn-small:hover {
    background: #cbd5e0;
  }
  .btn-secondary {
    font-size: 0.95rem;
    padding: 0.4rem 1rem;
    cursor: pointer;
    background: #e2e8f0;
    border: 1px solid #999;
    border-radius: 4px;
  }
  .btn-secondary:hover {
    background: #cbd5e0;
  }

  /* Mobile responsive */
  @media (max-width: 480px) {
    .d20-button {
      width: 110px;
      height: 127px;
    }
    .d20-result {
      font-size: 2rem;
    }
    .stat-grid {
      gap: 0.25rem;
    }
    .stat-box {
      padding: 0.3rem 0.1rem;
    }
    .stat-label {
      font-size: 0.55rem;
    }
    .stat-mod {
      font-size: 0.95rem;
    }
    .quick-roll-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<script>
// ============ STATE ============
let currentDC = 12;
let currentAC = 12;
let rollMode = 'check'; // 'check' or 'attack'
let abilityMod = 0;
let selectedAbility = null; // Track which ability is selected (for character mode)
let selectedWeapon = null; // Track selected weapon
let proficiencyBonus = 2;
let includePB = true;
let edgeCount = 0;
let setbackCount = 0;
let boostSpent = 0;
let lastD20 = null;
let rollHistory = [];
let loadedCharacter = null;

const STORAGE_KEY = 'oswr-characters';
const HISTORY_KEY = 'oswr-solo-history';
const ACTIVE_CHAR_KEY = 'oswr-solo-active-character';

const STATS = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];

// Fatigue levels (0-5) - per OSWR rules
// 0 = no fatigue, 1-4 = −X penalty to all checks/saves, 5 = incapacitated
const FATIGUE_DISPLAY = ['0', '−1', '−2', '−3', '−4', 'Inc.'];

// Class save proficiencies (matches character generator)
const CLASS_SAVES = {
  'Fighter': ['STR', 'CON'],
  'Expert': ['DEX', 'INT'],
  'Cleric (Hallowed)': ['WIS', 'CHA'],
  'Cleric (Druidic)': ['WIS', 'CHA'],
  'Magic-User': ['INT', 'WIS']
};

// Weapon data (subset - matches character generator)
const WEAPONS = {
  'Dagger': { damage: '1d4', stat: 'DEX', type: 'Light' },
  'Shortsword': { damage: '1d6', stat: 'DEX', type: 'Light' },
  'Longsword': { damage: '1d8', stat: 'STR', type: 'Medium' },
  'Battleaxe': { damage: '1d8', stat: 'STR', type: 'Medium' },
  'Greatsword': { damage: '2d6', stat: 'STR', type: 'Heavy' },
  'Greataxe': { damage: '1d12', stat: 'STR', type: 'Heavy' },
  'Mace': { damage: '1d6', stat: 'STR', type: 'Medium' },
  'Spear': { damage: '1d6', stat: 'STR', type: 'Medium' },
  'Staff': { damage: '1d6', stat: 'STR', type: 'Medium' },
  'Shortbow': { damage: '1d6', stat: 'DEX', type: 'Medium' },
  'Longbow': { damage: '1d8', stat: 'DEX', type: 'Medium' },
  'Light Crossbow': { damage: '1d8', stat: 'DEX', type: 'Medium' },
  'Hand Crossbow': { damage: '1d6', stat: 'DEX', type: 'Light' },
  'Sling': { damage: '1d4', stat: 'DEX', type: 'Light' },
  'Rapier': { damage: '1d8', stat: 'DEX', type: 'Medium' }
};

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
  loadHistory();
  renderHistory();
  setupEventListeners();
  setupInventory();
  updatePBDisplay();
  restoreActiveCharacter();
});

// Restore previously loaded character on page return
function restoreActiveCharacter() {
  const savedCharId = localStorage.getItem(ACTIVE_CHAR_KEY);
  if (savedCharId) {
    selectCharacter(savedCharId);
  }
}

function setupEventListeners() {
  // D20 button
  document.getElementById('roll-d20-btn').addEventListener('click', rollD20);

  // DC buttons
  document.querySelectorAll('.dc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dc-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      currentDC = parseInt(btn.dataset.dc);
      updateTargetResult();
    });
  });

  // AC input
  document.getElementById('ac-input')?.addEventListener('change', (e) => {
    currentAC = parseInt(e.target.value) || 12;
    updateTargetResult();
  });

  // Generic ability selector
  document.querySelectorAll('#ability-selector-generic .mod-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#ability-selector-generic .mod-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      abilityMod = parseInt(btn.dataset.value);
      selectedAbility = null;
    });
  });

  // PB toggle
  document.getElementById('pb-toggle-btn').addEventListener('click', () => {
    includePB = !includePB;
    updatePBDisplay();
  });

  // Edge controls
  document.getElementById('edge-plus').addEventListener('click', () => {
    edgeCount++;
    document.getElementById('edge-count').textContent = edgeCount;
  });
  document.getElementById('edge-minus').addEventListener('click', () => {
    if (edgeCount > 0) edgeCount--;
    document.getElementById('edge-count').textContent = edgeCount;
  });

  // Setback controls
  document.getElementById('setback-plus').addEventListener('click', () => {
    setbackCount++;
    document.getElementById('setback-count').textContent = setbackCount;
  });
  document.getElementById('setback-minus').addEventListener('click', () => {
    if (setbackCount > 0) setbackCount--;
    document.getElementById('setback-count').textContent = setbackCount;
  });

  // Boost button - spends from character's available boost dice
  document.getElementById('spend-boost-btn').addEventListener('click', () => {
    if (loadedCharacter) {
      // Use character's current boost
      const available = loadedCharacter.boostDiceCurrent ?? loadedCharacter.boostDice ?? 0;
      if (available > 0 && boostSpent < available) {
        boostSpent++;
        document.getElementById('boost-spent').textContent = boostSpent + ' spent this roll';
      }
    } else {
      // No character - allow unlimited spending for testing
      boostSpent++;
      document.getElementById('boost-spent').textContent = boostSpent + ' spent';
    }
  });

  // Quick roll buttons
  document.querySelectorAll('.quick-btn.d20-roll').forEach(btn => {
    btn.addEventListener('click', () => quickRollD20(btn.dataset.type));
  });
  document.querySelectorAll('.quick-btn.special-roll').forEach(btn => {
    btn.addEventListener('click', () => specialRoll(btn.dataset.type));
  });

  // Damage buttons
  document.querySelectorAll('.damage-btn').forEach(btn => {
    btn.addEventListener('click', () => rollDamage(btn.dataset.dice));
  });

  // Character loading
  document.getElementById('load-character-btn').addEventListener('click', showCharacterModal);
  document.getElementById('unload-character-btn')?.addEventListener('click', unloadCharacter);
  document.getElementById('close-modal-btn').addEventListener('click', hideCharacterModal);

  // History
  document.getElementById('clear-history-btn').addEventListener('click', clearHistory);

  // Editable stats
  setupEditableStats();
}

// ============ EDITABLE STATS ============
function setupEditableStats() {
  // HP display - toggle edit mode on click
  document.getElementById('hp-display').addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) return; // Let button handle itself
    if (!loadedCharacter) return;
    toggleStatEdit('hp');
  });

  // Fatigue display - toggle edit mode on click
  document.getElementById('fatigue-display').addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) return;
    if (!loadedCharacter) return;
    toggleStatEdit('fatigue');
  });

  // Boost display - toggle edit mode on click
  document.getElementById('boost-display').addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) return;
    if (!loadedCharacter) return;
    toggleStatEdit('boost');
  });

  // Edit button handlers
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = btn.dataset.action;
      handleStatEdit(action);
    });
  });

  // Close edit mode when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.stat-editable')) {
      closeAllStatEdits();
    }
  });

  // Rest buttons
  document.getElementById('breather-btn').addEventListener('click', takeBreather);
  document.getElementById('night-rest-btn').addEventListener('click', takeNightRest);
  document.getElementById('safe-haven-btn').addEventListener('click', takeSafeHaven);
}

function toggleStatEdit(stat) {
  const display = document.getElementById(`${stat}-display`);
  const btns = document.getElementById(`${stat}-edit-btns`);
  const isEditing = display.classList.contains('editing');

  // Close other edits first
  closeAllStatEdits();

  if (!isEditing) {
    display.classList.add('editing');
    btns.style.display = 'flex';
  }
}

function closeAllStatEdits() {
  ['hp', 'fatigue', 'boost'].forEach(stat => {
    const display = document.getElementById(`${stat}-display`);
    const btns = document.getElementById(`${stat}-edit-btns`);
    if (display) display.classList.remove('editing');
    if (btns) btns.style.display = 'none';
  });
}

function handleStatEdit(action) {
  if (!loadedCharacter) return;

  switch (action) {
    case 'hp-minus':
      if (loadedCharacter.currentHp > 0) {
        loadedCharacter.currentHp--;
        updateHPDisplay();
        saveCharacterChanges();
      }
      break;
    case 'hp-plus':
      if (loadedCharacter.currentHp < loadedCharacter.maxHp) {
        loadedCharacter.currentHp++;
        updateHPDisplay();
        saveCharacterChanges();
      }
      break;
    case 'boost-minus':
      const currentBoost = loadedCharacter.boostDiceCurrent ?? loadedCharacter.boostDice;
      if (currentBoost > 0) {
        loadedCharacter.boostDiceCurrent = currentBoost - 1;
        updateBoostDisplay();
        saveCharacterChanges();
      }
      break;
    case 'boost-plus':
      const current = loadedCharacter.boostDiceCurrent ?? loadedCharacter.boostDice;
      const max = loadedCharacter.boostDice || 2;
      if (current < max) {
        loadedCharacter.boostDiceCurrent = current + 1;
        updateBoostDisplay();
        saveCharacterChanges();
      }
      break;
    case 'fatigue-minus':
      if ((loadedCharacter.fatigue || 0) > 0) {
        loadedCharacter.fatigue--;
        updateFatigueDisplay();
        saveCharacterChanges();
      }
      break;
    case 'fatigue-plus':
      if ((loadedCharacter.fatigue || 0) < 5) {
        loadedCharacter.fatigue = (loadedCharacter.fatigue || 0) + 1;
        updateFatigueDisplay();
        saveCharacterChanges();
      }
      break;
  }
}

// cycleFatigue kept for backwards compat but no longer used
function cycleFatigue() {
  if (!loadedCharacter) return;

  const currentFatigue = loadedCharacter.fatigue || 0;
  // Cycle 0 → 1 → 2 → 3 → 4 → 5 → 0
  loadedCharacter.fatigue = (currentFatigue + 1) % 6;
  updateFatigueDisplay();
  saveCharacterChanges();
}

function updateHPDisplay() {
  if (!loadedCharacter) return;
  document.getElementById('char-hp-current').textContent = loadedCharacter.currentHp;
  document.getElementById('char-hp-max').textContent = loadedCharacter.maxHp;
}

function updateFatigueDisplay() {
  if (!loadedCharacter) return;
  const fatigue = loadedCharacter.fatigue || 0;
  const display = document.getElementById('fatigue-display');
  document.getElementById('char-fatigue').textContent = FATIGUE_DISPLAY[fatigue];

  // Update fatigue class for coloring
  display.className = 'stat-editable fatigue-' + fatigue;
}

function updateBoostDisplay() {
  if (!loadedCharacter) return;
  const current = loadedCharacter.boostDiceCurrent ?? loadedCharacter.boostDice ?? 0;
  const max = loadedCharacter.boostDice || 2;
  document.getElementById('char-boost-current').textContent = current;
  document.getElementById('char-boost-max').textContent = max;
  document.getElementById('boost-available').textContent = `(${current} available)`;
}

function saveCharacterChanges() {
  if (!loadedCharacter) return;

  try {
    const characters = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const idx = characters.findIndex(c => c.id === loadedCharacter.id);
    if (idx !== -1) {
      characters[idx] = loadedCharacter;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
    }
  } catch (e) {
    console.error('Failed to save character:', e);
  }
}

// ============ INVENTORY ============
let inventoryExpanded = false;

function setupInventory() {
  document.getElementById('toggle-inventory-btn').addEventListener('click', toggleInventory);

  // Add item button
  document.getElementById('add-item-btn').addEventListener('click', () => {
    const input = document.getElementById('add-item-input');
    if (input.value.trim()) {
      addInventoryItem(input.value);
      input.value = '';
    }
  });

  // Add item on Enter key
  document.getElementById('add-item-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const input = e.target;
      if (input.value.trim()) {
        addInventoryItem(input.value);
        input.value = '';
      }
    }
  });
}

function toggleInventory() {
  inventoryExpanded = !inventoryExpanded;
  const panel = document.getElementById('inventory-panel');
  const btn = document.getElementById('toggle-inventory-btn');

  if (inventoryExpanded) {
    panel.style.display = 'block';
    btn.textContent = '▲ Gear';
    btn.classList.add('expanded');
  } else {
    panel.style.display = 'none';
    btn.textContent = '▼ Gear';
    btn.classList.remove('expanded');
  }
}

function updateInventoryDisplay() {
  if (!loadedCharacter) return;

  // Show the toggle button
  document.getElementById('inventory-toggle').style.display = 'block';

  // Equipment list
  const equipment = loadedCharacter.equipment || [];
  const listEl = document.getElementById('equipment-list');

  if (equipment.length === 0) {
    listEl.innerHTML = '<div class="no-equipment">No equipment</div>';
  } else {
    // Equipment is array of strings (item names), each takes 1 slot
    listEl.innerHTML = equipment.map((item, idx) => `
      <div class="equipment-item">
        <span class="equipment-name">${item}</span>
        <span class="equipment-slots">1</span>
        <button class="remove-item-btn" data-idx="${idx}" title="Remove">×</button>
      </div>
    `).join('');

    // Add click handlers to remove buttons
    listEl.querySelectorAll('.remove-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx);
        removeInventoryItem(idx);
      });
    });
  }

  // Slot count - each item is 1 slot
  const usedSlots = equipment.length;
  const maxSlots = loadedCharacter.maxSlots || 10; // Default to 10 if not set
  document.getElementById('slots-used').textContent = usedSlots;
  document.getElementById('slots-max').textContent = maxSlots;

  // Coins
  const coins = loadedCharacter.coins || {};
  const coinParts = [];
  if (coins.gp) coinParts.push(`${coins.gp} gp`);
  if (coins.sp) coinParts.push(`${coins.sp} sp`);
  if (coins.cp) coinParts.push(`${coins.cp} cp`);
  document.getElementById('coin-display').textContent = coinParts.length > 0 ? coinParts.join(', ') : '0 gp';
}

function addInventoryItem(itemName) {
  if (!loadedCharacter || !itemName.trim()) return;

  loadedCharacter.equipment = loadedCharacter.equipment || [];
  loadedCharacter.equipment.push(itemName.trim());
  updateInventoryDisplay();
  saveCharacterChanges();
}

function removeInventoryItem(idx) {
  if (!loadedCharacter || !loadedCharacter.equipment) return;

  loadedCharacter.equipment.splice(idx, 1);
  updateInventoryDisplay();
  saveCharacterChanges();
}

function hideInventory() {
  document.getElementById('inventory-toggle').style.display = 'none';
  document.getElementById('inventory-panel').style.display = 'none';
  inventoryExpanded = false;
}

function showRestButtons() {
  document.getElementById('rest-buttons').style.display = 'flex';
}

function hideRestButtons() {
  document.getElementById('rest-buttons').style.display = 'none';
}

// ============ RESTS ============

// Breather (10 min): Spend 1 Supply, choose heal OR remove fatigue
function takeBreather() {
  if (!loadedCharacter) return;

  const fatigue = loadedCharacter.fatigue || 0;
  const conMod = loadedCharacter.finalAbilities?.CON || 0;
  const currentHp = loadedCharacter.currentHp;
  const maxHp = loadedCharacter.maxHp;

  // Ask what they want to do
  const choice = prompt(
    "Breather (10 min, costs 1 Supply)\n\nChoose one:\n" +
    "1 = Heal (1d4 + CON HP)\n" +
    "2 = Shake it off (CON save DC 12 to remove 1 Fatigue)\n\n" +
    `Current HP: ${currentHp}/${maxHp} | Fatigue: ${fatigue}\n\n` +
    "Enter 1 or 2:"
  );

  if (choice === '1') {
    // Heal option
    const healRoll = roll(4);
    const healAmount = Math.max(1, healRoll + conMod);
    const newHp = Math.min(maxHp, currentHp + healAmount);
    const actualHeal = newHp - currentHp;

    loadedCharacter.currentHp = newHp;
    updateHPDisplay();
    saveCharacterChanges();

    addToHistory('Breather (Heal)', `1d4+${conMod} = ${healRoll}+${conMod}`, `+${actualHeal} HP`, true);
    alert(`Breather: Healed ${actualHeal} HP (${healRoll}+${conMod})\nHP: ${currentHp} → ${newHp}`);

  } else if (choice === '2') {
    // Shake it off option
    if (fatigue === 0) {
      alert('No fatigue to remove!');
      return;
    }

    const className = loadedCharacter.classes?.[0]?.name || loadedCharacter.className;
    const saveProficiencies = CLASS_SAVES[className] || [];
    const isProficient = saveProficiencies.includes('CON');
    const d20 = roll(20);
    const saveTotal = d20 + conMod + (isProficient ? proficiencyBonus : 0);
    const success = saveTotal >= 12;

    if (success) {
      loadedCharacter.fatigue = Math.max(0, fatigue - 1);
      updateFatigueDisplay();
      saveCharacterChanges();
      addToHistory('Breather (Fatigue)', `CON save: ${d20}+${conMod}${isProficient ? '+'+proficiencyBonus : ''} = ${saveTotal} vs DC 12`, 'Fatigue −1', true);
      alert(`Breather: CON save ${saveTotal} vs DC 12 - Success!\nFatigue: ${fatigue} → ${loadedCharacter.fatigue}`);
    } else {
      addToHistory('Breather (Fatigue)', `CON save: ${d20}+${conMod}${isProficient ? '+'+proficiencyBonus : ''} = ${saveTotal} vs DC 12`, 'Failed', false);
      alert(`Breather: CON save ${saveTotal} vs DC 12 - Failed.\nFatigue remains at ${fatigue}`);
    }
  }
  // If cancelled or invalid, do nothing
}

// Night's Rest (8 hrs): Spend Hit Dice to heal, remove fatigue, restore spells
function takeNightRest() {
  if (!loadedCharacter) return;
  const fatigue = loadedCharacter.fatigue || 0;
  const maxBoost = loadedCharacter.boostDice || 2;

  // Ask about shelter
  const hasShelter = confirm("Night's Rest (8 hours)\n\nDo you have food and shelter?\n\n• OK = Yes (remove 2 Fatigue)\n• Cancel = No, roughing it (remove 1 Fatigue)");

  const fatigueRemoved = hasShelter ? 2 : 1;
  const newFatigue = Math.max(0, fatigue - fatigueRemoved);
  loadedCharacter.fatigue = newFatigue;

  // Restore boost dice
  loadedCharacter.boostDiceCurrent = maxBoost;

  updateFatigueDisplay();
  updateBoostDisplay();
  saveCharacterChanges();

  const shelterText = hasShelter ? 'with shelter' : 'roughing it';
  addToHistory("Night's Rest", shelterText, `Fatigue ${fatigue}→${newFatigue}, Boost restored`, null);
  alert(`Night's Rest complete (${shelterText}):\n• Fatigue: ${fatigue} → ${newFatigue}\n• Boost dice restored to ${maxBoost}\n• Spell slots restored (track manually)`);
}

// Safe Haven (1d4+1 days): Full reset
function takeSafeHaven() {
  if (!loadedCharacter) return;

  const days = roll(4) + 1;

  // Full reset
  loadedCharacter.currentHp = loadedCharacter.maxHp;
  loadedCharacter.fatigue = 0;
  loadedCharacter.boostDiceCurrent = loadedCharacter.boostDice || 2;

  updateHPDisplay();
  updateFatigueDisplay();
  updateBoostDisplay();
  saveCharacterChanges();

  addToHistory('Safe Haven', `${days} days`, 'Full reset', true);
  alert(`Safe Haven: ${days} days\n\n✓ HP fully restored\n✓ All Fatigue removed\n✓ Boost dice restored\n✓ Hit Dice restored (track manually)\n✓ Spell slots restored (track manually)`);
}

function updatePBDisplay() {
  const btn = document.getElementById('pb-toggle-btn');
  const status = document.getElementById('pb-status');
  const value = document.getElementById('pb-value');

  btn.classList.toggle('active', includePB);
  btn.textContent = includePB ? 'PB On' : 'PB Off';

  if (includePB) {
    status.textContent = `+${proficiencyBonus} PB included`;
    value.textContent = `(+${proficiencyBonus})`;
  } else {
    status.textContent = 'No PB';
    value.textContent = '(off)';
  }
}

// ============ DICE ROLLING ============
function roll(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function rollMultiple(count, sides) {
  const rolls = [];
  for (let i = 0; i < count; i++) {
    rolls.push(roll(sides));
  }
  return rolls;
}

function rollD20() {
  const btn = document.getElementById('roll-d20-btn');
  btn.classList.add('rolling');
  btn.classList.remove('crit', 'fumble');

  setTimeout(() => {
    btn.classList.remove('rolling');

    // Roll d20
    const d20 = roll(20);
    lastD20 = d20;

    // Calculate Edge/Setback (they cancel each other)
    const netEdge = Math.max(0, edgeCount - setbackCount);
    const netSetback = Math.max(0, setbackCount - edgeCount);

    // Roll Edge dice (keep highest)
    let edgeBonus = 0;
    let edgeRolls = [];
    if (netEdge > 0) {
      edgeRolls = rollMultiple(netEdge, 6);
      edgeBonus = Math.max(...edgeRolls);
    }

    // Roll Setback dice (keep highest as penalty)
    let setbackPenalty = 0;
    let setbackRolls = [];
    if (netSetback > 0) {
      setbackRolls = rollMultiple(netSetback, 6);
      setbackPenalty = Math.max(...setbackRolls);
    }

    // Roll Boost dice
    let boostBonus = 0;
    let boostRolls = [];
    if (boostSpent > 0) {
      boostRolls = rollMultiple(boostSpent, 6);
      boostBonus = boostRolls.reduce((a, b) => a + b, 0);
    }

    // Calculate PB to use
    const pbToUse = includePB ? proficiencyBonus : 0;

    // Calculate total
    const total = d20 + abilityMod + pbToUse + edgeBonus - setbackPenalty + boostBonus;

    // Update display
    document.getElementById('d20-result').textContent = d20;

    if (d20 === 20) {
      btn.classList.add('crit');
    } else if (d20 === 1) {
      btn.classList.add('fumble');
    }

    // Build breakdown string
    let breakdown = `${d20}`;
    const abilityLabel = selectedAbility ? ` ${selectedAbility}` : '';
    if (abilityMod !== 0) breakdown += ` ${abilityMod >= 0 ? '+' : ''}${abilityMod}${abilityLabel}`;
    if (pbToUse !== 0) breakdown += ` +${pbToUse} PB`;
    if (edgeBonus > 0) breakdown += ` +${edgeBonus} Edge[${edgeRolls.join(',')}]`;
    if (setbackPenalty > 0) breakdown += ` -${setbackPenalty} Setback[${setbackRolls.join(',')}]`;
    if (boostBonus > 0) breakdown += ` +${boostBonus} Boost[${boostRolls.join(',')}]`;

    document.getElementById('roll-breakdown').textContent = breakdown;
    document.getElementById('roll-total').textContent = total;

    updateTargetResult();

    // Add to history
    const target = rollMode === 'attack' ? currentAC : currentDC;
    const rollType = selectedAbility ? `${selectedAbility} ${rollMode === 'attack' ? 'Attack' : 'Check'}` : (rollMode === 'attack' ? 'Attack' : 'Check');
    addToHistory(rollType, breakdown, total, total >= target);

    // Deduct boost from character pool and save
    if (loadedCharacter && boostSpent > 0) {
      const current = loadedCharacter.boostDiceCurrent ?? loadedCharacter.boostDice ?? 0;
      loadedCharacter.boostDiceCurrent = Math.max(0, current - boostSpent);
      updateBoostDisplay();
      saveCharacterChanges();
    }

    // Reset boost spent for next roll
    boostSpent = 0;
    document.getElementById('boost-spent').textContent = '0 spent';
  }, 300);
}

function quickRollD20(type) {
  // Set mode based on roll type
  if (type === 'attack') {
    setRollMode('attack');
  } else {
    setRollMode('check');
  }

  rollD20();

  // Update history type based on button pressed
  if (rollHistory.length > 0) {
    let label = type.charAt(0).toUpperCase() + type.slice(1);
    if (selectedAbility) {
      label = `${selectedAbility} ${label}`;
    }
    rollHistory[0].type = label;
    renderHistory();
    saveHistory();
  }
}

function specialRoll(type) {
  let result, breakdown, displayText;

  switch(type) {
    case 'death':
      const deathRolls = rollMultiple(2, 6);
      const deathTotal = deathRolls.reduce((a, b) => a + b, 0);
      const fatigue = loadedCharacter?.fatigue || 0;
      result = deathTotal - fatigue;
      breakdown = `[${deathRolls.join('+')}] - ${fatigue} fatigue`;

      if (result >= 11) {
        displayText = `${result} - Back up!`;
      } else if (result <= 3) {
        displayText = `${result} - DEAD`;
      } else {
        displayText = `${result} - Still down`;
      }

      document.getElementById('roll-breakdown').textContent = `Death: ${breakdown}`;
      document.getElementById('roll-total').textContent = displayText;
      addToHistory('Death', breakdown, result, result >= 11);
      break;

    case 'reaction':
      const reactionRolls = rollMultiple(2, 6);
      result = reactionRolls.reduce((a, b) => a + b, 0);
      breakdown = `[${reactionRolls.join('+')}]`;

      let reaction;
      if (result === 2) reaction = 'Hostile';
      else if (result <= 5) reaction = 'Unfriendly';
      else if (result <= 8) reaction = 'Neutral';
      else if (result <= 11) reaction = 'Friendly';
      else reaction = 'Helpful';

      document.getElementById('roll-breakdown').textContent = `Reaction: ${breakdown}`;
      document.getElementById('roll-total').textContent = `${result} - ${reaction}`;
      addToHistory('Reaction', breakdown, result, result >= 9);
      break;

    case 'morale':
      const moraleRolls = rollMultiple(2, 6);
      result = moraleRolls.reduce((a, b) => a + b, 0);
      breakdown = `[${moraleRolls.join('+')}]`;

      document.getElementById('roll-breakdown').textContent = `Morale: ${breakdown}`;
      document.getElementById('roll-total').textContent = `${result} vs Ml`;
      addToHistory('Morale', breakdown, result, null);
      break;
  }

  document.getElementById('d20-result').textContent = '-';
  document.getElementById('roll-d20-btn').classList.remove('crit', 'fumble');
}

function rollDamage(diceStr) {
  const match = diceStr.match(/(\d+)d(\d+)/);
  if (!match) return;

  const count = parseInt(match[1]);
  const sides = parseInt(match[2]);
  const rolls = rollMultiple(count, sides);
  const subtotal = rolls.reduce((a, b) => a + b, 0);
  const total = subtotal + abilityMod;

  const breakdown = `[${rolls.join('+')}]${abilityMod !== 0 ? ` ${abilityMod >= 0 ? '+' : ''}${abilityMod}` : ''}`;
  document.getElementById('damage-result').textContent = `${diceStr}: ${breakdown} = ${total} damage`;

  addToHistory('Damage', `${diceStr} ${breakdown}`, total, null);
}

function rollWeaponAttack(weaponName, attackBonus, damage, stat) {
  // Highlight selected weapon
  selectedWeapon = weaponName;
  document.querySelectorAll('#weapons-list .weapon-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.weapon === weaponName);
  });

  // Set the ability mod and select the stat
  if (loadedCharacter?.finalAbilities) {
    abilityMod = loadedCharacter.finalAbilities[stat] || 0;
    selectedAbility = stat;

    // Update the stat grid selection
    document.querySelectorAll('#ability-selector-character .stat-box').forEach(box => {
      box.classList.toggle('selected', box.dataset.stat === stat);
    });
  }

  // Make sure PB is on for weapon attacks
  includePB = true;
  updatePBDisplay();

  // Set to attack mode (vs AC)
  setRollMode('attack');

  // Roll the attack
  rollD20();

  // Update history to show weapon name
  if (rollHistory.length > 0) {
    rollHistory[0].type = `${weaponName} Attack`;
    renderHistory();
    saveHistory();
  }
}

function setRollMode(mode) {
  rollMode = mode;
  document.getElementById('dc-mode').style.display = mode === 'check' ? 'flex' : 'none';
  document.getElementById('ac-mode').style.display = mode === 'attack' ? 'flex' : 'none';
}

function updateTargetResult() {
  const resultEl = document.getElementById('target-result');
  const total = parseInt(document.getElementById('roll-total').textContent);

  if (isNaN(total) || document.getElementById('roll-total').textContent === '-') {
    resultEl.textContent = '';
    resultEl.className = '';
    return;
  }

  const target = rollMode === 'attack' ? currentAC : currentDC;
  if (total >= target) {
    resultEl.textContent = rollMode === 'attack' ? 'Hit!' : 'Success!';
    resultEl.className = 'success';
  } else {
    resultEl.textContent = rollMode === 'attack' ? 'Miss' : 'Failure';
    resultEl.className = 'failure';
  }
}

// ============ HISTORY ============
function addToHistory(type, detail, result, success) {
  rollHistory.unshift({
    type,
    detail,
    result,
    success,
    timestamp: Date.now()
  });

  if (rollHistory.length > 20) {
    rollHistory = rollHistory.slice(0, 20);
  }

  renderHistory();
  saveHistory();
  updateLastResult(type, result, success);
}

function updateLastResult(type, result, success) {
  const container = document.getElementById('last-result');
  const text = document.getElementById('last-result-text');

  // Format the display text
  text.textContent = `${type}: ${result}`;

  // Add styling classes
  container.classList.add('has-result');
  container.classList.remove('success', 'failure');

  if (success === true) {
    container.classList.add('success');
  } else if (success === false) {
    container.classList.add('failure');
  }
}

function renderHistory() {
  const container = document.getElementById('roll-history');

  if (rollHistory.length === 0) {
    container.innerHTML = '<div class="no-history">No rolls yet</div>';
    return;
  }

  container.innerHTML = rollHistory.slice(0, 10).map(entry => {
    const successClass = entry.success === true ? 'success' : (entry.success === false ? 'failure' : '');
    return `
      <div class="history-entry ${successClass}">
        <span class="history-type">${entry.type}</span>
        <span class="history-detail">${entry.detail}</span>
        <span class="history-result">${entry.result}</span>
      </div>
    `;
  }).join('');
}

function loadHistory() {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    rollHistory = data ? JSON.parse(data) : [];
  } catch (e) {
    rollHistory = [];
  }
}

function saveHistory() {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(rollHistory));
  } catch (e) {
    console.error('Failed to save history:', e);
  }
}

function clearHistory() {
  rollHistory = [];
  renderHistory();
  saveHistory();
}

// ============ CHARACTER LOADING ============
function showCharacterModal() {
  const modal = document.getElementById('character-modal');
  const list = document.getElementById('character-select-list');

  let characters = [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    characters = data ? JSON.parse(data) : [];
  } catch (e) {
    characters = [];
  }

  if (characters.length === 0) {
    list.innerHTML = '<p style="color: #666;">No characters found. Create one in the Character Generator first.</p>';
  } else {
    list.innerHTML = characters.map(char => {
      const level = getTotalLevel(char);
      return `
        <div class="char-select-card" data-id="${char.id}">
          <h4>${char.name}</h4>
          <div class="details">Level ${level} ${char.ancestry} ${char.classes?.[0]?.name || char.className || 'Unknown'} | HP: ${char.currentHp}/${char.maxHp}</div>
        </div>
      `;
    }).join('');

    list.querySelectorAll('.char-select-card').forEach(card => {
      card.addEventListener('click', () => selectCharacter(card.dataset.id));
    });
  }

  modal.style.display = 'flex';
}

function hideCharacterModal() {
  document.getElementById('character-modal').style.display = 'none';
}

function selectCharacter(id) {
  let characters = [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    characters = data ? JSON.parse(data) : [];
  } catch (e) {
    characters = [];
  }

  const char = characters.find(c => c.id === id);
  if (!char) return;

  loadedCharacter = char;

  // Remember this character for next visit
  localStorage.setItem(ACTIVE_CHAR_KEY, char.id);

  // Update header UI
  document.getElementById('no-character').style.display = 'none';
  document.getElementById('active-character').style.display = 'flex';

  const level = getTotalLevel(char);
  document.getElementById('char-name').textContent = char.name;
  document.getElementById('char-level').textContent = `Level ${level} ${char.ancestry}`;

  // Initialize boostDiceCurrent if not set
  if (char.boostDiceCurrent === undefined) {
    char.boostDiceCurrent = char.boostDice || 2;
  }

  // Update editable stat displays
  updateHPDisplay();
  updateFatigueDisplay();
  updateBoostDisplay();

  // Set PB based on level
  proficiencyBonus = level <= 4 ? 2 : (level <= 8 ? 3 : 4);
  updatePBDisplay();

  // Switch to character ability selector
  document.getElementById('ability-selector-generic').style.display = 'none';
  document.getElementById('ability-selector-character').style.display = 'grid';

  // Get save proficiencies
  // Get class name - modern format uses char.classes array
  const className = char.classes?.[0]?.name || char.className || char.charClass;
  const saveProficiencies = CLASS_SAVES[className] || [];

  console.log('Character loaded:', char.name, 'Class:', className, 'Saves:', saveProficiencies, 'Weapons:', char.weapons);

  // Render character stats as buttons
  const statGrid = document.getElementById('ability-selector-character');
  statGrid.innerHTML = STATS.map(stat => {
    const mod = char.finalAbilities?.[stat] || 0;
    const isProficient = saveProficiencies.includes(stat);
    const profClass = isProficient ? 'save-proficient' : '';
    return `
      <div class="stat-box ${profClass}" data-stat="${stat}" data-mod="${mod}">
        <span class="stat-label">${stat}</span>
        <span class="stat-mod">${mod >= 0 ? '+' : ''}${mod}</span>
      </div>
    `;
  }).join('');

  // Add click handlers to stat boxes
  statGrid.querySelectorAll('.stat-box').forEach(box => {
    box.addEventListener('click', () => {
      statGrid.querySelectorAll('.stat-box').forEach(b => b.classList.remove('selected'));
      box.classList.add('selected');
      abilityMod = parseInt(box.dataset.mod);
      selectedAbility = box.dataset.stat;
    });
  });

  // Render weapons section
  renderWeaponsSection(char);

  // Render inventory
  updateInventoryDisplay();

  // Show rest buttons
  showRestButtons();

  hideCharacterModal();
}

function renderWeaponsSection(char) {
  const section = document.getElementById('weapons-section');
  const list = document.getElementById('weapons-list');

  const weapons = char.weapons || [];
  if (weapons.length === 0) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';

  const level = getTotalLevel(char);
  const pb = level <= 4 ? 2 : (level <= 8 ? 3 : 4);

  list.innerHTML = weapons.map(w => {
    const weaponData = WEAPONS[w.name] || { damage: '1d6', stat: 'STR', type: 'Medium' };
    const statMod = char.finalAbilities?.[weaponData.stat] || 0;
    const attackBonus = pb + statMod;
    const damageBonus = statMod;

    return `
      <div class="weapon-btn" data-weapon="${w.name}" data-attack="${attackBonus}" data-damage="${weaponData.damage}" data-stat="${weaponData.stat}">
        <span class="weapon-name">${w.name}</span>
        <span class="weapon-stats">+${attackBonus} / ${weaponData.damage}${damageBonus >= 0 ? '+' : ''}${damageBonus}</span>
      </div>
    `;
  }).join('');

  // Add click handlers
  list.querySelectorAll('.weapon-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      rollWeaponAttack(
        btn.dataset.weapon,
        parseInt(btn.dataset.attack),
        btn.dataset.damage,
        btn.dataset.stat
      );
    });
  });
}

function unloadCharacter() {
  loadedCharacter = null;

  // Clear saved character
  localStorage.removeItem(ACTIVE_CHAR_KEY);

  // Reset header
  document.getElementById('no-character').style.display = 'flex';
  document.getElementById('active-character').style.display = 'none';

  // Switch back to generic ability selector
  document.getElementById('ability-selector-generic').style.display = 'flex';
  document.getElementById('ability-selector-character').style.display = 'none';

  // Hide weapons section
  document.getElementById('weapons-section').style.display = 'none';

  // Reset stat displays
  document.getElementById('char-hp-current').textContent = '8';
  document.getElementById('char-hp-max').textContent = '8';
  document.getElementById('char-fatigue').textContent = '0';
  document.getElementById('fatigue-display').className = 'stat-editable fatigue-0';
  document.getElementById('char-boost-current').textContent = '2';
  document.getElementById('char-boost-max').textContent = '2';
  document.getElementById('boost-available').textContent = '';
  closeAllStatEdits();
  hideInventory();
  hideRestButtons();

  // Reset to defaults
  abilityMod = 0;
  selectedAbility = null;
  proficiencyBonus = 2;
  updatePBDisplay();

  // Reset generic selector
  document.querySelectorAll('#ability-selector-generic .mod-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.value === '0');
  });
}

function getTotalLevel(char) {
  if (char.level) return char.level;
  if (char.classLevels) {
    return Object.values(char.classLevels).reduce((a, b) => a + b, 0);
  }
  return 1;
}

// ============ ORACLE ============
let currentLikelihood = 'neutral';

// Oracle result table
const ORACLE_RESULTS = {
  1: { answer: 'Strong No', class: 'strong-no', description: 'No, and there\'s a complication' },
  2: { answer: 'No', class: 'no', description: 'No' },
  3: { answer: 'No', class: 'no', description: 'No' },
  4: { answer: 'Yes', class: 'yes', description: 'Yes' },
  5: { answer: 'Yes', class: 'yes', description: 'Yes' },
  6: { answer: 'Strong Yes', class: 'strong-yes', description: 'Yes, and it\'s better than expected' }
};

// Scene check results
const SCENE_RESULTS = {
  1: { text: 'Interrupt — Something unexpected happens', class: 'interrupt' },
  2: { text: 'Normal — Scene proceeds as expected', class: 'normal' },
  3: { text: 'Normal — Scene proceeds as expected', class: 'normal' },
  4: { text: 'Normal — Scene proceeds as expected', class: 'normal' },
  5: { text: 'Normal — Scene proceeds as expected', class: 'normal' },
  6: { text: 'Opportunity — Something advantageous appears', class: 'opportunity' }
};

function setupOracleListeners() {
  // Likelihood buttons
  document.querySelectorAll('.likelihood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.likelihood-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      currentLikelihood = btn.dataset.likelihood;
    });
  });

  // Oracle button
  document.getElementById('ask-oracle-btn').addEventListener('click', askOracle);

  // Scene check button
  document.getElementById('scene-check-btn').addEventListener('click', checkScene);
}

function askOracle() {
  const btn = document.getElementById('ask-oracle-btn');
  btn.classList.add('thinking');

  setTimeout(() => {
    btn.classList.remove('thinking');

    let rolls, finalResult, breakdown;

    if (currentLikelihood === 'neutral') {
      // 50/50: Roll 1d6
      const d6 = roll(6);
      rolls = [d6];
      finalResult = d6;
      breakdown = `1d6 = [${d6}]`;
    } else if (currentLikelihood === 'likely') {
      // Likely Yes: Roll 2d6, keep highest
      const d6a = roll(6);
      const d6b = roll(6);
      rolls = [d6a, d6b];
      finalResult = Math.max(d6a, d6b);
      breakdown = `2d6 keep highest = [${d6a}, ${d6b}] → ${finalResult}`;
    } else {
      // Unlikely/Likely No: Roll 2d6, keep lowest
      const d6a = roll(6);
      const d6b = roll(6);
      rolls = [d6a, d6b];
      finalResult = Math.min(d6a, d6b);
      breakdown = `2d6 keep lowest = [${d6a}, ${d6b}] → ${finalResult}`;
    }

    const result = ORACLE_RESULTS[finalResult];

    // Update display
    document.getElementById('oracle-dice').textContent = finalResult;
    const answerEl = document.getElementById('oracle-answer');
    answerEl.textContent = result.answer;
    answerEl.className = result.class;
    document.getElementById('oracle-breakdown').textContent = breakdown;

    // Add to history
    const likelihoodLabel = currentLikelihood === 'likely' ? 'Likely' :
                           currentLikelihood === 'unlikely' ? 'Unlikely' : '50/50';
    addToHistory(`Oracle (${likelihoodLabel})`, breakdown, result.answer,
                 finalResult >= 4 ? true : false);
  }, 400);
}

function checkScene() {
  const d6 = roll(6);
  const result = SCENE_RESULTS[d6];

  const resultEl = document.getElementById('scene-result');
  resultEl.textContent = `[${d6}] ${result.text}`;
  resultEl.className = result.class;

  // Add to history
  const isGood = d6 === 6 ? true : (d6 === 1 ? false : null);
  addToHistory('Scene Check', `1d6 = [${d6}]`, result.text.split(' — ')[0], isGood);
}

// Add oracle listeners on page load
document.addEventListener('DOMContentLoaded', () => {
  setupOracleListeners();
  setupGenerators();
  setupTabs();
});

// ============ GENERATORS ============
let tablesData = null;

async function setupGenerators() {
  // Load tables data
  try {
    const response = await fetch('./data/tables.json');
    tablesData = await response.json();
    initGeneratorUI();
  } catch (e) {
    console.error('Failed to load tables:', e);
    document.getElementById('gen-output').textContent = 'Failed to load tables';
  }
}

function initGeneratorUI() {
  // Populate category dropdown
  const categorySelect = document.getElementById('table-category');
  tablesData.categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.id;
    option.textContent = cat.name;
    categorySelect.appendChild(option);
  });

  // Category change handler
  categorySelect.addEventListener('change', () => {
    const tableSelect = document.getElementById('table-select');
    const rollBtn = document.getElementById('roll-table-btn');

    tableSelect.innerHTML = '<option value="">Table...</option>';

    if (!categorySelect.value) {
      tableSelect.disabled = true;
      rollBtn.disabled = true;
      return;
    }

    // Get tables for this category
    const categoryTables = Object.entries(tablesData.tables)
      .filter(([id, table]) => table.category === categorySelect.value)
      .sort((a, b) => a[1].name.localeCompare(b[1].name));

    categoryTables.forEach(([id, table]) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = table.name;
      tableSelect.appendChild(option);
    });

    tableSelect.disabled = false;
  });

  // Table change handler
  document.getElementById('table-select').addEventListener('change', () => {
    document.getElementById('roll-table-btn').disabled = !document.getElementById('table-select').value;
  });

  // Roll table button
  document.getElementById('roll-table-btn').addEventListener('click', () => {
    const tableId = document.getElementById('table-select').value;
    if (tableId) {
      const result = rollOnTable(tableId);
      document.getElementById('table-result').textContent = result;
    }
  });

  // Formula buttons
  document.querySelectorAll('.formula-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const formulaId = btn.dataset.formula;
      rollFormula(formulaId);
    });
  });
}

function rollD66() {
  const tens = Math.floor(Math.random() * 6) + 1;
  const units = Math.floor(Math.random() * 6) + 1;
  return `${tens}${units}`;
}

function rollOnTable(tableId) {
  const table = tablesData.tables[tableId];
  if (!table) return 'Table not found';

  const roll = rollD66();
  const result = table.entries[roll];
  return result || `No entry for ${roll}`;
}

function rollFormula(formulaId) {
  const formula = tablesData.formulas.find(f => f.id === formulaId);
  if (!formula) return;

  const results = [];
  const breakdown = [];

  formula.tables.forEach(tableId => {
    const table = tablesData.tables[tableId];
    const roll = rollD66();
    const result = table.entries[roll];
    results.push(result);
    breakdown.push(`${table.name}: ${result} [${roll}]`);
  });

  // Format output based on formula type
  let output;
  if (formula.combine === true) {
    // Combine name parts (strip leading hyphens from endings)
    output = results.map(r => r.replace(/^-/, '')).join('');
  } else if (formula.combine === 'halfling') {
    // Halfling: First + Family1+Family2
    const first = results[0];
    const family = results[1] + results[2].replace(/^-/, '');
    output = `${first} ${family}`;
  } else {
    // Join with " + " for NPC/Item formulas
    output = results.join(' + ');
  }

  document.getElementById('gen-output').textContent = output;
  document.getElementById('gen-breakdown').textContent = breakdown.join(' | ');

  // Add to history
  addToHistory(formula.name, breakdown.join(', '), output, null);
}

// ============ TABS ============
const TAB_KEY = 'oswr-solo-active-tab';

function setupTabs() {
  // Restore last active tab
  const savedTab = localStorage.getItem(TAB_KEY) || 'dice';
  switchToTab(savedTab);

  // Tab click handlers
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      switchToTab(tabId);
    });
  });
}

function switchToTab(tabId) {
  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  // Update tab panels
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.remove('active');
  });

  // Map tab ID to panel ID
  const panelMap = {
    'dice': 'dice-section',
    'oracle': 'oracle-tab',
    'history': 'history-tab'
  };

  const panelId = panelMap[tabId];
  if (panelId) {
    document.getElementById(panelId).classList.add('active');
  }

  // Save preference
  localStorage.setItem(TAB_KEY, tabId);
}
</script>
