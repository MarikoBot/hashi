import { EnvPath } from './Constants';
import { HashiClient } from './HashiClient';
/**
 * The type used for defining abstractly the content of a file.
 */
export type FileContentType = {
    [dataKey: string]: any;
};
/**
 * The interface including parameters for self-research program.
 */
export interface SelfResearchOptions {
    /**
     * The absolute self-path to look.
     */
    absPathStrSelf: string;
    /**
     * The recursive self-path to look.
     */
    rmPathStrSelf: string;
}
/**
 * The class that manages the files included into this project, and also those at the root of the package user.
 */
export declare class FileManager {
    #private;
    /**
     * Get the client instance.
     * @returns The client instance.
     */
    get client(): HashiClient;
    /**
     * The constructor to instance the FileManager class. Client can be useful to pass.
     * @param client The client instance.
     */
    constructor(client: HashiClient);
    /**
     * Set the client instance.
     * @param client The client instance.
     * @returns The class instance.
     */
    setClient(client: HashiClient): FileManager;
    /**
     * Get, store and returns an array of data included into a directory.
     * @param absPathStr The absolute path to look-up for.
     * @param rmPathStr The recursive path to look-up for.
     * @param selfResearch Options if the program needs to search for the file into its own folders.
     * @returns An array of values.
     */
    read<FileContentOwnType extends FileContentType | any>(absPathStr: string, rmPathStr: string, selfResearch?: SelfResearchOptions): [string, FileContentOwnType][];
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
