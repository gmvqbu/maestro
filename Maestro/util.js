'use strict';

/**
 * Fetch a user from the client cache
 * @param {MaestroClient} client
 * @param {string} userID
 * @returns {Promise<ClientUser>}
 */
function fetchUser(client, userID) {
    return new Promise(async (resolve, reject) => {
        if (!userID.match(/^\d+$/)) reject(`The provided owner id syntax is incorrect.`);
        const user = await client.users.fetch(userID);
        if (!user) reject(`Could not find the specified user.`);
        resolve(user);
    });
}

/**
 * Set the username of a user
 * @param {ClientUser} user The user you want to update the username
 * @param {string} username The new value
*/
function setUsername(user, username) {
    if (typeof username != 'string') throw Error(`Username must be a string.`);
    user.setUsername(username)
        .then(user => console.log(`Updated username to ${user.username}.`))
        .catch(console.error);
}

module.exports = {
    fetchUser,
    setUsername
}
