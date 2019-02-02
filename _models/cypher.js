function cypher(public_key, secret, crypto){
	var mykey = crypto.createCipher('aes-128-cbc', secret);
	var mystr = mykey.update(public_key, 'utf8', 'hex')
	mystr += mykey.final('hex');	
	return mystr;
}

function decypher(private_key, secret, crypto){
	var mykey = crypto.createDecipher('aes-128-cbc', secret);
	var mystr = mykey.update(private_key, 'hex', 'utf8')
	mystr += mykey.final('utf8');
	return mystr;
}

exports.cypher = cypher;
exports.decypher = decypher;