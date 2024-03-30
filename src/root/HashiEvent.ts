import { Validators } from '../decorators';
import { defaultEventCallback, HashiClient, HashiEventCallbackFunction } from './';
import { InstanceValidator, InstanceValidatorReturner } from '../decorators/shared';

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
   */
  @Validators.FunctionValidator.Matches
  public callback: HashiEventCallbackFunction = defaultEventCallback;

  /**
   * The constructor of the event.
   * @param name The event name.
   */
  constructor(name: string = 'ready') {
    this.name = name;
  }
}
