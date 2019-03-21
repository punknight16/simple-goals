function editSprintObj(sprint_data, sprint_id, sprint_obj, editObj){
	var sprint_params = {
		sprint_id: sprint_id
	};
	return editObj(sprint_data, sprint_params, sprint_obj);
}

module.exports = editSprintObj;