'use strict';

const { RegularExpressions } = require('../util/constants');

/**
 * Comparison beetween two strings
 * @function
 * @param {string} value1
 * @param {string} value2
 */
function matchString(value1, value2) {
    return (value1 === value2);
}

/**
 * Match a registered regex
 * @function
 * @param {*} value
 * @param {string} key
 * @param {*} args
 * @returns {Boolean}
 */
function matchRegex(value, key, ...args) {
    if (typeof key != 'string') throw Error(`Regex key must be a string.`);
    const regex = RegularExpressions.get(key);
    if (typeof regex === 'function') return value.match(regex(...args)) ? true : false;
    if (!regex) throw Error(`An invalid regex key was used: ${key}.`);
    return value.match(regex) ? true : false;
}

/**
 * Match a custom regex
 * @function
 * @param {*} value
 * @param {RegExp} regex
 * @returns {Boolean}
 */
function matchCustomRegex(value, regex) {
    if (!(regex instanceof RegExp)) throw Error(`Regular expression must be an instance of RegExp`);
    return value.match(regex) ? true : false;
}

module.exports = {
    matchString,
    matchRegex,
    matchCustomRegex,
}
