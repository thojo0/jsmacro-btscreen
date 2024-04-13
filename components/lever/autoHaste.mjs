import * as Baritone from "../../Baritone.mjs";
import { addStatus, addStop, delStop, getStatus, log, tp } from "../../Helper.mjs";
import { autoDropIntegration } from "./AutoDrop.mjs";
import Base from "./Base.mjs";

addStatus("haste", "Refreshing Haste")

export default class AutoHaste extends Base {
  enable = startTickListener
  disable = stopTickListener
}

function hasHaste(errorReturn = false) {
  try {
    return Player.getPlayer().hasStatusEffect("minecraft:haste");
  } catch (e) {
    return errorReturn;
  }
}
let tickListener = null;
function startTickListener() {
  tickListener = JsMacros.on(
    "Tick",
    JavaWrapper.methodToJava(() => {
      switch (getStatus()) {
        case getStatus("mine"):
          if (hasHaste(true)) {
            break;
          }
          Baritone.pause("haste");
          tp("haste");
          autoDropIntegration("haste")
          while (!hasHaste()) {
            JsMacros.waitForEvent("StatusEffectUpdate");
          }
          tp("mine");
          Baritone.resume();
          break;
      }
    })
  );
  addStop(AutoHaste.label, () => {
    JsMacros.off(tickListener);
    tickListener = null;
  });
  log(`${AutoHaste.label} enabled`);
}
function stopTickListener() {
  delStop(AutoHaste.label, true);
  log(`${AutoHaste.label} disabled`);
}
