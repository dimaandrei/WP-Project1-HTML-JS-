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
    
}