Meteor.filters = {
	createNew: function (userId, filter) {		
		var newFilter = {
			owner: 			userId,
			filter_id: 		filter.id,
			query: 			filter.query,
		}
		return newFilter;
	}
}