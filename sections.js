const home = config.home;
const dimensionalInput = require("./components/dimensionalInput.js");
const textInput = require("./components/textInput.js");
const specialButton = require("./components/specialButton.js");

module.exports = [
  {
    title: "Special",
    groups: [
      [
        home.mine.startsWith("/") ? home.mine : home.getcmd + " " + home.mine,
        home.xp.startsWith("/") ? home.xp : home.getcmd + " " + home.xp,
        home.bed.startsWith("/") ? home.bed : home.getcmd + " " + home.bed,
      ],
      [
        specialButton.stop(),
        specialButton.autoSleep(),
        specialButton.autoRepair(),
        specialButton.autoEat(),
      ],
      [
        specialButton.setBtPreset("default"),
        specialButton.restartService(),
        specialButton.openFile(__dirname + "/config.js"),
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
      [dimensionalInput("shift")],
      [dimensionalInput("expand", "expan")],
      [dimensionalInput("contract", "contr")],
    ],
  },
  {
    title: "Modification",
    groups: [
      [
        textInput(
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
