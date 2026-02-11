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
      <div class="char-summary">
        <strong id="char-name">Character Name</strong>
        <span id="char-level">Level 1</span>
      </div>
      <div class="char-stats">
        <span id="char-hp">HP: 8/8</span>
        <span id="char-boost">Boost: 2</span>
      </div>
      <button id="unload-character-btn" class="btn-small">Unload</button>
    </div>
  </div>

  <!-- Character Selection Modal -->
  <div id="character-modal" class="modal" style="display: none;">
    <div class="modal-content">
      <h3>Select Character</h3>
      <div id="character-select-list"></div>
      <button id="close-modal-btn" class="btn-secondary">Cancel</button>
    </div>
  </div>

  <!-- Main Dice Roller -->
  <div id="dice-section">
    <h2>Dice Roller</h2>

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

  <!-- Oracle Section -->
  <div id="oracle-section">
    <h2>Oracle</h2>
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

  <!-- Roll History -->
  <div id="history-section">
    <h3>History <button id="clear-history-btn" class="btn-small">Clear</button></h3>
    <div id="roll-history"></div>
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
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #no-character {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #666;
  }
  #active-character {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
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
    gap: 1rem;
    font-size: 0.9rem;
  }
  #char-boost {
    color: #c9a227;
    font-weight: bold;
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
    border-top: 2px solid #2c5282;
    padding-top: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  #oracle-section h2 {
    color: #2c5282;
    margin-bottom: 0.5rem;
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

  /* History Section */
  #history-section {
    border-top: 1px solid #ddd;
    padding-top: 1rem;
  }
  #history-section h3 {
    font-size: 1rem;
    margin-bottom: 0.75rem;
    color: #555;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  #roll-history {
    max-height: 200px;
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

  // Boost button
  document.getElementById('spend-boost-btn').addEventListener('click', () => {
    const maxBoost = loadedCharacter?.boostDice || 99;
    if (boostSpent < maxBoost) {
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

    // Reset boost spent after roll
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
  document.getElementById('char-hp').textContent = `HP: ${char.currentHp}/${char.maxHp}`;
  document.getElementById('char-boost').textContent = `Boost: ${char.boostDice || 0}`;

  // Update boost display
  document.getElementById('boost-available').textContent = `(${char.boostDice || 0} available)`;

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

  // Reset boost display
  document.getElementById('boost-available').textContent = '';

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
});
</script>
