'use strict';

const Errors = {
    UNKNOWN_COMMAND: `cette commande n'existe pas. Essayez plutôt \`$help\`.`,
    MISSING_ARGUMENTS: (cmdName, missing) =>
        (missing.length > 0)
            ?
            `je ne peux pas effectuer la commande \`${cmdName}\` car il manque les arguments suivants : \`${missing.join('`, `')}\`.`
            :
            `je ne peux pas effectuer la commande \`${cmdName}\` car il manque l'argument \`${missing.join('`, `')}\`.`,
    WRONG_ARGUMENTS: (cmdName, wrong) =>
        (wrong.length > 0)
            ?
            `je ne peux pas effectuer la commande \`${cmdName}\` car les arguments suivants sont invalides : \`${wrong.join('`, `')}\`.`
            :
            `je ne peux pas effectuer la commande \`${cmdName}\` car l'argument \`${wrong.join('`, `')}\` est invalide.`,
}

module.exports = {
    Errors
}
