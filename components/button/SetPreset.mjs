import * as Baritone from "../../Baritone.mjs";
import { log } from "../../Helper.mjs";
import Base from "./Base.mjs";

export default class SetPreset extends Base {
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
