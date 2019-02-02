var http = require('http');
var fs = require('fs');
var mu = require("mu2-updated"); //mustache template engine


receivePostData = require('./_models/receive-post-data');
receiveCookieData = require('./_models/receive-cookie-data');
registerInteractor = require('./_scripts/register-interactor');
loginInteractor = require('./_scripts/login-interactor');
getHomeInteractor = require('./_scripts/get-home-interactor');
addSaleInteractor = require('./_scripts/add-sale-interactor');
searchGoalInteractor = require('./_scripts/search-goal-interactor');
addGoalInteractor = require('./_scripts/add-goal-interactor');

var error = function(res, err_msg){
	console.log(JSON.stringify(err_msg));
	res.end(JSON.stringify(err_msg));
};

var displayTemplate = function(res, token_obj, template=null, menu_items=null, name_data=null, list_data=null, term_str=null){
	if(template===null){
		var token = token_obj.token_id+'.'+token_obj.public_token+'.'+token_obj.cred_id;
		res.write('<!DOCTYPE html>');
		res.write('<head>');
		res.write('<script>');
		res.write('document.cookie = "token='+token+'; path=/";');
		res.write('</script>');
		res.write('</head>');
		res.write('<body>');
		res.write(`cookies are set`);
		res.write('</body>');
		res.write('</html>');
		res.end();
	} else {
		var token = token_obj.token_id+'.'+token_obj.public_token+'.'+token_obj.cred_id;
		var cookie_script = 'document.cookie = "token='+token+'; path=/";';
		if(name_data==null || list_data==null){
			swapIdForName(data.name_data, data.link_data, function(err, swapped_data){
				var stream = mu.compileAndRender("./_templates/home.html", {
					Objects: swapped_data,
					cookie_script: cookie_script,
					Items: menu_items
				});
				stream.pipe(res);
			});
		} else {
			swapIdForName(name_data, list_data, function(err, swapped_data){
				var template_path = "./_templates/"+template;
				var stream = mu.compileAndRender(template_path, {
					Objects: swapped_data,
					cookie_script: cookie_script,
					Items: menu_items,
					term_str: term_str
				});
				stream.pipe(res);
			});
		}
	}
}

var data = {
	universal_data: ["cred-0vndq7krkn6o", 'engagement-0u6v80trf7q8'],
	cred_data: [
		{ 
			cred_id: 'cred-0vndq7krkn6o',
		  email: 'demo%40mail.com',
		  password: '77de38e4b50e618a0ebb95db61e2f42697391659d82c064a5f81b9f48d85ccd5',
		  engagement_id: 'engagement-0u6v80trf7q8' 
		}
	],
	name_data: [
		{universal_id: 'cred-0vndq7krkn6o', universal_name: 'demo-user'},
		{universal_id: 'g1', universal_name: 'find a job'},
		{universal_id: 'g2', universal_name: 'plan date with wife'},
		{universal_id: 'g3', universal_name: '40 pushups'}
	],
	permission_data: [
		{cred_id: 'cred-0vndq7krkn6o', resource_id:'r-mt/menu', universal_id: 'menu-2'},
		{cred_id: 'cred-0vndq7krkn6o', resource_id:'r-mt/get-home', universal_id: 'cred-0vndq7krkn6o'},
		{cred_id: 'cred-0vndq7krkn6o', resource_id:'r-mt/search-goal', universal_id: 'cred-0vndq7krkn6o'}
	],
	engagement_data: [],
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
	],
	menu_data: [
		{menu_id: 'menu-0', menu_items: [
			{link: '/home', value: 'Home', active: 'active', sr: '<span class="sr-only">(current)</span>'},
			{link: '/goals', value: 'Goals'},
			{link: '/review', value: 'Write A Review!'}
		]},
		{menu_id: 'menu-1', menu_items: [
			{link: '/home', value: 'Home', active: 'active', sr: '<span class="sr-only">(current)</span>'},
			{link: '/goals', value: 'Goals'},
			{link: '/pricing', value: 'Upgrade Now!'}
		]},
		{menu_id: 'menu-2', menu_items: [
			{link: '/home', value: 'Home', active: 'active', sr: '<span class="sr-only">(current)</span>'},
			{link: '/goals', value: 'Goals'},
			{link: '/register', value: 'Register Today!'}
		]}
	],
	sale_data: []
};
var config = {
	pass_secret: 'secret',
	token_secret: 'other_secret',
	last_engagement_arr: [],
	token_arr: []
};
var ext = {};
ext.generateId = require('./_models/generate-id');
ext.addCredObj = require('./_scripts/add-cred-obj');
ext.addNameObj = require('./_scripts/add-name-obj');
ext.addObj = require('./_models/add-obj');
ext.crypto = require('crypto');
ext.addPermissionObj = require('./_scripts/add-permission-obj');
ext.addEngagementObj = require('./_scripts/add-engagement-obj');
ext.addTokenObj = require('./_scripts/add-token-obj');
ext.cypher = require('./_models/cypher').cypher;
ext.decypher = require('./_models/cypher').decypher;
ext.encryptPassword = require('./_models/encrypt').encryptPassword;
ext.compareCreds = require('./_models/encrypt').compareCreds;
ext.addGoalObj = require('./_scripts/add-goal-obj');
ext.authorizeRequest = require('./_models/authorize-request');
ext.getObj = require('./_models/get-obj');
ext.getTokenObj = require('./_scripts/get-token-obj');
ext.getPermissionObj = require('./_scripts/get-permission-obj');
ext.compareKeys = require('./_models/compare-keys');
ext.addLinkObj = require('./_scripts/add-link-obj');
ext.getMenuObj = require('./_scripts/get-menu-obj');
ext.getMenuIdFromPermission = require('./_scripts/get-menu_id-from-permission');
ext.addSaleObj = require('./_scripts/add-sale-obj');
ext.join = require('./_models/join');
ext.joinTagAndGoal = require('./_scripts/join-tag-and-goal');

