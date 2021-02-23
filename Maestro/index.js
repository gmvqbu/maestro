'use strict';

module.exports = {
    // Core
    Client: require('./client'),
    Dispatcher: require('./dispatcher'),
    Registry: require('./registry'),
    Config: require('./config'),

    // Tools
    User: require('./tools/user/UserService')
}
