function addNameObj(data, config, args, ext){
	var name_obj = {
		universal_id: args.universal_id,
		universal_name: args.universal_name,
		engagement_id: args.engagement_id
	};
	ext.addObj(data.name_data, name_obj);
	return false
}

module.exports = addNameObj;