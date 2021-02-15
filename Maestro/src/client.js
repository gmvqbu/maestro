'use strict';

const { Client } = require("discord.js");
const User = require("../infrastructure/User/User");
const { match } = require("../util/util");
const MaestroDispatcher = require("./dispatcher");
const MaestroRegistry = require("./registry");

class MaestroClient extends Client {

    constructor(data = {}) {
        super()

        /**
         * Le registre de commandes
         * @type {MaestroRegistry}
         */
        this.registry = new MaestroRegistry(this);

        /**
         * Le dispatcher
         * @type {MaestroDispatcher}
         */
        this.dispatcher = new MaestroDispatcher(this, this.registry);

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

        this.on('message', message => { this.dispatcher.handleMessage(message); });

    }

    async #fetchOwner(ownerID) {
        if (!match(ownerID, 'ID_RESOLVABLE')) throw Error(`The provided owner id syntax is incorrect.`);
        const user = await this.users.fetch(ownerID);
        if (!user) throw Error(`Could not find the bot owner.`);
        return new User(this, user);
    }

}

module.exports = MaestroClient;
