// Create collections
Items = new Mongo.Collection ( 'items' );
Weeks = new Mongo.Collection ( 'weeks' );
Notes = new Mongo.Collection ( 'notes' );
Labels = new Mongo.Collection ( 'labels' );
Projects = new Mongo.Collection ( 'projects' );
Filters = new Mongo.Collection ( 'filters' );


function prepareReportMonth(labelId) {
	var year = Session.get ("selectedYear");
	var month = Session.get ("selectedMonth");
	var selectedDate = moment ([year, month]);
	
	if (labelId) {
		selector = { owner: Meteor.userId(), year: year, month: month+1, labels: {$in: [labelId] }};
	} else {
		selector = { owner: Meteor.userId(), year: year, month: month+1};	
	}
	
	Session.set ('reportTitle', selectedDate.format("MMMM YYYY"));
	return selector;
}

function prepareReportWeek(labelId, projectId) {
	var week = Session.get ("selectedWeek");
	var year = Session.get ("selectedYear");
	
	if (labelId) {
		selector = {owner: Meteor.userId(), yearWeek: year, week: week, labels: {$in: [labelId] }};	
	} else {
		selector = {owner: Meteor.userId(), yearWeek: year, week: week };		
	}

	Session.set( 'reportTitle', "Week " + week + " " + year);
	return selector;
}

function prepareReportRange(labelId) {

	var start = Session.get ('selectedStart');
	var end = Session.get ('selectedEnd');
	end.setHours(23,59,59);

	if (labelId) {
		selector = {owner: Meteor.userId(), completed_date: { $gte: start, $lt: end}, labels: {$in: [labelId] }};
	} else {
		selector = {owner: Meteor.userId(), completed_date: { $gte: start, $lt: end}};	
	}	

	Session.set( 'reportTitle', "Range " + moment(start).format("DD/MM/YYYY") + " - " + moment(end).format("DD/MM/YYYY"));
	return selector;
}

function prepareReport (reportType) {

	var labelId = Session.get ("selectedLabel");
	var projectId = Session.get ("selectedProject");

	var selector = {};

	if (reportType == "#month-selector") {		
		selector = prepareReportMonth(labelId, projectId);
	}

	if (reportType == "#week-selector") {
		selector = prepareReportWeek(labelId, projectId);		
	}

	if (reportType == "#range-selector") {
		selector = prepareReportRange(labelId, projectId);
	}

	if (projectId) {
		selector.project_id = projectId;
	}

	Session.set ('reportSearch', selector);
	Session.set ('reportReady', true);	
}

Template.Reports.events({
	'click #btn-generate-report': function (event) {
		event.preventDefault();

		prepareReport(Session.get('reportType'));
	}
});

Template.Reports.helpers({
	title: function () {
		return Session.get("reportTitle");
	},
	items: function() {
		var search = Session.get ("reportSearch");

		if (search) {
			return Items.find(search);	
		} else {
			return null;
		}
		
	},
	initialized: function() {
		if (Meteor.userId()) {
			return Meteor.user().profile.initialized && (Meteor.user().profile.version == "2.0.3");	
		} else {
			return false;
		}		
	},
	reportReady: function() {
		return Session.get ("reportReady");
	},
	isAdmin: function() {
        return Template.instance().isAdmin.get();
    }

});

Template.Reports.onCreated ( function() {
	var self = this;
    self.isAdmin = new ReactiveVar();

    Meteor.call('isAdmin', function (error, result) {
        self.isAdmin.set(result);
    });
});


Template.Reports.onRendered ( function() {

	Session.set("reportReady", false);

	NProgress.start();        
    // Update Todoist data
    Meteor.call ( 'updateTodoistData', Meteor.userId(), function (error, result) {            
        if ( error ) {
            console.log ( error.reason );
        }
        NProgress.done();
    });	

});