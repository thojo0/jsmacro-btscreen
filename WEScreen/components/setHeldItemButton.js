let { componentWidth, componentHeight } = require("../config.js");

module.exports = function(){
	let method = function(){
		let inventory = Player.openInventory();
		let selectedSlotIndex = inventory.getSelectedHotbarSlotIndex(); 
		let selectedItem = inventory.getSlot( selectedSlotIndex + 36 );
		let command = ["//set", selectedItem.getItemID()].join(' ');
		Chat.say(command);
		Chat.log("[S] " + command);
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
				"//set heldItem",
				JavaWrapper.methodToJava(method)
			)
		}
	}
}
