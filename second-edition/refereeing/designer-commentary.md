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

# Character Foundations

## Why Abilities (Not Scores + Modifiers)

In classic D&D and 5e, you roll 3d6 for a score (3-18), then look up a modifier (-4 to +4). OSwR skips the score entirely - you just record the modifier.

**Why?** The score is vestigial. In play, you only ever use the modifier. "I have 16 Strength" means nothing until converted to "+2" (5e) or "+2 to hit" (OSE). OSwR cuts the middleman.

**What about rolling?** You still roll 3d6 and use the table to find your ability. The process is identical - you just don't write down a number you'll never use again.

**Classic divergence:** OSE uses scores (3-18) with varying modifier scales. OSwR's unified -4 to +4 range is closer to 5e but simpler than both.

---

## Why Ancestry (Not Race)

Simple: "race" carries baggage. "Ancestry" describes what it actually is - where you come from, what you inherited.

**Mechanical change:** OSwR ancestries have 3 traits max (Humans get 2). One is marked "Essential" - the defining old-school ability (Dwarf stonecunning, Elf ghoul immunity, Halfling fearlessness). The others can vary for sub-ancestries.

**Classic divergence:** In OSE, demihuman races ARE classes. An Elf is a class, not an ancestry + class. OSwR separates these, allowing Dwarf Fighters, Elf Clerics, etc.

---

## Why Four Classes?

Classic D&D had fighters, magic-users, clerics, and thieves. OSwR has Fighter, Magic-User, Cleric, and Expert.

**Why not more?** Every additional class creates overlap, edge cases, and balance concerns. Four classes can cover any character concept when combined with backgrounds, feats, and multiclassing.

**Why "Expert" instead of "Thief"?** Thief implies criminality. Expert implies competence. A scout, diplomat, or artisan is an Expert. So is a thief. The name doesn't constrain the fiction.

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

# Equipment & Resources

## Why Weapon Tags?

Weapon tags give players tactical options without adding cognitive load. The design principle: tags must be either **conditional triggers** (happens automatically when X occurs) or **simple trades** (sacrifice one thing, get another).

**Cleave** (Greataxe, Greatsword): When you drop a foe to 0 HP, deal d4 to an adjacent enemy. No decision needed - it just happens. Rewards aggressive play and makes two-handers feel powerful against groups.

**Crush** (Mace, Maul): Trade your STR damage to knock the target prone. Simple choice: damage or control? No save, no slowdown.

**Hook** (Flail, Poleaxe, Sickle): Trade your STR damage to push or pull 5 ft. Battlefield positioning for tactical players.

**What we cut:** Earlier drafts had Armor-Piercing, Quiet, Parry, Accurate, Ready. Each failed the "earns its place" test:
- *Armor-Piercing*: Became the +1 on crossbows and shortsword - the bonus IS the benefit
- *Quiet*: Situational flavor, not a combat choice. Daggers are obviously quiet
- *Parry/Accurate/Ready*: Added complexity without interesting decisions

**The +1 pattern:** Shortsword (d6+1), Light Crossbow (d6+1), Heavy Crossbow (d8+1) all have a flat +1 to damage. For crossbows, this represents armor-piercing power - you get more damage but Loading means you can't fire every round. For shortsword, it's the premium over the cheaper Sickle (which has Hook instead).

---

## Why Armor Works This Way?

**Three tiers, clear trade-offs:**
- **Leather (AC 12 + DEX)**: Full mobility, any DEX bonus
- **Chain (AC 14 + DEX max 2)**: Solid protection, some mobility
- **Plate (AC 18)**: Best protection, no DEX, Stealth SETBACK, Bulky, expensive

**Why AC 18 for Plate?** Earlier drafts had AC 16, but that made Chain + high DEX strictly better. A character with DEX +2 in Chain gets AC 16 - same as Plate, but cheaper, lighter, quieter, and faster to don.

At AC 18, Plate is definitively the highest AC in the game. You pay for it (300 gp, STR 12, Bulky slot, Stealth penalty, 10 min to don), but you get something Chain can't match. Chain + Shield (AC 17) is competitive for those who want a hand free.

