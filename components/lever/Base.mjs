import ButtonBase from "../button/Base.mjs";

export default class Base extends ButtonBase {
  static get label() {
    return this.name;
  }
  static enabled = false;
  get label() {
    const builder = Chat.createTextBuilder().append(this.constructor.label);
    if (Base.enabled) builder.withColor(0x2);
    else builder.withColor(0xc);

    return builder.build();
  }
  run() {
    if (Base.enabled) this.disable();
    else this.enable();
    Base.enabled = !Base.enabled;
    this.elements[0].setLabel(this.label);
  }
  enable() {}
  disable() {}
}
