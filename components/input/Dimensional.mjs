import * as Baritone from "../../Baritone.mjs";
import Config from "../../Config.mjs";
import { toInt } from "../../Helper.mjs";
import InputComponent from "../InputComponent.mjs";

const elementHeight = Config.gui.component.height;

export default class Dimensional extends InputComponent {
  elementWidth = toInt(this.width / 3);
  amount = "1";
  constructor(command, text = command) {
    super();
    this.command = command;
    this.text = text;
    this.height = elementHeight * 3;
  }
  getCommandMethod(direction) {
    return JavaWrapper.methodToJava(() => {
      Baritone.execute(`sel ${this.command} a ${direction} ${this.amount}`);
    });
  }
  init(screen, x, y) {
    this.elements.push(
      //left
      screen.addText(this.text, x + 3, y + elementHeight / 2 - 5, 0xffffff, true),
      screen.addButton(
        x,
        y + elementHeight,
        this.elementWidth,
        elementHeight,
        1,
        "west",
        this.getCommandMethod("west")
      ),
      // mid
      screen.addButton(
        x + this.elementWidth,
        y,
        this.elementWidth,
        elementHeight,
        1,
        "north",
        this.getCommandMethod("north")
      ),
      screen
        .addTextInput(
          x + this.elementWidth - 1,
          y + elementHeight - 1,
          this.elementWidth + 2,
          elementHeight + 2,
          "1",
          JavaWrapper.methodToJava((v) => {
            this.amount = v;
          })
        )
        .setText(this.amount),
      screen.addButton(
        x + this.elementWidth,
        y + elementHeight * 2,
        this.elementWidth,
        elementHeight,
        1,
        "south",
        this.getCommandMethod("south")
      ),
      // right
      screen.addButton(
        x + this.elementWidth * 2,
        y,
        this.elementWidth,
        elementHeight,
        1,
        "up",
        this.getCommandMethod("up")
      ),
      screen.addButton(
        x + this.elementWidth * 2,
        y + elementHeight,
        this.elementWidth,
        elementHeight,
        1,
        "east",
        this.getCommandMethod("east")
      ),
      screen.addButton(
        x + this.elementWidth * 2,
        y + elementHeight * 2,
        this.elementWidth,
        elementHeight,
        1,
        "down",
        this.getCommandMethod("down")
      )
    );
  }
}