**Shield Sunder:** When you take damage, you can destroy your shield to reduce that damage to 0. This is a meaningful defensive choice - spend your shield to survive a big hit. Shields are cheap (7 gp), so it's not about resource hoarding. It's about dramatic moments: "The ogre's club crashes down - you raise your shield, which explodes into splinters, but you're alive."

---

## Why Supply (Not Rations)?

OSwR uses "Supply" as an abstract resource rather than tracking individual rations, waterskins, and bandages.

**What Supply represents:** Food, water, basic medical supplies, and general consumables. One unit covers a day of sustenance or one use of healing/recovery.

**Why abstract?** Tracking 14 rations, 3 waterskins, and 6 torches is bookkeeping without decisions. Supply simplifies: you have X uses, spend them as needed. The decision is when to use them, not whether you remembered to buy the right type.

**Where it's spent:**
- Breathers (1 Supply to heal or shake off Fatigue)
- Stabilizing dying allies (1 Supply)
- Daily sustenance (on wilderness expeditions)

**Why not "Provisions"?** We changed the name. "Provisions" sounds like food only. "Supply" better captures the abstraction—it's whatever consumable the situation demands.

---

# Core Mechanics

## Why EDGE/SETBACK (Not Advantage/Disadvantage)

5e's advantage system is elegant but binary: roll 2d20, take best/worst. You either have it or you don't, and multiple sources don't stack. That binary nature creates problems—if you have advantage from one source, additional advantages are worthless. Stacking circumstantial bonuses should *matter*.

**EDGE and SETBACK use 1d6.** EDGE adds 1d6 to your roll. SETBACK subtracts 1d6. They cancel one-for-one, but they also *stack*. Two sources of EDGE means +2d6. Being really well-prepared matters more than being slightly prepared.

**Why d6?** It feels different from the core d20. Rolling a d6 alongside your d20 has a tactile, additive quality that 2d20-keep-best lacks. The language is natural too: "take an edge" makes intuitive sense at the table.

**Classic divergence:** OSE has no advantage system. OSwR uses EDGE/SETBACK for situational modifiers that stack.

---

## Why Boost Dice?

Boost Dice started as physical d6s handed to players for doing cool things. The origin was simple: reward players at the table with something tangible they can immediately use.

**Reset each session.** You start with half your Proficiency Bonus in Boost Dice (minimum 1). They don't carry over—use them or lose them. This encourages spending rather than hoarding.

**The Referee gives more.** Play up your hindrances? Boost Die. Do something memorable? Boost Die. This creates a feedback loop: players engage with their characters, Referee rewards it, everyone has fun.

**Class-specific uses.** Each class spends Boost Dice differently:
- **Fighter:** Extra attack (aggressive, combat-focused)
- **Expert:** Roll 2d6 keep best (precision, reliability)
- **Cleric/Magic-User:** Trigger Boostable spell effects (resource multiplication)

**Why separate from EDGE?** EDGE is situational—the environment or circumstances give it to you. Boost Dice are earned through play and spent deliberately. They're a player resource, not a Referee ruling.

**Classic divergence:** This replaces 5e's Inspiration (which nobody remembers to use) with something visible, tactile, and tied to character identity.

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

## Why No Passive Checks?

5e has passive Perception (10 + modifier) for "always-on" awareness. We cut it.

**The problem:** Passive checks give the illusion of a system while the Referee is really just deciding. If your passive is 12 and the DC is 12, you notice. If the DC is 13, you don't. The Referee sets both numbers—they're deciding the outcome with extra steps.

**OSR philosophy:** If you don't say you're looking, you don't find it. Player engagement matters. "I search the room" should prompt description and decisions, not a number comparison.

**What replaces it:** Referee judgment. If the trap is obvious and the players are being careful, they notice. If it's hidden and they're rushing, they trigger it. If it's uncertain, call for a roll. No passive score needed.

---

# Combat

## Why Side-Based Initiative?

OSwR uses side-based combat with declare-then-resolve. This is inspired by Cairn and classic OSR games, not 5e's individual initiative.

