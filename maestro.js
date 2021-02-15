'use strict';

const { Client, Config, User } = require('./Maestro/');

const client = new Client({
    prefix: Config.botPrefix,
    ownerID: Config.botOwner
});

client.on('ready', () => {
    const bot = new User(client, client.user);
    console.log(`Logged in as ${bot.tag} !`);

});

client.on('message', message => {

    /*
        Vérifier si ça matche
    */

});

client.login(Config.botToken);
