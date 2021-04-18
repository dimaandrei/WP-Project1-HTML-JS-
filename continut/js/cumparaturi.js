
class Produs {
    constructor(id, nume, cantitate, pret) {
        this.id = id;
        this.nume = nume;
        this.cantitate = cantitate;
        this.pret = pret;
    }
};


class Stocare{
    constructor() {
    }
};

class LocalStorage extends Stocare {
    constructor() {
        super();
    }
};

class IndexedDB extends Stocare{
    constructor() {
        super();
    }
    onerror(){
        console.log("Why didn't you allow my web app to use IndexedDB?!");
    }
};

//var tb = document.getElementById("tabel_cumparaturi");

function adauga() {

    let nume = document.getElementById("nume").value;
    let cantitate = document.getElementById("cantitate").value;
    let pret = document.getElementById("pret").value;
    let produse = localStorage.getItem("produse");
    //console.log(produse);
    if (produse == null) {
        produse = [];
    }
    else {
        produse = JSON.parse(produse);
    }
    produse = produse.map(p => new Produs(p.id, p.nume, p.cantitate, p.pret));
    let nextId = localStorage.getItem("nextId");
    if (nextId == null) {
        nextId = 1;
    }
    else {
        nextId = JSON.parse(nextId) + 1;
    }
    let id = nextId;


    produse.push(new Produs(id, nume, cantitate, pret));
    localStorage.setItem('produse', JSON.stringify(produse));
    localStorage.setItem('nextId', JSON.stringify(nextId));

    //adaug in x (nume, cantitate)
    // localStorage.setItem(..)
}
var myWorker;
function startWorker() {
    if (window.Worker) {
        console.log('Your browser support web workers.');
        myWorker = new Worker('js/worker.js');
        setInterval(() => {
            let produse = localStorage.getItem("produse");
            myWorker.postMessage(produse);
        }, 1000);
        myWorker.onmessage = (diff) => {
            //console.log(diff.data);
            var table = document.getElementById("tabel_cumparaturi");
            if (table) {
                var arr = diff.data;
                for (var i = 0; i < arr.length; ++i) {
                    let count = 0
                    let row = table.insertRow(-1);
                    for (var j in arr[i]) {
                       
                        let cell = row.insertCell(count);
                        cell.innerHTML = arr[i][j];
                        ++count;
                    }
                }
            }
        }
    }
    else {
        console.log('Your browser doesn\'t support web workers.');
    }
}
if(myWorker) {
    console.log("bag");
    
}