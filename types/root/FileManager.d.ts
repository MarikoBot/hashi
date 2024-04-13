import { HashiClient } from './';
/**
 * The class that manages the files included into this project, and also those at the root of the package user.
 */
export declare class FileManager {
    /**
     * The client instance.
     */
    client: HashiClient;
    /**
     * The constructor to instance the FileManager class. Client can be useful to pass.
     * @param client The client instance.
     */
    constructor(client: HashiClient);
}
