import { SuperModelInjectorTarget } from '../shared';
/**
 * The decorator to inject metadata into the constructor of an extension of SuperModel.
 * @param name The name of the super-SuperModel.
 * @returns The decorator.
 */
export declare function SuperModelInjector(name: string): (target: SuperModelInjectorTarget) => void;
