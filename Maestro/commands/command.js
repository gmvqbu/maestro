'use strict';

const Argument = require("./argument");

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
        this.args = data.args ? this.mapArguments(data.args) : null;

        /**
         * Argument count
         * @type {int}
         */
        this.argsCount = data.args ? data.args.filter(arg => arg.default !== null).lenght : 0;
    }

    /**
     * Return the mapped command arguments
     * @private
     * @param {Array<ArgumentInfo>} args The command arguments data
     * @returns {Array<Argument>} Mapped argument objects
     */
    mapArguments(args) {
        if (!Array.isArray(args)) throw Error(`Command arguments must be an array.`);
        return args.map(data => new Argument(this.client, data))
    }

    /**
     * Merge the given arguments with the expected ones
     * @param {Object} command
     * @param {Array<string>} values
     */
    mergeArguments(values) {
        if (this.argsCount === 0) return [];
        return this.args.map(arg => {
            // Set the argument value ; defaults if undefined ;
            arg.value = ((arg.infinite ? values.join(' ') : values.shift()) ?? arg.default) ?? null;
            return arg
        });
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
