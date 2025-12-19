---
title: Build-a-Spell
layout: default
parent: Magic
grand_parent: Players
nav_order: 9
---

# Build-a-Spell

OSwR spells follow consistent patterns. Use this guide to create new spells, convert spells from other systems, or understand why existing spells work the way they do.

---

## Spell Tier Guidelines

Tiers represent power level and access. Higher tiers unlock at higher caster levels.

| Tier | Caster Level | Power Level |
|-----:|-------------:|-------------|
| 1 | 1 | Local, single-target, minor effects |
| 2 | 3 | Improved versions, small areas, useful utility |
| 3 | 5 | Battlefield control, serious damage, party buffs |
| 4 | 7 | Major transformations, large summons, teleportation |
| 5 | 9 | Permanent effects, raise dead, instant death (conditional) |
| 6 | 11 | World-altering, reshape reality, true resurrection |

---

## Effect Types by Tier

Use this table to determine what tier a spell should be based on what it does.

| Tier | Effect Types |
|-----:|--------------|
| 1 | Single-target buffs, minor healing (1d6+PB), detection, light/darkness, basic control (Sleep, Command), cantrip-level utility |
| 2 | Resistances, invisibility (single), levitation, illusions, hold person (humanoids only), ESP, locks/barriers |
| 3 | Flight, artillery damage (Level×d6), group invisibility, haste/slow, disease/blindness cure, protection radius effects |
| 4 | Polymorph, dimension door (short teleport), serious healing (PB×d6+PB), wall spells (2d6 damage), small summons, charm monster |
| 5 | Raise dead, teleport (long range), permanent walls, elementals (8 HD), mass effects, conditional instant death, contact other planes |
| 6 | Full heal/restoration, disintegrate, geas, weather control, reincarnation, limb regeneration, reality-altering effects |

**Using this table:** If you're converting or creating a spell, find the effect type that best matches. That's your starting tier. Then adjust based on:
- **Limitations** (touch only, concentration, rare components) → might lower tier
- **Power creep** (better than existing spells at that tier) → raise tier
- **Niche utility** (very situational) → might lower tier

---

## Scaling Patterns

OSwR spells use three distinct scaling patterns depending on spell type. This creates variety while keeping the system coherent.

---

### Artillery Spells (Area Damage)

**Formula: Caster Level × d6, save for half**

The big damage spells scale with caster level (not total character level), following OSR tradition. A Fighter 5/Magic-User 5 casts Fireball as a 5th-level caster, not 10th. The constraint isn't damage - it's slot availability. A level 5 caster has ONE Tier 3 slot. Fireball is their big gun, and it should feel like it.

| Level | Damage | Average |
|------:|-------:|--------:|
| 5 | 5d6 | 17.5 |
| 8 | 8d6 | 28 |
| 10 | 10d6 | 35 |
| 12 | 12d6 | 42 |

**Examples:** Fireball, Lightning Bolt, Call Lightning, Ice Storm

**Boost/Upcast:** +1d6 damage

---

### Missile Spells (Auto-Hit)

**Formula: PB missiles, each dealing 1d4+1**

Missile spells scale with Proficiency Bonus, providing reliable but modest damage. These are the "I don't want to waste a Fireball on this" option - always useful, never dominant.

| Level | PB Missiles | Damage per Missile | Total Average |
|------:|:-----------:|:------------------:|--------------:|
| 1-4 | 2 | 1d4+1 | 7 |
| 5-8 | 3 | 1d4+1 | 10.5 |
| 9-12 | 4 | 1d4+1 | 14 |

**Examples:** Magic Missile

**Boost/Upcast:** +1 missile

---

### Healing Spells

OSwR uses two core healing spells that scale naturally, plus a party heal at higher tiers.

| Spell | Tier | Formula | Level 7 (PB +3) | Level 9 (PB +4) |
|-------|-----:|---------|----------------:|----------------:|
| Cure Light Wounds | 1 | 1d6 + PB | 1d6+3 (6.5) | 1d6+4 (7.5) |
| Cure Serious Wounds | 4 | PB×d6 + PB | 3d6+3 (13.5) | 4d6+4 (18) |
| Mass Cure Wounds | 5 | 1d6 + PB (×PB targets) | 3 targets × 6.5 | 4 targets × 7.5 |

