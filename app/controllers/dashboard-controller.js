function DashboardController($scope, $route, $routeParams, $http){
  $scope.getEmployees = function(){
    $http.get('/api/employees/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
      $scope.employees = response.data;
    });
  }
  $scope.deleteEmployee = function(id){
    var id = id;
    $http.delete('/api/employees/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
      $route.reload();
    });
  }
}