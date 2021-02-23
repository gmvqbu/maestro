'use strict';

const CommandManager = require("./registry/CommandManager");
const TypeManager = require("./registry/TypeManager");

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
}

module.exports = Registry;
