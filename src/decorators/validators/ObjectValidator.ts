import { DataMap, Service } from '../../base';

/**
 * All the object type validators.
 */
export class ObjectValidator {
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
   * Verify if the value is an object string-service.
   * @param target The class instance.
   * @param key The attribute to set.
   * @constructor
   */
  public static KeyServicePair(target: Object, key: string): void {
    let value: any;

    const setter = (newValue: any): void => {
      if (
        typeof newValue !== 'object' ||
        !Object.entries(newValue).every(
          ([_key, _value]: [string, unknown]): boolean => typeof _key === 'string' && _value instanceof Service,
        )
      )
        throw new Error(`The property ${target.constructor.name}.${key} must be an object string-service.`);
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
