import Config from "./Config.mjs";
import { addStop, toInt } from "./Helper.mjs";
import Sections from "./Sections.mjs";
import { button, visual } from "./components/index.mjs";

class Base extends Array {
  static get [Symbol.species]() {
    return Array;
  }
  height;
  width;
  constructor(...items) {
    super(...items);
    this.parse();
  }
  parse() {
    this.forEach((o, i) => {
      if (o instanceof Base) return;
      if (o) {
        if (typeof o === "string") o = [o];
        if (o instanceof Array) this[i] = new button.command(...o);
        return;
      }
      this[i] = new visual.empty();
    });
  }
  init(screen, x, y) {}
  close(screen) {
    this.forEach((o) => o.close(screen));
  }
}

export class Col extends Base {
  parse() {
    super.parse();
    this.height = this.reduce((p, c) => p + c.height, 0);
    this.width = Math.max(...this.map((e) => e.width));
  }
  init(screen, x, y) {
    this.forEach((o) => {
      o.init(screen, toInt(x + (this.width - o.width) / 2), y);
      y += o.height;
    });
  }
}
export class Row extends Base {
  parse() {
    super.parse();
    this.height = Math.max(...this.map((e) => e.height));
    this.width =
      this.reduce((p, c) => p + c.width, 0) +
      (this.length - 1) * Config.gui.groupSpacing;
  }
  init(screen, x, y) {
    this.forEach((o) => {
      o.init(screen, x, y);
      x += o.width + Config.gui.groupSpacing;
    });
  }
}

// Screen
function screenInit(screen) {
  const x = toInt((screen.getWidth() - Sections.width) / 2);
  const y = toInt((screen.getHeight() - Sections.height) / 2);
  Sections.init(screen, x, y);
}
function screenClose(screen) {
  Sections.close(screen);
}

const Screen = Hud.createScreen("Baritone Selection Manager GUI", false);
Screen.setOnInit(JavaWrapper.methodToJava(screenInit));
Screen.setOnClose(JavaWrapper.methodToJava(screenClose));

addStop("screen", () => {
  Hud.unregisterDraw2D(Screen);
});

export default Screen;
