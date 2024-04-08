import commandButton from "./button/command.mjs";
import openFileButton from "./button/openFile.mjs";
import restartServiceButton from "./button/restartService.mjs";
import stopButton from "./button/stop.mjs";
import setBtPresetButton from "./button/setBtPreset.mjs";

export const button = {
  command: commandButton,
  openFile: openFileButton,
  restartService: restartServiceButton,
  stop: stopButton,
  setBtPreset: setBtPresetButton,
};

import dimensionalInput from "./input/dimensional.mjs";
import textInput from "./input/text.mjs";

export const input = {
    dimensional: dimensionalInput,
    text: textInput,
}

import autoDropLever from "./lever/autoDrop.mjs";
import autoEatLever from "./lever/autoEat.mjs";
import autoHasteLever from "./lever/autoHaste.mjs";
import autoRepairLever from "./lever/autoRepair.mjs";
import autoSleepLever from "./lever/autoSleep.mjs";

export const lever = {
    autoDrop: autoDropLever,
    autoEat: autoEatLever,
    autoHaste: autoHasteLever,
    autoRepair: autoRepairLever,
    autoSleep: autoSleepLever,
}
