module.exports = (commands, defaultText = "") => {
  let blocks = defaultText;
  const componentCount = Math.max(...commands.map((e) => e.length));

  function inputMethod(value) {
    blocks = value;
  }
  function commandMethod(command) {
    return () => {
      const finalCommand = [command, blocks].join(" ");
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
      config.componentWidth * componentCount +
      config.groupSpacing * (componentCount - 1),
    height: config.componentHeight * (commands.length + 1),
    render: function (screen, xOffset, yOffset) {
      // Input
      const textInput = screen
        .addTextInput(
          xOffset,
          yOffset,
          this.width - config.componentHeight - 3,
          config.componentHeight,
          "1",
          JavaWrapper.methodToJava(inputMethod)
        )
        .setText(blocks);
      screen.addButton(
        xOffset + this.width - config.componentHeight - 1,
        yOffset,
        config.componentHeight,
        config.componentHeight,
        1,
        "R",
        JavaWrapper.methodToJava(resetInputMethod(textInput))
      );

      // Buttons
      commands.forEach((cmds) => {
        yOffset += config.componentHeight;
        for (let i = 0; i < cmds.length; i++) {
          const cmd = cmds[i];
          if (cmd) {
            screen.addButton(
              xOffset + config.componentWidth * i + config.groupSpacing * i,
              yOffset,
              config.componentWidth,
              config.componentHeight,
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
