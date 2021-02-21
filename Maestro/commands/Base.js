'use strict';

class BaseCommand {

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
        if (typeof data.name != 'string') throw Error(`Command name must be a string.`);
        if (data.name != data.name.toLowerCase()) throw Error(`Command name must be in lower case.`);

        /**
         * This command group
         * @type {string}
         */
        this.group = 'group' in data ? data.group : null;
        if (!this.group) throw Error(`Command group cannot be null.`);
        if (typeof data.group != 'string') throw Error(`Command group must be a string.`);
        if (data.group != data.group.toLowerCase()) throw Error(`Command group must be in lower case.`);

        /**
         * Command aliases
         * @type {Array<string>}
         */
        this.alias = 'alias' in data ? data.alias : null;
        if (this.alias && !Array.isArray(this.alias)) throw Error(`Command alias must be an array of aliases.`);
    }

}

module.exports = BaseCommand;
