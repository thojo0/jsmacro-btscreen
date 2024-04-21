import * as Baritone from "../../Baritone.mjs";
import { addStatus, isStatus, tp } from "../../Helper.mjs";
import { autoDropIntegration } from "./AutoDrop.mjs";
import LeverComponent from "../LeverComponent.mjs";

addStatus("haste", "Refreshing Haste");

export default class AutoHaste extends LeverComponent {
  static enable() {
    this.tickListener = startTickListener();
    super.enable();
  }
  static stop() {
    JsMacros.off(this.tickListener);
    delete this.tickListener;
  }
}

function hasHaste(errorReturn = false) {
  try {
    return Player.getPlayer().hasStatusEffect("minecraft:haste");
  } catch (e) {
    return errorReturn;
  }
}
function startTickListener() {
  return JsMacros.on(
    "Tick",
    JavaWrapper.methodToJava(() => {
      if (isStatus("mine")) {
        if (hasHaste(true)) {
          return;
        }
        Baritone.pause("haste");
        tp("haste");
        autoDropIntegration("haste");
        while (!hasHaste()) {
          JsMacros.waitForEvent("StatusEffectUpdate");
        }
        tp("mine");
        Baritone.resume();
      }
    })
  );
}
