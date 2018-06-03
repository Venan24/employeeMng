function sysuserController($scope,$http,$location,$routeParams,$route,toastr){
    $scope.addUser = function(user){
        $http.post('/api/users', user, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $location.path('/users');
          toastr.success('You have successfully added new user!', 'Success');
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

      $scope.deleteUser = function(id){
        if(localStorage.getItem('admin') == 'true'){
        var id = id;
        $http.delete('/api/users/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $route.reload();
          toastr.success('You have successfully removed selected user!', 'Success');
        })}else{
          toastr.error('You do not have permission to delete!', 'PERMISSION');
        }
      }

      $scope.updateUser = function(){
        var id = $routeParams.id;
        $http.put('/api/users/'+ id , $scope.user, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $location.path('/users');
              toastr.success('You have successfully updated user in!', 'Updated');
        });
      };
}