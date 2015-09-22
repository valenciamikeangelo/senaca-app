(function(){
	angular.module('profile', []);
	
angular.module('profile').factory('ProfileService',['$http',function($http){
		
		var doUpdate=function update(profile){
			return $http({
				method : 'POST',
				url : '/api/profile/update',
				data:{
					username:profile.username,
					email:profile.email,
					password:profile.password,
					firstname:profile.firstname,
					lastname:profile.lastname
				}
			});
		}
			
		return{
			update:function(profile){
				return doUpdate(profile);
			}			
		};
		
	}]);
	
	angular.module('profile').controller('ProfileController',['ProfileService','$rootScope',function(ProfileService,$rootScope){
		var self=this;
				
		function handleSuccess(res) {
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
		
		
		self.updateProfile= function updateProfile(){
			var profile = {
					username:self.username,
					email:self.email,
					password:self.password,
					firstname:self.firstname,
					lastname:self.lastname
			}
			
			ProfileService.update(profile).then(handleSuccess,handleError);
		}
		
	
	}]);
	
	
})();
