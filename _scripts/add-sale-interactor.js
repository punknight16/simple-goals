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
		//add permission for paid user menu
		//get menu_items
		err = ext.addEngagementObj(data, config, args, ext);
		if(err) return cb('failed to add engagement');
		var menu_id = ext.getMenuIdFromPermission(data.permission_data, args.cred_id, ext.getPermissionObj, ext.getObj);
		if(typeof menu_id == 'undefined') return cb('couldn\'t get menu_id');
		var menu_obj = ext.getMenuObj(data.menu_data, menu_id, ext.getObj);
		if(typeof menu_obj == 'undefined' || !menu_obj.hasOwnProperty('menu_items')) return cb('couldn\'t get menu_items');
		config.update_needed = true;
		return cb(null, menu_obj.menu_items);
	});
}

module.exports = addSaleInteractor;