import { Validators } from '../decorators';
import { InstanceValidator } from '../decorators/shared';

/**
 * The placeholder class when data is missing.
 */
export class Placeholder {
  /**
   * The value.
   */
  @(<InstanceValidator>Validators.StringValidator.NotEmpty)
  public readonly value: string = 'placeholder';
}

/**
 * The placeholder class when data is missing.
 */
export type PlaceholderType = typeof Placeholder;
