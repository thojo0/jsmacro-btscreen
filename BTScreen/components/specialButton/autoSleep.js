state.sleep = "Sleeping";
const label = "AutoSleep";

function getDaytime() {
  return World.getTimeOfDay() % 24000;
}
let tickListener = null;
function startTickListener() {
  let pause = false;
  tickListener = JsMacros.on(
    "Tick",
    JavaWrapper.methodToJava(() => {
      switch (event.getString("status")) {
        case state.mine:
          let daytime = getDaytime();
          if (pause) {
            if (0 < daytime && daytime < 12600) {
              pause = false;
            }
          } else {
            if (12600 < daytime && daytime < 23000) {
              event.putString("status", state.sleep);
              btExecute("pause");
              Time.sleep(1);
              const prevDim = World.getDimension();
              Chat.say(config.home.setcmd + " " + config.home.mine, true);
              teleport("bed");
              if (
                config.autoSleep.dimensionCheck &&
                prevDim !== World.getDimension()
              ) {
                log("Error: Dimention not the same after teleport");
                stopTickListener();
              } else {
                const playerEntity = Player.getPlayer();
                const pos = playerEntity.getBlockPos();
                playerEntity.interactBlock(
                  pos.getX() - 1,
                  pos.getY(),
                  pos.getZ(),
                  1,
                  false,
                  true
                );
                Client.waitTick(config.sleep.interact);
                playerEntity.interactBlock(
                  pos.getX() + 1,
                  pos.getY(),
                  pos.getZ(),
                  1,
                  false,
                  true
                );
                Client.waitTick(config.sleep.interact);
                playerEntity.interactBlock(
                  pos.getX(),
                  pos.getY(),
                  pos.getZ() - 1,
                  1,
                  false,
                  true
                );
                Client.waitTick(config.sleep.interact);
                playerEntity.interactBlock(
                  pos.getX(),
                  pos.getY(),
                  pos.getZ() + 1,
                  1,
                  false,
                  true
                );
                Client.waitTick(config.sleep.check);
                while (playerEntity.isSleeping()) {
                  if (playerEntity.isSleepingLongEnough()) {
                    const screen = Hud.getOpenScreen();
                    if (screen) screen.close();
                  }
                  Client.waitTick(config.sleep.check);
                }
                daytime = getDaytime();
                if (12600 < daytime && daytime < 23000) {
                  pause = true;
                }
              }
              teleport("mine");
              btExecute("resume");
              Time.sleep(1);
              event.putString("status", state.mine);
            }
          }
      }
    })
  );
  addStop("autoSleep", () => {
    JsMacros.off(tickListener);
    tickListener = null;
  });
  log(label + " enabled");
}
function stopTickListener() {
  delStop("autoSleep", true);
  log(label + " disabled");
}
function getText() {
  const builder = Chat.createTextBuilder().append(label);
  if (tickListener === null) {
    builder.withColor(0xc);
  } else {
    builder.withColor(0x2);
  }
  return builder.build();
}

module.exports = () => {
  let button;
  function method() {
    if (tickListener === null) {
      startTickListener();
    } else {
      stopTickListener();
    }
    button.setLabel(getText());
  }
  return {
    type: "specialButton",
    width: config.gui.component.width,
    height: config.gui.component.height,
    render: function (screen, xOffset, yOffset) {
      button = screen.addButton(
        xOffset,
        yOffset,
        this.width,
        this.height,
        1,
        label,
        JavaWrapper.methodToJava(method)
      );
      button.setLabel(getText());
    },
  };
};
