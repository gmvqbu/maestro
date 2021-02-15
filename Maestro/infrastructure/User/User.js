'use strict';

const { ClientUser } = require("discord.js");

/**
 * Represents a user
 * @public
 * @class
 */
class UserService extends ClientUser {

    constructor(client, user) {
        super(client, user);
    }

    /**
     * Wether the username match or not
     * @param {string} expected The expected username
     * @returns {Boolean}
     */
    matchUsername(username) {
        return (this.username === username);
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

module.exports = UserService;
