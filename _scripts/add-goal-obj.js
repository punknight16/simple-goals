function addGoalObj(goal_data, goal_id, cred_id, engagement_id, addObj){
	var goal_obj = {
		goal_id: goal_id,
		cred_id: cred_id,
		universal_id: 'public',
		engagement_id: engagement_id
	};
	addObj(goal_data, goal_obj);
	return false
}

module.exports = addGoalObj;