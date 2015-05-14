function closingWindow () {
	Session.keys = {};
	Meteor.logout();
}

Meteor.startup(function () {
	$(window).bind ('beforeunload', function() {
		closingWindow();
	})
});