const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;
const axios = require('axios');
const ipc = electron.ipcRenderer;

const notifyBtn = document.getElementById('notifyBtn');
var price = document.querySelector('h1');
var targetPrice = document.getElementById('targetPrice');
var targetPriceVal

const btnPortfolios = document.getElementById('btnPortfolios');

const currWin = electron.remote.getCurrentWindow();
currWin.webContents.openDevTools();

function getBTC(){
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
    .then(res => {
   
        const cryptos = res.data.BTC.USD
        price.innerHTML = '$' + cryptos.toLocaleString('en')
        const btcPrice = '$' + cryptos.toLocaleString('en')

        const notification = {
            title: 'BTC Alert',
            body: 'BTC just reached your target price ' + btcPrice
        }

        if(targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD){
            const myNotification = new window.Notification(notification.title, notification)
            
        }
    })
}

getBTC()
setInterval(getBTC, 8000);

notifyBtn.addEventListener('click', function(event){
    const modalPath = path.join('file://', __dirname, 'add.html')
    let win = new BrowserWindow({ frame: false, transparent: true, alwayOntop: true, width: 400, height: 200 })

    win.on('close', function() { win = null })
    win.loadURL(modalPath)
    win.show();
})

ipc.on('targetPriceVal', function(event, arg){
    targetPriceVal = Number(arg)
    targetPrice.innerHTML = '$' + targetPriceVal.toLocaleString('en')
})

btnPortfolios.addEventListener('click', function(event){
    var dataWin = new BrowserWindow({ frame: false, width: 700, height: 650 })
    dataWin.on('close', ()=> { dataWin = null })
    dataWin.loadURL(path.join("file://", __dirname, 'data.html'))
    dataWin.show();
})


ipc.on('tearoutPortfolio', function(event, arg){
    console.log('tearoutPortfolio', arg)
    
})