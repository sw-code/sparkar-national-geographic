/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//==============================================================================
export const Diagnostics = require('Diagnostics');

Diagnostics.log("apples");


// How to load in modules
const Scene = require('Scene');

// Use export keyword to make a symbol available in scripting debug console

// const CameraInfo = require('CameraInfo');
// const pos = CameraInfo.captureDevicePosition;
const pos = Scene.root.child('Device').child('Camera').child('planeTracker0').child('plane0').worldTransform.position.z.monitor()
.subscribe(e => Diagnostics.log(e)); 

const dev = Scene.root.child('Device'); 


// const DeviceMotion = require('DeviceMotion');
// DeviceMotion.worldTransform.position.z.monitor()
// .subscribe(e => Diagnostics.log(e));

const DeviceMotion = require('DeviceMotion');
// Diagnostics.log(DeviceMotion.worldTransform.position.z);
 
const diff = Scene.root.child('Device').child('Camera').child('planeTracker0').child('plane0').worldTransform.position.z.sub(
	DeviceMotion.worldTransform.position.z
);
 
diff.monitor().subscribe(({newValue}) => {
	const diffValue = newValue;
	Diagnostics.log(diffValue)
});   
 

 

// To use variables and functions across files, use export/import keyword
// export const animationDuration = 10;

// Use import keyword to import a symbol from another file
// import { animationDuration } from './script.js'

// To access scene objects
// const captureDevice = Scene.root.find('directionalLight0');

// To access class properties
// const directionalLightIntensity = directionalLight.intensity;

// To log messages to the console
// Diagnostics.log('Console message logged from the script.');
