function listGoalInteractor(data, config, args, ext, cb){
	ext.authorizeRequest(data, config, args, ext, function(err, cred_id){
		if(err) return cb(err);
		args.cred_id = cred_id;
		var menu_id = ext.getMenuIdFromPermission(data.permission_data, cred_id, ext.getPermissionObj, ext.getObj);
		if(typeof menu_id == 'undefined') return cb('couldn\'t get menu_id');
		var menu_obj = ext.getMenuObj(data.menu_data, menu_id, ext.getObj);
		if(typeof menu_obj == 'undefined' || !menu_obj.hasOwnProperty('menu_items')) return cb('couldn\'t get menu_items');
		var goal_arr = ext.listGoalObj(data.goal_data, 'public', ext.listObj);
		if(args.query_string){
			console.log('query_string: ', args.query_string);
		}
		return cb(null, {
			menu_items: menu_obj.menu_items,
			goal_arr: goal_arr.map((item, index)=>{item.index=index; return item})
		});
	});
}

module.exports = listGoalInteractor;