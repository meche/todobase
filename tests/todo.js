describe('todoBaseCtrl', function() {
    beforeEach(module('todoBase'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('$scope.addTodo', function() {
        var $scope, controller;

        it('Insert and save task on todo list', function() {
            var $scope = {};
            var controller = $controller('todoBaseCtrl', { $scope: $scope });
            var todo = [{task : "add new task"}];
            $scope.todos = [];
            $scope.addTodo();
            expect($scope.todos).toEqual(todo);
        });
    });
});
