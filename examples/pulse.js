var tessel = require('tessel');
var PulseSensor = require('../');
var pulse = PulseSensor.use(tessel.port['GPIO'].pin['A1']);

pulse.on('ready', function () {
  pulse.on('beat', function (time) {
    console.log(pulse.BPM);
    tessel.led[1].toggle();
  });
});