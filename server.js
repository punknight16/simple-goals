var http = require('http');
var fs = require('fs');
var mu = require("mu2-updated"); //mustache template engine

var promisePostData = require('./_models/promise-post-data');
var receivePostData = require('./_models/receive-post-data');
var receiveCookieData = require('./_models/receive-cookie-data');
var registerInteractor = require('./_scripts/register-interactor');
var loginInteractor = require('./_scripts/login-interactor');
var getHomeInteractor = require('./_scripts/get-home-interactor');
var addSaleInteractor = require('./_scripts/add-sale-interactor');
var searchGoalInteractor = require('./_scripts/search-goal-interactor');
var addGoalInteractor = require('./_scripts/add-goal-interactor');
var prioritizeInteractor = require('./_scripts/prioritize-interactor');
var listGoalInteractor = require('./_scripts/list-goal-interactor');
var selectGoalInteractor = require('./_scripts/select-goal-interactor');
var logoutInteractor = require('./_scripts/logout-interactor');
var deactivateAccountInteractor = require('./_scripts/deactivate-account-interactor');
var listUserInteractor = require('./_scripts/list-user-interactor');
var inspectSprintInteractor = require('./_scripts/inspect-sprint-interactor');
var helpSprintInteractor = require('./_scripts/help-sprint-interactor');
var openSprintInteractor = require('./_scripts/open-sprint-interactor');
var addArticleInteractor = require('./_scripts/add-article-interactor');

var error = function(res, err_msg){
	console.log(JSON.stringify(err_msg));
	displayTemplate(res, err_msg, 'error.html');
};

