'use strict';

const Discord = require('discord.js');

/**
 * Dispatch tasks through the app
 * @class
 */
class Dispatcher {
    constructor(client, registry) {
        Object.defineProperty(this, 'client', { value: client });
        Object.defineProperty(this, 'registry', { value: registry });
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
        const args = this.collectArguments(command, parsedContent);
        // collecter les arguments
        // vérifier et adapter le type
        if (typeof args === 'string') return args;  // Erreur
        Object.defineProperty(msg, 'args', { value: args, writable: false });
    }

    collectArguments(command, args) {
        if (!Array.isArray(args)) throw Error(`Arguments must be an array.`);
        if (args.length < command.argsCount) return this.checkMissingArguments(args, command);
        let keyedArgs = new Array();
        let labels = new Array()
        for (let i = 0; i < args.length; i++) {
            let v = args[i];
            const arg = command.args[i];
            const type = this.registry.types.get(arg.type);
            if (!type.validate(v)) {
                labels.push(arg.label);
            } else {
                v = type.format(v);
                keyedArgs[arg.key] = args[i];
            }
        }
        if (labels.length > 0) return `je ne peux pas effectuer cette commande car ${labels.length > 1 ? 'les ' : "l'"}argument${labels.length > 1 ? 's' : ''} \`${labels.join('`, `')}\` ${labels.length > 1 ? 'ne sont' : "n'est"} pas valide${labels.length > 1 ? 's' : ''}`;
        return keyedArgs;
    }

    checkMissingArguments(args, command) {
        const expectedCount = command.argsCount;
        const givenCount = args.length;
        let missing = [];
        for (let i = givenCount; i < expectedCount; i++) {
            missing.push(command.args[i].label)
        }
        return (missing.length > 1)
            ?
            `je ne peux pas effectuer la commande \`${command.name}\` car il manque les arguments suivants : \`${missing.join('`, `')}\``
            :
            `je ne peux pas effectuer cette commande \`${command.name}\` car il manque l'argument \`${String(missing)}\``;
    }
}

module.exports = Dispatcher;
