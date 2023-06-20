// Global
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
function toInt(a) {
  return Math.round(a);
}
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
function teleport(home) {
  Chat.say(
    config.home[home].startsWith("/")
      ? config.home[home]
      : config.home.getcmd + " " + config.home[home],
    true
  );
  Time.sleep(config.home.sleep);
}
const config = require("./config.js");
const sections = require("./sections.js");

// Expose Things
event.stopListener = JavaWrapper.methodToJava(() => {
  Object.values(event.getObject("stopObject")).forEach((s) => s());
});
event.putObject("log", log);
event.putObject("addStop", addStop);
event.putObject("delStop", delStop);
if (btIsActive()) {
  event.putString("status", state.mine);
} else {
  event.putString("status", state.idle);
}

const theScreen = Hud.createScreen("Baritone Selection Manager GUI", false);
const draw2D = Hud.createDraw2D();

/**
 * Gets the simple section group data and turns it into final components
 */
function setSectionComponents(section) {
  section.groups = section.groups.map((group) => {
    return group.map((component) => {
      let type = typeof component;
      if (type == "string") {
        let command = component;
        if (!command)
          return {
            type: "empty",
            width: config.componentWidth,
            height: config.componentHeight,
            render: function (screen, xOffset, yOffset) {},
          };
        let method = function () {
          switch (command[0]) {
            case "/":
              Chat.say(command);
              break;
            default:
              btExecute(command);
              break;
          }
        };
        return {
          type: "commandButton",
          width: config.componentWidth,
          height: config.componentHeight,
          render: function (screen, xOffset, yOffset) {
            screen.addButton(
              xOffset,
              yOffset,
              config.componentWidth,
              config.componentHeight,
              1,
              command,
              JavaWrapper.methodToJavaAsync(method)
            );
          },
        };
      } else if (component.constructor.name == "Array") {
        let command = component[1];
        let method = function () {
          switch (command[0]) {
            case "/":
              Chat.say(command);
              break;
            default:
              btExecute(command);
              break;
          }
        };
        return {
          type: "customTitleCommandButton",
          width: config.componentWidth,
          height: config.componentHeight,
          render: function (screen, xOffset, yOffset) {
            screen.addButton(
              xOffset,
              yOffset,
              config.componentWidth,
              config.componentHeight,
              1,
              component[0],
              JavaWrapper.methodToJavaAsync(method)
            );
          },
        };
      } else {
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
        width: prev.width + groupDimensions.width + config.groupSpacing,
        height: Math.max(prev.height, groupDimensions.height),
      };
    },
    { width: -config.groupSpacing, height: 0 }
  );
  section.height =
    (section.title ? config.titleHeight : 0) + sectionDimensions.height;
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
      toInt(sectionOffset.y + config.titleHeight - 20)
    );
    sectionOffset.y += config.titleHeight;

    // render the groups
    section.groups.forEach((group) => {
      let groupOffset = { x: sectionOffset.x, y: sectionOffset.y };
      group.forEach((component) => {
        component.render(theScreen, toInt(groupOffset.x), toInt(groupOffset.y));
        groupOffset.y += component.height;
      });
      sectionOffset.x += getGroupWidth(group) + config.groupSpacing;
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
