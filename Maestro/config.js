'use strict';

const config = require('../config/config.json');

/** Represent this bot config interface */
class Config {
    /**
     * The bot configuration
     * @readonly
     * @type {Object<string>}
     */
    static #bot = config.bot;

    /**
     * The bot command prefix
     * @readonly
     * @type {string}
     */
    static get prefix() {
        return this.#bot.prefix;
    }

    /**
     * The bot owner ID
     * @readonly
     * @type {string}
     */
    static get ownerID() {
        return this.#bot.owner;
    }

    /**
     * The bot's token
     * @readonly
     * @type {string}
     */
    static get token() {
        return this.#bot.token;
    }

    /**
     * The bot's username
     * @readonly
     * @type {string}
     */
    static get username() {
        return this.#bot.username;
    }
}

module.exports = Config;
