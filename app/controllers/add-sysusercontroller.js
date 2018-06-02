function sysuserController($scope,$http,$location,toastr){
    $scope.addUser = function(user){
        $http.post('/api/users', user, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $location.path('/');
          toastr.success('You have successfully logged in!', 'Welcome');
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