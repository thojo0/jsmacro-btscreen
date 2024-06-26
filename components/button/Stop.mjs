import * as Baritone from "../../Baritone.mjs";
import { random } from "../../Helper.mjs";
import ButtonComponent from "../ButtonComponent.mjs";
import Repeat from "../lever/Repeat.mjs";

function getText() {
  const builder = Chat.createTextBuilder();
  for (let l = 0; l < 3; l++) {
    if (l > 0) {
      builder.append(" ");
    }
    builder.append("STOP");
    builder.withColor(random(255), random(255), random(255));
    builder.withFormatting(
      Boolean(random(1)),
      Boolean(random(1)),
      Boolean(random(1)),
      Boolean(random(1)),
      Boolean(random(1))
    );
  }
  return builder.build();
}

export default class Stop extends ButtonComponent {
  get label() {
    return getText();
  }
  run() {
    Repeat.disable();
    Baritone.execute("stop");
  }
}