var displayTemplate = function(res, msg, template=null, args={}){
	console.log('args: ', args);
	var template_path = "./_templates/"+template;
	var full_args = Object.assign(args, {msg: msg});
	console.log("full_args: ", full_args);
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
		{universal_id: 'g3', universal_name: '40 pushups'},
		{universal_id: 'a0', universal_name: 'my first plan'},
		{universal_id: 'a1', universal_name: 'making progress'},
		{universal_id: 's0', universal_name: 'monetize-geekly-grind'}
	],
	permission_data: [
		{cred_id: 'cred-0vndq7krkn6o', resource_id:'r-mt/menu', universal_id: 'menu-2'},
		{cred_id: 'cred-0vndq7krkn6o', resource_id:'r-mt/get-home', universal_id: 'cred-0vndq7krkn6o'},
		{cred_id: 'cred-0vndq7krkn6o', resource_id:'r-mt/priortize-home', universal_id: 'cred-0vndq7krkn6o'},
		{cred_id: 'cred-0vndq7krkn6o', resource_id:'r-mt/search-goal', universal_id: 'public'},
		{cred_id: 'cred-0vndq7krkn6o', resource_id:'r-mt/bookmark-goal', universal_id: 'cred-0vndq7krkn6o'},
		{cred_id: 'cred-0vndq7krkn6o', resource_id:'r-mt/inspect-sprint', universal_id: 'cred-0vndq7krkn6o'},
		{cred_id: 'cred-0vndq7krkn6o', resource_id:'r-mt/open-sprint', universal_id: 'cred-0vndq7krkn6o'},
		{cred_id: 'cred-0vndq7krkn6o', resource_id:'r-mt/add-article', universal_id: 'cred-0vndq7krkn6o'},
		{cred_id: 'cred-0vndq7krkn6o', resource_id:'r-mt/list-goal-obj', universal_id: 'public'},
		{cred_id: 'cred-0vndq7krkn6o', resource_id:'r-mt/logout', universal_id: 'public'}
	],
	engagement_data: [
		{engagement_id:"e0", parent_id:"--", cred_id:"cred-0vndq7krkn6o", date:"2019-03-02T21:50:47.898Z", form_id:"login-v1.1"},
		{engagement_id:"e1", parent_id:"e0", cred_id:"cred-0vndq7krkn6o", date:"2019-03-02T21:51:47.985Z", form_id:"prioritize-v1.1"}
	],
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
		{goal_id: 'g2', tag_name: 'relationship'},
		{goal_id: 'g3', tag_name: 'fitness'},
		{tag_name: 'career', goal_id: 'g1', sprint_id: 's0', article_id: 'a1'},
		{tag_name: 'career', goal_id: 'g1', sprint_id: 's0', article_id: 'a2'}
	],
	link_data: [
		{cred_id: 'cred-0vndq7krkn6o', goal_id: 'g1', sprint_id: 's0', priority: 1, checked: ''},
		{cred_id: 'cred-0vndq7krkn6o', goal_id: 'g2', sprint_id: null, priority: 2, checked: ''},
		{cred_id: 'cred-0vndq7krkn6o', goal_id: 'g3', sprint_id: null, priority: 3, checked: ''},
		{cred_id: 'cred-0vndq7krkn6o', goal_id: 'g4', sprint_id: null, priority: 4, checked: ''},
		{cred_id: 'cred-0vndq7krkn6o', goal_id: 'g5', sprint_id: null, priority: 5, checked: ''},
		{cred_id: 'cred-0vndq7krkn6o', goal_id: 'g6', sprint_id: null, priority: 6, checked: ''}
	],
	menu_data: [
		{menu_id: 'menu-0', menu_items: [
			{link: '/home', value: 'Home', active: 'active', sr: '<span class="sr-only">(current)</span>'},
			{link: '/browse', value: 'Browse'},
			{link: '/user', value: 'Help Others!'}
		]},
		{menu_id: 'menu-1', menu_items: [
			{link: '/home', value: 'Home', active: 'active', sr: '<span class="sr-only">(current)</span>'},
			{link: '/browse', value: 'Browse'},
			{link: '/pricing', value: 'Upgrade Now!'}
		]},
		{menu_id: 'menu-2', menu_items: [
			{link: '/home', value: 'Home', active: 'active', sr: '<span class="sr-only">(current)</span>'},
			{link: '/browse', value: 'Browse'},
			{link: '/register', value: 'Register Today!'},
		]},
		{menu_id: 'menu-3', menu_items: [
			{link: '/home', value: 'Home'},
			{link: '/browse', value: 'Browse', active: 'active', sr: '<span class="sr-only">(current)</span>'},
			{link: '/user', value: 'Help Others!'}
		]},
		{menu_id: 'menu-4', menu_items: [
			{link: '/home', value: 'Home'},
			{link: '/browse', value: 'Browse', active: 'active', sr: '<span class="sr-only">(current)</span>'},
			{link: '/pricing', value: 'Upgrade Now!'}
		]},
		{menu_id: 'menu-5', menu_items: [
			{link: '/home', value: 'Home'},
			{link: '/browse', value: 'Browse', active: 'active', sr: '<span class="sr-only">(current)</span>'},
			{link: '/register', value: 'Register Today!'}
		]},
		{menu_id: 'menu-6', menu_items: [
			{link: '/home', value: 'Home'},
			{link: '/browse', value: 'Browse'},
			{link: '/user', value: 'Help Others!', active: 'active', sr: '<span class="sr-only">(current)</span>'}
		]}
	],
	sprint_data: [
		{sprint_id: 's0', article_id: 'a1', cred_id: 'cred-0vndq7krkn6o', goal_id: 'g1', metric: 'revenue'}
	],
	article_data: [
		{article_id: 'a0', parent_id: null, sprint_id: 's0', value: '$100', engagement_id: 'e0', 
			article_description: 'In order to get these guys, some money I plan to review all of the ways a blog typically monetizes and implement them one by one in a 2 week sprint cycle.'},
		{article_id: 'a1', parent_id: 'a0', sprint_id: 's0', value: '$400', engagement_id: 'e1', 
			article_description: 'I first attempted to monetize by getting advertisers interested in branded content on the website'}
	],
	sale_data: []
};
var config = {
	pass_secret: 'secret',
	token_secret: 'other_secret',
	last_engagement_arr: [],
	token_arr: [],
	checkout_cache: {},
	client_cache: {},
	update_needed: false
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
ext.removeObj = require('./_models/remove-obj');
ext.removeTokenObj = require('./_scripts/remove-token-obj');
ext.removeCredObj = require('./_scripts/remove-cred-obj');
ext.removePermissionObj = require('./_scripts/remove-permission-obj');
ext.listCredObj = require('./_scripts/list-cred-obj');
ext.listEngagementObj = require('./_scripts/list-engagement-obj');
ext.getSprintObj = require('./_scripts/get-sprint-obj');
ext.addSprintObj = require('./_scripts/add-sprint-obj');
ext.addArticleObj = require('./_scripts/add-article-obj');
ext.editSprintObj = require('./_scripts/edit-sprint-obj');

if(process.env.NODE_ENV=='dev'){
	console.log('running dev environment');
	fs.readFile(__dirname+'/data.json', 'utf8', function(err, loaded_data){
		console.log('err: ', err);
		data = JSON.parse(loaded_data);
	});

	setInterval(function(){
		console.log('checking if data needs to be stored');
		if(config.update_needed){
			fs.writeFile(__dirname+'/data.json', JSON.stringify(data), 'utf8', function(err){
				config.update_needed = false;
				console.log('data stored');
			});		
		} else {
			console.log('no updates since data last stored');
		}
	}, 5000)
} else if (process.env.NODE_ENV=='prod'){
	console.log('running prod environment');
	var AWS = require("aws-sdk");
	var s3 = new AWS.S3({
		"region": "us-west-2",
		"accessKeyId": require('./_config/creds.js').aws_creds.Access_key_ID,
		"secretAccessKey": require('./_config/creds.js').aws_creds.Secret_access_key
	});

	var bucket = 'simple-goals';

	var params = {
		Bucket: bucket,
		Key: 'data.json',
		ResponseContentEncoding: 'utf8'
	};
	s3.getObject(params, function(err, loaded_data) {
		if (err) console.log(err);
		if(loaded_data == null){
			//error here
			data = {};
		} else {
			data = JSON.parse(loaded_data.Body.toString());
			console.log('data var set: ', JSON.stringify(data));	
		}
	});

	setInterval(function(){
		console.log('checking if data needs to be stored');
		if(config.update_needed){
			var body_str = JSON.stringify(data);
			var params2 = {
				Body: body_str,
				Bucket: bucket,
				Key: 'data.json',
				ContentType: "String",
				ContentLength: body_str.length
			};
			s3.putObject(params2, function(err, stored_data) {
				if (err) console.log(err);
				config.update_needed = false;
				console.log('data stored: ', JSON.stringify(stored_data));
			});	
		} else {
			console.log('no updates since data last stored');
		}
	}, 1800000) //1800000 is 30 min
}


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
			receiveCookieData(req, function(err, cookie_obj){
				console.log('cookie_obj: ', cookie_obj);
				if(err || cookie_obj.token_id=='null') {
					var stream = fs.createReadStream('./_pages/register.html');
					stream.pipe(res);		
				} else {
					if(!cookie_obj.hasOwnProperty('token_id')) return error(res, 'missing auth params');
					if(!cookie_obj.hasOwnProperty('public_token')) return error(res, 'missing auth params');
					var args = Object.assign(cookie_obj, { resource_id: 'r-mt/logout', universal_id: 'public'});
					logoutInteractor(data, config, args, ext, function(err, confirm_args){
						if(err) {
							var fake_args = {cookie_script: 'document.cookie = "token=null; path=/";'};
							displayTemplate(res, '', 'register.html', fake_args);
						} else {
							confirm_args.token_obj = null;
							confirm_args.cookie_obj = null;
							confirm_args.cookie_script = 'document.cookie = "token=null; path=/";';
							displayTemplate(res, 'Logout Successful', 'register.html', confirm_args);
						}
					});
				}
			});
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
			receiveCookieData(req, function(err, cookie_obj){
				if(err) return error(res, err);
				if(!cookie_obj.hasOwnProperty('token_id')) return error(res, 'missing auth params');
				if(!cookie_obj.hasOwnProperty('public_token')) return error(res, 'missing auth params');
				var args = Object.assign(cookie_obj, { resource_id: 'r-mt/logout', universal_id: 'public'});
				logoutInteractor(data, config, args, ext, function(err, confirm_args){
					if(err) return error(res, err);
					confirm_args.token_obj = null;
					confirm_args.cookie_obj = null;
					confirm_args.cookie_script = 'document.cookie = "token=null; path=/";';
					displayTemplate(res, 'Logout Successful', 'logout.html', confirm_args);
				});
			});
			break;
		case 'deactivate-account':
			receivePostData(req, function(err, post_obj){
				if(err) return error(res, err);
				if(!post_obj.hasOwnProperty('emailInput')) return error(res, 'missing email validation');
				receiveCookieData(req, function(err, cookie_obj){
					if(err) return error(res, err);
					if(!cookie_obj.hasOwnProperty('token_id')) return error(res, 'missing auth params');
					if(!cookie_obj.hasOwnProperty('public_token')) return error(res, 'missing auth params');
					var args = Object.assign(post_obj, cookie_obj, { resource_id: 'r-mt/deactivate-account' });
					deactivateAccountInteractor(data, config, args, ext, function(err, confirm_args){
						if(err) return error(res, err);
						confirm_args.token_obj = null;
						confirm_args.cookie_obj = null;
						confirm_args.cookie_script = 'document.cookie = "token=null; path=/";';
						displayTemplate(res, 'Account Deactivated', 'register.html', confirm_args);
					});
				});
			});
			break;
		case 'browse':
		  //could be coming from index, home, or goals
			if(req.method=='GET'){
				receiveCookieData(req, function(err, cookie_obj){
					if(err) return error(res, err);
					if(!cookie_obj.hasOwnProperty('token_id')) return error(res, 'missing auth params');
					if(!cookie_obj.hasOwnProperty('public_token')) return error(res, 'missing auth params');
					if(typeof path[1] == 'undefined'){
						path[1] = 'cursor=1';
					};
					var args = Object.assign(cookie_obj, {goal_cursor: path[1].split('=')[1]}, { resource_id: 'r-mt/list-goal-obj', universal_id: 'public' });
					listGoalInteractor(data, config, args, ext, function(err, confirm_args){
						if(err) return error(res, err);
						confirm_args.Items = confirm_args.menu_items;
						confirm_args.page_arr = new Array(confirm_args.goal_pages).fill({a:1}).map((item, index)=>{ 
							item = {};
							item.active = '';
							if((confirm_args.goal_cursor-1)==index){
								item.active = 'active'
							}
							item.index = index+1;
							return item;
						});
						
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
							var args = Object.assign(post_obj, cookie_obj, { resource_id: 'r-mt/search-goal', universal_id: 'public'});
							searchGoalInteractor(data, config, args, ext, function(err, confirm_args){
								if(err) return error(res, err);
								confirm_args.Items = confirm_args.menu_items;
								confirm_args.page_arr = new Array(confirm_args.goal_pages).fill({a:1}).map((item, index)=>{ 
									item = {};
									item.active = '';
									if((confirm_args.goal_cursor-1)==index){
										item.active = 'active'
									}
									item.index = index+1;
									return item;
								});
								console.log('confirm_args for search: ', confirm_args);
								swapIdForName(data.name_data, confirm_args.goal_arr, function(err, swapped_data){
									confirm_args.Objects = swapped_data;
									displayTemplate(res, 'Found goals', 'goal.html', confirm_args);
								});
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
					getHomeInteractor(data, config, args, ext, function(err, confirm_args){
						if(err) return error(res, err);
						confirm_args.Items = confirm_args.menu_items;
						confirm_args.page_arr = new Array(confirm_args.link_pages).fill({a:1}).map((item, index)=>{ 
							item = {};
							item.active = '';
							if((confirm_args.link_cursor-1)==index){
								item.active = 'active'
							}
							item.index = index+1;
							return item;
						});
						console.log('confirm_args for getHomeInteractor: ', confirm_args);
						var sorted_links = confirm_args.link_arr.sort((a, b)=>{return a.priority-b.priority});
						swapIdForName(data.name_data, sorted_links, function(err, swapped_data){
							confirm_args.Objects = swapped_data;
							displayTemplate(res, '', 'home.html', confirm_args);
						});
					});
				});
			} else {
				receivePostData(req, function(err, post_obj){
					if(err) return error(res, err);
					switch(post_obj.form_id){
						case 'login-v1.1':
							if(!post_obj.hasOwnProperty('email') ||
								!post_obj.hasOwnProperty('password')) return error(res, 'missing login params');
							loginInteractor(data, config, post_obj, ext, function(err, confirm_args){
								if(err) return error(res, err);
								//
								var token_str = confirm_args.token_obj.token_id+'.'+confirm_args.token_obj.public_token+'.'+confirm_args.token_obj.cred_id;
								confirm_args.cookie_script = 'document.cookie = "token='+token_str+'; path=/";';
								confirm_args.Items = confirm_args.menu_items;
								confirm_args.page_arr = new Array(confirm_args.link_pages).fill({a:1}).map((item, index)=>{ 
										item = {};
										item.active = '';
										if((confirm_args.link_cursor-1)==index){
											item.active = 'active'
										}
										item.index = index+1;
										return item;
									});
									
									var sorted_links = confirm_args.link_arr.sort((a, b)=>{return a.priority-b.priority});
									swapIdForName(data.name_data, sorted_links, function(err, swapped_data){
										confirm_args.Objects = swapped_data;
										displayTemplate(res, 'Login Successful', 'home.html', confirm_args);
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
									confirm_args.cookie_script = '';
									confirm_args.Items = confirm_args.menu_items;
									confirm_args.page_arr = new Array(confirm_args.link_pages).fill({a:1}).map((item, index)=>{ 
										item = {};
										item.active = '';
										if((confirm_args.link_cursor-1)==index){
											item.active = 'active'
										}
										item.index = index+1;
										return item;
									});
									
									var sorted_links = confirm_args.link_arr.sort((a, b)=>{return a.priority-b.priority});
									swapIdForName(data.name_data, sorted_links, function(err, swapped_data){
										confirm_args.Objects = swapped_data;
										displayTemplate(res, 'Prioritized Goals', 'home.html', confirm_args);
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
						case 'bookmark-v1.1':
							var keys = Object.keys(post_obj);
							var values = Object.values(post_obj);
							//console.log(values);
							var link_arr = [];
							keys.map((item, index)=>{
								if(keys[index]!='form_id' && typeof keys[index] != 'undefined'){
									link_arr.push({index: keys[index], isSelected: values[index]});
								} 
							});
							
							receiveCookieData(req, function(err, cookie_obj){
								if(err) return error(res, err);
								if(!cookie_obj.hasOwnProperty('token_id')) return error(res, 'missing auth params');
								if(!cookie_obj.hasOwnProperty('public_token')) return error(res, 'missing auth params');
								var args = Object.assign(post_obj, cookie_obj,{resource_id: 'r-mt/bookmark-goal', link_arr: link_arr});
								selectGoalInteractor(data, config, args, ext, function(err, confirm_args){
									if(err) return error(res, err);
									confirm_args.cookie_script = '';
									confirm_args.Items = confirm_args.menu_items;
									confirm_args.page_arr = new Array(confirm_args.link_pages).fill({a:1}).map((item, index)=>{ 
										item = {};
										item.active = '';
										if((confirm_args.link_cursor-1)==index){
											item.active = 'active'
										}
										item.index = index+1;
										return item;
									});
									console.log('confirm_args for selectGoalsInteractor: ', confirm_args);
									var sorted_links = confirm_args.link_arr.sort((a, b)=>{return a.priority-b.priority});
									swapIdForName(data.name_data, sorted_links, function(err, swapped_data){
										confirm_args.Objects = swapped_data;
										displayTemplate(res, 'Bookmarked Goals added', 'home.html', confirm_args);
									});
								});
							});
							break;
						case 'add-goal-v1.1':
							receiveCookieData(req, function(err, cookie_obj){
								
								if(err) return error(res, err);
								if(!cookie_obj.hasOwnProperty('token_id')) return error(res, 'missing auth params');
								if(!cookie_obj.hasOwnProperty('public_token')) return error(res, 'missing auth params');
								var args = Object.assign(post_obj, cookie_obj, { resource_id: 'r-mt/add-goal' });
								
								addGoalInteractor(data, config, args, ext, function(err, confirm_args){
									
									if(err) return error(res, err);
								
									confirm_args.cookie_script = '';
									confirm_args.Items = confirm_args.menu_items;
									confirm_args.page_arr = new Array(confirm_args.link_pages).fill({a:1}).map((item, index)=>{ 
										item = {};
										item.active = '';
										if((confirm_args.link_cursor-1)==index){
											item.active = 'active'
										}
										item.index = index+1;
										return item;
									});
							
									var sorted_links = confirm_args.link_arr.sort((a, b)=>{return a.priority-b.priority});
									swapIdForName(data.name_data, sorted_links, function(err, swapped_data){
										confirm_args.Objects = swapped_data;
										displayTemplate(res, 'Goal added', 'home.html', confirm_args);
									});
								});
							});
							break;
						case 'add-sale-v1.1':
							if(!post_obj.hasOwnProperty('amount')) return error(res, 'missing amount');
							if(!post_obj.hasOwnProperty('product')) return error(res, 'missing product');
							receiveCookieData(req, function(err, cookie_obj){
								if(err) return error(res, err);
								if(!cookie_obj.hasOwnProperty('token_id')) return error(res, 'missing auth params');
								if(!cookie_obj.hasOwnProperty('public_token')) return error(res, 'missing auth params');
								var args = Object.assign(post_obj, cookie_obj, { resource_id: 'r-mt/add-sale' });
								addSaleInteractor(data, config, post_obj, ext, function(err, confirm_args){
									if(err) return error(res, err);
									confirm_args.cookie_script = '';
									confirm_args.Items = confirm_args.menu_items;
									confirm_args.page_arr = new Array(confirm_args.link_pages).fill({a:1}).map((item, index)=>{ 
										item = {};
										item.active = '';
										if((confirm_args.link_cursor-1)==index){
											item.active = 'active'
										}
										item.index = index+1;
										return item;
									});
							
									var sorted_links = confirm_args.link_arr.sort((a, b)=>{return a.priority-b.priority});
									swapIdForName(data.name_data, sorted_links, function(err, swapped_data){
										confirm_args.Objects = swapped_data;
										displayTemplate(res, 'Congrats, you are a champion!', 'home.html', confirm_args);
									});
								});
							})
							break;
						case 'inspect-sprint-v1.2':
							//receive post data
							if(post_obj.hasOwnProperty('index')){
								receiveCookieData(req, function(err, cookie_obj){
									if(err) return error(res, err);
									if(!cookie_obj.hasOwnProperty('token_id')) return error(res, 'missing auth params');
									if(!cookie_obj.hasOwnProperty('public_token')) return error(res, 'missing auth params');
									var args = Object.assign(post_obj, cookie_obj, { resource_id: 'r-mt/inspect-sprint' });
									
									args.sprint_id = config.client_cache[args.cred_id].link_arr[args.index].sprint_id;
									args.link_index = args.index;
									if(args.sprint_id == null || typeof args.sprint_id == 'undefined'){
										helpSprintInteractor(data, config, args, ext, function(err, confirm_args){
											confirm_args.Title = swapObjForName(data.name_data, confirm_args.link_obj);
											displayTemplate(res, 'No Sprint', 'help.html', confirm_args);
										})
									} else {
										inspectSprintInteractor(data, config, args, ext, function(err, confirm_args){
											confirm_args.Title = swapObjForName(data.name_data, confirm_args.sprint_obj);
											swapIdForName(data.name_data, confirm_args.result_arr, function(err, swapped_data){
												confirm_args.Objects = swapped_data;
												displayTemplate(res, 'Blog retrieved', 'blog.html', confirm_args);
											}, data.engagement_data);
										})
									}
								});
							} else {
								error(res, 'need sprint_id to access sprint');
							}
							break;
						case 'open-sprint-v1.2':
							console.log('sprint data received: ', JSON.stringify(post_obj));
							if(post_obj.hasOwnProperty('link_index')){
								receiveCookieData(req, function(err, cookie_obj){
									if(err) return error(res, err);
									if(!cookie_obj.hasOwnProperty('token_id')) return error(res, 'missing auth params');
									if(!cookie_obj.hasOwnProperty('public_token')) return error(res, 'missing auth params');
									var args = Object.assign(post_obj, cookie_obj, { resource_id: 'r-mt/open-sprint' });
									openSprintInteractor(data, config, args, ext, function(err, confirm_args){
										confirm_args.Title = swapObjForName(data.name_data, confirm_args.sprint_obj);
										swapIdForName(data.name_data, confirm_args.result_arr, function(err, swapped_data){
											confirm_args.Objects = swapped_data;
											displayTemplate(res, 'Sprint Opened', 'blog.html', confirm_args);
										}, data.engagement_data);
									})
								});
							} else {
								error(res, 'need a link_index to update');
							}
							break;
						case 'add-article-v1.2':
							console.log('post data: ', JSON.stringify(post_obj));
							//create the article, a tag for each#, and update the sprint
							if(post_obj.hasOwnProperty('articleInput') && post_obj.hasOwnProperty('link_index')){
								//adding the article obj and updating the sprint_obj should be atomic
								receiveCookieData(req, function(err, cookie_obj){
									if(err) return error(res, err);
									if(!cookie_obj.hasOwnProperty('token_id')) return error(res, 'missing auth params');
									if(!cookie_obj.hasOwnProperty('public_token')) return error(res, 'missing auth params');
									var args = Object.assign(post_obj, cookie_obj, { resource_id: 'r-mt/add-article' });
									addArticleInteractor(data, config, args, ext, function(err, confirm_args){
										confirm_args.Title = swapObjForName(data.name_data, confirm_args.sprint_obj);
										swapIdForName(data.name_data, confirm_args.result_arr, function(err, swapped_data){
											confirm_args.Objects = swapped_data;
											displayTemplate(res, 'Article Added', 'blog.html', confirm_args);
										}, data.engagement_data);
									})
								});
								/*
								//here is the tag stuff
								var myRegexp = /#(\S+)/g, result;
								var counter = 0;
								while (result = myRegexp.exec(post_obj.text)) {
								   var tag_obj = {
								   	tag_name: result[1],
								   	goal_id: sprint_obj.goal_id,  
								   	sprint_id: post_obj.sprint_id, 
								   	article_id: article_id
								   }
								   data.tag_data.push(tag_obj);
								   counter++;
								}*/
								
							} else {
								error(res, 'need articleInput and link_index to add article');
							}
							break;
						default:
							console.log(post_obj.form_id);
							error(res, 'can\'t find route to match form_id');
					}
				});
			}
			break;
		case 'build':
			var stream = fs.createReadStream('./build/'+path_params[2]);
			stream.pipe(res);
			break;
		case 'user':
			receiveCookieData(req, function(err, cookie_obj){
				if(err) return error(res, err);
				if(!cookie_obj.hasOwnProperty('token_id')) return error(res, 'missing auth params');
				if(!cookie_obj.hasOwnProperty('public_token')) return error(res, 'missing auth params');
				var args = Object.assign(cookie_obj, { resource_id: 'r-mt/user' });
				listUserInteractor(data, config, args, ext, function(err, confirm_args){
					if(err) return error(res, err);
					confirm_args.Items = confirm_args.menu_items;
					confirm_args.page_arr = new Array(confirm_args.user_pages).fill({a:1}).map((item, index)=>{ 
						item = {};
						item.active = '';
						if((confirm_args.user_cursor-1)==index){
							item.active = 'active'
						}
						item.index = index+1;
						return item;
					});
					console.log('confirm_args for getUserInteractor: ', confirm_args);
					var sorted_users = confirm_args.user_arr.sort((a, b)=>{return a.engagements_per_day-b.engagements_per_day});
					swapIdForName(data.name_data, sorted_users, function(err, swapped_data){
						confirm_args.Objects = swapped_data;
						displayTemplate(res, '', 'user.html', confirm_args);
					});
				});
			});
			break;
		default:
			res.write("<html><form action='/home' method='post'>");
			res.write("<input type='hidden' name='sprint_id' value='s0' />");
			res.write("<input type='hidden' name='form_id' value='inspect-sprint-v1.2' />");
			res.write("<input type='submit' value='get sprint' />");
			res.write("</form></html>");
			res.end();
	}
}).listen(process.env.PORT || 3001, function(){
	console.log('simple-motivation-therapy is running on 3001');
});

function swapIdForName(name_data, args_data, cb, engagement_data){
	var swapped_data = args_data.map((obj)=>{
		var swapped_obj = swapObjForName(name_data, obj);
		if(typeof engagement_data != 'undefined' && swapped_obj.hasOwnProperty('engagement_id')){
			swapped_obj = swapEngagementForDate(engagement_data, swapped_obj);
		}
		return swapped_obj;
	});
	return cb(null, swapped_data);
}

function swapObjForName(name_data, single_obj){
	var swapped_obj = {};
	for (prop in single_obj){
		var uni_obj = name_data.find((item)=>{
			return (item.universal_id == single_obj[prop])
		});
		
		if(typeof uni_obj != 'undefined'){
			swapped_obj[prop] = uni_obj.universal_name;
		} else {
			swapped_obj[prop] = single_obj[prop];
		}

	}
	return swapped_obj;
}

function swapEngagementForDate(engagement_data, single_obj){
	if(single_obj.hasOwnProperty('engagement_id')){
		var uni_obj = engagement_data.find((item)=>{
			
			return (item.engagement_id == single_obj.engagement_id)
		});
		if(typeof uni_obj != 'undefined'){
			var swapped_obj = {};
			for(prop in single_obj){
				if(prop == 'engagement_id'){
					var date_obj = new Date(uni_obj.date);
					var date_str = date_obj.toLocaleString('en-us', {year: 'numeric', month: 'long', day: 'numeric' });
					swapped_obj[prop] = date_str;
				} else {
					swapped_obj[prop] = single_obj[prop];
				}	
			}
			return swapped_obj;
		} else {
			return single_obj
		}
	}
}
