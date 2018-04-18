const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');
const shell = require('electron').shell;
const ipc = require('electron').ipcMain;

let win;
let tearoutContent = null;
let currentDropTarget = null;
let eventSender = null;
let tearOutPort = null;
let separateWindow = 0;
let portfolioState = {};
let tearoutWinId;

function createWindow(){
    win = new BrowserWindow({ width: 800, height: 600 });
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // win.webContents.openDevTools();
    win.on('closed', () => {
        win = null
    })

    var menu = Menu.buildFromTemplate([
        {
            label: 'Menu',
            submenu:[
                { label: 'Adjust Notification Value'},
                { 
                    label: 'Market Cap',
                    click(){
                        shell.openExternal('http://coinmarketcap.com')
                    }
                },
                { type: 'separator'},
                { 
                    label: 'Exit',
                    click(){
                        app.quit()
                    }
                }
            ]
        },{
            label:'Info'
        }
    ])
    Menu.setApplicationMenu(menu);
  
}

app.on('ready', createWindow);

ipc.on('update-notify-value', function(event, arg){
    win.webContents.send('targetPriceVal', arg)
})


ipc.on('tearoutContent', function(event, arg){
    tearoutContent = arg;
    tearOutPort = tearoutContent.textContent.substring(10,11);
    console.log('tearoutContent', tearoutContent, tearOutPort)
})

ipc.on('tearoutRequest', function(event, arg){
    event.sender.send("tearoutContent", tearoutContent)
    tearoutWinId = arg;
    separateWindow++;
})

ipc.on('dragend', (event, arg) => {
    // console.log('main.js drag end')
    currentDropTarget = arg;
    if(eventSender){
        // console.log('main.js currentDropTarget',currentDropTarget.textContent.substring(10,11))
     
        eventSender.send("tearoutContent", currentDropTarget);

        event.sender.send('closeWindow', '');
        currentDropTarget = null;
        eventSender = null;
        separateWindow--;
    }
})

ipc.on('droprequest', (event, arg) => {
    eventSender = event.sender;
})

ipc.on('update-portfolio', (event, arg) => {
    console.log('update port, tearOutPort, separateWindow: ', tearOutPort, separateWindow)
    portfolioState = arg;
    if( separateWindow === 0 ) tearOutPort = null;
    
    if(separateWindow === 0 || separateWindow === 1){
        event.sender.send('separateWindow', tearOutPort);
    }else{
        // console.log('separate window id, portState', tearoutWinId, portfolioState)
        // let browWin = BrowserWindow.fromId(tearoutWinId);
        // console.log('browWin', browWin)
        win.webContents.send('tearoutPortfolio', portfolioState);
    }
})

ipc.on('switch-window', (event, arg) => {
    console.log('switch-window')
    win.webContents.send('tearoutPortfolio', portfolioState);
})