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
  tp,
} from "./Helper.mjs";
import Sections from "./Sections.mjs";
import "./Listener.mjs";
import Screen from "./Screen.mjs";

init();

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
event.putObject("screen", Screen);
// END : Expose things
