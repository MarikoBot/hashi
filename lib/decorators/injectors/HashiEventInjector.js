"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashiEventInjector = void 0;
/**
 * The decorator to inject metadata into the constructor of HashiEvent.
 * @param name The name of the event.
 * @returns The decorator.
 */
function HashiEventInjector(name) {
    return function (target) {
        target.prototype.name = name;
    };
}
exports.HashiEventInjector = HashiEventInjector;
