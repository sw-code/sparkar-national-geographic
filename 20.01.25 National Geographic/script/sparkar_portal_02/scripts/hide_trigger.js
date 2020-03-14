const Scene = require('Scene');
const DeviceMotion = require('DeviceMotion');
const Diagnostics = require('Diagnostics');
const Patches = require('Patches');
const Reactive = require('Reactive');



const portalWidthFromCenter = Patches.getScalarValue('portalWidthFromCenter');
const zero = Patches.getScalarValue('zero');


const diff = Scene.root.child('planeTracker0').child('base').worldTransform.position.z.sub(
	DeviceMotion.worldTransform.position.z
);

const occluder = Scene.root.child('planeTracker0').child('base').child('sphere_occluder').child('oc_room_01');

	// Scene.root.child('planeTracker0').child('base').child('sphere_occluder').child('oc_room_01').hidden.onOn().subscribe(() => Diagnostics.log("lemons"));
const isWithinPortalX = DeviceMotion.worldTransform.position.x.abs().lt(portalWidthFromCenter);
const isOccluderHidden = occluder.hidden;
const hasPassedPortalZ = diff.gt(zero);

hasPassedPortalZ.and(isWithinPortalX).or(hasPassedPortalZ.and(isOccluderHidden)).monitor().subscribe(({newValue}) => {
	occluder.hidden = newValue;
});  
