'use strict';

const BaseCommand = require("../commands/Base");

class Registry {
    /**
     * The current client
     * @type {MaestroClient}
     */
    client;

    /**
     * The registered commands
     * @type {Map<string, BaseCommand>}
     */
    commands = new Map();

    /**
     * The registered groups
     * @type {Map<string, BaseCommand>}
     */
    groups = new Map();

    constructor(client) {
        Object.defineProperty(this, 'client', { value: client });
    }

    /**
     * Register a single command
     * @param {string} command The command to register
     */
    registerCommand(command) {
        if (!BaseCommand.prototype.isPrototypeOf(command.prototype)) throw Error(`The provided command must be an object extending BaseCommand.`);
        command = new command(this.client);
        if (this.commands.has(command.name)) throw Error(`The command ${command.name} is already registered.`);
        this.commands.set(command.name, command);
        if (!this.groups.has(command.group)) this.groups.set(command.group, new Array())
        this.groups.get(command.group).push(command);
    }

    /**
     * Register all the passed
     * @param {Array<Object>} commands The commands to register
     */
    registerCommands(commands) {
        if (!Array.isArray(commands)) throw Error(`Command list must be an array.`);
        commands.forEach(command => {
            this.registerCommand(command);
        });
    }

    /**
     * Fetches a command
     * @param {string} commandName The name of the command to search
     * @returns {Promise<Command>} The fetched command
     */
    fetch(commandName) {
        return new Promise((resolve, reject) => {
            // if the command name matches a command key (which is the command name)
            if (this.commands.has(commandName)) resolve(this.commands.get(commandName))
            // If the command name matches any command alias
            for (const command of this.commands.values()) {
                if (command.alias.includes(commandName)) resolve(this.commands.get(command.name))
            }
            reject();
        })
    }
}

module.exports = Registry;
