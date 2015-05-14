/**
 * Takes a data and formats it according what Todoist needs
 * @return string - string formatted as yyy-mm-ddThh-mm
 */
Date.prototype.formatTodoist = function() {
	var year = this.getFullYear();
	var month = this.getMonth() + 1;
	var day = this.getDate();
	var hours = this.getHours();
	var minutes = this.getMinutes();

	return "" + year + "-" + month + "-" + day + "T" + hours + ":" + minutes;
}

/**
 * Returns the week number for this date.  
 * @return int
 */
Date.prototype.getWeek = function () {
	return moment(this).week();
};

/**
 * Returns the year for this date.  
 * @return int
 */
Date.prototype.getYearWeek = function () {
	return moment(this).weekYear();
};