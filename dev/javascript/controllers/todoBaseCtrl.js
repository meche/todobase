angular.module("todoBase").controller("todoBaseCtrl", function ($scope) {
      $scope.app = "todoBase";

      $scope.description = "a todo list made with angularjs";

      $scope.todos = [
        {task: "Elaborar uma todo list"},
        {task: "Testar a todo list"}
      ];

      $scope.addTodo = function (todo) {
        $scope.todos.push(todo);
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
          var alert = document.getElementById('alertDelete');
          $scope.todos.splice(index, 1);
          $scope.deleted = 'The task was deleted successfully';
          document.getElementById('alertDelete').style.display = 'block';
          setTimeout(function(){
            document.getElementById('alertDelete').style.display = 'none';
          }, 3000);
      };
    });
