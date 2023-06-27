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
    width: config.gui.component.width,
    height: config.gui.component.height,
    render: function (screen, xOffset, yOffset) {
      screen.addButton(
        xOffset,
        yOffset,
        config.gui.component.width,
        config.gui.component.height,
        1,
        label,
        JavaWrapper.methodToJava(method)
      );
    },
  };
};
