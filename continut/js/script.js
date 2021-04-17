function laIncarcare() {
    document.getElementById("date").innerHTML = Date()
    document.getElementById("adrURL").innerHTML = location.href
    document.getElementById("appName").innerHTML = navigator.appName

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("locName").innerHTML = "Geolocation is not supported by this browser.";
    }
    document.getElementById("appVersion").innerHTML = navigator.appVersion
    document.getElementById("userAgent").innerHTML = navigator.userAgent
    updateClock();
}
function showPosition(position) {
    document.getElementById("locName").innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}
function updateClock() {
    var now = new Date(), // current date
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    date = [now.getDate(),
    months[now.getMonth()],
    now.getFullYear()].join(' ');
    document.getElementById('date').innerHTML = [date, time].join(' / ');
    setTimeout(updateClock, 2);
}

function lotoInternet() {
    var i = 0;
    var bile = [];
    var nrbile_nimerite = 0;
    var bile_extrase = "Bile extrase: ";
    for (i = 0; i < 8; ++i) {
        bile[i] = parseInt(document.getElementById((i + 1).toString()).value, 16);

    }
    console.log(bile);
    for (i = 0; i < 8; ++i) {
        var bila = Math.floor(Math.random() * 256);
        bile_extrase += bila.toString(16).toUpperCase() + "&nbsp;&nbsp;&nbsp;";
        if (bile.includes(bila)) {
            console.log(bila);

            ++nrbile_nimerite;
        }
    }
    document.getElementById('bile_extrase').innerHTML = bile_extrase;
    document.getElementById('nrBile').innerHTML = "Bile nimerite: " + nrbile_nimerite.toString();
}
var pct1 = null;
function drawRectangle(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    if (pct1 == null) {
        pct1 = { x1: x, y1: y }
    }
    else {
        let pct2 = { x2: x, y2: y }
        let canvas = document.getElementById("myCanvas");
        let drawingColor = document.getElementById("drawing").value;
        let fillingColor = document.getElementById("filling").value;
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.strokeStyle = drawingColor;
        ctx.fillStyle = fillingColor;
        ctx.strokeRect(pct1.x1, pct1.y1, Math.abs(pct1.x1 - pct2.x2), Math.abs(pct1.y1 - pct2.y2));
        ctx.fillRect(pct1.x1, pct1.y1, Math.abs(pct1.x1 - pct2.x2), Math.abs(pct1.y1 - pct2.y2));

        pct1 = null;
        pct2 = null;
    }
}


function insertRow() {
    var y = document.getElementById("row").value;
    var color = document.getElementById("celCol").value;
    var table = document.getElementById("dinamicTable");
    var rowCnt = table.rows.length;
    var colCnt = table.rows[0].cells.length;
    var row;
    if (y > rowCnt) {
        row = table.insertRow(rowCnt);
    }
    else {
        row = table.insertRow(y);
    }
    var i;
    for (i = 0; i < colCnt; ++i) {
        let cell = row.insertCell(i);
        cell.style.backgroundColor = color;
        cell.height = "20";
        cell.innerHTML = "New row.";
    }


}
function insertColumn() {
    var x = parseInt(document.getElementById("col").value);
    var color = document.getElementById("celCol").value;
    var table = document.getElementById("dinamicTable");
    var rows = document.getElementsByTagName("tr");
    var rowCnt = table.rows.length;
    var colCnt = table.rows[0].cells.length;
    var col;
    var i;
    for (i = 0; i < rowCnt; ++i) {
        let cell;
        if (x > colCnt) {
            cell = rows[i].insertCell(colCnt);
        }
        else {
            cell = rows[i].insertCell(x);
        }
        cell.style.backgroundColor = color;
        cell.innerHTML = "New col.";
    }
}

function layout4X1() {
    document.getElementById("divWithLayout").className = 'layout1';
}
function layout2X2() {
    document.getElementById("divWithLayout").className = 'layout2';
}
function layout1X4() {
    document.getElementById("divWithLayout").className = 'layout3';
}

function schimbaContinut(resursa, jsFisier, jsFct) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("continut").innerHTML = this.responseText;
            if (jsFisier) {
                var elementScript = document.createElement('script');
                elementScript.onload = function () {
                    console.log("Updateeeeeeeeeeee")
                    if (jsFct) {
                        window[jsFct]();
                    }
                };
                elementScript.src = jsFisier;
                document.head.appendChild(elementScript);
            } else {
                if (jsFct) {
                    window[jsFct]();
                }
            }
        }
    };
    xhttp.open("GET", resursa + ".html", true);
    xhttp.send();
}
setInterval(()=>{
    let produse = localStorage.getItem("produse");
    postMessage(produse);

},1000);
