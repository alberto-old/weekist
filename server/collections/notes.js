/*

Notes

Properties
----------
Property	Description
------------------------
id			The id of the note.
content		The content of the note.
item_id		The item which the note is part of.
project_id	The project which the note is part of (in the case of a project note)
file_attachment	A file attached to the note.

Todoist Note structure
-------------------------
is_deleted: 0,
is_archived: 0,
content: 'https://bulletproofmeteor.com/basics/no-more-loading',
posted_uid: 84366,
uids_to_notify: null,
item_id: 154417527,
project_id: 108627179,
id: 4500253,
posted: 'Mon 02 Feb 2015 14:29:00 +0000'

Item structure vs Todoist Item structure
----------------------------------------------
_id: 		Meteor defined,
owner: 		Meteor userId,
note_id: 	id,
is_deleted:  is_deleted,
is_archived: is_archived,
content: 	content,
item_id: 	item_id,
project_id: project_id,

Elements not used:
posted_uid,
uids_to_notify,
posted

*/

// Define the collections: Notes
Notes = new Mongo.Collection('notes');

// Publish the notes filtered by userId
Meteor.publish('notes', function(userId) {
    return Notes.find({ owner: userId });
});
