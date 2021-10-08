function bruh(){
	let client = Client.getMinecraft();
	// MinecraftClient.inGameHud (class_329) field is field_1705
	// inGameHud.getChatHud (class_338) method is method_1743
	// ChatHud.messages field is field_2061
	let ChatHud = client.field_1705.method_1743()
	let myMessages = Array.from(ChatHud.method_1809());
	let blacklist = [ "//wand", "//undo", "//redo", "//cut", "/plot home", "/home", "/server creative", "/server lobby" ];
	let myCommands = myMessages.filter( el => el[0] == "/" );
	let filteredCommands = myCommands.filter( el => blacklist.indexOf(el) === -1 );
	Chat.log(filteredCommands[filteredCommands.length - 1]);
}

bruh();
