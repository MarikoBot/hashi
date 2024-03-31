"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashiEvent = void 0;
const decorators_1 = require("../decorators");
const _1 = require("./");
/**
 * Represents an Event on client service.
 */
class HashiEvent {
    /**
     * The client instance.
     */
    client;
    /**
     * The event name.
     */
    name;
    /**
     * The callback function.
     */
    callback = _1.defaultEventCallback;
    /**
     * The constructor of the event.
     * @param name The event name.
     */
    constructor(name) {
        this.name = name;
    }
}
exports.HashiEvent = HashiEvent;
__decorate([
    (decorators_1.Validators.ObjectValidator.IsInstanceOf(_1.HashiClient)),
    __metadata("design:type", _1.HashiClient)
], HashiEvent.prototype, "client", void 0);
__decorate([
    decorators_1.Validators.StringValidator.ValidId,
    __metadata("design:type", String)
], HashiEvent.prototype, "name", void 0);
__decorate([
    decorators_1.Validators.FunctionValidator.Matches,
    __metadata("design:type", Function)
], HashiEvent.prototype, "callback", void 0);
