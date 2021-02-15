'use strict';

const { RegularExpressions } = require('../util/constants');

/**
 * Match a register regex
 * @param {*} value
 * @param {string} key
 * @param {*} args
 */
function match(value, key, ...args) {
    if (typeof key != 'string') throw Error(`Regex key must be a string.`);
    const regex = RegularExpressions.get(key);
    if (typeof regex === 'function') return value.match(regex(...args)) ? true : false;
    if (!regex) throw Error(`An invalid regex key was used: ${key}.`);
    return value.match(regex) ? true : false;
}

function matchCustom(value, regex) {
    if (!(regex instanceof RegExp)) throw Error(`Regular expression must be an instance of RegExp`);
    return value.match(regex) ? true : false;
}

module.exports = {
    match,
    matchCustom
}
