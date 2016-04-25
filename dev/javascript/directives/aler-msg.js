angular.module("todoBase").directive("uiAlert", function ($timeout) {
	return {
		templateUrl: "templates/alert-msg.html",
		replace: true,
		restrict: "AE",
	};
});