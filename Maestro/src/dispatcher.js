'use strict';

const { match } = require('../util/util');

class MaestroDispatcher {

    constructor(client, registry) {
        this.client = client;
        this.registry = registry;
    }

    handleMessage(message) {
        if (message.author.bot) return;
        if (match(message.content, 'COMMAND_PATTERN', this.client.prefix)) {
            message.reply('Bien reçu !');
        }
        /*

        vérifier le match

        si match : fetch la commande

        */
    }

}

module.exports = MaestroDispatcher;
