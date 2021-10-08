let { componentWidth, componentHeight } = require("../config.js");
let blacklist = [ "//wand", "//undo", "//redo", "//cut", "/plot home", "/home", "/server creative", "/server lobby" ];

module.exports = function(){
	let method = function(){
		let messageHistory = Array.from(
			Client.getMinecraft()
				.field_1705 //inGameHud
				.method_1743() //ChatHud instance
				.method_1809() //ChatHud.getMessageHistory()
		); 

		let filteredCommands = messageHistory
			.filter( el => el[0] == "/" ) // commands only
			.filter( el => blacklist.indexOf(el) === -1 ); // removing omitted commands

		let lastCommand = filteredCommands[filteredCommands.length - 1];

		Chat.say(lastCommand);
		Chat.log("[S] "+lastCommand);
	}

	return {
		type: "customButton",
		width: componentWidth,
		height: componentHeight,
		render: function(screen,xOffset,yOffset){
			screen.addButton(
				xOffset, yOffset,
				componentWidth, componentHeight,
				1,
				"doAgain",
				JavaWrapper.methodToJava(method)
			)
		}
	}

}
