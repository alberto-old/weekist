/*

Properties
----------
Property	Description
-----------------------
id				Unique task id.
user_id			The owner of the task.
content			The text of the task.
project_id		The id of the project to add the task to.
date_string		The date of the task, added in free form text, for example it can be every day @ 10. Look at our reference to see which formats are supported.
date_lang		The language of the date_string.
due_date_utc	Should be formatted as YYYY-MM-DDTHH:MM, example: 2012-3-24T23:59. Value of due_date_utc must be in UTC. If you want to pass in due dates, note that date_string is required, while due_date_utc can be omitted. If date_string is provided, it will be parsed as local timestamp, and converted to UTC internally, according to the user’s profile settings.
in_history		If set to 1, the task is marked completed.
collapsed		If set to 1 the task’s sub tasks are collapsed. Otherwise they aren’t.
indent			The indent of the item (a number between 1 and 4, where 1 is top-level).
priority		The priority of the task (a number between 1 and 4, 4 for very urgent and 1 for natural).
indent			The indent of the item (a number between 1 and 4, where 1 is top-level).
item_order		The order of the task.
children		The tasks child tasks (a list of task ids such as [13134,232345]).
labels			The tasks labels (a list of label ids such as [2324,2525]).
assigned_by_uid	The id of user who assigns current task. Makes sense for shared projects only. Accepts 0 or any user id from the list of project collaborators. If this value is unset or invalid, it will automatically be set up by your uid.
responsible_uid	The id of user who is responsible for accomplishing the current task. Makes sense for shared projects only. Accepts 0 or any user id from the list of project collaborators. If this value is unset or invalid, it will automatically be set up by null.


Todoist Item structure
-------------------------
"due_date": null,
"day_order": -1,
"assigned_by_uid": 1855589,
"is_archived": 0,
"labels": [],
"sync_id": null,
"in_history": 0,
"has_notifications": 0,
"indent": 1,
"checked": 0,
"date_added": "Fri 26 Sep 2014 08:25:05 +0000",
"id": 33511505,
"content": "Task1",
"user_id": 1855589,
"due_date_utc": null,
"children": null,
"priority": 1,
"item_order": 1,
"is_deleted": 0,
"responsible_uid": null,
"project_id": 128501470,
"collapsed": 0,
"date_string": ""

Todoist Item Completed structure
--------------------------------
"content": "Item11",
"meta_data": null,
"user_id": 1855589,
"task_id": 33511505,
"note_count": 0,
"project_id": 128501470,
"completed_date": "Tue 17 Feb 2015 15:40:41 +0000",
"id": 33511505


Item structure vs Todoist Item structure
----------------------------------------------
_id: Meteor defined
content: content,
owner: Meteor userId,
item_id: id,
project_id: project_id,
* completed_date: completedDate, // this is not available in Todoist Sync API
due_date: due_date
labels: labels,
is_archived: is_archived,
is_deleted: is_deleted,
checked: checked,
priority: priority,
in_history: in_history	// this is 1 if the task has been completed
children: children

New elements used:
yearWeek: completedDate.getYearWeek(),
year: completedDate.getFullYear(),
month: completedDate.getMonth() + 1,
week: completedDate.getWeek()

Elements not used:
day_order
assigned_by_uid
due_date_utc
sync_id
in_history
date_added
indent
user_id
item_order
responsible_uid
collapsed: 0,
date_string: null

*/

// Define the collections: Items
Items = new Mongo.Collection('items');

// Publish the items filtered by userId
Meteor.publish('items', function(userId) {
    return Items.find({ owner: userId });
});