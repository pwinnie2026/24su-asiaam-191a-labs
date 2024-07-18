let mapOptions = { 'centerLngLat': [-118.444, 34.0709], 'startingZoomLevel': 5 }

const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: mapOptions.centerLngLat, // Starting position [lng, lat]
    zoom: mapOptions.startingZoomLevel // Starting zoom level
});

function addMarker(feature){
    let longitude = feature.lng;
    let latitude = feature.lat;
    let title = feature['Have you been vaccinated, and are you below the age of 21?'];
    let message = feature['Where did you get vaccinated?'];

    let popup_message;

    if (title == "Yes") {
        let popup_message = `<h2>Vaccinated Person!</h2> <h3>Place of vaccination:${message}</h3>`
        createButtons(latitude,longitude,title);
    } else {
        let popup_message = `<h2>Unvaccinated Person!</h2>`
    }

    new maplibregl.Marker()
        .setLngLat([longitude, latitude])
        .setPopup(new maplibregl.Popup()
            .setHTML(popup_message))
        .addTo(map)
    return message
}

function createButtons(lat, lng, title) {
    const newButton = document.createElement("button");
    newButton.id = "button" + title;
    newButton.innerHTML = title;
    newButton.setAttribute("lat", lat);
    newButton.setAttribute("lng", lng);
    newButton.addEventListener('click', function () {
        map.flyTo({
            center: [lng, lat],
        })
    })
    document.getElementById("contents").appendChild(newButton);
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTwgfd8g-8w3fs4fDrIugHBSgS7bvzWL7Lopv5t83xyYFCoovvMQdgSSPKlqlPhdyyG2loeH3gZtT_a/pub?output=csv"

// When the map is fully loaded, start adding GeoJSON data
map.on('load', function () {
    Papa.parse(dataUrl, {
        download: true,
        header: true,
        complete: (results) => {
            processData(results.data);
        }
    });
});

function processData(results) {
    console.log(results) //for debugging: this can help us see if the results are what we want
    results.forEach(feature => {
        console.log(feature) // for debugging: are we seeing each feature correctly?
        // assumes your geojson has a "title" and "message" attribute
        addMarker(feature);
    });
};