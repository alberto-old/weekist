Template.FilterLabel.events({
	'change #label-select': function (event, template) {
		event.preventDefault();

		var labelId = event.target.value;	
		Session.set ( "selectedLabel", Number(labelId));
	}
});

Template.FilterLabel.helpers({
	labels: function () {
		return Labels.find({owner: Meteor.userId()}, { sort: { name: 1} });
	}
});
