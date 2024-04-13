import * as Baritone from "../../Baritone.mjs";
import Config from "../../Config.mjs";
import Base from "./Base.mjs";

const elementWidth = Config.gui.component.width;
const elementHeight = Config.gui.component.height;
const groupSpacing = Config.gui.groupSpacing;

export default class Text extends Base {
  constructor(commands, suggestion = "", defaultValue = "") {
    super();
    this.commands = commands;
    this.suggestion = suggestion;
    this.value = this.defaultValue = defaultValue;
    const elementCount = Math.max(...commands.map((e) => e.length));
    this.width =
      elementWidth * elementCount + groupSpacing * (elementCount - 1);
    this.height = elementHeight * (commands.length + 1);
  }
  getCommandMethod(command) {
    return JavaWrapper.methodToJava(() => {
      const finalCommand = `${command} ${this.value}`;
      Baritone.execute(finalCommand);
    });
  }
  init(screen, x, y) {
    // Input
    this.elements.push(
      screen
        .addTextInput(
          x,
          y,
          this.width - elementHeight - 3,
          elementHeight,
          "1",
          JavaWrapper.methodToJava((v) => {
            this.value = v;
          })
        )
        .setText(this.value)
    );
    this.elements.push(
      screen.addButton(
        x + this.width - elementHeight - 1,
        y,
        elementHeight,
        elementHeight,
        1,
        "R",
        JavaWrapper.methodToJava(() => {
          this.value = this.defaultValue;
          this.elements[0].setText(this.value);
        })
      )
    );
    // Buttons
    this.commands.forEach((cmds) => {
      y += elementHeight;
      for (let i = 0; i < cmds.length; i++) {
        const cmd = cmds[i];
        if (cmd) {
          this.elements.push(
            screen.addButton(
              x + elementWidth * i + groupSpacing * i,
              y,
              elementWidth,
              elementHeight,
              1,
              cmd,
              this.getCommandMethod(cmd)
            )
          );
        }
      }
    });
  }
}
