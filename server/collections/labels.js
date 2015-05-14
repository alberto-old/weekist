/*

Labels

Properties
----------
Property	Description
-----------------------
id			The id of the label.
name		The name of the label.
color		The color of the label.
item_order	Label’s order in the label list.


Todoist Item structure
-------------------------
is_deleted: 0, 
uid: 84366, 
color: 12, 
id: 869744, 
name: 's!'


Item structure vs Todoist Item structure
----------------------------------------------
_id: 		Meteor defined,
label_id: 	id,
is_deleted: is_deleted, 
owner: 		Meteor userId
name: 		name

Elements not used:
uid,
id,
color

*/

// Define the collections: Labels
Labels = new Mongo.Collection('labels');

// Publish the labels filtered by userId
Meteor.publish('labels', function(userId) {
    return Labels.find({ owner: userId });
});