import Config from "../../Config.mjs";
import InputComponent from "../InputComponent.mjs";

export default class Text extends InputComponent {
  static #instances = new Map();
  static get(name) {
    return Text.#instances.get(name).value;
  }
  static set(name, value) {
    Text.#instances.get(name).setValue(value);
  }
  constructor(name, suggestion = "", defaultValue = "", length = 1) {
    super();
    Text.#instances.set(name, this);
    this.suggestion = suggestion;
    this.value = this.defaultValue = defaultValue;
    this.width *= length;
    this.width += Config.gui.groupSpacing * (length - 1);
  }
  setValue(value, screen) {
    if (value !== undefined) this.value = value;
    const ti = this.elements[0];
    if (!ti) return;
    if (this.value.length) ti.setSuggestion("");
    else ti.setSuggestion(this.suggestion);
    if (screen) return;
    ti.setText(this.value);
  }
  init(screen, x, y) {
    // Input
    this.elements.push(
      screen
        .addTextInput(
          x,
          y,
          this.width - this.height - 3,
          this.height,
          "",
          JavaWrapper.methodToJava(this.setValue.bind(this))
        )
        .setMaxLength(4096)
    );
    this.setValue();
    this.elements.push(
      screen.addButton(
        x + this.width - this.height - 1,
        y,
        this.height,
        this.height,
        1,
        "R",
        JavaWrapper.methodToJava(() => this.setValue(this.defaultValue))
      )
    );
  }
}
