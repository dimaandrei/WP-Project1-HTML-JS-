function laIncarcare() {
    // document.getElementById("date").innerHTML =
    //     Date()
    document.getElementById("adrURL").innerHTML = location.href
    document.getElementById("appName").innerHTML = navigator.appName

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("locName").innerHTML = "Geolocation is not supported by this browser.";
    }
    document.getElementById("appVersion").innerHTML = navigator.appVersion
    document.getElementById("userAgent").innerHTML = navigator.userAgent
}
function showPosition(position) {
    document.getElementById("locName").innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}
function updateClock() {
    var now = new Date(), // current date
        months = ['January', 'February', 'March']; 
        time = now.getHours() + ':' + now.getMinutes() +  ':' + now.getSeconds(); 
        date = [now.getDate(), 
                months[now.getMonth()],
                now.getFullYear()].join(' ');
    document.getElementById('date').innerHTML = [date, time].join(' / ');
    setTimeout(updateClock, 1);
}

function lotoInternet(){
    var i=0;
    var bile = [];
    var nrbile_nimerite=0;
    var bile_extrase="Bile extrase: ";
    for(i=0;i<8;++i){
        bile[i] = parseInt(document.getElementById((i+1).toString()).value,16);
    
    } 
    console.log(bile);
    for(i=0; i<8;++i)
    {
        var bila = Math.floor(Math.random()*256);
        bile_extrase += bila.toString(16).toUpperCase() + "&nbsp;&nbsp;&nbsp;";
        if(bile.includes(bila))
        {
            console.log(bila);

           ++nrbile_nimerite;
        }
    }
    document.getElementById('bile_extrase').innerHTML = bile_extrase;
    document.getElementById('nrBile').innerHTML = "Bile nimerite: "+nrbile_nimerite.toString();
}
var pct1 = null;
function drawRectangle(e){
    var x = e.offsetX;
    var y = e.offsetY;
    if(pct1==null)
    {
        pct1 = {x1:x, y1:y}
    }
    else
    {   
        let pct2= {x2:x, y2:y}
        let canvas = document.getElementById("myCanvas");
        let drawingColor = document.getElementById("drawing").value;
        let fillingColor = document.getElementById("filling").value;
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.strokeStyle = drawingColor;
        ctx.fillStyle = fillingColor;
        ctx.strokeRect(pct1.x1, pct1.y1, Math.abs(pct1.x1-pct2.x2), Math.abs(pct1.y1-pct2.y2));
        ctx.fillRect(pct1.x1, pct1.y1, Math.abs(pct1.x1-pct2.x2), Math.abs(pct1.y1-pct2.y2));
        
        pct1=null;
        pct2=null;
    }
}