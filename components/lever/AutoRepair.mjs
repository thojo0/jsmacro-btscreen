import * as Baritone from "../../Baritone.mjs";
import { addStatus, getStatus, tp } from "../../Helper.mjs";
import Config from "../../Config.mjs";
import { autoDropIntegration } from "./AutoDrop.mjs";
import LeverComponent from "../LeverComponent.mjs";

addStatus("repair", "Repairing");

export default class AutoRepair extends LeverComponent {
  static enable() {
    this.damageListener = startDamageListener();
    super.enable();
  }
  static stop() {
    JsMacros.off(this.damageListener);
    delete this.damageListener;
  }
}

let prevHotbarSlot = 0;
function switchToSword(inv = Player.openInventory()) {
  const invMap = inv.getMap();
  prevHotbarSlot = inv.getSelectedHotbarSlotIndex();
  for (let i = 0; i < invMap.hotbar.length; i++) {
    if (
      inv.getSlot(invMap.hotbar[i]).getItemId().toLowerCase().endsWith("sword")
    ) {
      inv.setSelectedHotbarSlotIndex(i);
      break;
    }
  }
  if (prevHotbarSlot !== inv.getSelectedHotbarSlotIndex()) {
    inv.swapHotbar(invMap.offhand[0], prevHotbarSlot);
  }
}
function switchBack(inv = Player.openInventory()) {
  const invMap = inv.getMap();
  const nbt = inv.getSlot(invMap.offhand[0]).getNBT();
  if (nbt.isCompound()) {
    if (nbt.has("Enchantments")) {
      const enchants = nbt.get("Enchantments");
      for (let i = 0; i < enchants.length(); i++) {
        if (enchants.get(i).get("id").asString() === "minecraft:mending") {
          inv.swapHotbar(invMap.offhand[0], prevHotbarSlot);
        }
      }
    }
  }
  inv.setSelectedHotbarSlotIndex(prevHotbarSlot);
}
function startDamageListener() {
  let running;
  let item;
  return JsMacros.on(
    "ItemDamage",
    JavaWrapper.methodToJava((e) => {
      switch (getStatus()) {
        case getStatus("repair"):
          if (
            e.item.isItemEqualIgnoreDamage(item) &&
            e.damage <= Config.autoRepair.stop
          ) {
            running = false;
          }
          break;
        case getStatus("mine"):
          if (e.item.getMaxDamage() - e.damage <= Config.autoRepair.start) {
            const nbt = e.item.getNBT();
            if (nbt.has("Enchantments")) {
              const enchantments = nbt.get("Enchantments");
              for (let i = 0; i < enchantments.length(); i++) {
                if (
                  enchantments.get(i).get("id").asString() ===
                  "minecraft:mending"
                ) {
                  Baritone.pause("repair");
                  item = e.item;
                  switchToSword();
                  tp("xp");
                  autoDropIntegration("xp");
                  running = true;
                  hitLoop: while (running) {
                    switch (getStatus()) {
                      case getStatus("repair"):
                        Player.getPlayer().attack();
                        break;
                      case getStatus("idle"):
                        break hitLoop;
                      default:
                        JsMacros.waitForEvent(Config.eventName);
                        break;
                    }
                    Time.sleep(Config.sleep.hit);
                  }
                  switchBack();
                  if (running) {
                    running = false;
                  } else {
                    tp("mine");
                    Baritone.resume();
                  }
                }
              }
            }
          }
          break;
      }
    })
  );
}
