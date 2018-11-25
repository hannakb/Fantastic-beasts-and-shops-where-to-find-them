//Header
//Copyright 20__-present, Facebook, Inc.
//All rights reserved.

//This source code is licensed under the license found in the
//LICENSE file in the root directory of this source tree.

var Diagnostics = require('Diagnostics');

var Animation = require('Animation');
var FaceTracking = require('FaceTracking');
var Scene = require('Scene');

var ft = Scene.root.child("Device").child("Camera").child("Focal Distance").child("facetracker0");
var ft2 = Scene.root.child("Device").child("Camera").child("Focal Distance");

var pizzaWheel0 = ft2.child("pizzas_123");
var pizzaWheel00 = ft2.child("pizzas_456");


var mouthIsOpen = FaceTracking.face(0).mouth.openness.gt(0.3).and(FaceTracking.count.gt(0));
var leftCorner = FaceTracking.face(0).mouthPosition;

var wheelDriver = Animation.timeDriver({durationMilliseconds: 1900, loopCount: Infinity});
var wheelSampler = Animation.samplers.linear(0, -Math.PI*2);

var wheelDriver1 = Animation.timeDriver({durationMilliseconds: 1900, loopCount: Infinity});
var wheelSampler1 = Animation.samplers.linear(0, -Math.PI*2);


pizzaWheel0.transform.rotationX = Animation.animate(wheelDriver, wheelSampler);
pizzaWheel00.transform.rotationX = Animation.animate(wheelDriver1, wheelSampler1);

wheelDriver.start();
wheelDriver1.start();

var d = {};
var input = [1, 2, 3, 4, 5, 6];
var count = 0;
for(var i = 0; i < input.length; i++)
{
	d[input[i]] = {};
}
var mouth = {};
mouth['left'] = {};
mouth['right'] = {};
mouth['low'] = {};
mouth['up'] = {};


Object.defineProperty(d, "set", {
  configurable: false,
  enumerable: false, 
  writable: true,
  value: function () {

  	this[arguments[0]][arguments[1]] = arguments[2];
  	for (var i = 0; i < input.length; i++) {
  		var key = input[i];	
  		if ((this[key]['x'] > mouth['left']['x']) && (this[key]['x'] < mouth['right']['x']) && (this[key]['y'] > mouth['low']['y']) && (this[key]['y'] < mouth['up']['y'])) {
  			count++;
  			Diagnostics.log(count);
  		}
  	}
  }
});

FaceTracking.face(0).mouth.leftCorner.x.monitor().subscribe( function(e) {
	mouth['left']['x'] = e.newValue;
});

FaceTracking.face(0).mouth.leftCorner.y.monitor().subscribe( function(e) {
	mouth['left']['y'] = e.newValue;
});


FaceTracking.face(0).mouth.rightCorner.x.monitor().subscribe( function(e) {
	mouth['right']['x'] = e.newValue;
});

FaceTracking.face(0).mouth.rightCorner.y.monitor().subscribe( function(e) {
	mouth['right']['y'] = e.newValue;
});

FaceTracking.face(0).mouth.lowerLipCenter.x.monitor().subscribe( function(e) {
	mouth['low']['x'] = e.newValue;
});

FaceTracking.face(0).mouth.lowerLipCenter.y.monitor().subscribe( function(e) {
	mouth['low']['y'] = e.newValue;
});

FaceTracking.face(0).mouth.upperLipCenter.x.monitor().subscribe( function(e) {
	mouth['up']['x'] = e.newValue;
});

FaceTracking.face(0).mouth.upperLipCenter.y.monitor().subscribe( function(e) {
	mouth['up']['x'] = e.newValue;
});

pizzaWheel00.find('pizza_4').worldTransform.position.y.monitor().subscribe( function(e) {
	d.set(4, 'y', e.newValue);
});

pizzaWheel00.find('pizza_4').worldTransform.position.x.monitor().subscribe( function(e) {
	d.set(4, 'x', e.newValue);
});

pizzaWheel00.find('pizza_5').worldTransform.position.y.monitor().subscribe( function(e) {
	d.set(5, 'y', e.newValue);
});

pizzaWheel00.find('pizza_5').worldTransform.position.x.monitor().subscribe( function(e) {
	d.set(5, 'x', e.newValue);
});

pizzaWheel00.find('pizza_6').worldTransform.position.y.monitor().subscribe( function(e) {
	d.set(6, 'y', e.newValue);
});

pizzaWheel00.find('pizza_6').worldTransform.position.x.monitor().subscribe( function(e) {
	d.set(6, 'x', e.newValue);
});

pizzaWheel0.find('pizza_1').worldTransform.position.x.monitor().subscribe( function(e) {
	d.set(1, 'x', e.newValue);
});

pizzaWheel0.find('pizza_1').worldTransform.position.y.monitor().subscribe( function(e) {
	d.set(1, 'y', e.newValue);
});

pizzaWheel0.find('pizza_2').worldTransform.position.x.monitor().subscribe( function(e) {
	d.set(2, 'x', e.newValue);
});
pizzaWheel0.find('pizza_2').worldTransform.position.y.monitor().subscribe( function(e) {
	d.set(2, 'y', e.newValue);
});

pizzaWheel0.find('pizza_3').worldTransform.position.x.monitor().subscribe( function(e) {
	d.set(3, 'x', e.newValue);
});

pizzaWheel0.find('pizza_3').worldTransform.position.y.monitor().subscribe( function(e) {
	d.set(3, 'y', e.newValue);
});

var NativeUI = require('NativeUI');
var TouchGestures = require('TouchGestures');

var textNodeName  = 'macAddressField';

var text = Scene.root.find(textNodeName);

var macAddress;

const recommendationNode = Scene.root.find('recommendationField');

const Networking = require('Networking');

const url = 'https://junctionbeasts.tk/analytics/personal_popular';
const request = {
    method: 'GET',
    body: JSON.stringify({clientMac: macAddress}),
    headers: {'Content-type': 'application/json; charset=UTF-8'}
}

TouchGestures.onTap(text).subscribeWithSnapshot({"text": text.text}, function(event, snapshot) {
  NativeUI.enterTextEditMode(textNodeName);
  NativeUI.getText(textNodeName).monitor().subscribe(
    function(e) {
      macAddress = e.newValue;
      Diagnostics.log(macAddress);
    }
  );
  Networking.fetch(url, request).then(function(result) {
      Diagnostics.log("result");
      if ((result.status >= 200) && (result.status < 300)) {
          // If the request was successful, we'll chain the JSON forward
          return result.json();
      }
      // If the request was not successful, we should throw an error
      throw new Error("HTTP status code " + result.status);
  }).then(function(json) {
      // Here we can process the JSON obtained by the successful request
      Diagnostics.log(json);
      // recommendationNode.text = json.title;
      macAddressField.hidden = true;
      recommendationNode.hidden = false;
  }).catch(function(error) {
      Diagnostics.log(error);
      // Here we process any errors that may happen with the request
      recommendationNode.text = error.message;
  });
});

