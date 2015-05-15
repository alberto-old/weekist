TodoistV6 = {};

TodoistV6.requestCredential = function (options, credentialRequestCompleteCallback) {

  	if (!credentialRequestCompleteCallback && typeof options === 'function') {
	    credentialRequestCompleteCallback = options;
    	options = {};
  	}

  	var config = ServiceConfiguration.configurations.findOne({service: 'todoistv6'});
  	if (!config) {
    	credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError());
    	return;
  	}

  	var scope = Random.secret();
}