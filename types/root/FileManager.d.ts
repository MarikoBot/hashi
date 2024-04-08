import { HashiClient, EnvPath } from './';
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
    /**
     * The absolute directory path based on the environment.
     * @returns The path.
     */
    static get ABSPATH(): EnvPath['lab' | 'prod'];
    /**
     * The backward directory path based on the environment.
     * @returns The path.
     */
    static get RMPATH(): EnvPath['lab' | 'prod'];
}
