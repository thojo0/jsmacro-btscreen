import { random } from "./Helper.mjs";

export default {
  // home system settings for teleport
  home: {
    setcmd: "/sethome",
    getcmd: "/home",
    mine: "tmp",
    xp: "xp", // begins with "/" -> getcmd will not be put infront
    haste: "haste", // begins with "/" -> getcmd will not be put infront
    drop: "drop", // begins with "/" -> getcmd will not be put infront
    bed: "bed", // begins with "/" -> getcmd will not be put infront
  },
  // autoEat settings
  autoEat: {
    maxHold: 2500, // maximum time to hold right click (in milliseconds)
    level: null, // when food level is less -> eat (null = automatic)
    saveMode: false, // pause baritone while eating and switch hand
  },
  // autoRepair settings
  autoRepair: {
    // durability under specified value
    start: 25,
    stop: 10, // reversed
  },
  // autoSleep settings
  autoSleep: {
    dimensionCheck: true, // check if in same dimention after teleport else deactivate
  },
  // autoDrop settings
  autoDrop: {
    // enable integration with other auto tools
    // if homes are the same then he will drop on the other events too
    integration: true,
  },
  // Sleep/Wait timings (time to wait ...)
  sleep: {
    tp: 2000, // after teleports (in milliseconds)
    interact: 1, // between block interactions (in ticks)
    drop: 5, // after item drop (in ticks)
    check: 5, // between loop-checks (in ticks)
    get hit() {
      // between monster-hits (in milliseconds)
      return 1500 + random(1500);
    },
  },
  eventLogger: false,

  // baritone config presets
  baritone: {
    mine: {
      allowBreak: true,
      allowPlace: true,
    },
    walk: {
      allowBreak: false,
      allowPlace: false,
    },
    farm: {
      allowBreak: false,
      allowPlace: false,
      buildInLayers: false,
      _blocksToDisallowBreaking: [
        "+budding_amethyst",
        "-small_amethyst_bud",
        "-medium_amethyst_bud",
        "-large_amethyst_bud",
        "-amethyst_cluster",
      ],
      get _buildIgnoreBlocks() {
        return this._blocksToDisallowBreaking;
      },
    },
    default: {
      allowBreak: true,
      allowPlace: true,
      // build top to bottom in 5 block layers
      buildInLayers: true,
      blockBreakSpeed: 0,
      layerHeight: 5,
      layerOrder: true,
      // Item Saver
      itemSaver: true,
      itemSaverThreshold: 10, // has to be lover then autoRepair.start, else autoRepair will never trigger
      // will never mine
      blocksToDisallowBreaking: [
        // other
        "vault",
        "trial_spawner",
        "spawner",
        "budding_amethyst",
        // block entities
        "dispenser",
        "dropper",
        "furnace",
        "smoker",
        "blast_furnace",
        "hopper",
        "barrel",
        "chest",
        "trapped_chest",
        "shulker_box",
        "white_shulker_box",
        "orange_shulker_box",
        "magenta_shulker_box",
        "light_blue_shulker_box",
        "yellow_shulker_box",
        "lime_shulker_box",
        "pink_shulker_box",
        "gray_shulker_box",
        "light_gray_shulker_box",
        "cyan_shulker_box",
        "purple_shulker_box",
        "blue_shulker_box",
        "brown_shulker_box",
        "green_shulker_box",
        "red_shulker_box",
        "black_shulker_box",
        // Beacon+Base
        "beacon",
        "iron_block",
        "gold_block",
        "emerald_block",
        "diamond_block",
        "netherite_block",
        // unbreakable
        "bedrock",
        "end_portal",
        "end_portal_frame",
        "end_gateway",
        "reinforced_deepslate",
        "command_block",
        "repeating_command_block",
        "chain_command_block",
        "structure_block",
        "structure_void",
        "jigsaw",
        "barrier",
      ],
      // will mine only if in way of path (disallow+ignore)
      get buildIgnoreBlocks() {
        return [
          ...this.blocksToDisallowBreaking,
          // problematic for baritone
          "small_amethyst_bud",
          "medium_amethyst_bud",
          "large_amethyst_bud",
          "amethyst_cluster",
          "dragon_egg",
        ];
      },
      // will use as bride/pillar/etc. blocks while pathing
      acceptableThrowawayItems: [
        "grass_block",
        "dirt",
        "cobblestone",
        "stone",
        "deepslate",
        "cobbled_deepslate",
        "netherrack",
        "soul_sand",
        "soul_soil",
        "basalt",
      ],
    },
  },
  gui: {
    groupSpacing: 5,
    component: {
      width: 105,
      height: 20,
    },
  },
  eventName: "BTScreenStatusChange",
};
