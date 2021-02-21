'use strict';

const BaseCommand = require('../Base');

/**
 * @class
 * @extends BaseCommand
 */
class PingCommand extends BaseCommand {

    constructor(client) {
        super(client, {
            name: 'ping',
            alias: ['pi', 'p'],
            group: 'mod'
        })
    }

}

module.exports = PingCommand;
