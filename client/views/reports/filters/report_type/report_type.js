function showThisAndHideRest ( selectedOption ) {
	var options = ["#month-selector", "#week-selector", "#range-selector"];
	var radioButtons = ["#report-type-month-input", "#report-type-week-input", "#report-type-range-input"];
	
	for (i=0; i<options.length; i++) {
		if ( selectedOption == i) {
			$(options[i]).show("fast");
			$(radioButtons[i]).prop("checked", true);
			Session.set ("reportType", options[i]);
		} else {
			$(options[i]).hide();
			$(radioButtons[i]).prop("checked", false)
		}
	}

}

Template.ReportType.events ({
	'click #report-type-month': function (event) {
		event.preventDefault();
		showThisAndHideRest (0);
	},
	'click #report-type-week': function () {
		event.preventDefault();
		showThisAndHideRest (1);
	},
	'click #report-type-range': function () {
		event.preventDefault();
		showThisAndHideRest (2);
	}
});

Template.ReportType.onRendered ( function() {
	var monthReportActivated = $("#report-type-month-input").is('input:checked');
	var weekReportActivated = $("#report-type-week-input").is('input:checked');
	var rangeReportActivated = $("#report-type-range-input").is('input:checked');

	if (monthReportActivated) {
		showThisAndHideRest(0);
	} 

	if (weekReportActivated) {
		showThisAndHideRest(1);	
	}

	if (rangeReportActivated) {
		showThisAndHideRest(2);
	}
})