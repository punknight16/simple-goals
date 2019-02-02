function addGoalInteractor(data, config, args, ext, cb){
	var err;
	args.engagement_id = ext.generateId(data.universal_data, 'engagement-', 10);
	if(typeof args.engagement_id == 'undefined') return cb('no engagement_id');
	args.goal_id = ext.generateId(data.universal_data, 'goal-', 10);
	//
	console.log("args: ", args);
	ext.authorizeRequest(data, config, args, ext, function(err, cred_id){
		if(err) return cb(err);
		args.cred_id = cred_id;
		err = ext.addGoalObj(data.goal_data, args.goal_id, args.cred_id, config.engagement_id, ext.addObj);
		if(err) return cb('failed to add goal obj');
		args.universal_id = args.goal_id;
		args.universal_name = args.goalInput;
		err = ext.addNameObj(data, config, args, ext);
		if(err) return cb('failed to add name_obj');
		err = ext.addLinkObj(data, config, args, ext);
		if(err) return cb('failed to add link_obj');
		err = ext.addEngagementObj(data, config, args, ext);
		if(err) return cb('failed to add engagement');
			
		return cb(null, cred_id);
	});
}

module.exports = addGoalInteractor;