import ButtonComponent from "./ButtonComponent.mjs";

export default class LeverComponent extends ButtonComponent {
  static get label() {
    return this.name;
  }
  static enabled = false;
  get label() {
    const builder = Chat.createTextBuilder().append(this.constructor.label);
    if (this.constructor.enabled) builder.withColor(0x2);
    else builder.withColor(0xc);

    return builder.build();
  }
  run() {
    if (this.constructor.enabled) this.constructor.disable();
    else this.constructor.enable();
    this.elements[0].setLabel(this.label);
  }
  static enable() {
    this.enabled = true;
  }
  static disable() {
    this.enabled = false;
  }
}
