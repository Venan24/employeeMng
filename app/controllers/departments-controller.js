function departmentsController($scope,$http){

	$scope.getDepartments = function(){
		$http.get('/api/departments/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$scope.departments = response.data;
		});
	}

	//Add department
}