"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashiCommandValues = exports.defaultEventCallback = exports.COMMAND_END = void 0;
/**
 * The value that is returned when the command is finished.
 */
var COMMAND_END;
(function (COMMAND_END) {
    /**
     * When the command terminates goodly.
     */
    COMMAND_END[COMMAND_END["SUCCESS"] = 0] = "SUCCESS";
    /**
     * When the command did not terminate.
     */
    COMMAND_END[COMMAND_END["ERROR"] = 1] = "ERROR";
    /**
     * When the command terminates but with some problems that occurred in the process.
     */
    COMMAND_END[COMMAND_END["ISSUED"] = 1] = "ISSUED";
})(COMMAND_END || (exports.COMMAND_END = COMMAND_END = {}));
/**
 * A default callback function used when nothing is set.
 * @returns Nothing.
 */
async function defaultEventCallback() {
    return void setTimeout(() => null);
}
exports.defaultEventCallback = defaultEventCallback;
/**
 * The different values of for the HashiCommandType type.
 */
exports.HashiCommandValues = ['message', 'slash', 'sub', 'group'];
