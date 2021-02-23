'use strict';

const Discord = require('discord.js');
const ArgumentCollector = require('../commands/collector');

/**
 * Dispatch tasks through the app
 * @class
 */
class Dispatcher {
    constructor(client, registry) {
        Object.defineProperty(this, 'client', { value: client });
        Object.defineProperty(this, 'registry', { value: registry });

        /**
         * The argument collector
         * @type {ArgumentCollector}
         */
        this.argumentCollector = new ArgumentCollector(client, registry);
    }

    /**
     * Handles any message from discord users
     * @public
     * @method
     * @param {Discord.Message} msg
     */
    async handleMessage(msg) {
        if (!this.#shouldHandleMessage(msg)) return;

        const error = await this.parseMessage(msg, this.client.prefix);
        if (error) return msg.reply(error);
        msg.command.run(msg, msg.args)
    }

    /**
     * Wether the dispatcher should handle the message or not
     * @param {Discord.Message} msg
     */
    #shouldHandleMessage(msg) {
        return (!msg.author.bot && msg.content.match(new RegExp(`^\\${this.client.prefix}\\w+(\\s+)?(.+)?`, 'i'))) ? true : false;
    }

    /**
     * Parses the message content
     * @param {string} prefix
     * @param {string} msg
     * @returns {ParsedContent} The parsed content
     */
    parseMessage(msg, prefix) {
        const parsedContent = msg.content.substring(prefix.length).split(' ');
        const command = this.registry.commands.get(parsedContent.shift());
        if (!command) return `Cette commande n'existe pas.`;
        Object.defineProperty(msg, 'command', { value: command, writable: false });
        if (command.argsCount === 0) return;
        const args = this.argumentCollector.collect(command, parsedContent);
        if (typeof args === 'string') return args;  // Erreur
        Object.defineProperty(msg, 'args', { value: args, writable: false });
    }
}

module.exports = Dispatcher;
