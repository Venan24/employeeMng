//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var EmployeeModelSchema = new Schema({
    name:String,
	dept:String,
	area:String,
	status:String,
	contact:String,
	salary:String,
});

//Export function to create "Employee" model class
module.exports = mongoose.model('Employee', EmployeeModelSchema );