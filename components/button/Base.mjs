import Empty from "../Empty.mjs";

export default class Base extends Empty {
  async = false;
  init(screen, x, y) {
    if (this.label instanceof String) {
      this.label = Chat.createTextHelperFromString(this.label);
    }
    this.elements.push(
      screen
        .addButton(
          x,
          y,
          this.width,
          this.height,
          1,
          "",
          this.async
            ? JavaWrapper.methodToJavaAsync(this.run.bind(this))
            : JavaWrapper.methodToJava(this.run.bind(this))
        )
        .setLabel(this.label)
    );
  }
  run() {}
}
