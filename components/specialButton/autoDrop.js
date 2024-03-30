state.drop = "Dropping Items";
const label = "AutoDrop";

let slots;
function dropSlots() {
  const inv = Player.openInventory();
  slots.forEach((slot) => {
    inv.dropSlot(slot, true);
  });
  Client.waitTick(config.sleep.drop);
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
const eventListener = JsMacros.on(
  config.eventName,
  JavaWrapper.methodToJava((e) => {
    if (e.getString("oldStatus") === state.idle) {
      setSlots();
    }
  })
);
addStop(`${label}Event`, () => {
  JsMacros.off(eventListener);
});

let pickupListener = null;
function startEffectListener() {
  setSlots();
  pickupListener = JsMacros.on(
    "ItemPickup",
    JavaWrapper.methodToJava(() => {
      switch (event.getString("status")) {
        case state.mine:
          if (Player.openInventory().findFreeInventorySlot() !== -1) {
            break;
          }
          btPause("drop");
          teleport("drop");
          dropSlots();
          teleport("mine");
          btResume();
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

function dropIntegration(home) {
  if (
    config.autoDrop.integration &&
    pickupListener !== null &&
    config.home.drop === config.home[home]
  ) {
    dropSlots();
  }
}
event.putObject("AutoDropIntegration", dropIntegration);

module.exports = () => {
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
