angular.module("todoBase").controller("todoBaseCtrl", function ($scope) {
      $scope.app = "todoBase";

      $scope.description = "a todo list made with angularjs";

      $scope.todos = [
        {task: "Elaborar uma todo list"},
        {task: "Testar a todo list"}
      ];

      $scope.addTodo = function (todo) {
        $scope.todos.push(angular.copy(todo));
        delete $scope.todo;
      };

      $scope.editTodo = function (todo) {
        $scope.current = todo;
      };

      $scope.current = {};

      $scope.saveEdit = function (todo) {
        $scope.current = {};
      };

      $scope.removeTodo = function (todo) {
          var index = $scope.todos.indexOf(todo);
          alert("Deleting index: " + index);
          $scope.todos.splice(index, 1);
      };
    });
