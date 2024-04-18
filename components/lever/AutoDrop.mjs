import * as Baritone from "../../Baritone.mjs";
import {
  addInit,
  addStatus,
  addStop,
  delStop,
  getStatus,
  log,
  tp,
} from "../../Helper.mjs";
import Config from "../../Config.mjs";
import LeverComponent from "../LeverComponent.mjs";

addStatus("drop", "Dropping Items");

export default class AutoDrop extends LeverComponent {
  enable = startEffectListener
  disable = stopEffectListener
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

let pickupListener = null;
function startEffectListener() {
  setSlots();
  pickupListener = JsMacros.on(
    "ItemPickup",
    JavaWrapper.methodToJava(() => {
      switch (getStatus()) {
        case getStatus("mine"):
          if (Player.openInventory().findFreeInventorySlot() !== -1) {
            break;
          }
          Baritone.pause("drop");
          tp("drop");
          dropSlots();
          tp("mine");
          Baritone.resume();
          break;
      }
    })
  );
  addStop(AutoDrop.label, () => {
    JsMacros.off(pickupListener);
    pickupListener = null;
  });
  log(`${AutoDrop.label} enabled`);
}
function stopEffectListener() {
  delStop(AutoDrop.label, true);
  log(`${AutoDrop.label} disabled`);
}

event.putObject("autoDropIntegration", autoDropIntegration);
export function autoDropIntegration(home) {
  if (
    Config.autoDrop.integration &&
    pickupListener !== null &&
    Config.home.drop === Config.home[home]
  ) {
    dropSlots();
  }
}
