/////
//    Transaction Controller
/////

function TransactionController($scope, transactionsService) {
  function reset() {
    $scope.title = '';
    $scope.date = '';
    $scope.type = '';
    $scope.amount = '';
  }

  $scope.addTransaction = function() {
    var data            = $('form').serializeArray()
      , transaction     = {};

    _.each(data, function(obj) {
      transaction[obj.name] = obj.value;
    });

    transaction.date = moment(transaction.date).valueOf();
    transaction.amount = Number(transaction.amount) * 100;

    transactionsService.add(transaction);
    reset();
  }
}