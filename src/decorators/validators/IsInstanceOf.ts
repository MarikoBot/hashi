import {
  BaseGuildTextChannel,
  BaseGuildVoiceChannel,
  ButtonInteraction,
  ChatInputCommandInteraction,
  Collection,
  ThreadChannel,
} from 'discord.js';
import { Model } from 'mongoose';
import {
  CoolDownManager,
  DataMapEntry,
  HashiClient,
  HashiMessageCommand,
  HashiSlashCommand,
  HashiSlashSubcommand,
  HashiSlashSubcommandGroup,
  InterferingManager,
} from '../../root';

/**
 * Returns if an attribute is an instance of a certain class.
 */
export class IsInstanceOf {
  /**
   * Verify if a value is a ButtonInteraction instance.
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static ButtonInteraction(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (typeof newValue !== 'object' || !(newValue instanceof ButtonInteraction))
        throw new Error(`The property ${target.constructor.name}.${key} must be an instance of ButtonInteraction.`);
      value = newValue;
    };

    Object.defineProperty(target, key, {
      get: (): typeof value => value,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  }

  /**
   * Verify if a value is a ChatInputCommandInteraction instance.
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static ChatInputCommandInteraction(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (typeof newValue !== 'object' || !(newValue instanceof ChatInputCommandInteraction))
        throw new Error(
          `The property ${target.constructor.name}.${key} must be an instance of ChatInputCommandInteraction.`,
        );
      value = newValue;
    };

    Object.defineProperty(target, key, {
      get: (): typeof value => value,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  }

  /**
   * Verify if a value is a Collection instance.
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static Collection(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (typeof newValue !== 'object' || !(newValue instanceof Collection))
        throw new Error(`The property ${target.constructor.name}.${key} must be an instance of Collection.`);
      value = newValue;
    };

    Object.defineProperty(target, key, {
      get: (): typeof value => value,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  }

  /**
   * Verify if a value is an CommandBlockValue initial type instance.
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static CommandBlockValueInitial(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (
        typeof newValue !== 'object' ||
        (!(newValue instanceof HashiMessageCommand) &&
          !(newValue instanceof HashiSlashCommand) &&
          !(newValue instanceof HashiSlashSubcommand) &&
          !(newValue instanceof HashiSlashSubcommandGroup))
      )
        throw new Error(
          `The property ${target.constructor.name}.${key} must be an instance of one of the CommandBlockValue initial type classes.`,
        );
      value = newValue;
    };

    Object.defineProperty(target, key, {
      get: (): typeof value => value,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  }

  /**
   * Verify if a value is an ContextChannel initial type instance.
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static ContextChannelInitial(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (
        typeof newValue !== 'object' ||
        (!(newValue instanceof BaseGuildTextChannel) &&
          !(newValue instanceof BaseGuildVoiceChannel) &&
          !(newValue instanceof ThreadChannel))
      )
        throw new Error(
          `The property ${target.constructor.name}.${key} must be an instance of one of the ContextChannel initial type classes.`,
        );
      value = newValue;
    };

    Object.defineProperty(target, key, {
      get: (): typeof value => value,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  }

  /**
   * Verify if a value is an CoolDownManager instance.
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static CoolDownManager(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (typeof newValue !== 'object' || !(newValue instanceof CoolDownManager))
        throw new Error(`The property ${target.constructor.name}.${key} must be an instance of CoolDownManager.`);
      value = newValue;
    };

    Object.defineProperty(target, key, {
      get: (): typeof value => value,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  }

  /**
   * Verify if a value is an DataMapEntry instance.
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static DataMapEntry(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (typeof newValue !== 'object' || !(newValue instanceof DataMapEntry))
        throw new Error(`The property ${target.constructor.name}.${key} must be an instance of DataMapEntry.`);
      value = newValue;
    };

    Object.defineProperty(target, key, {
      get: (): typeof value => value,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  }

  /**
   * Verify if a value is an HashiClient instance.
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static HashiClient(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (typeof newValue !== 'object' || !(newValue instanceof HashiClient))
        throw new Error(`The property ${target.constructor.name}.${key} must be an instance of HashiClient.`);
      value = newValue;
    };

    Object.defineProperty(target, key, {
      get: (): typeof value => value,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  }

  /**
   * Verify if a value is an InterferingManager instance.
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static InterferingManager(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (typeof newValue !== 'object' || !(newValue instanceof InterferingManager))
        throw new Error(`The property ${target.constructor.name}.${key} must be an instance of InterferingManager.`);
      value = newValue;
    };

    Object.defineProperty(target, key, {
      get: (): typeof value => value,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  }

  /**
   * Verify if a value is an Model instance.
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static Model(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (typeof newValue !== 'object' || !(newValue instanceof Model))
        throw new Error(`The property ${target.constructor.name}.${key} must be an instance of Model.`);
      value = newValue;
    };

    Object.defineProperty(target, key, {
      get: (): typeof value => value,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  }
}
