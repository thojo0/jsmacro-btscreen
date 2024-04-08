import Config from "./Config.mjs";
import * as Baritone from "./Baritone.mjs";
import { addStop, delStop, init, log, toInt } from "./Helper.mjs";
import Sections from "./Sections.mjs";
import "./Listener.mjs";

init();

event.putObject("Baritone", Baritone);
event.putObject("log", log);
event.putObject("addStop", addStop);
event.putObject("delStop", delStop);

// BEGIN : Screen Service
const theScreen = Hud.createScreen("Baritone Selection Manager GUI", false);
const draw2D = Hud.createDraw2D();

/**
 * Gets the simple section group data and turns it into final components
 */
import commandButton from "./components/button/command.mjs";
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
 */
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
        width: prev.width + groupDimensions.width + Config.gui.groupSpacing,
        height: Math.max(prev.height, groupDimensions.height),
      };
    },
    { width: -Config.gui.groupSpacing, height: 0 }
  );
  section.height =
    (section.title ? Config.gui.titleHeight : 0) + sectionDimensions.height;
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
  Sections.forEach(setSectionComponents);
  Sections.forEach(setSectionDimensions);
  const totalHeight = Sections.reduce((prev, curr) => prev + curr.height, 0);
  const totalWidth = Sections.reduce(
    (prev, curr) => Math.max(prev, curr.width),
    0
  );
  const screenWidth = draw2D.getWidth();
  const screenHeight = draw2D.getHeight();
  const xOffset = toInt(screenWidth / 2);
  const yOffset = toInt(screenHeight / 2) - totalHeight / 2;
  let baseOffset = { x: xOffset, y: yOffset };
  // render sections
  Sections.forEach((section) => {
    let sectionOffset = {
      x: baseOffset.x - section.width / 2,
      y: baseOffset.y,
    };
    // render the title
    renderTitle(
      theScreen,
      section.title,
      toInt(screenWidth / 2),
      toInt(sectionOffset.y + Config.gui.titleHeight - 20)
    );
    sectionOffset.y += Config.gui.titleHeight;

    // render the groups
    section.groups.forEach((group) => {
      let groupOffset = { x: sectionOffset.x, y: sectionOffset.y };
      group.forEach((component) => {
        component.render(theScreen, toInt(groupOffset.x), toInt(groupOffset.y));
        groupOffset.y += component.height;
      });
      sectionOffset.x += getGroupWidth(group) + Config.gui.groupSpacing;
    });
    baseOffset.y += section.height;
  });
}
theScreen.setOnInit(JavaWrapper.methodToJava(screenInit));

addStop("screen", () => {
  event.remove("screen");
  Hud.unregisterDraw2D(theScreen);
});

event.putObject("screen", theScreen);
// END : Screen Service
