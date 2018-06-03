function departmentsController($scope,$http,$location,$route,$routeParams, toastr){

	$scope.getDepartments = function(){
		$http.get('/api/departments/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$scope.departments = response.data;
		});
	}

	$scope.addDepartment = function(){
        $http.post('/api/departments/', $scope.department, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
		  $location.path('/departments');
		  toastr.success('You have successfully added a new department!', 'Success');
        });
			}
			
	$scope.deleteDepartemnt = function(id){
		if(localStorage.getItem('admin') == 'true'){
		var id = id;
		$http.delete('/api/departments/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$route.reload();
			toastr.success('You have successfully removed selected department!', 'Success');
		})}else{
			toastr.error('You do not have permission to delete!', 'PERMISSION');
		}
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