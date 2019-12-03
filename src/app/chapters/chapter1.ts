import { Chapter, CharacterAction, FailureOptions, SuccessOptions } from "../models/chapters";
import { Weapon, Armor, Monster, Warrior, Hero } from "../models/characters";
import { RaceOptions, ClassOptions, GenderOptions } from '../models/character-options';
import { Chapter2 } from './chapter2';

export const Chapter1: Chapter = {
    story: [
        `You enter the woods, chasing after the goblin who stole your father's sword. You lose sight of them in the thick woods and begin to creep forward, relying on your ears to warn you of danger and hopefully to locate the theiving the goblins. And finally to find the stolen sword.  `,
        `You found the first goblin in the forest and you have 3 actions to choose. The choice is yours so let's start the game. `
    ],

    options: [
        CharacterAction.attack,
        CharacterAction.sneak,
        CharacterAction.persuade
    ],
    
    enemyParty: [
        new Monster("Goblin", 5, {attack: 2, sneak: 0, persuade: 0}, {attack: 10, sneak: 10, persuade: 10}, 1, 7, "../../assets/org.png")
    ],
    sneakPersuadeFail: CharacterAction.attack,
    ifFail: FailureOptions.nextChapter,
    ifSucceed: [
        SuccessOptions.rewardExperience,
        SuccessOptions.rewardEquipment,
        SuccessOptions.addHeroToParty
    ],
    rewards: {
        experience: 500,
        equipment: [new Weapon("Rusty Sword", 1, 6)],
        newHero:  new Warrior("Benjamin", GenderOptions.male, RaceOptions.elf, 1, 10, {attack: 2, sneak: 1, persuade: 1, intelligence:1}, new Weapon("Dagger", 1, 4), new Armor("Clothes", 0))
    },
    nextChapter: Chapter2
}