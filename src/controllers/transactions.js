/////
//    Transactions Controller
/////

function TransactionsController($scope, transactionsService) {
  $scope.setStartDate = function(start) {
    transactionsService.setStartDate(start);
  }

  $scope.setEndDate = function(end) {
    transactionsService.setEndDate(end);
  }

  $scope.getStartDate = function() {
    return transactionsService.getStartDate();
  }

  $scope.getEndDate = function() {
    return transactionsService.getEndDate();
  }

  $scope.setStart = function() {
    var start = moment($('input[name="start"]').val());

    if(start.isValid()) $scope.setStartDate(start.valueOf());
  }

  $scope.setStart = function() {
    var end = moment($('input[name="end"]').val());

    if(end.isValid()) $scope.setEndDate(end.valueOf());
  }
}