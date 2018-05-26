// ======================= \\
//        Packages         \\
// ======================= \\
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const config = require('./config'); // Get configurations
const bcrypt = require('bcrypt');

mongoose.connect(config.database); // Connect to db

var Employee = require('./app/models/employee'); // Mongoose employees model
var User = require('./app/models/user'); // Mongoose users model

app.use(bodyParser.urlencoded({extended:false})); // body-parser => we can get info from POST/URL parameters
app.use(bodyParser.json());
//app.use(express.static(__dirname + '/client')); // client nije zavrsen jos

// ======================= \\
//         Routes          \\
// ======================= \\
app.get('/', function (req, res) {
  res.send('Hello World!');
});

//Get all employees
app.get('/restic/employees', function(req, res){
  Employee.find(function(err, employees){
    if(err)
      res.send(err);
    res.json(employees);
  })
});

//Get employee by id
app.get('/restic/employees/:id', function(req, res){
	Employee.findOne({_id:req.params.id}, function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});

//Create new employee
app.post('/restic/employees', function(req, res){
	Employee.create( req.body, function(err, employees){
		if(err)
			res.send(err);
		res.json(employees);
	});
});

//Create new user
app.post('/restic/users', function(req, res){
	var username = req.body.username;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var admin = false;
	
	bcrypt.hash(req.body.password, 10, function(err, hash) {
		var user = new User({username: username, password: hash, firstname: firstname, lastname: lastname, admin: admin});
		User.create(user, function(err, users){
			if(err)
				res.send(err);
			res.json(users);
		});
	});
});

//Authentificate login user
app.post('/restic/login', function(req, res){
	var username = req.body.username;
	var enteredPassword = req.body.password;

	User.findOne({username:username}, function(err, users){
		if(err)
			res.send("No user found");
		bcrypt.compare(enteredPassword, users.password, function(err, resp) {
			if(resp===true){
				console.log("PASSWORD MATCH!!!");
				res.send("PASSWORD MATCH")
			}else{
				console.log("WRONG PASSWORD!!!");
				res.send("WRONG PW")
			}
		});
	});
	
});

//Get all users Just4TEsting
app.get('/restic/users', function(req, res){
  User.find(function(err, users){
    if(err)
      res.send(err);
    res.json(users);
  })
});

// ======================= \\
//      Start Server       \\
// ======================= \\
var listener = app.listen(3000, function(){
  console.log("Server je pokrenut na: " + listener.address().port + " portu");
})
