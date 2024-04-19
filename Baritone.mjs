import Config from "./Config.mjs";
import { getStatus, setStatus } from "./Helper.mjs";

// https://baritone.leijurv.com/baritone/api/BaritoneAPI.html
const API = Java.type("baritone.api.BaritoneAPI");

export const primary = API.getProvider().getPrimaryBaritone(); // https://baritone.leijurv.com/baritone/api/IBaritone.html
export const settings = API.getSettings(); // https://baritone.leijurv.com/baritone/api/Settings.html

const lastCommandBlacklist = [
  "stop",
  "forcecancel",
  "pause",
  "resume",
  "set",
  "mod",
  "reset",
  "click",
  "explorefilter",
  "sel pos",
  "sel undo",
  "sel clear",
  "sel shift",
  "sel expand",
  "sel contract",
];
export let lastCommand = null;
export function execute(command) {
  if (!lastCommandBlacklist.some((pre) => command.startsWith(pre))) {
    lastCommand = command;
  }
  // https://baritone.leijurv.com/baritone/api/command/manager/ICommandManager.html#execute-java.lang.String-
  return primary.getCommandManager().execute(command);
}
export function isActive() {
  // https://baritone.leijurv.com/baritone/api/pathing/calc/IPathingControlManager.html
  return primary.getPathingControlManager().mostRecentInControl().isPresent();
}

// https://baritone.leijurv.com/baritone/api/utils/SettingsUtil.html
const SettingsUtil = Java.type("baritone.api.utils.SettingsUtil");
export function setPreset(preset) {
  for (let [key, value] of Object.entries(Config.baritone[preset])) {
    key = key.toLowerCase();
    const modify = key.startsWith("_");
    if (modify) {
      key = key.substring(1);
    }
    const setting = settings.byLowerName.get(key);

    if (
      modify &&
      SettingsUtil.settingTypeToString(setting) === "List<class_2248>"
    ) {
      if (value.constructor.name !== "Array") {
        value = value.toString().split(",");
      }
      const pervious = new Set(
        SettingsUtil.settingValueToString(setting).split(",")
      );
      value.forEach((b) => {
        const prefix = b[0];
        b = b.substring(1);
        switch (prefix) {
          case "+":
            pervious.add(b);
            break;
          case "-":
            pervious.delete(b);
            break;
        }
      });
      value = [...pervious];
    }

    switch (value.constructor.name) {
      case "Array":
        value = value.join();
        break;
      default:
        value = value.toString();
        break;
    }

    SettingsUtil.parseAndApply(settings, key, value);
  }
}

let pauseStatus = null;
export function pause(status) {
  setStatus(status);
  pauseStatus = getStatus(status);
  return execute("pause");
}
export function resume() {
  if (getStatus() !== pauseStatus) {
    return false;
  }
  if (!execute("resume")) return false;
  Time.sleep(1);
  setStatus("mine");
  pauseStatus = null;
  return true;
}