**Cure Light Wounds** is the workhorse - always useful, scales slowly with PB.

**Cure Serious Wounds** is the big single-target heal. The PB×d6 + PB formula means it grows significantly as you level, replacing the need for a separate "Cure Critical Wounds" spell.

**Mass Cure Wounds** heals the whole party at once - less per person than Cure Serious, but invaluable after a tough fight.

**Boost/Upcast:** +1 die (same size as base) or +1 target (Mass Cure)

---

### Other Damage Spells

Not every damage spell fits the artillery pattern. Single-target damage, damage-over-time, and wall spells use fixed dice appropriate to their tier.

**Damage-over-time:** Spells like Insect Plague (2d6/round) do less per instance but accumulate. Consider total potential damage over the spell's duration.

**Wall spells:** Deal damage on contact/crossing. Lower per-hit damage (2d6 at T4, 4d6 at T5, 6d6 at T6) but persistent and tactical.

**Single-target damage:** Often uses fixed dice with a save, or trades damage for a rider effect (prone, restrained, etc.).

---


## Duration Guidelines

| Duration | Typical Use |
|----------|-------------|
| Instant | Damage, healing, teleportation |
| 1 round | Single-action control (Command) |
| 1 Turn (10 min) | Combat buffs, exploration utility |
| 1 hour | Extended utility (Darkvision, Water Breathing) |
| Concentration | Ongoing effects requiring attention |
| Permanent | Terrain changes, walls, transformations |
| Until dispelled/broken | Charms, invisibility, curses |

**Lower tiers** tend toward 1 Turn or instant.
**Higher tiers** gain permanent effects and "until completed" durations.

---

## Range Categories

| Range | Distance | Typical Use |
|-------|----------|-------------|
| Touch | Adjacent | Healing, buffs, personal enhancement |
| Self | Caster only | Detection, personal buffs |
| Near | 30 ft | Most combat spells, control |
| Far | 120 ft | Artillery (Fireball), long-range utility |
| Sight | Line of sight | Weather control, divination |

Most spells use **Near (30 ft)** or **Touch**. Reserve **Far** for spells meant to be used at range (artillery, scouting).

---

## Save Guidelines

| Save Type | When to Use |
|-----------|-------------|
| **None (auto-hit)** | Low damage, utility effects (Magic Missile, Light) |
| **Save negates** | Control effects (Hold Person, Charm, Sleep*) |
| **Save for half** | Damage effects (Fireball, Lightning Bolt) |
| **Save or worse** | Devastating effects with partial mitigation |

*Sleep is notable for having no save but being limited by HD total.

**Which ability?**
- **DEX:** Dodgeable effects (explosions, projectiles, area effects)
- **CON:** Endurance effects (poison, disease, exhaustion, fire damage)
- **WIS:** Mental effects (charm, fear, compulsion, illusion)
- **INT:** Rarely used; intellectual trickery, complex illusions

**Standard DC:** Most spell saves are DC 12 (Normal difficulty).

---

## Area Effect Guidelines

| Area | Size | Examples |
|------|------|----------|
| Single target | 1 creature/object | Most T1-2 spells |
| Small | 10-15 ft radius | Silence, Protection from Evil (radius) |
| Medium | 20 ft radius | Fireball, Entangle, Ice Storm |
| Large | 30-40 ft radius | Cloudkill, Insect Plague, Earthquake |
| Line | 60 ft long, 5 ft wide | Lightning Bolt |
| Cone | Near range | Detection spells |
| Wall | 20-60 ft long | Wall of Fire, Blade Barrier |

Higher tiers can affect larger areas or more targets.

---

## The Boost System

Every spell has a **Boost** effect triggered by spending a Boost Die. Boosts should be meaningful but not game-breaking.

**Standard Boost Types:**

| Boost Type | Effect | Examples |
|------------|--------|----------|
| +1 target | Affect one additional creature/object | Hold Person, Cure Light Wounds |
| +1 duration | Add 1 Turn to duration | Most utility spells |
| +1d4 or +1d6 | Increase effect by one die | Healing, damage spells |
| Expand area | Increase radius by 5-10 ft | Fireball, Entangle |
| **Setback** on save | Target rolls with **Setback** | Charm, control spells |

