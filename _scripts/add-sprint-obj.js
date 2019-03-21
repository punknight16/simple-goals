function addSprintObj(data, config, args, ext){
	var sprint_obj = {
		cred_id: args.cred_id,
		sprint_id: args.sprint_id,
		article_id: args.article_id,
		metric: args.metric,
		engagement_id: args.engagement_id
	}
	ext.addObj(data.sprint_data, sprint_obj);
	return false;
}

module.exports = addSprintObj;