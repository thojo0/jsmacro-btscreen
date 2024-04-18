import { toInt } from "../../Helper.mjs";
import VisualComponent from "../VisualComponent.mjs";

export default class Empty extends VisualComponent {
  constructor(width = null, height = null) {
    super();
    if (width !== null) this.width = toInt(width);
    if (height !== null) this.height = toInt(height);
  }
}
