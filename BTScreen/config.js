module.exports = {
  home: {
    setcmd: "/sethome",
    getcmd: "/home",
    mine: "tmp",
    xp: "xp", // begins with "/" -> getcmd will not be put infront
    bed: "bed", // begins with "/" -> getcmd will not be put infront
    sleep: 2000, // time to wait after teleports (in milliseconds)
  },
  eat: {
    holdTicks: 33,
    minLevel: 16,
  },
  eventLogger: false,

  componentWidth: 105,
  componentHeight: 20,
  groupSpacing: 5,
  titleHeight: 30,
  eventName: "BTScreenStatusChange",
  block: {
    // will never mine
    disallow: [
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
    ignore: [
      // problematic for baritone
      "small_amethyst_bud",
      "medium_amethyst_bud",
      "large_amethyst_bud",
      "amethyst_cluster",
      "dragon_egg",
    ],
  },
};
