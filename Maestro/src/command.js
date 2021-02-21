'use strict';

const Argument = require("./argument");

class Command {

    /**
     * The current client
     * @type {MaestroClient}
     */
    client;

    /**
     * @typedef {Object} CommandInfo
     * @property {string} name The command name
     * @property {string} group The command group
     * @property {Array<string>} alias Command alias/aliases
     * @property {Array<object>} args Command arguments
     */
    /**
     * @param {MaestroClient} client
     * @param {CommandInfo} data
     */
    constructor(client, data) {
        Object.defineProperty(this, 'client', { value: client });

        /**
         * This command name
         * @type {string}
         */
        this.name = 'name' in data ? data.name : null;
        if (!this.name) throw Error(`Command name cannot be null.`);
        if (typeof this.name != 'string') throw Error(`Command name must be a string.`);
        if (this.name != this.name.toLowerCase()) throw Error(`Command name must be in lower case.`);

        /**
         * This command group
         * @type {string}
         */
        this.group = 'group' in data ? data.group : null;
        if (!this.group) throw Error(`Command group cannot be null.`);
        if (typeof this.group != 'string') throw Error(`Command group must be a string.`);
        if (this.group != this.group.toLowerCase()) throw Error(`Command group must be in lower case.`);

        /**
         * Command aliases
         * @type {Array<string>}
         */
        this.alias = 'alias' in data ? data.alias : null;
        if (this.alias && !Array.isArray(this.alias)) throw Error(`Command alias must be an array of aliases.`);

        /**
         * Command arguments
         * @type {Array<Argument>}
         */
        this.args = 'args' in data ? this.#createArguments(data.args) : null;

        /**
         * Argument count
         * @type {int}
         */
        this.argsCount = this.args ? this.args.length : 0;
    }

    #createArguments(args) {
        if (!Array.isArray(args)) throw Error(`Command arguments must be an array.`);
        for (let i = 0; i < args.length; i++) {
            args[i] = new Argument(args[i]);
        }
        return args;
    }
}

module.exports = Command;