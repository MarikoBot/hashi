import { Constructible, InstanceValidator } from '../shared';
/**
 * All the array type validators.
 */
export declare class ArrayValidator {
    /**
     * Verify if an array is composed only of a constructible class object.
     * @param constructible The class the value shall inherit.
     * @constructor
     */
    static OnlyConstructorOf(constructible: Constructible): InstanceValidator;
    /**
     * Verify if an array is composed only of objects.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static OnlyObjects(target: Object, key: string): void;
    /**
     * Verify if an array is composed only of enumeration values.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static OnlyEnumValues(target: Object, key: string): void;
    /**
     * Verify if an array is composed only of HashiErrors initials classes instances.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static OnlyHashiErrors(target: Object, key: string): void;
    /**
     * Verify if an array is composed only of users.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static OnlyUsers(target: Object, key: string): void;
}
