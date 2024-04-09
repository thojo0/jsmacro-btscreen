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

const label = "AutoDrop";
addStatus("drop", "Dropping Items");

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
addStop(`${label}Event`, () => {
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
  addStop(label, () => {
    JsMacros.off(pickupListener);
    pickupListener = null;
  });
  log(`${label} enabled`);
}
function stopEffectListener() {
  delStop(label, true);
  log(`${label} disabled`);
}
function getText() {
  const builder = Chat.createTextBuilder().append(label);
  if (pickupListener === null) {
    builder.withColor(0xc);
  } else {
    builder.withColor(0x2);
  }
  return builder.build();
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

export default () => {
  let button;
  function method() {
    if (pickupListener === null) {
      startEffectListener();
    } else {
      stopEffectListener();
    }
    button.setLabel(getText());
  }
  return {
    type: "specialButton",
    width: Config.gui.component.width,
    height: Config.gui.component.height,
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
