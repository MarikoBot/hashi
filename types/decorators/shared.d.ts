/**
 * The function that returns if a value is a constructor or a constructed.
 * @param value The value to check.
 * @returns If the value is a constructor.
 */
export declare function isConstructor(value: any): boolean;
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
