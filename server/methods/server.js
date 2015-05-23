Meteor.startup(function () {
	process.env.MAIL_URL = 'smtp://postmaster%40bitmoon.com:bb75daf8224a3db16a252da4586a2bf4@smtp.mailgun.org:587';
});


Meteor.methods({
	getVersion: function () {
		return "v2.1.0";
	},
	sendReport: function (email, subject, content) {
		this.unblock();

		Email.send ({ 
			from: "weekist@bitmoon.com",
			to: email,
			subject: "Weekist report: " + subject,
			html: content
		});
	}
});