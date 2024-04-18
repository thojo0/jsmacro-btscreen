import ButtonComponent from "../ButtonComponent.mjs";

export default class Function extends ButtonComponent {
  constructor(func, label, ...args) {
    super();
    this.func = func;
    this.label = label;
    this.args = args;
  }
  run() {
    this.func(...this.args);
  }
}
