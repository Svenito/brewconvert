

// will be appended to the background scripts

function unitConvert(values, op)
{
	if (!Array.isArray(values) || values[1] == undefined) {
		return [op(values[2]).toFixed(3)];
	} else {
		return [op(values[1]).toFixed(3), op(values[2]).toFixed(3)];
	}
}

function makeMessage(source, conv, from_unit, to_unit) {
	var message = ""

	if (conv[1] != undefined) {
		message += source[1] + '-';
	}
	message += source[2];
	message += from_unit + ' -> ';
	message += conv[0];
	if (conv[1]) {
		message += '-' + conv[1];
	}
	message += to_unit;
	return message;
}

function cToF(celsius)
{
	x = unitConvert(celsius, function(a){return a * 9 / 5 + 32;});
	return makeMessage(celsius, x, '\xB0C', '\xB0F');
}

function fToC(fahrenheit)
{
	x = unitConvert(fahrenheit, function(a){return (a - 32) * 5 / 9;});
	return makeMessage(fahrenheit, x, '\xB0F', '\xB0C');
}

function galToL(gallons)
{
	x = unitConvert(gallons, function(a){return a * 3.7854;});
	return makeMessage(gallons, x, 'gal(US)', ' l');
}

function lToGal(liters)
{
	x = unitConvert(liters, function(a){return a / 3.7854;});
	return makeMessage(liters, x, ' l', ' gal(US)');
}

function gToOz(grams)
{
	x = unitConvert(grams, function(a){return a / 28.34952;});
	return makeMessage(grams, x, ' g', ' oz');
}

function ozToG(ounces)
{
	x = unitConvert(ounces, function(a){return a * 28.34952;});
	return makeMessage(ounces, x, ' oz', ' g');
}

function lbsToKg(pounds)
{
	x = unitConvert(pounds, function(a){return a / 2.204623;});
	return makeMessage(pounds, x, ' lbs', ' kg');
}

function kgToLbs(kgs)
{
	x = unitConvert(kgs, function(a){return a * 2.204623;});
	return makeMessage(kgs, x, ' kg', ' lbs');
}

function ebcToL(ebc)
{
	srm = ebc * 0.508;
	lovi = (srm + 0.76) / 1.3546;
	var message = ebc + ' EBC -> ' + lovi.toFixed(3) + ' °L';
	return message;
}

function lToEBC(l)
{
	srm = (1.3546 * l) - 0.76;
	ebc = srm * 1.97;
	var message = l + ' °L -> ' + ebc.toFixed(3) + ' EBC';
	return message;
}

function convert(value, conversions) {
	//value = value.trim();
	number_regex = /^(?:([\d\.]+)\s?[-–]\s?)?([\d\.]+)\s*/ig;

	kg_regex = /(kg)\b|(kilo(gram)?s?)$/ig;
	lbs_regex = /(lbs?)\b|(pounds?)\b$/ig;

	oz_regex = /(oz)\b|(ounces?)\b$/ig;
	g_regex = /(g$)\b|(grams?)\b$/ig;

	c_regex = /(?:°\s?c|c)$/ig;
	f_regex = /(?:°\s?f|f)$/ig;

	gal_regex = /(gal(lon)?s?)\b$/ig;
	l_regex = /(l$)\b|(litres?)\b|(liters?)\b$/ig;

	lovi_regex = /^\d+(\.\d+)?\s*(lovibond)\b|(°l)\b/ig;
	ebc_regex = /^\d+(\.\d+)?\s*(ebc)\b/ig;

	if (lbs_regex.test(value)) {
		match = number_regex.exec(value);
		if (conversions & 2) {
			return [{"name": "ltokg", "value": lbsToKg(match)}];
		}
		return [];
	}
	if (kg_regex.test(value)) {
		match = number_regex.exec(value);
		if (conversions & 1) {
			return [{"name": "kgtol", "value": kgToLbs(match)}];
		}
		return [];
	}

	if (oz_regex.test(value)) {
		match = number_regex.exec(value);
		if (conversions & 2) {
			return [{"name": "oztog", "value": ozToG(match)}];
		}
		return [];
	}
	if (g_regex.test(value)) {
		match = number_regex.exec(value);
		if (conversions & 1) {
			return [{"name": "gtoz", "value": gToOz(match)}];
		}
		return [];
	}

	if (f_regex.test(value)) {
		match = number_regex.exec(value);
		if (conversions & 2) {
			return [{"name": "ftoc", "value": fToC(match)}];
		}
		return [];
	}
	if (c_regex.test(value)) {
		match = number_regex.exec(value);
		if (conversions & 1) {
			return [{"name": "ctof", "value": cToF(match)}];
		}
		return [];
	}

	if (gal_regex.test(value)) {
		match = number_regex.exec(value);
		if (conversions & 2) {
			return [{"name": "galtol", "value": galToL(match)}];
		}
		return [];
	}
	if (l_regex.test(value)) {
		match = number_regex.exec(value);
		if (conversions & 1) {
			return [{"name": "ltogal", "value": lToGal(match)}];
		}
		return [];
	}

	if (lovi_regex.test(value)) {
		return [{"name": "ltoebc", "value": lToEBC(parseFloat(value))}];
	}
	if (ebc_regex.test(value)) {
		return [{"name": "ebctol", "value": ebcToL(parseFloat(value))}];
	}

	if (!isNaN(parseFloat(value))) {
		var val = number_regex.exec(value);
		var out = [];
		if (conversions & 2) {
			out.push({"name": "galtol", "value": galToL(val)});
			out.push({"name": "oztog", "value": ozToG(val)});
			out.push({"name": "ltokg", "value": lbsToKg(val)});
			out.push({"name": "ftoc", "value": fToC(val)});
		}
		if (conversions & 1) {
			out.push({"name": "ltogal", "value": lToGal(val)});
			out.push({"name": "kgtol", "value": kgToLbs(val)});
			out.push({"name": "gtoz", "value": gToOz(val)});
			out.push({"name": "ctof", "value": cToF(val)});
		}

		out.push({"name": "ltoebc", "value": lToEBC(parseFloat(value))});
		out.push({"name": "ebctol", "value": ebcToL(parseFloat(value))});
		return out;
	}
	return [];
}