function helpSprintInteractor(data, config, args, ext, cb){
	//get the sprint obj
	ext.authorizeRequest(data, config, args, ext, function(err, cred_id){
		if(err) return cb(err);
		args.cred_id = cred_id;
		var menu_id = ext.getMenuIdFromPermission(data.permission_data, cred_id, ext.getPermissionObj, ext.getObj);
		if(typeof menu_id == 'undefined') return cb('couldn\'t get menu_id');
		var menu_obj = ext.getMenuObj(data.menu_data, menu_id, ext.getObj);
		if(typeof menu_obj == 'undefined' || !menu_obj.hasOwnProperty('menu_items')) return cb('couldn\'t get menu_items');
		
		return cb(null, {
			menu_items: menu_obj.menu_items,
			link_obj: config.client_cache[cred_id].link_arr[args.index],
			link_index: args.index
		});
	});
	
}

module.exports = helpSprintInteractor;