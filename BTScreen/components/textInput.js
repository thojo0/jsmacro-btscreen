const {
	componentHeight,
	componentWidth,
	groupSpacing
} = require("../config.js");


let commandFunction = function(command, varName){
	return function(){
		let value = GlobalVars.getString(varName);
		let finalCommand = [command, value].join(' ');
		btCmdManager.execute(finalCommand);
	}
}
let resetInputMethod = function(input, varName, text){
	return function(){
		GlobalVars.putString(varName, text);
		input.setText(text);
	}
}

module.exports = function(commands, defaultText = ""){
	let varName = "BTScreen" + commands.map(e => e[0]).join('') + "TextInput"
	let componentCount = Math.max(...commands.map(e => e.length))
	let currentValue = GlobalVars.getString(varName) || defaultText;
	GlobalVars.putString(varName, currentValue);

	let inputMethod = function(value){
		GlobalVars.putString(varName, value);
	};

	return {
		type: "textInput",
		width: componentWidth*componentCount + groupSpacing*(componentCount-1),
		height: componentHeight*(commands.length+1),
		render: function(screen,xOffset,yOffset){
			// Input
			let intInput = screen.addTextInput(
				xOffset,
				yOffset,
				this.width - componentHeight - 3, componentHeight,
				"1",
				JavaWrapper.methodToJava(inputMethod)
			).setText(currentValue)
			screen.addButton(
				xOffset + this.width - componentHeight - 1,
				yOffset,
				componentHeight, componentHeight,
				1, "R",
				JavaWrapper.methodToJava(resetInputMethod(intInput, varName, defaultText))
			)

			// Buttons
			commands.forEach(cmds => {
				yOffset += componentHeight;
				for (let i = 0; i < cmds.length; i++) {
					const cmd = cmds[i];
					if (cmd) {
						screen.addButton(
							xOffset + componentWidth*i + groupSpacing*i,
							yOffset,
							componentWidth, componentHeight,
							1, cmd,
							JavaWrapper.methodToJava(commandFunction(cmd, varName))
						)
					}
				}
			})
		}
	}
}

