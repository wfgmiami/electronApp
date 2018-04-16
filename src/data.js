const electron =  require('electron')
const path = require('path');
const { ipcRenderer } = electron;

const closeLink = document.getElementById('closeLink');
var myTable = document.getElementsByClassName('dataTable')[0];
const dataWin = electron.remote.getCurrentWindow();
var hiddenTable;
var elementToCopy;
var newWindow;
var currentDropTarget;

dataWin.webContents.openDevTools();

closeLink.addEventListener('click', (event) => {
    let win = electron.remote.getCurrentWindow();
    win.close();
})

function identifyDraggingElement(e){
    elementToCopy = e.target;
    currentDropTarget = elementToCopy.parentNode;
    console.log('parent node', currentDropTarget)
    var objElement = {}
    for(var p in currentDropTarget){
       objElement[p] = currentDropTarget[p]
    }

    ipcRenderer.send('currentDropTarget', objElement)
}

function moveToOwnWindow(){

    const mousePoint = electron.screen.getCursorScreenPoint();

    hiddenTable = new electron.remote.BrowserWindow({
         frame: true,
         width: 300, 
         height: 300,
         x: mousePoint.x,
         y: mousePoint.y
     })
    
     hiddenTable.loadURL(path.join("file://", __dirname, 'tearouttable.html'))
     elementToCopy.parentNode.removeChild(elementToCopy);

     var objElement = {}
     for(var p in elementToCopy){
        objElement[p] = elementToCopy[p]
     }

     ipcRenderer.send('tearoutContent', objElement)

}

myTable.addEventListener('dragend', moveToOwnWindow, false);
myTable.addEventListener('dragstart', identifyDraggingElement, false);