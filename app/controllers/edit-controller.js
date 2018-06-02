function editController($scope,$routeParams,$http,$location,toastr){

	$scope.getDepartments = function(){
		$http.get('/api/departments/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$scope.departments = response.data;
		});
	};
	$scope.updateEmployee = function(){
		var id = $routeParams.id;
		$http.put('/api/employees/'+ id , $scope.employee, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$location.path('/');
        	toastr.success('You have successfully updated user in!', 'Updated');
		});
	};
	$scope.showEmployee = function(){
		var id = $routeParams.id;
		$http.get('/api/employees/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$scope.employee = response.data;
		});
	};

	$scope.getPositions = function(){
        $http.get('/api/positions/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $scope.positions = response.data;
        });
      }
}