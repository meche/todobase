angular.module("todoBase",["ngMessages"]);
"use strict";console.log("um teste");
angular.module("todoBase").controller("todoBaseCtrl",function($scope){$scope.app="todoBase",$scope.description="a todo list made with angularjs",$scope.todos=[{task:"Elaborar uma todo list"},{task:"Testar a todo list"}],$scope.addTodo=function(todo){$scope.todos.push(todo),delete $scope.todo},$scope.editTodo=function(todo){$scope.current=todo},$scope.current={},$scope.saveEdit=function(todo){$scope.current={},$scope.editForm.$setPristine()},$scope.removeTodo=function(todo){var index=$scope.todos.indexOf(todo);$scope.todos[index].task,document.getElementById("alertDelete");$scope.todos.splice(index,1),$scope.deleted="The task was deleted successfully",document.getElementById("alertDelete").style.display="block",setTimeout(function(){document.getElementById("alertDelete").style.display="none"},3e3)}});
angular.module("todoBase").directive("uiAlert",function($timeout){return{templateUrl:"templates/alert-msg.html",replace:!0,restrict:"AE"}});