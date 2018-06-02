function sysuserController($scope,$http){
    $scope.addUser = function(user){
        $http.post('/api/users', user, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          //$scope.employee = response.data;
          window.location.href = '/';
        });
      }
      $scope.getDepartments = function(){
        $http.get('/api/departments/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $scope.departments = response.data;
        });
      }

      $scope.getPositions = function(){
        $http.get('/api/positions/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $scope.positions = response.data;
        });
      }
}