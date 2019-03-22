function addArticleInteractor(data, config, args, ext, cb){
	var err;
	args.engagement_id = ext.generateId(data.universal_data, 'engagement-', 10);
	if(typeof args.engagement_id == 'undefined') return cb('no engagement_id');
	
	args.article_id = ext.generateId(data.universal_data, 'article-', 10);
	if(typeof args.cred_id == 'undefined') return cb('no article_id');


	ext.authorizeRequest(data, config, args, ext, function(err, cred_id){
		if(err) return cb(err);
		args.cred_id = cred_id;
		var menu_id = ext.getMenuIdFromPermission(data.permission_data, cred_id, ext.getPermissionObj, ext.getObj);
		if(typeof menu_id == 'undefined') return cb('couldn\'t get menu_id');
		var menu_obj = ext.getMenuObj(data.menu_data, menu_id, ext.getObj);
		if(typeof menu_obj == 'undefined' || !menu_obj.hasOwnProperty('menu_items')) return cb('couldn\'t get menu_items');
		
		//get link_obj
		if(typeof args.link_index == 'undefined') return cb('link couldn\'t be edited');
		var link_obj = config.client_cache[cred_id].link_arr[args.link_index];
		args.sprint_id = link_obj.sprint_id;

		//edit sprint obj
		var sprint_obj = ext.getSprintObj(data.sprint_data, link_obj.sprint_id, ext.getObj);
		//save the old article_id as parent_id of the new article
		args.parent_id = sprint_obj.article_id
		//update the sprint_obj to have the new article_id as the root
		sprint_obj.article_id = args.article_id;
		err = ext.editSprintObj(data.sprint_data, args.sprint_id, sprint_obj, ext.editObj);
		if(err) return cb('couldn\'t edit sprint');
		

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
		sprint_obj = ext.getSprintObj(data.sprint_data, args.sprint_id, ext.getObj);
		//get all articles associated with sprint_id;
		var article_arr = data.article_data.filter((item)=>{
			return (item.sprint_id == sprint_obj.sprint_id)
		});
		console.log("article_arr: ", JSON.stringify(article_arr));
		//start with initial article
		var article_id = sprint_obj.article_id;
		console.log("initial article_id should be new article_id: ", article_id);
		var result_arr = [];
		for (var i = article_arr.length - 1; i >= 0; i--) {
			var article_obj = article_arr.find((item)=>{
				console.log('should run 3 times');
				return (item.article_id == article_id);
			})
			article_id = article_obj.parent_id;
			result_arr.push(article_obj);
		};

		console.log('tag_data before: ', JSON.stringify(data.tag_data));

		//here is the tag stuff
		var myRegexp = /#(\S+)/g, result;
		//var counter = 0;
		while (result = myRegexp.exec(args.articleInput)) {
		  var tag_obj = {
		   	tag_name: result[1],
		   	goal_id: sprint_obj.goal_id,  
		   	sprint_id: args.sprint_id, 
		   	article_id: args.article_id
			}
			data.tag_data.push(tag_obj);
			//counter++;
		}

		console.log('tag_data after: ', JSON.stringify(data.tag_data));

		//store
		config.update_needed = true;
		return cb(null, {
			menu_items: menu_obj.menu_items,
			result_arr: result_arr,
			sprint_obj: sprint_obj,
			link_index: args.link_index
		});
	});
}

module.exports = addArticleInteractor;