'use strict';

/* The whole framework is heavily inspired by Discord.js-commando */

const Discord = require("discord.js");
const Dispatcher = require("./dispatcher");
const Registry = require("./registry");
const { fetchUser } = require("./util");

/**
 * Extends the Discord Client
 * @extends Discord.Client
 */
class MaestroClient extends Discord.Client {
    constructor(data = {}) {
        super()

        /**
         * This registry (types & commands)
         * @type {MaestroRegistry}
         */
        this.registry = new Registry(this);

        /**
         * This dispatcher
         * @type {Dispatcher}
         */
        this.dispatcher = new Dispatcher(this, this.registry);

        /**
         * This bot command prefix
         * @readonly
         * @type {string}
         */
        this.prefix = 'prefix' in data ? data.prefix : '$';

        /**
         * This bot owner ID
         * @readonly
         * @type {int}
         */
        this.ownerID = 'ownerID' in data ? data.ownerID : null;

        /**
         * This bot owner ClientUser object
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
