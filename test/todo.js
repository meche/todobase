'use strict'

describe( 'todoBaseCtrl', function() {
    beforeEach( module( 'todoBase' ) );

    describe( 'addTodo', function() {
        it('the $scope.addTodo is a function', inject( function( $controller ) {
            var scope = {};
            var todoBaseCtrl = $controller('todoBaseCtrl', {
                $scope: scope
            });
            scope.addTodo({task: 'any task'});
            if (scope.todos.length == 3) {
                console.log( 'ok test' );
            } else {
                console.log( 'error' )
            }
        } ) );
    } );

} );
