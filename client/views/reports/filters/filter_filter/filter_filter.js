Template.FilterFilter.events({
	'change #filter-select': function (event) {
		event.preventDefault();

		console.log ("IMPLEMENT: change filter selected!");
	}
});

Template.FilterFilter.helpers({
	filters: function () {
		return Filters.find({owner: Meteor.userId()}, { sort: { query: 1} });
	}
});