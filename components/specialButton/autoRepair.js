state.repair = "Repairing";
const label = "AutoRepair";

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
let damageListener = null;
function startDamageListener() {
  let running;
  let item;
  damageListener = JsMacros.on(
    "ItemDamage",
    JavaWrapper.methodToJava((e) => {
      switch (event.getString("status")) {
        case state.repair:
          if (
            e.item.isItemEqualIgnoreDamage(item) &&
            e.damage <= config.autoRepair.stop
          ) {
            running = false;
          }
          break;
        case state.mine:
          if (e.item.getMaxDamage() - e.damage <= config.autoRepair.start) {
            const nbt = e.item.getNBT();
            if (nbt.has("Enchantments")) {
              const enchantments = nbt.get("Enchantments");
              for (let i = 0; i < enchantments.length(); i++) {
                if (
                  enchantments.get(i).get("id").asString() ===
                  "minecraft:mending"
                ) {
                  event.putString("status", state.repair);
                  item = e.item;
                  btExecute("pause");
                  Time.sleep(1);
                  switchToSword();
                  teleport("xp");
                  event.getObject("AutoDropIntegration")("xp");
                  running = true;
                  hitLoop: while (running) {
                    switch (event.getString("status")) {
                      case state.repair:
                        Player.getPlayer().attack();
                        break;
                      case state.idle:
                        break hitLoop;
                      default:
                        JsMacros.waitForEvent(config.eventName);
                        break;
                    }
                    Time.sleep(config.sleep.hit);
                  }
                  switchBack();
                  if (running) {
                    running = false;
                  } else {
                    teleport("mine");
                    btExecute("resume");
                    Time.sleep(1);
                    event.putString("status", state.mine);
                  }
                }
              }
            }
          }
          break;
      }
    })
  );
  addStop(label, () => {
    JsMacros.off(damageListener);
    damageListener = null;
  });
  log(`${label} enabled`);
}
function stopDamageListener() {
  delStop(label, true);
  log(`${label} disabled`);
}
function getText() {
  const builder = Chat.createTextBuilder().append(label);
  if (damageListener === null) {
    builder.withColor(0xc);
  } else {
    builder.withColor(0x2);
  }
  return builder.build();
}

module.exports = () => {
  let button;
  function method() {
    if (damageListener === null) {
      startDamageListener();
    } else {
      stopDamageListener();
    }
    button.setLabel(getText());
  }
  return {
    type: "specialButton",
    width: config.gui.component.width,
    height: config.gui.component.height,
    render: function (screen, xOffset, yOffset) {
      button = screen.addButton(
        xOffset,
        yOffset,
        this.width,
        this.height,
        1,
        label,
        JavaWrapper.methodToJava(method)
      );
      button.setLabel(getText());
    },
  };
};
