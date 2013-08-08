/////
//    Transaction Controller Unit Tests
/////

describe('Transactions controller', function() {

  beforeEach(module('finance.services'));

  describe('TransactionsListController', function() {
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('src/data/data.json')
        .respond({
          start_date          : '1372921200000',
          transactions        : [
            {
              '_id'             : '1',
              'type'            : 'income',
              'amount'          : '200000',
              'date'            : '1372921200000',
              'title'           : 'Income',
              'tags'            : ['Income']
            },
            {
              '_id'             : '2',
              'type'            : 'food',
              'amount'          : '3000',
              'date'            : '1372723200000',
              'title'           : 'Cafe Aquarius',
              'tags'            : ['Cafe Aquarius', 'Brunch']
            },
          ]
        });

      scope = $rootScope.$new();
      ctrl = $controller(TransactionsListController, { $scope: scope });
    }));

    it('should expect data model with "start_date" and "transactions"', function() {
      expect(scope.data).toBeUndefined();
      $httpBackend.flush();
      expect(scope.data).toEqual({
        start_date          : '1372921200000',
        transactions        : [
          {
            '_id'             : '1',
            'type'            : 'income',
            'amount'          : '200000',
            'date'            : '1372921200000',
            'title'           : 'Income',
            'tags'            : ['Income']
          },
          {
            '_id'             : '2',
            'type'            : 'food',
            'amount'          : '3000',
            'date'            : '1372723200000',
            'title'           : 'Cafe Aquarius',
            'tags'            : ['Cafe Aquarius', 'Brunch']
          },
        ]
      });
    });

    it('should have method get', function() {
      expect(scope.data).toBeUndefined();
      $httpBackend.flush();
      expect(scope.get('1')).toEqual({
        '_id'             : '1',
        'type'            : 'income',
        'amount'          : '200000',
        'date'            : '1372921200000',
        'title'           : 'Income',
        'tags'            : ['Income']
      });
    });

    it('should have method delete', function() {
      expect(scope.data).toBeUndefined();
      $httpBackend.flush();
      expect(scope.data).toEqual({
        start_date          : '1372921200000',
        transactions        : [
          {
            '_id'             : '1',
            'type'            : 'income',
            'amount'          : '200000',
            'date'            : '1372921200000',
            'title'           : 'Income',
            'tags'            : ['Income']
          },
          {
            '_id'             : '2',
            'type'            : 'food',
            'amount'          : '3000',
            'date'            : '1372723200000',
            'title'           : 'Cafe Aquarius',
            'tags'            : ['Cafe Aquarius', 'Brunch']
          },
        ]
      });
      scope.delete();
      expect(scope.data).toEqual({});
    });

    it('should have method getDates', function() {
      expect(scope.data).toBeUndefined();
      $httpBackend.flush();
      expect(scope.data).toEqual({
        start_date          : '1372921200000',
        transactions        : [
          {
            '_id'             : '1',
            'type'            : 'income',
            'amount'          : '200000',
            'date'            : '1372921200000',
            'title'           : 'Income',
            'tags'            : ['Income']
          },
          {
            '_id'             : '2',
            'type'            : 'food',
            'amount'          : '3000',
            'date'            : '1372723200000',
            'title'           : 'Cafe Aquarius',
            'tags'            : ['Cafe Aquarius', 'Brunch']
          },
        ]
      });
      scope.getDates(new Date(1372723200001), new Date(1372921300000) );
      expect(scope.data.transactions.length).toEqual(1);
    });

  });

});