myApp.controller('editController', function($scope,$route,$routeParams,$http){
	$scope.getDepartments = function(){
		$http.get('/api/departments/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$scope.departments = response.data;
		});
	};
	$scope.showEmployee = function(){
		var id = $routeParams.id;
		$http.get('/api/employees/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$scope.employee = response.data;
		});
	};
	$scope.updateEmployee = function(){
		var id = $routeParams.id;
		$http.put('/api/employees/'+ id , $scope.employee, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			//$scope.employee = response.data;
			window.location.href = '/';
		});
	};
});