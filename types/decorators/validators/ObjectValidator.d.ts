import { Constructable, InstanceValidator } from '../shared';
/**
 * All the object type validators.
 */
export declare class ObjectValidator {
    /**
     * Verify if a value is an CommandBlockValue initial type instance.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static CommandBlockValueInitial(target: Object, key: string): void;
    /**
     * Verify if a value is an ContextChannel initial type instance.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static ContextChannelInitial(target: Object, key: string): void;
    /**
     * Verify if the value is a dataMapDefinition object.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static IsDataMapDefinition(target: Object, key: string): void;
    /**
     * Verify if the value is a class instance.
     * @param constructable The class the value shall inherit.
     * @constructor
     */
    static IsInstanceOf(constructable: Constructable<any>): InstanceValidator;
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
     * Verify if the value is an object string-string[].
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static KeyStringArrayPair(target: Object, key: string): void;
    /**
     * Verify if the value is an object.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static Matches(target: Object, key: string): void;
}
