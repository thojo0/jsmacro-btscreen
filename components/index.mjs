import CommandButton from "./button/Command.mjs";
import FunctionButton from "./button/Function.mjs";
import OpenFileButton from "./button/OpenFile.mjs";
import RestartServiceButton from "./button/RestartService.mjs";
import StopButton from "./button/Stop.mjs";
import SetPresetButton from "./button/SetPreset.mjs";

export const button = {
  command: CommandButton,
  function: FunctionButton,
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
import RepeatLever from "./lever/Repeat.mjs";

export const lever = {
  autoDrop: AutoDropLever,
  autoEat: AutoEatLever,
  autoHaste: AutoHasteLever,
  autoRepair: AutoRepairLever,
  autoSleep: AutoSleepLever,
  repeat: RepeatLever,
};

import EmptyVisual from "./visual/Empty.mjs";
import TextVisual from "./visual/Text.mjs";

export const visual = {
  empty: EmptyVisual,
  text: TextVisual,
};
