function addArticleObj(data, config, args, ext){
	var article_obj = {
			
		};
	var article_obj = {
		cred_id: args.cred_id,
		sprint_id: args.sprint_id,
		article_id: args.article_id,
		parent_id: (args.parent_id || null),
		text: args.articleInput,
		engagement_id: args.engagement_id
	}
	ext.addObj(data.article_data, article_obj);
	return false;
}

module.exports = addArticleObj;