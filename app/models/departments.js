//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var DepartmentsModelSchema = new Schema({
    name: String
});

//Export function to create "User" model class
module.exports = mongoose.model('Departments', DepartmentsModelSchema );