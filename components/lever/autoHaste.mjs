import * as Baritone from "../../Baritone.mjs";
import { addStatus, addStop, delStop, getStatus, log, tp } from "../../Helper.mjs";
import Config from "../../Config.mjs";

const label = "AutoHaste";
addStatus("haste", "Refreshing Haste")

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
      switch (getStatus()) {
        case getStatus("mine"):
          if (hasHaste(true)) {
            break;
          }
          Baritone.pause("haste");
          tp("haste");
          event.getObject("AutoDropIntegration")("haste");
          while (!hasHaste()) {
            JsMacros.waitForEvent("StatusEffectUpdate");
          }
          tp("mine");
          Baritone.resume();
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

export default () => {
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
