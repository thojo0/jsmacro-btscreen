import * as Baritone from "../../Baritone.mjs";
import Config from "../../Config.mjs";

export default (command, label = command) => {
  function method() {
    switch (command[0]) {
      case "/": // / -> normal chat
        Chat.say(command);
        break;
      default: // default baritone
        Baritone.execute(command);
        break;
    }
  }
  const button = {
    width: Config.gui.component.width,
    height: Config.gui.component.height,
  };
  if (command) {
    button.type = "commandButton";
    button.render = function (screen, xOffset, yOffset) {
      screen.addButton(
        xOffset,
        yOffset,
        button.width,
        button.height,
        1,
        label,
        JavaWrapper.methodToJavaAsync(method)
      );
    };
  } else {
    button.type = "empty";
    button.render = function (_screen, _xOffset, _yOffset) {};
  }
  return button;
};
