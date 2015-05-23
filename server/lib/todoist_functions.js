Meteor.todoist = {
	/**
	 * Generic function to get data from Todoist server
	 * @param  {String} request base http call to Todoist server
	 * @param  {String} params  parameters for the http call
	 * @return {JSON} result from the request
	 */
	getData: function ( request, params ) {
		try {
    		var data = HTTP.get ( request, { params: params } );
    		return data;
    	} catch (e) {
    		return null;
    	}
	},
	/**
	 * Get Todoist using Todoist Sync API v5 (generic call)
	 * @param  params for the request
	 * @return request from Todoist server
	 */
	getSyncData: function ( params ) {
		var request = "https://todoist.com/API/v6/sync?"
    	return Meteor.todoist.getData ( request, params );
	},
	/**
	 * Call to the API/getAllCompletedItems
	 * @return result of the http request
	 * @param apiToken - string with user's Todoist API token
	 * @param date - date from which we have to look for (backwards)
	 * @param offset - used for pagination, when more than the limit tasks are returned
	 */
	getCompletedItemsFromDate: function (apiToken, date, offsetValue) {
		var request = 'https://todoist.com/API/v6/get_all_completed_items?'
    	var params = {
        	token: apiToken,
        	// from_date: date,
        	date: date,
        	limit: 50, 
        	offset: offsetValue
    	};

    	return Meteor.todoist.getData ( request, params );
	},
	/**
	 * Call to the API/getAllCompletedItems
	 * @return result of the http request
	 * @param apiToken - string with user's Todoist API token
	 * @param date - date from which we have to look for (backwards)
	 * @param offset - used for pagination, when more than the limit tasks are returned
	 */
	getCompletedItemsToDate: function (apiToken, date, offsetValue) {
		var request = 'https://todoist.com/API/v6/get_all_completed_items?'
    	var params = {
        	token: apiToken,
        	// to_date: date,
        	date: date,
        	limit: 50, 
        	offset: offsetValue
    	};

    	return Meteor.todoist.getData ( request, params );
	},
	getNotesForItem: function ( apiToken, itemId ) {
		var request = 'http://todoist.com/API/getNotesData?';
		var params = {
			token: apiToken,
			item_id: itemId
		};

    	return Meteor.todoist.getData ( request, params );	
	}
}