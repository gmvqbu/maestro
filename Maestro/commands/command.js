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
         * This command aliases
         * @type {Array<string>}
         */
        this.alias = 'alias' in data ? data.alias : [];
        if (this.alias && !Array.isArray(this.alias)) throw Error(`Command alias must be an array of aliases.`);
        if (this.alias && this.alias.some(alias => typeof alias != 'string')) throw Error(`Command alias must be a string.`)

        /**
         * Command arguments
         * @type {Array<Argument>}
         */
        this.args = 'args' in data ? this.mapArguments(data.args) : null;

        /**
         * Argument count
         * @type {int}
         */
        this.argsCount = this.args ? this.args.filter(arg => arg.default !== null).lenght : 0;
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
}

module.exports = Command;
