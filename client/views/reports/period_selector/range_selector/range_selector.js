Template.RangeSelector.onRendered ( function() {
	var end = new Pikaday({ 
		field: document.getElementById('range-end'),
		format: 'DD/MM/YYYY',
		firstDay: 1,
		position: 'bottom',
		onSelect: function () {
			Session.set ('selectedEnd', this.getDate());
		}
	});

	var start = new Pikaday({ 
		field: document.getElementById('range-start'),
		format: 'DD/MM/YYYY',
		firstDay: 1,
		position: 'bottom',
		onSelect: function () {
			Session.set ('selectedStart', this.getDate());
			end.setDate(this.getDate());
			end.setMinDate(this.getDate());
		}
	});

	start.setDate(new Date());
	end.setDate(new Date());
});


