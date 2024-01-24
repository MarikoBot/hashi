/**
 * All the string type validators.
 */
export class StringValidator {
  /**
   * The valid regular expression for an id.
   */
  private static readonly validIdRegExp: RegExp = /[a-zA-Z_0-9][a-zA-Z _0-9]{1,62}[a-zA-Z_0-9]/g;

  /**
   * The valid regular expression for a primary keys set.
   */
  private static readonly validPrimaryKeysRegExp: RegExp = /[a-zA-Z_0-9][a-zA-Z _0-9+]{1,62}[a-zA-Z_0-9]/g;

  /**
   * The valid regular expression for a version.
   */
  private static readonly validVersionRegExp: RegExp = /([0-9]+.){2}([0-9]+)(-[a-z]{2,})+/g;

  /**
   * Verify if a string is not empty.
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static NotEmpty(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (typeof newValue !== 'string' || newValue.trim() === '')
        throw new Error(`The property ${target.constructor.name}.${key} must be a non-empty string.`);
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
   * Verify if a string respects the syntax for an id.
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static ValidId(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (typeof newValue !== 'string' || newValue.match(StringValidator.validIdRegExp).join('') !== newValue)
        throw new Error(
          `The property ${target.constructor.name}.${key} must be a valid id string ` +
            `(${StringValidator.validIdRegExp.toString()}).`,
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
   * Verify if a string respects the syntax for a set of primary keys.
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static ValidPrimaryKeys(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (typeof newValue !== 'string' || newValue.match(StringValidator.validPrimaryKeysRegExp).join('') !== newValue)
        throw new Error(
          `The property ${target.constructor.name}.${key} must be a valid primary keys string ` +
            `(${StringValidator.validPrimaryKeysRegExp.toString()}).`,
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
   * Verify if a string respects the syntax for a version.
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static ValidVersion(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (typeof newValue !== 'string' || newValue.match(StringValidator.validVersionRegExp).join('') !== newValue)
        throw new Error(
          `The property ${target.constructor.name}.${key} must be a valid version string ` +
            `(${StringValidator.validVersionRegExp.toString()}).`,
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
