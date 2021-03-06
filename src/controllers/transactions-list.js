/////
//    Transactions Controller
/////

function TransactionsListController($scope, $http, $filter, transactionsService) {

  function sort() {
    $scope.data.transactions = _.sortBy($scope.data.transactions, function(transaction) {
      return -transaction.date;
    });
  }

  // Initialize data
  if(!$scope.data) $scope.data = transactionsService.data();
  sort();

  $scope.get = function(id) {
    return _.find($scope.data.transactions, function(transaction) {
      return transaction._id === id;
    });
  }

  $scope.delete = function() {
    $scope.data = {};
    transactionsService.delete();
  }

  $scope.getDates = function(start, end) {
    var startDate       = moment(start)
      , endDate         = moment(end);

    if(startDate.isValid() && endDate.isValid()) {
      /*$scope.data.transactions = transactionsService.getDates(start, end);*/
      $scope.data.transactions = _.filter($scope.data.transactions, function(transaction) {
        var date = moment(Number(transaction.date));

        return date > startDate && date < endDate;
      });
    }
  }

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

  $scope.reset = function() {
    $scope.data = transactionsService.data();
  }

  $scope.prettyDate = function(date) {
    var date = moment(Number(date));

    return date.format('MMM. Do, YYYY');
  }

  $scope.toDollar = function(num) {
    var dollars = (Number(num) / 100).toFixed(2);

    return '$' + dollars;
  }

  $scope.$on('transactions-added', function(broadcast, transaction) {
    $scope.data.transactions = [transaction].concat($scope.data.transactions);
    sort();
  });

};