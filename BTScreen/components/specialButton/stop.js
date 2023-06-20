function getText() {
  const builder = Chat.createTextBuilder();
  for (let l = 0; l < 3; l++) {
    builder.append(" ");
    builder.append("STOP");
    builder.withColor(
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256)
    );
    builder.withFormatting(
      Boolean(Math.floor(Math.random() * 2)),
      Boolean(Math.floor(Math.random() * 2)),
      Boolean(Math.floor(Math.random() * 2)),
      Boolean(Math.floor(Math.random() * 2)),
      Boolean(Math.floor(Math.random() * 2))
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
    width: config.componentWidth,
    height: config.componentHeight,
    render: function (screen, xOffset, yOffset) {
      screen
        .addButton(
          xOffset,
          yOffset,
          config.componentWidth,
          config.componentHeight,
          1,
          "STOP",
          JavaWrapper.methodToJava(method)
        )
        .setLabel(getText());
    },
  };
};
