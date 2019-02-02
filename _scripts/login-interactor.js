function loginInteractor(data, config, args, ext, cb){
	var err;
	args.engagement_id = ext.generateId(data.universal_data, 'engagement-', 10);
	if(typeof args.engagement_id == 'undefined') return cb('no engagement_id');
	args.token_id = ext.generateId(data.universal_data, 'token-', 10);
	if(typeof args.token_id == 'undefined') return cb('no token_id');
	args.public_token = ext.generateId(data.universal_data, 'k-', 10);
	if(typeof args.public_token == 'undefined') return cb('no public_token');
	//
	ext.compareCreds(data.cred_data, args.email, args.password, config.pass_secret, ext.crypto, function(err, cred_id){
		if(err) return cb(err);
		args.cred_id = cred_id;
		err = ext.addEngagementObj(data, config, args, ext);
		if(err) return cb('failed to add engagement');
		var token_obj = ext.addTokenObj(data, config, args, ext);
		if(typeof token_obj == 'undefined') return cb('couldn\'t generate token_obj');
		var menu_id = ext.getMenuIdFromPermission(data.permission_data, cred_id, ext.getPermissionObj, ext.getObj);
		if(typeof menu_id == 'undefined') return cb('couldn\'t get menu_id');
		var menu_obj = ext.getMenuObj(data.menu_data, menu_id, ext.getObj);
		if(typeof menu_obj == 'undefined' || !menu_obj.hasOwnProperty('menu_items')) return cb('couldn\'t get menu_items');
		return cb(null, token_obj, menu_obj.menu_items);
	});
}

module.exports = loginInteractor;