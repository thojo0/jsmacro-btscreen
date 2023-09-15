const buttons = {};

const dir = __filename.slice(0, -3);
FS.list(dir).forEach((file) => {
  if (!FS.isDir(file)) {
    const name = file.split(".")[0];
    buttons[name] = require(dir + "/" + file);
  }
});

module.exports = buttons;
