import Config from "./Config.mjs";
import { getStatus, setStatus } from "./Helper.mjs";

// https://baritone.leijurv.com/baritone/api/BaritoneAPI.html
const API = Java.type("baritone.api.BaritoneAPI");

export const primary = API.getProvider().getPrimaryBaritone(); // https://baritone.leijurv.com/baritone/api/IBaritone.html
export const settings = API.getSettings(); // https://baritone.leijurv.com/baritone/api/Settings.html

export function execute(command) {
  // https://baritone.leijurv.com/baritone/api/command/manager/ICommandManager.html#execute-java.lang.String-
  return primary.getCommandManager().execute(command);
}
export function isActive() {
  // https://baritone.leijurv.com/baritone/api/pathing/calc/IPathingControlManager.html
  return primary
    .getPathingControlManager()
    .mostRecentInControl()
    .isPresent();
}

// https://baritone.leijurv.com/baritone/api/utils/SettingsUtil.html
const SettingsUtil = Java.type("baritone.api.utils.SettingsUtil");
export function setPreset(preset) {
  for (let [key, value] of Object.entries(Config.baritone[preset])) {
    if (value.constructor.name === "Array") {
      value = value.join();
    }
    SettingsUtil.parseAndApply(settings, key.toLowerCase(), value.toString());
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
