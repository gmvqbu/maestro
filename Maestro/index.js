'use strict';

module.exports = {
    // Core
    Client: require('./src/client'),
    Dispatcher: require('./src/dispatcher'),
    Registry: require('./src/registry'),

    // Config
    Config: require('./src/tools/config/ConfigService'),

    // Tools
    User: require('./src/tools/User/UserService')
}
