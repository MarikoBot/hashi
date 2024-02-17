import * as chalk from 'chalk';
import { Validators } from '../decorators';

/**
 * The Logger class. Contains multiple functions to log data.
 */
export class Logger {
  /**
   * The name of the project.
   */
  @Validators.StringValidator.NotEmpty
  public readonly projectName: string;

  /**
   * The constructor of the Logger class.
   * @param name The name of the project.
   */
  constructor(name: string) {
    this.projectName = name;
  }

  /**
   * Logs something in the console using the info assets.
   * @param args The data to print.
   * @returns Nothing.
   */
  public info(...args: any[]): void {
    args.forEach((arg: any): any => {
      console.log(chalk.blue(`「 ${this.projectName.toUpperCase()} INFO 」`), chalk.blue(arg.message || arg));
      if (arg.message) console.log(arg);
    });
  }

  /**
   * Logs something in the console using the clean assets.
   * @param args The data to print.
   * @returns Nothing.
   */
  public clean(...args: any[]): void {
    args.forEach((arg: any): any => {
      console.log(chalk.grey(`「 ${this.projectName.toUpperCase()} INFO 」`), chalk.grey(arg.message || arg));
      if (arg.message) console.log(arg);
    });
  }
}
