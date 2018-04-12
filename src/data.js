const electron =  require('electron')

const closeLink = document.getElementById('closeLink');
var myTable = document.getElementsByClassName('dataTable')[0];


closeLink.addEventListener('click', (event) => {
    let win = electron.remote.getCurrentWindow();
    win.close();
})

function identifyDraggingElement(e){
    console.log('.....dragged', e.target)
    elementToCopy = e.target;
}

// myTable.addEventListener('dragend', movedToOwnWindow, false);
myTable.addEventListener('dragstart', identifyDraggingElement, false);