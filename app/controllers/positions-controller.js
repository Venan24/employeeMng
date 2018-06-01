function positionsController($scope,$http,$location,$route,$routeParams){

	$scope.getPositions = function(){
		$http.get('/api/positions/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$scope.positions = response.data;
		});
	}

	$scope.addPosition = function(){
        $http.post('/api/positions/', $scope.position, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $location.path('/positions');
        });
	}

	$scope.deletePosition = function(id){
		var id = id;
		$http.delete('/api/positions/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$route.reload();
			toastr.success('You have successfully removed selected position!', 'Success');
		});
	}
}