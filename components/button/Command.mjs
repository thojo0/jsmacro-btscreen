import * as Baritone from "../../Baritone.mjs";
import ButtonComponent from "../ButtonComponent.mjs";

export default class Command extends ButtonComponent {
  async = true;
  constructor(command, label = command) {
    super();
    this.command = command;
    this.label = label;
  }
  run() {
    let cmd = this.command;
    if (typeof cmd === "function") cmd = cmd();
    if (typeof cmd !== "string" || cmd.length <= 0) return;
    switch (cmd[0]) {
      // normal chat
      case "/":
      case " ":
        Chat.say(cmd.trim());
        break;
      default: // default baritone
        Baritone.execute(cmd);
        break;
    }
  }
}
