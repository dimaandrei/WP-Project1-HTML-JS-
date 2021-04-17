
class Produs{
    constructor(id, nume, cantitate, pret){
    this.id = id;
    this.nume = nume;
    this.cantitate = cantitate;
    this.pret = pret;
    }
};
//var tb = document.getElementById("tabel_cumparaturi");

function adauga(){
    
    let nume = document.getElementById("nume").value;
    let cantitate = document.getElementById("cantitate").value;
    let pret = document.getElementById("pret").value;
    let produse = localStorage.getItem("produse");
    //console.log(produse);
    if(produse == null)
    {
        produse = [];
    }
    else{
        produse = JSON.parse(produse);
    }
    produse = produse.map(p=>new Produs(p.id, p.nume, p.cantitate, p.pret));
    let nextId=localStorage.getItem("nextId");
    if(nextId==null){
        nextId=1;
    }
    else{
        nextId = JSON.parse(nextId)+1;
    }
    let id = nextId;
    
    
    produse.push(new Produs(id,nume, cantitate, pret));
    localStorage.setItem('produse', JSON.stringify(produse));
    localStorage.setItem('nextId',JSON.stringify(nextId));
    
    //adaug in x (nume, cantitate)
    // localStorage.setItem(..)
}

var myWorker = new Worker('./worker.js');
myWorker.onmessage=(diff)=>{
    console.log(diff);
}