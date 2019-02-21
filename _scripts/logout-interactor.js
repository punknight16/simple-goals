function logoutInteractor(data, config, args, ext, cb){
	if(typeof args.token_id == 'undefined') return cb('need token_id to logout');
	ext.authorizeRequest(data, config, args, ext, function(err, cred_id){
		if(err) return cb(err);
		args.cred_id = cred_id;
		var cookie_obj = ext.removeTokenObj(data, config, args, ext);
		return cb(null, cookie_obj);
	});
}

module.exports = logoutInteractor;