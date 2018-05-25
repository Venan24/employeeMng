var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/employeeMng');

var Employee = mongoose.model('Employee', mongoose.Schema({
  name:String,
	dept:String,
	area:String,
	status:String,
	contact:String,
	salary:String
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//app.use(express.static(__dirname + '/client'));

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

var listener = app.listen(3000, function(){
  console.log("Server je pokrenut na: " + listener.address().port + " portu");
})
