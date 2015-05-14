Template.Footer.helpers({
	version: function () {
		return Session.get( "weekistVersion" );
	}
});

Template.Footer.onRendered ( function() {
	Meteor.call ( 'getVersion', function (error, result) {
		if (error) {
			console.log (error.reason);
			Session.set ( "weekistVersion", "1.0");
		} else {
			Session.set ( "weekistVersion", result);
		}
	});
})