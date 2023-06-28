// Assumes food is held in the offhand
// Right clicks and holds if food level is below threshhold
// Likely to produce undesirable results if you end up right clicking something. Be warned.
// Credits: https://discord.com/channels/732004268948586545/1097289256839434393/1097677403213533185
const label = "AutoEat";

let hungerListener = null;
function startHungerListener() {
  hungerListener = JsMacros.on(
    "HungerChange",
    JavaWrapper.methodToJava((e) => {
      switch (event.getString("status")) {
        case state.mine:
          if (e.foodLevel < config.autoEat.level) {
            log("Eating");
            KeyBind.key("key.mouse.right", true);
            Client.waitTick(config.autoEat.hold);
            KeyBind.key("key.mouse.right", false);
          }
      }
    })
  );
  addStop(label, () => {
    JsMacros.off(hungerListener);
    hungerListener = null;
  });
}
function stopHungerListener() {
  delStop(label, true);
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
      log(label + " enabled");
    } else {
      stopHungerListener();
      log(label + " disabled");
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
