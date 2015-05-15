var userAdmin ="WWSKnfPaGzvuciWxn"; // admin en weekist real

Meteor.methods({
	isAdmin: function() {
		return (Meteor.userId() == userAdmin);
	},
	getUsers: function() {
		if ( Meteor.userId() == userAdmin ) {
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