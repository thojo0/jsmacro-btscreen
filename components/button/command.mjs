import * as Baritone from "../../Baritone.mjs";
import Base from "./Base.mjs";

export default class Command extends Base {
  async = true;
  constructor(command, label = command) {
    super();
    this.command = command;
    this.label = label;
  }
  run() {
    switch (this.command[0]) {
      case "/": // / -> normal chat
        Chat.say(this.command);
        break;
      default: // default baritone
        Baritone.execute(this.command);
        break;
    }
  }
}
