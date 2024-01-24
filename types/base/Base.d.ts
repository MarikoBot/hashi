import { HashiClient } from '../root/';
/**
 * Represents the base class for each class of the package.
 */
export declare class Base {
    client: HashiClient;
    /**
     * Initialize the base class, and, if needed, the client instance.
     * @param client The client instance.
     */
    constructor(client: HashiClient);
}
