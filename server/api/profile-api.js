module.exports = function(options) {
	var seneca = this
	var plugin = 'profile'
	var mongoose = require('mongoose');	
		
	var Profile = mongoose.model('Profile');	
		
	seneca.add({
		role : plugin,
		cmd : 'create'
	}, cmd_create)

	seneca.add({
		role : plugin,
		cmd : 'update'
	}, cmd_update)

	function cmd_create(param, result) {
		console.log('Creating new Profile for User :' + param.email)
		var profile = new Profile()

		profile.username = param.username;
		profile.email = param.email;
		profile.save(function (err){
			    if(err)	return result(new Error('Error Creating Profile!'),null)
			    		    	
			    });
		
		result(null, {result:'Created'});
	}

	function cmd_update(param, result) {
		console.log('Update  Profile for User :' + param)
		
		Profile.find({email:param.email},function(err,found){
			if(err || found.length<=0) return result(new Error('Error updating profile'),null);
			console.log('Updating profile : ' +found)
			var profile=found[0];
			profile.lastname=param.lastname;
			profile.firstname=param.firstname;
			profile.save(function (err){
			    if(err)	return result(new Error('Error Updating Profile!'),null)
			    		    	
			    });
		
			result(null,{result:'OK'})
		});
		
		
	}

	return {
		name : plugin
	};
	
	
	
}