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

module.exports = () => {
  function method() {
    btExecute("stop");
  }
  return {
    type: "specialButton",
    width: config.gui.component.width,
    height: config.gui.component.height,
    render: function (screen, xOffset, yOffset) {
      screen
        .addButton(
          xOffset,
          yOffset,
          config.gui.component.width,
          config.gui.component.height,
          1,
          "STOP",
          JavaWrapper.methodToJava(method)
        )
        .setLabel(getText());
    },
  };
};
