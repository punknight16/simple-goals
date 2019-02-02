function getPermissionObj(permission_data, cred_id, resource_id, universal_id, getObj){
	var permission_obj = getObj(permission_data, {
		cred_id: cred_id, 
		resource_id: resource_id, 
		universal_id: universal_id
	});
	return permission_obj;
}

module.exports = getPermissionObj;