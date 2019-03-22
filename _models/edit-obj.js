function editObj(data, params_obj, replace_obj){
	var values = Object.values(params_obj);
	var keys = Object.keys(params_obj);
	var ans_arr = values.reduce((acc, value, index, arr)=>{
		var filtered_arr = acc.filter((item)=>{
			item.index = index;
			return (item[keys[index]]==value);
		});
		return filtered_arr
	}, data);
	console.log("INDEX IN editObj: ", ans_arr[0].index);
	if(ans_arr.length == 0 || ans_arr[0].index == -1){
		return undefined
	} else {
		data.splice(ans_arr[0].index, 1, replace_obj);
		return ans_arr[0].index;
	}
};

module.exports = editObj;

