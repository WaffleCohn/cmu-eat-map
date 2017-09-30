// https://developers.google.com/maps/documentation/javascript/marker-clustering
window.initMap = function() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: {lat: -28.024, lng: 140.887}
  });

  // Add some markers to the map.
  // Note: The code uses the JavaScript Array.prototype.map() method to
  // create an array of markers based on a given "locations" array.
  // The map() method here has nothing to do with the Google Maps API.
  var markers = locations.map(function(location, i) {
    return new google.maps.Marker({
      position: location.loc,
      label: ""
    });
  });

  // Add a marker clusterer to manage the markers.
  var markerCluster = new MarkerClusterer(map, markers,
      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}
var locations = [
  {name: "AU BON PAIN AT SKIBO CAFÉ", loc: {lat: 40.444107, lng: -79.942206}},
  {name: "BREAKFAST EXPRESS", loc: {lat: 40.442522, lng: -79.939976}},
  {name: "CARNEGIE MELLON CAFÉ", loc: {lat: 40.442429, lng: -79.9397}},
  {name: "CHEF'S TABLE", loc: {lat: 40.442532, lng: -79.940001}},
  {name: "CITY GRILL", loc: {lat: 40.443658, lng: -79.942019}},
  {name: "DOWNTOWN DELI", loc: {lat: 40.443657, lng: -79.942061}},
  {name: "ENTROPY+", loc: {lat: 40.442923, lng: -79.942103}},
  {name: "EVGEFSTOS", loc: {lat: 40.4435792, lng: -79.9420455}},
  {name: "THE EXCHANGE", loc: {lat: 40.441499, lng: -79.941951}},
  {name: "FRESH SELECT SOUP &amp; SALAD", loc: {lat: 40.442522, lng: -79.939982}},
  {name: "EL GALLO DE ORO", loc: {lat: 40.443152, lng: -79.942049}},
  {name: "GARDEN BISTRO", loc: {lat: 40.442527, lng: -79.940075}},
  {name: "GINGERS EXPRESS (BAKER)", loc: {lat: 40.44128, lng: -79.944618}},
  {name: "GINGERS EXPRESS (PURNELL)", loc: {lat: 40.443203, lng: -79.943596}},
  {name: "GRILL'N'GREENS", loc: {lat: 40.442522, lng: -79.939985}},
  {name: "HEINZ CAFÉ", loc: {lat: 40.444328, lng: -79.94506}},
  {name: "iNOODLE", loc: {lat: 40.443486, lng: -79.945528}},
  {name: "MAC 'N' CHEESE", loc: {lat: 40.442532, lng: -79.940001}},
  {name: "THE MAGGIE MURPH CAFÉ", loc: {lat: 40.441137, lng: -79.943472}},
  {name: "NAKAMA", loc: {lat: 40.442527, lng: -79.940075}},
  {name: "NOURISH", loc: {lat: 40.4438318, lng: -79.9422587}},
  {name: "PASTA VILLAGGIO", loc: {lat: 40.443627, lng: -79.942024}},
  {name: "THE POMEGRANATE", loc: {lat: 40.442522, lng: -79.939985}},
  {name: "LA PRIMA ESPRESSO", loc: {lat: 40.442611, lng: -79.945857}},
  {name: "RAMEN BOWL", loc: {lat: 40.443302, lng: -79.94189}},
  {name: "RICE BOWL", loc: {lat: 40.443627, lng: -79.942024}},
  {name: "ROTHBERG'S ROASTERS II", loc: {lat: 40.443, lng: -79.946859}},
  {name: "SCHATZ DINING ROOM", loc: {lat: 40.44318, lng: -79.942498}},
  {name: "SEIBER CAFÉ", loc: {lat: 40.446468, lng: -79.950158}},
  {name: "SPICE IT UP GRILL", loc: {lat: 40.44253, lng: -79.940003}},
  {name: "SPINNING SALADS", loc: {lat: 40.443637, lng: -79.942019}},
  {name: "STEPHANIE'S", loc: {lat: 40.446126, lng: -79.95105}},
  {name: "STIR CRAZY", loc: {lat: 40.442531, lng: -79.940013}},
  {name: "TAKE COMFORT", loc: {lat: 40.442532, lng: -79.940001}},
  {name: "TARTAN EXPRESS", loc: {lat: 40.442775, lng: -79.941472}},
  {name: "TARTANS PIZZA", loc: {lat: 40.442684, lng: -79.940225}},
  {name: "TASTE OF INDIA", loc: {lat: 40.442684, lng: -79.940225}},
  {name: "TAZZA D'ORO", loc: {lat: 40.443551, lng: -79.944798}},
  {name: "THE UNDERGROUND", loc: {lat: 40.44534, lng: -79.943204}},
  {name: "ZEBRA LOUNGE", loc: {lat: 40.441633, lng: -79.943015}}
];

// Location Scraper
// Run on https://apps.studentaffairs.cmu.edu/dining/conceptinfo/?page=listConcepts
function scrapeLocations()
{
  var cardTops = document.getElementsByClassName("cardTop");
  var locs = [];
  for (obj of cardTops)
    locs.push({"name": obj.getElementsByTagName("h3")[0].innerHTML.trim(), "href": obj.getElementsByTagName("a")[0].href});
  var str = "var locations = [\n";
  for (loc of locs)
  {
	   var parts = loc.href.substring(loc.href.indexOf("@")+1, loc.href.length - 4).split(",");
     str += `  {name: "${loc.name}", loc: {lat: ${parts[0]}, lng: ${parts[1]}}},\n`;
  }
  str = str.substring(0, str.length - 2);
  str += "\n];";
  console.log(str);
}
