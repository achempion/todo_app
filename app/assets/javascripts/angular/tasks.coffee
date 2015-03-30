app = angular.module('tasks', [])

app.controller 'TasksController', ['$scope', ($scope) ->
  $scope.initialize = (todo_list) ->
    $scope.tasks = todo_list
]