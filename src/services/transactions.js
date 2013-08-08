var dataJSON = {
  "start_date": "1372921200000",
  "transactions": [
    {
      "_id"             : "1",
      "type"            : "income",
      "amount"          : "200000",
      "date"            : "1372921200000",
      "title"           : "Income",
      "tags"            : ["Income"]
    },
    {
      "_id"             : "2",
      "type"            : "food",
      "amount"          : "3000",
      "date"            : "1372723200000",
      "title"           : "Cafe Aquarius",
      "tags"            : ["Cafe Aquarius", "Brunch"]
    },
    {
      "_id"             : "3",
      "type"            : "food",
      "amount"          : "4500",
      "date"            : "1372723200000",
      "title"           : "Umami Burger",
      "tags"            : ["Umami Burger", "Lunch"]
    },
    {
      "_id"             : "4",
      "type"            : "food",
      "amount"          : "1000",
      "date"            : "1372723200000",
      "title"           : "Spoon Rocket",
      "tags"            : ["Spoon Rocket", "Dinner"]
    },
    {
      "_id"             : "5",
      "type"            : "utilities",
      "amount"          : "8900",
      "date"            : "1373587200000",
      "title"           : "PG&E",
      "tags"            : ["PG&E"]
    },
    {
      "_id"             : "6",
      "type"            : "utilities",
      "amount"          : "3700",
      "date"            : "1373587200000",
      "title"           : "Internet",
      "tags"            : ["Internet", "WebPass"]
    },
    {
      "_id"             : "7",
      "type"            : "income",
      "amount"          : "200000",
      "date"            : "1373846400000",
      "title"           : "Income",
      "tags"            : ["Income"]
    },
    {
      "_id"             : "8",
      "type"            : "travel",
      "amount"          : "1300",
      "date"            : "1373587200000",
      "title"           : "Uber to MacArthur BART",
      "tags"            : ["Uber", "Taxi"]
    },
    {
      "_id"             : "9",
      "type"            : "food",
      "amount"          : "2500",
      "date"            : "1373587200000",
      "title"           : "Sushi",
      "tags"            : ["Sushi", "Lunch"]
    }
  ]
};

angular.module('finance.services', []).factory('transactionsService', ['$http', '$q', '$rootScope', function($http, $q, $rootScope) {
  var data
    , transactionsService       = {}
    , dateRange                 = {};

  transactionsService.fetchJSON = function() {
    return dataJSON;
  };

  transactionsService.data = function() {
    return data;
  };

  transactionsService.set = function(transactions) {
    data.transactions = transactions;
    data.date = Date.now();
    localStorage.setItem('data', JSON.stringify(data));
    $rootScope.$broadcast('transactions:updated', transactions);
  };

  transactionsService.add = function(item) {
    data.transactions.push(item);
    $rootScope.$broadcast('transactions:added', item);
  };

  transactionsService.deleteById = function(id) {
    data.transactions = _.reject(data.transactions, function(transaction) {
      transaction._id === id;
    });
    $rootScope.$broadcast('transactions:updated', data.transactions);
  };

  transactionsService.getById = function(id) {
    var transaction = _.find(data.transactions, function(transaction) {
      return transaction._id = id;
    });

    return transaction;
  };

  transactionsService.save = function() {
    localStorage.setItem('data', JSON.stringify(data));
  };

  transactionsService.reset = function() {
    data = JSON.parse(localStorage.getItem('data'));
    $rootScope.$broadcast('data:reset', data);
  };

  transactionsService.delete = function() {
    data = {};
    localStorage.setItem('data', null);
    $rootScope.$broadcast('data:deleted');
  };

  transactionsService.setStartDate = function(start) {
    var startDate = moment(start);

    if(startDate.isValid()) {
      dateRange.start = start;
      $rootScope.$broadcast('filter:changed', { start: start });
    }
  };

  transactionsService.setEndDate = function(end) {
    var endDate = moment(end);

    if(endDate.isValid()) {
      dateRange.end = end;
      $rootScope.$broadcast('filter:changed', { end: end });
    }
  };

  transactionsService.getStartDate = function() {
    return dateRange.start;
  };

  transactionsService.getEndDate = function() {
    return dateRange.end;
  };

  transactionsService.setDateRange = function(start, end) {
    var startDate       = moment(start)
      , endDate         = moment(end);

    if(startDate.isValid() && endDate.isValid()) {
      dateRange.start = start;
      dateRange.end = end;
      $rootScope.$broadcast('filter:updated', dateRange);
    }
  };

  transactionsService.getDateRange = function() {
    return dateRange;
  };

  transactionsService.getDates = function(start, end) {
    var startDate       = moment(start)
      , endDate         = moment(end);

    if(startDate.isValid() && endDate.isValid()) {
      /*$scope.data.transactions = transactionsService.getDates(start, end);*/
      var transactions = _.filter(data.transactions, function(transaction) {
        var date = moment(Number(transaction.date));

        return date > startDate && date < endDate;
      });
    }

    dateRange.start = start;
    dateRange.end = end;

    return transactions;
  };

  return transactionsService;
}]);