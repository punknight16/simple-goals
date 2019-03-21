function openSprintInteractor(data, config, args, ext, cb){
	var err;
	args.engagement_id = ext.generateId(data.universal_data, 'engagement-', 10);
	if(typeof args.engagement_id == 'undefined') return cb('no engagement_id');
	args.sprint_id = ext.generateId(data.universal_data, 'sprint-', 10);
	if(typeof args.sprint_id == 'undefined') return cb('no sprint_id');
	args.article_id = ext.generateId(data.universal_data, 'article-', 10);
	if(typeof args.cred_id == 'undefined') return cb('no article_id');


	ext.authorizeRequest(data, config, args, ext, function(err, cred_id){
		if(err) return cb(err);
		args.cred_id = cred_id;
		var menu_id = ext.getMenuIdFromPermission(data.permission_data, cred_id, ext.getPermissionObj, ext.getObj);
		if(typeof menu_id == 'undefined') return cb('couldn\'t get menu_id');
		var menu_obj = ext.getMenuObj(data.menu_data, menu_id, ext.getObj);
		if(typeof menu_obj == 'undefined' || !menu_obj.hasOwnProperty('menu_items')) return cb('couldn\'t get menu_items');
		
		//edit link_obj
		var link_obj = config.client_cache[cred_id].link_arr[args.link_index];
		

		link_obj.sprint_id = args.sprint_id;
		args.link_index = ext.editLinkObj(data.link_data, link_obj.goal_id, link_obj.cred_id, link_obj, ext.editObj)
		if(typeof args.link_index == 'undefined') return cb('link couldn\'t be edited');
		//add sprint obj
		err = ext.addSprintObj(data, config, args, ext);
		if(err) return cb('couldn\'t add sprint');
		//add name_obj for sprint
		args.universal_id = args.sprint_id;
		args.universal_name = args.sprintInput;
		err = ext.addNameObj(data, config, args, ext);
		if(err) return cb('failed to add name_obj');
		
		//add article_obj
		ext.addArticleObj(data, config, args, ext);
		//add name_obj for article_obj
		args.universal_id = args.article_id;
		args.universal_name = args.articleName;
		err = ext.addNameObj(data, config, args, ext);
		if(err) return cb('failed to add name_obj');
		//add engagement_obj
		err = ext.addEngagementObj(data, config, args, ext);
		if(err) return cb('failed to add engagement');
		//prove it works
		var sprint_obj = ext.getSprintObj(data.sprint_data, args.sprint_id, ext.getObj);
		//get all articles associated with sprint_id;
		var article_arr = data.article_data.filter((item)=>{
			return (item.sprint_id == sprint_obj.sprint_id)
		});
		//start with initial article
		var article_id = sprint_obj.article_id;
		var result_arr = [];
		for (var i = article_arr.length - 1; i >= 0; i--) {
			var article_obj = article_arr.find((item)=>{
				return (item.article_id== article_id);
			})
			article_id = article_obj.parent_id;
			result_arr.push(article_obj);
		};

		//store
		config.update_needed = true;
		return cb(null, {
			menu_items: menu_obj.menu_items,
			result_arr: [article_obj],
			sprint_obj: sprint_obj
		});
	});
	
}

module.exports = openSprintInteractor;