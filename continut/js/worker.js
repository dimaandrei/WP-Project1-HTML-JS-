
var listaPrecedenta = [];
onmessage = (x) => {
    var diff = [];
    /*const regex = /[\[\]]+/g;
    let dataString = x.data.toString();
    dataString = dataString.replaceAll(regex,'');
    dataString = "["+dataString+"]";
    console.log(dataString);*/

    var arr1 = []
    try {
        arr1 = JSON.parse(x.data);
    }
    catch (err) {
        console.log(err);
    }

    //console.log(JSON.parse(JSON.stringify((x.data.toString()).replace(regex,''))));
    //console.log(arr1);

    if (x.data) {
        if (x.data.length != listaPrecedenta.length) {
            diff = arr1.filter(o1 => listaPrecedenta.filter(o2 => o2.id === o1.id).length === 0);
            //console.log(arr_diff(x, listaPrecedenta));
            try {
                listaPrecedenta = JSON.parse(x.data);
            }
            catch (err) {
                console.log(err);
            }

            //console.log(listaPrecedenta);
        }
    }
    if (diff.length !== 0) {
        //console.log(diff);
        postMessage(diff);
    }

}
/*
function arr_diff(a1, a2) {

    let a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i in a2) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }
    console.log(a);
    for (var k in a) {
        diff.push(k);
    }

    return diff;
}
*/