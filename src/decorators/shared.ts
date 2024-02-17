/**
 * The function that returns if a value is a constructor or a constructed.
 * @param value The value to check.
 * @returns If the value is a constructor.
 */
export function isConstructor(value: any): boolean {
  try {
    new new Proxy(value, { construct: () => ({}) })();
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Represents a constructable class.
 */
export interface Constructable<T extends object> {
  new (...args: any[]): T;
}

/**
 * Represents a constructible value.
 */
export type Constructible = new (...args: any[]) => any;

/**
 * Represents a function returned for a decorator.
 * @param target The class instance.
 * @param key The attribute to set.
 * @constructor
 */
export type InstanceValidator = (target: Object, key: string) => void;
