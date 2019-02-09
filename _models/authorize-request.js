function authorizeRequest(data, config, args, ext, cb){
	var token_obj = ext.getTokenObj(config.token_arr, args.token_id, ext.getObj);
	if(typeof token_obj == 'undefined') return cb('authorize request failed because session expired');
	if(typeof args.universal_id == 'undefined') args.universal_id = args.cred_id;
	var permission_obj = ext.getPermissionObj(data.permission_data, token_obj.cred_id, args.resource_id, args.universal_id, ext.getObj);
	if(typeof permission_obj == 'undefined') return cb('permission not found');
	var sign_boo = ext.compareKeys(args.public_token, token_obj.private_token, config.token_secret, ext.decypher, ext.crypto);			
	if(!sign_boo) return cb('incorrect public key');
	
	return cb(null, token_obj.cred_id);
}

module.exports = authorizeRequest;