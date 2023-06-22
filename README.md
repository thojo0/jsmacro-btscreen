# jsmacro-btscreen
Baritone Selection Manager GUI (BTScreen) for the [JsMacro](https://github.com/JsMacros/JsMacros) mod in Minecraft. It started with [Baritone](https://github.com/cabaletta/baritone) sel command shortcuts, for easy use. Now it has a lot more features.

>This project is a (heavy) modified version of the [Builder's GUI](https://github.com/Godje/builder-macro-screen) by [Godje](https://github.com/Godje)

#### Features

- `AutoRepair` tool feature (needs sethome-like commands)
- `AutoSleep` feature (needs sethome-like commands)
- prefered settings for perimeter building
- `BTScreenStatusChange` event
- You can add your own commands like in [Builder's GUI](https://github.com/Godje/builder-macro-screen), but in a different file: `BTScreen/sections.js`

![GUI Screenshot](image.jpg)

# Installation

1. Install [JsMacro](https://github.com/JsMacros/JsMacros/releases) mod for Fabric or Forge.
2. Install [Baritone-Api](https://github.com/cabaletta/baritone/releases) mod for Fabric or Forge.
3. Locate the Macros folder (normaly `.minecraft/config/jsMacros/Macros`) where your JsMacros is looking for the js files to execute (can be done through jsMacros GUI).
4. Paste the `BTScreen` folder of this repository inside that folder. Or clone this folder instead.
5. Add a new Service, named `BTScreen` and linked to the file `BTScreen/Service.js`, inside your JsMacros GUI (go to Controls to see how to open your JsMacro GUI)
   Don't forget to `Enable` and `Start` the service.
6. Attach the `BTScreen/Open.js` to the key that you would like to open the screen with.
7. You can change the homes/cmds (and more) in `BTScreen/config.js` (or button `Open config.js`)
   Just restart the service to reload the config.

#### For Experts
8. A demo to see how to get the current status is inside `BTScreen/ReadStatus.js` (to test just execut the file somehow)
7. A demo for the event is in `BTScreen/Listener.js`, you can enable the demo in the config (`eventLogger`).
