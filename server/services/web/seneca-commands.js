module.exports=function(seneca){

	var jwt = require('jsonwebtoken');
	var mongoose = require('mongoose');
	
	var User = mongoose.model('User');
	
	seneca.add('cmd:register',function(args,result){
	console.log('Receiving user registration request!');
	var params=args.req$.body;
	
	var user = new User();
    user.username = params.username
    user.email=params.email
    user.setPassword(params.password)
    user.save(function (err){
	    if(err)	return result(new Error('Invalid Username ,Email or Password!'),null)
	    		    	
	    });
    seneca.act({role:'profile', cmd:'create',username:user.username,email:user.email},function(err,response){
		 if(err) return result(new Error('Error in creating profile!'));
		 	var jwtToken=user.generateJWT()
			console.log('jwtToken: ' + jwtToken)
			result(null,{token:jwtToken,username:user.username,email:user.email})
	 	})
})

seneca.add('cmd:profile_update',function(args,result){
	var params=args.req$.body;
	
	var profile_param ={
			username : params.username,
			email:params.email,
			password:params.password,
			firstname:params.firstname,
			lastname:params.lastname	
	};
	
    seneca.act({role:'profile', cmd:'update'},profile_param,function(err,response){
		 if(err) return result(new Error('Error in updating profile!'));
		 	
			result(null,{result:'OK'})
	 	})
})


}