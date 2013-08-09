basePath = '../';

files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  'libs/angular/angular.js',
  'libs/angular/angular-*.js',
  'libs/moment/moment.js',
  'libs/underscore/underscore.js',
  'src/app.js',
  'src/**/*.js',
  'test/e2e/*.js'
];

autoWatch = false;

browsers = ['Chrome', 'Safari'];

singleRun = true;

proxies = {
  '/': 'http://localhost:8000/'
};

junitReporter = {
  outputFile: 'test_out/e2e.xml',
  suite: 'e2e'
};
