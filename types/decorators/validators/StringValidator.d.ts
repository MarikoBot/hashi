/**
 * All the string type validators.
 */
export declare class StringValidator {
    /**
     * The valid regular expression for an id.
     */
    private static readonly validIdRegExp;
    /**
     * The valid regular expression for a non-formatted text.
     */
    private static readonly validNonFormattedRegExp;
    /**
     * The valid regular expression for a primary keys set.
     */
    private static readonly validPrimaryKeysRegExp;
    /**
     * The valid regular expression for a version.
     */
    private static readonly validVersionRegExp;
    /**
     * Verify if a string is included into the HashiCommandType type.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static IsHashiCommandType(target: Object, key: string): void;
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
     * Verify if a value is a valid language id.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static ValidLanguage(target: Object, key: string): void;
    /**
     * Verify if a string respects the syntax for a non-formatted string.
     * @param target The class instance.
     * @param key The attribute to set.
     * @constructor
     */
    static ValidNonFormatted(target: Object, key: string): void;
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
