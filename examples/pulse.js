/*********************************************
The PulseSensor collects some pulse samples.
When it has enough samples to determine BPM
(beats per minute), it declares ready. It
then logs an updated BPM estimate at each
heartbeat and toggles the blue LED in time.
*********************************************/

var tessel = require('tessel');
var PulseSensor = require('../');
var pulse = PulseSensor.use(tessel.port['GPIO'].pin['A1']);

pulse.on('ready', function () {
  pulse.on('beat', function (time) {
    console.log(pulse.BPM);
    tessel.led[1].toggle();
  });
});