'use strict';

const BotConfig = require("./BotConfig");

/**
 * Représente l'interface d'interaction avec la configuration globale
 * @public
 * @class
 */
class MaestroConfig {

    static get botPrefix() {
        return BotConfig.prefix;
    }

    static get botOwner() {
        return BotConfig.owner;
    }

    static get botToken() {
        return BotConfig.token;
    }

    static get botUsername() {
        return BotConfig.username;
    }

}

module.exports = MaestroConfig;
