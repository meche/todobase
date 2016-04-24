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
        $scope.editForm.$setPristine();
      };

      $scope.removeTodo = function (todo) {
          var index = $scope.todos.indexOf(todo);
          var deleteTask = $scope.todos[index].task;
          $scope.todos.splice(index, 1);
          document.getElementById('alertDelete').innerHTML = '<p> The Task "' + deleteTask + '" was deleted successfully.</p>';
          setTimeout(function(){
              document.getElementById('alertDelete').innerHTML = '';
          }, 4000);
      };
    });
