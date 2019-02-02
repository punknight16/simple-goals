function getMenuObj(menu_data, menu_id, getObj){
	var menu_obj = getObj(menu_data, {menu_id: menu_id});
	return menu_obj;
}

module.exports = getMenuObj;