**The flow:**
1. First contact: Each hero rolls d20 + DEX vs DC 12. Pass = act before enemies.
2. Heroes who passed declare actions, roll, and resolve.
3. All enemies declare and resolve.
4. All heroes declare and resolve.
5. Repeat steps 3–4 until combat ends.

**Why no individual initiative?** Rolling and tracking initiative for every combatant slows play without adding meaningful decisions. In 5e, initiative is often "roll high, act first, forget the number." Side-based combat removes that bookkeeping entirely.

**Why declare before rolling?** This is the key design choice. When everyone on a side declares their action before any dice are rolled, actions resolve simultaneously. You can't wait to see if the Fighter kills the goblin before deciding who to attack.

**What this enables:**
- **Faster play.** No initiative tracking, no "whose turn is it?"
- **Coordination matters.** "I'll hold the door while you grab the chest" requires trust—you're both committing.
- **No reactive optimization.** Players and enemies both commit before knowing outcomes. This matches the fiction of simultaneous combat better than sequential turns.

**The first-contact check.** The DEX check at the start determines whether you get a free swing before enemies act. Pass and your side gets a full action before any enemy moves. Fail and enemies go first—but then you join in with the other heroes. You don't "miss a turn"; the flow just starts with enemies instead of heroes.

**Classic divergence:** This matches Cairn's approach more than 5e's. OSE uses d6 group initiative (rerolled each round). OSwR's single first-contact check is simpler—one roll at the fight's start, then pure alternation.

---

## Why Opportunity Attacks Work This Way?

OSwR keeps opportunity attacks but adds a key restriction from the original OSwR: **you can't make an opportunity attack if you're already in melee with another creature.**

**The flow:**
- When a foe leaves your reach, you can make one free attack
- This doesn't use your turn—it's a bonus swing
- You can only make one opportunity attack per round

**The "engaged in melee" rule:**

This is the tactical piece. If the Fighter is toe-to-toe with an ogre, the Wizard can slip past that ogre without getting clubbed. The ogre is busy with the Fighter.

**Why this matters:**

1. **It's realistic.** If you're actively fighting someone, you can't also swing at someone walking past. Your attention is on the threat in front of you.

2. **Rewards positioning.** "I'll hold this one while you get past" becomes a real tactic. Fighters become battlefield controllers by engaging threats.

3. **Squishier characters can escape.** A Wizard with 4 HP shouldn't have to eat an opportunity attack just to reposition. If an ally is engaging the enemy, they're safe.

4. **Creates teamwork.** The rule naturally encourages coordination without requiring complex mechanics.

**One per round:** You get one opportunity attack per round, total. This prevents the "trigger five opportunity attacks by walking past five enemies" abuse while keeping the rule simple.

---

## Why Disengage Lets You Dash?

In OSwR, Disengage does two things: you move without provoking opportunity attacks, AND you can Dash afterwards.

**The problem being solved:** Characters should always be able to run from a fight. A Wizard with 4 HP facing an angry ogre needs an escape valve. If Disengage only prevents opportunity attacks but doesn't let you actually get away, you're still in reach next round.

**The solution:** Disengage + Dash as a single action. You safely extract AND create distance. This is the retreat option—use it when things go wrong.

**Why not make Dash a separate action?** Then retreating takes two turns (Disengage this turn, Dash next turn), during which the enemy can close the gap. The combined action makes retreat actually work.

**This is from the original OSwR.** The rule existed specifically to ensure players could always flee. Running away is cool—you get to fight another day. OSR play should reward knowing when to run.

---

## Why DEX Doesn't Add to Ranged Damage?

In OSwR, DEX adds to ranged attack rolls but NOT damage. Only melee (STR) and finesse (DEX choice) add ability to damage.

**The reasoning:**

1. **Range is already an advantage.** Archers attack from safety. Melee fighters take hits. The ranged character is already getting a benefit—they shouldn't also get bonus damage.

2. **Old-school feel.** Classic D&D didn't add DEX to ranged damage. A bow does its damage dice, period. The skill (DEX) helps you hit; the weapon does the hurting.

