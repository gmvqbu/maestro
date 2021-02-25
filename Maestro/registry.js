'use strict';

const CommandManager = require("./managers/CommandManager");
const TypeManager = require("./managers/TypeManager");

class Registry {
    constructor(client) {
        Object.defineProperty(this, 'client', { value: client });

        /**
         * Maestro command manager
         * @type {CommandManager}
         */
        this.commandManager = new CommandManager(client, this);

        /**
         * Maestro type manager
         * @type {TypeManager}
         */
        this.typeManager = new TypeManager(client, this);
    }

    /**
     * @type {CommandManager}
     * @readonly
     */
    get commands() {
        return this.commandManager;
    }

    /**
     * @type {TypeManager}
     * @readonly
     */
    get types() {
        return this.typeManager;
    }

    /**
     * Launch the registerDefaults of each manager
     */
    registerDefaults() {
        this.typeManager.registerDefaults()
            .commandManager.registerDefaults();
    }

}

module.exports = Registry;
