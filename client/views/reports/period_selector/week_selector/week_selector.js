Template.WeekSelector.onRendered ( function() {
	var weekSelected = new Pikaday({ 
		field: document.getElementById('week-selected'),
		format: 'DD/MM/YYYY',
		firstDay: 1,
		position: 'bottom',
		showWeekNumber: true,
		onSelect: function () {
			var dateSelected = this.getDate();
			week = dateSelected.getWeek();
			year = dateSelected.getYearWeek();			
			Session.set ("selectedWeek", week);
			Session.set ("selectedYear", year);
		}
	});

	weekSelected.setDate(new Date());
});