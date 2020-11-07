import { StateBehavior, StateMachineTargets } from "../statemachine";
import { Bot } from "mineflayer";

/**
 * This behavior will attempt to interact with the target block. If the target
 * block could not be interacted with for any reason, this behavior fails silently.
 */
export class BehaviorInteractBlock implements StateBehavior {
    readonly bot: Bot;
    readonly targets: StateMachineTargets;

    stateName: string = 'interactBlock';
    active: boolean = false;
    x: number = 0;
    y: number = 0;

    /**
     * Creates a new mine block behavior.
     * 
     * @param bot - The bot preforming the mining function.
     * @param targets - The bot targets objects.
     */
    constructor(bot: Bot, targets: StateMachineTargets) {
        this.bot = bot;
        this.targets = targets;
    }

    onStateEntered(): void {
        if (!this.targets.position)
            return;

        let block = this.bot.blockAt(this.targets.position);
        if (!block || !this.bot.canSeeBlock(block))
            return;

        this.bot.activateBlock(block);
    }
}
