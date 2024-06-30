import * as chalk from 'chalk';
import { LoggerMode, loggerModes } from '../root';

/**
 * The Logger class. Contains multiple functions to log data.
 */
export class Logger {
  /**
   * Split a str to make it fit into a given size.
   * @param str The str to crop.
   * @param max The max length limit.
   * @returns The cropped (or not) string.
   */
  private static crop(str: string, max: number | 'flex'): string {
    if (max === 'flex') return str;
    return str.length > max ? str.slice(0, max - 3) + '...' : str + '.'.repeat(max - str.length);
  }

  /**
   * Returns the prefix for the logging.
   * @param mode The 'label' that describes the assets pack.
   * @param str The string to split to fit a given size.
   * @returns The prefix (str).
   */
  public static prefix(mode: string, str: string = process.env.PROJECT_NAME.toLowerCase()): string {
    return `(${Logger.crop(mode, 'flex')}) ${Logger.crop(str, 'flex')}`;
  }

  /**
   * Logs something in the console using the error assets.
   * @param args The data to print.
   * @returns Nothing.
   */
  public static error(...args: any[]): void {
    console.log('error call', args);
    Logger.log('error', args);
  }

  /**
   * Logs something in the console using the success assets.
   * @param args The data to print.
   * @returns Nothing.
   */
  public static success(...args: any[]): void {
    console.log('success call', args);
    Logger.log('success', args);
  }

  /**
   * Logs something in the console using the warning assets.
   * @param args The data to print.
   * @returns Nothing.
   */
  public static warning(...args: any[]): void {
    console.log('warning call', args);
    Logger.log('warning', args);
  }

  /**
   * Logs something in the console using the info assets.
   * @param args The data to print.
   * @returns Nothing.
   */
  public static info(...args: any[]): void {
    console.log('info call', args);
    Logger.log('info', args);
  }

  /**
   * Logs something in the console using the debug assets.
   * @param args The data to print.
   * @returns Nothing.
   */
  public static debug(...args: any[]): void {
    console.log('debug call', args);
    Logger.log('debug', args);
  }

  /**
   * Logs something in the console using the test assets.
   * @param args The data to print.
   * @returns Nothing.
   */
  public static test(...args: any[]): void {
    console.log('test call', args);
    Logger.log('test', args);
  }

  /**
   * Logs something in the console using the clean assets.
   * @param args The data to print.
   * @returns Nothing.
   */
  public static clean(...args: any[]): void {
    console.log('clean call', args);
    Logger.log('clean', args);
  }

  /**
   * Logs something in the console using the chosen assets.
   * @param mode The mode (assets pack).
   * @param args The data to print.
   * @returns Nothing.
   */
  public static log(mode: LoggerMode | string, ...args: any[]): void {
    const color: string = loggerModes.includes(<LoggerMode>mode)
      ? {
          error: 'red',
          success: 'green',
          warning: 'yellow',
          info: 'blue',
          debug: 'magenta',
          test: 'cyan',
          clean: 'gray',
        }[mode]
      : 'white';
    const background: string = 'DEFAULT';

    const assets: chalk.Chalk = background === 'DEFAULT' ? chalk[color] : chalk[background][color];

    console.log(
      assets(`${this.prefix(mode, process.env.PROJECT_NAME.toLowerCase())} →`),
      assets(args.map((arg: any): string[] => arg.map((argShard: string): string => argShard).join('')).join('')),
    );
  }
}
