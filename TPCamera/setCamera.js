// let MinecraftClient = Client.getMinecraft();
// let Camera = MinecraftClient.field_1773.method_19418(); // extracts the camera instance from the GameRenderer
// let CameraClass = Reflection.getClass("net.minecraft.class_4184");
// const setPos = Reflection.getDeclaredMethod(CameraClass, "method_19327", "setPos", [Reflection.getClass("double"), Reflection.getClass("double"), Reflection.getClass("double")]);
// setPos.setAccessible(true);
// 
// Chat.log(Camera.method_19326()); // 80, something something
// while (true) {
// 	Reflection.invokeMethod(setPos, Camera, [200.0,100.0,200.0]);
// 	Chat.log(Camera.method_19326()); // 80, something something
// 	Client.waitTick(1);
// }

//Java.type("fi.dy.masa.tweakeroo.config.FeatureToggle").TWEAK_FREE_CAMERA.getBooleanConfig().setValue(true);
//
//let x = 200;
//let y = 100;
//let z = 200;
//
//Java.type("fi.dy.masa.tweakeroo.util.CameraEntity").getCamera().method_5814(x,y,z);

const reverse = !GlobalVars.getBoolean("ToggleScript");
GlobalVars.putBoolean("ToggleScript", reverse);

const CameraUtils = Java.type("fi.dy.masa.tweakeroo.util.CameraUtils");
const FeatureToggle = Java.type("fi.dy.masa.tweakeroo.config.FeatureToggle");

if (reverse) {
	Chat.log("Toggled true");
	FeatureToggle.TWEAK_FREE_CAMERA.setBooleanValue(true);
} else {
	Chat.log("Toggled false");
	FeatureToggle.TWEAK_FREE_CAMERA.setBooleanValue(false);
}

//while loop is still called even if reverse = false, null error with camera
while(reverse) {
	let camera = Java.type("fi.dy.masa.tweakeroo.util.CameraEntity").getCamera();
	if(camera != null) {
		camera.method_5814(-14,90,122);
		Client.waitTick();
	};
}
