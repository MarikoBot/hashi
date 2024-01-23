import { DataMap } from '../../base';
import { DataMapEntry } from '../../root';
import { AutomaticRoleType } from '../../services/types';
/**
 * The automatic-role entry class.
 */
export declare class AutomaticRoleEntry extends DataMapEntry<AutomaticRoleType> {
    /**
     * The constructor for each entry of the automatic role system.
     * @param dataMap The data map associated with the service.
     * @param data The data encapsulated into the entry class.
     */
    constructor(dataMap: DataMap<AutomaticRoleType>, data: AutomaticRoleType);
}
