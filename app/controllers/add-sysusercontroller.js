function sysuserController($scope,$http,$location,$routeParams,toastr){
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
      };
}