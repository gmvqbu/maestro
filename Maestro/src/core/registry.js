'use strict';

class MaestroRegistry {

    /**
     * All the registered groups
     * @type {Map}
     */
    commandGroups = new Map();

    constructor(client, commandPath = '../../commands') {

        /**
         * @type {MaestroClient}
         */
        this.client = client;

        /**
         * The path where the commands are stored
         * @type {string}
         */
        this.commandPath = commandPath;
    }

    /**
     * Register a single command group
     * @param {Object} group
     */
    registerGroup(group) {
        const id = 'id' in group ? group.id : null;
        const name = 'name' in group ? group.name : null;
        if (!id || !name) throw Error(`Can't register an undefined command.`)
        if (this.commandGroups.get(id)) throw Error(`The group ${group.id} is already registered.`)
        this.commandGroups.set(id, { name: name });
        return this;
    }

    /**
     * Registers all the passed command groups
     * @param {Array<Object>} groups
     */
    registerGroups(groups) {
        if (!Array.isArray(groups)) throw Error(`Group list must be an array.`)
        groups.forEach(group => {
            this.registerGroup(group);
        });
        return this;
    }

    /**
     * Register a command
     * @param {*} command
     */
    registerCommand(command) {
        // new command(this.client)
        return this;
    }

    /**
     * Registers all the passed commands
     * @param {Array} command
     */
    registerCommands(command) {
        if (!Array.isArray(command)) throw Error(`Command list must be an array.`);
        command.forEach(command => {
            this.registerCommand(command);
        });
        return this;
    }

    /**
     * Fetches a command
     * @param {string} commandName The name of the command to search
     * @returns {Promise<Command>} The fetched command
     */
    fetch(commandName) {
        return new Promise((resolve, reject) => {
            resolve(commandName);
        })
    }
}

module.exports = MaestroRegistry;
