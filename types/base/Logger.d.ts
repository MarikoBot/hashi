import { LoggerMode } from '../root';
/**
 * The Logger class. Contains multiple functions to log data.
 */
export declare class Logger {
    /**
     * Split a str to make it fit into a given size.
     * @param str The str to crop.
     * @param max The max length limit.
     * @returns The cropped (or not) string.
     */
    private static crop;
    /**
     * Returns the prefix for the logging.
     * @param mode The 'label' that describes the assets pack.
     * @param str The string to split to fit a given size.
     * @returns The prefix (str).
     */
    static prefix(mode: string, str?: string): string;
    /**
     * Logs something in the console using the error assets.
     * @param args The data to print.
     * @returns Nothing.
     */
    static error(...args: any[]): void;
    /**
     * Logs something in the console using the success assets.
     * @param args The data to print.
     * @returns Nothing.
     */
    static success(...args: any[]): void;
    /**
     * Logs something in the console using the warning assets.
     * @param args The data to print.
     * @returns Nothing.
     */
    static warning(...args: any[]): void;
    /**
     * Logs something in the console using the info assets.
     * @param args The data to print.
     * @returns Nothing.
     */
    static info(...args: any[]): void;
    /**
     * Logs something in the console using the debug assets.
     * @param args The data to print.
     * @returns Nothing.
     */
    static debug(...args: any[]): void;
    /**
     * Logs something in the console using the test assets.
     * @param args The data to print.
     * @returns Nothing.
     */
    static test(...args: any[]): void;
    /**
     * Logs something in the console using the clean assets.
     * @param args The data to print.
     * @returns Nothing.
     */
    static clean(...args: any[]): void;
    /**
     * Logs something in the console using the chosen assets.
     * @param mode The mode (assets pack).
     * @param args The data to print.
     * @returns Nothing.
     */
    static log(mode: LoggerMode | string, ...args: any[]): void;
}
