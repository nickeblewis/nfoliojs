'use strict';

/**
 * Module dependencies.
 */

var express = require('express');

// NL - Changed this to 3000 because I can't run it via 8080 on my nitrous.io dev environment
var config = {
    port: 3000
};

var app = express();

app.use(express.static(__dirname + '/app'));
app.listen(config.port);

console.log('Express app started on port ' + config.port);
