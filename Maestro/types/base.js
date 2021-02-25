'use strict';

/** Represent a base type */
class BaseType {
    constructor(client, data) {
        Object.defineProperty(this, 'client', { value: client });

        /**
         * This type name : used as key to store the type
         * @type {string}
         */
        this.name = 'name' in data ? data.name : null;
        if (!this.name) throw Error(`Type name cannot be null.`);
        if (typeof this.name != 'string') throw Error(`Type name must be a string.`);
        if (this.name != this.name.toLowerCase()) throw Error(`Type name must be in lower case.`);
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

module.exports = BaseType;
