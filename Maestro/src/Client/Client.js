'use strict';

const { Client } = require("discord.js");
const User = require("../../infrastructure/User/User");

class MaestroClient extends Client {

    constructor(data = {}) {
        super()

        /**
         * Le préfixe du bot
         * @readonly
         * @type {string}
         */
        this.prefix = 'prefix' in data ? data.prefix : '$';

        /**
         * L'id propriétaire du bot
         * @readonly
         * @type {int}
         */
        this.ownerID = 'ownerID' in data ? data.ownerID : null;

        /**
         * Le propriétaire du bot
         * @readonly
         * @type {User}
         */
        this.owner = this.ownerID ? this.#fetchOwner(data.ownerID) : null;

    }

    async #fetchOwner(ownerID) {
        const userIDRegExp = /^\d+$/;
        if (!ownerID.match(userIDRegExp)) throw Error(`The provided owner ID is incorrect.`);
        const user = await this.users.fetch(ownerID);
        if (!user) throw Error(`Could not find the bot owner.`)
        return new User(this, user);
    }

}

module.exports = MaestroClient;
