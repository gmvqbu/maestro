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
            name: 'connect',
            alias: ['join'],
            group: 'voice'
        });
    }

    run(msg) {
        return Voice.instance(this.client).connect(msg, msg.member.voice.channel ?? null)
    }
}

module.exports = ConnectCommand;
