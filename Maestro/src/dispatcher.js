'use strict';

const { match, matchCustom } = require('../util/util');
const Message = require('./Message/Message');

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

    handleMessage(message) {
        if (message.author.bot) return;
        if (match(message.content, 'COMMAND_PATTERN', this.client.prefix)) {

            const parsedContent = this.parseMessage(this.client.prefix, message.content);
            const command = this.fetch(parsedContent.command);
            if (!command) return message.reply(`Cette commande n'existe pas`)
            const args = this.normalizeArguments(parsedContent.args);
            console.log(command, args)

            return;
            // Trouver une méthode intelligente pour parser le message
            // et renvoyer la commande et les arguments séparément
            const parsedContent = this.parseMessage(this.client.prefix, message.content);
            const command = parsedContent.command;
            const args = parsedContent.args;

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
            command: this.fetch(parsedContent.shift()),
            arg: this.normalizeArguments(parsedContent)
        }
    }

    /**
     * Fetches the requested command
     * @param {string} commandName
     * @returns {Object}
     */
    fetch(commandName) {
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
