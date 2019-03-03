function listEngagementObj(engagement_data, universal_id, listObj){
	if(universal_id=='r0') return engagement_data;
	var  engagement_arr = listObj(engagement_data, {universal_id: universal_id});
	return engagement_arr
}

module.exports = listEngagementObj;