angular.module('finance').directive('rangeTotal', function(transactionsService) {
  return {
    restrict: 'E',
    template: '<div class="well well-sm widget totals"><p class="income">Income: <span class="text-success">{{incomeDollars}}</span></p><p class="expenses">Expenses: <span class="text-danger">{{expensesDollars}}</span></p></div>',
    link: function(scope, element, attrs) {
      function calcTotals() {
        scope.income = 0;
        scope.expenses = 0;

        _.each(transactionsService.data().transactions, function(transaction) {
          if(transaction.type === 'income') {
            scope.income += Number(transaction.amount);
          } else {
            scope.expenses += Number(transaction.amount);
          }
        });

        scope.incomeDollars = '$' + (scope.income / 100).toFixed(2);
        scope.expensesDollars = '$' + (scope.expenses / 100).toFixed(2);
      }

      calcTotals();

      scope.$on('transactions-added', function(broadcast, transaction) {
        calcTotals();
      });
    }
  }
});