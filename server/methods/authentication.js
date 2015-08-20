// Register a new function to make the login through loginTodoist
Accounts.registerLoginHandler(loginTodoist);

/**
 * REST call to https://todoist.com/API/v6/login? with email and password
 * @param  loginRequest includes .email and .password
 * @return the result from Todoist server
 */
function todoistLoginRequest(loginRequest) {
    var todoistLoginURL = "https://todoist.com/API/v6/login?";
    var params = {
        email: loginRequest.todoist.email,
        password: loginRequest.todoist.password
    };

    try {
        var data = HTTP.get(todoistLoginURL, {
            params: params
        });
        return data;
    } catch (e) {
        throw new Meteor.Error("login-error", "Login error: cannot validate user with Todoist server");
    }
}


/**
 * Login through Todoist
 * @param  loginRequest information containing e-mail and password to make the login
 * @return user id or false / error
 */
function loginTodoist(loginRequest) {
    if (!loginRequest.todoist) {
        return undefined;
    } else {

        try {
            var result = todoistLoginRequest(loginRequest);

            if (result && result.statusCode == "200") {
                var content = result.content;            
                var isPremium = JSON.parse(content).is_premium;
                var userId = null;
                var user = Meteor.users.findOne({
                    username: loginRequest.todoist.email
                });

                if (isPremium || ( user._id == Meteor.settings.userAdmin )) {

                    if (!user) {
                        var fullName = JSON.parse(content).full_name;
                        var token = JSON.parse(content).token;
                        var newUserData = Meteor.user.createNew(loginRequest.todoist.email, fullName, token);
                        userId = Meteor.users.insert(newUserData);
                        mixpanel.track ("New user");
                    } else {
                        userId = user._id;
                    }

                    return {
                        userId: userId
                    };
                } else {
                    throw new Meteor.Error("login-error", "Sorry, Weekist only works with Todoist Premium users");
                    return false;
                }
            }
        } catch (e) {
            throw new Meteor.Error(e.error, e.reason);
            return false;
        }
    }
}