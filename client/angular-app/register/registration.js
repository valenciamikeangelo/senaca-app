(function(){
	angular.module('registration', ['shared']);
	
	angular.module('registration').controller('RegistrationController',['UserService','$rootScope',function(UserService,$rootScope){
		var self=this;
				
		function handleRegisterSuccess(res) {
			var token = res.data ? res.data.token : null;
			if(token) { console.log('JWT:', token); }
			self.message = res.data.message;
			self.error=false;
			self.registerSuccess=true;
			self.message="Registration is Successful!";
			console.log("username: " + res.data.username);
			$rootScope.username=res.data.username;
			$rootScope.email=res.data.email;
		}
		
		function handleError(res) {
			var errorMsg=res.data.error;
			if(errorMsg!=null){
				self.error=true;
				self.errorMsg=errorMsg;
				console.log(errorMsg)
			}
		}
		
		
		self.register= function register(){
			console.log('Creating New Profile for ' + self.username + ' '+self.email + ' '+self.password);
			var profile = {
					username:self.username,
					email:self.email,
					password:self.password
			}
			
			UserService.register(profile).then(handleRegisterSuccess,handleError);
		}
		
	
	}]);
	
	
})();
