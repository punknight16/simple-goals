function searchGoalInteractor(data, config, args, ext, cb){
	ext.authorizeRequest(data, config, args, ext, function(err, cred_id){
		if(err) return cb(err);
		args.cred_id = cred_id;
		
		
		var menu_id = ext.getMenuIdFromPermission(data.permission_data, cred_id, ext.getPermissionObj, ext.getObj);
		if(menu_id=='menu-0') menu_id='menu-3';
		if(menu_id=='menu-1') menu_id='menu-4';
		if(menu_id=='menu-2') menu_id='menu-5';
		if(typeof menu_id == 'undefined') return cb('couldn\'t get menu_id');
		var menu_obj = ext.getMenuObj(data.menu_data, menu_id, ext.getObj);
		if(typeof menu_obj == 'undefined' || !menu_obj.hasOwnProperty('menu_items')) return cb('couldn\'t get menu_items');
		
		var search_term_arr = args.term_str.split('+');
		var reduced_tags = {};
		
		for (var i = data.tag_data.length - 1; i >= 0; i--) {
			if(search_term_arr.indexOf(data.tag_data[i].tag_name)>-1){
				if(typeof reduced_tags[data.tag_data[i].goal_id]=='undefined'){
					reduced_tags[data.tag_data[i].goal_id] = 1;	
				} else {
					reduced_tags[data.tag_data[i].goal_id]++
				}
			}
		};
		
		var result_arr = [];
		for (k in reduced_tags){
			result_arr.push({goal_id: k, total_tags: reduced_tags[k]})
		}
		//Apply search terms to create goal_arr
		//args.term_arr args.term_str.split('+');
		//var goal_arr = ext.joinTagAndGoal(data, config, args, ext);
		//if(typeof goal_arr == 'undefined') return cb('couldn\'t join tag_data with goal_data');

		return cb(null, {
			menu_items: menu_obj.menu_items, 
			goal_arr: result_arr});
	});
}

module.exports = searchGoalInteractor;