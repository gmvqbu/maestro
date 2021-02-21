'use strict';

const { matchRegex } = require("../../../util/util");
const AnyUser = require("./AnyUser");
const MaestroUser = require("./MaestroUser");

/**
 * Represent a user
 * @class
 */
class UserService {

    /**
     * @param {MaestroClient} client
     * @param {ClientUser} user
     */
    constructor(client, user) {
        if (user.equals(client.user)) return new MaestroUser(client, user);
        else return new AnyUser(client, user);
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
            resolve(new this(this, user));
        });
    }
}

module.exports = UserService;
