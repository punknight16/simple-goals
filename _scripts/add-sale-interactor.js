function addSaleInteractor(data, config, args, ext, cb){
	var err;
	args.engagement_id = ext.generateId(data.universal_data, 'engagement-', 10);
	if(typeof args.engagement_id == 'undefined') return cb('no engagement_id');
	args.sale_id = ext.generateId(data.universal_data, 'sale-', 10);
	args.resource_id = 'r-mt/add-sale'
	ext.authorizeRequest(data, config, args, ext, function(err, cred_id){
		if(err) return cb(err);
		args.cred_id = cred_id;
		err = ext.addSaleObj(data.sale_data, args.sale_id, args.cred_id, args.amount, args.product, config.engagement_id, ext.addObj);
		if(err) return cb('failed to add sale obj');
		args.resource_id = 'r-mt/menu'; 
		args.universal_id = 'menu-0';
		err = ext.addPermissionObj(data, config, args, ext);
		if(err) return cb('failed to add menu permission_obj');
		args.resource_id = 'r-mt/user'; 
		args.universal_id = cred_id;
		err = ext.addPermissionObj(data, config, args, ext);
		if(err) return cb('failed to add list-users permission_obj');
		//add permission for paid user menu
		args.resource_id = 'r-mt/add-sale'; 
		args.cred_id = cred_id;
		err = ext.removePermissionObj(data, config, args, ext);
		if(err) return cb('failed to remove add-sale permission_obj');
		//get menu_items
		err = ext.addEngagementObj(data, config, args, ext);
		if(err) return cb('failed to add engagement');
		
		var menu_id = ext.getMenuIdFromPermission(data.permission_data, args.cred_id, ext.getPermissionObj, ext.getObj);
		if(typeof menu_id == 'undefined') return cb('couldn\'t get menu_id');
		var menu_obj = ext.getMenuObj(data.menu_data, menu_id, ext.getObj);
		if(typeof menu_obj == 'undefined' || !menu_obj.hasOwnProperty('menu_items')) return cb('couldn\'t get menu_items');
		
		if(typeof args.link_cursor == 'undefined'){
			args.link_cursor = 1;	
		}
		if(typeof config.client_cache[cred_id] == 'undefined'){
			var link_arr = ext.checkoutLinkObj(data.link_data, cred_id, ext.checkoutObj);
			config.client_cache[cred_id].link_arr = link_arr.map((item, index)=>{item.index=index; return item});
			config.client_cache[cred_id].link_pages = Math.ceil(link_arr.length/10);
			config.client_cache[cred_id].link_cursor = args.link_cursor;
		}
		config.update_needed = true;
		return cb(null, {
			menu_items: menu_obj.menu_items,
			link_arr: config.client_cache[cred_id].link_arr.slice((args.link_cursor-1)*10, args.link_cursor*10),
			link_pages: config.client_cache[cred_id].link_pages,
			link_cursor: config.client_cache[cred_id].link_cursor
		});
	});
}

module.exports = addSaleInteractor;