const {
	groupSpacing,
	dirButtonHeight,
	dirButtonWidth,
	inputWidth,
	commandTextWidth
} = require("../config.js");


let directionCommandFunction = function(command, direction){
	return function(){
		let amount = GlobalVars.getString(command + "TextInput");
		let finalCommand = ["//" + command, amount, direction].join(' ');
		Chat.say(finalCommand);
		Chat.log("[S] " + finalCommand);
	}
}

module.exports = function(command){
	let currentValue = GlobalVars.getString(command + "TextInput") || "1";
	GlobalVars.putString(command + "TextInput", currentValue);

	let inputMethod = function(value, screen, object){
		GlobalVars.putString(command + "TextInput", value);
	};

	return {
		type: "dimensionalInput",
		width: commandTextWidth + inputWidth + groupSpacing*2 + dirButtonWidth*3,
		height: 20 + dirButtonHeight*2 + 10,
		render: function(screen,xOffset,yOffset){
			let componentOffset = { x: xOffset, y: yOffset };
			screen.addText(
				"//" + command + "",
				componentOffset.x + 5,
				componentOffset.y + 5 + dirButtonHeight,
				0xffffff,
				true
			);
			componentOffset.x += commandTextWidth + groupSpacing;

			let intInput = screen.addTextInput(
				componentOffset.x,
				componentOffset.y + dirButtonHeight,
				inputWidth, 20, 1,
				command,
				JavaWrapper.methodToJava(inputMethod)
			).setText("1", false);
			componentOffset.x += inputWidth + groupSpacing;

			// directionButtons
			screen.addButton(
				componentOffset.x + dirButtonWidth,
				componentOffset.y,
				dirButtonWidth, dirButtonHeight,
				1, "up",
				JavaWrapper.methodToJava(directionCommandFunction(command, "up"))
			)
			screen.addButton(
				componentOffset.x,
				componentOffset.y + dirButtonHeight,
				dirButtonWidth, dirButtonHeight,
				1, "left",
				JavaWrapper.methodToJava(directionCommandFunction(command, "left"))
			)
			screen.addButton(
				componentOffset.x + dirButtonWidth,
				componentOffset.y + dirButtonHeight,
				dirButtonWidth, dirButtonHeight,
				1, "me",
				JavaWrapper.methodToJava(directionCommandFunction(command, "me"))
			)
			screen.addButton(
				componentOffset.x + dirButtonWidth*2,
				componentOffset.y + dirButtonHeight,
				dirButtonWidth, dirButtonHeight,
				1, "right",
				JavaWrapper.methodToJava(directionCommandFunction(command, "right"))
			)
			screen.addButton(
				componentOffset.x + dirButtonWidth,
				componentOffset.y + dirButtonHeight*2,
				dirButtonWidth, dirButtonHeight,
				1, "down",
				JavaWrapper.methodToJava(directionCommandFunction(command, "down"))
			)
		}
	}
}

