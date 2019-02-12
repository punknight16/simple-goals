function listGoalInteractor(data, config, args, ext, cb){
	console.log('goal_cursor: ', args.goal_cursor);
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
		var goal_arr = ext.listGoalObj(data.goal_data, 'public', ext.listObj);
		if(typeof args.goal_cursor == 'undefined'){
			args.goal_cursor = 1;	
		}
		config.client_cache[cred_id].goal_arr = goal_arr.map((item, index)=>{item.index=index; return item});
		config.client_cache[cred_id].goal_pages = Math.ceil(goal_arr.length/10);
		config.client_cache[cred_id].goal_cursor = args.goal_cursor;
		return cb(null, {
			menu_items: menu_obj.menu_items,
			goal_arr: config.client_cache[cred_id].goal_arr.slice((args.goal_cursor-1)*10, args.goal_cursor*10),
			goal_pages: config.client_cache[cred_id].goal_pages,
			goal_cursor: config.client_cache[cred_id].goal_cursor
		});
	});
}

module.exports = listGoalInteractor;