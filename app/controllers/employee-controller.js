function employeeController($scope, $route, $routeParams, $http, $location, toastr){
  $scope.getEmployees = function(){
    $http.get('/api/employees/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
      $scope.employees = response.data;
    });
  }

  $scope.deleteEmployee = function(id){
    if(localStorage.getItem('admin') == 'true'){
    var id = id;
    $http.delete('/api/employees/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
      $route.reload();
      toastr.success('You have successfully removed selected employee!', 'Removed');
    })}else{
      toastr.error('You do not have permission to delete!', 'PERMISSION');
    }
  }

	$scope.getDepartments = function(){
		$http.get('/api/departments/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$scope.departments = response.data;
		});
  }
  
	$scope.updateEmployee = function(){
		var id = $routeParams.id;
		$http.put('/api/employees/'+ id , $scope.employee, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$location.path('/');
      toastr.success('You have successfully updated employee!', 'Updated');
		});
  }
  
	$scope.showEmployee = function(){
		var id = $routeParams.id;
		$http.get('/api/employees/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$scope.employee = response.data;
		});
	}

	$scope.getPositions = function(){
        $http.get('/api/positions/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $scope.positions = response.data;
        });
  }

  $scope.addEmployee = function(){
    $http.post('/api/employees/', $scope.employee, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
      $location.path('/dashboard');
      toastr.success('You have successfully added a new employee!', 'Success');
    });
  }
}