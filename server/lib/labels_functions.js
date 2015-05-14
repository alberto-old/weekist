Meteor.labels = {
	createNew: function (userId, label) {		
		var newLabel = {
			owner: 			userId,
			label_id: 		label.id,
			name: 			label.name,
			is_deleted: 	label.is_deleted,
		}

		console.log ("new " + JSON.stringify(newLabel) )
		return newLabel;
	}
}