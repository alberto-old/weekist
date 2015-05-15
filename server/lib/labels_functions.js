Meteor.labels = {
	createNew: function (userId, label) {		
		var newLabel = {
			owner: 			userId,
			label_id: 		label.id,
			name: 			label.name,
			is_deleted: 	label.is_deleted,
		}

		return newLabel;
	}
}