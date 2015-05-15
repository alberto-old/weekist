Accounts.oauth.registerService('todoistv6');

Meteor.loginWithTodoist = function (options, callback) {
	// support a callback without options
    if (! callback && typeof options === "function") {
        callback = options;
        options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    TodoistV6.requestCredential(options, credentialRequestCompleteCallback);
};
