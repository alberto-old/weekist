Meteor.items = {
	createNew: function (userId, item) {		
		var newItem = {
			owner: 			userId,
			item_id: 		item.id,
			project_id: 	item.project_id,
			content: 		item.content,
			due_date:   	item.due_date,
			labels: 		item.labels,
			is_deleted: 	item.is_deleted,
			is_archived: 	item.is_archived,
			checked: 		item.checked,
			priority: 		item.priority,
			children: 		item.children
			// completed_date: null,
        	// year_week: 		null,
        	// year: 			null,
        	// month: 			null,
        	// week: 			null
		}
		return newItem;
	},
	createNewCompleted: function (userId, item) {
		var completedDate = new Date(item.completed_date);
		var newItem = {
			owner: 			userId,
			item_id: 		item.id,
			project_id: 	item.project_id,
			content: 		item.content,
        	completed_date: completedDate,
        	yearWeek: 		completedDate.getYearWeek(),
        	year: 			completedDate.getFullYear(),
        	month: 			completedDate.getMonth() + 1,
        	week: 			completedDate.getWeek()		
        }
		return newItem;
	},
	updateCompletedDate: function ( item, completedDate ) {
		item.completed_date = completedDate;
		item.yearWeek 		= completedDate.getYearWeek(),
        item.year 			= completedDate.getFullYear(),
        item.month 			= completedDate.getMonth() + 1,
        item.week 			= completedDate.getWeek()
		return item;
	},
	updateCompletedItems: function ( userId, items ) {
		// update each completed item		
		for (var i in items) {
			// get the item from the Items collection (if exists)
			var item = Items.findOne( { owner: userId, item_id: items[i].id });
			var newItem = null;

			// if exists
			if (item) {
				// update the completed date
				newItem = Meteor.items.updateCompletedDate ( item, new Date(items[i].completed_date) );
				Items.update ( { owner: userId, _id: item._id }, { $set: newItem }, { upsert: true });
			} else {
				// create a new item with the information available for a "completed item" in Todoist
				newItem = Meteor.items.createNewCompleted ( userId, items[i] );
				Items.insert (newItem);
			}

			// update the Weeks collection
			Meteor.weeks.updateWeeksWithItem(userId, newItem);
		}		
	}
}