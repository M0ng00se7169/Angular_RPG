import { Chapter, CharacterAction, FailureOptions, SuccessOptions } from "../models/chapters";
import { Weapon, Armor, Monster, Warrior, Hero } from "../models/characters";
import { RaceOptions, ClassOptions, GenderOptions } from '../models/character-options';

export const Chapter2: Chapter = {
    story: [
        `You coped with the first fight, even though it was easy. As a reward, you get an ally and a new item of inventory. And then the opponents are waiting for you more seriously, so get ready better.`,
        `As usually you have 3 options to choose so the choice is yours. `,
        `May the force be with you!`
    ],

    options: [
        CharacterAction.attack,
        CharacterAction.sneak,
        CharacterAction.persuade
    ],
    
    enemyParty: [
        new Monster("Goblin", 5, {attack: 2, sneak: 0, persuade: 0}, {attack: 10, sneak: 10, persuade: 10}, 1, 3, "../../assets/org.png"),
        new Monster("Goblin", 7, {attack: 2, sneak: 0, persuade: 0}, {attack: 10, sneak: 10, persuade: 10}, 1, 3, "../../assets/org.png")
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
    nextChapter: null
}