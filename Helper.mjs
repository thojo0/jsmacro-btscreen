import Config from "./Config.mjs";
import * as Baritone from "./Baritone.mjs";

// init helper
const initArray = [];
export function init() {
  initArray.forEach((f) => f());
  initArray.length = 0;
}
export function addInit(func, first = false) {
  if (first) initArray.unshift(func);
  else initArray.push(func);
}

// shutdown helper
const stopObject = new Map();
event.stopListener = JavaWrapper.methodToJava(() => {
  stopObject.forEach((f) => f());
});
export function addStop(id, func) {
  stopObject.set(id, func);
}
export function delStop(id, skipExec = false) {
  if (!stopObject.has(id)) return false;
  if (!skipExec) stopObject.get(id)();
  return stopObject.delete(id);
}
export function restartService() {
  JsMacros.runScript(
    "js",
    `JsMacros.getServiceManager().restartService("${event.serviceName}")`
  );
}

// log helper
export function log(text) {
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

// status helper
const posibleStatus = new Map([
  ["idle", "Idle"],
  ["mine", "Mining"],
]);
let currentStatus;
export function isStatus(id) {
  return currentStatus === posibleStatus.get(id);
}
export function getStatus(id = undefined) {
  if (id !== undefined) return posibleStatus.get(id);
  return currentStatus;
}
export function addStatus(id, status) {
  posibleStatus.set(id, status);
}
let statusEvent; // BTScreenStatusChange
addInit(() => {
  currentStatus = posibleStatus.get(Baritone.isActive() ? "mine" : "idle");
  statusEvent = JsMacros.createCustomEvent(Config.eventName); // BTScreenStatusChange
  statusEvent.registerEvent();
}, true);
export function setStatus(id) {
  statusEvent.putString("oldStatus", currentStatus);
  currentStatus = posibleStatus.get(id);
  statusEvent.putString("status", currentStatus);
  statusEvent.trigger();
}

// number helper
export function toInt(a, round) {
  if (round) {
    return Math.round(a);
  } else {
    return Math.floor(a);
  }
}
export function random(range) {
  return toInt(Math.random() * range, true);
}

// teleport helper
let lastTeleport = "mine";
export function tp(home) {
  if (Config.home[lastTeleport] !== Config.home[home]) {
    if (lastTeleport === "mine") {
      Chat.say(`${Config.home.setcmd} ${Config.home.mine}`, true);
    }
    Chat.say(tpCommand(home), true);
    Time.sleep(Config.sleep.tp);
  }
  lastTeleport = home;
}
export function tpCommand(home) {
  return Config.home[home].startsWith("/")
    ? Config.home[home]
    : `${Config.home.getcmd} ${Config.home[home]}`;
}
