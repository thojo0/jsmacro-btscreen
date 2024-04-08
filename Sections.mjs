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
        button.stop(),
        lever.autoSleep(),
        lever.autoRepair(),
        lever.autoEat(),
        lever.autoHaste(),
        lever.autoDrop(),
      ],
      [
        button.setBtPreset("default"),
        button.restartService(),
        button.openFile(__dirname + "/Config.mjs"),
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
      [input.dimensional("shift")],
      [input.dimensional("expand", "expan")],
      [input.dimensional("contract", "contr")],
    ],
  },
  {
    title: "Modification",
    groups: [
      [
        input.text(
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
