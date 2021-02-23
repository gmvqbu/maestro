'use strict';

const config = require('../config/config.json');

class Config {

    /**
     * The bot configuration
     * @readonly
     * @type {Object<string>}
     */
    static #bot = config.bot;

    /**
     * @readonly
     * @type {string}
     */
    static get prefix() {
        return this.#bot.prefix;
    }

    /**
     * @readonly
     * @type {string}
     */
    static get ownerID() {
        return this.#bot.owner;
    }

    /**
     * @readonly
     * @type {string}
     */
    static get token() {
        return this.#bot.token;
    }

    /**
     * @readonly
     * @type {string}
     */
    static get username() {
        return this.#bot.username;
    }


}

module.exports = Config;
