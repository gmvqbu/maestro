'use strict';

const BaseType = require('../types/base');
const BaseManager = require("./BaseManager");

class TypeManager extends BaseManager {

    /**
     * Register the default types
     */
    registerDefaults() {
        super.register([
            require('../types/string')
        ])
    }

    /**
     * Verify any type before save
     * @param {Function|Object} type
     * @returns {Object}
     */
    verify(type) {
        if (!BaseType.prototype.isPrototypeOf(type.prototype)) throw Error(`The provided type must be an object extending BaseType.`);
        type = new type(this.client);
        this.browseCollectionForConflict(type.name);
        return {
            key: type.name,
            value: type
        }
    }

}

module.exports = TypeManager;
