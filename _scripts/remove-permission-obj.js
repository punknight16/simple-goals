function removePermissionObj(data, config, args, ext){
	var permission_obj = {
		cred_id: args.cred_id,
		resource_id: args.resource_id
	};
	var test = ext.removeObj(data.permission_data, permission_obj);
	if(typeof test == 'undefined'){
		return undefined;
	} else {
		return null;
	}
}

module.exports = removePermissionObj;
