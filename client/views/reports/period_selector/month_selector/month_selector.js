Template.MonthSelector.onRendered ( function() {
	var monthSelected = new Pikaday({ 
		field: document.getElementById('month-selected'),
		format: 'MM/YYYY',
		firstDay: 1,
		position: 'bottom',
		onSelect: function () {
			var dateSelected = this.getDate();
			month = dateSelected.getMonth();
			year = dateSelected.getFullYear();			
			Session.set ("selectedMonth", month);
			Session.set ("selectedYear", year);
		}
	});	

	monthSelected.setDate(new Date());
});