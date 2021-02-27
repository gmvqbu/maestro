'use strict';

const { error } = require("../messages");
const Argument = require("./Argument");

/** Collects, validates and parses the arguments */
class ArgumentCollector {
    constructor(client, args) {
        if (!client) throw new TypeError('Collector client must be specified.');
        if (!args || !Array.isArray(args)) throw new TypeError('Collector args must be an Array.');

        /**
         * Client this collector is for
         * @name ArgumentCollector#client
         * @type {CommandoClient}
         * @readonly
         */
        Object.defineProperty(this, 'client', { value: client });

        /**
         * Arguments to handle
         * @type {Argument[]}
         */
        this.args = new Array(args.length);

        let hasInfinite = false;
        let hasOptional = false;
        for (let i = 0; i < args.length; i++) {
            if (hasInfinite) throw new Error('Arguments are not accepted after an infinite argument.');
            if (args[i].default !== null) hasOptional = true;
            else if (hasOptional) throw new Error('Required arguments are not accepted after optional arguments.');
            this.args[i] = new Argument(this.client, args[i]);
            if (this.args[i].infinite) hasInfinite = true;
        }
    }

    /**
     * Collect, verify and parse arguments
     * @param {Discord.Message} msg
     */
    collect(msg, command, given = []) {
        given = this.args.map(arg => {
            // Set infinite or single value ; defaults if undefined ;
            arg.value = ((arg.infinite ? given.join(' ') : given.shift()) ?? arg.default) ?? null;
            return arg
        });

        const missingArgs = given.filter(arg => arg.value === null);
        if (missingArgs.length > 0) return msg.reply(error('MISSING_ARGUMENTS', command.name, missingArgs.map(arg => arg.label)));

        const wrongArgs = given.filter(arg => arg.validate(arg.value) === false);
        if (wrongArgs.length > 0) return msg.reply(error('WRONG_ARGUMENTS', command.name, wrongArgs.map(arg => arg.label)));

        return Object.fromEntries(given.map(arg => [arg.key, arg.parse(msg, arg.value)]));
    }
}

module.exports = ArgumentCollector;
