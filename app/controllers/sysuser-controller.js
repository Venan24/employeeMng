function sysuserController($scope,$http,$location,$routeParams,toastr){
    $scope.addUser = function(user){
        $http.post('/api/users', user, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $location.path('/users');
          toastr.success('You have successfully logged in!', 'Welcome');
        });
      }

      $scope.getSysUsers = function(){
        $http.get('/api/users/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $scope.users = response.data;
        });
      }

      $scope.showSysUser = function(){
        var id = $routeParams.id;
        $http.get('/api/users/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $scope.user = response.data;
        });
      }
}