state.haste = "Refreshing Haste";
const label = "AutoHaste";

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
      switch (event.getString("status")) {
        case state.mine:
          if (hasHaste(true)) {
            break;
          }
          btPause("haste");
          teleport("haste");
          event.getObject("AutoDropIntegration")("haste");
          while (!hasHaste()) {
            JsMacros.waitForEvent("StatusEffectUpdate");
          }
          teleport("mine");
          btResume();
          break;
      }
    })
  );
  addStop(label, () => {
    JsMacros.off(tickListener);
    tickListener = null;
  });
  log(`${label} enabled`);
}
function stopTickListener() {
  delStop(label, true);
  log(`${label} disabled`);
}
function getText() {
  const builder = Chat.createTextBuilder().append(label);
  if (tickListener === null) {
    builder.withColor(0xc);
  } else {
    builder.withColor(0x2);
  }
  return builder.build();
}

module.exports = () => {
  let button;
  function method() {
    if (tickListener === null) {
      startTickListener();
    } else {
      stopTickListener();
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
