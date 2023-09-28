module.exports = (commands, defaultText = "") => {
  let blocks = defaultText;
  const componentCount = Math.max(...commands.map((e) => e.length));

  function inputMethod(value) {
    blocks = value;
  }
  function commandMethod(command) {
    return () => {
      const finalCommand = `${command} ${blocks}`;
      btExecute(finalCommand);
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
      config.gui.component.width * componentCount +
      config.gui.groupSpacing * (componentCount - 1),
    height: config.gui.component.height * (commands.length + 1),
    render: function (screen, xOffset, yOffset) {
      // Input
      const textInput = screen
        .addTextInput(
          xOffset,
          yOffset,
          this.width - config.gui.component.height - 3,
          config.gui.component.height,
          "1",
          JavaWrapper.methodToJava(inputMethod)
        )
        .setText(blocks);
      screen.addButton(
        xOffset + this.width - config.gui.component.height - 1,
        yOffset,
        config.gui.component.height,
        config.gui.component.height,
        1,
        "R",
        JavaWrapper.methodToJava(resetInputMethod(textInput))
      );

      // Buttons
      commands.forEach((cmds) => {
        yOffset += config.gui.component.height;
        for (let i = 0; i < cmds.length; i++) {
          const cmd = cmds[i];
          if (cmd) {
            screen.addButton(
              xOffset + config.gui.component.width * i + config.gui.groupSpacing * i,
              yOffset,
              config.gui.component.width,
              config.gui.component.height,
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
