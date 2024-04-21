import * as Baritone from "../../Baritone.mjs";
import {
  addInit,
  addStatus,
  addStop,
  getStatus,
  isStatus,
  tp,
} from "../../Helper.mjs";
import Config from "../../Config.mjs";
import LeverComponent from "../LeverComponent.mjs";

addStatus("drop", "Dropping Items");

export default class AutoDrop extends LeverComponent {
  static enable() {
    this.effectListener = startEffectListener();
    super.enable();
  }
  static stop() {
    JsMacros.off(this.effectListener);
    delete this.effectListener;
  }
}

let slots;
function dropSlots() {
  const inv = Player.openInventory();
  slots.forEach((slot) => {
    inv.dropSlot(slot, true);
  });
  Client.waitTick(Config.sleep.drop);
}
function setSlots() {
  const inv = Player.openInventory();
  slots = [];
  inv.getSlots(["main", "hotbar"]).forEach((slot) => {
    if (inv.getSlot(slot).isEmpty()) {
      slots.push(slot);
    }
  });
}
let eventListener = null;
addInit(() => {
  eventListener = JsMacros.on(
    Config.eventName,
    JavaWrapper.methodToJava((e) => {
      if (e.getString("oldStatus") === getStatus("idle")) {
        setSlots();
      }
    })
  );
});
addStop(`${AutoDrop.label}Event`, () => {
  JsMacros.off(eventListener);
});

function startEffectListener() {
  setSlots();
  return JsMacros.on(
    "ItemPickup",
    JavaWrapper.methodToJava(() => {
      if (
        isStatus("mine") &&
        Player.openInventory().findFreeInventorySlot() === -1
      ) {
        Baritone.pause("drop");
        tp("drop");
        dropSlots();
        tp("mine");
        Baritone.resume();
      }
    })
  );
}

event.putObject("autoDropIntegration", autoDropIntegration);
export function autoDropIntegration(home) {
  if (
    Config.autoDrop.integration &&
    AutoDrop.effectListener !== undefined &&
    Config.home.drop === Config.home[home]
  ) {
    dropSlots();
  }
}
