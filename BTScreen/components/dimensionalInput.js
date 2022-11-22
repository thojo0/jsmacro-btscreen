const {
	componentHeight,
	componentWidth,
} = require("../config.js");
const dirComponentWidth = toInt(componentWidth/3);

let commandFunction = function(command, direction){
	return function(){
		let amount = GlobalVars.getString("BTScreen" + command + "TextInput");
		let finalCommand = ["sel", command, "a", direction, amount].join(' ');
		btCmdManager.execute(finalCommand);
	}
}

module.exports = function(command, text = command){
	let currentValue = GlobalVars.getString("BTScreen" + command + "TextInput") || "1";
	GlobalVars.putString("BTScreen" + command + "TextInput", currentValue);

	let inputMethod = function(value){
		GlobalVars.putString("BTScreen" + command + "TextInput", value);
	};

	return {
		type: "dimensionalInput",
		width: dirComponentWidth*3,
		height: componentHeight*3,
		render: function(screen,xOffset,yOffset){
			//left
			screen.addText(
				text,
				xOffset + 3,
				yOffset + componentHeight/2 - 5,
				0xffffff,
				true
			)
			screen.addButton(
				xOffset,
				yOffset + componentHeight,
				dirComponentWidth, componentHeight,
				1, "west",
				JavaWrapper.methodToJava(commandFunction(command, "west"))
			)
			// mid
			screen.addButton(
				xOffset + dirComponentWidth,
				yOffset,
				dirComponentWidth, componentHeight,
				1, "north",
				JavaWrapper.methodToJava(commandFunction(command, "north"))
			)
			screen.addTextInput(
				xOffset + dirComponentWidth - 1,
				yOffset + componentHeight - 1,
				dirComponentWidth + 2, componentHeight + 2,
				"1",
				JavaWrapper.methodToJava(inputMethod)
			).setText("1");
			screen.addButton(
				xOffset + dirComponentWidth,
				yOffset + componentHeight*2,
				dirComponentWidth, componentHeight,
				1, "south",
				JavaWrapper.methodToJava(commandFunction(command, "south"))
			)
			// right
			screen.addButton(
				xOffset + dirComponentWidth*2,
				yOffset,
				dirComponentWidth, componentHeight,
				1, "up",
				JavaWrapper.methodToJava(commandFunction(command, "up"))
			)
			screen.addButton(
				xOffset + dirComponentWidth*2,
				yOffset + componentHeight,
				dirComponentWidth, componentHeight,
				1, "east",
				JavaWrapper.methodToJava(commandFunction(command, "east"))
			)
			screen.addButton(
				xOffset + dirComponentWidth*2,
				yOffset + componentHeight*2,
				dirComponentWidth, componentHeight,
				1, "down",
				JavaWrapper.methodToJava(commandFunction(command, "down"))
			)
		}
	}
}

