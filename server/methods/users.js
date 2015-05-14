// var userAdmin ="RPaLX7Sa5dsi6MR7B"; // admin en weekist real
var userAdmin = "v8T7EJzZ5DJCM8W8e";

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