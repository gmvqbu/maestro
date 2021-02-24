'use strict';

// Heavily inspired by DiscordJS API errors module

const { Errors } = require('./messages');

const errors = new Map(Object.entries(Errors));

/**
 * Make an error message string.
 * @param {string} key Error key
 * @param {*} args Arguments to pass for util format or as function args
 * @returns {string}
 */
function error(key, ...args) {
	return message(errors, key, args);
}

/**
 * Format the message for any message.
 * @param {string} key Message key
 * @param {Array<*>} args Arguments to pass for util format or as function args
 * @returns {string} Formatted string
 */
function message(map, key, args) {
	if (typeof key !== 'string') throw new Error('Error message key must be a string');
	const msg = map.get(key);
	if (!msg) throw new Error(`An invalid error message key was used: ${key}.`);
	if (typeof msg === 'function') return msg(...args);
	if (args === undefined || args.length === 0) return msg;
	args.unshift(msg);
	return String(...args);
}

module.exports = {
	error
};
