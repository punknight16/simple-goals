function prioritizeInteractor(data, config, args, ext, cb){
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
		//loop through the cache,
		//add args.link_arr.length to index of everything that didn't change
		//update index in the cache to new index for everything that did change;
		Object.values(args.link_arr)
		config.client_cache[cred_id].link_arr.map((item, index)=>{
			var test = false;
			args.link_arr.map((arg_obj)=>{
				if(item.index == arg_obj.index){
					test = true;
					config.client_cache[cred_id].link_arr[item.index].priority = arg_obj.priority;
					//console.log('change priority: ', JSON.stringify(config.client_cache[cred_id].link_arr[item.index]));
				}
			});
			if(!test){
				config.client_cache[cred_id].link_arr[item.index].priority = args.link_arr.length + parseInt(config.client_cache[cred_id].link_arr[item.index].priority);
				//console.log('add priority: ', JSON.stringify(config.client_cache[cred_id].link_arr[item.index]))
			} 
		});

		var sorted_links = config.client_cache[cred_id].link_arr.sort((a, b)=>{
			return a.priority-b.priority
		});

		//console.log('sorted_links: ', JSON.stringify(sorted_links));
		if(typeof args.link_cursor == 'undefined'){
			args.link_cursor = 1;	
		}
		config.client_cache[cred_id].link_arr = sorted_links.map((item, index)=>{item.index=index; return item});
		config.client_cache[cred_id].link_pages = Math.ceil(sorted_links.length/10);
		config.client_cache[cred_id].link_cursor = args.link_cursor;
		
		//console.log("updated_link_arr: ", JSON.stringify(config.client_cache[cred_id].link_arr));
		config.update_needed = true;
		return cb(null, { 
			menu_items: menu_obj.menu_items,
			link_arr: sorted_links.slice((args.link_cursor-1)*10, args.link_cursor*10),
			link_pages: config.client_cache[cred_id].link_pages,
			link_cursor: config.client_cache[cred_id].link_cursor
		});
	});
}

module.exports = prioritizeInteractor;