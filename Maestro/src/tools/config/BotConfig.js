'use strict';

const BaseConfig = require('./Base');

/**
 * Représente la configuration du bot
 * @public
 * @class
 * @extends BaseConfig
 */
class BotConfig extends BaseConfig {

    /**
     * The bot configuration
     * @readonly
     * @type {Object<string>}
     */
    static #bot = this.config.bot;


    // Définition de tous les getters necéssaires

    static get prefix() {
        return this.#bot.prefix;
    }

    static get owner() {
        return this.#bot.owner;
    }

    static get token() {
        return this.#bot.token;
    }

    static get username() {
        return this.#bot.username;
    }

}

module.exports = BotConfig;
