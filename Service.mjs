import Config from "./Config.mjs";
import * as Baritone from "./Baritone.mjs";
import {
  addStatus,
  addStop,
  delStop,
  getStatus,
  init,
  log,
  setStatus,
  toInt,
  tp,
} from "./Helper.mjs";
import Sections from "./Sections.mjs";
import { button, empty } from "./components/index.mjs";
import "./Listener.mjs";

init();

// BEGIN : Screen Service
/**
 * Gets the simple section group data and turns it into final components
 */
function setSectionComponents(section) {
  section.groups = section.groups.map((group) => {
    return group.map((component) => {
      if (component) {
        switch (component.constructor.name) {
          case "String":
            return new button.command(component);

          case "Array":
            return new button.command(...component);

          default:
            return component;
        }
      }
      return new empty();
    });
  });
}
Sections.forEach(setSectionComponents);

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

function screenInit(screen) {
  Sections.forEach(setSectionDimensions);
  const totalHeight = Sections.reduce((prev, curr) => prev + curr.height, 0);
  const totalWidth = Sections.reduce(
    (prev, curr) => Math.max(prev, curr.width),
    0
  );
  const screenWidth = screen.getWidth();
  const screenHeight = screen.getHeight();
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
      screen,
      section.title,
      toInt(screenWidth / 2),
      toInt(sectionOffset.y + Config.gui.titleHeight - 20)
    );
    sectionOffset.y += Config.gui.titleHeight;

    // render the groups
    section.groups.forEach((group) => {
      let groupOffset = { x: sectionOffset.x, y: sectionOffset.y };
      group.forEach((component) => {
        component.init(screen, toInt(groupOffset.x), toInt(groupOffset.y));
        groupOffset.y += component.height;
      });
      sectionOffset.x += getGroupWidth(group) + Config.gui.groupSpacing;
    });
    baseOffset.y += section.height;
  });
}
function screenClose(screen) {
  // run close functions
  Sections.forEach((section) => {
    section.groups.forEach((group) => {
      group.forEach((component) => {
        component.close(screen);
      });
    });
  });
}

const theScreen = Hud.createScreen("Baritone Selection Manager GUI", false);
theScreen.setOnInit(JavaWrapper.methodToJava(screenInit));
theScreen.setOnClose(JavaWrapper.methodToJava(screenClose));

addStop("screen", () => {
  event.remove("screen");
  Hud.unregisterDraw2D(theScreen);
});
// END : Screen Service

// START : Expose things
event.putObject("Baritone", Baritone);
event.putObject("Config", Config);
event.putObject("Sections", Sections);
event.putObject("log", log);
event.putObject("tp", tp);
event.putObject("addStop", addStop);
event.putObject("delStop", delStop);
event.putObject("addStatus", addStatus);
event.putObject("getStatus", getStatus);
event.putObject("setStatus", setStatus);
event.putObject("screen", theScreen);
// END : Expose things
