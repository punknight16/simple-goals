function addEngagementObj(data, config, args, ext){
	var parent_engagement_index = config.last_engagement_arr.findIndex((item)=>{
		return (item.cred_id==args.cred_id)
	});
	var parent_id;
	if(parent_engagement_index>=0){
		parent_id = config.last_engagement_arr[parent_engagement_index].engagement_id;
	} else {
		parent_id = '--';
		parent_engagement_index = config.last_engagement_arr.length;
	}
	//create the engagement_obj
	var engagement_obj = {
		engagement_id: args.engagement_id,
		parent_id: parent_id,
		cred_id: args.cred_id,
		date: new Date().toISOString(),
		form_id: args.form_id
	};
	ext.addObj(data.engagement_data, engagement_obj);
	//reset the last_engagement_arr;
	var last_engagement_obj = {cred_id: args.cred_id, engagement_id: args.engagement_id};
	config.last_engagement_arr[parent_engagement_index] = last_engagement_obj
	return false;
}

module.exports = addEngagementObj;