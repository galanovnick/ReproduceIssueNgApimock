const childProcess = require('child_process');
const path = require('path');

// start node server serving the mocks
const server = childProcess.spawn('node', [path.resolve(`${__dirname}/../server.js`)], {
  cwd: path.resolve(`${__dirname}/../..`),
});
server.stdout.pipe(process.stdout);

exports.config = {
  SELENIUM_PROMISE_MANAGER: false,
  allScriptsTimeout: 11000,
  baseUrl: 'http://localhost:4200',
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        'disable-infobars',
        'window-size=1400,1024',
      ],
    },
    maxInstances: 10,
    metadata: {
      device: 'MacBook Pro 15',
      platform: {
        name: 'OSX',
        version: '10.13',
      },
    },
    shardTestFiles: true,
  },
  cucumberOpts: {
    require: [
      '../../shared/helpers/**/*.ts',
      '../step_definitions/**/*.ts',
      './',
    ],
    strict: true,
  },
  directConnect: true,
  disableChecks: true,
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  ngApimockOpts: {
    angularVersion: 5,
    hybrid: false 
  },
  onPrepare: () => {
    require('ts-node').register({
      project: 'integration/tsconfig.tst.json',
    });
    global.ngApimock =  require('ng-apimock/templates/protractor.mock');
  },

  specs: [
    '../features/**/*.feature',
  ],
};

// when finished, kill node server
process.on('exit', () => server.kill());
