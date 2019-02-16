function promisePostData (req, cb){
	return Promise.resolve({test: 'hi'});

}

module.exports = promisePostData;