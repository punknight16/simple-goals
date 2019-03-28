function selectGoalInteractor(data, config, args, ext, cb){
	var err;
	args.engagement_id = ext.generateId(data.universal_data, 'engagement-', 10);
	if(typeof args.engagement_id == 'undefined') return cb('no engagement_id');
	ext.authorizeRequest(data, config, args, ext, function(err, cred_id){
		if(err) return cb(err);
		args.cred_id = cred_id;
		err = ext.addEngagementObj(data, config, args, ext);
		if(err) return cb('failed to add engagement');
		var menu_id = ext.getMenuIdFromPermission(data.permission_data, cred_id, ext.getPermissionObj, ext.getObj);
		if(typeof menu_id == 'undefined') return cb('couldn\'t get menu_id');
		var menu_obj = ext.getMenuObj(data.menu_data, menu_id, ext.getObj);
		if(typeof menu_obj == 'undefined' || !menu_obj.hasOwnProperty('menu_items')) return cb('couldn\'t get menu_items');
		
		console.log("args.link_arr: ", JSON.stringify(args.link_arr));
		args.link_arr.map((link_obj)=>{
			if(link_obj.isSelected=='true'){
				var index = config.client_cache[cred_id].goal_arr.findIndex((item)=>{return (item.index==link_obj.index)})
				if(index!=-1){
					args.goal_id = config.client_cache[cred_id].goal_arr[index].goal_id;
					ext.addLinkObj(data, config, args, ext);			
				}
			}
		});
		
		var link_arr = ext.checkoutLinkObj(data.link_data, cred_id, ext.checkoutObj)
		console.log('updated link_arr: ', JSON.stringify(link_arr));
		if(typeof args.link_cursor == 'undefined'){
			args.link_cursor = 1;	
		}
		//update the cache;
		config.client_cache[cred_id].link_arr = link_arr;
		config.client_cache[cred_id].link_pages = Math.ceil(link_arr.length/10);
		if(typeof args.link_cursor == 'undefined'){
			args.link_cursor = 1;	
		}
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

module.exports = selectGoalInteractor;