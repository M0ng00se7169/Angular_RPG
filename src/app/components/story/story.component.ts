import { Component } from '@angular/core';
import { GameControllerService } from '../../services/game-controller.service';
import { Router } from '@angular/router';
import { Hero, Monster } from '../../models/characters';
import { CharacterAction } from '../../models/chapters';

@Component ({
    selector: "story-component",
    templateUrl: "./story.component.html",
    styleUrls: ["./story.component.css"]
})

export class StoryComponent {
    constructor(private gameCotrollerService: GameControllerService,
        private router: Router) {}

    currentChapter = this.gameCotrollerService.currentChapter;
    heroParty: Hero[] = this.gameCotrollerService.heroParty;
    enemyParty: Monster[] = this.gameCotrollerService.enemyParty;
    
    actionDelay: number = this.gameCotrollerService.actionDelay;
    displayMessage: string = "";
    successMessages: string[] = [];
    showNextChapterButton: boolean = false;

    chooseAction(action: string): void {
        if (this.successMessages.length) {
            return;
        }

        this.displayMessage = `You decide to ${action}.`;
        setTimeout(() => {
            switch(action) {
                case CharacterAction.attack:
                    this.tryAttack();
                    break;
                case CharacterAction.sneak:
                    this.trySneak();
                    break;
                case CharacterAction.persuade:
                    this.tryPersuade();
                    break;
                case CharacterAction.doNothing:
                    this.tryDoNothing();
                    break;
                default:
                    console.log("Something went horribly wrong in story >> chooseAction")
            }
        }, this.actionDelay);
    }

    tryAttack(): void {
        this.gameCotrollerService.isFighting = true;
        this.router.navigateByUrl("/fight");
    }

    trySneak(): void {
        let sneakBarrier = 0;
        let sneakPower = 0;
        this.enemyParty.forEach(enemy => {
            sneakBarrier += enemy.barriers.sneak;
        });
        this.heroParty.forEach(hero => {
            sneakPower += hero.sneak();
        });
        if (sneakPower >= sneakBarrier) {
            this.displayMessage = `Your attempt at sneaking was a success!`;
            setTimeout(() => {
                this.onSuccess();
            }, this.actionDelay);
        } else {
            this.displayMessage = `Your attempt at sneaking was failure.`;
            setTimeout(() => {
                this.onSneakPersuadeFailure();
            }, this.actionDelay);
        }
    }

    tryPersuade(): void {
        let sneakBarrier = 0;
        let sneakPower = 0;
        this.enemyParty.forEach(enemy => {
            sneakBarrier += enemy.barriers.persuade;
        });
        this.heroParty.forEach(hero => {
            sneakPower += hero.persuade();
        });
        if (sneakPower >= sneakBarrier) {
            this.displayMessage = `Your attempt at persuation was a success!`;
            setTimeout(() => {
                this.onSuccess();
            }, this.actionDelay);
        } else {
            this.displayMessage = `Your attempt at persuation was failure.`;
            setTimeout(() => {
                this.onSneakPersuadeFailure();
            }, this.actionDelay);
        }
    }

    tryDoNothing(): void {
        this.displayMessage = `You decide to do nothing and move on.`;
        setTimeout(() => {
            this.nextChapter();
        }, this.actionDelay);
    }

    onSuccess(): void {
        this.successMessages = this.gameCotrollerService.encounterSuccess();
        this.showNextChapterButton = true;
    }

    onSneakPersuadeFailure(): void {
        switch(this.currentChapter.sneakPersuadeFail) {
            case CharacterAction.attack:
            default:
                this.displayMessage = `The enemy attacks you!`;
                setTimeout(() => {
                    this.tryAttack();
                }, this.actionDelay);
                break;    
            case CharacterAction.doNothing:
                this.displayMessage = `Your failure spoiled the opportunity and your party moves on.`;
                setTimeout(() => {
                    this.nextChapter();
                }, this.actionDelay);
                break;    
        }
    }

    nextChapter(): void {
        this.gameCotrollerService.nextChapter();
        this.currentChapter = this.gameCotrollerService.currentChapter;
        this.heroParty = this.gameCotrollerService.heroParty;
        this.enemyParty = this.gameCotrollerService.enemyParty;
        this.displayMessage = "";
        this.successMessages = [];
        this.showNextChapterButton = false;
    }
}