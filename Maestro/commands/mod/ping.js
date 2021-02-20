'use strict';

const BaseCommand = require('../Base');

/**
 * @class
 * @extends BaseCommand
 */
module.exports = class PingCommand extends BaseCommand {

    constructor(client) {
        super(client, {
            name: 'ping',
            alias: ['pi', 'p'],
            group: 'mod'
        })
    }

}
