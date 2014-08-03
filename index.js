// Requires
var util = require('util');
var EventEmitter = require('events').EventEmitter;

// Constructor function
function PulseSensor (hardware, callback) {
  var self = this;

  // Check to ensure proper hardware has been passed in
  if (typeof hardware.pin != 'number') {
    // Pin not specified
    var error = new Error("Specify a pin, e.g. tessel.port['GPIO'].pin['A1']");
    self.emit('error', error);
    if(callback) {
      callback(error);
    }
  } else if ([28, 29, 30, 31, 32, 33].indexOf(hardware.pin) < 0) {
    // Not an analog pin
    var error = new Error('Specified pin is not an analog pin: ' + hardware.pin);
    self.emit('error', error);
    if(callback) {
      callback(error);
    }
  }
  
  // Set properties
  self.hardware = hardware; // Hardware should be a specific pin for PulseSensor
  self.arraySize = 5; // Calculates BPM based on an array of this size
  self.BPM = 0; // Starts at 0, samples
  
  // Begin listening for events
  // pulse.on('beat') // fires on heartbeat
  
  // Emit the ready event
  setImmediate(function emitReady() {
    self.emit('ready', self);
    if(callback) {
      callback(null, self);
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

// Gets BPM
PulseSensor.prototype.read = function (arraySize, callback) {
  
};

// Blinks specified LED in time with heartbeat
PulseSensor.prototype.blink = function (led, callback) {
  
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