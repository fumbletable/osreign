---
title: Monster Rules
layout: default
parent: Bestiary
grand_parent: Refereeing
nav_order: 1
---

# Monster Rules

---

## Stat Block Format

```
**Monster Name** (HD X) | XP ##
AC ## | HP ## | Mv Speed | Ml #
Atk attacks (damage)
{Tags}
Special abilities (STAT DC).
Flavour - one or two evocative lines.
```

---

## Derived Stats

Everything flows from **Hit Dice (HD)**:

| Stat | Derivation |
|------|------------|
| **Attack Bonus** | = HD |
| **HP** | = HD × 4 (or roll d8s per HD) |
| **Save Bonus** | = HD ÷ 2 (round up), or HD if excellent, 0 if terrible |
| **XP** | = HD² × 10 (shown in stat block) |
| **Save DC** | HD 1-4: DC 8 / HD 5-8: DC 12 / HD 9-12: DC 16 / HD 13+: DC 20 |

---

## Movement

- **Slow** - 15'
- **Normal** - 30'
- **Fast** - 45'

Additional modes noted after: Fly, Swim, Climb, Burrow

---

## Morale (Ml)

Monsters don't fight to the death. When the fight turns against them, roll **2d6** — if the result is **over** their Ml score, they flee or surrender.

See [Morale](../../players/rules/morale/) for full rules, triggers, and what happens when they break.

---

## Tags

Tags are shorthand. Most are self-explanatory. Tags with universal rules:

| Tag | Rule |
|-----|------|
| **{Undead}** | Immune to poison, charm, sleep, fear |
| **{Mindless}** | Mental saves = 0 |
| **{Incorporeal}** | Only harmed by silver or magic |
| **{Swarm}** | Half damage from single-target attacks |
| **{Regenerate X}** | Recovers X HP per round |

Descriptive tags need no rule: {Darkvision}, {Cowardly}, {Territorial}, {Greedy}, etc.

Parameterised tags: {Immune: Fire}, {Resist: Cold}, {Vulnerable: Fire}

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

**Goblin** (HD 1) | XP 10
AC 13 | HP 4 | Mv Normal | Ml 7
Atk weapon (d6)
{Darkvision} {Cowardly}
Small green-skinned raiders. Attack in swarms, flee when outmatched.

---

**Ghoul** (HD 2) | XP 40
AC 13 | HP 8 | Mv Normal | Ml 9
Atk 2 claws (d3), bite (d3)
{Undead} {Darkvision}
Paralyzing touch (CON 8, 2d4 rounds). Elves immune.
Grave-stench and too-long fingers. Once human, now endlessly hungry.

---

**Basilisk** (HD 6) | XP 360
AC 15 | HP 24 | Mv Slow | Ml 9
Atk bite (d10)
{Darkvision}
Petrifying gaze (CON 12 or stone). Fighting blind = SETBACK.
Eight-legged reptile with dead white eyes. Lairs in ruins, surrounded by statues of the unfortunate.

---

**Troll** (HD 6) | XP 360
AC 15 | HP 24 | Mv Normal | Ml 10
Atk 2 claws (d6), bite (d10)
{Darkvision} {Regenerate 3}
Fire or acid stops regeneration.
Rubbery green flesh, long arms, black eyes. Remembers everyone who hurt it.

---

**Rust Monster** (HD 5) | XP 250
AC 17 | HP 20 | Mv Normal | Ml 7
Atk antennae (special)
{Darkvision}
Touch rusts metal instantly. Magic items: save or destroyed.
Lobster-like scavenger. Loves the taste of iron. Harmless if you're naked.

---

**Dragon** (HD 10) | XP 1000
AC 19 | HP 40 | Mv Normal, Fly Fast | Ml 10
Atk 2 claws (d8), bite (3d6)
{Darkvision}
Breath weapon (DEX 16, fire, 90' cone, HD damage). {Immune: Fire}
Ancient, cunning, and endlessly greedy. Enjoys flattery almost as much as gold.
