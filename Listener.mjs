import Config from "./Config.mjs";
import * as Baritone from "./Baritone.mjs";
import { addInit, addStop, log, restartService, setStatus } from "./Helper.mjs";

const listener = [];
// Baritone active? change status
let oldBaritoneState;
addInit(() => {
  oldBaritoneState = Baritone.isActive();
});
let changedStateTick = 0; // fix for sometimes falsely trigger
listener.push(
  JsMacros.on(
    "Tick",
    JavaWrapper.methodToJava(() => {
      const baritoneState = Baritone.isActive();
      if (oldBaritoneState !== baritoneState) {
        changedStateTick++;
        if (changedStateTick === 4) {
          setStatus(baritoneState ? "mine" : "idle");
          oldBaritoneState = baritoneState;
          changedStateTick = 0;
        }
      } else {
        if (changedStateTick) {
          changedStateTick = 0;
        }
      }
    })
  )
);
// AutoRestart
listener.push(
  JsMacros.on(
    "JoinServer",
    JavaWrapper.methodToJava(() => restartService())
  )
);
// eventLogger
if (Config.eventLogger) {
  addInit(() => {
    listener.push(
      JsMacros.on(
        Config.eventName,
        JavaWrapper.methodToJava((e) => {
          log(
            `Status switched from ${e.getString("oldStatus")} to ${e.getString(
              "status"
            )}`
          );
        })
      )
    );
  });
}

addStop("listener", () => {
  listener.forEach((l) => {
    JsMacros.off(l);
  });
});
