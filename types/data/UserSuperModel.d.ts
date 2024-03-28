import { StructureColumnOrChild, SuperModel } from '../root';
/**
 // --- EXAMPLE --- //
 * An example of use case for the SuperModel.
 */
export declare class UserSuperModel extends SuperModel {
    /**
     * Definitions of the columns.
     */
    columns: StructureColumnOrChild;
    /**
     * Define the name of the model into the super constructor using default parameters.
     */
    constructor(name?: string);
}
