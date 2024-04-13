import Config from "../Config.mjs";

export default class Empty {
  width = Config.gui.component.width;
  height = Config.gui.component.height;
  elements = [];
  init(screen, x, y) {}
  close(screen) {
    this.elements = [];
  }
}
