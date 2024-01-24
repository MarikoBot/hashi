import { User } from 'discord.js';

/**
 * All the array type validators.
 */
export class ArrayValidator {
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
}
