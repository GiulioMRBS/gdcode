/*global amount*/
/*global config*/
/*global date*/

let name;

function calculate(n, obj) {
    name = n;
    if (obj) {
        for (let i = 0; i < obj.parentNode.children.length; i++) {
            obj.parentNode.children[i].className = "";
        }
        obj.className = "redColor";
    }
    document.getElementById("mainTable").remove();
    let mainTable = createAndAppend(document.body, 'table');
    mainTable.setAttribute('id', 'mainTable');

    amount.setAttribute('pattern', config[name].pattern);
    amount.setAttribute('title', config[name].errorMessage);

    while (date.firstChild) {
        date.removeChild(date.firstChild);
    }
    let rest = config[name].rest;
    let mStart = config[name].mStart;
    let yStart = config[name].yStart;
    let d = new Date();

    while (rest > 0) {
        let monthName = ('0' + mStart).slice(-2) + '.' + yStart;
        let extraText = '-';
        if (config[name].extra && config[name].extra.hasOwnProperty(monthName)) {
            rest = rest - config[name].extra[monthName];
            extraText = config[name].extra[monthName].toString();
            if (d.getFullYear() < yStart || (d.getFullYear() === yStart && d.getMonth() < mStart)) {
                extraText += '<span onclick="removeExtra(\'' + monthName + '\')">X</span>';
            }
        } else {
            if (config[name].onceAYear) {
                if (mStart === 1) {
                    createAndAppend(date, 'option', monthName);
                }
            } else {
                createAndAppend(date, 'option', monthName);
            }
        }
        let monthlyInterest = (rest * config[name].rate) / 12;
        let monthlySinking = config[name].monthly - monthlyInterest;
        rest = rest - monthlySinking;
        if (rest < 0) {
            monthlySinking = monthlySinking + rest;
            monthlyInterest = 0;
            rest = 0;
        }
        let tr = createAndAppend(mainTable, 'tr');
        createAndAppend(tr, 'td', monthName);
        createAndAppend(tr, 'td', monthlySinking.toFixed(2));
        createAndAppend(tr, 'td', monthlyInterest.toFixed(2));
        createAndAppend(tr, 'td', rest.toFixed(2));
        createAndAppend(tr, 'td', extraText);

        if (mStart + 1 === 13) {
            mStart = 1;
            yStart = yStart + 1;
        } else {
            mStart = mStart + 1;
        }
    }
}

function createAndAppend(parent, type, content) {
    let el = document.createElement(type);
    if (content) {
        el.innerHTML = content;
    }
    parent.appendChild(el);
    return el;
}

function addExtra() {
    let d = date.value;
    let s = amount.value;
    if (d && s) {
        config[name].extra[d] = s;
        calculate(name);
    }
}

function removeExtra(month) {
    if (config[name].extra.hasOwnProperty(month)) {
        delete config[name].extra[month];
        calculate(name);
    }
}