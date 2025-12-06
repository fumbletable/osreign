---
title: Designer Commentary
layout: default
parent: Refereeing
grand_parent: Second Edition
nav_order: 2
---

# Designer Commentary

This page explains the thinking behind OSwR's design decisions. It's here for playtesters and curious readers who want to understand *why* the rules work the way they do.

---

## The Core Vision

**"5e chassis, OSR soul."**

OSwR takes the mechanical foundation that modern players know (bounded accuracy, proficiency bonus, advantage/disadvantage) and pairs it with the play philosophy that makes old-school games sing (player skill over character builds, resource pressure, emergent narrative).

The goal: a game where 5e players feel mechanically at home but discover a completely different play experience.

---

## Why Four Classes?

Classic D&D had fighters, magic-users, clerics, and thieves. OSwR has Fighter, Magic-User, Cleric, and Expert.

**Why not more?** Every additional class creates overlap, edge cases, and balance concerns. Four classes can cover any character concept when combined with backgrounds, feats, and multiclassing.

**Why "Expert" instead of "Thief"?** Thief implies criminality. Expert implies competence. A scout, diplomat, or artisan is an Expert. So is a thief. The name doesn't constrain the fiction.

---

## Why Abilities (Not Scores + Modifiers)

In classic D&D and 5e, you roll 3d6 for a score (3-18), then look up a modifier (-4 to +4). OSwR skips the score entirely - you just record the modifier.

**Why?** The score is vestigial. In play, you only ever use the modifier. "I have 16 Strength" means nothing until converted to "+2" (5e) or "+2 to hit" (OSE). OSwR cuts the middleman.

**What about rolling?** You still roll 3d6 and use the table to find your ability. The process is identical - you just don't write down a number you'll never use again.

**Classic divergence:** OSE uses scores (3-18) with varying modifier scales. OSwR's unified -4 to +4 range is closer to 5e but simpler than both.

---

## Why Boost Dice (Not Advantage/Disadvantage)

5e's advantage system is elegant - roll 2d20, take best/worst. But it's binary: you either have it or you don't, and multiple sources don't stack.

**Boost Dice are a resource.** You earn them (1d6 per day, refreshed on rest) and spend them deliberately. This creates decisions: "Do I boost this attack or save it for the trap ahead?"

**They stack with EDGE.** A character with EDGE (roll 2d20 keep best) can still spend a Boost Die for extra effect. The systems complement rather than overlap.

**Class hooks tie in.** Each class uses Boost Dice differently:
- Fighter: Extra attack
- Expert: Roll 2d6 keep best (precision)
- Cleric/Magic-User: Trigger Boostable spell effects

**Classic divergence:** OSE has no advantage system. OSwR adds both EDGE/SETBACK (situational, like 5e) and Boost Dice (resource-based, unique to OSwR).

---

## Why Ancestry (Not Race)

Simple: "race" carries baggage. "Ancestry" describes what it actually is - where you come from, what you inherited.

**Mechanical change:** OSwR ancestries have 3 traits max (Humans get 2). One is marked "Essential" - the defining old-school ability (Dwarf stonecunning, Elf ghoul immunity, Halfling fearlessness). The others can vary for sub-ancestries.

**Classic divergence:** In OSE, demihuman races ARE classes. An Elf is a class, not an ancestry + class. OSwR separates these, allowing Dwarf Fighters, Elf Clerics, etc.

---

## Divergences from OSE/Classic

Beyond the philosophical changes, here are specific mechanical divergences from Old-School Essentials and B/X:

**Saves:** OSE has 5 save categories (Death, Wands, Paralysis, Breath, Spells). OSwR uses 6 ability-based saves with proficiency, matching 5e's structure.

**Thief Skills:** OSE Thieves have percentage-based skills (Pick Locks 15%, Hide in Shadows 10%). OSwR Experts use feats - you either have the ability or you don't, with EDGE when applicable.

**Turn Undead:** OSE uses a 2d6 table cross-referenced by Cleric level and undead HD. OSwR uses a flat DC 12 check with HD thresholds for effect.

**AC System:** OSE uses descending AC (lower is better) or ascending as an option. OSwR uses ascending AC exclusively, matching 5e.

**Spell Slots vs Memorization:** OSE Magic-Users prepare specific spells into slots (two Sleep means casting Sleep twice). OSwR uses 5e-style slots - prepare a list, spend slots flexibly.

**Hit Dice for HP:** OSE rolls HD at each level (d8 for Fighter). OSwR does the same but offers the option to take the average, reducing variance.

**Multiclassing:** OSE doesn't have multiclassing (demihumans were the multi-role option). OSwR allows multiclassing at odd levels, closer to AD&D's approach.

---

## Why Feats Cost Gold?

