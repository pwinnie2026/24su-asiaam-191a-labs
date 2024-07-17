// declare variables
let mapOptions = { 'centerLngLat': [-118.1384, 33.9035], 'startingZoomLevel': 8 }

const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/landscape/style.json?key=JWrMVIrr3Jz2WGVMeDwh', // Your style URL
    center: mapOptions.centerLngLat, // Starting position [lng, lat]
    zoom: mapOptions.startingZoomLevel // Starting zoom level
});

function addMarker(lat, lng, title, message, img) {
    let popup_message = `<h2>${title}</h2> <h3>${message}</h3>`
    let popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false
    }).setHTML(popup_message);

    let marker = new maplibregl.Marker({ element: markerImage(img) })
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup()
            .setHTML(popup_message))
        .addTo(map)

    marker.getElement().addEventListener('mouseenter', () => {
        popup.setLngLat([lng, lat]).addTo(map);
    });

    marker.getElement().addEventListener('mouseleave', () => {
        popup.remove();
    });

    createButtons(lat, lng, title);
    return message
}

function markerImage(img) {
    const jpg = `photo/${img}.jpg`;
    const marker = document.createElement('div');
    marker.style.backgroundImage = `url(${jpg})`;
    marker.style.backgroundSize = 'cover';
    marker.style.width = '60px';
    marker.style.height = '60px';
    marker.style.borderRadius = '50px';
    return marker;
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

// When the map is fully loaded, start adding GeoJSON data
map.on('load', function () {
    fetch("map3.geojson")
        .then(response => response.json())
        .then(data => {
            processData(data); // Call processData with the fetched data
        });
});

function processData(results) {
    //console.log(results) //for debugging: this can help us see if the results are what we want
    results.features.forEach(feature => {
        //console.log(feature) // for debugging: are we seeing each feature correctly?
        // assumes your geojson has a "title" and "message" attribute
        let coordinates = feature.geometry.coordinates;
        let longitude = coordinates[0];
        let latitude = coordinates[1];
        let title = feature.properties.title;
        let message = feature.properties.message;
        let img = feature.properties.img;
        addMarker(latitude, longitude, title, message, img);
    });
};