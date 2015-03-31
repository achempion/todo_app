app = angular.module('tasks', [])

app.controller 'TasksController', ['$scope', '$http', ($scope, $http) ->
  $scope.initialize = (todo_list) ->
    $scope.tasks = todo_list

  $scope.toggleTask = (task, i) ->
    $http.patch "/tasks/#{task.id}", {is_done: !task.is_done}
    #    .success (data) ->
    #      $scope.tasks[i] = data
]