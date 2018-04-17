
const currentWindow = electron.remote.getCurrentWindow();

var currentDropTarget, currentDragger;

var draggersArray = [];
var draggers = [].slice.call(document.querySelectorAll('div[draggable]'));
console.log(draggers)
draggers.map( (elem, i) => {
    draggersArray[i] = elem;
    elem.addEventListener('dragstart', onDragStart, false);
    elem.addEventListener('dragend', onDragEnd, false);
});


function onMouseOutsideOfWindow(e){
    // filter the _dragAndDropArray to return just the Object which contents the event target
    // var elements = _dragAndDropArray.filter(function(d){
    //     return d.element === e.target;
    // });

    // elements[0].target
    // .contentWindow
    // .document
    // .body
    // .appendChild(elements[0].element); //this is the actual piece of DOM you are tearing out

    // elements[0].target.show();
    // elements[0].target.bringToFront();
    // elements[0].target.moveTo(e.x, e.y);
}

function onMouseInsideOfWindow(e){
    // var _externalWindow = _dragAndDropArray.filter(function(d){
    //     return d.element === _currentDragger
    // });
    // if (_currentDropTarget && _currentDragger){
    //     _currentDragger.parentNode.removeChild( _currentDragger );
    //     _currentDropTarget.appendChild( _currentDragger );
    //     try{
    //        _externalWindow[0].target.hide();
    //     }catch(err){
    //         //---
    //     }
    // }
}

function onDragStart(e){
    currentDragger = e.target;
    console.log('drag start', currentDragger)
}

function onDragEnd(e){
    
    isMouseOutOfWindow(e, onMouseOutsideOfWindow, onMouseInsideOfWindow);
    e.stopPropagation();
    e.preventDefault();
    const mousePoint = electron.screen.getCursorScreenPoint();
    // console.log('screen: ', mousePoint.x,mousePoint.y, " ...", e.x, e.y, "...", currentWindow.getBounds())
    console.log('drag end', e.target, e)
    
}

function isMouseOutOfWindow(e, outsideCallback, insideCallback){

    var xMin, xMax, yMin, yMax, insideWindow;
    var width = currentWindow.getBounds().width;
    var height = currentWindow.getBounds().height;

    var left = currentWindow.getBounds().x;
    var top = currentWindow.getBounds().y;
    // const mousePoint = electron.screen.getCurrentWindow

    xMin = left;
    xMax = left + width;
    yMin = top
    yMax = top + height;
    // console.log(e.x, xMin, xMax, '....', e.y, yMin, yMax)
    if(e.x > xMin && e.x < xMax && e.y > yMin && e.y < yMax){
        // insideCallback.call(this, e);
        // console.log('inside')
    }else{
        // console.log('outside')
        // outsideCallback.call(this, e);
    }
    
}

function onDragEnter(e){
    e.preventDefault();
    var classes = e.target.className.match(/dropzone/g);
    if (classes && classes.length > 0) {
        e.target.style.background = "#00ff00";
        _currentDropTarget = e.target;
    }
    // console.log('onDragEnter', e.target)
}

function onDragOver(e) {
    e.preventDefault();
    if ( e.target.className == "dropzone" ) {
        e.target.style.background = "#454545";
        _currentDropTarget = e.target;
        try{
            currentDragger.parentNode.removeChild(currentDragger);
            e.srcElement.appendChild(currentDragger)
            
        }catch(err){

        }


    }
    console.log('onDragOver', e.target)
}

function onDragLeave(e){
    e.preventDefault();
    var classes = e.target.className.match(/dropzone/g);
    if (classes && classes.length > 0) {
        e.target.style.background = "#cccccc";
    
        try{
            currentDragger.parentNode.removeChild(currentDragger);
            e.srcElement.appendChild(currentDragger)
            
        }catch(err){

        }
    }   
     console.log('onDragLeave', e.target)
}


document.addEventListener('dragend', onDragEnd, false);
document.addEventListener('dragstart', onDragStart, false);
document.addEventListener("dragenter", onDragEnter, false);
document.addEventListener("dragover", onDragOver, false);
document.addEventListener("dragleave", onDragLeave, false);