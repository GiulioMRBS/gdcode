function calculate(rest, rate, monthly, mStart, yStart, extra){
	var titleTr = createAndAppend(titleTable, 'tr');
	var datum = createAndAppend(titleTr, 'th', 'Datum');
	createAndAppend(titleTr, 'th', 'Tilgung');
	createAndAppend(titleTr, 'th', 'Zinsen');
	createAndAppend(titleTr, 'th', 'Restschuld');
	createAndAppend(titleTr, 'th', 'Sondertilgung');
	while (rest > 0){
		var monthName = ('0'+mStart).slice(-2)+'.'+yStart;
		var extraText = '-';
		if(extra && extra.hasOwnProperty(monthName)){
			rest = rest - extra[monthName];
			extraText=extra[monthName].toString();
		}
		var monthlyRate = (rest*rate)/12;
		var monthlyTax = monthly - monthlyRate;
		rest = rest - monthlyTax;
		var tr = createAndAppend(mainTable, 'tr');
		createAndAppend(tr, 'td', monthName)
		createAndAppend(tr, 'td', monthlyTax);
		createAndAppend(tr, 'td', monthlyRate);
		createAndAppend(tr, 'td', rest);
		createAndAppend(tr, 'td', extraText);
		if(mStart+1===13){
			mStart = 1;
			yStart = yStart +1;
		}else{
			mStart = mStart + 1;
		}
	}
	function createAndAppend(parent, type, content, minWidth){
		var el = document.createElement(type);
		if(content){
			el.innerHTML = content;
		}
		parent.appendChild(el);
		return el;
	}
}