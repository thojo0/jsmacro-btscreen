// BEGIN : Globals
const config = require("./config.js");
function log(text) {
  const builder = Chat.createTextBuilder();
  builder.append("[");
  builder.withColor(0x5);
  builder.append(event.serviceName);
  builder.withColor(0xd);
  builder.append("] ");
  builder.withColor(0x5);
  builder.append(text);
  builder.withColor(0x7);
  Chat.log(builder.build());
}
function addStop(name, func) {
  let stopObject = event.getObject("stopObject");
  if (!stopObject) stopObject = {};
  stopObject[name] = func;
  event.putObject("stopObject", stopObject);
}
function delStop(name, exec) {
  const stopObject = event.getObject("stopObject");
  if (exec) stopObject[name]();
  delete stopObject[name];
  event.putObject("stopObject", stopObject);
}
function toInt(a, round) {
  if (round) {
    return Math.round(a);
  } else {
    return Math.floor(a);
  }
}
function random(range) {
  return toInt(Math.random() * range, true);
}
const statusEvent = JsMacros.createCustomEvent(config.eventName);
statusEvent.registerEvent();
const baritone = Java.type("baritone.api.BaritoneAPI")
  .getProvider()
  .getPrimaryBaritone();
const btExecute = baritone.getCommandManager().execute; // baritone.leijurv.com/baritone/api/command/manager/ICommandManager.html
const state = {
  idle: "Idle",
  mine: "Mining",
};
function btIsActive() {
  return baritone.getPathingControlManager().mostRecentInControl().isPresent();
}
function setBtPreset(preset) {
  for (let [key, value] of Object.entries(config.baritone[preset])) {
    if (value.constructor.name === "Array") {
      value = value.join();
    }
    btExecute(`set ${key} ${value}`);
  }
}
let lastTeleport = "mine";
function teleport(home) {
  if (config.home[lastTeleport] !== config.home[home]) {
    if (lastTeleport === "mine") {
      Chat.say(`${config.home.setcmd} ${config.home.mine}`, true);
    }
    Chat.say(
      config.home[home].startsWith("/")
        ? config.home[home]
        : `${config.home.getcmd} ${config.home[home]}`,
      true
    );
    Time.sleep(config.sleep.tp);
  }
  lastTeleport = home;
}
const sections = require("./sections.js");
// END : Globals

// BEGIN : Expose Things
event.stopListener = JavaWrapper.methodToJava(() => {
  Object.values(event.getObject("stopObject")).forEach((s) => s());
});
event.putObject("log", log);
event.putObject("setBtPreset", setBtPreset);
event.putObject("addStop", addStop);
event.putObject("delStop", delStop);
if (btIsActive()) {
  event.putString("status", state.mine);
} else {
  event.putString("status", state.idle);
}
// END : Expose Things

// BEGIN : Screen Service
const theScreen = Hud.createScreen("Baritone Selection Manager GUI", false);
const draw2D = Hud.createDraw2D();

/**
 * Gets the simple section group data and turns it into final components
 */
const commandButton = require("./components/commandButton.js");
function setSectionComponents(section) {
  section.groups = section.groups.map((group) => {
    return group.map((component) => {
      switch (component.constructor.name) {
        case "String":
          return commandButton(component);

        case "Array":
          return commandButton(component[0], component[1]);

        default:
          return component;
      }
    });
  });
}

/**
 * Setting the dimensions for each section based on the width and height of the components
 * in each group.
 *
 * @info there is a negative groupSpacing value in the initial reducer to remove the last spacing
 * */
function setSectionDimensions(section) {
  let sectionDimensions = section.groups.reduce(
    (prev, curr, ind) => {
      let groupDimensions = curr.reduce(
        (prev, curr) => {
          return {
            width: Math.max(prev.width, curr.width),
            height: prev.height + curr.height,
          };
        },
        { width: 0, height: 0 }
      );
      return {
        width: prev.width + groupDimensions.width + config.gui.groupSpacing,
        height: Math.max(prev.height, groupDimensions.height),
      };
    },
    { width: -config.gui.groupSpacing, height: 0 }
  );
  section.height =
    (section.title ? config.gui.titleHeight : 0) + sectionDimensions.height;
  section.width = sectionDimensions.width;
}

function getGroupWidth(group) {
  return group.reduce((prev, curr) => Math.max(prev, curr.width), 0);
}

function renderTitle(screen, title, xOffset, yOffset) {
  let textElement = screen.addText(title, xOffset, yOffset, 0xffffff, true);
  textElement.setPos(toInt(xOffset - textElement.getWidth() / 2), yOffset + 5);
}

function screenInit() {
  sections.forEach(setSectionComponents);
  sections.forEach(setSectionDimensions);
  const totalHeight = sections.reduce((prev, curr) => prev + curr.height, 0);
  const totalWidth = sections.reduce(
    (prev, curr) => Math.max(prev, curr.width),
    0
  );
  const screenWidth = draw2D.getWidth();
  const screenHeight = draw2D.getHeight();
  const xOffset = toInt(screenWidth / 2);
  const yOffset = toInt(screenHeight / 2) - totalHeight / 2;
  let baseOffset = { x: xOffset, y: yOffset };
  // render sections
  sections.forEach((section) => {
    let sectionOffset = {
      x: baseOffset.x - section.width / 2,
      y: baseOffset.y,
    };
    // render the title
    renderTitle(
      theScreen,
      section.title,
      toInt(screenWidth / 2),
      toInt(sectionOffset.y + config.gui.titleHeight - 20)
    );
    sectionOffset.y += config.gui.titleHeight;

    // render the groups
    section.groups.forEach((group) => {
      let groupOffset = { x: sectionOffset.x, y: sectionOffset.y };
      group.forEach((component) => {
        component.render(theScreen, toInt(groupOffset.x), toInt(groupOffset.y));
        groupOffset.y += component.height;
      });
      sectionOffset.x += getGroupWidth(group) + config.gui.groupSpacing;
    });
    baseOffset.y += section.height;
  });
}
theScreen.setOnInit(JavaWrapper.methodToJava(screenInit));

addStop("screen", () => {
  event.remove("screen");
  Hud.unregisterDraw2D(theScreen);
});
require("./Listener.js");

event.putObject("screen", theScreen);
// END : Screen Service
