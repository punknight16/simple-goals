function addSaleObj(sale_data, sale_id, cred_id, amount, product, engagement_id, addObj){
	var sale_obj = {
		sale_id: sale_id,
		cred_id: cred_id,
		amount: amount,
		product: product,
		engagement_id: engagement_id
	};
	addObj(sale_data, sale_obj);
	return false
}

module.exports = addSaleObj;