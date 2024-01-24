/**
 * All the object type validators.
 */
export declare class ObjectValidator {
    /**
     * Verify if the value is a dataMapDefinition object.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static IsDataMapDefinition(target: Object, key: string): void;
    /**
     * Verify if the value is an object string-dataMap.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static KeyDataMapPair(target: Object, key: string): void;
    /**
     * Verify if the value is an object string-functions[].
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static KeyFunctionPair(target: Object, key: string): void;
    /**
     * Verify if the value is an object string-object.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static KeyObjectPair(target: Object, key: string): void;
    /**
     * Verify if the value is an object string-service.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static KeyServicePair(target: Object, key: string): void;
    /**
     * Verify if the value is an object.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static Matches(target: Object, key: string): void;
}
