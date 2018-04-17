const path = require('path');

const BrowserWindow = require('electron').remote.BrowserWindow;

class CreateWindow{

    constructor(obj){
        this.window = new BrowserWindow({ 
                width: obj.width, 
                height: obj.height,
            })     
        // let htmlPath = path.join("file://", __dirname, "../tearout.html");
        // let htmlPath = path.join("file://", __dirname, 'tearouttable.html');

        this.window.loadURL(obj.url);
        // this.window.webContents.executeJavaScript(`document.querySelector('webview')`, function (result) {
        //     console.log(result)
            
        //   })

    }
}

module.exports = CreateWindow;