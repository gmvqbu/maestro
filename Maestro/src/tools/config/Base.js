'use strict';

/**
 * Représente la configuration globale
 * @public
 * @class
 */
class BaseConfig {

    /**
     * The global config
     * @readonly
     * @type {Object<Object>}
     */
    static config = require('../../../../config/config.json');

}

module.exports = BaseConfig;
