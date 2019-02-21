function removeObj(data, params_obj){
	var values = Object.values(params_obj);
	var keys = Object.keys(params_obj);
	data.map((data_item, data_index)=>{
		data_item.index = data_index;
	});
	var ans_arr = values.reduce((acc, value, index, arr)=>{
		var filtered_arr = acc.filter((item)=>{
			return (item[keys[index]]==value);
		});
		return filtered_arr
	}, data);
	if(typeof ans_arr=='undefined'){
		return undefined;
	} else {
		console.log('data: ', data);
		console.log('ans_arr: ', ans_arr);
		return data.splice(ans_arr[0].index, 1)[0];
	}
};

module.exports = removeObj;