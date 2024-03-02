import { BaseGuildTextChannel, BaseGuildVoiceChannel, ThreadChannel } from 'discord.js';
import { DataMap } from '../../base';
import { HashiMessageCommand, HashiSlashCommand, HashiSlashSubcommand, HashiSlashSubcommandGroup } from '../../root';
import { Constructable, InstanceValidator } from '../shared';

/**
 * All the object type validators.
 */
export class ObjectValidator {
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
   * Verify if the value is a dataMapDefinition object.
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static IsDataMapDefinition(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (
        typeof newValue !== 'object' ||
        !('name' in newValue) ||
        !('entry' in newValue) ||
        !('schema' in newValue) ||
        !('defaultValues' in newValue)
      )
        throw new Error(`The property ${target.constructor.name}.${key} must be a dataMapDefinition object.`);
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
   * Verify if the value is a class instance.
   * @param constructable The class the value shall inherit.
   * @constructor
   */
  public static IsInstanceOf(constructable: Constructable<any>): InstanceValidator {
    return function (target: Object, key: string): void {
      let value: any;

      const setter = (newValue: any): void => {
        if (typeof newValue !== 'object' || !(newValue instanceof constructable))
          throw new Error(
            `The property ${target.constructor.name}.${key} must be an instance of ${constructable.prototype.name}.`,
          );
        value = newValue;
      };

      Object.defineProperty(target, key, {
        get: (): typeof value => value,
        set: setter,
        enumerable: true,
        configurable: true,
      });
    };
  }

  /**
   * Verify if the value is an object string-dataMap.
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static KeyDataMapPair(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (
        typeof newValue !== 'object' ||
        !Object.entries(newValue).every(
          ([_key, _value]: [string, unknown]): boolean => typeof _key === 'string' && _value instanceof DataMap,
        )
      )
        throw new Error(`The property ${target.constructor.name}.${key} must be an object string-dataMap.`);
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
   * Verify if the value is an object string-functions[].
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static KeyFunctionPair(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (
        typeof newValue !== 'object' ||
        !Object.entries(newValue).every(
          ([_key, _value]: [string, unknown]): boolean => typeof _key === 'string' && typeof _value === 'function',
        )
      )
        throw new Error(`The property ${target.constructor.name}.${key} must be an object string-functions[].`);
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
   * Verify if the value is an object string-object.
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static KeyObjectPair(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (
        typeof newValue !== 'object' ||
        !Object.entries(newValue).every(
          ([_key, _value]: [string, unknown]): boolean => typeof _key === 'string' && typeof _value === 'object',
        )
      )
        throw new Error(`The property ${target.constructor.name}.${key} must be an object string-object.`);
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
   * Verify if the value is an object string-string[].
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static KeyStringArrayPair(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (
        typeof newValue !== 'object' ||
        !Object.entries(newValue).every(
          ([_key, _value]: [string, unknown]): boolean =>
            typeof _key === 'string' &&
            typeof _value === 'object' &&
            (<Array<any>>_value).every((v: any): boolean => typeof v === 'string'),
        )
      )
        throw new Error(`The property ${target.constructor.name}.${key} must be an object string-string[].`);
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
   * Verify if the value is an object.
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static Matches(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (typeof newValue !== 'object')
        throw new Error(`The property ${target.constructor.name}.${key} must be an object.`);
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
