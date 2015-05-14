Meteor.user = {
	createNew: function ( email, fullName, token ) {
		var newUserData = {
    		username: email,
    		profile: {
        		name: fullName,
        		apiToken: token,
        		initialized: false,
        		lastCompletedDate: null,
        		seq_no: 0,
        		seq_no_global: 0
    		}
    	};

		return newUserData;
	},
	updateProjects: function ( userId, projects ) {
		if (projects) {
			for (var p in projects) {
				var newProject = Meteor.projects.createNew ( userId, projects[p] );

				Projects.update ( 
					{ owner: userId, project_id: projects[p].id }, 
					{ $set: newProject },
					{ upsert: true } );
			}
		}
	},
	updateLabels: function ( userId, labels ) {
		if (labels) {
			for (var l in labels) {
				var newLabel = Meteor.labels.createNew ( userId, labels[l] );

				Labels.update (
					{ owner: userId, label_id: labels[l].id },
					{ $set: newLabel }, 
					{ upsert: true } );
			}
		}
	},
	updateNotes: function ( userId, notes ) {
		if (notes) {
			for (var n in notes) {
				var newNote = Meteor.notes.createNew ( userId, notes[n] );

				Notes.update (
					{ owner: userId, note_id: notes[n].id },
					{ $set: newNote },
					{ upsert: true } );
			}
		}
	},
	updateFilters: function ( userId, filters ) {
		if (filters) {
			for (var f in filters) {
				var newFilter = Meteor.filters.createNew ( userId, filters[f] );

				Filters.update (
					{ owner: userId, filter_id: filters[f].id },
					{ $set: newFilter },
					{ upsert: true } );
			}
		}
	},
	updateNotesForCompletedItems: function ( user, items ) {
		if (items) {
			for (var i in items) {
				var data = Meteor.todoist.getNotesForItem ( user.profile.apiToken, items[i].item_id );

				if (data) {
					var notes = JSON.parse(data.content).notes;

					if (notes) {
						for (n in notes) {
							var newNote = Meteor.notes.createNew (user._id, notes[n]);
							var existingNote = Notes.findOne({owner: user._id, note_id: newNote.note_id });

							if ( existingNote == undefined ) {
								Notes.insert ( newNote );
							} 						
						}
					}
				}
			}
		}
	},
	updateItems: function ( userId, items ) {
		var numItems = 0;
		if (items) {
			for (var i in items) {
				var newItem = Meteor.items.createNew ( userId, items[i] );

				Items.update (
					{ owner: userId, item_id: items[i].id },
					{ $set: newItem },
					{ upsert: true } );
			}
			numItems = items.length;
		}
		return numItems;
	},
	updateSeqNo: function ( userId, seq_no ) {
		Meteor.users.update( {_id: userId }, { $set: { "profile.seq_no": seq_no }});	
	},
	updateSeqNoGlobal: function ( userId, seq_no_global ) {
		Meteor.users.update ( {_id: userId }, { $set: { "profile.seq_no_global": seq_no_global }});
	},
	updateLastCompletedDate: function (userId) {
		var last = new Date(Items.find({ owner: userId }, { sort: { completed_date: -1 }}).fetch()[0].completed_date);
		last.setHours(0,0,0);
		Meteor.users.update({ _id: userId }, { $set: { "profile.lastCompletedDate": last } });
	},
	setProfileInitialized: function (userId, status) {
		Meteor.users.update({ _id: userId }, { $set: { "profile.initialized": status} });
	},
	setProfileVersion: function (userId, version) {
		Meteor.users.update({ _id: userId }, { $set: { "profile.version": version} });	
	}
}