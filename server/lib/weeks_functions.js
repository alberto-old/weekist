Meteor.weeks = {
	updateWeeksWithItem: function (userId, item) {		
		if (!Weeks.findOne({ owner: userId,  yearWeek: item.yearWeek, week: item.week })) {
        	Weeks.insert({
          		owner: userId,
          		yearWeek: item.yearWeek,
          		week: item.week
        	});
    	}	
	}    
}
