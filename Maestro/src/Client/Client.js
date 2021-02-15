'use strict';

const { Client } = require("discord.js");

class MaestroClient extends Client {

    constructor(data = {}) {

        /**
         * Le préfixe du bot
         * @readonly
         * @type {string}
         */
        this.#prefix = 'prefix' in data ? data.prefix : null;

        /**
         * L'id du propriétaire du bot
         * @readonly
         * @type {int}
         */
        this.#owner = 'owner' in data ? data.owner : null;

    }

}

module.exports = MaestroClient;
