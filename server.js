// ======================= \\
//        Packages         \\
// ======================= \\
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // Get configurations

var Employee = require('./app/models/employee'); // Mongoose employees model
var User = require('./app/models/user'); // Mongoose users model
var Departments = require('./app/models/departments'); // Departments model

mongoose.connect(config.database); // Connect to db
app.set('superSecret', config.secret); // secret variable

app.use(bodyParser.urlencoded({extended:false})); // body-parser => we can get info from POST/URL parameters
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app')); // client side

// ======================= \\
//         Routes          \\
// ======================= \\
app.get('/', function (req, res) {
  res.send("Hello! The API is at /api");
});

// ========================================================= \\
//       Get an instance of the router for api routes        \\
// ========================================================= \\
var apiRoutes = express.Router();

//Authentication - No Middleware needed
apiRoutes.post('/authenticate', function(req, res){
	var username = req.body.username;
	var enteredPassword = req.body.password;

	User.findOne({username:username}, function(err, users){
		if(err){
			res.send("Request error");
		}
		if(users){
		bcrypt.compare(enteredPassword, users.password, function(err, resp) {
			if(resp===true){
				const payload = {
					//_id: users.id,
					username: users.username,
					firstname: users.firstname,
					lastname: users.lastname,
					admin: users.admin
				};
				var token = jwt.sign(payload, app.get('superSecret'), {
					expiresIn : 60*60*24 //24 hours valid token
				});
				res.setHeader("x-access-token", token);
				res.send({
								success: true,
          			message: 'Successfully Logged in!',
          			token: token
				});
			}else{
				res.send({
					success: false,
					message: "Wrong password"
				})
			}
		});
		}else{
			res.send({
				user: false
			})
		}
	});
});

// ========================================================== \\
//      Route middleware to authenticate and check token      \\
// ========================================================== \\
apiRoutes.use(function(req, res, next){

	//Check header/URL/POST parameters for token
	var token = req.body.token || req.params.token || req.headers['x-access-token'];

	//Decode token
	if(token){
		// Verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded){			
			if(err){
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			}else{
				// If everything is good, save to request for use in other routes
				req.decoded = decoded;
				//console.log(decoded);	
				next();
			}
		});
	}else{
		// If there is no token
		// Return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
	}
});


// ========================== \\
//    Authenticated routes    \\
// ========================== \\
apiRoutes.get('/', function(req, res){
	res.json({ message: 'Welcome!', /*firstname:req.decoded.firstname*/ });
});

//Get all employees
apiRoutes.get('/employees', function(req, res){
  Employee.find(function(err, employees){
    if(err)
      res.send(err);
    res.json(employees);
  })
});

//Get employee by id
apiRoutes.get('/employees/:id', function(req, res){
	Employee.findOne({_id:req.params.id}, function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});

//Create new employee
apiRoutes.post('/employees', function(req, res){
	Employee.create( req.body, function(err, employees){
		if(err)
			res.send(err);
		res.json(employees);
	});
});

//Remove selected employee
apiRoutes.delete('/employees/:id', function(req, res){
	Employee.findOneAndRemove({_id:req.params.id}, function(err, employees){
		if(err)
			res.send(err);
		res.json(employees);
	});
});

//Update selected employee
apiRoutes.put('/employees/:id', function(req, res){
	var query = {
		name:req.body.name,
		dept:req.body.dept,
		area:req.body.area,
		status:req.body.status,
		contact:req.body.contact,
		salary:req.body.salary
	};

	Employee.findOneAndUpdate({_id:req.params.id}, query, function(err, employees){
		if(err)
			res.send(err);
		res.json(employees);
	});
});

//Get all departments
apiRoutes.get('/departments', function(req, res){
	Departments.find(function(err, departmens){
	  if(err)
		res.send(err);
	  res.json(departmens);
	})
});

//Create new department
apiRoutes.post('/departments', function(req, res){
	Departments.create( req.body, function(err, departments){
		if(err)
			res.send(err);
		res.json(departments);
	});
});

//Remove selected departemt
apiRoutes.delete('/departments/:id', function(req, res){
	Departments.findOneAndRemove({_id:req.params.id}, function(err, departments){
		if(err)
			res.send(err);
		res.json(departments);
	});
});

//Create new user
apiRoutes.post('/users', function(req, res){
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

//Get all users Just4TEsting
apiRoutes.get('/users', function(req, res){
  User.find(function(err, users){
    if(err)
      res.send(err);
    res.json(users);
  })
});

app.use('/api', apiRoutes);

// ======================= \\
//      Start Server       \\
// ======================= \\
var listener = app.listen(3000, function(){
  console.log("Started at http:localhost:" + listener.address().port + " port");
});