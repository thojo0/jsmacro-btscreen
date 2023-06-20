module.exports = () => {
  function method() {
    btExecute("set allowBreak true");
    btExecute("set allowPlace true");
    btExecute("set buildInLayers true");
    btExecute("set itemSaver true");
    btExecute("set itemSaverThreshold 30");
    btExecute("set layerHeight 5");
    btExecute("set layerOrder true");
    const blocks = config.block.disallow;
    if (blocks.length > 0) {
      btExecute("set blocksToDisallowBreaking " + blocks.join());
    }
    blocks.push(...config.block.ignore);
    if (blocks.length > 0) {
      btExecute("set buildIgnoreBlocks " + blocks.join());
    }
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
        "set Settings",
        JavaWrapper.methodToJava(method)
      );
    },
  };
};
