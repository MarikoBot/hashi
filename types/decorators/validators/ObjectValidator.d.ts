import { InstanceValidator } from '../shared';
/**
 * All the object type validators.
 */
export declare const ObjectValidator: {
    readonly [validatorName: string]: InstanceValidator | ((...args: any[]) => InstanceValidator);
};
