var test = require('tinytap');
var async = require('async');

var tessel = require('tessel');
var PulseSensorLib = require('../');

var portname = process.argv[2] || 'GPIO';
var pinname = process.argv[3] || 'A1';

var timeout = 1000;
var pulse;

test.count(6);

async.series([
  test('Connecting to PulseSensor', function (t) {
    pulse = PulseSensorLib.use(tessel.port[portname].pin[pinname]);
    t.ok(typeof pulse == 'object', 'pulse should be an object');
    pulse.on('error', function (error) {
      t.ok(false, 'Error caught: ' + error);
      t.end();
    });
  }),
  
  test('readRaw function', function (t) {
    pulse.readRaw(function (data) {
      t.equal(typeof data, 'number', 'Read should return a number (callback value).');
      t.ok((data >= 0) && (data <=1), 'Data should be between 1 and 0.');
    });
    t.equal(typeof pulse.readRaw(), 'number', 'Read should return a number (return value).');
    t.ok((pulse.readRaw() >= 0) && (pulse.readRaw() <=1), 'Data should be between 1 and 0.');
    t.end();
  })
  
  ]);