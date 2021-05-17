let d = document;

window.onload = async function() {
    await fetch('http://squashschedule.herokuapp.com/leninka_days/');
}

function rowInsert(json, tbody) {
    let row = d.createElement("TR");
    tbody.appendChild(row);

    let rowArray = ['date', 'week', '17', '18', '19', '20', '21', '22']
    rowArray.forEach(function(item) {
        let td = d.createElement("TD");
        row.appendChild(td);
        if (json[item] === 1) td.innerHTML = '+'
        else if (json[item] === 0) td.innerHTML = '-'
        else td.innerHTML = json[item];

    });
}

async function requestDubrovka(date) {
    let response = await fetch('http://squashschedule.herokuapp.com/dubrovka_day/?date=' + date);
    let jsonResp = await response.json();

    let tbody = d.getElementById('dubrovka').getElementsByTagName('TBODY')[0];
    rowInsert(jsonResp,tbody)
}

async function requestTula(date) {
    let response = await fetch('http://squashschedule.herokuapp.com/tula_day/?date=' + date);
    let jsonResp = await response.json();

    let tbody = d.getElementById('tula').getElementsByTagName('TBODY')[0];
    rowInsert(jsonResp,tbody)
}

async function requestShabolovka(date) {
    let response = await fetch('http://squashschedule.herokuapp.com/shabolovka_day/?date=' + date);
    let jsonResp = await response.json();

    let tbody = d.getElementById('shabolovka').getElementsByTagName('TBODY')[0];
    rowInsert(jsonResp,tbody)
}

async function requestLeninka(date) {
    let response = await fetch('http://squashschedule.herokuapp.com/leninka_days/?date=' + date);
    let jsonResp = await response.json();

    let tbody = d.getElementById('leninka').getElementsByTagName('TBODY')[0];
    for (let i=0; i<jsonResp.length; i++) {
        rowInsert(jsonResp[i],tbody)
    }
}

async function apiRequest() {
    let dateMax = new Date(d.getElementById('dateMax').value);
    let checkDubrovka = d.getElementById('checkDubrovka');
    let checkTula = d.getElementById('checkTula');
    let checkShabolovka = d.getElementById('checkShabolovka');
    let checkLeninka = d.getElementById('checkLeninka');

    if (checkLeninka.checked) {
        let dateMin3 = new Date(d.getElementById('dateMin').value);
        let dateRequest = dateMin3.toISOString().substr(0,10)
        while (dateMin3<dateMax) {
            dateMin3.setDate(dateMin3.getDate()+1)
            dateRequest += ',' + dateMin3.toISOString().substr(0,10)
        }
        await requestLeninka(dateRequest)
    }

    if (checkShabolovka.checked) {
        let dateMin2 = new Date(d.getElementById('dateMin').value);
        await requestShabolovka(dateMin2.toISOString().substr(0,10));
        dateMin2.setDate(dateMin2.getDate()+1)
        while (dateMin2<=dateMax) {
            await requestShabolovka(dateMin2.toISOString().substr(0,10));
            dateMin2.setDate(dateMin2.getDate()+1)
        }
    }

    if (checkTula.checked) {
        let dateMin2 = new Date(d.getElementById('dateMin').value);
        await requestTula(dateMin2.toISOString().substr(0,10));
        dateMin2.setDate(dateMin2.getDate()+1)
        while (dateMin2<=dateMax) {
            await requestTula(dateMin2.toISOString().substr(0,10));
            dateMin2.setDate(dateMin2.getDate()+1)
        }
    }

    if (checkDubrovka.checked) {
        let dateMin1 = new Date(d.getElementById('dateMin').value);
        await requestDubrovka(dateMin1.toISOString().substr(0,10));
        dateMin1.setDate(dateMin1.getDate()+1);
        while (dateMin1<=dateMax) {
            await requestDubrovka(dateMin1.toISOString().substr(0,10));
            dateMin1.setDate(dateMin1.getDate()+1)
        }
    }
}