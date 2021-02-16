'use strict';

const Discord = require('discord.js');
const { matchRegex } = require('../../util/util');

/**
 * Dispatch tasks through the app
 * @class
 */
class MaestroDispatcher {
    constructor(client, registry) {

        /**
         * @type {MaestroClient}
         */
        this.client = client;

        /**
         * @type {MaestroRegistry}
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

            const parsedContent = this.parseMessage(this.client.prefix, message.content);
            const command = this.fetchCommand(parsedContent.command);
            if (!command) return message.reply(`Cette commande n'existe pas`);
            const args = this.normalizeArguments(parsedContent.args);

            return;
            // Trouver une méthode intelligente pour parser le message
            // et renvoyer la commande et les arguments séparément
            parsedContent = this.parseMessage(this.client.prefix, message.content);
            command = parsedContent.command;
            args = parsedContent.args;

        }
    }

    /**
     * Represent the parsed message content
     * @typedef {Object} ParsedContent
     * @property {string} command The fetched command
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
        return {
            command: parsedContent.shift(),
            args: parsedContent
        }
        return {
            command: this.registry.fetchCommand(parsedContent.shift()), // le registre cherche dans les commandes et les alias
            arg: this.normalizeArguments(parsedContent)
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

module.exports = MaestroDispatcher;
