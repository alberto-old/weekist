Template.Login.events({
	'submit form': function (event) {
		event.preventDefault();

		// clean login form error
		Session.set ('loginFormError', null);

        // Read value of the elements in the form
        var userEmail = event.target.email.value;
        var userPassword = event.target.password.value;

        // Invoke login method in server
        var loginRequest = {
            todoist: {
                email: userEmail,
                password: userPassword
            }
        };

        Accounts.callLoginMethod({
            methodArguments: [loginRequest],
            userCallback: function(error, result) {
                if (error) {
                    Session.set('loginFormError', error.reason);
                } else {
                    Router.go('/reports');
                }
            }
        });
	},
    'click #todoist-auth-btn': function (event) {
        event.preventDefault();

        Meteor.call("getAuthorization", function (error, result) {
            if (error) {
                console.log (error.reason);
            } else {
                console.log (result);
            }
        })
    }
});


Template.Login.helpers({
	loginFormErrorVisibility: function () {
		if (Session.get('loginFormError')) {
			return "block";
		} else {
			return "none";
		}
	},
	loginFormError: function() {
		return Session.get ('loginFormError');
	}
});
