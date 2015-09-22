(function(){
	console.log('Initializing Angular Application');	
	
	angular.module('whatifapp', ['ngRoute','shared','registration','login','profile']);

	angular.module('whatifapp').factory('AuthInterceptor',['AuthService',function(AuthService){
		
		 return {
			// automatically attach Authorization header
			 request: function(config) {
				  var token = AuthService.getToken();
				  console.log('Handling Request!' + token)
				  if(token) {
					  config.headers['X-Access-Token'] = token
				      config.headers['Content-Type'] = "application/json";
				  }
				  console.log(config)

				  return config;
				},
			response: function(res) {
				 var token =res.data.toke;
					  if(token) {
						  AuthService.saveToken(token);
					  }
					  console.log('Handling Response' + token)
					  
					  return res;
					}
		 } 
		
	}]);	

	angular.module('whatifapp').config(['$routeProvider', '$locationProvider','$httpProvider', function ($routeProvider,$locationProvider,$httpProvider) {
		$locationProvider.html5Mode(true);
		$httpProvider.interceptors.push('AuthInterceptor');
		$routeProvider
  	 .when('/',{
  		templateUrl:'/angular-app/home/home.html',
        controller:'AppController',
        controllerAs:'appCtrl'
      })
      .when('/home',{
  		templateUrl:'/angular-app/home/home.html',
        controller:'AppController',
        controllerAs:'appCtrl'
      })
      .when('/register',{
  		templateUrl:'/angular-app/register/register.html',
  		controller:'RegistrationController',
  	  	controllerAs:'regCtrl'
  		})
  	  .when('/login',{
  		templateUrl:'/angular-app/login/login.html',
  		controller:'LoginController',
  	  	controllerAs:'loginCtrl'
  		})
  	  .when('/editprofile',{
  		templateUrl:'/angular-app/profile/editprofile.html',
  		controller:'ProfileController',
  	  	controllerAs:'profCtrl'
  		})
  	 .otherwise({redirectTo:'/'});	
	}]);
	
	
	angular.module('whatifapp').controller('AppController',['AuthService','$rootScope',function(AuthService,$rootScope){
		var self=this;
				
		 self.logout = function() {
			 $rootScope.username=""; 
			AuthService.logout && AuthService.logout()
		 }
		 
		 self.isAuthed = function() {
			 self.currentUser=$rootScope.username;
			 return AuthService.isAuthed ? AuthService.isAuthed() : false
		 }
		
	}]);
	
	
	
})();