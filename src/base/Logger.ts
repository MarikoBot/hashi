import * as chalk from 'chalk';
import { BaseClient } from './index';
import { Validators, InstanceValidator } from '../decorators';
import { HashiClient } from '../root';
import { Channel, MessageCreateOptions, TextChannel } from 'discord.js';
import { RESTPostAPIChannelMessageJSONBody } from 'discord-api-types/rest';

/**
 * The Logger class. Contains multiple functions to log data.
 */
export class Logger extends BaseClient {
  /**
   * The name of the project.
   */
  @(<InstanceValidator>Validators.StringValidator.NotEmpty)
  public readonly projectName: string;
  /**
   * The constructor of the Logger class.
   * @param name The name of the project.
   * @param client The client instance.
   */
  constructor(name: string, client: HashiClient) {
    super(client);
    this.projectName = name;
  }

  /**
   * Split a str to make it fit into a given size.
   * @param str The str to crop.
   * @param max The max length limit.
   * @returns The cropped (or not) string.
   */
  private static crop(str: string, max: number): string {
    return str.length > max ? str.slice(0, max - 3) + '...' : str + '.'.repeat(max - str.length);
  }

  /**
   * Returns the prefix for the logging.
   * @param mode The 'label' that describes the assets pack.
   * @param str The string to split to fit a given size.
   * @returns The prefix (str).
   */
  public prefix(mode: string, str: string = this.projectName.toLowerCase()): string {
    return `(${Logger.crop(mode, 8)}) ${Logger.crop(str, 24)}`;
  }

  /**
   * Logs something in the console using the info assets.
   * @param args The data to print.
   * @returns Nothing.
   */
  public info(...args: any[]): void {
    this.log('info', args);
  }

  /**
   * Logs something in the console using the clean assets.
   * @param args The data to print.
   * @returns Nothing.
   */
  public clean(...args: any[]): void {
    this.log('clean', args);
  }

  /**
   * Logs something in the console using the test assets.
   * @param args The data to print.
   * @returns Nothing.
   */
  public test(...args: any[]): void {
    this.log('test', args);
  }

  /**
   * Logs something in the console using the error assets.
   * @param args The data to print.
   * @returns Nothing.
   */
  public error(...args: any[]): void {
    this.log('error', args);
  }

  /**
   * Logs something in the Discord "status" channel.
   * @param channelIdentifier The channel identifier into the config object.
   * @param messages The messages data to send.
   * @returns Nothing.
   */
  public async sendTo(channelIdentifier: string, ...messages: MessageCreateOptions[]): Promise<void> {
    const channel: Channel = await this.client.src.channels.fetch(this.client.configChannels[channelIdentifier]);

    if (channel instanceof TextChannel) {
      for (const msg of messages) await channel.send(msg).catch(this.clean);
    }
  }

  /**
   * Logs something in the console using the chosen assets.
   * @param mode The mode (assets pack).
   * @param args The data to print.
   * @returns Nothing.
   */
  private log(mode: string, ...args: any[]): void {
    let color: string = 'white';
    let background: string = 'DEFAULT';

    switch (mode) {
      case 'info':
        color = 'blue';
        break;
      case 'clean':
        color = 'grey';
        break;
      case 'test':
        color = 'red';
        break;
      case 'error':
        color = 'red';
        background = 'bgYellow';
        break;
    }

    const assets: chalk.Chalk = background === 'DEFAULT' ? chalk[color] : chalk[background][color];

    args.forEach((arg: any): any => {
      console.log(assets(`「 ${this.prefix(mode, this.projectName.toLowerCase())} 」`), assets(arg.message || arg));
      if (arg.message) console.log(arg);
    });
  }
}
