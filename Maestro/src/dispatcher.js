'use strict';

const Discord = require('discord.js');
const { matchRegex } = require('../util/util');

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
     * Handles any message from discord users
     * @public
     * @method
     * @param {Discord.Message} msg
     */
    async handleMessage(msg) {
        if (msg.author.bot) return;
        if (matchRegex(msg.content, 'COMMAND_PATTERN', this.client.prefix)) {
            const error = await this.parseMessage(msg, this.client.prefix);
            if (error) return msg.reply(error);
            msg.command.run(msg, msg.args)
        }
    }

    /**
     * Parses the message content
     * @param {string} prefix
     * @param {string} msg
     * @returns {ParsedContent} The parsed content
     */
    async parseMessage(msg, prefix) {
        const parsedContent = msg.content.substring(prefix.length).split(' ');
        const command = await this.registry.fetchCommand(parsedContent.shift());
        if (!command) return `Cette commande n'existe pas.`;
        Object.defineProperty(msg, 'command', { value: command, writable: false });
        const args = this.formatArguments(parsedContent, command);
        if (typeof args === 'number') return `Il manque ${args} argument${args > 1 ? 's' : ''}.`;
        Object.defineProperty(msg, 'args', { value: args, writable: false });
    }

    formatArguments(args, command) {
        const argsCount = command.argsCount;
        // A VENIR : préciser quels arguments sont manquants dans un tableau avec le label
        if (args.length < argsCount) return argsCount - args.length;
        let keyedArgs = new Object();
        for (let i = 0; i < argsCount; i++) {
            const key = command.args[i].key;
            // A VENIR : préparer les arguments de type ClientUser, GuildMember, VoiceChannel
            keyedArgs[key] = args[i];
        }
        return keyedArgs;
    }
}

module.exports = Dispatcher;
