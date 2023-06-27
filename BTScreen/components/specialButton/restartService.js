module.exports = () => {
  function method(screen) {
    return () => {
      screen.close();
      JsMacros.runScript(
        "js",
        [
          "JsMacros.getServiceManager().restartService(",
          event.serviceName,
          ")",
        ].join('"')
      );
    };
  }
  return {
    type: "specialButton",
    width: config.gui.component.width,
    height: config.gui.component.height,
    render: function (screen, xOffset, yOffset) {
      screen.addButton(
        xOffset,
        yOffset,
        config.gui.component.width,
        config.gui.component.height,
        1,
        "Restart Service",
        JavaWrapper.methodToJava(method(screen))
      );
    },
  };
};
