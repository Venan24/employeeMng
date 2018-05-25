// instance
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// mongoose model, pass it using module.exports
module.exports = mongoose.model('Employee', new Schema({ 
    name:String,
	dept:String,
	area:String,
	status:String,
	contact:String,
	salary:String
}));