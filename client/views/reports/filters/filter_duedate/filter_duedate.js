Template.FilterDueDate.events({
	'click #show-duedate-checkbox': function (event) {
		var status = $('#show-duedate-checkbox').is(':checked');
		Session.set ('showDueDate', status);
	}
});

Template.FilterDueDate.onRendered ( function() {
	var status = $('#show-duedate-checkbox').is(':checked');
	Session.set ('showDueDate', status);	
})