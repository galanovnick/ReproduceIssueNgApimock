const express = require('express');
const ngApimock = require('ng-apimock')();
const path = require('path');
const cors = require('cors');

const mocksOutputDirectory = path.resolve(`${__dirname}/../.tmp/ngApimock`);
const mocksSourceDirecory = path.resolve(`${__dirname}/../integration/api-mocks`);

const ngApiMockConfig = {
    outputDir: mocksOutputDirectory,
    src: mocksSourceDirecory
};

const app = express();

ngApimock.run(ngApiMockConfig);
ngApimock.watch(ngApiMockConfig.src);

app 
    .set('port', (process.env.PORT || 3000))
    .use(cors())
    .use(require('ng-apimock/lib/utils').ngApimockRequest)
    .use('/mocking', express.static(mocksOutputDirectory))
    .listen(3000, 'localhost');