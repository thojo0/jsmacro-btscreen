import * as Baritone from "../../Baritone.mjs";
import Config from "../../Config.mjs";

export default (commands, defaultText = "") => {
  let blocks = defaultText;
  const componentCount = Math.max(...commands.map((e) => e.length));

  function inputMethod(value) {
    blocks = value;
  }
  function commandMethod(command) {
    return () => {
      const finalCommand = `${command} ${blocks}`;
      Baritone.execute(finalCommand);
    };
  }
  function resetInputMethod(input) {
    return () => {
      input.setText(defaultText);
    };
  }

  return {
    type: "textInput",
    width:
      Config.gui.component.width * componentCount +
      Config.gui.groupSpacing * (componentCount - 1),
    height: Config.gui.component.height * (commands.length + 1),
    render: function (screen, xOffset, yOffset) {
      // Input
      const textInput = screen
        .addTextInput(
          xOffset,
          yOffset,
          this.width - Config.gui.component.height - 3,
          Config.gui.component.height,
          "1",
          JavaWrapper.methodToJava(inputMethod)
        )
        .setText(blocks);
      screen.addButton(
        xOffset + this.width - Config.gui.component.height - 1,
        yOffset,
        Config.gui.component.height,
        Config.gui.component.height,
        1,
        "R",
        JavaWrapper.methodToJava(resetInputMethod(textInput))
      );

      // Buttons
      commands.forEach((cmds) => {
        yOffset += Config.gui.component.height;
        for (let i = 0; i < cmds.length; i++) {
          const cmd = cmds[i];
          if (cmd) {
            screen.addButton(
              xOffset + Config.gui.component.width * i + Config.gui.groupSpacing * i,
              yOffset,
              Config.gui.component.width,
              Config.gui.component.height,
              1,
              cmd,
              JavaWrapper.methodToJava(commandMethod(cmd))
            );
          }
        }
      });
    },
  };
};
