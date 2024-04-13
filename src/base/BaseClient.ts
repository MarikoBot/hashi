import { Validators, InstanceValidatorReturner } from '../decorators/';
import { HashiClient } from '../root';

/**
 * Represents the base class for each class of the package base.
 */
export class BaseClient {
  @((<InstanceValidatorReturner>Validators.ObjectValidator.IsInstanceOf)(HashiClient))
  public client: HashiClient;

  /**
   * Initialize the base class, and, if needed, the client instance.
   * @param client The client instance.
   */
  constructor(client: HashiClient) {
    this.client = client;
  }
}
