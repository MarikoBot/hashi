import { InstanceValidator } from '../shared';
/**
 * All the string type validators.
 */
export declare const StringValidator: {
    readonly [validatorName: string]: InstanceValidator | ((...args: any[]) => InstanceValidator);
};
/**
 * All the regular expressions for the string validator.
 */
export declare const StringValidatorRegExp: {
    readonly [validatorName: string]: RegExp;
};
