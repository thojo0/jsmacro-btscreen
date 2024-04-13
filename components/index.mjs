import Empty from "./Empty.mjs";
export const empty = Empty;

import CommandButton from "./button/Command.mjs";
import OpenFileButton from "./button/OpenFile.mjs";
import RestartServiceButton from "./button/RestartService.mjs";
import StopButton from "./button/Stop.mjs";
import SetPresetButton from "./button/SetPreset.mjs";

export const button = {
  command: CommandButton,
  openFile: OpenFileButton,
  restartService: RestartServiceButton,
  stop: StopButton,
  setPreset: SetPresetButton,
};

import DimensionalInput from "./input/Dimensional.mjs";
import TextInput from "./input/Text.mjs";

export const input = {
  dimensional: DimensionalInput,
  text: TextInput,
};

import AutoDropLever from "./lever/AutoDrop.mjs";
import AutoEatLever from "./lever/AutoEat.mjs";
import AutoHasteLever from "./lever/AutoHaste.mjs";
import AutoRepairLever from "./lever/AutoRepair.mjs";
import AutoSleepLever from "./lever/AutoSleep.mjs";

export const lever = {
  autoDrop: AutoDropLever,
  autoEat: AutoEatLever,
  autoHaste: AutoHasteLever,
  autoRepair: AutoRepairLever,
  autoSleep: AutoSleepLever,
};
