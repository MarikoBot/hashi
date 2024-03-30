import { AnyCommandConstructor, HashiEvent, SuperModel } from '../root';
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
 * Represents a function returned for a validator decorator.
 * @param target The class instance.
 * @param key The attribute to set.
 * @constructor
 */
export type InstanceValidator = (target: Object, key: string) => void;
/**
 * Represents a function returned for an injector decorator.
 * @param target The class instance.
 * @constructor
 */
export type InstanceInjector = (target: Object) => void;
/**
 * Represents a deferred (with parameters) function returned for a decorator.
 * @param target The class instance.
 * @param key The attribute to set.
 * @constructor
 */
export type InstanceValidatorReturner = (...args: any[]) => InstanceValidator;
/**
 * The target type for the HashiEventInjector.
 */
export type HashiEventInjectorTarget = {
    new (): HashiEvent;
};
/**
 * The target type for the HashiCommandInjector.
 */
export type HashiCommandInjectorTarget<T extends AnyCommandConstructor = AnyCommandConstructor> = new (...args: any[]) => T;
/**
 * The target type for the SuperModelInjector.
 */
export type SuperModelInjectorTarget<T extends SuperModel = SuperModel> = new (...args: any[]) => T;
