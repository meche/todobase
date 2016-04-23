angular.module("todoBase").controller("todoBaseCtrl", function ($scope) {
      $scope.app = "todoBase";
      $scope.description = "a todo list made with angularjs";
      $scope.todos = [
        {id: 1, task: "Elaborar uma todo list"},
        {id: 2, task: "Testar a todo list"}
      ];
      $scope.addTodo = function (todo) {
        $scope.todos.push(angular.copy(todo));
        delete $scope.todo;
      };
      $scope.removeTodos = function (todos) {
        $scope.todos = todos.filter (function (todo) {
          console.log(todo);
          if (!todo.selected) return todo;
        });
      };
      $scope.isTodoSelected = function (todos) {
        return todos.some(function (todo) {
          return todo.selected;
        });
      };
    });
