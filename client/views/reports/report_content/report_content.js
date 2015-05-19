Template.ReportContent.events({
	'click #btn-print': function (event) {
		event.preventDefault();

		print();
	},
	'click #btn-mail': function (event) {
		event.preventDefault();

		var emailAddress = Meteor.user().username;
		var subject = this.reportTitle;
		var content = Blaze.toHTMLWithData (Template.ReportContent, this);

		Meteor.call('sendReport', emailAddress, subject, content, function (error, result) {
			if (error) {
				console.log ("Error sending report: " + error.reason);
			} else {
				sAlert.success('Email sent!', { position: 'top-right', timeout: 2500 } );
			}
		});
	}
});

Template.ReportContent.helpers({
	showNotes: function () {
		return Session.get ("showNotes");	
	},
	hasNotes: function() {
		return (Notes.find( {owner: Meteor.userId(), item_id: this.item_id } ).count() > 0);
	},
	notes: function() {
		return Notes.find( {owner: Meteor.userId(), item_id: this.item_id } );
	},
	labelsItem: function() {
		if (this.labels) {
			var labels = Labels.find ({owner: Meteor.userId(), label_id: {$in: this.labels }});	
			return labels;
		}
	}
});

function formatLabels ( item ) {
	var labels = item.match(/@\S*/g);

	if (labels) {
    	for (i=0; i<labels.length; i++) {
      		item = item.replace(labels[i], "<span class='label label-primary'>" + labels[i] + "</span>");
    	}
  	}

  	return item;
}

UI.registerHelper ( 'formatDate', function(date) {
	return moment(date).format("ddd DD-MM-YYYY");
});

UI.registerHelper ( 'formatItem', function (context, options) {
	if (context) {
		var item = formatLabels (context);
      	item = Autolinker.link(item, {twitter: false});
      	return item;
	}
});