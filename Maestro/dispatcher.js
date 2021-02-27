'use strict';

const { error } = require('./messages');

/** Dispatch commands through the app */
class Dispatcher {
    constructor(client, registry) {
        Object.defineProperty(this, 'client', { value: client });
        Object.defineProperty(this, 'registry', { value: registry });
    }

    /**
     * Handle any message from discord users
     * @param {Discord.Message} msg The message to handle
     */
    handleMessage(msg) {
        if (!this.shouldHandleMessage(msg)) return;
        const parsedMessage = this.parseMessage(msg.content);
        const command = this.registry.commands.get(parsedMessage.shift())
        if (!command) return msg.reply(error('UNKNOWN_COMMAND'));
        const args = command.argsCollector ? command.argsCollector.collect(msg, command, parsedMessage) : null;
        Object.defineProperty(msg, 'command', { value: command });
        return command.run(msg, args);
    }

    /**
     * Wether the dispatcher should handle the message or not
     * @param {Discord.Message} msg
     * @returns {Boolean}
     */
    shouldHandleMessage(msg) {
        return (!msg.author.bot && msg.content.match(new RegExp(`^\\${this.client.prefix}\\w+(\\s+)?(.+)?`, 'i'))) ? true : false;
    }

    /**
     * Parses the message content
     * @param {string} content The message content to parse
     * @returns {Array<string>} The parsed content
     */
    parseMessage(content) {
        return content.substring(this.client.prefix.length).replace(/\s+/, ' ').split(' ');
    }
}

module.exports = Dispatcher;
