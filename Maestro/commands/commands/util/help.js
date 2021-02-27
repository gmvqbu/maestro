'use strict';

const { MessageEmbed } = require("discord.js");
const Command = require("../../base");

class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            alias: ['h', 'aide', 'commands', 'commandes'],
            description: "affiche ce message d'aide.",
            args: [
                {
                    key: 'command',
                    label: 'Commande',
                    type: 'command',
                    default: 'help',
                }
            ]
        });
    }

    async run(msg, args) {
        const cmd = await args.command;
        if (cmd && cmd.name !== 'help') return this.helpCommand(msg, cmd)
        else this.helpAll(msg)
    }

    helpAll(msg) {
        const commands = Array.from(this.client.registry.commands.collection.values())
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Message d'aide`)
            .setFooter(this.client.user.username)
            .setTimestamp(new Date())
            .addField('Commandes', commands.map(cmd => `\`${this.client.prefix}${cmd.name}\` ${cmd.description ? `: ${cmd.description}` : ''}`).join("\n"))
        msg.reply(embed);
    }

    helpCommand(msg, command) {
        const args = command.argsCollector ? ` ${command.argsCollector.args.map(arg => arg.format).join(' ')}` : '';
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Message d'aide - Commande \`${this.client.prefix}${command.name}\``)
            .setFooter(this.client.user.username)
            .setTimestamp(new Date())
            .addField('Commande', `\`${this.client.prefix}${command.name}${args}\` ${command.description ? `: ${command.description}` : ''}`)
        if (command.alias.length > 0) {
            embed.addField('Alias', command.alias.map(alias => `\`${this.client.prefix}${alias}\``).join(', '))
        }
        msg.reply(embed);
    }
}

module.exports = HelpCommand;
