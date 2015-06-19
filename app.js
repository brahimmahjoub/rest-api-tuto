var express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var custom = require('./custom');

var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){

    res.setHeader('Content-Type', 'text/html');
    res.render('index');

});

app.use(bodyParser());

var sequelize = new Sequelize('tuto_rest', 'root', 'pacte2013', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  autoIncrement: true
});

var User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },

}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

var Person = function (firstName, lastName, email, password){
	this.firstName = firstName;
	this.lastName = lastName;
	this.lastName = lastName;
	this.password = password;
}

app.post('/list', function(req, res) {
	var p1  = new Person(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
	custom.save(p1, User);
	var users = custom.getAll(User);
	res.setHeader('Content-Type', 'text/html');
    //res.sendfile('list.html', users);
    res.render('list', {users:users});
});

app.listen(8080, function () {

  console.log('Server Started...');

});
