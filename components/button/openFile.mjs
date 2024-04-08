import Config from "../../Config.mjs";

const EditorScreen = Java.type(
  "xyz.wagyourtail.jsmacros.client.gui.screens.EditorScreen"
);

export default (file, label = `Open ${FS.getName(file)}`) => {
  function method() {
    const fileh = FS.open(file).getFile();
    EditorScreen.openAndScrollToIndex(fileh, 0, 0);
  }
  return {
    type: "specialButton",
    width: Config.gui.component.width,
    height: Config.gui.component.height,
    render: function (screen, xOffset, yOffset) {
      screen.addButton(
        xOffset,
        yOffset,
        this.width,
        this.height,
        1,
        label,
        JavaWrapper.methodToJava(method)
      );
    },
  };
};
