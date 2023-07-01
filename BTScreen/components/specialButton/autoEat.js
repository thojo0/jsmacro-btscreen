// Assumes food is held in the offhand
// Right clicks and holds if food level is below threshhold
// Likely to produce undesirable results if you end up right clicking something. Be warned.
// Inspired by: https://discord.com/channels/732004268948586545/1097289256839434393/1097677403213533185
const label = "AutoEat";

function getOffhand(inv = Player.openInventory()) {
  const invMap = inv.getMap();
  const offhand = inv.getSlot(invMap.offhand[0]);
  return offhand;
}
function getHunger(itemStack) {
  return itemStack.getRaw().method_7909().method_19264().method_19230();
}
function eat() {
  const getFoodLevel = Player.getPlayer().getFoodLevel;
  const foodLevel = getFoodLevel();
  const stopTime = Time.time() + config.autoEat.maxHold;
  log("Eating");
  KeyBind.key("key.mouse.right", true);
  while (foodLevel === getFoodLevel() && stopTime > Time.time()) {
    Client.waitTick(config.sleep.check);
  }
  KeyBind.key("key.mouse.right", false);
}

let hungerListener = null;
function startHungerListener() {
  hungerListener = JsMacros.on(
    "HungerChange",
    JavaWrapper.methodToJava((e) => {
      switch (event.getString("status")) {
        case state.mine:
          const offhand = getOffhand();
          if (offhand.isFood()) {
            let minLevel = config.autoEat.level;
            if (minLevel === null) {
              minLevel = 21 - getHunger(offhand);
            }
            if (minLevel < 21) {
              if (e.foodLevel < minLevel) {
                eat(offhand);
              }
            }
          }
          break;
      }
    })
  );
  addStop(label, () => {
    JsMacros.off(hungerListener);
    hungerListener = null;
  });
  log(label + " enabled");
}
function stopHungerListener() {
  delStop(label, true);
  log(label + " disabled");
}
function getText() {
  const builder = Chat.createTextBuilder().append(label);
  if (hungerListener === null) {
    builder.withColor(0xc);
  } else {
    builder.withColor(0x2);
  }
  return builder.build();
}

module.exports = () => {
  let button;
  function method() {
    if (hungerListener === null) {
      startHungerListener();
    } else {
      stopHungerListener();
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
        config.gui.component.width,
        config.gui.component.height,
        1,
        label,
        JavaWrapper.methodToJava(method)
      );
      button.setLabel(getText());
    },
  };
};
