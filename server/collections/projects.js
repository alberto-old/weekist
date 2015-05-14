/* 


Projects

Properties
----------
Property	Description
------------------------
id			The unique id of the project.
user_id		The unique id of the user that owns the project.
name		The name of the project. If the name starts with a star * then the name is a group. In this example, * Life is a group:
color		The color of the project, an index is an array. For example #bde876, #ff8581, etc.
indent		The indent of the item (a number between 1 and 4 where 1 is top-level).
item_order	Project’s order in the project list. Smaller number should be located in the top.
collapsed	If set to 1 the project’s sub projects are collapsed. Otherwise they aren’t.


Todoist Project structure
-------------------------
name: 'Data Analysis and Statistical Inference',
user_id: 84366,
color: 19,
is_deleted: 0,
collapsed: 0,
archived_date: null,
item_order: 19,
is_archived: 0,
archived_timestamp: 0,
shared: false,
id: 135247104 

Project structure vs Todoist Project structure
----------------------------------------------
_id: Meteor defined
project_id: id
owner: Meteor userId
name: name,
is_archived: is_archived,
is_deleted: is_deleted,

Elements not used:
color: 19,
collapsed: 0,
archived_date: null,
item_order: 19,
archived_timestamp: 0,
shared: false,
*/

// Define the collections: Projects
Projects = new Mongo.Collection ( 'projects' );

// Publish the projects filtered by userId
Meteor.publish ( 'projects', function(userId) {
	return Projects.find ( { owner: userId } );
});