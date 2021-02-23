'use strict';

const { Collection } = require("discord.js");
const BaseCommand = require("../../commands/command");
const BaseManager = require("./base");

class CommandManager extends BaseManager {

    /**
     * Fetch a command
     * @param {string} commandName The name or alias of the requested command
     * @returns {Object|null} The fetched command
     */
    get(key) {
        if (super.get(key)) return super.get(key);
        return this.collection.find(cmd => cmd.alias.includes(key)) ?? null;
    }

    /**
     * Verify any command
     * @private
     * @param {Function|Object} command The command to register
     * @returns {Object}
     */
    verify(command) {
        if (!BaseCommand.prototype.isPrototypeOf(command.prototype)) throw Error(`The provided command must be an object extending BaseCommand.`);
        command = new command(this.client);
        const keywords = Array.of(command.name).concat(command.alias ?? null);
        this.browseCollectionForConflict(keywords);
        return {
            key: command.name,
            value: command
        };
    }

}

module.exports = CommandManager;
