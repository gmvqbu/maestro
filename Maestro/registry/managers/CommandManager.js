'use strict';

const Command = require("../../commands/base.js");
const BaseManager = require("./base");

/**
 * Represent the Command Collection manager
 * @extends BaseManager
 */
class CommandManager extends BaseManager {
    /**
     * Verify any command
     * @param {Function|Object} command The command to verify
     * @returns {Object}
     */
    verify(command) {
        if (!Command.prototype.isPrototypeOf(command.prototype)) throw Error(`The provided command must extend Command.`);
        command = new command(this.client);
        const keywords = Array.of(command.name).concat(command.alias ?? null);
        this.browseCollectionForConflict(keywords);
        return {
            key: command.name,
            value: command
        };
    }

    /**
     * Fetch a command
     * @param {string} commandName The name or alias of the requested command
     * @returns {?Object} The fetched command
     */
    get(key) {
        return (super.get(key) ?? this.collection.find(cmd => cmd.alias.includes(key))) ?? null;
    }
}

module.exports = CommandManager;
