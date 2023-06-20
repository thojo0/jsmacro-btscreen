const EditorScreen = Java.type(
  "xyz.wagyourtail.jsmacros.client.gui.screens.EditorScreen"
);

module.exports = (file, label = "Open " + FS.getName(file)) => {
  function method() {
    const fileh = FS.open(file).getFile();
    EditorScreen.openAndScrollToIndex(fileh, 0, 0);
  }
  return {
    type: "specialButton",
    width: config.componentWidth,
    height: config.componentHeight,
    render: function (screen, xOffset, yOffset) {
      screen.addButton(
        xOffset,
        yOffset,
        config.componentWidth,
        config.componentHeight,
        1,
        label,
        JavaWrapper.methodToJava(method)
      );
    },
  };
};
