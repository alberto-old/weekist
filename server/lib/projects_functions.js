Meteor.projects = {
	createNew: function (userId, project) {		
		var newProject = {
			owner: 			userId,
			project_id: 	project.id,
			name: 			project.name,
			is_deleted: 	project.is_deleted,
			is_archived: 	project.is_archived,
		}
		return newProject;
	}
}