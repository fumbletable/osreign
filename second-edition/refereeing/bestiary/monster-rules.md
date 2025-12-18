---
title: Monster Rules
layout: default
parent: Bestiary
grand_parent: Refereeing
nav_order: 1
---

# Monster Rules

How to read stat blocks and run creatures at your table.

---

## Stat Block Format

```
## Monster Name
**HD X | AC Y | HP Z** | [combat-critical tags]<br>
Atk attacks (damage) | Mv Speed | Ml # | XP ##<br>
Special abilities (DC # STAT or effect).<br>
Flavour text—what it looks like, where it lives, how it behaves.
```

**Line 1:** Name as heading (linkable anchor)
**Line 2:** The survival trio—HD, AC, HP—bolded. Combat-critical tags (Darkvision, Immune, Regenerate, Incorporeal) follow.
**Line 3:** What it does to you (attacks), then secondary info (movement, morale, XP).
**Line 4:** Special abilities—the mechanics you need mid-combat.
**Line 5:** Flavour—what it is. Skip this line during combat, but it's there for prep and player questions.

---

## Derived Stats

Everything flows from **Hit Dice (HD)**:

| Stat | Derivation |
|------|------------|
| **Attack Bonus** | = HD |
| **HP** | = HD × 4 (or roll d8s per HD) |
| **Save Bonus** | = HD ÷ 2 (round up), or HD if excellent, 0 if terrible |
| **XP** | = HD² × 10 (shown in stat block) |
| **Save DC** | HD 1-4: Easy (DC 8) / HD 5-8: Normal (DC 12) / HD 9-12: Hard (DC 16) / HD 13+: Extreme (DC 20) |

---

## Movement

- **Slow** - 15'
- **Normal** - 30'
- **Fast** - 45'

Additional modes noted after: Fly, Swim, Climb, Burrow

---

## Morale (Ml)

Not everything fights to the death. When the situation turns grim, creatures may flee, surrender, or break.

### When to Check

Roll morale when:

- **First blood:** The first ally falls
- **Half down:** Half the group is out of the fight
- **Leader killed:** The boss, champion, or commander drops
- **Overwhelming odds:** Reinforcements arrive, or the situation shifts dramatically against them

The Referee may also call for a check when something terrifying happens (dragon breathes fire, magic backfires spectacularly, etc.).

### The Roll

Roll **2d6** and compare to the creature's **Morale score (Ml)**.

| Result | Outcome |
|--------|---------|
| **Over Ml** | They break — flee, surrender, or scatter |
| **Equal or under** | They hold — fight continues |

Creatures with **Ml 12** never check morale — they fight until destroyed (golems, demons, the utterly devoted).

### Morale Scores

| Ml | Typical Creatures |
|---:|-------------------|
| 2 | Cowards, non-combatants forced to fight |
| 5 | Poorly motivated, mercenaries with no stake |
| 7 | Average — goblins, bandits, hired guards |
| 9 | Disciplined — trained soldiers, pack predators |
| 10 | Fanatics, apex predators, undead |
| 12 | Fearless — never flee (golems, demons, the utterly devoted) |

### What Happens When They Break?

The Referee decides based on the creature and situation:

- **Flee** — run for the nearest exit, drop heavy items
- **Surrender** — throw down weapons, beg for mercy
- **Scatter** — each creature runs in a different direction
- **Fighting retreat** — back away while defending, looking for escape

Intelligent creatures may negotiate. Mindless creatures may simply stop fighting and wander. Animals bolt.

### Pursuing Fleeing Enemies

If the party pursues:

- **Faster than the enemy:** Catch them automatically
- **Same speed:** Contest — DEX check vs DEX, or the Referee rules based on terrain
- **Slower:** They escape unless the party has ranged attacks or other advantages

Fleeing creatures may lead pursuers into traps, ambushes, or their lair.

---

## Tags

Tags appear on the stat line only when they affect combat decisions. Flavour tags (Mindless, Cowardly, Undead) are implied by the description or handled in special abilities.

### Combat-Critical Tags

| Tag | Rule |
|-----|------|
| **Darkvision** | Sees in darkness |
| **Blindsight** | Senses without sight (vibration, echolocation) |
| **Tremorsense** | Detects movement through ground |
| **Incorporeal** | Only harmed by silver or magic |
| **Regenerate X** | Recovers X HP per round |
| **Immune: X** | Takes no damage from X |
| **Resist: X** | Half damage from X |
| **Shapechanger** | Can alter form |

### Tags Implied by Description

These don't need a tag line—the description handles them:

- **Undead** — Immune to poison, charm, sleep, fear (mentioned in abilities if relevant)
- **Mindless** — Can't be reasoned with (obvious from behaviour)
- **Cowardly/Fearless** — Reflected in Morale score
- **Swarm** — Half damage from single-target attacks (noted in abilities)

---

## Converting OSR/TSR Monsters

On-the-fly conversion:

1. **HD** - Use as-is (round fractional HD)
2. **AC** - Use ascending AC if given, or convert (descending AC 9 = ascending AC 10)
3. **HP** - HD × 4, or roll d8s
4. **Attacks** - Use damage dice as listed
5. **Morale** - Use as-is (2d6 scale)
6. **Special abilities** - Note in plain English with save type and DC from HD

That's it. No other conversion needed.

---

## Example Stat Blocks

## Goblin
**HD 1 | AC 13 | HP 4** | Darkvision<br>
Atk weapon (d6) | Mv Normal | Ml 7 | XP 10<br>
Sunlight Sensitivity: SETBACK in bright light.<br>
Small green-skinned raiders. Attack in swarms, flee when outmatched.

---

## Ghoul
**HD 2 | AC 13 | HP 8** | Darkvision<br>
Atk 2 claws (d3), bite (d4) | Mv Normal | Ml 9 | XP 40<br>
Paralysing touch (DC 8 STR or paralyzed 3d6×10 minutes). Elves immune.<br>
Grave-stench and too-long fingers. Once human, now endlessly hungry.

---

## Basilisk
**HD 6 | AC 15 | HP 24** | Darkvision<br>
Atk bite (d10) | Mv Slow | Ml 9 | XP 360<br>
Petrifying gaze (DC 12 CON or turned to stone). Fighting blind = SETBACK.<br>
Eight-legged reptile with dead white eyes. Lairs in ruins, surrounded by statues of the unfortunate.

---

## Troll
**HD 6 | AC 15 | HP 24** | Darkvision | Regenerate 3<br>
Atk 2 claws (d6), bite (d10) | Mv Normal | Ml 10 | XP 360<br>
Fire or acid stops regeneration.<br>
Rubbery green flesh, long arms, black eyes. Remembers everyone who hurt it.

---

## Rust Monster
**HD 5 | AC 17 | HP 20** | Darkvision<br>
Atk antennae (special) | Mv Normal | Ml 7 | XP 250<br>
Touch rusts metal instantly. Magic items: DC 12, +2 per +1 bonus, or destroyed.<br>
Lobster-like scavenger. Loves the taste of iron. Harmless if you're naked.

---

## Dragon
**HD 10 | AC 19 | HP 40** | Darkvision | Immune: Fire<br>
Atk 2 claws (d8), bite (3d6) | Mv Normal, Fly Fast | Ml 10 | XP 1000<br>
Breath weapon (DC 16 DEX or 10d6 fire, 90' cone).<br>
Ancient, cunning, and endlessly greedy. Enjoys flattery almost as much as gold.