In 5e, you level up and get your features automatically. In OSwR, levelling grants the *capacity* for new abilities - you must still pay gold and spend time to unlock them.

**The reasoning:**

1. **Gold sinks matter.** Without ways to spend treasure, gold piles up pointlessly. Training costs keep gold valuable at every level.

2. **Fiction follows.** Your Fighter didn't just wake up knowing Shield Master. They spent a week drilling, bought practice equipment, maybe hired a sparring partner. The gold represents that.

3. **Different classes, different pressures.** Magic-Users spend gold on spell research. Fighters spend it on feats. The system naturally creates different economic priorities without forcing it.

4. **Party dynamics.** A Fighter who carouses (spending gold for XP) might level faster than a Magic-User saving for research. That's fine - the Fighter becomes a better bodyguard for the squishy wizard. Everyone benefits.

---

## Why 1 GP = 1 XP?

This is the classic OSR ratio, and it's not arbitrary.

**Emergent gameplay.** When treasure is the primary XP source, players pursue treasure. They sneak past the dragon because fighting is risky and the hoard is what matters. They negotiate with goblins because dead goblins don't lead to treasure rooms. The *system* rewards clever play - the Referee doesn't have to decide what counts as "clever."

**Player-driven.** With milestone or story XP, the Referee controls advancement. With treasure XP, the players control it. Find more treasure, level faster. The world contains the rewards; players decide how to get them.

**Module compatibility.** Decades of published adventures have treasure placed assuming 1 GP = 1 XP. OSwR can use those adventures unchanged.

---

## Why Monster XP = HD² × 10?

This creates a smooth curve where tougher monsters are worth significantly more, but treasure remains the primary XP source.

| HD | XP |
|---:|---:|
| 1 | 10 |
| 3 | 90 |
| 5 | 250 |
| 10 | 1,000 |

A goblin (HD 1) is worth 10 XP. A dragon (HD 10) is worth 1,000 XP. But the dragon's *hoard* might be worth 10,000+ XP. The maths reinforce the play philosophy: treasure matters more than kills.

---

## Why Research Is Expensive?

Spell research costs 700 gp per week and requires an INT check. Failed weeks lose time AND half the gold. This is intentionally harsh.

**The world is the better deal.** Finding a scroll in a dungeon costs only the copying fee (100 gp/tier). Research is the fallback when you can't find what you need. This encourages exploration and rewards player resourcefulness.

**Magic-Users are powerful.** By tier 5-6, spells reshape reality. That power should be earned through adventure, not bought in a library. Research exists so wizards always have a path forward - but it shouldn't be the easy path.

---

## Why Carousing?

Carousing lets players convert gold directly to XP by spending it on revelry. This solves several problems:

1. **Gold accumulation.** Without spending, treasure becomes meaningless numbers. Carousing gives it somewhere to go.

2. **Different advancement strategies.** A Fighter who carouses and a Magic-User who saves for research will level at different rates. This is intentional - it creates party dynamics.

3. **Story generation.** The mishap table creates situations. Gambling debts, new enemies, embarrassing tattoos, unexpected windfalls. Carousing turns downtime into adventure hooks.

---

## Why Cleric Tithes?

Magic-Users pay for every spell - 100 gp to copy, 700+ gp to research. Clerics receive their spells through divine connection. Without an equivalent cost, Clerics would have a massive economic advantage.

**The solution:** Clerics must tithe 10% of all treasure to maintain divine favour. This creates a gold sink that scales with success and fits the fiction of divine service.

**Hallowed vs Druidic:** Hallowed Clerics give to their temple. Druidic Clerics return wealth to nature - offerings at sacred sites, releasing animals, burning sacrifices, feasting communities. Same mechanical effect, different fiction.

---

## Why "Overcome" Instead of "Kill"?

Monster XP is earned when you "overcome" a threat - which includes defeating, outsmarting, driving off, or otherwise neutralising it.

**Combat is not the only solution.** Tricking the ogre into leaving, negotiating safe passage with the bandits, or locking the gelatinous cube in a room all count as overcoming the threat. The XP reward is the same.

**This matches the play philosophy.** If we only rewarded kills, players would fight everything. But OSwR wants players to think, negotiate, and avoid unnecessary risks. The XP rules support that.

---

## On Bounded Accuracy

OSwR uses the 5e principle of bounded accuracy: numbers stay small, bonuses don't inflate wildly with level, and a +1 always matters.

**Why keep it?** It works. Low-level threats remain relevant. High-level characters are powerful but not invincible. The maths are simple and the probability curves are intuitive.

**The trade-off:** Characters don't feel superheroic at high levels the way they do in 5e. That's intentional. OSwR is about dangerous adventures, not power fantasies.

---

## On The Four Tiers

OSwR roughly divides play into tiers:

