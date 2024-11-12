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
    for (let e of Player.getPlayer().getStatusEffects()) {
      if (e.getId() === "minecraft:haste") return true;
    }
  } catch (error) {
    return errorReturn;
  }
  return false;
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
