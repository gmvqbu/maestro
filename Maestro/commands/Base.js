'use strict';

module.exports = class BaseCommand {

    constructor(client, data) {

        /**
         * The Maestro client
         * @type {MaestroClient}
         */
        this.client = client;

        if (!data.name) throw Error(`You must provide a command name.`)
        /**
         * The command name
         * @type {string}
         */
        this.name = data.name;

        if (!data.group) throw Error(`You must provide a command group.`)
        /**
         * The command group
         * @type {string}
         */
        this.group = data.group;

        /**
         * The command aliases
         * @type {Array<string>}
         */
        this.alias = 'alias' in data ? data.alias : null;
    }

}
