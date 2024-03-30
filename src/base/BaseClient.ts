import { Validators } from '../decorators/';
import { InstanceValidatorReturner } from '../decorators/shared';
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
    if (client) this.client = client;
  }
}
