let d = document;

function rowInsert(json, tbody) {
    let row = d.createElement("TR");
    tbody.appendChild(row);

    let rowArray = ['date', 'week', '17', '18', '19', '20', '21', '22']
    rowArray.forEach(function(item, i, arr) {
        let td = d.createElement("TD");
        row.appendChild(td);
        td.innerHTML = json[item]
    });
}

async function requestDubrovka() {
    let date = document.getElementById('dateMin').value;
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = 'http://squashschedule.herokuapp.com/dubrovka_day/?date=' + date;
    let response = await fetch(proxyUrl + targetUrl);
    let jsonResp = await response.json();

    let tbody = d.getElementById('dubrovka').getElementsByTagName('TBODY')[0];
    rowInsert(jsonResp,tbody)
}

async function requestShabolovka() {
    let date = document.getElementById('dateMin').value;
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = 'http://squashschedule.herokuapp.com/shabolovka_day/?date=' + date;
    let response = await fetch(proxyUrl + targetUrl);
    let jsonResp = await response.json();

    let tbody = d.getElementById('shabolovka').getElementsByTagName('TBODY')[0];
    rowInsert(jsonResp,tbody)
}

async function requestLeninka() {
    let date = document.getElementById('dateMin').value;
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = 'http://squashschedule.herokuapp.com/leninka_days/?date=' + date;
    let response = await fetch(proxyUrl + targetUrl);
    let jsonResp = await response.json();

    let tbody = d.getElementById('leninka').getElementsByTagName('TBODY')[0];
    for (let i=0; i<jsonResp.length; i++) {
        rowInsert(jsonResp[i],tbody)
    }
}

function apiRequest() {
    requestDubrovka()
    requestShabolovka()
    requestLeninka()
}