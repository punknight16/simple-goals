var map = new Array(2).fill({a:1}).map((item, index)=>{ 
	item = {};
	item.active = '';
	if(Math.floor(0/10)==index){
		item.active = 'active'
	}
	item.index = index
	return item;
});

console.log(map);