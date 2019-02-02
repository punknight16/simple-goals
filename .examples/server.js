var http = require('http');
var fs = require('fs');

var data = {
	goal_data: [
		{goal_id: 'g1', universal_id: 'public'},
		{goal_id: 'g2', universal_id: 'public'},
		{goal_id: 'g3', universal_id: 'public'}
	],
	tag_data: [
		{goal_id: 'g1', tag_name: 'career'},
		{goal_id: 'g2', tag_name: 'relationship'},
		{goal_id: 'g3', tag_name: 'fitness'}
	],
	link_data: [
		{cred_id: 'cred-0vndq7krkn6o', goal_id: 'g1', checked: 'checked'},
		{cred_id: 'cred-0vndq7krkn6o', goal_id: 'g2', checked: ''},
		{cred_id: 'cred-0vndq7krkn6o', goal_id: 'g3', checked: ''}
	]
};


var server = http.createServer(function(req, res){
	var path_params = req.url.split('/');
	var path = path_params[1].replace('?', '');
	switch(path){
		case 'list':
			res.end('listing your links');
			break;
		case 'add':
			res.end('add a goal to goals');
			break;
		case 'search':
			res.end('filtering goals from goals');
			break;
		case 'select':
			res.end('select a goal to add to your links');
			break;
		case 'prioritize':
			res.end('changing the order of your links');
			break;
		default:
			res.end('bad path');
	}
}).listen(3002, function(){
	console.log('test server is running on 3002');
});