3. **Differentiation.** This makes the choice between ranged and melee meaningful. Want reliable damage? Get into melee with STR. Want safety? Stay back, but accept lower damage output.

4. **Finesse is the hybrid.** If you want DEX for damage, use a finesse weapon—but that means being in melee range. You're trading safety for the ability modifier.

**What this means in play:** A Fighter with STR +3 and a longsword does d8+3 damage. An Expert with DEX +3 and a shortbow does d6 damage (no bonus). The Fighter's damage is meaningfully higher, which compensates for the risk of being in melee.

**Future consideration:** A feat that adds DEX to ranged damage could work for dedicated archers (Fighter or Expert). This would be an opt-in specialisation rather than a default, preserving the base design while rewarding the archetype.

---

## Why Death & Dying Uses Fatigue?

5e's death saves are boring. Roll a d20, pass or fail, three strikes either way. There's no tension after the first roll—just waiting to see which side hits three first.

OSwR's death system uses 2d6 minus your Fatigue:

| Roll | What happens |
|------|--------------|
| 11+ | Back up with HP equal to CON or one Hit Die (your choice) |
| 10 | Stable—wake next turn at 1 HP |
| 5–9 | Still dying—roll again next round |
| 4 | Dead, but you get one heroic action first |
| 3– | Dead outright |

**Why this works:**

1. **Instant tension.** Every roll matters. You could die on your first death check—or heroically spring back up. No three-strike countdown.

2. **Fatigue integration.** The more battered you are, the harder it is to survive. A fresh character rolling 2d6 has good odds. A character at Fatigue 3 rolling 2d6−3? Much worse. This ties the death system to the rest of the game's attrition mechanics.

3. **The heroic death.** Rolling exactly 4 is rare, but it creates memorable moments. "You're dead, but you get one last action." That's the stuff stories are made of.

4. **Player choice on recovery.** When you roll 11+, you choose: CON (predictable) or Hit Die roll (potentially better, potentially worse). Even in recovery, there's a decision.

---

# Rests & Recovery

## Why Three Rest Types?

OSwR has Breathers, Night's Rest, and Safe Haven. Each serves a different purpose:

**Breather (10 minutes):** Quick recovery after a fight. Spend 1 Supply, choose to heal (1d4 + CON) OR shake off 1 Fatigue. If an ally helps you, you can do both. This creates decisions: heal HP or clear Fatigue? Help your friend or take your own Breather?

**Night's Rest (8 hours):** Spend Hit Dice to heal (roll + CON each), recover spell slots, remove 1-2 Fatigue depending on conditions. Hit Dice don't come back until Safe Haven—this is the key pressure point.

**Safe Haven (1d4+1 days):** Full reset. The variable duration matters: you can't plan exactly when you'll be ready. Sometimes the dungeon won't wait.

**Why not just Short/Long rest?** 5e's two-rest system encourages "adventuring day" pacing that doesn't fit dungeon crawling. Three tiers create more pressure: Breathers are quick but limited, Night's Rest costs Hit Dice you can't easily recover, and Safe Haven requires leaving the danger zone entirely.

---

## Why Fatigue Has Five Levels?

| Level | Effect |
|------:|--------|
| 1 | −1 to all checks and saves |
| 2 | −2 to all checks and saves |
| 3 | −3 to all checks and saves; Speed drops one step |
| 4 | −4 to all checks and saves; Speed drops to Slow |
| 5 | Incapacitated—can't act until you rest |

**Gradual pressure, not sudden death.** Fatigue accumulates from environmental stress (forced march, bad weather, sleeping in armor) and combat (dropping to 0 HP). The escalating penalties create tension without killing characters outright.

**Recovery is deliberate.** You can clear 1 Fatigue during a Breather (with a CON save), or 1-2 during Night's Rest depending on shelter. Full reset requires Safe Haven. This means Fatigue stacks up faster than it clears—exactly the pressure an OSR game needs.

---

## Why Dropping to 0 HP Causes Fatigue?

