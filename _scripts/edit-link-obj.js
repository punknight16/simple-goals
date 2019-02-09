function editLinkObj(link_data, goal_id, cred_id, link_obj, editObj){
	var link_params = {
		goal_id: goal_id,
		cred_id: cred_id
	};
	return editObj(link_data, link_params, link_obj);
}

module.exports = editLinkObj;

//link data is 
/*
	{cred_id: 'cred-0vndq7krkn6o', goal_id: 'g1', priority: 3, checked: 'checked'},
	{cred_id: 'cred-0vndq7krkn6o', goal_id: 'g2', priority: 2, checked: ''},
	{cred_id: 'cred-0vndq7krkn6o', goal_id: 'g3', priority: 1, checked: ''}
*/

//then it should be:
/*
	{cred_id: 'cred-0vndq7krkn6o', goal_id: 'g1', priority: 1, checked: 'checked'},
	{cred_id: 'cred-0vndq7krkn6o', goal_id: 'g2', priority: 3, checked: ''},
	{cred_id: 'cred-0vndq7krkn6o', goal_id: 'g3', priority: 2, checked: ''}
*/