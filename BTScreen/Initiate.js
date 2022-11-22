const theScreen = Hud.createScreen("Selection Manager GUI", false);
const draw2D = Hud.createDraw2D();
const btCmdManager = Java.type("baritone.api.BaritoneAPI").getProvider().getPrimaryBaritone().getCommandManager()  // baritone.leijurv.com/baritone/api/command/manager/ICommandManager.html

const toInt = a => Math.round(a);

const {
    componentWidth,
    componentHeight,
    groupSpacing,
    titleHeight
} = require("./config.js");

const dimensionalInput = require("./components/dimensionalInput.js");
const textInput = require("./components/textInput.js");

// Data source  (no prefix -> Baritone Command, "/" -> Chat Command)
const sections = [
    {
        title: "Selection",
        groups: [
            [ "sel undo", "sel pos1" ],
            [ "sel clear", "sel pos2" ],
        ]
    }, {
        title: "Selection Move",
        groups: [
            [ dimensionalInput("shift") ],
            [ dimensionalInput("expand", "expan") ],
            [ dimensionalInput("contract", "contr") ],
        ]
    }, {
        title: "Modification",
        groups: [
            [ textInput([["sel set", "sel walls", "sel shell"], ["", "sel replace"]], "<block> | <blocks...> <toblock>") ],
        ]
    }, {
        title: "Clipboard/Modification",
        groups: [
            [ "sel copy" ],
            [ "sel paste" ],
            [ "sel cleararea" ],
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
                let command = component;
                if (!command)
                    return {
                        type: "empty",
                        width: componentWidth,
                        height: componentHeight,
                        render: function(screen,xOffset,yOffset){}
                    }
                let method = function(){
                    switch (command[0]) {
                        case "/":
                            Chat.say(command);
                            break;
                        default:
                            btCmdManager.execute(command);
                            break;
                    }
                };
                return {
                    type: "commandButton",
                    width: componentWidth,
                    height: componentHeight,
                    render: function(screen,xOffset,yOffset){
                        screen.addButton(
                            xOffset, yOffset,
                            componentWidth, componentHeight,
                            1,
                            command,
                            JavaWrapper.methodToJava(method)
                        )
                    }
                }
            } else if (component.constructor.name == "Array") {
                let command = component[1];
                let method = function(){
                    switch (command[0]) {
                        case "/":
                            Chat.say(command);
                            break;
                        default:
                            btCmdManager.execute(command);
                            break;
                    }
                };
                return {
                    type: "customTitleCommandButton",
                    width: componentWidth,
                    height: componentHeight,
                    render: function(screen,xOffset,yOffset){
                        screen.addButton(
                            xOffset, yOffset,
                            componentWidth, componentHeight,
                            1,
                            component[0],
                            JavaWrapper.methodToJava(method)
                        )
                    }
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

function getGroupWidth(group){
    return group.reduce((prev,curr)=>Math.max(prev,curr.width), 0)
}

function renderTitle(screen,title,xOffset,yOffset){
    let textElement = screen.addText(title, xOffset, yOffset, 0xffffff, true);
    textElement.setPos( toInt(xOffset - textElement.getWidth()/2), yOffset + 5 );
}

function screenInit(){
    sections.forEach( setSectionComponents );
    sections.forEach( setSectionDimensions );
    const totalHeight = sections.reduce((prev,curr) => prev+curr.height, 0);
    const totalWidth = sections.reduce((prev,curr) => Math.max(prev,curr.width), 0);
    const screenWidth = draw2D.getWidth();
    const screenHeight = draw2D.getHeight();
    const xOffset = toInt(screenWidth/2);
    const yOffset = toInt(screenHeight/2) - totalHeight/2;
    let baseOffset = {x: xOffset, y: yOffset};
    // render sections
    sections.forEach(section => {
        let sectionOffset = {x:baseOffset.x - section.width/2,y:baseOffset.y};
        // render the title
        renderTitle(theScreen, section.title, toInt(screenWidth/2), toInt(sectionOffset.y + titleHeight - 20));
        sectionOffset.y += titleHeight;

        // render the groups
        section.groups.forEach(group => {
            let groupOffset = {x: sectionOffset.x, y: sectionOffset.y};
            group.forEach(component => {
                component.render(
                    theScreen,
                    toInt(groupOffset.x),
                    toInt(groupOffset.y),
                );
                groupOffset.y += component.height;
            })
            sectionOffset.x += getGroupWidth(group) + groupSpacing
        });
        baseOffset.y += section.height;
    });
}

theScreen.setOnInit(JavaWrapper.methodToJava(screenInit));

GlobalVars.putObject("BTScreen", theScreen);
