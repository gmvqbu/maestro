'use strict';

module.exports = {
    // Core
    Client: require('./src/Client/Client'),
    Config: require('./src/Config/Config'),
    Message: require('./src/Message/Message'),

    // Tools
    User: require('./infrastructure/User/UserService')
}
