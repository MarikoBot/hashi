import { Validators } from '../decorators/';
import { HashiClient } from '../root/';

/**
 * Represents the base class for each class of the package.
 */
export class Base {
  @Validators.IsInstanceOf.HashiClient
  public client: HashiClient;

  /**
   * Initialize the base class, and, if needed, the client instance.
   * @param client The client instance.
   */
  constructor(client: HashiClient) {
    if (client) this.client = client;
  }
}
