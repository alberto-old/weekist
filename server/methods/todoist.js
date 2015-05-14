/**
 * Update the Todoist information for the user syncing from Todoist server
 * @param  {User} user from where to get the information
 */
function updateTodoistSyncDataForUser ( user ) {
	// Construct the request with user Todoist API token and last seq_no
	var params = {
		token: user.profile.apiToken,
		seq_no: user.profile.seq_no,
		seq_no_global: user.profile.seq_no_global,
		resource_types: '["projects", "labels", "notes", "filters", "items"]'
	};	

	// Request data to Todoist server
	var data = Meteor.todoist.getSyncData (params);
	
	// Get updated projects, items, labels, notes (1st time we'll get everything)
	var projects = JSON.parse (data.content).Projects;
	var labels   = JSON.parse (data.content).Labels;
	var notes    = JSON.parse (data.content).Notes;	
	var filters  = JSON.parse (data.content).Filters;
	var items    = JSON.parse (data.content).Items;

	// Get the seq_no from server for subsequent calls
	var newSeqNo = JSON.parse (data.content).seq_no;
	var newSeqNoGlobal = JSON.parse (data.content).seq_no_global;

	// Update projects
	Meteor.user.updateProjects (user._id, projects);

	// Update labels
	Meteor.user.updateLabels (user._id, labels);

	// Update notes
	Meteor.user.updateNotes (user._id, notes);

	// Update filters
	Meteor.user.updateFilters (user._id, filters);

	// Update items
	Meteor.user.updateItems (user._id, items);

	if (user.profile.initialized && user.profile.lastCompletedDate) {
		updateCompletedItemsToDate (user, user.profile.lastCompletedDate.formatTodoist(), 0);
	} else {
		// Update completed items
		updateCompletedItemsFromDate (user, (new Date()).formatTodoist(), 0);
		Meteor.user.setProfileInitialized (user._id, true);
		Meteor.user.setProfileVersion (user._id, "2.0.3");
	}

	// Update user seq_no for subsequent calls
	Meteor.user.updateSeqNo (user._id, newSeqNo);
	Meteor.user.updateSeqNoGlobal ( user._id, newSeqNoGlobal);

	// Update last completed date
	Meteor.user.updateLastCompletedDate (user._id);
}

function updateCompletedItemsFromDate (user, date, offset) {

	// get completed items
	var data = Meteor.todoist.getCompletedItemsFromDate ( user.profile.apiToken, date, offset );

	// if there is any completed item
    if (data) {
    	// get the items in JSON format
        var items = JSON.parse(data.content).items;

		// update completed items
		Meteor.items.updateCompletedItems (user._id, items);
		
        // if the number of items completed is 50 then there may be more to update
        if (items.length == 50) {
     		// if the user has not been initialized then keep on updating
          	updateCompletedItemsFromDate (user, date, offset+50);
        }
    } else {
        throw new Meteor.Error("connection error", "Error connection: cannot retrieve completed items from server");
    }
}

function updateCompletedItemsToDate (user, date, offset) {

	// get completed items
	var data = Meteor.todoist.getCompletedItemsToDate ( user.profile.apiToken, date, offset );

	// if there is any completed item
    if (data) {
    	// get the items in JSON format
        var items = JSON.parse(data.content).items;

		// update completed items
		Meteor.items.updateCompletedItems (user._id, items);
		
        // if the number of items completed is 50 then there may be more to update
        if (items.length == 50) {
     		// if the user has not been initialized then keep on updating
          	updateCompletedItemsToDate (user, date, offset+50);
        }
    } else {
        throw new Meteor.Error("connection error", "Error connection: cannot retrieve completed items from server");
    }
}


Meteor.methods({
	updateTodoistData: function ( userId ) {
		var user = Meteor.users.findOne({ _id: userId });

		if (user) {
			// make sure that the data of the user gets updated for the new version
			if (user.profile.version != "2.0.3") {
				user.profile.initialized = false;
				user.profile.lastCompletedDate = null;
			} 
			updateTodoistSyncDataForUser(user);
		} else {
    		console.log ("Error: userId does not exist");
    		throw new Meteor.error("user-error", "Error: user " + userId + " does not exist");			
		}
	},
	updateNotesForCompletedTasks: function ( userId ) {
		var user = Meteor.users.findOne({ _id: userId });
		
		// Update notes for completed items (not all the notes are returned with Sync API)
		var completedItems = Items.find({owner: userId, completed_date: {$exists: true} }).fetch();
		Meteor.user.updateNotesForCompletedItems ( user, completedItems );
	}
});