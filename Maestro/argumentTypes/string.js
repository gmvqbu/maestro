'use strict';

const ArgumentType = require("./base");

/** Represent string type */
class StringArgumentType extends ArgumentType {
    constructor(client) {
        super(client, 'string')
    }

    /**
     * Validate any value
     * @param {string} value The value to validate
     * @returns {Boolean}
     */
    validate(value) {
        return super.validate(value, /^[\w\s]+$/i);
    }

    /**
     * Format any value
     * @param {string} value The value to format
     * @returns {string}
     */
    format(value) {
        return String(value);
    }
}

module.exports = StringArgumentType;
