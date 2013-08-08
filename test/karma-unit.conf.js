basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'libs/angular/angular.js',
  'libs/angular/angular-*.js',
  'libs/moment/moment.js',
  'libs/underscore/underscore.js',
  'src/app.js',
  'src/**/*.js',
  'test/libs/angular/angular-mocks.js',
  'test/unit/**/*.js'
];

autoWatch = true;

browsers = ['Chrome', 'Safari'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
