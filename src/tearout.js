
const currentWindow = electron.remote.getCurrentWindow();

var dataTable = document.getElementsByClassName('dataTable')[0];
var _currentDropTarget;

function onDragStart(e){
    elementToCopy = e.target;
    // console.log('drag start', elementToCopy)
}

function onDragEnd(e){
    // isMouseOutOfWindow(e, onMouseOutsideOfWindow, onMouseInsideOfWindow);
    e.stopPropagation();
    e.preventDefault();
    const mousePoint = electron.screen.getCursorScreenPoint();
    // console.log('screen: ', mousePoint.x,mousePoint.y, " ...", e.x, e.y, "...", currentWindow.getBounds())
    // console.log('drag end', e.target, e)
    
}

function isMouseOutOfWindow(e, outsideCallback, insideCallback){
    const winSize = electron.screen.getPrimaryDisplay().size;
    const height = winSize.height;

    // const mousePoint = electron.screen.getCurrentWindow
}

function onDragEnter(e){
    e.preventDefault();
    var classes = e.target.className.match(/dropzone/g);
    if (classes && classes.length > 0) {
        e.target.style.background = "#00ff00";
        _currentDropTarget = e.target;
    }
    console.log('onDragEnter', e.target)
}
function onDragOver(e) {
    e.preventDefault();
    if ( e.target.className == "dropzone" ) {
        e.target.style.background = "#454545";
        _currentDropTarget = e.target;
    }
    console.log('onDragOver', e.target)
}



document.addEventListener('dragend', onDragEnd, false);
document.addEventListener('dragstart', onDragStart, false);
document.addEventListener("dragenter", onDragEnter, false);
document.addEventListener("dragover", onDragOver, false);