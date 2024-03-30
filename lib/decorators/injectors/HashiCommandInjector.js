"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashiCommandInjector = void 0;
/**
 * The decorator to inject metadata into the constructor of an extension of HashiCommandBase.
 * @param metadata The metadata of the super-HashiCommandBase.
 * @returns The decorator.
 */
function HashiCommandInjector(metadata) {
    return function (target) {
        target.prototype.id = metadata.id;
    };
}
exports.HashiCommandInjector = HashiCommandInjector;
