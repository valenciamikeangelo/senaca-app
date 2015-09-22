var mongoose = require('mongoose');
var ProfileSchema=new mongoose.Schema({
	
	username : {
		type : String,
		unique : true
	},
	email : {
		type : String,
		lowercase : true,
		unique : true
	},firstname : {
		type : String
	},lastname : {
		type : String
	}	
	
})

mongoose.model('Profile', ProfileSchema);