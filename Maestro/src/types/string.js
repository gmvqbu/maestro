'use strict';

const BaseType = require("./type");

class StringType extends BaseType {

    constructor(client) {
        super(client, {
            name: 'string'
            // peut-être remplacer la méthode validate par un function.call dans BaseType
            // avec un donnée validator qui peut être soit une regex soit un fonction pour les types plus complexes
            // validator: new RegExp(/^\w+$/, 'i')
            // ou
            // validator: this.validate
        })
    }

    validate(value) {
        return value.match(/^\w+$/i) ? true : false;
    }

    format(value) {
        return String(value);
    }

}

module.exports = StringType;
