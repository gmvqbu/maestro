'use strict';

/**
 * Represent a command argument
 */
class Argument {

    /**
     * @typedef {Object} ArgumentInfo
     * @property {string} key Argument key (used to retreive the argument in the run method)
     * @property {string} label Argument label
     * @property {string} type Argument type
     */
    /**
     * @param {ArgumentInfo} data
     */
    constructor(data) {

        /**
         * This argument key
         * @type {string}
         */
        this.key = 'key' in data ? data.key : null;
        if (!this.key) throw Error(`Argument key cannot be null`);
        if (typeof this.key != 'string') throw Error(`Argument key must be a string`);
        if (this.key != this.key.toLowerCase()) throw Error(`Argument key must be in lower case.`);

        /**
         * This argument label
         * @type {string}
         */
        this.label = 'label' in data ? data.label : null;
        if (typeof this.key != 'string') throw Error(`Argument key must be a string`);

        /**
         * This argument type
         * Could be (string|url|int|time)
         * @type {string}
         */
        this.type = 'type' in data ? data.type : null;
        if (!this.type) throw Error(`Argument type cannot be null`);
        if (typeof this.type != 'string') throw Error(`Argument type must be a string`);
        if (this.type != this.type.toLowerCase()) throw Error(`Argument type must be in lower case.`);
    }

}

module.exports = Argument;