Getting knocked out should matter. In 5e, the optimal strategy is often to let allies drop, then heal them with 1 HP ("yo-yo healing"). There's no lasting consequence.

In OSwR, dropping to 0 HP triggers a CON save (DC 12) when you get back up—fail and you gain 1 Fatigue. This creates real stakes while still giving players some agency:

1. **Combat has lasting effects.** Even if you survive, you're weakened.
2. **Breather choices matter.** After a tough fight, do you heal HP or clear the Fatigue you just gained?
3. **Teamwork helps.** If an ally spends their Breather tending to you, you can do both.
4. **Attrition pressure.** Multiple knockdowns in a dungeon stack up, pushing parties toward retreat.

---

# Exploration

## Why 4-Hour Watches?

We use 4-hour watches (six per day) for wilderness exploration. Earlier drafts experimented with 6-hour watches (four per day), but we returned to the original design.

**Why 4-hour watches work better:**

1. **Hex alignment.** At Normal terrain speed, you cover 6 miles per watch — exactly one 6-mile hex. This clean 1:1 relationship makes hexcrawl navigation intuitive. "One watch, one hex" is easy to track and creates natural decision points.

2. **Meaningful choices.** Six watches per day gives players more granularity in how they spend their time. Travel three watches, hunt for two, rest for one. Or travel two, investigate a hex, forage, and rest two. The extra watches create more interesting daily planning.

3. **Activities scale properly.** Hunting takes two watches because tracking and killing game is serious work. Rest takes two watches because a proper night's sleep needs time. These durations feel right at 4 hours each — hunting is a half-day commitment, rest is a full night.

4. **Three travel watches is a full day.** At 4 hours each, three watches of travel is 12 hours of marching — an exhausting but realistic day's journey. Pushing to a fourth watch means forced march saves every hour.

**What we traded:** The simpler "four watches = four quarters of the day" mental model. But in practice, the hex alignment and activity granularity matter more than having a neat division of the day.

---

# Economy & Advancement

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

## Why "Overcome" Instead of "Kill"?

Monster XP is earned when you "overcome" a threat - which includes defeating, outsmarting, driving off, or otherwise neutralising it.

**Combat is not the only solution.** Tricking the ogre into leaving, negotiating safe passage with the bandits, or locking the gelatinous cube in a room all count as overcoming the threat. The XP reward is the same.

**This matches the play philosophy.** If we only rewarded kills, players would fight everything. But OSwR wants players to think, negotiate, and avoid unnecessary risks. The XP rules support that.

---

## Why Feats Cost Gold?

In 5e, you level up and get your features automatically. In OSwR, levelling grants the *capacity* for new abilities - you must still pay gold and spend time to unlock them.

**The reasoning:**

1. **Gold sinks matter.** Without ways to spend treasure, gold piles up pointlessly. Training costs keep gold valuable at every level.

2. **Fiction follows.** Your Fighter didn't just wake up knowing Shield Master. They spent a week drilling, bought practice equipment, maybe hired a sparring partner. The gold represents that.

3. **Different classes, different pressures.** Magic-Users spend gold on spell research. Fighters spend it on feats. The system naturally creates different economic priorities without forcing it.

4. **Party dynamics.** A Fighter who carouses (spending gold for XP) might level faster than a Magic-User saving for research. That's fine - the Fighter becomes a better bodyguard for the squishy wizard. Everyone benefits.

---

## Why Research Is Expensive?

Spell research costs 700 gp per week and requires an INT check at the end of the full research period to finalise the spell. Failure costs another week of work (700 gp) before you can attempt finalisation again.

**The world is the better deal.** Finding a scroll in a dungeon costs only the copying fee (100 gp/tier). Research is the fallback when you can't find what you need. This encourages exploration and rewards player resourcefulness.

**Magic-Users are powerful.** By tier 5-6, spells reshape reality. That power should be earned through adventure, not bought in a library. Research exists so wizards always have a path forward - but it shouldn't be the easy path.

---

## Why 100 gp/day for Magic?

Simple, memorable, scales naturally with time. A week of research = 7 days = 700 gp. No lookup tables needed.

