'use strict';

const ArgumentType = require("./base");

/** Represent string type */
class CommandArgumentType extends ArgumentType {
    constructor(client) {
        super(client, 'command');
    }

    /**
     * @param {string} value The command key
     * @returns {Boolean}
     */
    validate(value) {
        return this.client.registry.commands.has(value);
    }

    /**
     * @returns {Command}
     */
    parse(msg, value) {
        return this.client.registry.commands.get(value);
    }
}

module.exports = CommandArgumentType;
