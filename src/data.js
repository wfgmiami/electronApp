const electron =  require('electron')
const path = require('path');
const { ipcRenderer } = electron;
const dataWin = electron.remote.getCurrentWindow();
const closeLink = document.getElementById('closeLink');
const myTable = document.getElementsByClassName('dropzone')[0];
const btn = document.getElementById('btnPost');
const yahooFinance = require('yahoo-finance');

const stock1 = document.getElementById('stock1');
const stock2 = document.getElementById('stock2');
const stock3 = document.getElementById('stock3');
const stock4 = document.getElementById('stock4');
let buySell = document.getElementById('buySell');
let inputSymbol = document.getElementById('symbol');
let inputShares = document.getElementById('shares');
// let inputPrice = document.getElementById('price');

var hiddenTable;
var elementToCopy;
const portfolio = ['AAPL', 'AMZN', 'FB', 'GOOGL'];

dataWin.webContents.openDevTools();

btn.addEventListener('click', (e) => {
 
    inputSymbol = inputSymbol.value.toUpperCase();
    inputShares = inputShares.value;
    buySell = buySell.value;

    let updateObj = {
        buySell: buySell,
        symbol: inputSymbol,
        shares: inputShares,
    }
   
    portfolio.forEach( (symbol,i) => {
        
        let shares = document.getElementById(`shares${i}`);
        let newShares = 0;

        if(buySell.toUpperCase() === 'BUY' && updateObj.symbol === symbol){
            newShares = shares.innerHTML + buySell;
            shares.innerHTML = newShares;
        }else if( buySell.toUpperCase() === 'SELL' && updateObj.symbol === symbol){
            newShares = shares.innnerHTML + buySell;
            shares.innerHTML = newShares;
        }
        
    })
    
    ipcRenderer.send('update-portfolio', updateObj)
    // console.log('button clicked', inputPort, inputShares)
});

function getQuote(){
    portfolio.forEach( (symbol,i) => {
        yahooFinance.quote({
            symbol: symbol,
            modules: ['price', 'summaryDetail']
        })
        .then( quote => {
            i++;
            const mktPrice = quote.price.regularMarketPrice;
            let shares = document.getElementById(`shares${i}`);
            let price = document.getElementById(`price${i}`);
            let mktVal = document.getElementById(`mktVal${i}`);
            price.innerHTML = mktPrice;
            const mv = shares.innerHTML * mktPrice;
            mktVal.innerHTML = mv.toLocaleString();
        })
    });
}

getQuote();
// setInterval(getQuote(),5000);

closeLink.addEventListener('click', (event) => {
    let win = electron.remote.getCurrentWindow();
    win.close();
})

function identifyDraggingElement(e){
    elementToCopy = e.target;
}

function moveToOwnWindow(){

    const mousePoint = electron.screen.getCursorScreenPoint();

    hiddenTable = new electron.remote.BrowserWindow({
         frame: true,
         width: 500, 
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

    (function () {
        var holder = document.getElementById('drop-zone');

        holder.ondragover = () => {
            return false;
        };

        holder.ondragleave = () => {
            return false;
        };

        holder.ondragend = () => {
            return false;
        };

        holder.ondrop = (e) => {
            e.preventDefault();
            e.stopPropagation();
            ipcRenderer.send('droprequest', '')
            return false;
        };
    })();

    ipcRenderer.on('tearoutContent', (event, arg) => {
        // console.log('tearoucontent data.js', arg)
        var str2DOMElement = function(html) {
            var frame = document.createElement('iframe');
            frame.style.display = 'none';
            document.body.appendChild(frame);             
            frame.contentDocument.open();
            frame.contentDocument.write(html);
            frame.contentDocument.close();
            var el = frame.contentDocument.body.firstChild;
            document.body.removeChild(frame);
            return el;
        }
        var el = str2DOMElement(arg.outerHTML);
        var endElement = document.getElementById('tradeSection');
        var parentNode = endElement.parentNode;
        parentNode.insertBefore(el, endElement);
        
    });

myTable.addEventListener('dragend', moveToOwnWindow, false);
myTable.addEventListener('dragstart', identifyDraggingElement, false);