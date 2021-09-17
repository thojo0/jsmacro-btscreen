const theScreen = Hud.createScreen("Builder's GUI", false);
const draw2D = Hud.createDraw2D();

const buttonWidth = 100;
const buttonHeight = 20;
const groupSpacing = 10;
const titleHeight = 20;

const sections = [
	{
		title: "Basic",
		groups: [
			[
				"wand", "pos1", "pos2"
			], [
				"cut", "undo", "redo"
			], [
				"deselect", "hpos1", "hpos2"
			]
		]
	},
	{
		title: "Whatever",
		groups: [
			[
				"jumpto", "thru"
			], [
				"copy", "paste", "flip"
			]
		]
	}
]

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

// modifies data
function setSectionDimensions(section, ind, sections){
	let maxGroupSize = section.groups.reduce((prev,curr) => Math.max( prev, curr.length ), 0);
	let groupsCount = section.groups.length;
	section.height = (section.title ? titleHeight : 0) + maxGroupSize*buttonHeight;
	section.width = groupsCount*buttonWidth + (groupsCount - 1)*groupSpacing;
}

function screenInit(){
	sections.forEach( setSectionDimensions );
	let totalHeight = sections.reduce((prev,curr) => prev+curr.height, 0);
	let totalWidth = sections.reduce((prev,curr) => Math.max(prev,curr.width), 0);

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
}

theScreen.setOnInit(JavaWrapper.methodToJava(screenInit));

GlobalVars.putObject("theScreen", theScreen);
