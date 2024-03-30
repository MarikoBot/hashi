import { ChatInputCommandInteraction, Collection, Snowflake } from 'discord.js';
import { Validators } from '../decorators';
import { InstanceValidator } from '../decorators/shared';
import { InterferingQueueElement } from './shared';

/**
 * The main class who manages the active cool downs for commands.
 */
export class InterferingManager {
  /**
   * The collection of the current cool downs.
   */
  @((<(arg: typeof Collection) => InstanceValidator>Validators.ObjectValidator.IsInstanceOf)(Collection))
  public readonly queue: Collection<Snowflake, InterferingQueueElement[]> = new Collection();

  /**
   * The constructor of the interfering manager.
   */
  constructor() {}

  /**
   * Register an interfering command when this command is triggered.
   * @param userId The user id of the command author.
   * @param commandName The name of the command.
   * @param interaction The interaction id.
   * @returns Nothing.
   */
  public registerInterfering(userId: Snowflake, commandName: string, interaction: ChatInputCommandInteraction): void {
    const currentCoolDowns: InterferingQueueElement[] = this.values(userId);

    currentCoolDowns.push([commandName, interaction]);

    this.queue.set(userId, currentCoolDowns);
  }

  /**
   * Returns all the interfering commands for a specified user.
   * @param userId The user id to search for.
   * @param commands The names of the commands to filter by.
   * @returns The full list of the user cool downs.
   */
  public values(userId: Snowflake, ...commands: string[]): InterferingQueueElement[] {
    const currentInterfering: InterferingQueueElement[] | [] = this.queue.get(userId) || [];

    if (commands.length > 0) {
      return currentInterfering.filter((queueElement: InterferingQueueElement): boolean =>
        commands.some((cmd: string) => queueElement[0].startsWith(cmd)),
      );
    }
    return currentInterfering;
  }

  /**
   * Removes an interfering commands. If a name is passed, remove all the commands with that name.
   * If an id is passed, remove the command with the same interaction id.
   * @param userId The user id to search for.
   * @param key The value to search for; either the name of the command or the interaction id.
   * @returns Nothing.
   */
  public removeInterfering(userId: Snowflake, key: string | Snowflake): void {
    const currentInterfering: InterferingQueueElement[] = this.values(userId);

    this.queue.set(
      userId,
      currentInterfering.filter((queueElement: InterferingQueueElement): boolean => {
        return queueElement[1].id !== key;
      }),
    );
  }
}
