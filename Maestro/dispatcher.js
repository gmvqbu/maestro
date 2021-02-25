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
        // Begin input treatment
        const parsedMessage = this.parseMessage(msg.content);
        const command = this.registry.commands.get(parsedMessage.shift())
        if (!command) return msg.reply(error('UNKNOWN_COMMAND'));
        // Merge the rest of the parsed message as arguments
        const args = command.mergeArguments(parsedMessage)
        const missingArgs = args.filter(arg => arg.value === null);
        if (missingArgs.length > 0) return msg.reply(error('MISSING_ARGUMENTS', command.name, missingArgs.map(arg => arg.label)));
        const wrongArgs = args.filter(arg => arg.type.validate(arg.value) === false);
        if (wrongArgs.length > 0) return msg.reply(error('WRONG_ARGUMENTS', command.name, wrongArgs.map(arg => arg.label)));
        // Load data in the message
        Object.defineProperty(msg, 'command', { value: command, writable: false });
        Object.defineProperty(msg, 'args', {
            value: (args != []) ? Object.fromEntries(args.map(arg => [arg.key, arg.type.format(arg.value)])) : null,
            writable: false
        });
        return command.run(msg, msg.args);
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
        return content.substring(this.client.prefix.length).split(' ');
    }
}

module.exports = Dispatcher;
