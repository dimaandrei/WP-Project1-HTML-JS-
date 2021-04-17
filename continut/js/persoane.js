function incarcaPersoane(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
    };
    xhttp.open("GET", "/resurse/persoane.xml" , true);
    xhttp.send();
}
function myFunction(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var table="<table id='persoane'><tr><th>Nume</th><th>Prenume</th><th>Varsta</th><th>Liceu</th><th>Facultate</th><th>Carnet</th><th>Adresa</th></tr>";
    var x = xmlDoc.getElementsByTagName("persoana");
    for (i = 0; i <x.length; i++) { 
      table += "<tr><td>" +
            x[i].getElementsByTagName("nume")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("prenume")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("varsta")[0].childNodes[0].nodeValue +
            "</td><td>"  +
            x[i].getElementsByTagName("liceu")[0].childNodes[0].nodeValue +
            "</td><td>"  +
            x[i].getElementsByTagName("facultate")[0].childNodes[0].nodeValue +
            "</td><td>"  +
            x[i].getElementsByTagName("carnet")[0].childNodes[0].nodeValue +
            "</td><td>"  +
            x[i].getElementsByTagName("adresa")[0].childNodes[0].nodeValue +
            "</td><tr>";
    }
    table += "</table>";
    document.getElementById("upload").innerHTML = table;
  }