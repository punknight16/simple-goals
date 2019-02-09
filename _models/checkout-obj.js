function checkoutObj(data, params_obj){
	var values = Object.values(params_obj);
	var keys = Object.keys(params_obj);
	data.map((item, index)=>{
		item.index = index;
	});
	var ans_arr = values.reduce((acc, value, index, arr)=>{
		var filtered_arr = acc.filter((item, item_index)=>{
			return (item[keys[index]]==value);
		});
		return filtered_arr
	}, data);
	
	for (var i = ans_arr.length - 1; i >= 0; i--) {
		data.splice(ans_arr[i].index, 1);
	};
		


	if(typeof ans_arr=='undefined'){
		return undefined;
	} else {
		return ans_arr;
	}
};

module.exports = checkoutObj;
