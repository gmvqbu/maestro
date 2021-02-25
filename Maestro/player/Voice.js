'use strict';

class Voice {
    /** This instance */
    static $instance = null;

    /**
     * Get the voice instance
     * @param {MaestroClient|Discord.Client} client
     */
    static instance(client) {
        if (this.$instance === null) {
            this.$instance = new this(client)
        }
        return this.$instance;
    }

    /**
     * This voice connection
     * @type {Discord.VoiceConnection}
     */
    VoiceConnection;

    constructor(client) {
        Object.defineProperty(this, 'client', { value: client });
    }

    /**
     * @type {Discord.VoiceConnection}
     */
    get connection() {
        return this.VoiceConnection ?? null;
    }

    /**
     * @type {Discord.VoiceConnection}
     */
    set connection(value) {
        this.VoiceConnection = value;
    }

    /**
     * Connect bot to voice
     * @param {Discord.Message} msg
     * @param {Discord.VoiceChannel} channel
     */
    async connect(msg, channel) {
        const reply = await msg.reply(`connection en cours...`);
        if (this.connection) return reply.edit(`${msg.author}, je suis déjà connecté au salon \`#${this.connection.channel.name}\`.`);
        this.connection = await channel.join();
        this.connection.on('failed', console.error);
        return reply.edit(`${msg.author}, connecté au salon \`#${this.connection.channel.name}\`.`);
    }

    /**
     * Disconnect bot from voice
     * @param {Discord.Message} msg
     */
    async disconnect(msg) {
        const reply = await msg.reply(`déconnection...`);
        this.connection = await this.connection.channel.leave();
        return reply.edit(`${msg.author}, déconnecté.`);
    }
}

module.exports = Voice;
