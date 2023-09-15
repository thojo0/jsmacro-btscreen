const dirComponentWidth = toInt(config.gui.component.width / 3);

module.exports = (command, text = command) => {
  let amount = "1";

  function inputMethod(value) {
    amount = value;
  }
  function commandMethod(direction) {
    return () => {
      const finalCommand = ["sel", command, "a", direction, amount].join(" ");
      btExecute(finalCommand);
    };
  }

  return {
    type: "dimensionalInput",
    width: dirComponentWidth * 3,
    height: config.gui.component.height * 3,
    render: function (screen, xOffset, yOffset) {
      //left
      screen.addText(
        text,
        xOffset + 3,
        yOffset + config.gui.component.height / 2 - 5,
        0xffffff,
        true
      );
      screen.addButton(
        xOffset,
        yOffset + config.gui.component.height,
        dirComponentWidth,
        config.gui.component.height,
        1,
        "west",
        JavaWrapper.methodToJava(commandMethod("west"))
      );
      // mid
      screen.addButton(
        xOffset + dirComponentWidth,
        yOffset,
        dirComponentWidth,
        config.gui.component.height,
        1,
        "north",
        JavaWrapper.methodToJava(commandMethod("north"))
      );
      screen
        .addTextInput(
          xOffset + dirComponentWidth - 1,
          yOffset + config.gui.component.height - 1,
          dirComponentWidth + 2,
          config.gui.component.height + 2,
          "1",
          JavaWrapper.methodToJava(inputMethod)
        )
        .setText("1");
      screen.addButton(
        xOffset + dirComponentWidth,
        yOffset + config.gui.component.height * 2,
        dirComponentWidth,
        config.gui.component.height,
        1,
        "south",
        JavaWrapper.methodToJava(commandMethod("south"))
      );
      // right
      screen.addButton(
        xOffset + dirComponentWidth * 2,
        yOffset,
        dirComponentWidth,
        config.gui.component.height,
        1,
        "up",
        JavaWrapper.methodToJava(commandMethod("up"))
      );
      screen.addButton(
        xOffset + dirComponentWidth * 2,
        yOffset + config.gui.component.height,
        dirComponentWidth,
        config.gui.component.height,
        1,
        "east",
        JavaWrapper.methodToJava(commandMethod("east"))
      );
      screen.addButton(
        xOffset + dirComponentWidth * 2,
        yOffset + config.gui.component.height * 2,
        dirComponentWidth,
        config.gui.component.height,
        1,
        "down",
        JavaWrapper.methodToJava(commandMethod("down"))
      );
    },
  };
};
