function getSprintObj(sprint_data, sprint_id, getObj){
	var sprint_obj = getObj(sprint_data, {sprint_id: sprint_id});
	return sprint_obj;
}

module.exports = getSprintObj;