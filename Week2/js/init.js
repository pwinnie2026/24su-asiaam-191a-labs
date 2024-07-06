// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: [-118.4430,34.0691], // Starting position [lng, lat]
    zoom: 15 // Starting zoom level
});

// Example from class
function aParameter(param1,param2){
    let result = param1 + param2
    console.log(result)
}

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

addMarker(34.070,-118.444, "UCLA", "Where I work on campus")
addMarker(34.056,-118.234, "Metro", "Where I work at Metro")
addMarker(34.059,-118.374, "Games", "Where I work at games")