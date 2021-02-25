'use strict';

const Voice = require('../../player/Voice');
const Command = require('../command');

/**
 * @class
 * @extends Command
 */
class ConnectCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'disconnect',
            alias: ['leave'],
            group: 'voice'
        });
    }

    run(msg) {
        return Voice.instance(this.client).disconnect(msg);
    }
}

module.exports = ConnectCommand;
