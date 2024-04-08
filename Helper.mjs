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
const stopObject = {};
event.stopListener = JavaWrapper.methodToJava(() =>
  Object.values(stopObject).forEach((f) => f())
);
export function addStop(id, func) {
  stopObject[id] = func;
}
export function delStop(id, exec) {
  if (exec) stopObject[id]();
  delete stopObject[id];
}
export function restartService(screen = null) {
  if (screen) screen.close();
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
const posibleStatus = {
  idle: "Idle",
  mine: "Mining",
};
export function getStatus(id = "") {
  if (id) return posibleStatus[id];
  return currentStatus;
}
export function addStatus(id, status) {
  posibleStatus[id] = status;
}
let currentStatus = null;
let statusEvent = null; // BTScreenStatusChange
addInit(() => {
  currentStatus = posibleStatus[Baritone.isActive() ? "mine" : "idle"];
  statusEvent = JsMacros.createCustomEvent(Config.eventName); // BTScreenStatusChange
  statusEvent.registerEvent();
}, true);
export function setStatus(id) {
  statusEvent.putString("status", posibleStatus[id]);
  statusEvent.putString("oldStatus", currentStatus);
  currentStatus = posibleStatus[id];
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
