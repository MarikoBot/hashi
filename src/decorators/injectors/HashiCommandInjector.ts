import { HashiCommandInjectorTarget, InstanceInjector } from '../shared';
import { CommandMetadata, CommandMetadataKeys } from '../../root';

/**
 * The decorator to inject metadata into the constructor of an extension of HashiCommandBase.
 * @param metadata The metadata of the super-HashiCommandBase.
 * @returns The decorator.
 */
export function HashiCommandInjector(
  metadata: Partial<Record<CommandMetadataKeys, CommandMetadata[CommandMetadataKeys]>>,
): InstanceInjector {
  return function (target: HashiCommandInjectorTarget): void {
    target.prototype.id = metadata.id;
  };
}
