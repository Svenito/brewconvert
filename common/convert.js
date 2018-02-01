

// will be appended to the background scripts

function cToF(celsius)
{
	var cTemp = celsius;
	var cToFahr = cTemp * 9 / 5 + 32;
	var message = cTemp + '\xB0C -> ' + cToFahr.toFixed(3) + ' \xB0F';
	return message;
}

function fToC(fahrenheit)
{
	var fTemp = fahrenheit;
	var fToCel = (fTemp - 32) * 5 / 9;
	var message = fTemp + '\xB0F -> ' + fToCel.toFixed(3) + '\xB0C';
	return message;
}

function galToL(gallons)
{
	var gal = gallons;
	var liters = gallons * 3.7854;
	var message = gal+' gal(US) -> ' + liters.toFixed(3) + ' l';
	return message;
}

function lToGal(liters)
{
	var l = liters;
	var gal = liters / 3.7854;
	var message = l + ' l -> ' + gal.toFixed(3) + ' gal(US)';
	return message;
}

function gToOz(grams)
{
	var g = grams;
	var oz = grams / 28.34952;
	var message = grams + ' g -> ' + oz.toFixed(3) + ' oz';
	return message;
}

function ozToG(ounces)
{
	var oz = ounces;
	var g = oz * 28.34952;
	var message = oz + ' oz -> ' + g.toFixed(3) + ' g';
	return message;
}

function lbsToKg(pounds)
{
	var lbs = pounds;
	var kg = lbs / 2.204623;
	var message = lbs + ' lbs -> ' + kg.toFixed(3) + ' kg';
	return message;
}

function kgToLbs(kgs)
{
	var kilos = kgs;
	var lbs = kilos * 2.204623;
	var message = kilos + ' kg -> ' + lbs.toFixed(3) + ' lbs';
	return message;
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
	value = value.trim();
	console.log("conversions is ", conversions);
	kg_regex = /^\d+(\.\d+)?\s*(kg)\b|(kilograms?)\b/ig;
	lbs_regex =  /^\d+(\.\d+)?\s*(lbs)\b|(pounds?)\b|(lb)\b/ig;

	oz_regex = /^\d+(\.\d+)?\s*(oz)\b|(ounces?)\b/ig;
	g_regex = /^\d+(\.\d+)?\s*(g$)\b|(grams?)\b/ig;

	c_regex = /^\d+(\.\d+)?\s*(c)\b|(°c)\b/ig;
	f_regex = /^\d+(\.\d+)?\s*(f)\b|(°f)\b/ig;

	gal_regex = /^\d+(\.\d+)?\s*(gal(lon)?s?)\b/ig;
	l_regex = /^\d+(\.\d+)?\s*(l$)\b|(litres?)\b|(liters?)\b/ig;

	lovi_regex = /^\d+(\.\d+)?\s*(lovibond)\b|(°l)\b/ig;
	ebc_regex = /^\d+(\.\d+)?\s*(ebc)\b/ig;

	if (lbs_regex.test(value)) {
		if (conversions & 2) {
			return [{"name": "ltokg", "value": lbsToKg(parseFloat(value))}];
		}
		return [];
	}
	if (kg_regex.test(value)) {
		if (conversions & 1) {
			return [{"name": "kgtol", "value": kgToLbs(parseFloat(value))}];
		}
		return [];
	}

	if (oz_regex.test(value)) {
		if (conversions & 2) {
			return [{"name": "oztog", "value": ozToG(parseFloat(value))}];
		}
		return [];
	}
	if (g_regex.test(value)) {
		if (conversions & 1) {
			return [{"name": "gtoz", "value": gToOz(parseFloat(value))}];
		}return [];
	}

	if (f_regex.test(value)) {
		if (conversions & 2) {
			return [{"name": "ftoc", "value": fToC(parseFloat(value))}];
		}
		return [];
	}
	if (c_regex.test(value)) {
		if (conversions & 1) {
			return [{"name": "ctof", "value": cToF(parseFloat(value))}];
		}
		return [];
	}

	if (gal_regex.test(value)) {
		if (conversions & 2) {
			return [{"name": "galtol", "value": galToL(parseFloat(value))}];
		}
		return [];
	}
	if (l_regex.test(value)) {
		if (conversions & 1) {
			return [{"name": "ltogal", "value": lToGal(parseFloat(value))}];
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
		var val = parseFloat(value);
		var out = [];
		if (conversions & 2) {
			out.push({"name": "galtol", "value": galToL(parseFloat(value))});
			out.push({"name": "oztog", "value": ozToG(parseFloat(value))});
			out.push({"name": "ltokg", "value": lbsToKg(parseFloat(value))});
			out.push({"name": "ftoc", "value": fToC(parseFloat(value))});
		}
		if (conversions & 1) {
			out.push({"name": "ltogal", "value": lToGal(parseFloat(value))});
			out.push({"name": "kgtol", "value": kgToLbs(parseFloat(value))});
			out.push({"name": "gtoz", "value": gToOz(parseFloat(value))});
			out.push({"name": "ctof", "value": cToF(parseFloat(value))});
		}

		out.push({"name": "ltoebc", "value": lToEBC(parseFloat(value))});
		out.push({"name": "ebctol", "value": ebcToL(parseFloat(value))});
		return out;
	}
	return [];
}