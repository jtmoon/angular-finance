/////
//    Transactions Type Controller
/////

function TransactionsTypeListController($scope, transactionsService) {
  var types = {};
  
  $scope.types = [];
  $scope.predicate = '-count';

  // Initialize data
  if(!$scope.data) $scope.data = transactionsService.data();

  function calcTypes() {
    types = {};
    $scope.types = [];

    _.each($scope.data.transactions, function(transaction) {
      if(types[transaction.type]) {
        types[transaction.type] += 1;
      } else {
        types[transaction.type] = 1;
      }
    });

    for(var key in types) {
      $scope.types.push({ title: key, count: types[key] });
    }
  }

  calcTypes();

  $scope.$on('transactions-added', function(broadcast, transaction) {
    $scope.data.transactions.push(transaction);
    calcTypes();
  });
}