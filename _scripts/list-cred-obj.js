function listCredObj(cred_data, universal_id, listObj){
	if(universal_id=='r0') return cred_data;
	var  cred_arr = listObj(cred_data, {universal_id: universal_id});
	return cred_arr;
}

module.exports = listCredObj;