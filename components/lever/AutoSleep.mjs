import * as Baritone from "../../Baritone.mjs";
import { addStatus, isStatus, log, tp } from "../../Helper.mjs";
import Config from "../../Config.mjs";
import { autoDropIntegration } from "./AutoDrop.mjs";
import LeverComponent from "../LeverComponent.mjs";

addStatus("sleep", "Sleeping");

export default class AutoSleep extends LeverComponent {
  static enable() {
    this.tickListener = startTickListener();
    super.enable();
  }
  static stop() {
    JsMacros.off(this.tickListener);
    delete this.tickListener;
  }
}

function getDaytime() {
  return World.getTimeOfDay() % 24000;
}
function startTickListener() {
  let pause = false;
  return JsMacros.on(
    "Tick",
    JavaWrapper.methodToJava(() => {
      if (World.isWorldLoaded() && isStatus("mine")) {
        let daytime = getDaytime();
        if (pause) {
          if (0 < daytime && daytime < 12600) {
            pause = false;
          }
        } else {
          if (12600 < daytime && daytime < 23000) {
            Baritone.pause("sleep");
            const prevDim = World.getDimension();
            tp("bed");
            if (
              Config.autoSleep.dimensionCheck &&
              prevDim !== World.getDimension()
            ) {
              log("Error: Dimention not the same after teleport");
              stopTickListener();
            } else {
              autoDropIntegration("bed");
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
              Client.waitTick(Config.sleep.interact);
              playerEntity.interactBlock(
                pos.getX() + 1,
                pos.getY(),
                pos.getZ(),
                1,
                false,
                true
              );
              Client.waitTick(Config.sleep.interact);
              playerEntity.interactBlock(
                pos.getX(),
                pos.getY(),
                pos.getZ() - 1,
                1,
                false,
                true
              );
              Client.waitTick(Config.sleep.interact);
              playerEntity.interactBlock(
                pos.getX(),
                pos.getY(),
                pos.getZ() + 1,
                1,
                false,
                true
              );
              Client.waitTick(Config.sleep.check);
              while (playerEntity.isSleeping()) {
                if (playerEntity.isSleepingLongEnough()) {
                  const screen = Hud.getOpenScreen();
                  if (screen) screen.close();
                }
                Client.waitTick(Config.sleep.check);
              }
              daytime = getDaytime();
              if (12600 < daytime && daytime < 23000) {
                pause = true;
              }
            }
            tp("mine");
            Baritone.resume();
          }
        }
      }
    })
  );
}
