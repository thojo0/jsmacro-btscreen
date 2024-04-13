import Base from "./Base.mjs";

const EditorScreen = Java.type(
  "xyz.wagyourtail.jsmacros.client.gui.screens.EditorScreen"
);
const JsM = Java.type("xyz.wagyourtail.jsmacros.client.JsMacros");

export default class OpenFile extends Base {
  constructor(file, label = `Open ${FS.getName(file)}`) {
    super();
    this.file = file;
    this.label = label;
  }
  run(_, screen) {
    const file = FS.open(this.file).getFile();
    const prevScreen = JsM.prevScreen;
    try {
      Hud.openScreen(new EditorScreen(screen, file));
    } catch (e) {
      throw e;
    } finally {
      JsM.prevScreen = prevScreen; // We have to set this value again in any case, else the JsMacros-ConfigScreen will be inaccessibile until client restart
    }
  }
}
