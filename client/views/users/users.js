Template.Users.helpers({
	users: function () {
		return Session.get('weekistUsers');
	}
});

Template.Users.created = function () {
	Meteor.call('getUsers', function (error, result) {
		Session.set("weekistUsers", result);
	});	
};