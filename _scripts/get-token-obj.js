function getTokenObj(token_arr, token_id, getObj){
	var token_obj = getObj(token_arr, {token_id: token_id});
	return token_obj;
}

module.exports = getTokenObj;