| Tier | Levels | Play Style |
|------|--------|------------|
| Novice | 1-3 | Fragile, local, learning the world |
| Journeyman | 4-6 | Competent, regional, taking on serious threats |
| Veteran | 7-9 | Powerful, famous, shaping events |
| Name Level | 10-12 | Domain play, legacy, shaping the world |

This isn't explicit in the rules, but it's implicit in the pacing and costs. The game shifts as characters grow - from "survive the dungeon" to "what kind of lord will you be?"

---

## Why Experts Pick from Two Lists

Experts start with 6 feats and gain +1 at odd levels. But the Expert feat list only has ~19 options. By level 11, they'd run out of meaningful choices.

**The solution:** Experts can pick from Expert OR General feats. This fits their identity as generalists - versatile characters who dabble in everything. The larger combined pool (60+ feats) gives them real choices at every level.

**Why not just add more Expert feats?** That's padding. The Expert fantasy is "jack of all trades," not "has their own giant list." Letting them dip into General captures the archetype better than inventing narrow feats to fill a quota.

---

## Why Brawler Scales

Brawler grants unarmed damage that scales: 1d4 → 1d6 (level 5) → 1d8 (level 9).

**The problem it solves:** Without scaling, monk-style builds fall behind weapon users at higher levels. A Fighter with a longsword does 1d8 damage forever. An unarmed character stuck at 1d4 feels weak.

**Why not just use weapons?** Some players want unarmed builds. The system shouldn't punish that - it should make it viable without making it better than armed combat.

**Why in General, not Fighter?** Both Fighter monks (combat focus) and Expert monks (agility/skill focus) should be buildable. Putting Brawler in General enables both paths.

---

## Why Turn Undead Uses a Flat DC

Turn Undead requires a Normal (DC 12) WIS check. The power scales through HD thresholds, not DC increases.

**The design:**
- Affect up to 2d6 + PB Hit Dice of undead
- Destroy if HD ≤ level − 3
- Turn if HD ≤ level + 1
- No effect if HD > level + 1

**Why flat DC?** Simplicity. Players remember "DC 12" easily. The HD thresholds handle scaling - a level 1 Cleric can turn weak undead, a level 10 Cleric destroys them and turns stronger ones.

**Why level − 3 for destroy?** Destroying undead should feel earned. A level 1 Cleric shouldn't instantly vaporise skeletons. At level 4, they can destroy 1 HD undead. This creates a meaningful progression.

---

## What's Still Being Figured Out

**Multiclassing rules.** We know it happens at odd levels, but the full rules (HP calculation, save proficiencies, spell slot stacking) need writing.

**Domain play.** Stronghold costs, army management, domain income. The bones are there; the flesh isn't.

---

## Sections To Write

*These placeholders ensure every major system gets explained. Fill in during editing passes.*

### Character Creation
- [ ] **Why Backgrounds Work This Way** - Skills as narrative, not mechanical lists
- [ ] **Why Hindrances?** - Optional flaws for bonus feats

### Equipment & Resources
- [ ] **Why Slot-Based Encumbrance?** - Simplicity over pound-counting
- [ ] **Why Provisions?** - Abstract resource vs tracking rations
- [ ] **Why Equipment Kits?** - Speed up character creation

### Combat
- [ ] **Why Side-Based Initiative?** - Group action vs individual rolls
- [ ] **Why Death Saves Work This Way** - Stakes without instant death
- [ ] **Why No Opportunity Attacks?** - Movement freedom in OSR play

### Rests & Recovery
- [ ] **Why Two Rest Types?** - Short vs Long, when HD refresh
- [ ] **Why Fatigue Matters?** - Pressure without death spirals

### Exploration
- [ ] **Why Turns & Rounds?** - Time as resource
- [ ] **Why Random Encounters?** - Pressure that drives decisions
- [ ] **Why Light Rules Matter?** - Darkness as gameplay

### Magic
- [ ] **Why Spell Slots (Not Points)?** - Flexibility vs Vancian
- [ ] **Why Six Spell Tiers?** - Pacing power growth
- [ ] **Why Spellbooks Cost Gold?** - Knowledge as treasure
- [ ] **Why Boostable Spells?** - Resource decisions for casters

### Social & Hirelings
- [ ] **Why 2d6 Reaction Rolls?** - Bell curve social encounters
- [ ] **Why Morale Checks?** - Monsters that flee
- [ ] **Why Retainer Rules?** - Henchmen as gameplay

### Referee Tools
- [ ] **Why These Difficulty Tiers?** - Easy/Normal/Hard at 8/12/16

---

## Feedback Welcome

This is an alpha. Things will change. If something doesn't work at your table, I want to know.

The goal is a game that delivers on its promise: the mechanical familiarity of 5e with the emergent, player-driven adventure of old-school play.

— Damien
