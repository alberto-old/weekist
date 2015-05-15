TodoistV6 = {};

TodoistV6.whitelistedFields = ['client_id', 'scope', 'state', 'redirect_uri', 'client_secret', 'code' ];

OAuth.registerService('todoistv6', 2, null, function(query) {
	var response = getAccessToken(query);
	
	console.log (response);

});

function authorizeWithTodoist (config, state) {
    var todoistLoginURL = "https://todoist.com/oauth/authorize?";
    var params = {
        cliend_id: config.client_id,
        client_secret: OAuth.openSecret(config.client_secret),
        scope: config.scope,
        state: state
    };

    try {
        var data = HTTP.get(todoistLoginURL, { params: params });
        return data;
    } catch (e) {
        throw new Meteor.Error("login-error", "Login error: cannot validate user with Todoist server");
    }
}

function getAccessToken (state) {
	var config = ServiceConfiguration.configurations.findOne({service: 'todoistv6'});
	if (!config) {
		throw new ServiceConfiguration.ConfigError();
	}

	console.log (config);

	var response;
	try {
		response = authorizeWithTodoist (config, state);
	} catch (err) {
    	throw _.extend(new Error("Failed to complete OAuth handshake with Todoist. " + err.message), {response: err.response});
  	}

    if (response.data.error) { 
   		throw new Error("Failed to complete OAuth handshake with Todoist. " + response.data.error);
 	 } else {
    	return response.data.access_token;
  	}
}

TodoistV6.retrieveCredential = function(credentialToken, credentialSecret) {
	return OAuth.retrieveCredential(credentialToken, credentialSecret);
};


Meteor.methods({
	getAuthorization: function () {
		var state = Random.secret();
		getAccessToken (state);
	}
});