This also makes finding spells in the world more valuable. Copying from a found scroll (100 gp/tier) is much cheaper than researching from scratch (700 gp/week + INT check). The economy rewards exploration.

---

## Why Carousing?

Carousing lets players convert gold directly to XP by spending it on revelry. This solves several problems:

1. **Gold accumulation.** Without spending, treasure becomes meaningless numbers. Carousing gives it somewhere to go.

2. **Different advancement strategies.** A Fighter who carouses and a Magic-User who saves for research will level at different rates. This is intentional—it creates party dynamics. The Fighter becomes a better bodyguard for the squishy wizard. Everyone benefits.

3. **Story generation.** The mishap table creates situations. Gambling debts, new enemies, embarrassing tattoos, unexpected windfalls. Carousing turns downtime into adventure hooks.

4. **The mishap curve.** The 2d6 table means hangover (7) is most common—roughly 17% of failed saves. The dramatic results (jail, windfalls) are rare but memorable. Most nights out end with a headache, not a crisis.

**Limits by settlement size.** You can only spend what the local economy can absorb. A village tavern can't handle 2,000 gp of revelry. This also encourages returning to larger towns—and creates reasons to explore the world.

---

## Why Pious Offerings?

It's the Cleric alternative to carousing. Fighters drink; Clerics pray. Same mechanical effect (gold → XP), different fiction.

Clerics who want to carouse still can—Pious Offerings is an option, not a requirement. But it gives divine characters a thematic way to convert wealth to advancement without rolling on the mishap table.

---

## Why Cleric Tithes?

Magic-Users pay for every spell - 100 gp to copy, 700+ gp to research. Clerics receive their spells through divine connection. Without an equivalent cost, Clerics would have a massive economic advantage.

**The solution:** Clerics must tithe 10% of all treasure to maintain divine favour. This creates a gold sink that scales with success and fits the fiction of divine service.

**Hallowed vs Druidic:** Hallowed Clerics give to their temple. Druidic Clerics return wealth to nature - offerings at sacred sites, releasing animals, burning sacrifices, feasting communities. Same mechanical effect, different fiction.

---

## Why Banking Has Fees?

Gold is heavy (100 coins = 1 slot). Players can't carry their wealth. Banking provides security but takes a cut—another gold sink that scales with success.

**The one-month rule:** Withdraw within a month, pay 10%. Leave it longer, withdraw free. This encourages adventuring over constant trips to the bank. Deposit your loot, go explore, come back when you need it.

---

## Why Temple Healing Costs Money?

Divine magic isn't free. Temple healing costs exist for several reasons:

1. **HP attrition stays meaningful.** If healing is cheap, damage doesn't matter—you just pay a few coins and you're fresh. Expensive healing means getting hurt has lasting consequences.

2. **Clerics in the party are valuable.** When temple healing costs 100+ gp, a Cleric who can heal for free is a major asset. This creates party composition incentives.

3. **Gold sink that scales.** Early characters might scrape together 100 gp for minor healing. High-level characters dropping 5,000 gp to raise the dead is still significant.

4. **Prevents the heal-and-return loop.** If adventurers could cheaply heal up and head straight back to the dungeon, the Safe Haven rest system loses its teeth. Expensive healing encourages proper recovery time.

**The pricing curve:** Base costs roughly follow Tier² × 100 gp (T1 = 100, T2 = 400, T3 = 900...), but we rounded to memorable numbers: 100, 200, 500, 1,000, 2,500, 5,000. The curve accelerates at higher tiers because world-altering magic *should* be expensive. Raising the dead at 2,500 gp is still a fortune for most parties; full restoration at 5,000 gp represents a major investment.

**Referees adjusting prices:** If you want stricter economics, the Tier² × 100 formula gives you a baseline. Double it for rare services or hostile temples. Halve it for faithful members or temples in the party's debt.

---

# Class-Specific Design

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

# Referee Tools

## Why This Stat Block Format?

Monster stat blocks went through several iterations. The final format prioritises GM usability at the table while preserving flavour for prep.

**The structure:**

