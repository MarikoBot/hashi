/**
 * The Logger class. Contains multiple functions to log data.
 */
export declare class Logger {
    /**
     * The name of the project.
     */
    readonly projectName: string;
    /**
     * The constructor of the Logger class.
     * @param name The name of the project.
     */
    constructor(name: string);
    /**
     * Logs something in the console using the info assets.
     * @param args The data to print.
     * @returns Nothing.
     */
    info(...args: any[]): void;
    /**
     * Logs something in the console using the clean assets.
     * @param args The data to print.
     * @returns Nothing.
     */
    clean(...args: any[]): void;
}
