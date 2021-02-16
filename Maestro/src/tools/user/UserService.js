'use strict';

const Discord = require("discord.js");
const { matchRegex } = require("../../../util/util");
const AnyUser = require("./AnyUser");
const BotUser = require("./BotUser");

/**
 * Represent a user
 * @class
 */
class UserService {

    /**
     * Creates a User object for bot client only
     * Used for this client only
     * @param {MaestroClient} client
     * @param {Discord.ClientUser} user
     * @return {BotUser}
     */
    static bot(client, user) {
        return new BotUser(client, user);
    }

    /**
     * Creates a User object from any Disord user
     * @param {MaestroClient} client
     * @param {Discord.ClientUser} user
     * @return {AnyUser}
     */
    static any(client, user) {
        return new AnyUser(client, user);
    }

    /**
     * Creates an AnyUser Object from a fetched discord user
     * @param {MaestroClient} client
     * @param {string} userID
     * @returns {Promise<AnyUser>}
     */
    static fetch(client, userID) {
        return new Promise(async (resolve, reject) => {
            if (!matchRegex(userID, 'ID_PATTERN')) reject(`The provided owner id syntax is incorrect.`);
            const user = await client.users.fetch(userID);
            if (!user) reject(`Could not find the bot owner.`);
            resolve(this.any(this, user));
        });
    }

}

module.exports = UserService;
