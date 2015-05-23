var requireLogin = function() {
	if ( !Meteor.user() ) {
 		// If user is not logged in render landingpage
   		this.render ( 'Home' );
 	} else {
   		//if user is logged render whatever route was requested
   		this.next();
 	}
}

// Before any routing run the requireLogin function.
// Except in the case of "landingpage".
// Note that you can add more pages in the exceptions if you want. (e.g. About, Faq, contact...)
Router.onBeforeAction(requireLogin, {except: ['home']});

Router.map ( function() {
	this.route ( '/', {
		path: '/',
		name: 'home',
		template: 'Home',
		fastRender: true,
		onAfterAction: function() {
			document.title = "Weekist - the easiest way to generate reports for Todoist"
		}
	}),
	this.route ( '/reports', {
		path: '/reports',
		name: 'reports',
		template: 'Reports',
		waitOn: function() {
			Meteor.subscribe( 'items', Meteor.userId() );
			Meteor.subscribe( 'weeks', Meteor.userId() );
			Meteor.subscribe( 'notes', Meteor.userId() );
			Meteor.subscribe( 'projects', Meteor.userId() );
			Meteor.subscribe( 'labels', Meteor.userId() );
			Meteor.subscribe( 'filters', Meteor.userId() );
		},
		fastRender: true,
		onAfterAction: function() {
			document.title = "Weekist - the easiest way to generate reports for Todoist"
		}
	})
})
