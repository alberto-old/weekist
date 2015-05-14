// Define the collections: Weeks
Weeks = new Mongo.Collection ( 'weeks' );

// Publish the weeks filtered by userId
Meteor.publish ( 'weeks', function(userId) {
	return Weeks.find ( { owner: userId } );
});