function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

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
  var liters = gallons * 4.54609;
  var message = gal+' gal(US) -> ' + liters.toFixed(3) + ' l';
  return message;
}

function lToGal(liters)
{
  var l = liters;
  var gal = liters / 4.54609;
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

browser.runtime.onMessage.addListener(notify);
function notify(x) {
  browser.contextMenus.update(
    "convert-selection",
    {title: convert(x['text'])}
  );
}

browser.contextMenus.create({
    id: "convert-selection",
    title: browser.i18n.getMessage("contextMenuItemSelectionConvertr"),
    contexts: ["selection"]
  }, onCreated);

function convert (value) {
  browser.contextMenus.update(
    "convert-selection",
    {title: "BrewConvert"}
  );

  value = value.trim();
  console.log(value);

  kg_regex = /^\d+(\.\d+)\s?\b(kg)|\b(kilogram)/ig;
  lbs_regex =  /^\d+(\.\d+)\s?\b(lbs)|\b(pounds)|(lb)/ig;

  oz_regex = /^\d+(\.\d+)\s?\b(oz)|\b(ounce)/ig;
  g_regex = /^\d+(\.\d+)\s?\b(g)|\b(gram)/ig;

  c_regex = /^\d+(\.\d+)\s?\b(c)|\b(°c)/ig;
  f_regex = /^\d+(\.\d+)\s?\b(f)|\b(°f)/ig;

  gal_regex = /^\d+(\.\d+)\s?\b(gal)|\b(gallon)/ig;
  l_regex = /^\d+(\.\d+)\s?\b(l)|(litre)|\b(liter)/ig;

  if (gal_regex.test(value)) {
    return galToL(parseFloat(value));
  }
  if (l_regex.test(value)) {
    return lToGal(parseFloat(value));
  }

  if (lbs_regex.test(value)) {
    return lbsToKg(parseFloat(value));
  }
  if (kg_regex.test(value)) {
    return kgToLbs(parseFloat(value));
  }

  if (oz_regex.test(value)) {
    return ozToG(parseFloat(value));
  }
  if (g_regex.test(value)) {
    return gToOz(parseFloat(value));
  }

  if (c_regex.test(value)) {
    return cToF(parseFloat(value));
  }
  if (f_regex.test(value)) {
    return fToC(parseFloat(value));
  }
}


