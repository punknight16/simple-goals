function addCredObj(data, config, args, ext){
	var email_index = data.cred_data.findIndex((item)=>{
		return (args.email == item.email)
	});
	
	if(email_index < 0 && typeof email_index !== 'undefined'){
		ext.encryptPassword(args.password, config.pass_secret, ext.crypto, function(err, hash){
			var cred_obj = {
				cred_id: args.cred_id,
				email: args.email,
				password: hash,
				engagement_id: args.engagement_id
			};
			ext.addObj(data.cred_data, cred_obj);
			return false;
		});
	} else {
		return 'that email has already registered!';
	}
};




module.exports = addCredObj;