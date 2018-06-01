function departmentsController($scope,$http,$location,$route,$routeParams){

	$scope.getDepartments = function(){
		$http.get('/api/departments/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$scope.departments = response.data;
		});
	}

	$scope.addDepartment = function(){
        $http.post('/api/departments/', $scope.department, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $location.path('/departments');
        });
			}
			
	$scope.deleteDepartemnt = function(id){
		var id = id;
		$http.delete('/api/departments/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$route.reload();
		});
	}

	$scope.showSelectedDepartment = function(){
		var id = $routeParams.id;
		$http.get('/api/departments/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$scope.department = response.data;
		});
	}

	$scope.updateDepartment = function(){
		var id = $routeParams.id;
		$http.put('/api/departments/'+ id , $scope.department, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$route.reload();
		});
	}
}