"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperModelInjector = void 0;
/**
 * The decorator to inject metadata into the constructor of an extension of SuperModel.
 * @param name The name of the super-SuperModel.
 * @returns The decorator.
 */
function SuperModelInjector(name) {
    return function (target) {
        target.prototype.name = name;
    };
}
exports.SuperModelInjector = SuperModelInjector;
