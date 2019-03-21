function inspectSprintInteractor(data, config, args, ext, cb){
	//get the sprint obj
	var sprint_obj = ext.getSprintObj(data.sprint_data, args.sprint_id, ext.getObj);
	args.universal_id = sprint_obj.cred_id;

	ext.authorizeRequest(data, config, args, ext, function(err, cred_id){
		if(err) return cb(err);
		args.cred_id = cred_id;
		var menu_id = ext.getMenuIdFromPermission(data.permission_data, cred_id, ext.getPermissionObj, ext.getObj);
		if(typeof menu_id == 'undefined') return cb('couldn\'t get menu_id');
		var menu_obj = ext.getMenuObj(data.menu_data, menu_id, ext.getObj);
		if(typeof menu_obj == 'undefined' || !menu_obj.hasOwnProperty('menu_items')) return cb('couldn\'t get menu_items');
		
		//list the article objects
		var article_arr = data.article_data.filter((item)=>{
			return (item.sprint_id == sprint_obj.sprint_id)
		});
		//build arr with a recursive link_list
		var article_id = sprint_obj.article_id;
		var result_arr = [];
		for (var i = article_arr.length - 1; i >= 0; i--) {
			var article_obj = article_arr.find((item)=>{
				return (item.article_id== article_id);
			})
			article_id = article_obj.parent_id;
			result_arr.push(article_obj);
		};
		return cb(null, {
			menu_items: menu_obj.menu_items,
			result_arr: result_arr,
			sprint_obj: sprint_obj
		});
	});
	
}

module.exports = inspectSprintInteractor;