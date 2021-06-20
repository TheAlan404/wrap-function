const { EventEmitter } = require("events");

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

wrap.events = (emitter, cb) => {
	if(!(emitter instanceof EventEmitter)) {
		throw new Error("emitter must be an EventEmitter");
	};
	if(typeof cb !== "function") cb = (name, ...data) => {
		console.log(`emitted event '${name}' ${data.length ? "with data"}`, ...data);
	};
	
	emitter._emit = emitter.emit;
	emitter.emit = (name, data) => {
		cb(name, ...data);
		emitter._emit(name, ...data);
	};
	
	return wrap;
};

module.exports = wrap;
