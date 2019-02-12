function addLinkObj(data, config, args, ext){
	var link_obj = {
		cred_id: args.cred_id,
		goal_id: args.goal_id,
		priority: 100,
		checked: '',
		engagement_id: args.engagement_id
	}
	ext.addObj(data.link_data, link_obj);
	return false;
}

module.exports = addLinkObj;