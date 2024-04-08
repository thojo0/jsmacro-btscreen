import * as Baritone from "../../Baritone.mjs";
import { random } from "../../Helper.mjs";
import Config from "../../Config.mjs";

function getText() {
  const builder = Chat.createTextBuilder();
  for (let l = 0; l < 3; l++) {
    builder.append(" ");
    builder.append("STOP");
    builder.withColor(random(255), random(255), random(255));
    builder.withFormatting(
      Boolean(random(1)),
      Boolean(random(1)),
      Boolean(random(1)),
      Boolean(random(1)),
      Boolean(random(1))
    );
    builder.append(" ");
  }
  return builder.build();
}

export default () => {
  function method() {
    Baritone.execute("stop");
  }
  return {
    type: "specialButton",
    width: Config.gui.component.width,
    height: Config.gui.component.height,
    render: function (screen, xOffset, yOffset) {
      screen
        .addButton(
          xOffset,
          yOffset,
          this.width,
          this.height,
          1,
          "STOP",
          JavaWrapper.methodToJava(method)
        )
        .setLabel(getText());
    },
  };
};
