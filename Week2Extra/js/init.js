// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: [96.913707, 20.562050], // Starting position [lng, lat]
    zoom: 9 // Starting zoom level
});

function addMarker(lat,lng,title,message){
    let popup_message = `<h2>${title}</h2> <h3>${message}</h3>`
    new maplibregl.Marker()
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup()
            .setHTML(popup_message))
        .addTo(map)
    createButtons(lat,lng,title);
    return message
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // (1)! 
    newButton.id = "button"+title; // (2)! 
    newButton.innerHTML = title; // (3)! 
    newButton.setAttribute("lat",lat); // (4)! 
    newButton.setAttribute("lng",lng); // (5)! 
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [lng,lat], //(6)!
        })
    })
    document.getElementById("contents").appendChild(newButton); //(7)! 
}

addMarker(20.562050, 96.913707, "Inle Lake", "A childhood favorite spot!")
addMarker(34.901524, -111.826171, "Capitol Hill", "My most recent trip!")
addMarker(38.88856576879683, -77.00468020584017, "Sedona", "A new family favorite!")