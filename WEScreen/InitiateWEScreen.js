const theScreen = Hud.createScreen("Builder's GUI", false);
const draw2D = Hud.createDraw2D();

const buttonWidth = 100;
const buttonHeight = 20;

// Creating DATA to render
let simpleCommands = ["wand", "undo", "redo", "cut", "pos1", "pos2", "hpos1", "hpos2", "jumpto"];

function sectionTitle(x,y,text){
	let el = Hud.createDraw2D();
	el.addText(text,x,y,0x8,true);
	return el;
}

function buildButton(screen,xOffset,yOffset,x,y,text,func){
	const width = 100;
	const height = 20;

	return screen.addButton(
		xOffset + x*width, yOffset + y*height,
		width, height,
		1, // zIndex?
		text,JavaWrapper.methodToJava(func || function(){
			Chat.say(text);
			Chat.log("[S] " + text);
		})
	);
}

function screenInit(){
	let basicGrid = [
		["//wand",	"//copy", "//paste"],
		["//pos1",	"//hpos1", "//undo"],
		["//pos2",	"//hpos2", "//redo"],
		["//set 0", "//jumpto"]
	];
	let WIDTH = draw2D.getWidth();
	let HEIGHT = draw2D.getHeight();
	let centerX = WIDTH/2;
	let centerY = HEIGHT/2;
	let maxGridWidth = 3;
	let xOffset = centerX - (buttonWidth*maxGridWidth)/2;
	let yOffset = centerY - (buttonHeight*basicGrid.length)/2;

	for(let y = 0; y < basicGrid.length; y++){
		for(let x = 0; x < basicGrid[y].length; x++){
			buildButton(
				theScreen, Math.floor(xOffset), Math.floor(yOffset), x, y, basicGrid[y][x]
			);
		}
	}
	let title = sectionTitle(50,50,"BRUH");
	Hud.registerDraw2D(title);
}

theScreen.setOnInit(JavaWrapper.methodToJava(screenInit));

GlobalVars.putObject("theScreen", theScreen);
