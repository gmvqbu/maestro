'use strict';

const Command = require("../commands/command");
const BaseManager = require("./BaseManager");

/**
 * Represent the Command Collection manager
 * @extends BaseManager
 */
class CommandManager extends BaseManager {
    /**
     * Register the default commands
     * @returns {Registry}
     */
    registerDefaults() {
        return super.register([
            require('../commands/util/ping'),
            require('../commands/voice/connect'),
            require('../commands/voice/disconnect')
        ])
    }

    /**
     * Verify any command
     * @param {Function|Object} command The command to verify
     * @returns {Object}
     */
    verify(command) {
        if (!Command.prototype.isPrototypeOf(command.prototype)) throw Error(`The provided command must be an object extending Command.`);
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
     * @returns {Object|null} The fetched command
     */
    get(key) {
        return (super.get(key) ?? this.collection.find(cmd => cmd.alias.includes(key))) ?? null;
    }
}

module.exports = CommandManager;
