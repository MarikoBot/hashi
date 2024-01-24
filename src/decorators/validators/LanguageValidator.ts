import { Languages } from '../../base';

/**
 * Returns if an attribute is linked to a language.
 */
export class LanguageValidator {
  /**
   * Verify if a value is a valid language id.
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static IsValid(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (typeof newValue !== 'string' || !Object.keys(Languages).includes(newValue))
        throw new Error(
          `The property ${target.constructor.name}.${key} must be a valid language id: ${Object.keys(Languages).join(
            ', ',
          )}.`,
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
}
