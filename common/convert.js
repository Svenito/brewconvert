

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

function convert(value) {
    value = value.trim();

    kg_regex = /^\d+(\.\d+)?\s*\b(kg)|\b(kilogram)/ig;
    lbs_regex =  /^\d+(\.\d+)?\s*\b(lbs)|\b(pounds)|(lb)/ig;

    oz_regex = /^\d+(\.\d+)?\s*\b(oz)|\b(ounce)/ig;
    g_regex = /^\d+(\.\d+)?\s*\b(g$)|\b(gram)/ig;

    c_regex = /^\d+(\.\d+)?\s*\b(c)|\b(°c)/ig;
    f_regex = /^\d+(\.\d+)?\s*\b(f)|\b(°f)/ig;

    gal_regex = /^\d+(\.\d+)?\s*\b(gal)|\b(gallon)/ig;
    l_regex = /^\d+(\.\d+)?\s*\b(l$)|\b(litre)|\b(liter)/ig;

    if (lbs_regex.test(value)) {
        return [{"name": "ltokg", "value": lbsToKg(parseFloat(value))}];
    }
    if (kg_regex.test(value)) {
        return [{"name": "kgtol", "value": kgToLbs(parseFloat(value))}];
    }

    if (oz_regex.test(value)) {
        return [{"name": "oztog", "value": ozToG(parseFloat(value))}];
    }
    if (g_regex.test(value)) {
        return [{"name": "gtoz", "value": gToOz(parseFloat(value))}];
    }
    if (c_regex.test(value)) {
        return [{"name": "ctof", "value": cToF(parseFloat(value))}];
    }
    if (f_regex.test(value)) {
        return [{"name": "ftoc", "value": fToC(parseFloat(value))}];
    }

    if (gal_regex.test(value)) {
        return [{"name": "galtol", "value": galToL(parseFloat(value))}];
    }
    if (l_regex.test(value)) {
        return [{"name": "ltogal", "value": lToGal(parseFloat(value))}];
    }

    if (!isNaN(parseFloat(value))) {
        var val = parseFloat(value);
        var out = [];
        out.push({"name": "galtol", "value": galToL(parseFloat(value))});
        out.push({"name": "ltogal", "value": lToGal(parseFloat(value))});
        out.push({"name": "ltokg", "value": lbsToKg(parseFloat(value))});
        out.push({"name": "kgtol", "value": kgToLbs(parseFloat(value))});
        out.push({"name": "oztog", "value": ozToG(parseFloat(value))});
        out.push({"name": "gtoz", "value": gToOz(parseFloat(value))});
        out.push({"name": "ctof", "value": cToF(parseFloat(value))});
        out.push({"name": "ftoc", "value": fToC(parseFloat(value))});

        return out;
    }
    return [];
};