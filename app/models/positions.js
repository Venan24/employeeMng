//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var PositionsModelSchema = new Schema({
    name: String
});

//Export function to create "Positions" model class
module.exports = mongoose.model('Positions', PositionsModelSchema );