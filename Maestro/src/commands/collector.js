'use strict';

class ArgumentCollector {
    constructor(client, registry) {
        Object.defineProperty(this, 'client', { value: client });
        Object.defineProperty(this, 'registry', { value: registry });
    }

    /**
     * Collect and format all the required arguments
     * @param {Object} command
     * @param {Array<string>} values
     */
    collect(command, values) {
        if (!Array.isArray(values)) throw Error(`Arguments must be an array.`);
        if (values.length < command.argsCount) return this.checkMissingArguments(command, values);
        const args = this.formatArguments(command, values);
        if (typeof args != 'object') {
            return (args.length > 1)
                ?
                `je ne peux pas effectuer la commande \`${command.name}\` car les arguments suivants sont invalides : \`${missing.join('`, `')}\`.`
                :
                `je ne peux pas effectuer cette commande \`${command.name}\` car l'argument \`${String(missing)}\` est invalide.`;
        }
        return args;
    }

    /**
     * Verify and format all the given arguments
     * @param {*} command
     * @param {*} values
     */
    formatArguments(command, values) {
        let formattedValues = [];
        let invalid = [];
        values.forEach((value, k) => {
            const arg = command.args[k];
            const type = this.registry.types.get(arg.type);

            if (!type.validate(value)) invalid.push(arg.label);
            else formattedValues.push(type.format(value));
        });
        if (invalid.length > 0) return invalid;
        return this.makeEntries(command, formattedValues);
    }

    /**
     * Return entries by merging argument keys and input values
     * @param {Object} command
     * @param {Array<string>} values
     */
    makeEntries(command, values) {
        let entries = new Object();
        const args = command.args;
        for (const arg of args) {
            entries[arg.key] = arg.infinite ? values.join(' ') : values.shift();
        }
        return entries;
    }

    /**
     * Count missing arguments and prompt the missing ones
     * @param {*} values
     * @param {*} command
     */
    checkMissingArguments(values, command) {
        const expectedCount = command.argsCount;
        const givenCount = values.length;
        let missing = [];
        for (let i = givenCount; i < expectedCount; i++) {
            missing.push(command.args[i].label)
        }
        return (missing.length > 1)
            ?
            `je ne peux pas effectuer la commande \`${command.name}\` car il manque les arguments suivants : \`${missing.join('`, `')}\`.`
            :
            `je ne peux pas effectuer cette commande \`${command.name}\` car il manque l'argument \`${String(missing)}\`.`;
    }

}

module.exports = ArgumentCollector;
