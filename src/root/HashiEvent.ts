import { Validators, InstanceValidator, InstanceValidatorReturner } from '../decorators';
import { defaultEventCallback, HashiClient, HashiEventCallbackFunction } from './';

/**
 * Represents an Event on client service.
 */
export class HashiEvent {
  /**
   * The client instance.
   */
  @((<InstanceValidatorReturner>Validators.ObjectValidator.IsInstanceOf)(HashiClient))
  public client: HashiClient;

  /**
   * The event name.
   */
  @(<InstanceValidator>Validators.StringValidator.ValidId)
  public name: string;

  /**
   * The callback function.
   * @param args The required (or not) arguments.
   * @returns Nothing.
   */
  @Validators.FunctionValidator.Matches
  public callback(...args: any[]): Promise<void> | void {
    return defaultEventCallback();
  }

  /**
   * The constructor of the event.
   * @param name The event name.
   */
  constructor(name: string) {
    this.name = name;
  }
}
