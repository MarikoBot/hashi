import { Validators } from '../decorators/';
import { HashiClient } from '../root';
import { Constructable, InstanceValidator } from '../decorators/shared';

/**
 * Represents the base class for each class of the package.
 */
export class BaseClient {
  @((<(arg: typeof HashiClient) => InstanceValidator>Validators.ObjectValidator.IsInstanceOf)(HashiClient))
  public client: HashiClient;

  /**
   * Initialize the base class, and, if needed, the client instance.
   * @param client The client instance.
   */
  constructor(client: HashiClient) {
    if (client) this.client = client;
  }
}
