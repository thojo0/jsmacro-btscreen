module.exports = {
  // home system settings for teleport
  home: {
    setcmd: "/sethome",
    getcmd: "/home",
    mine: "tmp",
    xp: "xp", // begins with "/" -> getcmd will not be put infront
    bed: "bed", // begins with "/" -> getcmd will not be put infront
  },
  // autoEat settings
  autoEat: {
    hold: 33, // time to hold right click to eat (in ticks)
    level: 16, // when food level is less -> eat
  },
  // autoRepair settings
  autoRepair: {
    // durability under specified value
    start: 25,
    stop: 10, // reversed
  },
  // Sleep/Wait timings (time to wait ...)
  sleep: {
    tp: 2000, // after teleports (in milliseconds)
    interact: 1, // between block interactions (in ticks)
    check: 10, // between loop-checks (in ticks)
    get hit() {
      // between monster-hits (in milliseconds)
      const sleep = 1500;
      const rsleep = random(1500);
      return sleep + rsleep;
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
    default: {
      allowBreak: true,
      allowPlace: true,
      // build top to bottom in 5 block layers
      buildInLayers: true,
      layerHeight: 5,
      layerOrder: true,
      // Item Saver
      itemSaver: true,
      itemSaverThreshold: 10, // has to be lover then autoRepair.start, else autoRepair will never trigger
      // will never mine
      blocksToDisallowBreaking: [
        // other
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
        delete this.buildIgnoreBlocks;
        return (this.buildIgnoreBlocks = [
          ...this.blocksToDisallowBreaking,
          // problematic for baritone
          "small_amethyst_bud",
          "medium_amethyst_bud",
          "large_amethyst_bud",
          "amethyst_cluster",
          "dragon_egg",
        ]);
      },
    },
  },
  gui: {
    titleHeight: 30,
    groupSpacing: 5,
    component: {
      width: 105,
      height: 20,
    },
  },
  eventName: "BTScreenStatusChange",
};
