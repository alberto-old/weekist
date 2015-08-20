Meteor.methods({
	isAdmin: function() {
		return ( Meteor.userId() == Meteor.settings.userAdmin );
	},
	getUsers: function() {
		if ( Meteor.userId() == Meteor.settings.userAdmin ) {
			var users = Meteor.users.find().fetch();
			return users;
		} else {
			return null;
		}
	}
});

Meteor.users.allow({
	fetch: ['_id']
});

Meteor.users.deny({
	update: function (userId, doc, fields, modifier) {
		return true;
	},
	fetch: ['locked'],
});