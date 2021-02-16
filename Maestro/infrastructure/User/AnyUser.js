'use strict';

const { ClientUser } = require("discord.js");

class AnyUser extends ClientUser {

    constructor(client, user) {
        super(client, user);
    }

}

module.exports = AnyUser;
