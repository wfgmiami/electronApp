const electron =  require('electron')
const path = require('path');
const closeLink = document.getElementById('closeLink');
var myTable = document.getElementsByClassName('dataTable')[0];
const dataWin = electron.remote.getCurrentWindow();
var hiddenTable;
var elementToCopy;
var newWindow;

dataWin.webContents.openDevTools();

closeLink.addEventListener('click', (event) => {
    let win = electron.remote.getCurrentWindow();
    win.close();
})

function identifyDraggingElement(e){
    console.log('.....dragged', e.target)
    elementToCopy = e.target;
}

function moveToOwnWindow(){
    hiddenTable = new electron.remote.BrowserWindow({
         width: 300, 
         height: 300
     })
    
     hiddenTable.loadURL(path.join("file://", __dirname, 'tearouttable.html'))
     tearOut();
}

function tearOut(){
    elementToCopy.parentNode.removeChild(elementToCopy);
    hiddenTable.contentWindow.document.body.appendChild(elementToCopy);
    hiddenTable.show();
    // hiddenTable.showAt(mousePosition.left - 150, mousePosition.top)

    // hiddenTable = this;
    // system.getMousePosition( 
    //     function(mousePosition){
    //         elementToCopy.parentNode.removeChild(elementToCopy);
    //         hiddenTable.contentWindow.document.body.appendChild(elementToCopy);
    //         hiddenTable.showAt(mousePosition.left - 150, mousePosition.top)
    //     }
    // );
}

myTable.addEventListener('dragend', moveToOwnWindow, false);
myTable.addEventListener('dragstart', identifyDraggingElement, false);