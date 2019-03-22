function registerInteractor(data, config, args, ext, cb){
	var err;
	args.engagement_id = ext.generateId(data.universal_data, 'engagement-', 10);
	if(typeof args.engagement_id == 'undefined') return cb('no engagement_id');
	args.cred_id = ext.generateId(data.universal_data, 'cred-', 10);
	if(typeof args.cred_id == 'undefined') return cb('no cred_id');
	args.token_id = ext.generateId(data.universal_data, 'token-', 10);
	if(typeof args.token_id == 'undefined') return cb('no token_id');
	args.public_token = ext.generateId(data.universal_data, 'k-', 10);
	if(typeof args.public_token == 'undefined') return cb('no public_token');
	//
	err = ext.addCredObj(data, config, args, ext);
	if(err) return cb('failed to add cred_obj');
	args.universal_id = args.cred_id;
	args.universal_name = args.username;
	err = ext.addNameObj(data, config, args, ext);
	if(err) return cb('failed to add name_obj');
	args.resource_id = 'r-mt/add-sale';
	args.universal_id = args.cred_id;
	err = ext.addPermissionObj(data, config, args, ext);
	if(err) return cb('failed to add first permission_obj');
	args.resource_id = 'r-mt/search-goal'; 
	err = ext.addPermissionObj(data, config, args, ext);
	if(err) return cb('failed to add search-goal permission_obj');
	args.resource_id = 'r-mt/menu'; 
	args.universal_id = 'menu-1';
	err = ext.addPermissionObj(data, config, args, ext);
	if(err) return cb('failed to add menu permission_obj');
	args.resource_id = 'r-mt/list-goal-obj'; 
	args.universal_id = 'public';
	err = ext.addPermissionObj(data, config, args, ext);
	if(err) return cb('failed to add list-goal permission_obj');
	args.resource_id = 'r-mt/bookmark-goal'; 
	args.universal_id = args.cred_id;
	err = ext.addPermissionObj(data, config, args, ext);
	if(err) return cb('failed to add r-mt/select-home permission_obj');
	args.resource_id = 'r-mt/get-home'; 
	args.universal_id = args.cred_id;
	err = ext.addPermissionObj(data, config, args, ext);
	if(err) return cb('failed to add r-mt/get-home permission_obj');
	args.resource_id = 'r-mt/priortize-home'; 
	args.universal_id = args.cred_id;
	err = ext.addPermissionObj(data, config, args, ext);
	if(err) return cb('failed to add r-mt/priortize-home permission_obj');
	args.resource_id = 'r-mt/search-goal'; 
	args.universal_id = 'public';
	err = ext.addPermissionObj(data, config, args, ext);
	if(err) return cb('failed to add r-mt/search-goal permission_obj');
	args.resource_id = 'r-mt/add-goal'; 
	args.universal_id = args.cred_id;
	err = ext.addPermissionObj(data, config, args, ext);
	//version 1.2 new permissions:
	args.resource_id = 'r-mt/inspect-sprint'; 
	args.universal_id = args.cred_id;
	err = ext.addPermissionObj(data, config, args, ext);
	if(err) return cb('failed to add r-mt/inspect-sprint permission_obj');
	args.resource_id = 'r-mt/open-sprint'; 
	args.universal_id = args.cred_id;
	err = ext.addPermissionObj(data, config, args, ext);
	if(err) return cb('failed to add r-mt/open-sprint permission_obj');
	args.resource_id = 'r-mt/add-article'; 
	args.universal_id = args.cred_id;
	err = ext.addPermissionObj(data, config, args, ext);
	if(err) return cb('failed to add r-mt/add-article permission_obj');
	args.resource_id = 'r-mt/close-sprint'; 
	args.universal_id = args.cred_id;
	err = ext.addPermissionObj(data, config, args, ext);
	if(err) return cb('failed to add r-mt/close-sprint permission_obj');
	//end version 1.2 new permissions
	if(err) return cb('failed to add r-mt/add-goal permission_obj');
	args.resource_id = 'r-mt/logout'; 
	args.universal_id = 'public';
	err = ext.addPermissionObj(data, config, args, ext);
	if(err) return cb('failed to add r-mt/logout permission_obj');
	args.resource_id = 'r-mt/deactivate-account'; 
	args.universal_id = args.cred_id;
	err = ext.addPermissionObj(data, config, args, ext);
	if(err) return cb('failed to add r-mt/deactivate-account permission_obj');


	err = ext.addEngagementObj(data, config, args, ext);
	if(err) return cb('failed to add engagement');
	var token_obj = ext.addTokenObj(data, config, args, ext);
	if(typeof token_obj == 'undefined') return cb('couldn\'t generate token_obj');
	var menu_id = ext.getMenuIdFromPermission(data.permission_data, args.cred_id, ext.getPermissionObj, ext.getObj);
	if(typeof menu_id == 'undefined') return cb('couldn\'t get menu_id');
	var menu_obj = ext.getMenuObj(data.menu_data, menu_id, ext.getObj);
	if(typeof menu_obj == 'undefined' || !menu_obj.hasOwnProperty('menu_items')) return cb('couldn\'t get menu_items');
	config.client_cache[args.cred_id] = {
		goal_arr: [],
		goal_pages: null, 
		link_arr: [],
		link_pages: null
	};
	config.update_needed = true;
	return cb(null, {
		token_obj: token_obj, 
		menu_items: menu_obj.menu_items
	});
}

module.exports = registerInteractor;