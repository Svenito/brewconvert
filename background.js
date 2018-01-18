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
  var message = cTemp + '\xB0C -> ' + cToFahr + ' \xB0F';
  return message;
}

function fToC(fahrenheit)
{
  var fTemp = fahrenheit;
  var fToCel = (fTemp - 32) * 5 / 9;
  var message = fTemp + '\xB0F -> ' + fToCel + '\xB0C';
  return message;
}

function gToL(gallons)
{
  var gal = gallons;
  var liters = gallons * 4.54609;
  var message = gal+' gal(US) -> ' + liters.toFixed(3) + ' l';
  return message;
}

function lToG(liters)
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
  var message = lbs + ' lbs ->' + kg.toFixed(3) + ' kg';
    return message;
}

function kgToLbs(kgs)
{
  var kilos = kgs;
  var lbs = kilos * 2.204623;
  var message = kilos + ' kg ->' + lbs.toFixed(3) + ' lbs';
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
      if (value.endsWith("F") || value.endsWith("°F")) {
        return fToC(parseFloat(value));
      } else if (value.endsWith("C") || value.endsWith("°C")) {
        return cToF(parseFloat(value));
      }

      else if (value.endsWith("gallon") || value.endsWith("gal")) {
        return gToL(parseFloat(value));
      } else if (value.endsWith("liter") || value.endsWith("l")) {
        return lToG(parseFloat(value));
      }

      else if (value.endsWith("g") || value.endsWith("gram")) {
        return gToOz(parseFloat(value));
      } else if (value.endsWith("oz") || value.endsWith("ounce")) {
        return ozToG(parseFloat(value));
      }

      else if (value.endsWith("lbs") || value.endsWith("pounds")) {
        return lbsToKg(parseFloat(value));
      } else if (value.endsWith("kg") || value.endsWith("kilograms")
                || value.endsWith("kilos")) {
        return kgToLbs(parseFloat(value));
      }

}

