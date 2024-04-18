// Assumes food is held in the offhand
// Right clicks and holds if food level is below threshhold
// Likely to produce undesirable results if you end up right clicking something. Be warned.
// Inspired by: https://discord.com/channels/732004268948586545/1097289256839434393/1097677403213533185

import * as Baritone from "../../Baritone.mjs";
import { addStatus, addStop, delStop, getStatus, log } from "../../Helper.mjs";
import Config from "../../Config.mjs";
import LeverComponent from "../LeverComponent.mjs";

addStatus("eat", "Eating")

export default class AutoEat extends LeverComponent {
  enable = startHungerListener
  disable = stopHungerListener
}

function getOffhand(inv = Player.openInventory()) {
  const invMap = inv.getMap();
  const offhand = inv.getSlot(invMap.offhand[0]);
  return offhand;
}
function getHunger(itemStack) {
  return itemStack.getRaw().method_7909().method_19264().method_19230();
}
function switchHands(inv = Player.openInventory()) {
  const invMap = inv.getMap();
  inv.swapHotbar(invMap.offhand[0], inv.getSelectedHotbarSlotIndex());
}
function getFoodLevel() {
  return Player.getPlayer().getFoodLevel();
}
function eat() {
  const foodLevel = getFoodLevel();
  const stopTime = Time.time() + Config.autoEat.maxHold;
  KeyBind.keyBind("key.use", true);
  while (foodLevel === getFoodLevel() && stopTime > Time.time()) {
    Client.waitTick(Config.sleep.check);
  }
  KeyBind.keyBind("key.use", false);
}

let hungerListener = null;
function startHungerListener() {
  hungerListener = JsMacros.on(
    "HungerChange",
    JavaWrapper.methodToJava((e) => {
      switch (getStatus()) {
        case getStatus("mine"):
          const inv = Player.openInventory();
          const offhand = getOffhand(inv);
          if (offhand.isFood()) {
            let minLevel = Config.autoEat.level;
            if (minLevel === null) {
              minLevel = 21 - getHunger(offhand);
            }
            if (minLevel < 21) {
              if (e.foodLevel < minLevel) {
                if (Config.autoEat.saveMode) {
                  Baritone.pause("eat");
                  switchHands(inv);
                } else {
                  log("Eating");
                }
                while (getFoodLevel() < minLevel) {
                  eat();
                }
                if (Config.autoEat.saveMode) {
                  switchHands(inv);
                  Baritone.resume();
                }
              }
            }
          }
          break;
      }
    })
  );
  addStop(AutoEat.label, () => {
    JsMacros.off(hungerListener);
    hungerListener = null;
  });
  log(AutoEat.label + " enabled");
}
function stopHungerListener() {
  delStop(AutoEat.label, true);
  log(AutoEat.label + " disabled");
}
