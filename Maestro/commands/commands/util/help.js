'use strict';

const { MessageEmbed } = require("discord.js");
const Command = require("../../base");

class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            alias: ['h', 'aide', 'commands', 'commandes'],
            description: "affiche ce message d'aide."
        });
    }

    run(msg) {
        const commands = Array.from(this.client.registry.commands.collection.values())
        // console.log(commands.map(cmd => `\`${cmd.name}\` ${cmd.description ? `: ${cmd.description}` : ''}`).join("\n"))
        const embed = new MessageEmbed()
            .setColor('#EA2027')
            .setTitle(`Message d'aide`)
            .setFooter(this.client.user.username)
            .setTimestamp(new Date())
            .addField('Commandes', commands.map(cmd => `\`${this.client.prefix}${cmd.name}\` ${cmd.description ? `: ${cmd.description}` : ''}`).join("\n"))
        msg.reply(embed)
    }
}

module.exports = HelpCommand;
