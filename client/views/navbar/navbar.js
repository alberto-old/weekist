Template.NavBar.events({
  'click #logout': function(event) {
    event.preventDefault();
    Session.keys = {};
    Meteor.logout(function() {
      Router.go('/')
    });
  },
  'click #navbar-refresh-link': function(event) {
    event.preventDefault();

    NProgress.start();

    // Update Todoist data
    Meteor.call('updateTodoistData', Meteor.userId(), function(error, result) {
      if (error) {
        console.log(error.reason);
      }

      NProgress.done();
    });
  },
  'click #navbar-donate-link': function (event) {
    mixpanel.track("Paypal");
  },
	'click #navbar-walkthrough-link': function (event) {
		event.preventDefault();
		introJs().setOption('showStepNumbers', false).start();
    mixpanel.track("Tour");
	}
});

Template.NavBar.helpers({
  totalCompleted: function() {
    return Items.find({
      owner: Meteor.userId(),
      completed_date: {
        $exists: true
      }
    }).count();
  }
});
