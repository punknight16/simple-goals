function removeTokenObj(data, config, args, ext){
	var token_obj = {
		token_id: args.token_id,
		cred_id: args.cred_id
	};
	return ext.removeObj(config.token_arr, token_obj);
}

module.exports = removeTokenObj;
