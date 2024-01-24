/**
 * All the array type validators.
 */
export declare class ArrayValidator {
    /**
     * Verify if an array is composed only of users.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static OnlyUsers(target: Object, key: string): void;
    /**
     * Verify if an array is composed only of enumeration values.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static OnlyEnumValues(target: Object, key: string): void;
}
