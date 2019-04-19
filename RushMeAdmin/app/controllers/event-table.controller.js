// File: event-table.controller.js	
// Description: event-table controller that will handle all logic for the event-table.html page	

 angular
 .module('RushMeAdminControllers')
 .controller('EventTableCtrl', 
 ['$scope', '$http', function ($scope, $http) {  	
  $scope.events = [];
  $scope.editing = false;
  $scope.selected = -1;
  $scope.fratNames = [{label: "Phi Iota Alpha", namekey: "PIA"}, 
                      {label: "Chi Phi", namekey: "CHP"}];
  
  $http.get("/in/events/").then(
    function(res){
      res.data.map(function(event){
        event.starts = new Date(event.starts);
        event.ends = new Date(event.ends);
      });
      $scope.events = res.data;
    },
    function(err){
      //Do something with the error here
      console.log("ERR: " + err);
    });
  
  $scope.editEvent = function(index){
    $scope.selected = index;
    $scope.editing = true;
  }
  
  $scope.saveEditEvent = function(){
    $http.post('/in/events/' + $scope.events[$scope.selected].EventID, $scope.events[$scope.selected]);
  }
}]);