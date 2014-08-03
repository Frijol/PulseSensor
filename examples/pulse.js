var tessel = require('tessel');
var PulseSensor = require('../');
var pulse = PulseSensor.use(tessel.port['GPIO'].pin['A1']);

setInterval(function () {
  console.log(pulse.read());
  tessel.led[1].output(pulse.readRaw());
}, 50);