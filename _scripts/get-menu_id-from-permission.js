function getMenuIdFromPermission(permission_data, cred_id, getPermissionObj, getObj){
	//check three permissions;
	var menu_permission0 = getPermissionObj(permission_data, cred_id, 'r-mt/menu', 'menu-0', getObj);
	if(typeof menu_permission0 != 'undefined') return 'menu-0';
	var menu_permission1 = getPermissionObj(permission_data, cred_id, 'r-mt/menu', 'menu-1', getObj);
	if(typeof menu_permission1 != 'undefined') return 'menu-1';
	var menu_permission2 = getPermissionObj(permission_data, cred_id, 'r-mt/menu', 'menu-2', getObj);
	if(typeof menu_permission2 != 'undefined') return 'menu-2';
	return undefined;
}
module.exports = getMenuIdFromPermission;