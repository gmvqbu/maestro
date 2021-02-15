'use strict';

const { Client } = require("discord.js");

class MaestroClient extends Client {

    constructor(data = {}) {

        /**
         * Le préfixe pour utiliser Maestro
         * @readonly
         * @type {string}
         */
        this.#commandPrefix = 'commandPrefix' in data ? data.commandPrefix : null;

        /**
         * L'id du propriétaire du bot
         * @readonly
         * @type {int}
         */
        this.#botOwner = 'botOwner' in data ? data.botOwner : null;

    }

}

module.exports = MaestroClient;