```
## Monster Name
**HD X | AC Y | HP Z** | [combat-critical tags]
Atk attacks (damage) | Mv Speed | Ml # | XP ##
Special abilities (what it does).
Flavour text (what it is).
```

**Line 1 - Survival trio first.** HD, AC, HP are bolded and lead. These answer the immediate combat questions: "How tough is this?" Everything else flows from HD anyway (attack bonus, saves, damage scaling).

**Line 1 continued - Combat-critical tags inline.** Darkvision, Blindsight, Regenerate, Immune—things that change how you fight it. These sit right after the survival stats because they matter the moment initiative is rolled.

**Line 2 - What it does to you.** Attacks and damage first (the threat), then logistics (movement, morale, XP). Morale and XP are bookkeeping—important, but not mid-swing.

**Line 3 - Mechanics.** Special abilities, saves, conditions—the unique rules this creature brings. Written as plain English with save type and DC.

**Line 4 - Flavour.** What it looks like, where it lives, how it behaves. GMs can skip this line during combat, but it's there for prep and player questions ("What do I know about trolls?").

**Why separate mechanics from flavour?** Earlier drafts merged them. But at the table, you need different information at different times. During initiative: "It regenerates 3 HP/round." During roleplay: "Rubbery green flesh, long arms, remembers everyone who hurt it." Keeping them on separate lines lets GMs scan efficiently.

**What we cut:**

- **Flavour tags** like [Undead], [Mindless], [Cowardly]. If the description says "walking dead, tireless, hungry"—you don't need a tag saying [Undead]. Morale 12 means fearless; you don't need [Fearless].
- **Redundant immunities.** Undead immunity to poison/charm/sleep is standard. Only note exceptions or unusual immunities.
- **Excessive detail.** A basilisk doesn't need three sentences on petrification mechanics. "Petrifying gaze (CON 12 or stone)" is enough.

**The rhythm.** Each entry has the same beat: name, survival, attacks, mechanics, flavour. Once you've read a few, you know exactly where to look for any piece of information. Consistency aids usability more than any individual formatting choice.

---

# Divergences from OSE/Classic

Beyond the philosophical changes, here are specific mechanical divergences from Old-School Essentials and B/X:

**Saves:** OSE has 5 save categories (Death, Wands, Paralysis, Breath, Spells). OSwR uses 6 ability-based saves with proficiency, matching 5e's structure.

**Thief Skills:** OSE Thieves have percentage-based skills (Pick Locks 15%, Hide in Shadows 10%). OSwR Experts use feats - you either have the ability or you don't, with EDGE when applicable.

**Turn Undead:** OSE uses a 2d6 table cross-referenced by Cleric level and undead HD. OSwR uses a flat DC 12 check with HD thresholds for effect.

**AC System:** OSE uses descending AC (lower is better) or ascending as an option. OSwR uses ascending AC exclusively, matching 5e.

**Spell Slots vs Memorization:** OSE Magic-Users prepare specific spells into slots (two Sleep means casting Sleep twice). OSwR uses 5e-style slots - prepare a list, spend slots flexibly.

**Hit Dice for HP:** OSE rolls HD at each level (d8 for Fighter). OSwR does the same but offers the option to take the average, reducing variance.

**Multiclassing:** OSE doesn't have multiclassing (demihumans were the multi-role option). OSwR allows multiclassing at odd levels, closer to AD&D's approach.

---

# Still Being Figured Out

**Multiclassing rules.** We know it happens at odd levels, but the full rules (HP calculation, save proficiencies, spell slot stacking) need writing.

**Domain play.** Stronghold costs, army management, domain income. The bones are there; the flesh isn't.

---

# Sections To Write

*These placeholders track which commentary sections still need writing.*

### Character Creation
- [ ] **Why Backgrounds Work This Way** - Skills as narrative, not mechanical lists
- [ ] **Why Hindrances?** - Optional flaws for bonus feats

### Equipment & Resources
- [ ] **Why Slot-Based Encumbrance?** - Simplicity over pound-counting
- [ ] **Why Equipment Kits?** - Speed up character creation

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
