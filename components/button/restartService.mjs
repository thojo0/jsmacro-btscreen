import Config from "../../Config.mjs";
import { restartService } from "../../Helper.mjs";

export default () => {
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
        "Restart Service",
        JavaWrapper.methodToJava(() => restartService(screen))
      );
    },
  };
};
