'use strict';

const Command = require("../commands/base.js");

/** Represent a base type */
class ArgumentType {
    constructor(client, id) {
        if(!client) throw new Error('A client must be specified.');
		if(typeof id !== 'string') throw new Error('Argument type ID must be a string.');
		if(id !== id.toLowerCase()) throw new Error('Argument type ID must be lowercase.');

		Object.defineProperty(this, 'client', { value: client });

		/**
		 * ID of this argument type
		 * @type {string}
		 */
		this.id = id;
    }

    /**
     * Validate any value
     * @param {string} value The value to validate
     * @returns {Boolean}
     */
    validate(value, regex) {
        return value.match(regex) ? true : false;
    }
}

module.exports = ArgumentType;
