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
prioritizeInteractor = require('./_scripts/prioritize-interactor');
listGoalInteractor = require('./_scripts/list-goal-interactor');

var error = function(res, err_msg){
	console.log(JSON.stringify(err_msg));
	displayTemplate(res, err_msg, 'error.html');
};

var displayTemplate = function(res, msg, template=null, args={}){
	var template_path = "./_templates/"+template;
	var full_args = Object.assign(args, {msg: msg});
	//console.log(args.Objects);
	var stream = mu.compileAndRender(template_path, full_args);
	stream.pipe(res);
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
		{cred_id: 'cred-0vndq7krkn6o', resource_id:'r-mt/priortize-home', universal_id: 'cred-0vndq7krkn6o'},
		{cred_id: 'cred-0vndq7krkn6o', resource_id:'r-mt/search-goal', universal_id: 'cred-0vndq7krkn6o'}
	],
	engagement_data: [],
	goal_data: [
		{goal_id: 'g1', universal_id: 'public'},
		{goal_id: 'g2', universal_id: 'public'},
		{goal_id: 'g3', universal_id: 'public'},
		{goal_id: 'g4', universal_id: 'public'},
		{goal_id: 'g5', universal_id: 'public'},
		{goal_id: 'g6', universal_id: 'public'},
		{goal_id: 'g7', universal_id: 'public'},
		{goal_id: 'g8', universal_id: 'public'},
		{goal_id: 'g9', universal_id: 'public'},
		{goal_id: 'g10', universal_id: 'public'},
		{goal_id: 'g11', universal_id: 'public'},
		{goal_id: 'g12', universal_id: 'public'},
		{goal_id: 'g13', universal_id: 'public'},
		{goal_id: 'g14', universal_id: 'public'},
		{goal_id: 'g15', universal_id: 'public'},
		{goal_id: 'g16', universal_id: 'public'},
		{goal_id: 'g17', universal_id: 'public'}
	],
	tag_data: [
		{goal_id: 'g1', tag_name: 'career'},
		{goal_id: 'g2', tag_name: 'relationship'},
		{goal_id: 'g3', tag_name: 'fitness'}
	],
	link_data: [
		{cred_id: 'cred-0vndq7krkn6o', goal_id: 'g1', priority: 1, checked: ''},
		{cred_id: 'cred-0vndq7krkn6o', goal_id: 'g2', priority: 2, checked: ''},
		{cred_id: 'cred-0vndq7krkn6o', goal_id: 'g3', priority: 3, checked: ''},
		{cred_id: 'cred-0vndq7krkn6o', goal_id: 'g4', priority: 4, checked: ''},
		{cred_id: 'cred-0vndq7krkn6o', goal_id: 'g5', priority: 5, checked: ''},
		{cred_id: 'cred-0vndq7krkn6o', goal_id: 'g6', priority: 6, checked: ''}
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
	token_arr: [],
	checkout_cache: {}
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
ext.checkoutObj = require('./_models/checkout-obj');
ext.checkoutLinkObj = require('./_scripts/checkout-link-obj');
ext.editObj = require('./_models/edit-obj');
ext.editLinkObj = require('./_scripts/edit-link-obj');
ext.listGoalObj = require('./_scripts/list-goal-obj');
ext.listObj = require('./_models/list-obj');

var server = http.createServer(function(req, res){
	var path_params = req.url.split('/');
	var path = path_params[1].split('?');
	switch(path[0]){
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
		case 'goals':
		  //could be coming from index, home, or goals
			if(req.method=='GET'){
				receiveCookieData(req, function(err, cookie_obj){
					if(err) return error(res, err);
					if(!cookie_obj.hasOwnProperty('token_id')) return error(res, 'missing auth params');
					if(!cookie_obj.hasOwnProperty('public_token')) return error(res, 'missing auth params');
					var args = Object.assign(cookie_obj, {query_string: path[1]}, { resource_id: 'r-mt/list-goal-obj', universal_id: 'public' });
					listGoalInteractor(data, config, args, ext, function(err, confirm_args){
						if(err) return error(res, err);
						confirm_args.Items = confirm_args.menu_items;
						swapIdForName(data.name_data, confirm_args.goal_arr, function(err, swapped_data){
							confirm_args.Objects = swapped_data;
							displayTemplate(res, '', 'goal.html', confirm_args);
						});
					});
				});
			} else {
				receivePostData(req, function(err, post_obj){
						if(err) return error(res, err);
						if(!post_obj.hasOwnProperty('term_str')) return error(res, 'missing amount');
						receiveCookieData(req, function(err, cookie_obj){
							if(err) return error(res, err);
							if(!cookie_obj.hasOwnProperty('token_id')) return error(res, 'missing auth params');
							if(!cookie_obj.hasOwnProperty('public_token')) return error(res, 'missing auth params');
							var args = Object.assign(post_obj, cookie_obj, { resource_id: 'r-mt/search-goal' });
							searchGoalInteractor(data, config, args, ext, function(err, confirm_args){
								if(err) return error(res, err);
								if(typeof menu_items == 'undefined') return error(res, 'session expired');
								displayTemplate(res, 'found goals', 'goal.html', confirm_args);
							});
						})
					});
					break;
			} 
			break;
		case 'home':
			if(req.method=='GET'){
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
			} else {
				receivePostData(req, function(err, post_obj){
					if(err) return error(res, err);
					switch(post_obj.form_id){
						case 'login-v1.1':
							if(!post_obj.hasOwnProperty('email') ||
								!post_obj.hasOwnProperty('password')) return error(res, 'missing login params');
							loginInteractor(data, config, post_obj, ext, function(err, args){
								if(err) return error(res, err);
								//
								var token_str = args.token_obj.token_id+'.'+args.token_obj.public_token+'.'+args.token_obj.cred_id;
								args.cookie_script = 'document.cookie = "token='+token_str+'; path=/";';
								args.Items = args.menu_items;
								var sorted_links = args.link_arr.sort((a, b)=>{return a.priority-b.priority});
								swapIdForName(data.name_data, sorted_links, function(err, swapped_data){
									args.Objects = swapped_data;
									displayTemplate(res, 'Login Successful', 'home.html', args);
								});
							});
							break;
						case 'prioritize-v1.1':
							var keys = Object.keys(post_obj);
							var values = Object.values(post_obj);
							//console.log(values);
							var link_arr = [];
							keys.map((item, index)=>{
								if(keys[index]!='form_id' && typeof keys[index] != 'undefined'){
									link_arr.push({goal_id: keys[index], priority: values[index]});
								} 
							});
							receiveCookieData(req, function(err, cookie_obj){
								if(err) return error(res, err);
								if(!cookie_obj.hasOwnProperty('token_id')) return error(res, 'missing auth params');
								if(!cookie_obj.hasOwnProperty('public_token')) return error(res, 'missing auth params');
								var args = Object.assign(post_obj, cookie_obj,{resource_id: 'r-mt/priortize-home', link_arr: link_arr});
								prioritizeInteractor(data, config, args, ext, function(err, confirm_args){
									if(err) return error(res, err);
									//console.log(confirm_args.link_arr);
									args.cookie_script = '';
									args.Items = confirm_args.menu_items;
									swapIdForName(data.name_data, confirm_args.link_arr, function(err, swapped_data){
										args.Objects = swapped_data;
										displayTemplate(res, 'Prioritize Successful', 'home.html', args);
									});
								});
							});
							break;
						case 'register-v1.1':
							if(!post_obj.hasOwnProperty('username') || 
								!post_obj.hasOwnProperty('email') ||
								!post_obj.hasOwnProperty('password')) return error(res, 'missing register params');
							registerInteractor(data, config, post_obj, ext, function(err, args){
								if(err) return error(res, err);
								var token_str = args.token_obj.token_id+'.'+args.token_obj.public_token+'.'+args.token_obj.cred_id;
								args.cookie_script = 'document.cookie = "token='+token_str+'; path=/";';
								args.Items = args.menu_items;
								displayTemplate(res, 'Registration Successful', 'help.html', args);
							});
							break;
						case 'select-v1.1':
							var keys = Object.keys(post_obj);
							var values = Object.values(post_obj);
							//console.log(values);
							var link_arr = [];
							keys.map((item, index)=>{
								if(keys[index]!='form_id' && typeof keys[index] != 'undefined'){
									link_arr.push({goal_id: keys[index], priority: values[index]});
								} 
							});
							console.log('link_arr: ', link_arr);
							receiveCookieData(req, function(err, cookie_obj){
								if(err) return error(res, err);
								if(!cookie_obj.hasOwnProperty('token_id')) return error(res, 'missing auth params');
								if(!cookie_obj.hasOwnProperty('public_token')) return error(res, 'missing auth params');
								var args = Object.assign(post_obj, cookie_obj,{resource_id: 'r-mt/priortize-home', link_arr: link_arr});
								res.end('we got this far');
								/*
								prioritizeInteractor(data, config, args, ext, function(err, confirm_args){
									if(err) return error(res, err);
									//console.log(confirm_args.link_arr);
									args.cookie_script = '';
									args.Items = confirm_args.menu_items;
									swapIdForName(data.name_data, confirm_args.link_arr, function(err, swapped_data){
										args.Objects = swapped_data;
										displayTemplate(res, 'Prioritize Successful', 'home.html', args);
									});
								});*/
							});
							break;
						default:
							error(res, 'can\'t find route to match form_id');
					}
				});
			}
			break;
		case 'build':
			var stream = fs.createReadStream('./build/'+path_params[2]);
			stream.pipe(res);
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
