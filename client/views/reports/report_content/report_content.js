Template.ReportContent.onRendered (function() {
  mixpanel.track_links ("#report-donate-link", "Paypal");
});

Template.ReportContent.events({
  'click #btn-print': function(event) {
	event.preventDefault();

	print();
  },
'click #btn-excel': function (event) {  		  		
	var csv = Papa.unparse ({ fields: ['completed_date', 'content'], data: this.reportItems.fetch() });
	var blob = new Blob([csv]);
	var a = window.document.createElement("a");

    a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
    a.download = "contacts.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  },
  'click #btn-mail': function(event) {
	event.preventDefault();
	
	var emailAddress = Meteor.user().username;
	var subject = this.reportTitle;
	var content = Blaze.toHTMLWithData(Template.ReportContent, this);

	Meteor.call('sendReport', emailAddress, subject, content, function(error, result) {
	  if (error) {
		console.log("Error sending report: " + error.reason);
	  } else {
		sweetAlert("Email sent", "to " + emailAddress, "success");
	  }
	});
  }
});

Template.ReportContent.helpers({
  showNotes: function() {
	return Session.get("showNotes");
  },
  exportItems: function () {
  	var data = this.reportItems.fetch();
  	console.log (data);
  	return data;
  },
  hasNotes: function() {
	return (Notes.find({
	  owner: Meteor.userId(),
	  item_id: this.item_id
	}).count() > 0);
  },
  notes: function() {
	return Notes.find({
	  owner: Meteor.userId(),
	  item_id: this.item_id
	});
  },
  labelsItem: function() {
	if (this.labels) {
	  var labels = Labels.find({
		owner: Meteor.userId(),
		label_id: {
		  $in: this.labels
		}
	  });
	  return labels;
	}
  },
  showDueDate: function() {
	return Session.get("showDueDate");
  },
  statusCompleted: function() {
	if (this.due_date == undefined) {
	  return "item-date-notdefined"
	} else {
	  var completedDate = new Date(this.completed_date);
	  var dueDate = new Date(this.due_date);

	  if (completedDate > dueDate) {
		return "item-date-late"
	  } else {
		return "item-date-ontime"
	  }
	}
  },
  dueDate: function() {
	if (this.due_date == undefined) {
	  return "(not defined)"
	} else {
	  return moment(this.due_date).format("ddd DD-MM-YYYY");
	}
  }
});

function formatLabels(item) {
  var labels = item.match(/@\S*/g);

  if (labels) {
	for (i = 0; i < labels.length; i++) {
	  item = item.replace(labels[i], "<span class='label label-primary'>" + labels[i] + "</span>");
	}
  }

  return item;
}

UI.registerHelper('formatDate', function(date) {
  var newDate = new Date(date);
  return moment(newDate).format("ddd DD-MM-YYYY");
});

UI.registerHelper('formatItem', function(context, options) {
  if (context) {
	var item = formatLabels(context);
	item = Autolinker.link(item, {
	  twitter: false
	});
	return item;
  }
});
