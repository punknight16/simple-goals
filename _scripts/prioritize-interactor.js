function prioritizeInteractor(data, config, args, ext, cb){
	var err;
	args.engagement_id = ext.generateId(data.universal_data, 'engagement-', 10);
	if(typeof args.engagement_id == 'undefined') return cb('no engagement_id');
	ext.authorizeRequest(data, config, args, ext, function(err, cred_id){
		if(err) return cb(err);
		args.cred_id = cred_id;
		err = ext.addEngagementObj(data, config, args, ext);
		if(err) return cb('failed to add engagement');
		config.client_cache[cred_id].link_arr.map((item, index)=>{
			item.priority = args.link_arr[index].priority;
		})
		var menu_id = ext.getMenuIdFromPermission(data.permission_data, cred_id, ext.getPermissionObj, ext.getObj);
		if(typeof menu_id == 'undefined') return cb('couldn\'t get menu_id');
		var menu_obj = ext.getMenuObj(data.menu_data, menu_id, ext.getObj);
		var sorted_links = config.client_cache[cred_id].link_arr.sort((a, b)=>{
			return a.priority-b.priority
		});
		if(typeof menu_obj == 'undefined' || !menu_obj.hasOwnProperty('menu_items')) return cb('couldn\'t get menu_items');
		config.update_needed = true;
		return cb(null, { 
			menu_items: menu_obj.menu_items,
			link_arr: sorted_links.map((item, index)=>{item.index=index; return item})
		});
	});
}

module.exports = prioritizeInteractor;