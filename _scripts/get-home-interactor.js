function getHomeInteractor(data, config, args, ext, cb){
	ext.authorizeRequest(data, config, args, ext, function(err, cred_id){
		if(err) return cb(err);
		args.cred_id = cred_id;
		var menu_id = ext.getMenuIdFromPermission(data.permission_data, cred_id, ext.getPermissionObj, ext.getObj);
		if(typeof menu_id == 'undefined') return cb('couldn\'t get menu_id');
		var menu_obj = ext.getMenuObj(data.menu_data, menu_id, ext.getObj);
		if(typeof menu_obj == 'undefined' || !menu_obj.hasOwnProperty('menu_items')) return cb('couldn\'t get menu_items');
		
		var link_arr = ext.checkoutLinkObj(data.link_data, cred_id, ext.checkoutObj);
		if(typeof args.link_cursor == 'undefined'){
			args.link_cursor = 1;	
		}
		config.client_cache[cred_id].link_arr = link_arr.map((item, index)=>{item.index=index; return item});
		config.client_cache[cred_id].link_pages = Math.ceil(link_arr.length/10);
		config.client_cache[cred_id].link_cursor = args.link_cursor;
		return cb(null, {
			menu_items: menu_obj.menu_items,
			link_arr: config.client_cache[cred_id].link_arr.slice((args.link_cursor-1)*10, args.link_cursor*10),
			link_pages: config.client_cache[cred_id].link_pages,
			link_cursor: config.client_cache[cred_id].link_cursor
		});
	});
}

module.exports = getHomeInteractor;