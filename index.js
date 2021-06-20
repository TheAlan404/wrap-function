function wrap(value, cb){
	if(typeof value !== "function") {
		throw new Error("Only functions are wrappable for now");
	};
	if(typeof cb !== "function") cb = function(){
		console.log(value.name+" function called with arguments: ", ...arguments);
	};
	
	_value = value;
	value = function(){
		_value(...arguments);
		cb(...arguments);
	};
	
	return wrap;
};

module.exports = wrap;
