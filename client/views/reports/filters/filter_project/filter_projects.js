Template.FilterProject.events({
	'change #project-select': function (event) {
		event.preventDefault();

		var projectId = event.target.value;	
		Session.set ( "selectedProject", Number(projectId));
	}
});

Template.FilterProject.helpers({
	projects: function () {
		return Projects.find({owner: Meteor.userId()}, { sort: { name: 1} });
	}
});