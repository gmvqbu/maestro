'use strict';

const Command = require('../../src/command');

/**
 * @class
 * @extends Command
 */
class PingCommand extends Command {

    constructor(client) {
        super(client, {
            name: 'ping',
            alias: ['pi', 'p'],
            group: 'mod',
            args: [
                {
                    key: 'ville'
                },
                {
                    key: 'pays'
                }
            ]
        });
    }
}

module.exports = PingCommand;
