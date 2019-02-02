function getObj(data, params_obj){
	var values = Object.values(params_obj);
	var keys = Object.keys(params_obj);
	var ans_arr = values.reduce((acc, value, index, arr)=>{
		var filtered_arr = acc.filter((item)=>{
			return (item[keys[index]]==value);
		});
		return filtered_arr
	}, data);
	if(typeof ans_arr=='undefined'){
		return undefined;
	} else {
		return ans_arr[0];
	}
};

module.exports = getObj;