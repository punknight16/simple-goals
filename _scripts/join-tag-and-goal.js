function joinTagAndGoal(data, config, args, ext){
	var filter_fn = function(item, index){
		return (args.term_arr.indexOf(item.tag_name)>=0)
	}
	var ans_arr = ext.join(data.tag_data, data.goal_data, 'goal_id', filter_fn, ext.getObj);
	return ans_arr;
}

module.exports = joinTagAndGoal;