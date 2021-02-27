'use strict';

/** Represent a command argument */
class Argument {
    /**
     * Represent the argument infos used to set up and deliver the argument
     * @typedef {Object} ArgumentInfo
     * @property {string} key Argument key : used to retreive the argument in the run method
     * @property {string} label Argument label : used to interact with the user
     * @property {string} type Argument type
     * @property {*} default Default value
     * @property {Boolean} infinite Wether to capture the rest of the string
     */
    /**
     * @param {MaestroClient}
     * @param {ArgumentInfo} data
     */
    constructor(client, data) {
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
        if (!this.label) throw Error(`Argument label cannot be null`);
        if (typeof this.label != 'string') throw Error(`Argument key must be a string`);

        /**
         * This argument type (fetched from the registry)
         * Could be (string|url|int|time)
         * @type {string}
         */
        this.type = 'type' in data ? client.registry.types.get(data.type) : null;
        if (!this.type) throw Error(`Argument type cannot be null`);

        /**
         * This argument default value
         * @type {*}
         */
        this.default = 'default' in data ? data.default : null;
        if (this.default != null && !this.type.validate(this.default)) throw Error(`Default argument value must match the argument type.`)

        this.infinite = 'infinite' in data ? data.infinite : null;

    }
}

module.exports = Argument;
