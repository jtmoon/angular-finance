/////
//    Transactions Type Controller
/////

function TransactionsTypeListController($scope, transactionsService) {
  var types = {};
  
  $scope.types = [];

  // Initialize data
  if(transactionsService.data() === undefined) {
    $scope.data = transactionsService.fetchJSON();
  } else {
    $scope.data = transactionsService.data();
  }

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

  $scope.predicate = '-count';

  $scope.toggleSort = function() {

  }
}