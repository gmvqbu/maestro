'use strict';

const Discord = require("discord.js");
const Dispatcher = require("./dispatcher");
const Registry = require("./registry");
const { fetchUser } = require("./util");

/**
 * Extends the Discord Client
 * @class
 * @extends Discord.Client
 */
class MaestroClient extends Discord.Client {
    constructor(data = {}) {
        super()

        /**
         * Le registre de commandes
         * @type {MaestroRegistry}
         */
        this.registry = new Registry(this);

        /**
         * Le dispatcher
         * @type {Dispatcher}
         */
        this.dispatcher = new Dispatcher(this, this.registry);

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
         * @type {AnyUser}
         */
        if (this.ownerID) fetchUser(this, this.ownerID)
            .then(user => this.owner = user)
            .catch(console.error) ?? null;

        this.on('message', msg => { this.dispatcher.handleMessage(msg); });
    }
}

module.exports = MaestroClient;
