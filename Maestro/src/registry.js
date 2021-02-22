'use strict';

const { Collection } = require("discord.js");
const BaseCommand = require("./command");

class Registry {
    /**
     * The current client
     * @type {MaestroClient}
     */
    client;

    /**
     * The registered commands
     * @type {Collection<string, BaseCommand>}
     */
    commands = new Collection();

    /**
     * The registered groups
     * @type {Collection<string, BaseCommand>}
     */
    groups = new Collection();

    /**
     * @param {MaestroClient} client
     */
    constructor(client) {
        Object.defineProperty(this, 'client', { value: client });
    }

    /**
     * Register a single command
     * @param {Function|Object} command The command to register
     */
    async registerCommand(command) {
        if (!BaseCommand.prototype.isPrototypeOf(command.prototype)) throw Error(`The provided command must be an object extending BaseCommand.`);
        command = new command(this.client);
        // Browse the registry for any command keyword conflict
        const keywords = new Array(command.name).concat(command.alias ?? null);
        keywords.forEach((keyword) => {
            if (
                this.commands.has(keyword)
                ||
                this.commands.some(cmd => cmd.alias.includes(keyword))
            ) throw Error(`Command keyword ${keyword} is already registered.`);
        })
        // Test passed successfully : we can register the command
        this.commands.set(command.name, command);
        if (!this.groups.has(command.group)) this.groups.set(command.group, new Array())
        this.groups.get(command.group).push(command);
    }

    /**
     * Register all the passed commands
     * @param {Array<Object>} commands The commands to register
     */
    registerCommands(commands) {
        if (!Array.isArray(commands)) throw Error(`Command list must be an array.`);
        for (const command of commands) {
            this.registerCommand(command);
        }
    }

    /**
     * Fetches a command
     * @param {string} commandName The name or alias of the requested command
     * @returns {Promise<Command>} The fetched command
     */
    fetchCommand(commandName) {
        return new Promise((resolve) => {
            // if the command name matches a command key (which is the command name)
            let result = this.commands.get(commandName);
            if (result) resolve(result)
            // If the command name matches any command alias
            result = this.commands.find(cmd => cmd.alias.includes(commandName));
            if (result) resolve(result);
            // Unknown command
            resolve(null)
        })
    }
}

module.exports = Registry;