**Boost Guidelines:**
- A boost should feel worth a Boost Die but not double the spell's power
- Duration boosts work well for utility spells
- Damage/healing boosts should add roughly 25-50% more effect
- Control spells benefit from +1 target or **Setback** on save
- Area expansion should be modest (5-10 ft)

---

## The Ritual Tag

Spells marked **{Ritual}** can be cast without preparing them first, but take 10 extra minutes and still consume a slot.

**Which spells get {Ritual}?**
- Detection spells (Detect Magic, Detect Evil, Find Traps)
- Communication spells (Speak with Animals, Speak with Plants)
- Divination spells (Commune, Commune with Nature)
- Utility that benefits from flexibility (Read Magic, Read Languages)

**Which spells DON'T get {Ritual}?**
- Combat spells (damage, control)
- Healing spells
- Buffs with combat application
- Anything time-sensitive

**The principle:** Rituals are for exploration and information-gathering, not combat power.

---

## Class Spell List Guidelines

Each class has a distinct magical identity:

**Cleric (Hallowed):**
- Healing and restoration
- Protection and warding
- Undead interaction (Turn, Speak with Dead)
- Divine communication

**Cleric (Druidic):**
- Nature communication (animals, plants)
- Weather and terrain control
- Animal enhancement and summoning
- Fire as purifying/natural force

**Magic-User:**
- Direct damage (arcane artillery)
- Illusion and deception
- Transformation (polymorph, transmutation)
- Knowledge and divination
- Summoning and binding

**Overlap:** Some spells appear on multiple lists (Detect Magic, Protection from Evil, Light). These are "universal" magical effects.

---

## Converting Spells from Other Systems

