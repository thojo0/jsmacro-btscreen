import * as Baritone from "../../Baritone.mjs";
import { log } from "../../Helper.mjs";
import ButtonComponent from "../ButtonComponent.mjs";

export default class SetPreset extends ButtonComponent {
  async = true;
  constructor(preset) {
    super();
    this.preset = preset;
    this.label = `Preset: ${preset}`;
  }
  run() {
    Baritone.setPreset(this.preset);
    log(`Baritone settings preset set: ${this.preset}`);
  }
}
