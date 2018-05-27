myApp.controller('empController', function($scope,$route,$routeParams,$http){
	$scope.check_login = function(){
        if(localStorage.getItem('user')){
            return true;
        }
        return false;
	};
    $scope.login = function(credentials){
        $http.post('/api/authenticate', credentials).then(function(response){
			localStorage.setItem('user',response.data.token);
        }),function(error){
            console.log(error);
        }
    };
    $scope.logout = function(){
        localStorage.clear();
    };
	$scope.getEmployees = function(){
		$http.get('/api/employees/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$scope.employees = response.data;
		});
	};
	$scope.showEmployee = function(){
		var id = $routeParams.id;
		$http.get('/api/employees/'+ id).then(function(response){
			$scope.employee = response.data;
		});
	};
	$scope.addEmployee = function(){
		$http.post('/api/employees/', $scope.employee).then(function(response){
			//$scope.employee = response.data;
			window.location.href = '/';
		});
	};
	$scope.updateEmployee = function(){
		var id = $routeParams.id;
		$http.put('/api/employees/'+ id , $scope.employee).then(function(response){
			//$scope.employee = response.data;
			window.location.href = '/';
		});
	};
	$scope.deleteEmployee = function(id){
		var id = id;
		$http.delete('/api/employees/'+ id).then(function(response){
			$route.reload();
		});
	};
});