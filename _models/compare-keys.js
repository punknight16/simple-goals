function compareKeys(public_token, private_token, token_secret, decypher, crypto){
	var decyphered_token = decypher(private_token, token_secret, crypto);
	if(typeof decyphered_token == 'undefined') return undefined;
	if(public_token===decyphered_token){
		return true;
	} else {
		return false;
	}
}

module.exports = compareKeys;