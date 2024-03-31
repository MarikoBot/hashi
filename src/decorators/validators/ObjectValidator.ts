import { BaseGuildTextChannel, BaseGuildVoiceChannel, ThreadChannel } from 'discord.js';
import { Constructable, InstanceValidator } from '../shared';

/**
 * All the object type validators.
 */
export const ObjectValidator: {
  readonly [validatorName: string]: InstanceValidator | ((...args: any[]) => InstanceValidator);
} = {
  /**
   * Verify if a value is an CommandGroupValue initial type instance.
   * @param hashiMessageCommand The first class constructor.
   * @param hashiSlashCommand The second class constructor.
   * @param hashiSlashSubcommand The third class constructor.
   * @param hashiSlashSubcommandGroup The fourth class constructor.
   */
  CommandGroupValueInitial: (
    hashiMessageCommand: Constructable<any>,
    hashiSlashCommand: Constructable<any>,
    hashiSlashSubcommand: Constructable<any>,
    hashiSlashSubcommandGroup: Constructable<any>,
  ): InstanceValidator => {
    return function (target: Object, key: string): void {
      let value: any;

      const setter = (newValue: any): void => {
        if (
          typeof newValue !== 'object' ||
          (!(newValue instanceof hashiMessageCommand) &&
            !(newValue instanceof hashiSlashCommand) &&
            !(newValue instanceof hashiSlashSubcommand) &&
            !(newValue instanceof hashiSlashSubcommandGroup))
        )
          throw new Error(
            `The property ${target.constructor.name}.${key} must be an instance of one of the CommandGroupValue initial type classes.`,
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
  },
  /**
   * Verify if a value is an ContextChannel initial type instance.
   * @param target The class instance.
   * @param key The attribute to set.
   */
  ContextChannelInitial: (target: Object, key: string): void => {
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
  },
  /**
   * Verify if the value is a dataMapDefinition object.
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  IsDataMapDefinition: (target: Object, key: string): void => {
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
  },
  /**
   * Verify if the value is a class instance.
   * @param constructable The class the value shall inherit.
   */
  IsInstanceOf: (constructable: Constructable<any>): InstanceValidator => {
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
  },
  /**
   * Verify if the value is an object string-dataMap.
   * @param dataMap The dataMap constructor.
   */
  KeyDataMapPair: (dataMap: Constructable<any>): InstanceValidator => {
    return function (target: Object, key: string): void {
      let value: any;

      const setter = (newValue: any): void => {
        if (
          typeof newValue !== 'object' ||
          !Object.entries(newValue).every(
            ([_key, _value]: [string, unknown]): boolean => typeof _key === 'string' && _value instanceof dataMap,
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
    };
  },
  /**
   * Verify if the value is an object string-functions[].
   * @param target The class instance.
   * @param key The attribute to set.
   */
  KeyFunctionPair: (target: Object, key: string): void => {
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
  },
  /**
   * Verify if the value is an object string-object.
   * @param target The class instance.
   * @param key The attribute to set.
   */
  KeyObjectPair: (target: Object, key: string): void => {
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
  },
  /**
   * Verify if the value is an object string-string[].
   * @param target The class instance.
   * @param key The attribute to set.
   */
  KeyStringArrayPair: (target: Object, key: string): void => {
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
  },
  /**
   * Verify if the value is an object string-superModelColumn.
   * @param superModelColumn The superModelColumn constructor.
   */
  KeySuperModelColumnPair: (superModelColumn: Constructable<any>): InstanceValidator => {
    return function (target: Object, key: string): void {
      let value: any;

      const setter = (newValue: any): void => {
        if (
          typeof newValue !== 'object' ||
          !Object.entries(newValue).every(
            ([_key, _value]: [string, unknown]): boolean =>
              typeof _key === 'string' && _value instanceof superModelColumn,
          )
        )
          throw new Error(`The property ${target.constructor.name}.${key} must be an object string-superModelColumn.`);
        value = newValue;
      };

      Object.defineProperty(target, key, {
        get: (): typeof value => value,
        set: setter,
        enumerable: true,
        configurable: true,
      });
    };
  },
  /**
   * Verify if the value is a class instance of a placeholder value.
   * @param arg The class constructor.
   * @param placeholder The placeholder constructor.
   */
  KindOfInstance: (arg: Constructable<any>, placeholder: Constructable<any>): InstanceValidator => {
    return function (target: Object, key: string): void {
      let value: any;

      const setter = (newValue: any): void => {
        if (
          typeof newValue !== 'object' ||
          !Object.entries(newValue).every(
            ([_key, _value]: [string, unknown]): boolean =>
              typeof _key === 'string' && (_value instanceof arg || _value instanceof placeholder),
          )
        )
          throw new Error(
            `The property ${target.constructor.name}.${key} must be an instance of ${arg.prototype.name} or a default placeholder.`,
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
  },
  /**
   * Verify if the value is an object.
   * @param target The class instance.
   * @param key The attribute to set.
   */
  Matches: (target: Object, key: string): void => {
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
  },
} as const;
