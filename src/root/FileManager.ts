import { EnvPath } from './Constants';
import { HashiClient } from './HashiClient';
import * as fs from 'fs';
import * as path from 'path';

/**
 * The type used for defining abstractly the content of a file.
 */
export type FileContentType = { [dataKey: string]: any };

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
export class FileManager {
  /**
   * The client instance.
   */
  #client: HashiClient;

  /**
   * Get the client instance.
   * @returns The client instance.
   */
  public get client(): HashiClient {
    return this.#client;
  }

  /**
   * The constructor to instance the FileManager class. Client can be useful to pass.
   * @param client The client instance.
   */
  constructor(client: HashiClient) {
    this.setClient(client);
  }

  /**
   * Set the client instance.
   * @param client The client instance.
   * @returns The class instance.
   */
  public setClient(client: HashiClient): FileManager {
    if (client instanceof HashiClient) this.#client = client;
    return this;
  }

  /**
   * Get, store and returns an array of data included into a directory.
   * @param absPathStr The absolute path to look-up for.
   * @param rmPathStr The recursive path to look-up for.
   * @param selfResearch Options if the program needs to search for the file into its own folders.
   * @returns An array of values.
   */
  public read<FileContentOwnType extends FileContentType | any>(
    absPathStr: string,
    rmPathStr: string,
    selfResearch?: SelfResearchOptions,
  ): [string, FileContentOwnType][] {
    let files: [string, string][] = [];

    if (fs.existsSync(`${absPathStr}`))
      files = fs.readdirSync(`${absPathStr}`).map((f: string): [string, string] => [f, rmPathStr]);

    if (selfResearch && fs.existsSync(`${selfResearch.absPathStrSelf}`) && process.env.ENVPATH !== 'lab')
      files = files.concat(
        fs
          .readdirSync(`${selfResearch.absPathStrSelf}`)
          .map((f: string): [string, string] => [f, selfResearch.rmPathStrSelf]),
      );

    const arrayOfData: [string, FileContentOwnType][] = [];

    let i: number = -1;
    while (++i < files.length) {
      if (files[i][0] === 'index.js') continue;
      arrayOfData.push([
        files[i][0].replace('.js', ''),
        require(path.join(__dirname, `${files[i][1]}/${files[i][0]}`)),
      ]);
    }

    return arrayOfData;
  }

  /**
   * The absolute directory path based on the environment.
   * @returns The path.
   */
  static get ABSPATH(): EnvPath['lab' | 'prod'] {
    return {
      lab: 'lib/',
      prod: 'lib/',
    }[process.env.ENVPATH];
  }

  /**
   * The backward directory path based on the environment.
   * @returns The path.
   */
  static get RMPATH(): EnvPath['lab' | 'prod'] {
    return {
      lab: '../../lib/',
      prod: '../../../../../lib/',
    }[process.env.ENVPATH];
  }
}
