Meteor.notes = {
	createNew: function (userId, note) {
		var newNote = {
			owner: 		userId,
			note_id: 	note.id,
			is_deleted: note.is_deleted,
			is_archived:note.is_archived,
			content: 	note.content,
			item_id: 	note.item_id,
			project_id: note.project_id,
		}
		return newNote;
	}
}