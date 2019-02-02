function addTokenObj(data, config, args, ext){
	var private_token = ext.cypher(args.public_token, config.token_secret, ext.crypto);
	var token_obj = {
		token_id: args.token_id,
		public_token: args.public_token,
		private_token: private_token,
		cred_id: args.cred_id,
		expiration_date: addMinutes(new Date(), 30).toISOString()
	};
	ext.addObj(config.token_arr, token_obj);
	var cookie_obj = {
		token_id: token_obj.token_id,
		public_token: token_obj.public_token,
		cred_id: token_obj.cred_id
	}
	return cookie_obj;
}

module.exports = addTokenObj;

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}