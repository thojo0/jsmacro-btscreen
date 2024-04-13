import { tpCommand } from "./Helper.mjs";
import { button, input, lever } from "./components/index.mjs";

export default [
  {
    title: "Special",
    groups: [
      (() => {
        const arr = [];
        ["mine", "xp", "bed", "haste", "drop"].forEach((name) => {
          const cmd = tpCommand(name);
          if (!arr.includes(cmd)) {
            arr.push(cmd);
          }
        });
        return arr;
      })(),
      [
        new button.stop(),
        new lever.autoSleep(),
        new lever.autoRepair(),
        new lever.autoEat(),
        new lever.autoHaste(),
        new lever.autoDrop(),
      ],
      [
        new button.restartService(),
        new button.openFile(__dirname + "/Config.mjs"),
        new button.setPreset("default"),
        new button.setPreset("farm"),
      ],
    ],
  },
  {
    title: "Selection",
    groups: [
      ["sel undo", "sel pos1"],
      ["sel clear", "sel pos2"],
    ],
  },
  {
    title: "Selection Move",
    groups: [
      [new input.dimensional("shift")],
      [new input.dimensional("expand", "expan")],
      [new input.dimensional("contract", "contr")],
    ],
  },
  {
    title: "Modification",
    groups: [
      [
        new input.text(
          [
            ["sel set", "sel walls", "sel shell"],
            ["", "sel replace"],
          ],
          "<block> | <blocks...> <toblock>"
        ),
      ],
    ],
  },
  {
    title: "Clipboard/Modification",
    groups: [["sel copy"], ["sel paste"], ["sel cleararea"]],
  },
];
