import { toInt } from "../../Helper.mjs";
import VisualComponent from "../VisualComponent.mjs";

export default class Text extends VisualComponent {
  constructor(text) {
    super();
    this.text = text;
  }
  init(screen, x, y) {
    this.elements.push(screen.addText(this.text, x, y, 0xffffff, true));
    this.elements[0].setPos(
      x + toInt(this.width / 2 - this.elements[0].getWidth() / 2),
      y + toInt(this.height / 2 - this.elements[0].getHeight() / 2)
    );
  }
}
