/*

Properties

Property	Description
id			The id of the filter.
name		The name of the filter.
item_order	Filter’s order in the filter list.
color		The color of the filter.
query		The query to search for. Examples of searches can be found in the Todoist help page.


Item structure vs Todoist Item structure
----------------------------------------------
_id: 		Meteor defined,
filter_id: 	id,
query: 		query

Elements not used:
item_order,
color

 */

// Define the collections: Filters
Filters = new Mongo.Collection('filters');

// Publish the filters filtered by userId
Meteor.publish('filters', function(userId) {
    return Filters.find({ owner: userId });
});