### From 5e
- **Spell level ≈ Tier** (5e level 1-2 = T1, level 3-4 = T2, etc.)
- Convert advantage/disadvantage to **Edge**/**Setback**
- Remove concentration if effect is simple; keep for ongoing control
- Reduce damage slightly (OSwR is lower-powered)
- Add a Boost effect

### From OSE/B/X
- **Spell level = Tier** (direct mapping)
- Add a Boost effect
- Clarify saves using ability scores (not "save vs spells")
- Standardise range to Touch/Near/Far
- Check duration against OSwR conventions (1 Turn = 10 min)

### From Other Systems
1. Identify the spell's core effect
2. Compare to existing OSwR spells of similar power
3. Assign tier based on comparable effects
4. Standardise format (Casting Time, Range, Duration, Effect, Boost)
5. Add {Ritual} if appropriate

---

## Spell Design Checklist

When creating or converting a spell:

- [ ] **Tier appropriate?** Compare to existing spells at that tier
- [ ] **Damage within guidelines?** Check against the damage table
- [ ] **Save makes sense?** DEX for dodging, CON for endurance, WIS for mental
- [ ] **Duration reasonable?** 1 Turn for most, longer for utility
- [ ] **Range appropriate?** Touch/Near/Far based on use case
- [ ] **Boost meaningful?** Worth a die but not overpowered
- [ ] **Ritual tag?** Only for non-combat utility
- [ ] **Fits class identity?** Cleric = divine, Magic-User = arcane, Druid = nature

---

## Example: Building a New Spell

**Concept:** A Tier 2 Magic-User spell that creates a slippery surface.

**Step 1 - Compare to tier:** Tier 2 has Web (control, 20-ft cube, DEX save or Speed 0). Similar power level.

**Step 2 - Set parameters:**
- Casting Time: 1 Action (standard)
- Range: Near (30 ft) - typical for control
- Duration: 1 Turn (10 min) - matches Web
- Area: 20 ft square (comparable to Web's cube)

**Step 3 - Define effect:**
- Control spell, so save negates
- DEX save (dodging/balance)
- Effect: difficult terrain + fall prone on failed save

**Step 4 - Add Boost:**
- +1 area or **Setback** on save? Area expansion feels right for terrain control.

**Result:**

### Grease
- **Casting Time:** 1 Action
- **Range:** Near (30 ft)
- **Duration:** 1 Turn (10 minutes)
- **Effect:** 20-ft square becomes slippery. Creatures entering or starting turn there DEX save (12) or fall prone. Area is difficult terrain.
- **Boost:** Expand to 30-ft square.

---

## Editorial Pass Status

**Reference:** Compare against Basic Fantasy RPG spells at `D:\Downloads\bfrpg spells.txt`

### Completed

**Scaling patterns (DONE):**
- ✓ Artillery spells now use caster level × d6 (Fireball, Lightning Bolt, Ice Storm)
- ✓ Magic Missile now fires PB darts × (1d4+1)
- ✓ Healing: Cure Light Wounds 1d6+PB, Cure Serious Wounds PB×d6+PB

**New spells added:**
- ✓ Resist Elements (T2 Cleric/Druid) - choose fire or cold when preparing
- ✓ Spiritual Hammer (T2 Cleric) - 1d6+PB force damage
- ✓ Regenerate (T6 Cleric) - regrows limbs, heals 3d6
- ✓ Restoration (T6 Cleric) - removes negative levels or restores drained ability scores
- ✓ Remove Fear (T1 Cleric) - calms frightened creatures, new save with **Edge** vs magical fear
- ✓ Augury (T2 Cleric) - weal/woe divination for planned actions
- ✓ Divination (T4 Cleric) - 1-2 sentence truthful answer about events within one week
- ✓ Animate Dead (T4 Cleric) - weaker version with control limit (PB × 2 HD)
- ✓ Flame Strike (T5 Cleric) - divine artillery (caster level × d6, half fire/half divine)
- ✓ Pass Without Trace (T1 Druid) - no tracks/scent, tracking fails
- ✓ Shillelagh (T1 Druid) - magical staff (+1/1d8)
- ✓ Produce Flame (T2 Druid) - torch + throwable 1d6 fire
- ✓ Summon Swarm (T3 Druid) - 1d6/round + **Setback** in 10-ft radius
- ✓ Hold Animal (T3 Druid) - paralysis for up to 3 animals

**Spell count balancing (DONE):**
- ✓ Cleric brought to 8+ spells per tier (was light at T2, T4, T5)
- ✓ Druid classic spells added (Pass Without Trace, Shillelagh, Produce Flame, Summon Swarm, Hold Animal)
- ✓ Summon Swarm moved T2→T3 (battlefield control power level)
- ✓ Final counts: Cleric 50, Magic-User 72, Druid 43
- ✓ Cleric divination progression: Augury (T2) → Divination (T4) → Commune (T5)
- ✓ Druid swarm progression: Summon Swarm (T3) → Insect Plague (T5)

**Tier 1 editorial pass (DONE):**
- ✓ All saves changed to "spell save" (not fixed DC 12)
- ✓ Ritual format standardized to "1 Action or Ritual"
- ✓ Detect Evil/Detect Magic/Protection from Evil → PB Turns duration
- ✓ Floating Disc/Light → 1 hour duration
- ✓ Sleep: added "5+ HD immune", duration "1 Turn or until harmed/shaken"
- ✓ Command: duration "PB rounds"

**Tier 2 editorial pass (DONE):**
- ✓ All saves changed to "spell save" (not fixed DC 12)
- ✓ Ritual format standardized to "1 Action or Ritual"
- ✓ Find Traps, Speak with Animals, Speak with Plants → PB Turns duration
- ✓ Detect Invisibility, Locate Object → PB Turns duration
- ✓ Continual Light → Ritual tag added
- ✓ Know Alignment → removed (no alignments in OSwR)
- ✓ Hold Person → repeat save each round
- ✓ Web → 15-ft cube, repeat save allows 5 ft movement
- ✓ Phantasmal Force → full illusion rules (AC 11, psychosomatic damage)
- ✓ Heat Metal → 2d6 initial, 1d6/round ongoing, STR DC 12 to tear off armour (destroys it)
- ✓ Warp Wood → no save (spell just works)
- ✓ Levitate → 15 ft per round (movement consistency)
- ✓ Knock boost → range extends to Far (was +1 lock)

### Next Session: Tier 3-6 Editorial Pass

**HOW TO CONTINUE THIS WORK:**

⚠️ **CRITICAL: This is a collaborative 2-way review, NOT a bulk edit task.**

DO NOT read the file and start making changes. Instead:
1. Present each spell with your observations and suggestions
2. WAIT for Damien to respond with approval, modifications, or rejection
3. Only then make the agreed edits
4. Damien may disagree, offer alternative approaches, or ask questions - that's the point

This process caught important design issues in Tier 2 (Heat Metal armour rules, Warp Wood save logic) that would have been missed in a bulk pass.

**Process for each tier:**
1. Read the tier file (tier-3-spells.md, etc.)
2. Read BFRPG reference at `D:\Downloads\bfrpg spells.txt` for comparison
3. Go through each spell, presenting suggestions for Damien to approve/modify/reject
4. Make edits only after agreement
5. Update this status section when complete

**Patterns established (apply consistently):**
- **Saves:** Use "WIS/DEX/CON spell save" (not fixed DC 12). Exception: physical checks like Heat Metal's STR check use "DC 12"
- **Rituals:** Format as "1 Action or Ritual" in Casting Time. Detection, communication, and divination spells get ritual tag
- **Duration scaling:** Detection/protection/communication spells → "PB Turns". Pure utility (Light) → "1 hour". Combat spells → "1 Turn"
- **Movement:** Use 15 ft increments to match movement ranges
- **Area sizes:** Use 15-ft cube/sphere to match movement (not 20-ft)
- **Boosts:** Follow standard patterns (+1 die, +1 target, +1 Turn duration, range extends)
- **Repeat saves:** Control spells (Hold Person, Web) should allow repeat saves each round
- **Narrative first:** When saves feel wrong mechanically, ask "what's actually happening?" (e.g., Warp Wood targets object not person → no save; Heat Metal burns you regardless of willpower → STR to tear off, not CON to resist)

**Completed tiers:**
- [x] Tier 1 spells - full editorial pass (spell saves, ritual format, PB scaling)
- [x] Tier 2 spells - full editorial pass (Heat Metal/Warp Wood redesign, Know Alignment removed)
- [x] Tier 3 spells - full editorial pass (Hold Animal, Summon Swarm added for Druid)
- [x] Tier 4 spells - full editorial pass (Animate Dead, Dispel Magic, Divination added for Cleric)
- [x] Tier 5 spells - full editorial pass (Flame Strike added for Cleric)
- [x] Tier 6 spells - full editorial pass (Regenerate, Restoration added for Cleric)

**Other issues to review:**
- [ ] Continual Light (T2 Magic-User, T3 Cleric) - should these match?
- [ ] Ensure all boosts follow standard patterns

---

## Design Notes

**Why three scaling patterns?**

Different spell types serve different purposes. Artillery spells are your big moment - they should scale dramatically with level because you're spending a precious high-tier slot. Missile spells are reliable workhorses - they scale with PB to stay useful without ever dominating. Healing needs to keep pace but not outstrip damage - the +PB formula achieves this elegantly.

**Why Level × d6 for artillery?**

This follows OSR tradition. In classic D&D, Fireball dealt 1d6 per caster level. The limiting factor was never damage - it was the fact that you could only cast it once or twice per day. OSwR keeps this philosophy: when you finally get to throw that Fireball, it should feel devastating.

**Why PB for missiles and healing?**

PB scales more slowly than level (only +1 every four levels). This keeps Magic Missile and healing useful at high levels without making them the default choice. A level 10 Magic-User's 4 missiles (4d4+4) are nice, but they're not competing with 10d6 Fireball.

**Why +PB instead of more dice for healing?**

Healing that scales too fast trivialises damage. The +PB formula means a level 12 Cleric's Cure Light Wounds heals 1d4+4 (avg 6.5) - helpful, but not enough to fully recover from a serious hit. You need the higher-tier heals for that.

**Why Boost Dice for spells?**

Boost effects give casters meaningful choices without adding spell slot complexity. A Cleric deciding whether to boost Cure Light Wounds or save the die for later creates the same resource tension Fighters feel with their extra attacks.
