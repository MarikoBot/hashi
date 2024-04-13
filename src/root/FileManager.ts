import { Validators, InstanceValidatorReturner } from '../decorators';
import { HashiClient, EnvPath } from './';

/**
 * The class that manages the files included into this project, and also those at the root of the package user.
 */
export class FileManager {
  /**
   * The client instance.
   */
  @((<InstanceValidatorReturner>Validators.ObjectValidator.IsInstanceOf)(HashiClient))
  public client: HashiClient;

  /**
   * The constructor to instance the FileManager class. Client can be useful to pass.
   * @param client The client instance.
   */
  constructor(client: HashiClient) {
    this.client = client;
  }
}
