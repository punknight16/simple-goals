function intakeGoalInteractor(data, config, args, ext, cb){
	var err;
	args.engagement_id = ext.generateId(data.universal_data, 'engagement-', 10);
	if(typeof args.engagement_id == 'undefined') return cb('no engagement_id');
	err = ext.addEngagementObj(data, config, args, ext);
	if(err) return cb('failed to add engagement');
	
	ext.authorizeRequest(data, config, args, ext, function(err, cred_id){
		if(err) return cb(err);
		args.cred_id = cred_id;
		for (var i = args.input_arr.length - 1; i >= 0; i--) {
			args.goal_id = ext.generateId(data.universal_data, 'goal-', 10);
			if(typeof args.goal_id == 'undefined') return cb('no goal_id');
			err = ext.addGoalObj(data.goal_data, args.goal_id, args.cred_id, config.engagement_id, ext.addObj);
			if(err) return cb('failed to add goal obj');
			args.universal_id = args.goal_id;
			args.universal_name = args.input_arr[i]
			err = ext.addNameObj(data, config, args, ext);
			if(err) return cb('failed to add name_obj');
			err = ext.addLinkObj(data, config, args, ext);
			if(err) return cb('failed to add link_obj');
		}

		var menu_id = ext.getMenuIdFromPermission(data.permission_data, args.cred_id, ext.getPermissionObj, ext.getObj);
		if(typeof menu_id == 'undefined') return cb('couldn\'t get menu_id');
		var menu_obj = ext.getMenuObj(data.menu_data, menu_id, ext.getObj);
		if(typeof menu_obj == 'undefined' || !menu_obj.hasOwnProperty('menu_items')) return cb('couldn\'t get menu_items');

		var link_arr = ext.checkoutLinkObj(data.link_data, cred_id, ext.checkoutObj)
		if(typeof args.link_cursor == 'undefined'){
			args.link_cursor = 1;	
		}
		config.client_cache[cred_id].link_arr = link_arr.map((item, index)=>{item.index=index; return item});
		config.client_cache[cred_id].link_pages = Math.ceil(link_arr.length/10);
		config.client_cache[cred_id].link_cursor = args.link_cursor;
		config.update_needed = true;
		return cb(null, {
			menu_items: menu_obj.menu_items,
			link_arr: config.client_cache[cred_id].link_arr.slice((args.link_cursor-1)*10, args.link_cursor*10),
			link_pages: config.client_cache[cred_id].link_pages,
			link_cursor: config.client_cache[cred_id].link_cursor
		});
	});
}

module.exports = intakeGoalInteractor;