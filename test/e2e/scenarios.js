describe('Finance App', function() {

  beforeEach(function() {
    browser().navigateTo('../../public/index.html');
  });

  it('should add transaction', function() {
    expect(repeater('.transactions-list .transaction').count()).toBe(0);

    element('.add-transaction').click();
    input('title').enter('Coffee Bean');
    input('amount').enter('5.00');
    input('date').enter('08/05/2013');
    input('type').enter('food');
    element('.save').click();

    expect(repeater('.transactions-list .transaction').count()).toBe(1);
  });

});