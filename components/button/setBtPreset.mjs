import * as Baritone from "../../Baritone.mjs";
import Config from "../../Config.mjs";

export default (preset) => {
  function method() {
    Baritone.setPreset(preset);
  }
  return {
    type: "specialButton",
    width: Config.gui.component.width,
    height: Config.gui.component.height,
    render: function (screen, xOffset, yOffset) {
      screen.addButton(
        xOffset,
        yOffset,
        this.width,
        this.height,
        1,
        `Preset: ${preset}`,
        JavaWrapper.methodToJava(method)
      );
    },
  };
};
