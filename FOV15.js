var OptionsHelper = Client.getGameOptions();
var currentFOV = OptionsHelper.getFov();
let toZoom = currentFOV == 80;
let targetFOV = toZoom ? 20 : 80;

Chat.log("[SCRIPT] Zooming " + (toZoom ? "in" : "out"));
OptionsHelper.setFov(targetFOV);
