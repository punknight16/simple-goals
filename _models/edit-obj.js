function editObj(data, param_obj, replace_obj){
	var index = data.findIndex((item)=>{
		for (key in param_obj){
			if(item[key]!=param_obj[key]) return -1
		}
		return 1
	});
	if(index == -1){
		return undefined
	} else {
		data.splice(index, 1, replace_obj);
		return index;
	}
};

module.exports = editObj;

