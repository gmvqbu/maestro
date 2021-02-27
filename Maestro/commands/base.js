'use strict';

const Argument = require("./Argument");
const ArgumentCollector = require("./ArgumentCollector");

/** Represent a command */
class Command {
    /**
     * Represent the command infos to set up, fetch and execute the command
     * @typedef {Object} CommandInfo
     * @property {string} name The command name : used as key to store and fetch the command
     * @property {string} group The command group : used to classify each command
     * @property {Array<string>} alias The command aliases : used as secondary key to fetch the command
     * @property {Array<object>} args The command arguments
     */
    /**
     * @param {MaestroClient} client
     * @param {CommandInfo} data
     */
    constructor(client, data) {
        this.constructor.validateData(data);
        if (!client) throw new Error(`Command client must be specified.`)

        /**
         * Client that this command is for
         * @name Command#client
         * @type {MaestroClient}
         * @readonly
         */
        Object.defineProperty(this, 'client', { value: client });

        /**
         * This command name
         * @type {string}
         */
        this.name = data.name;

        /**
         * This command aliases
         * @type {?Array<string>}
         */
        this.alias = data.alias ?? [];

        /**
         * Command arguments
         * @type {?Array<Argument>}
         */
        this.argsCollector = (data.args && data.args.length)
            ?
            new ArgumentCollector(this.client, data.args)
            :
            null;
    }

    /**
     * Validate command data before loading
     * @param {CommandInfo} data
     */
    static validateData(data) {
        if (!data.name) throw new Error('Command name cannot be empty.');
        if (typeof data.name !== 'string') throw new TypeError('Command name must be a string.');
        if (data.name !== data.name.toLowerCase()) throw new Error('Command name must be in lower case.');

        if (data.alias && (!Array.isArray(data.alias) || data.alias.some(alias => typeof alias !== 'string'))) {
            throw new TypeError('Command aliases must be an Array of strings.');
        }
    }
}

module.exports = Command;
