# 🛑 PROJECT DEPRECATED 🛑

**This repository is archived and is no longer being maintained or updated.**

All future development, bug fixes, and feature requests will be handled in the successor repository:

➡️ **[BTScreen-fabric](https://github.com/ShadowPaint-SP/BTScreen-fabric)**

# jsmacro-btscreen
Baritone Selection Manager GUI (BTScreen) for the [JsMacro](https://github.com/JsMacros/JsMacros) mod in Minecraft. It started with [Baritone](https://github.com/cabaletta/baritone) sel command shortcuts, for easy use. Now it has a lot more features.

>This project was inspired by the [Builder's GUI](https://github.com/Godje/builder-macro-screen) by [Godje](https://github.com/Godje)

#### Features

- `AutoRepair` tool feature (needs sethome-like commands)
- `AutoSleep` feature (needs sethome-like commands)
- `AutoHaste` feature (needs sethome-like commands)
- `AutoDrop` feature (needs sethome-like commands)
- `AutoEat` feature
- prefered settings for perimeter building
- `BTScreenStatusChange` event
- Add your own commands (file: `BTScreen/Sections.mjs`)

![GUI Screenshot](image.jpg)

# Installation

1. Install [JsMacro](https://github.com/JsMacros/JsMacros/releases) mod for Fabric or Forge.
2. Install [Baritone-Api](https://github.com/cabaletta/baritone/releases) mod for Fabric or Forge.
3. Locate the Macros folder (normaly `.minecraft/config/jsMacros/Macros`) where your JsMacros is looking for the js files to execute (can be done through jsMacros GUI).
4. Create a new folder named `BTScreen`
4. Paste everything of this repository inside that folder. Or clone this folder instead. ([zip download](https://github.com/thojo0/jsmacro-btscreen/archive/refs/heads/master.zip))
5. Add a new Service, named `BTScreen` and linked to the file `BTScreen/Service.mjs`, inside your JsMacros GUI (go to Controls to see how to open your JsMacro GUI)
   Don't forget to `Enable` and `Start` the service.
6. Attach the `BTScreen/Open.js` to the key that you would like to open the screen with.
7. You can change the homes/cmds (and more) in `BTScreen/Config.mjs` (or button `Open Config.mjs`)
   Just restart the service to reload the config.

#### For Experts
8. A demo to see how to get the current status is inside `BTScreen/ReadStatus.js` (to test just execut the file somehow)
7. A demo for the event is in `BTScreen/Listener.mjs`, you can enable the demo in the config (`eventLogger`).
