function removeCredObj(data, config, args, ext){
	var cred_obj = {
		cred_id: args.cred_id,
		email: args.email
	};
	return ext.removeObj(data.cred_data, cred_obj);
}

module.exports = removeCredObj;
