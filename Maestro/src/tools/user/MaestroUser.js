'use strict';

const AnyUser = require("./AnyUser");

class MaestroUser extends AnyUser {

    constructor(client, user) {
        if (!user.bot) throw Error(`This class can only be instantiated for this bot.`);
        super(client, user);
    }

    /**
     * Replaces the user's username
     * @param {string} username The new username
     */
    updateUsername(username) {
        if (typeof username != 'string') throw Error(`Type of username must be a string.`);
        this.setUsername(username)
            .then(user => console.log(`Updated username from ${username} to ${user.username}.`))
            .catch(console.error);
    }

}

module.exports = MaestroUser;
