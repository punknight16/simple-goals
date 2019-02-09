function checkoutLinkObj(link_data, cred_id, checkoutObj){
	return checkoutObj(link_data, {cred_id: cred_id});
}

module.exports = checkoutLinkObj;