var server = http.createServer(function(req, res){
	var path_params = req.url.split('/');
	var path = path_params[1].replace('?', '');
	switch(path){
		case '':
			var stream = fs.createReadStream('./_pages/index.html');
			stream.pipe(res);
			break;
		case 'index':
			var stream = fs.createReadStream('./_pages/index.html');
			stream.pipe(res);
			break;
		case 'register':
			var stream = fs.createReadStream('./_pages/register.html');
			stream.pipe(res);
			break;
		case 'login':
			var stream = fs.createReadStream('./_pages/login.html');
			stream.pipe(res);
			break;
		case 'home':
		  //could be coming from index (send them to an error page), register, login, goals (select and submit), or home (order and submit < 5)
		  //process the action first, then send them to this page
			receiveCookieData(req, function(err, cookie_obj){
				if(err) return error(res, err);
				if(!cookie_obj.hasOwnProperty('token_id')) return error(res, 'missing auth params');
				if(!cookie_obj.hasOwnProperty('public_token')) return error(res, 'missing auth params');
				var args = Object.assign(cookie_obj, { resource_id: 'r-mt/get-home' });
				getHomeInteractor(data, config, args, ext, function(err, menu_items){
					if(typeof menu_items == 'undefined') return error(res, 'session expired');
					displayTemplate(res, cookie_obj, 'home.html', menu_items);
				});
			});
			break;
		case 'goals':
		  //could be coming from index, home, or goals
			swapIdForName(data.name_data, data.link_data, function(err, swapped_data){
				var stream = mu.compileAndRender("./_templates/goals-demo.html", {
					Objects: swapped_data
				});
				stream.pipe(res);
			});
			break;
		case 'pricing':
			var stream = fs.createReadStream('./_pages/pricing.html');
			stream.pipe(res);
			break;
		case 'documentation':
			var stream = fs.createReadStream('./_pages/documentation.html');
			stream.pipe(res);
			break;
		case 'logout':
			res.end('logging out');
			break;
		case 'deactivate-account':
			res.end('deactivate-account');
			break;
		case 'api':
			switch(path_params[2]){
				case 'register':
					receivePostData(req, function(err, post_obj){
						if(err) return error(res, err);
						if(!post_obj.hasOwnProperty('username') || 
							!post_obj.hasOwnProperty('email') ||
							!post_obj.hasOwnProperty('password')) return error(res, 'missing register params');
						registerInteractor(data, config, post_obj, ext, function(err, cookie_obj, menu_items){
							if(err) return error(res, err);
							displayTemplate(res, cookie_obj, 'home.html', menu_items);
						});
					});
					break;
				case 'login':
					receivePostData(req, function(err, post_obj){
						if(err) return error(res, err);
						if(!post_obj.hasOwnProperty('email') ||
							!post_obj.hasOwnProperty('password')) return error(res, 'missing login params');
						loginInteractor(data, config, post_obj, ext, function(err, token_obj, menu_items){
							if(err) return error(res, err);
							displayTemplate(res, token_obj, 'home.html', menu_items);
						});
					});
					break;
				case 'add-sale':
					receivePostData(req, function(err, post_obj){
						if(err) return error(res, err);
						if(!post_obj.hasOwnProperty('amount')) return error(res, 'missing amount');
						if(!post_obj.hasOwnProperty('product')) return error(res, 'missing product');
						receiveCookieData(req, function(err, cookie_obj){
							if(err) return error(res, err);
							if(!cookie_obj.hasOwnProperty('token_id')) return error(res, 'missing auth params');
							if(!cookie_obj.hasOwnProperty('public_token')) return error(res, 'missing auth params');
							var args = Object.assign(post_obj, cookie_obj, { resource_id: 'r-mt/add-sale' });
							addSaleInteractor(data, config, post_obj, ext, function(err, menu_items){
								if(err) return error(res, err);
								if(typeof menu_items == 'undefined') return error(res, 'session expired');
								displayTemplate(res, cookie_obj, 'home.html', menu_items);
							});
						})
					});
					break;
				case 'search-goal':
					receivePostData(req, function(err, post_obj){
						if(err) return error(res, err);
						if(!post_obj.hasOwnProperty('term_str')) return error(res, 'missing amount');
						receiveCookieData(req, function(err, cookie_obj){
							if(err) return error(res, err);
							if(!cookie_obj.hasOwnProperty('token_id')) return error(res, 'missing auth params');
							if(!cookie_obj.hasOwnProperty('public_token')) return error(res, 'missing auth params');
							var args = Object.assign(post_obj, cookie_obj, { resource_id: 'r-mt/search-goal' });
							searchGoalInteractor(data, config, args, ext, function(err, menu_items, goal_arr){
								if(err) return error(res, err);
								if(typeof menu_items == 'undefined') return error(res, 'session expired');
								displayTemplate(res, cookie_obj, 'goal.html', menu_items, data.name_data, goal_arr, post_obj.term_str);
							});
						})
					});
					break;
				case 'add-goal':
					receivePostData(req, function(err, post_obj){
						if(err) return error(res, err);
						if(!post_obj.hasOwnProperty('goalInput')) return error(res, 'missing goal params');
						receiveCookieData(req, function(err, cookie_obj){
							if(err) return error(res, err);
							if(!cookie_obj.hasOwnProperty('token_id')) return error(res, 'missing auth params');
							if(!cookie_obj.hasOwnProperty('public_token')) return error(res, 'missing auth params');
							var args = Object.assign(post_obj, cookie_obj, { resource_id: 'r-mt/add-goal' });
							addGoalInteractor(data, config, post_obj, ext, function(err, token_obj){
								if(err) return error(res, err);
								displayTemplate(res, token_obj);
							});
						})
					});
					break;
				default:
					res.end('bad api request')
			}
			break;
		default:
			res.end('bad request');
	}
}).listen(3001, function(){
	console.log('simple-motivation-therapy is running on 3001');
});

function swapIdForName(name_data, args_data, cb){
	var swapped_data = args_data.map((obj)=>{
		var swapped_obj = {}
		for (var prop in obj) {
			var uni_obj = name_data.find((item)=>{
				return (item.universal_id == obj[prop])
			})
			if(typeof uni_obj != 'undefined'){
				swapped_obj[prop] = uni_obj.universal_name;
			} else {
				swapped_obj[prop] = obj[prop];
			}
		}
		return swapped_obj;
	});
	return cb(null, swapped_data);
}
