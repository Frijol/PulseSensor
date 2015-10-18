// Requires
var util = require('util');
var EventEmitter = require('events').EventEmitter;

// Constructor function
function PulseSensor (hardware, callback) {
  var self = this;

  // Set properties
  self.ready = false;
  self.hardware = hardware; // Hardware should be a specific pin for PulseSensor
  self.pollRate = 10; // Interval to read sensor
  self.arraySize = 3; // // BPM is calculated based on the average of an array of time differences. Increasing the array size smooths the data.
  self.array = [];
  self.BPM = 0; // Starts at 0, samples

  console.log('Collecting samples...');

  // Emit a time at each beat
  var high = false;
  setInterval(function () {
    if(self.readRaw() == 1) {
      if(!high) {
        high = true;
        var time = new Date(milliseconds);
        // TODO: add filtering
        self.emit('beat', time);
      }
    } else {
      high = false;
    }
  }, pollRate);

  // Collect for BPM
  var oldTime = new Date(milliseconds);
  self.on('beat', function (time) {
    var diff = time - oldTime
    // Check that the data is reasonable
    if (diff > 40 && diff < 5000) {
      self.array.push(time - oldTime);
    }
    oldTime = time;
    if(self.array.length > self.arraySize) {
      self.array.shift();
      var sum = 0;
      for (var i = 0; i < self.array.length; i++) {
        sum += self.array[i];
      }
      var avg = sum/self.array.length;
      self.BPM = 60000/avg;
      if (!self.ready) {
        if (self.BPM > 0) {
          self.ready = true;
          // Emit the ready event
          setImmediate(function emitReady() {
            self.emit('ready', self);
            if(callback) {
              callback(null, self);
            }
          });
        }
      }
    }
  });
}

// Inherit event emission
util.inherits(PulseSensor, EventEmitter);

// Functions
// Read the state of the pin
PulseSensor.prototype.readRaw = function (callback) {
  if(callback) {
    callback(this.hardware.read());
  }
  return this.hardware.read();
};

// Standard Tessel use function
function use (hardware, callback) {
  if (!hardware) {
    // Set default configuration
    hardware = require('tessel').port['GPIO'].pin['A1'];
  }
  return new PulseSensor(hardware, callback);
}

// Exports
exports.PulseSensor = PulseSensor;
exports.use = use;
