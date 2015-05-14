Template.FilterNotes.events({
	'click #show-notes-checkbox': function (event) {
		var status = $('#show-notes-checkbox').is(':checked');
		Session.set ('showNotes', status);
	}
});

Template.FilterNotes.onRendered ( function() {
	var status = $('#show-notes-checkbox').is(':checked');
	Session.set ('showNotes', status);	
})