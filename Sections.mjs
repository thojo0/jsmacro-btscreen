import Config from "./Config.mjs";
import { tpCommand } from "./Helper.mjs";
import { Col, Row } from "./Screen.mjs";
import { button, input, lever, visual } from "./components/index.mjs";
import Repeat from "./components/lever/Repeat.mjs";

function getBlockInput(command) {
  return [() => `${command} ${input.text.get("Blocks")}`, command];
}

export default new Row(
  (Config.leftExtraButtons ??= []).length > 0
    ? new Col(new visual.text("Extra"), ...Config.leftExtraButtons)
    : "",
  new visual.empty(Config.gui.groupSpacing * 3),
  new Col(
    new visual.text("Special"),
    new Row(
      new Col(
        ...(() => {
          const arr = [];
          ["mine", "xp", "bed", "haste", "drop"].forEach((name) => {
            const cmd = tpCommand(name);
            if (!arr.includes(cmd)) {
              arr.push(cmd);
            }
          });
          return arr;
        })()
      ),
      new Col(
        new button.stop(),
        new lever.autoSleep(),
        new lever.autoRepair(),
        new lever.autoEat(),
        new lever.autoHaste(),
        new lever.autoDrop()
      ),
      new Col(
        new button.restartService(),
        new button.openFile(__dirname + "/Config.mjs"),
        new button.setPreset("default"),
        new button.setPreset("farm"),
        new input.text("Repeat", "1d 1h 1m", "2h16m32s"),
        new Repeat()
      )
    ),
    new visual.empty(null, Config.gui.component.height / 4),
    new visual.text("Selection"),
    new Row(new Col("sel undo", "sel pos1"), new Col("sel clear", "sel pos2")),
    new visual.empty(null, Config.gui.component.height / 4),
    new visual.text("Selection Move"),
    new Row(
      new input.dimensional("shift"),
      new input.dimensional("expand", "expan"),
      new input.dimensional("contract", "contr")
    ),
    new visual.empty(null, Config.gui.component.height / 4),
    new visual.text("Modification"),
    new input.text("Blocks", "<block> | <blocks...> <toblock>", "", 3),
    new Row(
      getBlockInput("sel set"),
      getBlockInput("sel walls"),
      getBlockInput("sel shell")
    ),
    new Row(
      new button.function(
        input.text.set,
        "Amethyst Preset",
        "Blocks",
        "small_amethyst_bud medium_amethyst_bud large_amethyst_bud amethyst_cluster air"
      ),
      getBlockInput("sel replace")
    ),
    new visual.empty(null, Config.gui.component.height / 4),
    new visual.text("Clipboard/Modification"),
    new Row("sel copy", "sel paste", "sel cleararea")
  ),
  new visual.empty(Config.gui.groupSpacing * 3),
  (Config.rightExtraButtons ??= []).length > 0
    ? new Col(new visual.text("Extra"), ...Config.rightExtraButtons)
    : ""
);
