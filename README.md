# selection-macro-screen
Selection Manager GUI screen for the jsMacro mod in Minecraft. Contains [Baritone](https://github.com/cabaletta/baritone) sel command shortcuts, for easy use.

You can add your own commands like in [Builder's GUI](https://github.com/Godje/builder-macro-screen) in `BTScreen/Initiate.js`
>This project is a modified version of the [Builder's GUI](https://github.com/Godje/builder-macro-screen) by [Godje](https://github.com/Godje)

# Installation

1. Install jsMacro mod for Fabric or Forge.
2. Install Baritone mod for Fabric or Forge.
3. Locate the Macros folder where your jsMacros is looking for the js files to execute (can be done through jsMacros GUI).
4. Paste the contents of this repository inside that folder. Or clone this folder instead of that one.
5. Attach the `WorldJoin.js` file to the `JoinServer` Event, inside your jsMacros GUI (go to Controls to see how to open your jsMacro GUI)
6. Attach the `BTScreen/Open.js` to the key that you would like to open the screen with.
