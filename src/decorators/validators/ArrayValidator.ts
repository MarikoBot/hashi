import { DiscordAPIError, DiscordjsError, User } from 'discord.js';
import { Constructible, InstanceValidator, isConstructor } from '../shared';

/**
 * All the array type validators.
 */
export class ArrayValidator {
  /**
   * Verify if an array is composed only of a constructible class object.
   * @param constructible The class the value shall inherit.
   * @constructor
   */
  public static OnlyConstructorOf(constructible: Constructible): InstanceValidator {
    return function (target: Object, key: string): void {
      let value: any;

      const setter = (newValue: any): void => {
        if (
          typeof newValue !== 'object' ||
          !isConstructor(value) ||
          (isConstructor(value) && newValue.prototype.name !== constructible.prototype.name)
        )
          throw new Error(
            `The property ${target.constructor.name}.${key} must be a constructor of ${constructible.prototype.name}.`,
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
   * Verify if an array is composed only of objects.
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static OnlyObjects(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (typeof newValue !== 'object' || !newValue?.every((v: any): boolean => typeof v === 'object'))
        throw new Error(`The property ${target.constructor.name}.${key} must be an object-only array.`);
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
   * Verify if an array is composed only of enumeration values.
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static OnlyEnumValues(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (
        typeof newValue !== 'object' ||
        !newValue?.every((v: any): boolean => typeof v === 'string' || typeof v === 'number')
      )
        throw new Error(`The property ${target.constructor.name}.${key} must be an enumeration-values-only array.`);
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
   * Verify if an array is composed only of HashiErrors initials classes instances.
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static OnlyHashiErrors(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (
        typeof newValue !== 'object' ||
        !newValue?.every(
          (v: any): boolean =>
            !(v instanceof Error) && !(v instanceof DiscordjsError) && !(v instanceof DiscordAPIError),
        )
      )
        throw new Error(
          `The property ${target.constructor.name}.${key} must be an HashiErrors-initials-classes-instances array.`,
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
   * Verify if an array is composed only of users.
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static OnlyUsers(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (typeof newValue !== 'object' || !newValue?.every((v: any): boolean => v instanceof User))
        throw new Error(`The property ${target.constructor.name}.${key} must be an User-only array.`);
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
