/**
 * All the string type validators.
 */
export declare class StringValidator {
    /**
     * The valid regular expression for an id.
     */
    static readonly validIdRegExp: RegExp;
    /**
     * The valid regular expression for a primary keys set.
     */
    static readonly validPrimaryKeysRegExp: RegExp;
    /**
     * The valid regular expression for a version.
     */
    static readonly validVersionRegExp: RegExp;
    /**
     * Verify if a string is not empty.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static NotEmpty(target: Object, key: string): void;
    /**
     * Verify if a string respects the syntax for an id.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static ValidId(target: Object, key: string): void;
    /**
     * Verify if a string respects the syntax for a set of primary keys.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static ValidPrimaryKeys(target: Object, key: string): void;
    /**
     * Verify if a string respects the syntax for a version.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static ValidVersion(target: Object, key: string): void;
}
