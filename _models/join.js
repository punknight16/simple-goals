function join(data1, data2, join_key, filter_fn, getObj){
	
	var ans_arr = [];
	var join_obj = {};
	var filter_arr = data1.filter(filter_fn);
	filter_arr.map((item)=>{
		join_obj[item[join_key]] = item[join_key];
	});
	
	for (k in join_obj){
		var param_obj = {};
		param_obj[join_key] = k;
		var found_obj = getObj(data2, param_obj);
		
		ans_arr.push(found_obj);
	}
	
	return ans_arr;
}

module.exports = join;