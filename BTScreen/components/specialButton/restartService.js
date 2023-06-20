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
    width: config.componentWidth,
    height: config.componentHeight,
    render: function (screen, xOffset, yOffset) {
      screen.addButton(
        xOffset,
        yOffset,
        config.componentWidth,
        config.componentHeight,
        1,
        "Restart Service",
        JavaWrapper.methodToJava(method(screen))
      );
    },
  };
};
