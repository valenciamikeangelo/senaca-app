(function(){
	angular.module('shared', []);
	
	angular.module('shared').factory('UserService',['$http',function($http){
		
		var doRegister=function register(profile){
			return $http({
				method : 'POST',
				url : '/user/register',
				data:{
					username:profile.username,
					email:profile.email,
					password:profile.password
				}
			});
		}
		
		
		var doLogin=function login(username,password){
			return $http({
				method:'POST',
				url:'/auth/login',
				data:{
					username:username,
					password:password
				}
			}); 
		}
		
		return{
			register:function(profile){
				return doRegister(profile);
			},
			login:function(username,password){
				return doLogin(username,password);
			}
		};
		
	}]);
	
angular.module('shared').factory('AuthService',['$window',function($window){
		
		var doParseJwt=function doParseJwt(token){
			 var base64Url = token.split('.')[1];
			  var base64 = base64Url.replace('-', '+').replace('_', '/');
			  return JSON.parse($window.atob(base64));
		}
		
		var doSaveToken = function doSaveToken(token) {
			   $window.localStorage['jwtToken'] = token;
			}
		
		var doGetToken = function doGetToken() {
			 var token=$window.localStorage['jwtToken'];
			 return token;
			}
		
		var doCheckAuthed = function doCheckAuthed() {
			  var token = doGetToken();
			  if(token) {
			    var params = doParseJwt(token);
			    return Math.round(new Date().getTime() / 1000) <= params.exp;
			  } else {
			    return false;
			  }
			}
		
		var doLogout = function() {
			  $window.localStorage.removeItem('jwtToken');
			}
		
	 return{
			parseJwt:function(token){
				return doParseJwt(token);
			},
			saveToken:function(token){
				return doSaveToken(token);
			},
			getToken:function(){
				return doGetToken();
			},
			isAuthed:function(){
				return doCheckAuthed();
			},
			logout:function(){
				return doLogout();
			}
		};
		
	}]);
	
	
	
})();
