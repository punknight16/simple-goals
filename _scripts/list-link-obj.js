function listLinkObj(link_data, cred_id, listObj){
	if(cred_id=='r0') return cb(null, link_data);
	var link_arr = listObj(link_data, {cred_id: cred_id});
	return link_arr
}

module.exports = listLinkObj;