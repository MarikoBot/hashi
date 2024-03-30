import { HashiEventInjectorTarget, InstanceInjector } from '../shared';

/**
 * The decorator to inject metadata into the constructor of HashiEvent.
 * @param name The name of the event.
 * @returns The decorator.
 */
export function HashiEventInjector(name: string): InstanceInjector {
  return function (target: HashiEventInjectorTarget): void {
    target.prototype.name = name;
  };
}
