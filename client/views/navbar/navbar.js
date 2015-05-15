Template.NavBar.events({
	'click #logout': function (event) {
		event.preventDefault();
		Session.keys = {};
		Meteor.logout(function() {
			Router.go('/')
		});
	},
	'click #navbar-refresh-link': function (event) {
		event.preventDefault();

		NProgress.start();
        
        // Update Todoist data
        Meteor.call ( 'updateTodoistData', Meteor.userId(), function (error, result) {            
            if ( error ) {
                console.log ( error.reason );
            }

            NProgress.done();
        });
	}
});

Template.NavBar.helpers({
	totalCompleted: function () {
		return Items.find({owner: Meteor.userId(), completed_date: {$exists: true} }).count();
	}
});