const currentWindow = electron.remote.getCurrentWindow();   
var currentDropTarget, currentDragger;

var draggersArray = [];
var draggers = [].slice.call(document.querySelectorAll('div[draggable]'));


draggers.map( (elem, i) => {
    draggersArray[i] = elem;
    elem.addEventListener('dragstart', onDragStart, false);
    elem.addEventListener('dragend', onDragEnd, false);
});

function onDragStart(e){
    currentDragger = e.target;
    // console.log('drag start', currentDragger)
}

function onDragEnd(e){
    e.stopPropagation();
    e.preventDefault();
    currentDragger = e.target;
    var objContent = {};

    for( var k in currentDragger){
        objContent[k] = currentDragger[k];
    }

    ipcRenderer.send('dragend', objContent);
}

ipcRenderer.on('closeWindow', (event, arg) => {
    // console.log('close window.........')
    currentDragger.parentNode.removeChild(currentDragger);
    currentWindow.close();
});

// function onDragEnter(e){
//     e.preventDefault();
//     var classes = e.target.className.match(/dropzone/g);
//     if (classes && classes.length > 0) {
//         e.target.style.background = "#00ff00";
//         _currentDropTarget = e.target;
//     }
//     // console.log('onDragEnter', e.target)
// }

// function onDragOver(e) {
//     e.preventDefault();
//     if ( e.target.className == "dropzone" ) {
//         e.target.style.background = "#454545";
//         _currentDropTarget = e.target;
//         try{
//             currentDragger.parentNode.removeChild(currentDragger);
//             e.srcElement.appendChild(currentDragger)
//         }catch(err){

//         }
//     }
//     // console.log('onDragOver', e.target)
// }

// function onDragLeave(e){
//     e.preventDefault();
//     var classes = e.target.className.match(/dropzone/g);
//     if (classes && classes.length > 0) {
//         e.target.style.background = "#cccccc";
    
//         try{
//             currentDragger.parentNode.removeChild(currentDragger);
//             e.srcElement.appendChild(currentDragger)
            
//         }catch(err){

//         }
//     }   
//     //  console.log('onDragLeave', e.target)
// }


document.addEventListener('dragend', onDragEnd, false);
document.addEventListener('dragstart', onDragStart, false);
// document.addEventListener("dragenter", onDragEnter, false);
// document.addEventListener("dragover", onDragOver, false);
// document.addEventListener("dragleave", onDragLeave, false);