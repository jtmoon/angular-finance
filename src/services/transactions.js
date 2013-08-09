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
  var transactionsService       = {}
    , _this = this;

  this.data;
  this.dateRange = {};

  transactionsService.fetchJSON = function() {
    if(localStorage && !localStorage.getItem('data'))  {
      localStorage.setItem('data', JSON.stringify(dataJSON));
    }
    return dataJSON;
  };

  transactionsService.data = function() {
    return _this.data || JSON.parse(localStorage.getItem('data')) || this.fetchJSON();
  };

  transactionsService.set = function(transactions) {
    _this.data.transactions = transactions;
    _this.data.date = Date.now();
    localStorage.setItem('data', JSON.stringify(data));
    $rootScope.$broadcast('transactions-updated', transactions);
  };

  transactionsService.add = function(item) {
    if(!_this.data) _this.data = this.data();

    _this.data.transactions.push(item);
    $rootScope.$broadcast('transactions-added', item);
    this.save(_this.data);
  };

  transactionsService.deleteById = function(id) {
    _this.data.transactions = _.reject(_this.data.transactions, function(transaction) {
      transaction._id === id;
    });
    $rootScope.$broadcast('transactions-updated', _this.data.transactions);
  };

  transactionsService.getById = function(id) {
    var transaction = _.find(_this.data.transactions, function(transaction) {
      return transaction._id = id;
    });

    return transaction;
  };

  transactionsService.save = function(data) {
    if(data) localStorage.setItem('data', JSON.stringify(data));
    else localStorage.setItem('data', JSON.stringify(_this.data));
  };

  transactionsService.reset = function() {
    _this.data = JSON.parse(localStorage.getItem('data'));
    $rootScope.$broadcast('data-reset', _this.data);
  };

  transactionsService.delete = function() {
    _this.data = {};
    localStorage.setItem('data', null);
    $rootScope.$broadcast('data-deleted');
  };

  transactionsService.setStartDate = function(start) {
    var startDate = moment(start);

    if(startDate.isValid()) {
      _this.dateRange.start = start;
      $rootScope.$broadcast('filter-changed', { start: start });
    }
  };

  transactionsService.setEndDate = function(end) {
    var endDate = moment(end);

    if(endDate.isValid()) {
      _this.dateRange.end = end;
      $rootScope.$broadcast('filter-changed', { end: end });
    }
  };

  transactionsService.getStartDate = function() {
    return _this.dateRange.start || _this.data.start;
  };

  transactionsService.getEndDate = function() {
    return _this.dateRange.end || Date.now();
  };

  transactionsService.setDateRange = function(start, end) {
    var startDate       = moment(start)
      , endDate         = moment(end);

    if(startDate.isValid() && endDate.isValid()) {
      _this.dateRange.start = start;
      _this.dateRange.end = end;
      $rootScope.$broadcast('filter-updated', dateRange);
    }
  };

  transactionsService.getDateRange = function() {
    return _this.dateRange;
  };

  transactionsService.getDates = function(start, end) {
    var startDate       = moment(start)
      , endDate         = moment(end);

    if(startDate.isValid() && endDate.isValid()) {
      /*$scope.data.transactions = transactionsService.getDates(start, end);*/
      var transactions = _.filter(_this.data.transactions, function(transaction) {
        var date = moment(Number(transaction.date));

        return date > startDate && date < endDate;
      });
    }

    _this.dateRange.start = start;
    _this.dateRange.end = end;

    return transactions;
  };

  return transactionsService;
}]);