const electron = require('electron');
const path = require('path');


var myTable = document.getElementsByClassName('dataTable')[0];
var hiddenTable;
var elementToCopy;
var newWindow;

var dataWindow = electron.remote.getCurrentWindow();

function identifyDraggingElement(e){
    elementToCopy = e.target;
}

function moveToOwnWindow(){
    var newWindow = new electron.remote.BrowserWindow({
         width: 300, 
         height: 300
     },
    //  function(){

    //  }
    
    )
    newWindow.loadURL(path.join("file://", __dirname, 'tearouttable.html'))

}

function tearOut(){
    hiddenTable = this;
    system.getMousePosition( 
        function(mousePosition){
            elementToCopy.parentNode.removeChild(elementToCopy);
            hiddenTable.contentWindow.document.body.appendChild(elementToCopy);
            hiddenTable.showAt(mousePosition.left - 150, mousePosition.top)
        }
    );
}

myTable.addEventListener('dragend', movedToOwnWindow, false);
myTable.addEventListener('dragstart', identifyDraggingElement, false);