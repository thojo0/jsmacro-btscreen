module.exports = (preset) => {
  function method() {
    setBtPreset(preset);
  }
  return {
    type: "specialButton",
    width: config.gui.component.width,
    height: config.gui.component.height,
    render: function (screen, xOffset, yOffset) {
      screen.addButton(
        xOffset,
        yOffset,
        config.gui.component.width,
        config.gui.component.height,
        1,
        "Preset: " + preset,
        JavaWrapper.methodToJava(method)
      );
    },
  };
};
