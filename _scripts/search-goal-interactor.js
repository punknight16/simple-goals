function searchGoalInteractor(data, config, args, ext, cb){
	ext.authorizeRequest(data, config, args, ext, function(err, cred_id){
		if(err) return cb(err);
		args.cred_id = cred_id;
		args.term_arr = args.term_str.split('+');
		//Apply search terms to create goal_arr
		var goal_arr = ext.joinTagAndGoal(data, config, args, ext);
		if(typeof goal_arr == 'undefined') return cb('couldn\'t join tag_data with goal_data');
		var menu_id = ext.getMenuIdFromPermission(data.permission_data, cred_id, ext.getPermissionObj, ext.getObj);
		if(typeof menu_id == 'undefined') return cb('couldn\'t get menu_id');
		var menu_obj = ext.getMenuObj(data.menu_data, menu_id, ext.getObj);
		if(typeof menu_obj == 'undefined' || !menu_obj.hasOwnProperty('menu_items')) return cb('couldn\'t get menu_items');
		return cb(null, {
			menu_items: menu_obj.menu_items, goal_arr: goal_arr});
	});
}

module.exports = searchGoalInteractor;