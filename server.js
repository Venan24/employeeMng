// ======================= \\
//        Packages         \\
// ======================= \\
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.database); // Get configurations
var Employee = require('./app/models/employee'); // Mongoose employee model

app.use(bodyParser.urlencoded({extended:false})); // body-parser => we can get info from POST/URL parameters
app.use(bodyParser.json());
//app.use(express.static(__dirname + '/client')); // client nije zavrsen jos

// ======================= \\
//         Routes          \\
// ======================= \\
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/restic/employees', function(req, res){
  Employee.find(function(err, employees){
    if(err)
      res.send(err);
    res.json(employees);
  })
});

app.get('/restic/employees/:id', function(req, res){
	Employee.findOne({_id:req.params.id}, function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});

app.post('/restic/employees', function(req, res){
	Employee.create( req.body, function(err, employees){
		if(err)
			res.send(err);
		res.json(employees);
	});
});

// ======================= \\
//      Start Server       \\
// ======================= \\
var listener = app.listen(3000, function(){
  console.log("Server je pokrenut na: " + listener.address().port + " portu");
})
