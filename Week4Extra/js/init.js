// declare variables
let mapOptions = {'centerLngLat': [-118.444,34.0709],'startingZoomLevel':8}

const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=JWrMVIrr3Jz2WGVMeDwh', // Your style URL
    center: mapOptions.centerLngLat, // Starting position [lng, lat]
    zoom: mapOptions.startingZoomLevel // Starting zoom level
});

function addMarker(data){
    let popup_message;
    let lng = data['lng'];
    let lat = data['lat'];
    let img;

    if (data['In the past year, have you used public transportation?'] == "Yes"){
        popup_message = `<h2>Used Public Transit</h2> <p>Experience: ${data['Share any of your past experiences using public transportation, if any?']}</p> <p>Heat: ${data['Share whether heat impacts your experience using public transportation compared to other modes of transportation?']}</p> <h3>Zip Code: ${data['Where is your home zip code?']}</h3>`
        createButtons(lat,lng,data['Where is your home zip code?']);
        img = "bus";
    }
    else{
        popup_message = `<h2>Doesn't Use Public Transit</h2> <h3>Zip Code: ${data['Where is your home zip code?']}</h3>`
        img = "car";
    }
    
    let marker = new maplibregl.Marker({ element: markerImage(img) })
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup()
            .setHTML(popup_message))
        .addTo(map)
}

function markerImage(img) {
    const png = `js/${img}.png`;
    const marker = document.createElement('div');
    marker.style.backgroundImage = `url(${png})`;
    marker.style.backgroundSize = 'cover';
    marker.style.width = '60px';
    marker.style.height = '60px';
    marker.style.borderRadius = '50px';

    return marker;
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button");
    newButton.id = "button"+title; 
    newButton.innerHTML = title;
    newButton.setAttribute("lat",lat);
    newButton.setAttribute("lng",lng);
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [lng,lat],
        })
    })
    document.getElementById("contents").appendChild(newButton);
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQqP2jMvJds2rtZnoa2lihBlAQB0KPKeVQS_HAuN4xrPKfeLLE7aPiCdZjsyFiCsWC4_4cNXy0an90/pub?output=csv"

// When the map is fully loaded, start adding GeoJSON data
map.on('load', function() {
    // Use PapaParse to fetch and parse the CSV data from a Google Forms spreadsheet URL
    Papa.parse(dataUrl, {
        download: true, // Tells PapaParse to fetch the CSV data from the URL
        header: true, // Assumes the first row of your CSV are column headers
        complete: function(results) {
            // Process the parsed data
            processData(results.data); // Use a new function to handle CSV data
        }
    });
});

function processData(results){
    console.log(results) //for debugging: this can help us see if the results are what we want
    results.forEach(feature => {
        //console.log(feature) // for debugging: are we seeing each feature correctly?
        // assumes your geojson has a "title" and "message" attribute
        // let coordinates = feature.geometry.coordinates;
        let longitude = feature['lng']
        let latitude = feature['lat'];
        let title = feature['In the past year, have you used public transportation?'];
        let message = feature['Where is your home zip code?'];
        addMarker(feature);
    });
};