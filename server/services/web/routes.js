module.exports=function(seneca){
	
	var passport = require('passport');
	var jwt = require('jsonwebtoken');
	
	function handleApiRoutes(req,res,next){
		console.log('Handling API Call');
		if('/api/profile/update'==req.url){
			req.seneca.act('cmd:profile_update',function(err,out){
				if(err){
					console.log('Error Message is :'+err.details.message$)
					return res.status(400).json({error:err.details.message$})
				} 
				res.json(out);
			})
		}
	}

	seneca.act('role:web',{
		use:function(req,res,next){
			if(req.url.search('/api/')>=0){
				var token = req.body.token || req.query.token || req.headers['x-access-token'];
				console.log(token);
				 // decode token
				  if (token) {

				    // verifies secret and checks exp
				    jwt.verify(token,'SECRET', function(err, decoded) {      
				      if (err) {
				    	  console.log('errror');  
				        return res.json({ success: false, message: 'Failed to authenticate token.' });    
				      } else {
				        // if everything is good, save to request for use in other routes
				    	  console.log('success');
				        req.decoded = decoded;    
				        handleApiRoutes(req,res,next);
				      }
				    });

				  } else {

				    // if there is no token
				    // return an error
					  console.log('403');
					  console.log(req);
				    return res.status(403).send({ 
				        success: false, 
				        message: 'No token provided.' 
				    });
				  }
				
			}else{
				if('/user/register'==req.url){
					req.seneca.act('cmd:register',function(err,out){
						if(err){
							console.log('Error Message is :'+err.details.message$)
							return res.status(400).json({error:err.details.message$})
						} 
						res.json(out);
					})
				}else if('/auth/login'==req.url){
					 passport.authenticate('local', function(err, user, info){
					 if(err){ return next(err); }
						    if(user){
						      return res.json({token: user.generateJWT(),username:user.username,email:user.email});
						    } else {
						      return res.status(401).json(info);
						    }
						  })(req, res, next);
				}
				else return next();
			}
		}
	})
	
}
