function addPermissionObj(data, config, args, ext){
	var permission_obj = {
		cred_id: args.cred_id,
		resource_id: args.resource_id,
		universal_id: args.universal_id,
		engagement_id: args.engagement_id
	};
	ext.addObj(data.permission_data, permission_obj);
	return false
}

module.exports = addPermissionObj;