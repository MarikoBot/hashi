import { HashiClient } from '../root/';

/**
 * Represents the base class for each class of the package.
 */
export class Base {
  /**
   * The client instance.
   */
  #client: HashiClient;

  /**
   * Get the client instance.
   * @returns The client instance.
   */
  get client(): HashiClient {
    return this.#client;
  }

  /**
   * Initialize the base class, and, if needed, the client instance.
   * @param client The client instance.
   */
  constructor(client: HashiClient) {
    if (client) this.#client = client;
  }

  /**
   * Set the client instance.
   * @param client The client instance.
   * @returns The class instance.
   */
  public setClient(client: HashiClient): Base {
    if (client instanceof HashiClient && client.src.token === this.client.src.token) this.#client = client;
    return this;
  }
}
