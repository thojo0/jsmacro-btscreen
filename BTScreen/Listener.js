const listener = [];
// Baritone active? change status
let oldBaritoneState = btIsActive();
let changedStateTick = 0;  // fix for sometimes falsely trigger
listener.push(
  JsMacros.on(
    "Tick",
    JavaWrapper.methodToJava(() => {
      const baritoneState = btIsActive();
      if (oldBaritoneState !== baritoneState) {
        changedStateTick++;
        if (changedStateTick === 3) {
          if (baritoneState) {
            event.putString("status", state.mine);
          } else {
            event.putString("status", state.idle);
          }
          oldBaritoneState = baritoneState;
          changedStateTick = 0;
        }
      }
    })
  )
);
// BTScreenStateChange Event
const stateEvent = JsMacros.createCustomEvent(config.eventName);
stateEvent.registerEvent();
let oldStatus = event.getString("status");
listener.push(
  JsMacros.on(
    "Tick",
    JavaWrapper.methodToJava(() => {
      const status = event.getString("status");
      if (oldStatus !== status) {
        stateEvent.putString("status", status);
        stateEvent.putString("oldStatus", oldStatus);
        stateEvent.trigger();
        oldStatus = status;
      }
    })
  )
);
// eventLogger
if (config.eventLogger) {
  listener.push(
    JsMacros.on(
      config.eventName,
      JavaWrapper.methodToJava((e) => {
        log(
          [
            "Status switched from",
            e.getString("oldStatus"),
            "to",
            e.getString("status"),
          ].join(" ")
        );
      })
    )
  );
}

addStop("listener", () => {
  listener.forEach((l) => {
    JsMacros.off(l);
  });
  delete listener;
});
