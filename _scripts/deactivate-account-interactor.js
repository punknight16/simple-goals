function deactivateAccountInteractor(data, config, args, ext, cb){
	if(typeof args.emailInput == 'undefined') return cb('need emailInput to deactivate account');
	ext.authorizeRequest(data, config, args, ext, function(err, cred_id){
		if(err) return cb(err);
		args.cred_id = cred_id;
		args.email = args.emailInput;
		var cookie_obj = ext.removeTokenObj(data, config, args, ext);
		var cred_obj = ext.removeCredObj(data, config, args, ext);
		return cb(null, cookie_obj);
	});
}

module.exports = deactivateAccountInteractor;