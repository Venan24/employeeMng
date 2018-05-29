function addController($scope,$http){
    $scope.addEmployee = function(){
        $http.post('/api/employees/', $scope.employee, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          //$scope.employee = response.data;
          window.location.href = '/';
        });
      }
      $scope.getDepartments = function(){
        $http.get('/api/departments/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $scope.departments = response.data;
        });
      }
}