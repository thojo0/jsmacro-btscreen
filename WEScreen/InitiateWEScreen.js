const theScreen = Hud.createScreen("Builder's GUI", false);
const draw2D = Hud.createDraw2D();

const componentWidth = 100;
const componentHeight = 20;
const groupSpacing = 10;
const titleHeight = 20;

// Data source
const sections = [
	{
		title: "Basic",
		groups: [
			[ "wand", "pos1", "pos2" ],
			[ "cut", "undo", "redo" ],
			[ "deselect", "hpos1", "hpos2" ]
		]
	}, {
		title: "Whatever",
		groups: [
			[ "jumpto", "thru" ],
			[ "copy", "paste", "flip" ]
		]
	}
]

/**
 * Gets the simple section group data and turns it into final components
 */
function setSectionComponents(section){
	section.groups = section.groups.map(group => {
		return group.map( component => {
			let type = typeof component;
			if (type == "string") {
				let command = "//" + component;
				return {
					type: "commandButton",
					width: componentWidth,
					height: componentHeight,
					render: function(screen,xOffset,yOffset,func){
						screen.addButton(
							xOffset, yOffset,
							componentWidth, componentHeight,
							1,
							commmand,
							JavaWrapper.methodToJava(func)
						)
					},
					method: function(){
						Chat.say(command);
						Chat.log("[S] " + command);
					},
				}
			} else {
				return component;
			}
		})
	});
}

/**
 * Setting the dimensions for each section based on the width and height of the components
 * in each group.
 *
 * @info there is a negative groupSpacing value in the initial reducer to remove the last spacing
 * */
function setSectionDimensions(section){
	let sectionDimensions = section.groups.reduce((prev,curr,ind) => {
		let groupDimensions = curr.reduce((prev,curr) => {
			return {
				width: Math.max(prev.width, curr.width),
				height: prev.height + curr.height
			}
		}, {width:0, height:0});
		return {
			width: prev.width + groupDimensions.width + groupSpacing,
			height: Math.max(prev.height, groupDimensions.height)
		};
	}, {width: -groupSpacing, height: 0});
	section.height = (section.title ? titleHeight : 0) + sectionDimensions.height;
	section.width = sectionDimensions.width;
}

function screenInit(){
	sections.forEach( setSectionComponents );
	sections.forEach( setSectionDimensions );
	const totalHeight = sections.reduce((prev,curr) => prev+curr.height, 0);
	const totalWidth = sections.reduce((prev,curr) => Math.max(prev,curr.width), 0);
	const screenWidth = draw2D.getWidth();
	const screenHeight = draw2D.getHeight();
	const xOffset = Math.floor(screenWidth/2) - totalWidth;
	const yOffset = Math.floor(screenHeight/2) - totalHeight;
	let baseOffset = {x:0,y:0};
}

theScreen.setOnInit(JavaWrapper.methodToJava(screenInit));

GlobalVars.putObject("theScreen", theScreen);
