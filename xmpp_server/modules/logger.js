var xmpp = require('node-xmpp');
var logger = require('winston');

// http://xmpp.org/extensions/xep-0160.html
// Logs common occuring requests

function format_log(client, message) {
    return [client.server.options.port, client.streamId, message].join(" "); 
}

function Logger() {
}

exports.configure = function(server, config) {
    // Config contains the configuration for the logger facility!
    // The logger relies purely on events... 
    // From there, we can access and listen to events on all objects linked to that server, including the router, the session manager, the connections... etc.
    if(config) {
        server.on("connect", function(client) {
            logger.debug(format_log(client, "connected"));

            client.on('session-started', function() {
                logger.info(format_log(client, stanza.toString()));
            });

            client.on('auth-success', function(jid) {
                logger.info(format_log(client, "auth-success " + jid));
            });

            client.on('online', function() {
                logger.info(format_log(client, "online " + client.jid));
            });

            client.on('auth-failure', function(jid) {
                logger.info(format_log(client, "auth-failure " + jid));
            });

            client.on('registration-success', function(jid) {
                logger.info(format_log(client, "registration-success " + jid));
            });

            client.on('registration-failure', function(jid) {
                logger.info(format_log(client, "registration-failure " + jid));
            });
        });
    }
}
