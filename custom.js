var save = function(command, User){
	User.sync({force: false}).then(function () {
	  // Table created
	  return User.create({
	  	firstName: command.firstName,
	  	lastName: command.lastName,
	  	email: command.email,
	  	password: command.password
	  });
	});
}

var getAll = function(User){
	var users = User.findAll({raw: true});

	return users;
}

exports.save = save;
exports.getAll = getAll;