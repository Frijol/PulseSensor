PulseSensor
===========

Node library for the PulseSensor, designed to interact with [Tessel](https://tessel.io).

The [PulseSensor](pulsesensor.com) is an open source pulse sensor. It shines green light through your skin, then reads the intensity of light back. This light intensity changes based on the action in your capillaries, so the analog value read back correlates with your pulse.

##Materials

* [PulseSensor](http://pulsesensor.com)
* [Tessel](https://tessel.io)

##Connection

*Connect the PulseSensor to Tessel as follows:*

1. Black wire to GND (there's one on the GPIO port)
1. Red wire to 5V (Vin on the GPIO port)
1. Purple wire (signal) to one of the Analog pins on the GPIO port. I use A1.

![](https://lh6.googleusercontent.com/-dE9dcdPjQG8/U-KQ8p_Zt3I/AAAAAAAAJmc/XvKroY3qrqQ/w882-h496-no/20140806_133241.jpg)

*Connect the PulseSensor to your finger:*

Put the heart side of the PulseSensor to your fingertip, then wrap it securely with the provided velcro strip. You should feel your pulse in your fingertip.

![](https://lh3.googleusercontent.com/-jP0E-dwgJWY/U-KRCCv84BI/AAAAAAAAJmY/V1JLqai4Gp4/w882-h496-no/20140806_133300.jpg)

![](https://lh4.googleusercontent.com/-lWNlkrCA8uk/U-KRg6CqiWI/AAAAAAAAJm4/JvdyY_J5V54/w882-h496-no/20140806_133454.jpg)

It would be a good idea to also peruse [this pdf](http://pulse-sensor.googlecode.com/files/PulseSensorAmpedGettingStartedGuide.pdf) from the manufacturers, which shows you how to seal and attach the sensor.

##Installation

```sh
npm install pulsesensor
```

##Example
```js
/*********************************************
The PulseSensor collects some pulse samples.
When it has enough samples to determine BPM
(beats per minute), it declares ready. It
then logs an updated BPM estimate at each
heartbeat and toggles the blue LED in time.
*********************************************/

var tessel = require('tessel');
var PulseSensor = require('pulsesensor');
var pulse = PulseSensor.use(tessel.port['GPIO'].pin['A1']);

pulse.on('ready', function () {
  pulse.on('beat', function (time) {
    console.log(pulse.BPM);
    tessel.led[1].toggle();
  });
});
```

##Methods

&#x20;<a href="#api-pulse-readRaw-callback-data" name="api-pulse-readRaw-callback-data">#</a> pulse<b>.readRaw</b>( [callback(data)] )  
Reads the value of the analog pin. Returns the value and sends value to callback.

##Events

&#x20;<a href="#api-pulse-on-error-callback-error" name="api-pulse-on-error-callback-error">#</a> pulse<b>.on</b>( 'error', callback(error) )  
Emitted on error connecting

&#x20;<a href="#api-pulse-on-ready-callback-err-pulse" name="api-pulse-on-ready-callback-err-pulse">#</a> pulse<b>.on</b>( 'ready', callback(err, pulse) )  
Emitted when the pulse object is created and there are enough samples to determine BPM

&#x20;<a href="#api-pulse-on-beat-callback-time" name="api-pulse-on-beat-callback-time">#</a> pulse<b>.on</b>( 'beat', callback(time) )  
Emitted at each heartbeat sensed. Beat emission begins before ready event is emitted.

##Properties

&#x20;<a href="#api-pulse-BPM" name="api-pulse-BPM">#</a> pulse<b>.BPM</b>  
The BPM, calculated as an average over the last 3 beats.

##Licensing
Copyright Kelsey Breseman, Apache 2.0 Licensed.
