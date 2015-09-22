(function(){
	angular.module('login', ['shared']);
	
	angular.module('login').controller('LoginController',['UserService','AuthService','$location','$rootScope',function(UserService,AuthService,$location,$rootScope){
		var self=this;
				
		function handleLoginSuccess(res) {
			var token = res.data ? res.data.token : null;
			AuthService.saveToken(token);
			console.log('Login Response from Controller ' + token)
			self.error=false;
			$rootScope.username=res.data.username;
			$rootScope.email=res.data.email;
			$location.path('/');
		}
		
		function handleError(res) {
			var errorMsg=res.data.error;
			if(errorMsg!=null){
				self.error=true;
				self.errorMsg=errorMsg;
				console.log(errorMsg)
			}
		}
		
		
		self.login= function login(){
			UserService.login(self.username,self.password).then(handleLoginSuccess,handleError);
		}
		
	}]);
	
	
})();
