'use strict';

const Discord = require('discord.js');
const { matchRegex } = require('../../util/util');

/**
 * Dispatch tasks through the app
 * @class
 */
class Dispatcher {
    constructor(client, registry) {

        /**
         * @type {MaestroClient}
         */
        this.client = client;

        /**
         * @type {Registry}
         */
        this.registry = registry;
    }

    /**
     *
     * @public
     * @method
     * @param {Discord.Message} message
     */
    handleMessage(message) {
        if (message.author.bot) return;
        if (matchRegex(message.content, 'COMMAND_PATTERN', this.client.prefix)) {
            const command = this.parseMessage(this.client.prefix, message.content);
            if (!command) return message.reply(`Cette commande n'existe pas.`);
        }
    }

    /**
     * Represent the parsed message content
     * @typedef {Object} ParsedContent
     * @property {string} name The fetched command name
     * @property {Array<string>} args The parsed arguments
     */
    /**
     * Parses the message content
     * @param {string} prefix
     * @param {string} message
     * @returns {ParsedContent} The parsed content
     */
    parseMessage(prefix, message) {
        let parsedContent = message.substring(prefix.length).split(' ');
        const command = this.registry.fetch(parsedContent.shift());
        if (!command) return `Unknown command`;
        const args = this.normalizeArguments(parsedContent);
        return {
            command: command,
            args: args
        }
    }

    fetchCommand(commandName) {
        return {
            name: commandName
        }
    }

    normalizeArguments(args) {
        let myObject = new Object();
        let i = 0;
        for (const arg of args) {
            myObject[`key${i}`] = arg;
            i++;
        }
        return myObject;
    }
}

module.exports = Dispatcher;
