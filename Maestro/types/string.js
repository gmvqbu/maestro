'use strict';

const BaseType = require("./base");

/** Represent string type */
class StringType extends BaseType {
    constructor(client) {
        super(client, {
            name: 'string',
        })
    }

    /**
     * Validate any value
     * @param {string} value The value to validate
     * @returns {Boolean}
     */
    validate(value) {
        return super.validate(value, /^\w+$/i);
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

module.exports = StringType;
