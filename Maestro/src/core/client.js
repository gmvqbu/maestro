'use strict';

const Discord = require("discord.js");
const User = require("../tools/User/UserService");
const Dispatcher = require("./dispatcher");
const Registry = require("./registry");

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
        if (this.ownerID) User.fetch(this, this.ownerID).then(user => this.owner = user);

        this.on('message', message => { this.dispatcher.handleMessage(message); });
    }
}

module.exports = MaestroClient;
