function listGoalObj(goal_data, universal_id, listObj){
	if(universal_id=='r0') return goal_data;
	var  goal_arr = listObj(goal_data, {universal_id: universal_id});
	return goal_arr
}

module.exports = listGoalObj;